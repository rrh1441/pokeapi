import { getDb } from './db'

export interface Card {
  tcgdex_id: string
  name: string
  set_name: string
  local_id: string
  rarity: string | null
  image_url: string
  category: string | null
  hp: number | null
  types: string | null
  illustrator: string | null
  has_holo: number
  has_reverse: number
  name_lower: string
  set_name_lower: string
}

export interface SearchParams {
  query?: string
  set?: string
  rarity?: string
  number?: string
  holo?: 'holo' | 'reverse' | 'non-holo'
  limit?: number
}

interface ParsedQuery {
  name: string | null
  number: string | null
  holo: 'holo' | 'reverse' | 'non-holo' | null
  rarity: string | null
}

// Known rarities for extraction from query
const KNOWN_RARITIES = [
  'rare holo', 'rare', 'common', 'uncommon', 'promo',
  'ultra rare', 'secret rare', 'amazing rare', 'illustration rare',
  'special art rare', 'hyper rare', 'radiant rare'
]

/**
 * Parse a search query to extract structured components:
 * - Card numbers like "125/094", "125", "#125", "/094"
 * - Holo keywords: "holo", "reverse holo", "reverse", "non-holo", "nonholo"
 * - Rarity keywords
 * - Remaining text as the Pokemon name
 */
function parseSearchQuery(query: string): ParsedQuery {
  let remaining = query.toLowerCase().trim()
  let number: string | null = null
  let holo: 'holo' | 'reverse' | 'non-holo' | null = null
  let rarity: string | null = null

  // Extract card numbers: "125/094", "125", "#125", "/094"
  // Match patterns like: 125/094, #125, 125, /094
  const numberPatterns = [
    /\b(\d{1,4})\s*\/\s*(\d{1,4})\b/,  // 125/094
    /#(\d{1,4})\b/,                      // #125
    /\b(\d{1,4})$/,                      // number at end
    /\/(\d{1,4})\b/                      // /094
  ]

  for (const pattern of numberPatterns) {
    const match = remaining.match(pattern)
    if (match) {
      // For "125/094" format, use the first number as local_id
      if (pattern === numberPatterns[0]) {
        number = match[1]
      } else {
        number = match[1]
      }
      remaining = remaining.replace(match[0], ' ').trim()
      break
    }
  }

  // Extract holo keywords (check longer phrases first)
  if (/\b(reverse\s*holo|reverseholo)\b/.test(remaining)) {
    holo = 'reverse'
    remaining = remaining.replace(/\b(reverse\s*holo|reverseholo)\b/, ' ').trim()
  } else if (/\b(non-?holo|nonholo)\b/.test(remaining)) {
    holo = 'non-holo'
    remaining = remaining.replace(/\b(non-?holo|nonholo)\b/, ' ').trim()
  } else if (/\bholo\b/.test(remaining)) {
    holo = 'holo'
    remaining = remaining.replace(/\bholo\b/, ' ').trim()
  } else if (/\breverse\b/.test(remaining)) {
    holo = 'reverse'
    remaining = remaining.replace(/\breverse\b/, ' ').trim()
  }

  // Extract rarity keywords (check longer phrases first)
  for (const r of KNOWN_RARITIES) {
    const rarityRegex = new RegExp(`\\b${r.replace(/\s+/g, '\\s+')}\\b`, 'i')
    if (rarityRegex.test(remaining)) {
      rarity = r
      remaining = remaining.replace(rarityRegex, ' ').trim()
      break
    }
  }

  // Clean up remaining text (the Pokemon name)
  const name = remaining.replace(/\s+/g, ' ').trim() || null

  return { name, number, holo, rarity }
}

// Popular Pokemon to feature when no search query
const FEATURED_POKEMON = [
  'charizard', 'pikachu', 'mewtwo', 'blastoise', 'venusaur',
  'gengar', 'dragonite', 'mew', 'gyarados', 'snorlax',
  'eevee', 'lugia', 'ho-oh', 'rayquaza', 'umbreon'
]

export async function searchCards(params: SearchParams): Promise<{ cards: Card[]; total: number }> {
  const sql = getDb()
  const { query, set, rarity, number, holo, limit = 10 } = params

  // If no search params, show featured/popular cards
  if (!query && !set && !rarity && !number && !holo) {
    return getFeaturedCards(limit)
  }

  // Parse the query to extract name, number, holo, and rarity
  const parsed = query ? parseSearchQuery(query) : { name: null, number: null, holo: null, rarity: null }

  const conditions: string[] = []
  const values: (string | number)[] = []
  let paramIndex = 1

  // Use parsed name from query (the Pokemon name after extracting other components)
  if (parsed.name) {
    conditions.push(`name_lower LIKE $${paramIndex}`)
    values.push(`%${parsed.name}%`)
    paramIndex++
  }

  if (set) {
    conditions.push(`set_name_lower LIKE $${paramIndex}`)
    values.push(`%${set.toLowerCase()}%`)
    paramIndex++
  }

  // Use rarity from params, or fall back to parsed rarity from query
  const effectiveRarity = rarity || parsed.rarity
  if (effectiveRarity) {
    // Use case-insensitive LIKE for rarity to be more flexible
    conditions.push(`LOWER(rarity) LIKE $${paramIndex}`)
    values.push(`%${effectiveRarity.toLowerCase()}%`)
    paramIndex++
  }

  // Use number from params, or fall back to parsed number from query
  const effectiveNumber = number || parsed.number
  if (effectiveNumber) {
    conditions.push(`local_id = $${paramIndex}`)
    values.push(effectiveNumber)
    paramIndex++
  }

  // Use holo from params, or fall back to parsed holo from query
  const effectiveHolo = holo || parsed.holo
  if (effectiveHolo) {
    if (effectiveHolo === 'holo') {
      conditions.push(`has_holo = 1`)
    } else if (effectiveHolo === 'reverse') {
      conditions.push(`has_reverse = 1`)
    } else if (effectiveHolo === 'non-holo') {
      conditions.push(`has_holo = 0 AND has_reverse = 0`)
    }
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const countQuery = `SELECT COUNT(*) as count FROM tcgdex_cards ${whereClause}`
  const countResult = await sql(countQuery, values)
  const total = parseInt(countResult[0].count as string, 10)

  const cardsQuery = `
    SELECT * FROM tcgdex_cards
    ${whereClause}
    ORDER BY name, set_name
    LIMIT $${paramIndex}
  `
  const cards = await sql(cardsQuery, [...values, limit]) as Card[]

  return { cards, total }
}

async function getFeaturedCards(limit: number): Promise<{ cards: Card[]; total: number }> {
  const sql = getDb()

  // Get cards from popular Pokemon, prioritizing Base Set
  const placeholders = FEATURED_POKEMON.map((_, i) => `$${i + 1}`).join(', ')

  const cardsQuery = `
    SELECT * FROM tcgdex_cards
    WHERE name_lower IN (${placeholders})
    ORDER BY
      CASE
        WHEN set_name = 'Base Set' THEN 0
        WHEN set_name = '151' THEN 1
        WHEN set_name LIKE '%Promo%' THEN 3
        ELSE 2
      END,
      name, set_name
    LIMIT $${FEATURED_POKEMON.length + 1}
  `

  const cards = await sql(cardsQuery, [...FEATURED_POKEMON, limit]) as Card[]

  // Get total count of all cards for the upsell message
  const countResult = await sql`SELECT COUNT(*) as count FROM tcgdex_cards`
  const total = parseInt(countResult[0].count as string, 10)

  return { cards, total }
}

export async function getCardById(id: string): Promise<Card | null> {
  const sql = getDb()
  const result = await sql`SELECT * FROM tcgdex_cards WHERE tcgdex_id = ${id} LIMIT 1`
  return (result[0] as Card) || null
}

export async function getAllSets(): Promise<string[]> {
  const sql = getDb()
  const result = await sql`
    SELECT DISTINCT set_name
    FROM tcgdex_cards
    WHERE set_name IS NOT NULL
    ORDER BY set_name
  `
  return result.map(row => row.set_name as string)
}

export async function getAllRarities(): Promise<string[]> {
  const sql = getDb()
  const result = await sql`
    SELECT DISTINCT rarity
    FROM tcgdex_cards
    WHERE rarity IS NOT NULL
    ORDER BY rarity
  `
  return result.map(row => row.rarity as string)
}
