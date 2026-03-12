import { searchCards, getAllSets, getAllRarities, Card } from '@/lib/queries'
import { SearchPage } from '@/components/search-page'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': '/#organization',
      name: 'Pokemon Card API',
      description:
        'Pokemon card search API with 22,755 cards, real-time eBay pricing, and graded card values.',
      url: '/',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': '/#website',
      url: '/',
      name: 'Pokemon Card Search API',
      description:
        'Search and access data for 22,755 Pokemon cards with real-time pricing.',
      publisher: {
        '@id': '/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: '/?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebAPI',
      '@id': '/#api',
      name: 'Pokemon Card Search API',
      description:
        'RESTful API for searching Pokemon cards with pricing data, graded card values, and market analytics.',
      provider: {
        '@id': '/#organization',
      },
      documentation: '/docs',
      termsOfService: '/pricing',
    },
  ],
}

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SearchPage
        initialCards={initialCards}
        initialTotal={initialTotal}
        sets={sets}
        rarities={rarities}
      />
    </>
  )
}
