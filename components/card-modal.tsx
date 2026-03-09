'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/lib/queries'

interface CardModalProps {
  card: Card | null
  open: boolean
  onClose: () => void
}

export function CardModal({ card, open, onClose }: CardModalProps) {
  const [showJson, setShowJson] = useState(false)

  if (!card) return null

  const imageUrl = card.image_url ? `${card.image_url}/high.webp` : '/placeholder.png'
  const types = card.types ? JSON.parse(card.types) : []

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{card.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[2.5/3.5] w-full bg-muted rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={card.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Set</h4>
              <p>{card.set_name}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Card Number</h4>
              <p>#{card.local_id}</p>
            </div>

            {card.rarity && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Rarity</h4>
                <Badge variant="secondary">{card.rarity}</Badge>
              </div>
            )}

            {card.category && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                <p>{card.category}</p>
              </div>
            )}

            {card.hp && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">HP</h4>
                <p>{card.hp}</p>
              </div>
            )}

            {types.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Types</h4>
                <div className="flex gap-1 flex-wrap">
                  {types.map((type: string) => (
                    <Badge key={type} variant="outline">{type}</Badge>
                  ))}
                </div>
              </div>
            )}

            {card.illustrator && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Illustrator</h4>
                <p>{card.illustrator}</p>
              </div>
            )}

            <div className="flex gap-2">
              {card.has_holo === 1 && <Badge>Holo</Badge>}
              {card.has_reverse === 1 && <Badge>Reverse Holo</Badge>}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowJson(!showJson)}
              className="w-full"
            >
              {showJson ? 'Hide' : 'View'} JSON
            </Button>
          </div>
        </div>

        {showJson && (
          <div className="mt-4">
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
              {JSON.stringify(card, null, 2)}
            </pre>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
