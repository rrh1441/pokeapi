'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlanType } from '@/lib/stripe'

interface PricingButtonProps {
  plan: PlanType | 'free' | 'enterprise'
  highlighted?: boolean
  children: React.ReactNode
}

export function PricingButton({ plan, highlighted, children }: PricingButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    if (plan === 'free') {
      router.push('/docs')
      return
    }

    if (plan === 'enterprise') {
      window.location.href = 'mailto:api@pokecardapi.com?subject=Enterprise%20Plan%20Inquiry'
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      const data = await res.json()

      if (data.error === 'You must be logged in to subscribe') {
        // Redirect to login with return URL
        router.push('/login?redirect=/pricing')
        return
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned')
      }
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`block w-full text-center py-2 px-4 rounded-lg font-medium transition disabled:opacity-50 ${
        highlighted
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'bg-muted text-foreground hover:bg-muted/80'
      }`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
