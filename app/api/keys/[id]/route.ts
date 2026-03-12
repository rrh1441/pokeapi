import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { revokeApiKey } from '@/lib/api-keys'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const keyId = parseInt(id)

    if (isNaN(keyId)) {
      return NextResponse.json(
        { error: 'Invalid key ID' },
        { status: 400 }
      )
    }

    await revokeApiKey(keyId, parseInt(session.user.id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Revoke key error:', error)
    return NextResponse.json(
      { error: 'Failed to revoke API key' },
      { status: 500 }
    )
  }
}
