import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CGC Grading Guide | CGC Card Grading Explained',
  description:
    'Complete guide to CGC card grading. Learn about CGC grades, pricing advantages, holder design, and how CGC compares to PSA and BGS.',
  keywords: ['CGC grading', 'CGC cards', 'CGC vs PSA', 'CGC grading guide', 'CGC Pokemon cards'],
  openGraph: {
    title: 'CGC Grading Guide for Pokemon Cards',
    description: 'Everything about CGC grading: grades, costs, and value comparison.',
  },
}

export default function CGCGradingGuidePage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-foreground">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">CGC Grading</span>
        </nav>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            CGC Grading Guide: The Newcomer Explained
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            CGC (Certified Guaranty Company) entered the trading card market in 2020,
            bringing their expertise from comic book grading. Known for competitive pricing
            and fast turnaround, CGC has quickly become a viable alternative to PSA and BGS.
          </p>

          {/* Table of Contents */}
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">In This Guide</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#about" className="hover:text-primary">About CGC Trading Cards</a></li>
              <li><a href="#grading-scale" className="hover:text-primary">CGC Grading Scale</a></li>
              <li><a href="#holder" className="hover:text-primary">The CGC Holder Design</a></li>
              <li><a href="#advantages" className="hover:text-primary">CGC Advantages</a></li>
              <li><a href="#disadvantages" className="hover:text-primary">CGC Disadvantages</a></li>
              <li><a href="#costs" className="hover:text-primary">Costs & Turnaround</a></li>
            </ul>
          </div>

          {/* About CGC */}
          <section id="about" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">About CGC Trading Cards</h2>

            <p className="text-muted-foreground mb-4">
              CGC (Certified Guaranty Company) has been grading comic books since 2000 and
              is the industry leader in that space. In 2020, they launched CGC Trading Cards
              to bring their expertise to Pokemon, sports cards, and other TCGs.
            </p>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-3">Key Facts</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Founded:</strong> 2020 (Trading Cards division)</li>
                <li><strong>Parent Company:</strong> Certified Collectibles Group</li>
                <li><strong>Headquarters:</strong> Sarasota, Florida</li>
                <li><strong>Specialty:</strong> Also grades comic books, video games, magazines</li>
              </ul>
            </div>
          </section>

          {/* Grading Scale */}
          <section id="grading-scale" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">CGC Grading Scale</h2>
            <p className="text-muted-foreground mb-4">
              CGC uses a 1-10 scale with half grades, similar to BGS:
            </p>

            <div className="space-y-3">
              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">CGC 10 - Pristine</span>
                  <span className="text-green-500">Perfect</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A virtually flawless card. Perfect centering, corners, edges, and surface.
                  Extremely rare to achieve.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">CGC 9.5 - Gem Mint</span>
                  <span className="text-green-400">Exceptional</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nearly perfect with only the slightest imperfections visible under
                  magnification. The most desirable grade for collectors.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">CGC 9 - Mint</span>
                  <span className="text-yellow-500">Excellent</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Superb condition with minor imperfections. May have slight centering
                  issues or minor corner/edge wear.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">CGC 8.5 - Near Mint/Mint+</span>
                  <span className="text-yellow-400">Very Good</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Very minor wear visible. Still an excellent card for most collectors.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">CGC 8 and Below</span>
                  <span className="text-orange-500">Good to Acceptable</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Noticeable wear, but still authenticated and protected. Good for
                  completing collections or budget-conscious buyers.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 border rounded-lg p-4 mt-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Subgrades:</strong> CGC offers optional
                subgrades for centering, corners, edges, and surface (similar to BGS) for
                an additional fee.
              </p>
            </div>
          </section>

          {/* Holder Design */}
          <section id="holder" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">The CGC Holder</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Design Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Crystal-clear acrylic case</li>
                  <li>• Tamper-evident security features</li>
                  <li>• Unique barcode for verification</li>
                  <li>• Slim profile for easy storage</li>
                  <li>• Inner sleeve prevents rattling</li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Label Colors</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="text-green-500">●</span> Green - Standard label</li>
                  <li><span className="text-yellow-500">●</span> Gold - Perfect 10</li>
                  <li><span className="text-blue-500">●</span> Blue - Autographed cards</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Advantages */}
          <section id="advantages" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">CGC Advantages</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-6 border-l-4 border-l-green-500">
                <h3 className="font-semibold text-foreground mb-2">Lower Prices</h3>
                <p className="text-sm text-muted-foreground">
                  CGC typically costs less than PSA for comparable service levels, making
                  it more accessible for budget-conscious collectors.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 border-l-4 border-l-green-500">
                <h3 className="font-semibold text-foreground mb-2">Faster Turnaround</h3>
                <p className="text-sm text-muted-foreground">
                  During periods when PSA has long backlogs, CGC often processes cards
                  much faster, sometimes 2-3x quicker.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 border-l-4 border-l-green-500">
                <h3 className="font-semibold text-foreground mb-2">Consistent Grading</h3>
                <p className="text-sm text-muted-foreground">
                  Many collectors find CGC&apos;s grading to be consistent and fair, with
                  detailed explanations for grades when requested.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 border-l-4 border-l-green-500">
                <h3 className="font-semibold text-foreground mb-2">Modern Technology</h3>
                <p className="text-sm text-muted-foreground">
                  CGC uses advanced verification technology and offers easy online
                  tracking and verification of graded cards.
                </p>
              </div>
            </div>
          </section>

          {/* Disadvantages */}
          <section id="disadvantages" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">CGC Disadvantages</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-6 border-l-4 border-l-red-500">
                <h3 className="font-semibold text-foreground mb-2">Lower Market Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  CGC cards typically sell for 10-20% less than PSA equivalents due to
                  PSA&apos;s longer market presence and brand recognition.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 border-l-4 border-l-red-500">
                <h3 className="font-semibold text-foreground mb-2">Smaller Population</h3>
                <p className="text-sm text-muted-foreground">
                  Fewer total cards graded means less population data for comparing
                  rarity of specific grades.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 border-l-4 border-l-red-500">
                <h3 className="font-semibold text-foreground mb-2">Less Liquidity</h3>
                <p className="text-sm text-muted-foreground">
                  CGC cards may take longer to sell and have a smaller buyer pool
                  compared to PSA-graded cards.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 border-l-4 border-l-red-500">
                <h3 className="font-semibold text-foreground mb-2">Newer to Market</h3>
                <p className="text-sm text-muted-foreground">
                  Being new to trading cards (since 2020), CGC hasn&apos;t built the same
                  track record as PSA (1991) or BGS (1999).
                </p>
              </div>
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
                    <th className="text-left p-4 text-foreground">Max Value</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-4">Economy</td>
                    <td className="p-4">$15</td>
                    <td className="p-4">45+ business days</td>
                    <td className="p-4">$250</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Standard</td>
                    <td className="p-4">$25</td>
                    <td className="p-4">30+ business days</td>
                    <td className="p-4">$500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Express</td>
                    <td className="p-4">$60</td>
                    <td className="p-4">10+ business days</td>
                    <td className="p-4">$1,000</td>
                  </tr>
                  <tr>
                    <td className="p-4">Walk-Through</td>
                    <td className="p-4">$150</td>
                    <td className="p-4">2 business days</td>
                    <td className="p-4">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              *Prices subject to change. Check cgccards.com for current rates.
            </p>
          </section>

          {/* When to Use CGC */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">When to Use CGC</h2>

            <div className="bg-card border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                CGC is a great choice when:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>You want to grade cards for personal collection, not resale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>PSA has extremely long wait times (6+ months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>You&apos;re on a budget and want quality grading for less</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>You&apos;re grading modern cards with lower individual values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>You believe CGC will gain market share over time</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Compare All Grading Companies
            </h2>
            <p className="text-muted-foreground mb-6">
              See how CGC stacks up against PSA and BGS in our full comparison guide.
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
