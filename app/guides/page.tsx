import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pokemon Card Grading Guides | PSA, BGS, CGC',
  description:
    'Complete guides to Pokemon card grading. Learn about PSA, BGS, and CGC grading scales, costs, and how grading affects card value.',
  openGraph: {
    title: 'Pokemon Card Grading Guides',
    description: 'Everything you need to know about PSA, BGS, and CGC card grading.',
  },
}

const guides = [
  {
    title: 'PSA Grading Guide',
    description:
      'The most popular grading service. Learn about PSA grades 1-10, qualifiers, costs, and turnaround times.',
    href: '/guides/psa-grading',
    icon: '🏆',
  },
  {
    title: 'BGS/Beckett Grading Guide',
    description:
      'Known for strict grading and subgrades. Understand BGS 10 Black Labels, half grades, and the four subgrade categories.',
    href: '/guides/bgs-grading',
    icon: '⭐',
  },
  {
    title: 'CGC Grading Guide',
    description:
      'The newcomer with competitive pricing. Learn about CGC grades, their unique holder design, and value comparison.',
    href: '/guides/cgc-grading',
    icon: '🎯',
  },
  {
    title: 'Which Grading Company Should I Use?',
    description:
      'Compare PSA vs BGS vs CGC. Find out which service is best for your cards based on value, turnaround time, and cost.',
    href: '/guides/which-grading-company',
    icon: '🤔',
  },
]

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Guides</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pokemon Card Grading Guides</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about getting your Pokemon cards professionally graded.
            Grading can significantly increase the value of your cards by verifying their
            authenticity and condition.
          </p>
        </div>

        {/* Guide Cards */}
        <div className="grid gap-6 mb-12">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="block bg-card border rounded-lg p-6 hover:border-primary transition group"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{guide.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition">
                    {guide.title}
                  </h2>
                  <p className="text-muted-foreground mt-1">{guide.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why Grade Section */}
        <section className="bg-card border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Why Grade Your Cards?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Grading companies verify your card is authentic, not a counterfeit. This is
                especially important for high-value vintage cards.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Protection</h3>
              <p className="text-sm text-muted-foreground">
                Graded cards are sealed in tamper-proof cases that protect against damage,
                preserving their condition long-term.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Increased Value</h3>
              <p className="text-sm text-muted-foreground">
                A PSA 10 or BGS 10 grade can multiply a card&apos;s value by 10x or more compared to
                ungraded copies.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Easier Selling</h3>
              <p className="text-sm text-muted-foreground">
                Buyers trust graded cards more. They know exactly what condition they&apos;re getting,
                making sales faster and prices higher.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Comparison</h2>
          <div className="bg-card border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 text-foreground">Company</th>
                  <th className="text-left p-4 text-foreground">Starting Price</th>
                  <th className="text-left p-4 text-foreground">Turnaround</th>
                  <th className="text-left p-4 text-foreground">Best For</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-4 font-medium text-foreground">PSA</td>
                  <td className="p-4">$25+</td>
                  <td className="p-4">65+ days</td>
                  <td className="p-4">Maximum resale value</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium text-foreground">BGS</td>
                  <td className="p-4">$22+</td>
                  <td className="p-4">10+ days</td>
                  <td className="p-4">Detailed subgrades</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground">CGC</td>
                  <td className="p-4">$15+</td>
                  <td className="p-4">45+ days</td>
                  <td className="p-4">Budget-friendly option</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            *Prices and turnaround times are approximate and subject to change.
          </p>
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
      </div>
    </main>
  )
}
