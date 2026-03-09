'use client'

import Image from 'next/image'
import { Card } from '@/lib/queries'
import { Badge } from '@/components/ui/badge'

interface CardItemProps {
  card: Card
  onClick: () => void
}

export function CardItem({ card, onClick }: CardItemProps) {
  const imageUrl = card.image_url ? `${card.image_url}/high.webp` : '/placeholder.png'

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-lg bg-card border border-border p-3 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[2.5/3.5] w-full overflow-hidden rounded-md bg-muted">
        <Image
          src={imageUrl}
          alt={card.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-sm truncate">{card.name}</h3>
        <p className="text-xs text-muted-foreground truncate">{card.set_name}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">#{card.local_id}</span>
          {card.rarity && (
            <Badge variant="secondary" className="text-xs">
              {card.rarity}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
