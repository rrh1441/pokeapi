import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { neon } from '@neondatabase/serverless'
import { PLANS, PlanType } from '@/lib/stripe'
import Link from 'next/link'
import { ApiKeyManager } from '@/components/api-key-manager'
import { SubscriptionManager } from '@/components/subscription-manager'

export const metadata = {
  title: 'Dashboard | Pokemon Card API',
  description: 'Manage your API keys and subscription',
}

interface Subscription {
  plan: string
  status: string
  current_period_end: string
  cancel_at_period_end: boolean
}

interface ApiKey {
  id: number
  key_prefix: string
  name: string
  requests_this_month: number
  last_used_at: string | null
  is_active: boolean
  created_at: string
}

async function getUserData(userId: string) {
  const sql = neon(process.env.DATABASE_URL!)

  const [subscriptionResult, keysResult] = await Promise.all([
    sql`
      SELECT plan, status, current_period_end, cancel_at_period_end
      FROM subscriptions
      WHERE user_id = ${parseInt(userId)} AND status IN ('active', 'trialing', 'past_due')
      ORDER BY created_at DESC
      LIMIT 1
    ` as unknown as Promise<Subscription[]>,
    sql`
      SELECT id, key_prefix, name, requests_this_month, last_used_at, is_active, created_at
      FROM api_keys
      WHERE user_id = ${parseInt(userId)}
      ORDER BY created_at DESC
    ` as unknown as Promise<ApiKey[]>,
  ])

  return {
    subscription: subscriptionResult[0] || null,
    apiKeys: keysResult,
  }
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const { subscription, apiKeys } = await getUserData(session.user.id)
  const plan = (subscription?.plan || 'free') as PlanType
  const planConfig = PLANS[plan]

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session.user.name || session.user.email}
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back to Search
          </Link>
        </div>

        {/* Subscription Status */}
        <section className="bg-card border rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {planConfig.name} Plan
              </h2>
              <p className="text-muted-foreground text-sm">
                {planConfig.requestsPerMonth === -1
                  ? 'Unlimited requests'
                  : `${planConfig.requestsPerMonth.toLocaleString()} requests/month`}
              </p>
            </div>
            {subscription ? (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  subscription.status === 'active'
                    ? 'bg-green-500/20 text-green-500'
                    : subscription.status === 'past_due'
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : 'bg-gray-500/20 text-gray-500'
                }`}
              >
                {subscription.status === 'active'
                  ? 'Active'
                  : subscription.status === 'past_due'
                  ? 'Past Due'
                  : subscription.status}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-500">
                Free Tier
              </span>
            )}
          </div>

          {subscription?.cancel_at_period_end && (
            <p className="text-sm text-yellow-500 mb-4">
              Your subscription will cancel at the end of the billing period.
            </p>
          )}

          <SubscriptionManager hasSubscription={!!subscription} plan={plan} />
        </section>

        {/* API Keys */}
        <section className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">API Keys</h2>

          {!subscription ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Subscribe to a plan to get API keys.
              </p>
              <Link
                href="/pricing"
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
              >
                View Plans
              </Link>
            </div>
          ) : (
            <ApiKeyManager initialKeys={apiKeys} planConfig={planConfig} />
          )}
        </section>

        {/* Usage Stats */}
        <section className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Usage This Month</h2>

          {apiKeys.length > 0 ? (
            <div className="space-y-4">
              {apiKeys
                .filter((key) => key.is_active)
                .map((key) => {
                  const used = key.requests_this_month
                  const limit = planConfig.requestsPerMonth
                  const percentage = limit === -1 ? 0 : (used / limit) * 100

                  return (
                    <div key={key.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground">
                          {key.name} ({key.key_prefix}...)
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {used.toLocaleString()}
                          {limit !== -1 && ` / ${limit.toLocaleString()}`} requests
                        </span>
                      </div>
                      {limit !== -1 && (
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              percentage > 90
                                ? 'bg-red-500'
                                : percentage > 70
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No API keys yet.
            </p>
          )}
        </section>

        {/* Quick Links */}
        <section className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/docs"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            API Documentation
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
          <span className="text-muted-foreground">·</span>
          <a
            href="mailto:support@example.com"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Support
          </a>
        </section>
      </div>
    </main>
  )
}
