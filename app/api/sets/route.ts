import { NextResponse } from 'next/server'
import { getAllSets } from '@/lib/queries'

export const runtime = 'edge'

export async function GET() {
  try {
    const sets = await getAllSets()
    return NextResponse.json({ sets })
  } catch (error) {
    console.error('Sets fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sets' },
      { status: 500 }
    )
  }
}
