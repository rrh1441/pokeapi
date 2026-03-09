import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Pokemon Card Search - TCG API',
  description: 'Search over 22,000 Pokemon cards. Try our free demo and explore the TCG API.',
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
