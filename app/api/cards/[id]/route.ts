import { NextRequest, NextResponse } from 'next/server'
import { getCardById } from '@/lib/queries'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const card = await getCardById(params.id)

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(card)
  } catch (error) {
    console.error('Card fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch card' },
      { status: 500 }
    )
  }
}
