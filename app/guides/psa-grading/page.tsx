import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PSA Grading Guide | Pokemon Card Grading Explained',
  description:
    'Complete guide to PSA card grading. Learn about PSA grades 1-10, qualifiers (OC, MC, ST, PD), costs, turnaround times, and how PSA 10 affects card value.',
  keywords: ['PSA grading', 'PSA 10', 'PSA card grading', 'what is PSA 10', 'PSA grading guide'],
  openGraph: {
    title: 'PSA Grading Guide for Pokemon Cards',
    description: 'Everything you need to know about PSA grading: grades, costs, and value impact.',
  },
}

export default function PSAGradingGuidePage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-foreground">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">PSA Grading</span>
        </nav>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            PSA Grading Guide: Everything You Need to Know
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            PSA (Professional Sports Authenticator) is the most recognized trading card grading
            company in the world. Founded in 1991, PSA has graded over 50 million cards and is
            the gold standard for Pokemon card authentication and grading.
          </p>

          {/* Table of Contents */}
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">In This Guide</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#grading-scale" className="hover:text-primary">PSA Grading Scale (1-10)</a></li>
              <li><a href="#qualifiers" className="hover:text-primary">Qualifiers (OC, MC, ST, PD)</a></li>
              <li><a href="#value-impact" className="hover:text-primary">How Grades Affect Value</a></li>
              <li><a href="#submission" className="hover:text-primary">How to Submit Cards</a></li>
              <li><a href="#costs" className="hover:text-primary">Current Costs & Turnaround</a></li>
              <li><a href="#tips" className="hover:text-primary">Tips for Higher Grades</a></li>
            </ul>
          </div>

          {/* Grading Scale */}
          <section id="grading-scale" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">PSA Grading Scale</h2>
            <p className="text-muted-foreground mb-4">
              PSA grades cards on a scale of 1 to 10, with 10 being the highest possible grade.
              Here&apos;s what each grade means:
            </p>

            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">PSA 10 - Gem Mint</span>
                  <span className="text-green-500">Highest Grade</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A virtually perfect card. Corners are sharp, centering is 55/45 or better on
                  both front and back, no print defects, and original gloss retained.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">PSA 9 - Mint</span>
                  <span className="text-green-400">Excellent</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A superb condition card with only one minor flaw. Centering must be 60/40 or
                  better. May have one slight print imperfection not noticeable at first glance.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">PSA 8 - Near Mint-Mint</span>
                  <span className="text-yellow-500">Great</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A very minor flaw or several minor print imperfections. Centering must be
                  65/35 or better. Slight wear on one or two corners is acceptable.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">PSA 7 - Near Mint</span>
                  <span className="text-yellow-400">Good</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A minor flaw such as corner wear or slight edge wear. Centering must be
                  70/30 or better. May have slight loss of original gloss.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">PSA 6 and Below</span>
                  <span className="text-orange-500">Acceptable to Poor</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cards with noticeable wear, creases, staining, or other damage. Generally only
                  worth grading for extremely rare or valuable vintage cards.
                </p>
              </div>
            </div>
          </section>

          {/* Qualifiers */}
          <section id="qualifiers" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">PSA Qualifiers</h2>
            <p className="text-muted-foreground mb-4">
              Sometimes PSA adds a qualifier to a grade, indicating the card would have graded
              higher except for one specific issue:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">OC - Off Center</h3>
                <p className="text-sm text-muted-foreground">
                  Card has significant centering issues but is otherwise high quality. Common
                  on older Pokemon cards due to printing standards of the era.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">MC - Miscut</h3>
                <p className="text-sm text-muted-foreground">
                  The card was cut incorrectly during production, showing parts of adjacent
                  cards or having uneven borders.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">ST - Staining</h3>
                <p className="text-sm text-muted-foreground">
                  Card has staining that limits the grade. This could be from water damage,
                  food, or other substances.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">PD - Print Defect</h3>
                <p className="text-sm text-muted-foreground">
                  A factory printing error like ink spots, color bleeding, or roller marks
                  that occurred during manufacturing.
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Note: Cards with qualifiers typically sell for less than cards with the same
              numeric grade without qualifiers.
            </p>
          </section>

          {/* Value Impact */}
          <section id="value-impact" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How PSA Grades Affect Value</h2>
            <p className="text-muted-foreground mb-4">
              The difference between grades can dramatically impact card value. Here&apos;s an
              example using a Base Set Charizard:
            </p>

            <div className="bg-card border rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-foreground">Grade</th>
                    <th className="text-left p-4 text-foreground">Approx. Value</th>
                    <th className="text-left p-4 text-foreground">Premium vs Raw</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-4">Raw (ungraded)</td>
                    <td className="p-4">$300-500</td>
                    <td className="p-4">Baseline</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">PSA 7</td>
                    <td className="p-4">$600-800</td>
                    <td className="p-4">~1.5x</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">PSA 8</td>
                    <td className="p-4">$800-1,200</td>
                    <td className="p-4">~2x</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">PSA 9</td>
                    <td className="p-4">$2,000-4,000</td>
                    <td className="p-4">~5x</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">PSA 10</td>
                    <td className="p-4 font-semibold text-foreground">$15,000-30,000</td>
                    <td className="p-4 font-semibold text-foreground">~40x+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              *Values are estimates and fluctuate based on market conditions.
            </p>
          </section>

          {/* How to Submit */}
          <section id="submission" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How to Submit Cards to PSA</h2>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-semibold">1</span>
                <div>
                  <h3 className="font-semibold text-foreground">Create a PSA Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Visit psacard.com and create a free account. You&apos;ll need this to track
                    submissions and receive results.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-semibold">2</span>
                <div>
                  <h3 className="font-semibold text-foreground">Choose Service Level</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a service tier based on card value and desired turnaround time.
                    Higher tiers cost more but process faster.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-semibold">3</span>
                <div>
                  <h3 className="font-semibold text-foreground">Prepare Your Cards</h3>
                  <p className="text-sm text-muted-foreground">
                    Place each card in a penny sleeve, then a semi-rigid holder (card saver).
                    Don&apos;t use toploaders as PSA prefers card savers.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-semibold">4</span>
                <div>
                  <h3 className="font-semibold text-foreground">Complete Submission Form</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the online form with card details, declared value, and service
                    level. Print and include with your shipment.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-semibold">5</span>
                <div>
                  <h3 className="font-semibold text-foreground">Ship to PSA</h3>
                  <p className="text-sm text-muted-foreground">
                    Ship via insured carrier (FedEx, UPS) to PSA. Include tracking and
                    insurance for the full declared value.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Costs */}
          <section id="costs" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Current Costs & Turnaround Times</h2>

            <div className="bg-card border rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-foreground">Service Level</th>
                    <th className="text-left p-4 text-foreground">Price/Card</th>
                    <th className="text-left p-4 text-foreground">Turnaround</th>
                    <th className="text-left p-4 text-foreground">Max Value</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-4">Value</td>
                    <td className="p-4">$25</td>
                    <td className="p-4">65+ business days</td>
                    <td className="p-4">$499</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Regular</td>
                    <td className="p-4">$50</td>
                    <td className="p-4">35+ business days</td>
                    <td className="p-4">$999</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Express</td>
                    <td className="p-4">$100</td>
                    <td className="p-4">15+ business days</td>
                    <td className="p-4">$2,499</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Super Express</td>
                    <td className="p-4">$200</td>
                    <td className="p-4">5+ business days</td>
                    <td className="p-4">$4,999</td>
                  </tr>
                  <tr>
                    <td className="p-4">Walk-Through</td>
                    <td className="p-4">$400</td>
                    <td className="p-4">1-2 business days</td>
                    <td className="p-4">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              *Prices and times subject to change. Check psacard.com for current rates.
            </p>
          </section>

          {/* Tips */}
          <section id="tips" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Tips for Getting Higher Grades</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Check Centering First</h3>
                <p className="text-sm text-muted-foreground">
                  Use a centering tool or app before submitting. Cards with 60/40 or worse
                  centering won&apos;t get PSA 10.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Examine Under Light</h3>
                <p className="text-sm text-muted-foreground">
                  Hold cards under bright light at an angle to spot surface scratches, print
                  lines, and other defects invisible at first glance.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Check All Four Corners</h3>
                <p className="text-sm text-muted-foreground">
                  Use a loupe or magnifying glass to inspect corners for whitening, dings, or
                  wear that could lower the grade.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Handle with Care</h3>
                <p className="text-sm text-muted-foreground">
                  Always handle cards by the edges. Oils from fingers can leave marks on the
                  surface that affect grading.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-card border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Check Your Card Values
            </h2>
            <p className="text-muted-foreground mb-6">
              Search our database to find current market values for your Pokemon cards.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
              >
                Search Cards
              </Link>
              <Link
                href="/guides/which-grading-company"
                className="bg-muted text-foreground px-6 py-2 rounded-lg font-medium hover:bg-muted/80 transition"
              >
                Compare PSA vs BGS vs CGC
              </Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}
