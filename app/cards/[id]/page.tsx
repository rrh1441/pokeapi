import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCardById, Card } from '@/lib/queries'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const card = await getCardById(id)

  if (!card) {
    return {
      title: 'Card Not Found',
    }
  }

  const title = `${card.name} - ${card.set_name} #${card.local_id} | Pokemon Card`
  const description = `${card.name} from ${card.set_name}. ${card.rarity || 'Pokemon'} card #${card.local_id}. ${card.hp ? `HP: ${card.hp}.` : ''} ${card.types ? `Type: ${JSON.parse(card.types).join(', ')}.` : ''} View card details and pricing.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: card.image_url ? [`${card.image_url}/high.webp`] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: card.image_url ? [`${card.image_url}/high.webp`] : [],
    },
  }
}

function getJsonLd(card: Card) {
  const types = card.types ? JSON.parse(card.types) : []

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${card.name} - ${card.set_name} #${card.local_id}`,
    description: `${card.name} Pokemon card from ${card.set_name}. ${card.rarity || ''} #${card.local_id}.`,
    image: card.image_url ? `${card.image_url}/high.webp` : undefined,
    brand: {
      '@type': 'Brand',
      name: 'Pokemon TCG',
    },
    category: 'Trading Cards',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Set',
        value: card.set_name,
      },
      {
        '@type': 'PropertyValue',
        name: 'Card Number',
        value: card.local_id,
      },
      ...(card.rarity
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Rarity',
              value: card.rarity,
            },
          ]
        : []),
      ...(card.hp
        ? [
            {
              '@type': 'PropertyValue',
              name: 'HP',
              value: card.hp,
            },
          ]
        : []),
      ...(types.length > 0
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Type',
              value: types.join(', '),
            },
          ]
        : []),
      ...(card.illustrator
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Illustrator',
              value: card.illustrator,
            },
          ]
        : []),
    ],
  }
}

export default async function CardPage({ params }: Props) {
  const { id } = await params
  const card = await getCardById(id)

  if (!card) {
    notFound()
  }

  const types = card.types ? JSON.parse(card.types) : []
  const jsonLd = getJsonLd(card)

  // Generate slug for price page link
  const priceSlug = `${card.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${card.set_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/sets/${card.set_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="hover:text-foreground"
            >
              {card.set_name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{card.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Image */}
            <div className="flex justify-center">
              {card.image_url ? (
                <Image
                  src={`${card.image_url}/high.webp`}
                  alt={`${card.name} - ${card.set_name} Pokemon Card`}
                  width={400}
                  height={560}
                  className="rounded-lg shadow-xl"
                  priority
                />
              ) : (
                <div className="w-[400px] h-[560px] bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">No image available</span>
                </div>
              )}
            </div>

            {/* Card Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{card.name}</h1>
                <p className="text-xl text-muted-foreground mt-1">
                  {card.set_name} · #{card.local_id}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {card.rarity && (
                  <div className="bg-card p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Rarity</p>
                    <p className="text-lg font-medium text-foreground">{card.rarity}</p>
                  </div>
                )}
                {card.hp && (
                  <div className="bg-card p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">HP</p>
                    <p className="text-lg font-medium text-foreground">{card.hp}</p>
                  </div>
                )}
                {types.length > 0 && (
                  <div className="bg-card p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="text-lg font-medium text-foreground">{types.join(', ')}</p>
                  </div>
                )}
                {card.category && (
                  <div className="bg-card p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="text-lg font-medium text-foreground">{card.category}</p>
                  </div>
                )}
              </div>

              {card.illustrator && (
                <div className="bg-card p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground">Illustrator</p>
                  <p className="text-lg font-medium text-foreground">{card.illustrator}</p>
                </div>
              )}

              <div className="flex gap-2">
                {card.has_holo === 1 && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm">
                    Holo
                  </span>
                )}
                {card.has_reverse === 1 && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full text-sm">
                    Reverse Holo
                  </span>
                )}
              </div>

              {/* Price CTA */}
              <div className="bg-card p-6 rounded-lg border mt-6">
                <h2 className="text-lg font-semibold mb-2">Check Market Price</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  See recent eBay sold prices for this card
                </p>
                <Link
                  href={`/prices/${priceSlug}`}
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                  View Prices
                </Link>
              </div>

              {/* API CTA */}
              <div className="bg-muted/50 p-4 rounded-lg text-sm">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">API ID:</strong>{' '}
                  <code className="bg-muted px-2 py-1 rounded">{card.tcgdex_id}</code>
                </p>
                <p className="mt-2 text-muted-foreground">
                  Access this card via API:{' '}
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    GET /api/cards/{card.tcgdex_id}
                  </code>
                </p>
              </div>
            </div>
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
