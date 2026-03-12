import { NextRequest, NextResponse } from 'next/server'
import { stripe, getPlanByPriceId } from '@/lib/stripe'
import { neon } from '@neondatabase/serverless'
import Stripe from 'stripe'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  const sql = neon(process.env.DATABASE_URL!)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          )

          await handleSubscriptionChange(subscription)
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        // Mark subscription as canceled
        await sql`
          UPDATE subscriptions
          SET status = 'canceled', updated_at = NOW()
          WHERE stripe_subscription_id = ${subscription.id}
        `
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const invoiceAny = invoice as unknown as { subscription?: string | { id: string } }

        const subscriptionId = typeof invoiceAny.subscription === 'string'
          ? invoiceAny.subscription
          : invoiceAny.subscription?.id

        if (subscriptionId) {
          await sql`
            UPDATE subscriptions
            SET status = 'past_due', updated_at = NOW()
            WHERE stripe_subscription_id = ${subscriptionId}
          `
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const sql = neon(process.env.DATABASE_URL!)

  const customerId = typeof subscription.customer === 'string'
    ? subscription.customer
    : subscription.customer.id
  const priceId = subscription.items.data[0].price.id
  const plan = getPlanByPriceId(priceId) || 'basic'

  // Get user ID from Stripe customer
  const users = await sql`
    SELECT id FROM users WHERE stripe_customer_id = ${customerId}
  ` as { id: number }[]

  if (users.length === 0) {
    console.error('User not found for customer:', customerId)
    return
  }

  const userId = users[0].id

  // Get period dates
  const periodStart = new Date((subscription as unknown as { current_period_start: number }).current_period_start * 1000).toISOString()
  const periodEnd = new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000).toISOString()

  // Check if subscription exists
  const existing = await sql`
    SELECT id FROM subscriptions WHERE stripe_subscription_id = ${subscription.id}
  ` as { id: number }[]

  if (existing.length > 0) {
    // Update existing
    await sql`
      UPDATE subscriptions SET
        stripe_price_id = ${priceId},
        plan = ${plan},
        status = ${subscription.status},
        current_period_start = ${periodStart},
        current_period_end = ${periodEnd},
        cancel_at_period_end = ${subscription.cancel_at_period_end},
        updated_at = NOW()
      WHERE stripe_subscription_id = ${subscription.id}
    `
  } else {
    // Create new subscription
    await sql`
      INSERT INTO subscriptions (
        user_id, stripe_subscription_id, stripe_price_id, plan, status,
        current_period_start, current_period_end, cancel_at_period_end
      ) VALUES (
        ${userId}, ${subscription.id}, ${priceId}, ${plan}, ${subscription.status},
        ${periodStart},
        ${periodEnd},
        ${subscription.cancel_at_period_end}
      )
    `

    // Generate API key for new subscriber
    const apiKey = `pk_${crypto.randomBytes(24).toString('hex')}`
    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex')
    const keyPrefix = apiKey.substring(0, 10)

    await sql`
      INSERT INTO api_keys (user_id, key_hash, key_prefix, name)
      VALUES (${userId}, ${keyHash}, ${keyPrefix}, 'Default API Key')
    `

    // Note: In production, you'd want to email the API key to the user
    // since we only store the hash
    console.log(`New API key created for user ${userId}: ${apiKey}`)
  }
}
