import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Pokemon Card Search API | 22,755 Cards with Pricing Data',
  description:
    'Free Pokemon card search API with 22,755 cards. Get real-time eBay pricing, PSA/BGS/CGC graded values, and market data. RESTful API with instant access.',
  keywords: [
    'pokemon card api',
    'pokemon card search api',
    'tcg api',
    'pokemon card prices',
    'pokemon card database',
    'pokemon tcg api',
    'pokemon card values',
    'graded pokemon cards',
  ],
  openGraph: {
    title: 'Pokemon Card Search API | 22,755 Cards',
    description:
      'Free Pokemon card search API with real-time eBay pricing and graded card values. RESTful API with instant access.',
    type: 'website',
    siteName: 'Pokemon Card API',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokemon Card Search API',
    description: 'Search 22,755 Pokemon cards with real-time pricing data.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("dark", inter.variable)}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
