import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
})

// Price IDs - set these in your Stripe dashboard and add to .env
export const PLANS = {
  free: {
    name: 'Free',
    priceId: null,
    requestsPerMonth: 100,
    rateLimit: 10, // requests per minute
  },
  basic: {
    name: 'Basic',
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    requestsPerMonth: 5000,
    rateLimit: 60,
  },
  pro: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    requestsPerMonth: 25000,
    rateLimit: 120,
  },
  enterprise: {
    name: 'Enterprise',
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    requestsPerMonth: -1, // unlimited
    rateLimit: 300,
  },
} as const

export type PlanType = keyof typeof PLANS

export function getPlanByPriceId(priceId: string): PlanType | null {
  for (const [plan, config] of Object.entries(PLANS)) {
    if (config.priceId === priceId) {
      return plan as PlanType
    }
  }
  return null
}
