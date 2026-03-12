import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'API Documentation | Pokemon Card API',
  description:
    'Complete API documentation for the Pokemon Card API. Search 22,755 cards, get card details, browse sets and rarities. Code examples in curl, Python, and JavaScript.',
  openGraph: {
    title: 'Pokemon Card API Documentation',
    description: 'Search 22,755 Pokemon cards via REST API. Full documentation with code examples.',
  },
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">API Documentation</span>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-4">API Documentation</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Access 22,755 Pokemon cards via our REST API. Search by name, set, rarity, and more.
        </p>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Start</h2>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              Make your first API call to search for Charizard cards:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`curl "https://pokecardapi.com/api/cards/search?q=charizard&limit=5"`}</code>
            </pre>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Authentication</h2>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              The free tier allows limited searches without authentication. For full access,
              subscribe via RapidAPI and include your API key in the header:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`curl -H "X-API-Key: YOUR_API_KEY" \\
  "https://pokecardapi.com/api/cards/search?q=pikachu"`}</code>
            </pre>
            <div className="mt-4">
              <Link
                href="/pricing"
                className="text-primary hover:underline"
              >
                View pricing plans →
              </Link>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Endpoints</h2>

          {/* Search Cards */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-sm font-mono">
                GET
              </span>
              <code className="text-foreground">/api/cards/search</code>
            </div>
            <p className="text-muted-foreground mb-4">Search for Pokemon cards.</p>

            <h4 className="font-medium text-foreground mb-2">Parameters</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-foreground">Parameter</th>
                    <th className="text-left py-2 text-foreground">Type</th>
                    <th className="text-left py-2 text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2"><code>q</code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Search query (card name, can include number like &quot;charizard 4&quot;)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>set</code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Filter by set name</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>rarity</code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Filter by rarity (Common, Uncommon, Rare, Rare Holo, etc.)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>number</code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Filter by card number</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>holo</code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Filter: holo, reverse, or non-holo</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>limit</code></td>
                    <td className="py-2">number</td>
                    <td className="py-2">Max results (default 10, max 100 with API key)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-medium text-foreground mt-6 mb-2">Example Response</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`{
  "cards": [
    {
      "tcgdex_id": "base1-4",
      "name": "Charizard",
      "set_name": "Base Set",
      "local_id": "4",
      "rarity": "Rare Holo",
      "image_url": "https://assets.tcgdex.net/en/base/base1/4",
      "hp": 120,
      "types": "[\\"Fire\\"]",
      "illustrator": "Mitsuhiro Arita",
      "has_holo": 1,
      "has_reverse": 0
    }
  ],
  "total": 45
}`}</code>
            </pre>
          </div>

          {/* Get Card */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-sm font-mono">
                GET
              </span>
              <code className="text-foreground">/api/cards/[id]</code>
            </div>
            <p className="text-muted-foreground mb-4">Get a single card by its TCGdex ID.</p>

            <h4 className="font-medium text-foreground mb-2">Example</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`curl "https://pokecardapi.com/api/cards/base1-4"`}</code>
            </pre>
          </div>

          {/* List Sets */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-sm font-mono">
                GET
              </span>
              <code className="text-foreground">/api/sets</code>
            </div>
            <p className="text-muted-foreground mb-4">Get a list of all Pokemon TCG sets.</p>

            <h4 className="font-medium text-foreground mb-2">Example Response</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`["Base Set", "Jungle", "Fossil", "Base Set 2", ...]`}</code>
            </pre>
          </div>

          {/* List Rarities */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-sm font-mono">
                GET
              </span>
              <code className="text-foreground">/api/rarities</code>
            </div>
            <p className="text-muted-foreground mb-4">Get a list of all card rarities.</p>

            <h4 className="font-medium text-foreground mb-2">Example Response</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`["Common", "Uncommon", "Rare", "Rare Holo", "Ultra Rare", ...]`}</code>
            </pre>
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Code Examples</h2>

          {/* Python */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Python</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import requests

response = requests.get(
    "https://pokecardapi.com/api/cards/search",
    params={"q": "charizard", "set": "base set", "limit": 5},
    headers={"X-API-Key": "YOUR_API_KEY"}
)

data = response.json()
for card in data["cards"]:
    print(f"{card['name']} - {card['set_name']} #{card['local_id']}")`}</code>
            </pre>
          </div>

          {/* JavaScript */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-foreground mb-4">JavaScript</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`const response = await fetch(
  "https://pokecardapi.com/api/cards/search?q=charizard&limit=5",
  {
    headers: { "X-API-Key": "YOUR_API_KEY" }
  }
);

const data = await response.json();
data.cards.forEach(card => {
  console.log(\`\${card.name} - \${card.set_name} #\${card.local_id}\`);
});`}</code>
            </pre>
          </div>

          {/* curl */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">curl</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Search for Pikachu cards
curl -H "X-API-Key: YOUR_API_KEY" \\
  "https://pokecardapi.com/api/cards/search?q=pikachu&limit=10"

# Get a specific card
curl "https://pokecardapi.com/api/cards/base1-25"

# List all sets
curl "https://pokecardapi.com/api/sets"`}</code>
            </pre>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Rate Limits</h2>
          <div className="bg-card border rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-foreground">Plan</th>
                    <th className="text-left py-2 text-foreground">Requests/Month</th>
                    <th className="text-left py-2 text-foreground">Results/Query</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2">Free (no key)</td>
                    <td className="py-2">100</td>
                    <td className="py-2">10</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Basic ($9.99/mo)</td>
                    <td className="py-2">5,000</td>
                    <td className="py-2">50</td>
                  </tr>
                  <tr>
                    <td className="py-2">Pro ($29.99/mo)</td>
                    <td className="py-2">25,000</td>
                    <td className="py-2">100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Link href="/pricing" className="text-primary hover:underline">
                View full pricing details →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-card border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">
            Get your API key and start building with Pokemon card data today.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Get API Access
          </Link>
        </section>
      </div>
    </main>
  )
}
