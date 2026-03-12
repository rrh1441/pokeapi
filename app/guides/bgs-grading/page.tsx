import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'BGS Grading Guide | Beckett Card Grading Explained',
  description:
    'Complete guide to BGS/Beckett grading. Learn about subgrades (centering, corners, edges, surface), BGS 10 Black Labels, and how BGS compares to PSA.',
  keywords: ['BGS grading', 'Beckett grading', 'BGS 10', 'Black Label', 'BGS subgrades'],
  openGraph: {
    title: 'BGS Grading Guide for Pokemon Cards',
    description: 'Everything about Beckett grading: subgrades, Black Labels, and value impact.',
  },
}

export default function BGSGradingGuidePage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-foreground">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">BGS Grading</span>
        </nav>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            BGS Grading Guide: Beckett Grading Explained
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            BGS (Beckett Grading Services) is known for its detailed subgrade system and strict
            grading standards. Founded in 1999, Beckett offers collectors transparent insights
            into exactly why a card received its grade.
          </p>

          {/* Table of Contents */}
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">In This Guide</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#subgrades" className="hover:text-primary">The 4 Subgrades Explained</a></li>
              <li><a href="#grading-scale" className="hover:text-primary">BGS Grading Scale</a></li>
              <li><a href="#black-label" className="hover:text-primary">BGS 10 Black Label</a></li>
              <li><a href="#bgs-vs-psa" className="hover:text-primary">BGS vs PSA Comparison</a></li>
              <li><a href="#costs" className="hover:text-primary">Costs & Turnaround</a></li>
            </ul>
          </div>

          {/* Subgrades */}
          <section id="subgrades" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">The 4 Subgrades</h2>
            <p className="text-muted-foreground mb-4">
              What makes BGS unique is the subgrade system. Every card receives four individual
              scores that combine into the final grade:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Centering</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Measures how well-centered the image is within the card borders. BGS checks
                  both front and back centering.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p><strong>10:</strong> 50/50 to 55/45</p>
                  <p><strong>9.5:</strong> 55/45 to 60/40</p>
                  <p><strong>9:</strong> 60/40 to 65/35</p>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Corners</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Examines all four corners for sharpness, whitening, and wear. Even minor
                  corner issues can drop this subgrade.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p><strong>10:</strong> Perfect, razor-sharp</p>
                  <p><strong>9.5:</strong> Nearly perfect</p>
                  <p><strong>9:</strong> Very minor imperfection</p>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Edges</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Checks all four edges for chipping, whitening, or damage. Edges are examined
                  under magnification.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p><strong>10:</strong> Flawless edges</p>
                  <p><strong>9.5:</strong> Nearly flawless</p>
                  <p><strong>9:</strong> Minor edge wear</p>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Surface</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Evaluates the card surface for scratches, print defects, and gloss. Both
                  front and back surfaces are examined.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p><strong>10:</strong> Perfect surface</p>
                  <p><strong>9.5:</strong> Virtually perfect</p>
                  <p><strong>9:</strong> Very minor issues</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 border rounded-lg p-4 mt-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">How the final grade is calculated:</strong>{' '}
                BGS averages the four subgrades, but rounds down to the nearest half grade.
                So four 9.5s = BGS 9.5, but three 10s and one 9.5 = BGS 9.5, not 10.
              </p>
            </div>
          </section>

          {/* Grading Scale */}
          <section id="grading-scale" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">BGS Grading Scale</h2>
            <p className="text-muted-foreground mb-4">
              BGS uses half grades (9.5, 8.5, etc.) unlike PSA, providing more granularity:
            </p>

            <div className="space-y-3">
              <div className="bg-card border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-foreground">BGS 10 (Black Label)</span>
                  <p className="text-sm text-muted-foreground">All four subgrades are 10. The pinnacle.</p>
                </div>
                <span className="bg-black text-white px-3 py-1 rounded text-sm">Pristine</span>
              </div>

              <div className="bg-card border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-foreground">BGS 10 (Gold Label)</span>
                  <p className="text-sm text-muted-foreground">Final grade is 10, subgrades include 9.5s.</p>
                </div>
                <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm">Pristine</span>
              </div>

              <div className="bg-card border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-foreground">BGS 9.5</span>
                  <p className="text-sm text-muted-foreground">Gem Mint. The most sought-after grade.</p>
                </div>
                <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">Gem Mint</span>
              </div>

              <div className="bg-card border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-foreground">BGS 9</span>
                  <p className="text-sm text-muted-foreground">Mint condition. Excellent card.</p>
                </div>
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Mint</span>
              </div>

              <div className="bg-card border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-foreground">BGS 8.5 - 8</span>
                  <p className="text-sm text-muted-foreground">Near Mint to Near Mint-Mint.</p>
                </div>
                <span className="bg-gray-500 text-white px-3 py-1 rounded text-sm">NM-MT</span>
              </div>
            </div>
          </section>

          {/* Black Label */}
          <section id="black-label" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">BGS 10 Black Label</h2>

            <div className="bg-card border rounded-lg p-6 mb-4">
              <p className="text-muted-foreground mb-4">
                The BGS 10 Black Label is the holy grail of card grading. To achieve this,
                a card must receive perfect 10s in ALL four subgrade categories:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Centering: 10
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Corners: 10
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Edges: 10
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Surface: 10
                </li>
              </ul>
            </div>

            <p className="text-muted-foreground mb-4">
              Black Labels are extremely rare. For popular cards, less than 1% of submissions
              achieve this grade. This rarity makes Black Labels highly valuable - often
              commanding 2-5x the price of a regular BGS 10 or PSA 10.
            </p>

            <div className="bg-muted/50 border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Example:</strong> A Base Set Charizard PSA 10
                might sell for $25,000, while a BGS 10 Black Label of the same card could
                fetch $75,000-100,000+.
              </p>
            </div>
          </section>

          {/* BGS vs PSA */}
          <section id="bgs-vs-psa" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">BGS vs PSA</h2>

            <div className="bg-card border rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-foreground">Aspect</th>
                    <th className="text-left p-4 text-foreground">BGS</th>
                    <th className="text-left p-4 text-foreground">PSA</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-4">Subgrades</td>
                    <td className="p-4 text-green-500">Yes (4 categories)</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Half Grades</td>
                    <td className="p-4 text-green-500">Yes (9.5, 8.5, etc.)</td>
                    <td className="p-4">No (whole numbers only)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Case Size</td>
                    <td className="p-4">Thicker, more protective</td>
                    <td className="p-4 text-green-500">Slimmer, more stackable</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Market Liquidity</td>
                    <td className="p-4">Good</td>
                    <td className="p-4 text-green-500">Best</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Grading Strictness</td>
                    <td className="p-4 text-green-500">Stricter</td>
                    <td className="p-4">Slightly more lenient</td>
                  </tr>
                  <tr>
                    <td className="p-4">Best For</td>
                    <td className="p-4">Personal collection, transparency</td>
                    <td className="p-4">Resale value, market recognition</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Costs */}
          <section id="costs" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Costs & Turnaround Times</h2>

            <div className="bg-card border rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-foreground">Service</th>
                    <th className="text-left p-4 text-foreground">Price/Card</th>
                    <th className="text-left p-4 text-foreground">Turnaround</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-4">Economy</td>
                    <td className="p-4">$22</td>
                    <td className="p-4">45+ business days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Standard</td>
                    <td className="p-4">$40</td>
                    <td className="p-4">20+ business days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Express</td>
                    <td className="p-4">$100</td>
                    <td className="p-4">10+ business days</td>
                  </tr>
                  <tr>
                    <td className="p-4">Premium</td>
                    <td className="p-4">$250</td>
                    <td className="p-4">2-5 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              *Prices subject to change. Check beckett.com for current rates.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-card border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Compare All Grading Companies
            </h2>
            <p className="text-muted-foreground mb-6">
              Not sure which grading service is right for you? Read our full comparison.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/guides/which-grading-company"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
              >
                PSA vs BGS vs CGC
              </Link>
              <Link
                href="/"
                className="bg-muted text-foreground px-6 py-2 rounded-lg font-medium hover:bg-muted/80 transition"
              >
                Search Cards
              </Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}
