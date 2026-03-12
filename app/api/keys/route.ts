import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createApiKey, getUserApiKeys } from '@/lib/api-keys'
import { neon } from '@neondatabase/serverless'

// GET - List user's API keys
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const keys = await getUserApiKeys(parseInt(session.user.id))

    return NextResponse.json({ keys })
  } catch (error) {
    console.error('List keys error:', error)
    return NextResponse.json(
      { error: 'Failed to list API keys' },
      { status: 500 }
    )
  }
}

// POST - Create new API key
export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Check if user has active subscription
    const subscriptions = await sql`
      SELECT plan FROM subscriptions
      WHERE user_id = ${parseInt(session.user.id)} AND status = 'active'
    `

    if (subscriptions.length === 0) {
      return NextResponse.json(
        { error: 'Active subscription required to create API keys' },
        { status: 403 }
      )
    }

    // Check key limit (max 5 keys)
    const existingKeys = await sql`
      SELECT COUNT(*) as count FROM api_keys
      WHERE user_id = ${parseInt(session.user.id)} AND is_active = true
    `

    if (parseInt(existingKeys[0].count) >= 5) {
      return NextResponse.json(
        { error: 'Maximum 5 active API keys allowed' },
        { status: 400 }
      )
    }

    const { name } = await req.json() as { name?: string }
    const apiKey = await createApiKey(parseInt(session.user.id), name || 'API Key')

    return NextResponse.json({
      key: apiKey,
      message: 'Save this key now - it cannot be retrieved later',
    })
  } catch (error) {
    console.error('Create key error:', error)
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    )
  }
}
