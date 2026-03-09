'use client'

import { useState, useEffect, useCallback } from 'react'
import { SearchInput } from '@/components/search-input'
import { FilterDropdowns } from '@/components/filter-dropdowns'
import { CardGrid } from '@/components/card-grid'
import { CardModal } from '@/components/card-modal'
import { UpsellBanner } from '@/components/upsell-banner'
import { CodeSnippets } from '@/components/code-snippets'
import { Button } from '@/components/ui/button'
import { Card } from '@/lib/queries'

const SEARCH_COUNT_KEY = 'pokemon-search-count'

export default function Home() {
  const [query, setQuery] = useState('')
  const [selectedSet, setSelectedSet] = useState('all')
  const [selectedRarity, setSelectedRarity] = useState('all')
  const [cardNumber, setCardNumber] = useState('')
  const [cards, setCards] = useState<Card[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [sets, setSets] = useState<string[]>([])
  const [rarities, setRarities] = useState<string[]>([])
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [searchCount, setSearchCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(SEARCH_COUNT_KEY)
    if (stored) {
      setSearchCount(parseInt(stored, 10))
    }
  }, [])

  useEffect(() => {
    async function fetchFilters() {
      try {
        const [setsRes, raritiesRes] = await Promise.all([
          fetch('/api/sets'),
          fetch('/api/rarities'),
        ])
        const setsData = await setsRes.json()
        const raritiesData = await raritiesRes.json()
        setSets(setsData.sets || [])
        setRarities(raritiesData.rarities || [])
      } catch (error) {
        console.error('Failed to fetch filters:', error)
      }
    }
    fetchFilters()
  }, [])

  const searchCards = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (selectedSet && selectedSet !== 'all') params.set('set', selectedSet)
      if (selectedRarity && selectedRarity !== 'all') params.set('rarity', selectedRarity)
      if (cardNumber) params.set('number', cardNumber)

      const res = await fetch(`/api/cards/search?${params}`)
      const data = await res.json()

      if (data.error) {
        setError(data.error)
        setCards([])
        setTotal(0)
        return
      }

      setCards(data.cards || [])
      setTotal(data.total || 0)

      const newCount = searchCount + 1
      setSearchCount(newCount)
      localStorage.setItem(SEARCH_COUNT_KEY, newCount.toString())
    } catch (err) {
      console.error('Search failed:', err)
      setError(err instanceof Error ? err.message : 'Search failed')
      setCards([])
      setTotal(0)
    } finally {
      setIsLoading(false)
    }
  }, [query, selectedSet, selectedRarity, cardNumber, searchCount])

  useEffect(() => {
    searchCards()
  }, [query, selectedSet, selectedRarity, cardNumber]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="min-h-screen">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Pokemon Card Search</h1>
          <nav className="flex gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="#api">API Docs</a>
            </Button>
            <Button size="sm" asChild>
              <a href="#pricing">Pricing</a>
            </Button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Search 22,755 Pokemon Cards</h2>
          <p className="text-muted-foreground">
            Try our free demo. Access the full API for your projects.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by card name (e.g., Charizard, Pikachu)..."
          />
          <FilterDropdowns
            sets={sets}
            rarities={rarities}
            selectedSet={selectedSet}
            selectedRarity={selectedRarity}
            cardNumber={cardNumber}
            onSetChange={setSelectedSet}
            onRarityChange={setSelectedRarity}
            onNumberChange={setCardNumber}
          />
        </div>

        <div className="mb-4">
          <UpsellBanner
            total={total}
            limit={10}
            searchCount={searchCount}
            showSearchLimit={searchCount >= 20}
          />
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          {error && (
            <div className="text-red-500 mb-2">Error: {error}</div>
          )}
          {!isLoading && !error && total > 0 && (
            <span>{total.toLocaleString()} cards found</span>
          )}
        </div>

        <CardGrid
          cards={cards}
          isLoading={isLoading}
          onCardClick={setSelectedCard}
        />

        <CardModal
          card={selectedCard}
          open={!!selectedCard}
          onClose={() => setSelectedCard(null)}
        />

        <section id="api" className="mt-16 pt-8 border-t border-border">
          <h3 className="text-2xl font-bold mb-4">API Examples</h3>
          <p className="text-muted-foreground mb-6">
            Integrate Pokemon card data into your application with our simple REST API.
          </p>
          <CodeSnippets />
        </section>

        <section id="pricing" className="mt-16 pt-8 border-t border-border">
          <h3 className="text-2xl font-bold mb-4">API Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-bold mb-2">Free</h4>
              <p className="text-3xl font-bold mb-4">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>10 results per search</li>
                <li>20 searches/day</li>
                <li>Basic card data</li>
              </ul>
              <Button variant="outline" className="w-full">Current Plan</Button>
            </div>
            <div className="bg-card border-2 border-primary rounded-lg p-6">
              <h4 className="font-bold mb-2">Pro</h4>
              <p className="text-3xl font-bold mb-4">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>Unlimited results</li>
                <li>10,000 requests/day</li>
                <li>Full card metadata</li>
                <li>Price data</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-bold mb-2">Enterprise</h4>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>Unlimited everything</li>
                <li>Dedicated support</li>
                <li>Custom integrations</li>
                <li>SLA guarantee</li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Pokemon Card Search API - Demo built with Next.js and Neon</p>
          <p className="mt-2">Data sourced from TCGdex. Pokemon is a trademark of Nintendo.</p>
        </footer>
      </div>
    </main>
  )
}
