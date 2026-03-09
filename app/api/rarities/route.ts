import { NextResponse } from 'next/server'
import { getAllRarities } from '@/lib/queries'

export const runtime = 'edge'

export async function GET() {
  try {
    const rarities = await getAllRarities()
    return NextResponse.json({ rarities })
  } catch (error) {
    console.error('Rarities fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rarities' },
      { status: 500 }
    )
  }
}
