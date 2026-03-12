import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, incrementRequestCount } from './api-keys'
import { PLANS, PlanType } from './stripe'

export interface AuthenticatedRequest {
  apiKeyId: number
  userId: number
  plan: PlanType
  requestsThisMonth: number
}

export async function withApiAuth(
  req: NextRequest,
  handler: (req: NextRequest, auth: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  // Check for API key in header
  const apiKey = req.headers.get('X-API-Key') || req.headers.get('Authorization')?.replace('Bearer ', '')

  // Also check for RapidAPI proxy secret (if using RapidAPI as a channel)
  const rapidApiSecret = req.headers.get('X-RapidAPI-Proxy-Secret')

  if (rapidApiSecret && rapidApiSecret === process.env.RAPIDAPI_PROXY_SECRET) {
    // RapidAPI request - they handle auth/billing
    // Return a mock auth object for RapidAPI requests
    return handler(req, {
      apiKeyId: 0,
      userId: 0,
      plan: 'enterprise', // RapidAPI users get full access
      requestsThisMonth: 0,
    })
  }

  if (!apiKey) {
    return NextResponse.json(
      {
        error: 'API key required',
        message: 'Include your API key in the X-API-Key header',
        docs: '/docs',
      },
      { status: 401 }
    )
  }

  const keyData = await validateApiKey(apiKey)

  if (!keyData) {
    return NextResponse.json(
      {
        error: 'Invalid API key',
        message: 'The provided API key is invalid or has been revoked',
      },
      { status: 401 }
    )
  }

  const plan = keyData.plan as PlanType
  const planConfig = PLANS[plan]

  // Check request limit
  if (
    planConfig.requestsPerMonth !== -1 &&
    keyData.requests_this_month >= planConfig.requestsPerMonth
  ) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        message: `You have exceeded your monthly limit of ${planConfig.requestsPerMonth} requests`,
        upgrade_url: '/pricing',
      },
      { status: 429 }
    )
  }

  // Increment request count
  await incrementRequestCount(keyData.id)

  // Call the handler with auth info
  return handler(req, {
    apiKeyId: keyData.id,
    userId: keyData.user_id,
    plan,
    requestsThisMonth: keyData.requests_this_month + 1,
  })
}

// Helper to wrap existing route handlers
export function protectedRoute(
  handler: (req: NextRequest, auth: AuthenticatedRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    return withApiAuth(req, handler)
  }
}
