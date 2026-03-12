'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlanType } from '@/lib/stripe'
import Link from 'next/link'

interface SubscriptionManagerProps {
  hasSubscription: boolean
  plan: PlanType
}

export function SubscriptionManager({ hasSubscription, plan }: SubscriptionManagerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function openPortal() {
    setIsLoading(true)

    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Portal error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!hasSubscription) {
    return (
      <Link
        href="/pricing"
        className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
      >
        Upgrade to Pro
      </Link>
    )
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={openPortal}
        disabled={isLoading}
        className="bg-muted text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted/80 disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Manage Subscription'}
      </button>
      {plan !== 'enterprise' && (
        <Link
          href="/pricing"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          Upgrade Plan
        </Link>
      )}
    </div>
  )
}
