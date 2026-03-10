import { searchCards, getAllSets, getAllRarities, Card } from '@/lib/queries'
import { SearchPage } from '@/components/search-page'

export default async function Home() {
  // Pre-fetch initial data on the server for instant display
  let initialCards: Card[] = []
  let initialTotal = 0
  let sets: string[] = []
  let rarities: string[] = []

  try {
    const [cardsResult, setsResult, raritiesResult] = await Promise.all([
      searchCards({ limit: 10 }),
      getAllSets(),
      getAllRarities(),
    ])
    initialCards = cardsResult.cards
    initialTotal = cardsResult.total
    sets = setsResult
    rarities = raritiesResult
  } catch (error) {
    console.error('Failed to fetch initial data:', error)
  }

  return (
    <SearchPage
      initialCards={initialCards}
      initialTotal={initialTotal}
      sets={sets}
      rarities={rarities}
    />
  )
}
