'use client'

import { Button } from '@/components/ui/button'

interface UpsellBannerProps {
  total: number
  limit: number
  searchCount: number
  showSearchLimit: boolean
}

export function UpsellBanner({ total, limit, searchCount, showSearchLimit }: UpsellBannerProps) {
  const hasMore = total > limit

  return (
    <div className="space-y-3">
      {hasMore && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm">
            Showing <span className="font-semibold">{limit}</span> of{' '}
            <span className="font-semibold">{total.toLocaleString()}</span> results.
          </p>
          <Button size="sm" asChild>
            <a href="#pricing">Get API access to see all</a>
          </Button>
        </div>
      )}

      {showSearchLimit && searchCount >= 20 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm">
            You&apos;ve searched <span className="font-semibold">{searchCount}</span> times.
          </p>
          <Button size="sm" variant="outline" asChild>
            <a href="#pricing">Unlock unlimited searches</a>
          </Button>
        </div>
      )}
    </div>
  )
}
