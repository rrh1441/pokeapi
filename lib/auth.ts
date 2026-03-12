import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { Pool } from 'pg'
import PostgresAdapter from '@auth/pg-adapter'
import { neon } from '@neondatabase/serverless'
import { stripe } from './stripe'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user ID to session
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      // Create Stripe customer when user signs up
      if (user.email) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name ?? undefined,
          metadata: {
            userId: user.id ?? '',
          },
        })

        // Update user with Stripe customer ID
        const sql = neon(process.env.DATABASE_URL!)
        const userId = user.id ? parseInt(user.id) : 0
        if (userId > 0) {
          await sql`
            UPDATE users
            SET stripe_customer_id = ${customer.id}
            WHERE id = ${userId}
          `
        }
      }
    },
  },
  pages: {
    signIn: '/login',
  },
})

// Extend the session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
