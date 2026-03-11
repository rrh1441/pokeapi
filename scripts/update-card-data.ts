/**
 * Script to update card data with rarity and holo information from TCGdex API
 *
 * Run with: npx tsx scripts/update-card-data.ts
 */

import { config } from 'dotenv'
config({ path: '.env.local' })
import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

const BATCH_SIZE = 50  // Cards to fetch in parallel
const DELAY_BETWEEN_BATCHES = 1000  // 1 second between batches to avoid rate limiting

interface TCGdexCard {
  id: string
  name: string
  rarity?: string
  variants?: {
    firstEdition?: boolean
    holo?: boolean
    normal?: boolean
    reverse?: boolean
  }
}

async function fetchCardFromTCGdex(tcgdexId: string): Promise<TCGdexCard | null> {
  try {
    const response = await fetch(`https://api.tcgdex.net/v2/en/cards/${tcgdexId}`)
    if (!response.ok) {
      console.error(`Failed to fetch ${tcgdexId}: ${response.status}`)
      return null
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${tcgdexId}:`, error)
    return null
  }
}

async function updateCard(tcgdexId: string, rarity: string | null, hasHolo: number, hasReverse: number, hasFirstEdition: number) {
  await sql`
    UPDATE tcgdex_cards
    SET
      rarity = ${rarity},
      has_holo = ${hasHolo},
      has_reverse = ${hasReverse},
      has_first_edition = ${hasFirstEdition},
      updated_at = ${new Date().toISOString()}
    WHERE tcgdex_id = ${tcgdexId}
  `
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  console.log('Fetching all card IDs from database...')

  const cards = await sql`SELECT tcgdex_id FROM tcgdex_cards ORDER BY tcgdex_id`
  const totalCards = cards.length

  console.log(`Found ${totalCards} cards to update`)

  let processed = 0
  let updated = 0
  let failed = 0

  // Process in batches
  for (let i = 0; i < cards.length; i += BATCH_SIZE) {
    const batch = cards.slice(i, i + BATCH_SIZE)

    const results = await Promise.all(
      batch.map(async (card) => {
        const tcgdexId = card.tcgdex_id as string
        const data = await fetchCardFromTCGdex(tcgdexId)

        if (data) {
          const rarity = data.rarity || null
          const hasHolo = data.variants?.holo ? 1 : 0
          const hasReverse = data.variants?.reverse ? 1 : 0
          const hasFirstEdition = data.variants?.firstEdition ? 1 : 0

          await updateCard(tcgdexId, rarity, hasHolo, hasReverse, hasFirstEdition)
          return { success: true, tcgdexId, rarity, hasHolo, hasReverse }
        }
        return { success: false, tcgdexId }
      })
    )

    for (const result of results) {
      processed++
      if (result.success) {
        updated++
      } else {
        failed++
      }
    }

    const percent = ((processed / totalCards) * 100).toFixed(1)
    console.log(`Progress: ${processed}/${totalCards} (${percent}%) - Updated: ${updated}, Failed: ${failed}`)

    // Rate limiting
    if (i + BATCH_SIZE < cards.length) {
      await sleep(DELAY_BETWEEN_BATCHES)
    }
  }

  console.log('\n=== Complete ===')
  console.log(`Total processed: ${processed}`)
  console.log(`Successfully updated: ${updated}`)
  console.log(`Failed: ${failed}`)

  // Verify the update
  const stats = await sql`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN has_holo = 1 THEN 1 ELSE 0 END) as holo_count,
      SUM(CASE WHEN has_reverse = 1 THEN 1 ELSE 0 END) as reverse_count,
      SUM(CASE WHEN rarity IS NOT NULL THEN 1 ELSE 0 END) as with_rarity,
      COUNT(DISTINCT rarity) as rarity_types
    FROM tcgdex_cards
  `

  console.log('\n=== Database Stats ===')
  console.log(stats[0])
}

main().catch(console.error)
