import { NextRequest, NextResponse } from 'next/server'
import { searchCards } from '@/lib/queries'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query = searchParams.get('q') || undefined
    const set = searchParams.get('set') || undefined
    const rarity = searchParams.get('rarity') || undefined
    const number = searchParams.get('number') || undefined
    const holoParam = searchParams.get('holo') as 'holo' | 'reverse' | 'non-holo' | null
    const holo = holoParam && ['holo', 'reverse', 'non-holo'].includes(holoParam) ? holoParam : undefined
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? Math.min(parseInt(limitParam, 10), 10) : 10

    const { cards, total } = await searchCards({ query, set, rarity, number, holo, limit })

    return NextResponse.json({ cards, total, limit })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search cards' },
      { status: 500 }
    )
  }
}
