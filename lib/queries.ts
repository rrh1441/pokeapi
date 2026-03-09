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
  limit?: number
}

// Popular Pokemon to feature when no search query
const FEATURED_POKEMON = [
  'charizard', 'pikachu', 'mewtwo', 'blastoise', 'venusaur',
  'gengar', 'dragonite', 'mew', 'gyarados', 'snorlax',
  'eevee', 'lugia', 'ho-oh', 'rayquaza', 'umbreon'
]

export async function searchCards(params: SearchParams): Promise<{ cards: Card[]; total: number }> {
  const sql = getDb()
  const { query, set, rarity, number, limit = 10 } = params

  // If no search params, show featured/popular cards
  if (!query && !set && !rarity && !number) {
    return getFeaturedCards(limit)
  }

  const conditions: string[] = []
  const values: (string | number)[] = []
  let paramIndex = 1

  if (query) {
    conditions.push(`name_lower LIKE $${paramIndex}`)
    values.push(`%${query.toLowerCase()}%`)
    paramIndex++
  }

  if (set) {
    conditions.push(`set_name_lower LIKE $${paramIndex}`)
    values.push(`%${set.toLowerCase()}%`)
    paramIndex++
  }

  if (rarity) {
    conditions.push(`rarity = $${paramIndex}`)
    values.push(rarity)
    paramIndex++
  }

  if (number) {
    conditions.push(`local_id = $${paramIndex}`)
    values.push(number)
    paramIndex++
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
