import crypto from 'crypto'
import { neon } from '@neondatabase/serverless'

export function generateApiKey(): string {
  return `pk_${crypto.randomBytes(24).toString('hex')}`
}

export function hashApiKey(apiKey: string): string {
  return crypto.createHash('sha256').update(apiKey).digest('hex')
}

export async function createApiKey(userId: number, name: string = 'Default API Key') {
  const sql = neon(process.env.DATABASE_URL!)

  const apiKey = generateApiKey()
  const keyHash = hashApiKey(apiKey)
  const keyPrefix = apiKey.substring(0, 10)

  await sql`
    INSERT INTO api_keys (user_id, key_hash, key_prefix, name)
    VALUES (${userId}, ${keyHash}, ${keyPrefix}, ${name})
  `

  // Return the full key - this is the only time it's available
  return apiKey
}

export async function validateApiKey(apiKey: string) {
  const sql = neon(process.env.DATABASE_URL!)

  const keyHash = hashApiKey(apiKey)

  const result = await sql`
    SELECT
      ak.id,
      ak.user_id,
      ak.requests_this_month,
      ak.month_reset_at,
      ak.is_active,
      COALESCE(s.plan, 'free') as plan,
      COALESCE(s.status, 'active') as subscription_status
    FROM api_keys ak
    LEFT JOIN subscriptions s ON s.user_id = ak.user_id AND s.status = 'active'
    WHERE ak.key_hash = ${keyHash}
  `

  if (result.length === 0) {
    return null
  }

  const key = result[0]

  if (!key.is_active) {
    return null
  }

  // Check if we need to reset monthly counter
  const resetDate = new Date(key.month_reset_at)
  const now = new Date()

  if (now.getMonth() !== resetDate.getMonth() || now.getFullYear() !== resetDate.getFullYear()) {
    // Reset counter for new month
    await sql`
      UPDATE api_keys
      SET requests_this_month = 0, month_reset_at = NOW()
      WHERE id = ${key.id}
    `
    key.requests_this_month = 0
  }

  return key
}

export async function incrementRequestCount(keyId: number) {
  const sql = neon(process.env.DATABASE_URL!)

  await sql`
    UPDATE api_keys
    SET requests_this_month = requests_this_month + 1, last_used_at = NOW()
    WHERE id = ${keyId}
  `
}

export async function getUserApiKeys(userId: number) {
  const sql = neon(process.env.DATABASE_URL!)

  return sql`
    SELECT id, key_prefix, name, requests_this_month, last_used_at, is_active, created_at
    FROM api_keys
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `
}

export async function revokeApiKey(keyId: number, userId: number) {
  const sql = neon(process.env.DATABASE_URL!)

  await sql`
    UPDATE api_keys
    SET is_active = false
    WHERE id = ${keyId} AND user_id = ${userId}
  `
}
