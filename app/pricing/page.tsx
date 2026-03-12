import { Metadata } from 'next'
import Link from 'next/link'
import { PricingButton } from '@/components/pricing-button'
import { PlanType } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'Pricing | Pokemon Card API',
  description:
    'Pokemon Card API pricing plans. Free tier available. Basic plan $9.99/mo for 5K requests. Pro plan $29.99/mo for 25K requests.',
  openGraph: {
    title: 'Pokemon Card API Pricing',
    description: 'Affordable API access to 22,755 Pokemon cards. Plans starting at $9.99/month.',
  },
}

const plans: {
  name: string
  planKey: 'free' | PlanType
  price: string
  period: string
  description: string
  features: string[]
  limitations: string[]
  cta: string
  highlighted: boolean
}[] = [
  {
    name: 'Free',
    planKey: 'free',
    price: '$0',
    period: 'forever',
    description: 'Try the API with limited access',
    features: [
      '100 requests/month',
      '10 results per query',
      'Search by name',
      'Basic card data',
      'Community support',
    ],
    limitations: ['No API key required', 'Rate limited'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Basic',
    planKey: 'basic',
    price: '$9.99',
    period: '/month',
    description: 'For hobbyists and small projects',
    features: [
      '5,000 requests/month',
      '50 results per query',
      'All search filters',
      'Full card metadata',
      'Set & rarity endpoints',
      'Email support',
    ],
    limitations: [],
    cta: 'Subscribe',
    highlighted: false,
  },
  {
    name: 'Pro',
    planKey: 'pro',
    price: '$29.99',
    period: '/month',
    description: 'For apps and businesses',
    features: [
      '25,000 requests/month',
      '100 results per query',
      'All search filters',
      'Full card metadata',
      'Bulk endpoints',
      'Priority support',
      'Higher rate limits',
    ],
    limitations: [],
    cta: 'Subscribe',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    planKey: 'enterprise',
    price: 'Custom',
    period: '',
    description: 'For high-volume needs',
    features: [
      'Unlimited requests',
      'Dedicated infrastructure',
      'Custom rate limits',
      'SLA guarantee',
      'Direct integration support',
      'Custom endpoints',
    ],
    limitations: [],
    cta: 'Contact Us',
    highlighted: false,
  },
]

const faqs = [
  {
    question: 'How do I get an API key?',
    answer:
      'Sign in with Google and subscribe to any paid plan. Your API key will be generated instantly and available in your dashboard.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes, you can change your plan at any time from your dashboard. Changes take effect on your next billing cycle.',
  },
  {
    question: 'What happens if I exceed my request limit?',
    answer:
      'You\'ll receive a 429 rate limit error. Consider upgrading your plan or contact us for custom limits.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer:
      'The free tier serves as your trial. Test the API functionality before committing to a paid plan.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards via Stripe, including Visa, Mastercard, and American Express.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Yes, we offer refunds within 7 days of purchase if the API doesn\'t meet your needs. Contact support.',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Pricing</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access 22,755 Pokemon cards. Start free, scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-card border rounded-lg p-6 flex flex-col ${
                plan.highlighted ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
            >
              {plan.highlighted && (
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full self-start mb-4">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-semibold text-foreground">{plan.name}</h2>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                    <span className="text-muted-foreground">{limitation}</span>
                  </li>
                ))}
              </ul>

              <PricingButton plan={plan.planKey} highlighted={plan.highlighted}>
                {plan.cta}
              </PricingButton>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
            Feature Comparison
          </h2>
          <div className="bg-card border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 text-foreground">Feature</th>
                  <th className="text-center p-4 text-foreground">Free</th>
                  <th className="text-center p-4 text-foreground">Basic</th>
                  <th className="text-center p-4 text-foreground bg-primary/5">Pro</th>
                  <th className="text-center p-4 text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-4">Monthly Requests</td>
                  <td className="text-center p-4">100</td>
                  <td className="text-center p-4">5,000</td>
                  <td className="text-center p-4 bg-primary/5">25,000</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Results per Query</td>
                  <td className="text-center p-4">10</td>
                  <td className="text-center p-4">50</td>
                  <td className="text-center p-4 bg-primary/5">100</td>
                  <td className="text-center p-4">Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Search Filters</td>
                  <td className="text-center p-4">Basic</td>
                  <td className="text-center p-4">All</td>
                  <td className="text-center p-4 bg-primary/5">All</td>
                  <td className="text-center p-4">All + Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Card Metadata</td>
                  <td className="text-center p-4">Basic</td>
                  <td className="text-center p-4">Full</td>
                  <td className="text-center p-4 bg-primary/5">Full</td>
                  <td className="text-center p-4">Full</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Support</td>
                  <td className="text-center p-4">Community</td>
                  <td className="text-center p-4">Email</td>
                  <td className="text-center p-4 bg-primary/5">Priority</td>
                  <td className="text-center p-4">Dedicated</td>
                </tr>
                <tr>
                  <td className="p-4">SLA</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 bg-primary/5">99.9%</td>
                  <td className="text-center p-4">Custom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-card border rounded-lg p-6">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-card border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Check out our documentation or reach out to our team.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/docs"
              className="bg-muted text-foreground px-6 py-2 rounded-lg font-medium hover:bg-muted/80 transition"
            >
              View Docs
            </Link>
            <Link
              href="mailto:api@pokecardapi.com"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
