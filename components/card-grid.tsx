'use client'

import { Card } from '@/lib/queries'
import { CardItem } from './card-item'
import { Skeleton } from '@/components/ui/skeleton'

interface CardGridProps {
  cards: Card[]
  isLoading: boolean
  searchComplete?: boolean // Only show "no results" when search is truly complete
  onCardClick: (card: Card) => void
}

export function CardGrid({ cards, isLoading, searchComplete = true, onCardClick }: CardGridProps) {
  // Show skeletons when loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-card border border-border p-3">
            <Skeleton className="aspect-[2.5/3.5] w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 mt-3" />
            <Skeleton className="h-3 w-1/2 mt-2" />
            <Skeleton className="h-5 w-1/4 mt-2" />
          </div>
        ))}
      </div>
    )
  }

  // Only show empty state when search is complete and we have no results
  if (cards.length === 0 && searchComplete) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No matching cards found. Try adjusting your search.</p>
      </div>
    )
  }

  // If cards is empty but search isn't complete, show nothing (transitioning)
  if (cards.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <CardItem
          key={card.tcgdex_id}
          card={card}
          onClick={() => onCardClick(card)}
        />
      ))}
    </div>
  )
}
