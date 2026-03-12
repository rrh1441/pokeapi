import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getSetBySlug, getCardsBySet, Card } from '@/lib/queries'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const setName = await getSetBySlug(slug)

  if (!setName) {
    return {
      title: 'Set Not Found',
    }
  }

  const title = `${setName} - Pokemon Card Set | Complete Card List`
  const description = `Browse all Pokemon cards from ${setName}. View card images, rarities, and details for every card in the set.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

function getJsonLd(setName: string, cards: Card[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${setName} Pokemon Card Set`,
    description: `Complete list of Pokemon cards from ${setName}`,
    numberOfItems: cards.length,
    itemListElement: cards.slice(0, 50).map((card, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: `${card.name} #${card.local_id}`,
        image: card.image_url ? `${card.image_url}/high.webp` : undefined,
        url: `https://pokecardapi.com/cards/${card.tcgdex_id}`,
      },
    })),
  }
}

export default async function SetPage({ params }: Props) {
  const { slug } = await params
  const setName = await getSetBySlug(slug)

  if (!setName) {
    notFound()
  }

  const cards = await getCardsBySet(setName, 500)
  const jsonLd = getJsonLd(setName, cards)

  // Group cards by rarity
  const cardsByRarity: Record<string, Card[]> = {}
  cards.forEach((card) => {
    const rarity = card.rarity || 'Unknown'
    if (!cardsByRarity[rarity]) {
      cardsByRarity[rarity] = []
    }
    cardsByRarity[rarity].push(card)
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/sets" className="hover:text-foreground">
              Sets
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{setName}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">{setName}</h1>
            <p className="text-muted-foreground mt-2">
              {cards.length} cards in this set
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-2xl font-bold text-foreground">{cards.length}</p>
              <p className="text-sm text-muted-foreground">Total Cards</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-2xl font-bold text-foreground">
                {cards.filter((c) => c.has_holo).length}
              </p>
              <p className="text-sm text-muted-foreground">Holo Cards</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-2xl font-bold text-foreground">
                {Object.keys(cardsByRarity).length}
              </p>
              <p className="text-sm text-muted-foreground">Rarity Types</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-2xl font-bold text-foreground">
                {new Set(cards.map((c) => c.illustrator).filter(Boolean)).size}
              </p>
              <p className="text-sm text-muted-foreground">Illustrators</p>
            </div>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {cards.map((card) => (
              <Link
                key={card.tcgdex_id}
                href={`/cards/${card.tcgdex_id}`}
                className="group"
              >
                <div className="bg-card rounded-lg border overflow-hidden transition-transform group-hover:scale-105 group-hover:shadow-lg">
                  {card.image_url ? (
                    <Image
                      src={`${card.image_url}/low.webp`}
                      alt={`${card.name} - ${card.set_name}`}
                      width={200}
                      height={280}
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="w-full aspect-[5/7] bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">No image</span>
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {card.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      #{card.local_id} · {card.rarity || 'Unknown'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Search
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
