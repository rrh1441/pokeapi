import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PSA vs BGS vs CGC | Which Grading Company Should You Use?',
  description:
    'Compare PSA, BGS, and CGC grading companies. Find the best card grading service for your Pokemon cards based on value, cost, and turnaround time.',
  keywords: ['PSA vs BGS', 'PSA vs CGC', 'BGS vs CGC', 'best card grading company', 'which grading company'],
  openGraph: {
    title: 'PSA vs BGS vs CGC: Which Grading Company Is Best?',
    description: 'Complete comparison of the top 3 Pokemon card grading companies.',
  },
}

export default function WhichGradingCompanyPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-foreground">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Which Grading Company</span>
        </nav>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            PSA vs BGS vs CGC: Which Grading Company Should You Use?
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Choosing the right grading company can significantly impact your card&apos;s value
            and saleability. This guide breaks down the pros and cons of each major
            grading service to help you make the best decision.
          </p>

          {/* Quick Answer */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Quick Answer</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">For maximum resale value:</strong> PSA</li>
              <li><strong className="text-foreground">For detailed subgrades:</strong> BGS</li>
              <li><strong className="text-foreground">For budget grading:</strong> CGC</li>
              <li><strong className="text-foreground">For fastest turnaround:</strong> BGS or CGC (varies)</li>
            </ul>
          </div>

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Side-by-Side Comparison</h2>

            <div className="bg-card border rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-foreground">Factor</th>
                    <th className="text-center p-4 text-foreground">PSA</th>
                    <th className="text-center p-4 text-foreground">BGS</th>
                    <th className="text-center p-4 text-foreground">CGC</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-4 font-medium">Founded</td>
                    <td className="text-center p-4">1991</td>
                    <td className="text-center p-4">1999</td>
                    <td className="text-center p-4">2020</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Market Share</td>
                    <td className="text-center p-4 text-green-500">Highest</td>
                    <td className="text-center p-4">Medium</td>
                    <td className="text-center p-4">Growing</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Starting Price</td>
                    <td className="text-center p-4">$25</td>
                    <td className="text-center p-4">$22</td>
                    <td className="text-center p-4 text-green-500">$15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Turnaround (Economy)</td>
                    <td className="text-center p-4">65+ days</td>
                    <td className="text-center p-4">45+ days</td>
                    <td className="text-center p-4 text-green-500">45+ days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Subgrades</td>
                    <td className="text-center p-4">No</td>
                    <td className="text-center p-4 text-green-500">Yes (included)</td>
                    <td className="text-center p-4">Yes (extra fee)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Half Grades</td>
                    <td className="text-center p-4">No</td>
                    <td className="text-center p-4 text-green-500">Yes</td>
                    <td className="text-center p-4 text-green-500">Yes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Resale Premium</td>
                    <td className="text-center p-4 text-green-500">Highest</td>
                    <td className="text-center p-4">High</td>
                    <td className="text-center p-4">Moderate</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Grading Strictness</td>
                    <td className="text-center p-4">Moderate</td>
                    <td className="text-center p-4 text-green-500">Strictest</td>
                    <td className="text-center p-4">Moderate</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Case Style</td>
                    <td className="text-center p-4">Slim</td>
                    <td className="text-center p-4">Thick</td>
                    <td className="text-center p-4">Slim</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* When to Use Each */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">When to Use Each Company</h2>

            {/* PSA */}
            <div className="bg-card border rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏆</span>
                <h3 className="text-xl font-semibold text-foreground">Use PSA When...</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>• You plan to sell the card (highest market recognition)</li>
                <li>• You have high-value vintage cards ($500+)</li>
                <li>• You want the most liquid graded cards</li>
                <li>• The card is a key vintage piece (Base Set Charizard, etc.)</li>
                <li>• You&apos;re building an investment-grade collection</li>
              </ul>
              <Link href="/guides/psa-grading" className="text-primary hover:underline text-sm">
                Read full PSA guide →
              </Link>
            </div>

            {/* BGS */}
            <div className="bg-card border rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⭐</span>
                <h3 className="text-xl font-semibold text-foreground">Use BGS When...</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>• You want detailed subgrades to understand card condition</li>
                <li>• You&apos;re hunting for a Black Label 10 (highest possible grade)</li>
                <li>• You prefer stricter, more detailed grading</li>
                <li>• You collect for yourself and value transparency</li>
                <li>• You want half grades (9.5, 8.5) for more precision</li>
              </ul>
              <Link href="/guides/bgs-grading" className="text-primary hover:underline text-sm">
                Read full BGS guide →
              </Link>
            </div>

            {/* CGC */}
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🎯</span>
                <h3 className="text-xl font-semibold text-foreground">Use CGC When...</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>• You&apos;re on a budget and want professional grading</li>
                <li>• PSA wait times are extremely long (6+ months)</li>
                <li>• You&apos;re grading modern cards with moderate values</li>
                <li>• You&apos;re building a personal collection, not for resale</li>
                <li>• You believe CGC will gain market share over time</li>
              </ul>
              <Link href="/guides/cgc-grading" className="text-primary hover:underline text-sm">
                Read full CGC guide →
              </Link>
            </div>
          </section>

          {/* Value Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Value Comparison: Same Card, Different Slabs</h2>

            <p className="text-muted-foreground mb-4">
              Here&apos;s how the same card typically sells depending on which company graded it:
            </p>

            <div className="bg-card border rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-foreground">Grade</th>
                    <th className="text-center p-4 text-foreground">PSA</th>
                    <th className="text-center p-4 text-foreground">BGS</th>
                    <th className="text-center p-4 text-foreground">CGC</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-4">10 / 10 / 10</td>
                    <td className="text-center p-4">$100 (baseline)</td>
                    <td className="text-center p-4">$150-200 (Black Label)</td>
                    <td className="text-center p-4">$80-90</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">9.5 / 9.5 / 9.5</td>
                    <td className="text-center p-4">N/A</td>
                    <td className="text-center p-4">$90-100</td>
                    <td className="text-center p-4">$70-80</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">9 / 9 / 9</td>
                    <td className="text-center p-4">$60</td>
                    <td className="text-center p-4">$55-60</td>
                    <td className="text-center p-4">$45-50</td>
                  </tr>
                  <tr>
                    <td className="p-4">8 / 8 / 8</td>
                    <td className="text-center p-4">$35</td>
                    <td className="text-center p-4">$30-35</td>
                    <td className="text-center p-4">$25-30</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              *Values are illustrative examples. Actual prices vary significantly by card.
            </p>
          </section>

          {/* Decision Flowchart */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Decision Guide</h2>

            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Question 1: Are you grading to sell or collect?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium text-foreground mb-2">To Sell</p>
                    <p className="text-sm text-muted-foreground">
                      → PSA for maximum value and liquidity
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium text-foreground mb-2">To Collect</p>
                    <p className="text-sm text-muted-foreground">
                      → Any company works; consider BGS for subgrades or CGC for budget
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Question 2: What&apos;s the card&apos;s value?
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium text-foreground mb-2">Under $100</p>
                    <p className="text-sm text-muted-foreground">
                      → CGC (lowest cost)
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium text-foreground mb-2">$100-$500</p>
                    <p className="text-sm text-muted-foreground">
                      → PSA or BGS
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium text-foreground mb-2">$500+</p>
                    <p className="text-sm text-muted-foreground">
                      → PSA (best premium)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Question 3: How fast do you need it?
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium text-foreground mb-2">No Rush</p>
                    <p className="text-sm text-muted-foreground">
                      → Any company&apos;s economy tier
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium text-foreground mb-2">Within 30 Days</p>
                    <p className="text-sm text-muted-foreground">
                      → BGS or CGC express
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium text-foreground mb-2">ASAP</p>
                    <p className="text-sm text-muted-foreground">
                      → BGS Premium (fastest)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final Recommendation */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Final Recommendations</h2>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">For Most Collectors:</h3>
                  <p className="text-muted-foreground">
                    Start with <strong>PSA</strong> for valuable cards you might sell. Use
                    <strong> CGC</strong> for lower-value cards you want protected and authenticated.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">For Serious Collectors:</h3>
                  <p className="text-muted-foreground">
                    Consider <strong>BGS</strong> for cards you want detailed condition analysis on.
                    The subgrades help you understand exactly why a card received its grade.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">For Investors:</h3>
                  <p className="text-muted-foreground">
                    <strong>PSA</strong> is the safest bet for resale value. PSA 10s command the
                    highest premiums and have the most liquid market.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Check Your Card Values
            </h2>
            <p className="text-muted-foreground mb-6">
              Search our database of 22,755 Pokemon cards to find current market values.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Search Cards
            </Link>
          </section>
        </article>
      </div>
    </main>
  )
}
