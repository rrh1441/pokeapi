# PokeAPI - Pokemon Card Search Frontend

## Overview

A Pokemon card search demo that showcases our 22,755-card catalog and drives users toward API subscription.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel
- **Database:** Neon PostgreSQL (data already seeded)
- **DB Client:** `@neondatabase/serverless`
- **Styling:** Tailwind CSS
- **UI:** shadcn/ui components

## Database (Already Exists)

Connected to existing Neon database with `tcgdex_cards` table:

```sql
tcgdex_id TEXT UNIQUE,     -- "base1-4"
name TEXT,                  -- "Charizard"
set_name TEXT,              -- "Base Set"
local_id TEXT,              -- "4" (card number)
rarity TEXT,                -- "Rare Holo"
image_url TEXT,             -- "https://assets.tcgdex.net/en/base/base1/4"
category TEXT,              -- Pokemon, Trainer, Energy
hp INTEGER,
types TEXT,                 -- JSON array: ["Fire"]
illustrator TEXT,
has_holo INTEGER,
has_reverse INTEGER,
name_lower TEXT,            -- lowercase for search
set_name_lower TEXT

-- Indexes: name_lower, set_name_lower, local_id, rarity
```

## Implementation Plan

### Phase 1: Project Setup

- [ ] Initialize Next.js 14 with App Router
- [ ] Configure Tailwind CSS
- [ ] Install shadcn/ui
- [ ] Set up `@neondatabase/serverless`
- [ ] Add DATABASE_URL to .env.local
- [ ] Create db connection utility

### Phase 2: API Routes

- [ ] `GET /api/cards/search` - Search endpoint
  - Query params: `q`, `set`, `rarity`, `number`, `limit` (max 10 for free)
  - Returns: cards array + total count
- [ ] `GET /api/cards/[id]` - Single card detail
- [ ] `GET /api/sets` - List all sets (for dropdown)
- [ ] `GET /api/rarities` - List all rarities (for dropdown)

### Phase 3: Search UI

- [ ] Search page (`/`)
  - Search input with 300ms debounce
  - Set dropdown filter
  - Rarity dropdown filter
  - Card number input
- [ ] Card grid component
  - Card image (from image_url)
  - Name, set, number, rarity
  - Hover effect
- [ ] Card detail modal
  - Full metadata display
  - "View JSON" toggle
  - Larger image

### Phase 4: API Upsell Integration

- [ ] Limit results to 10, show "See all {total} with API access" CTA
- [ ] localStorage search counter
- [ ] After 20 searches: upgrade prompt banner
- [ ] "View JSON" toggle per card (shows raw API response)
- [ ] Header with "API Docs" and "Pricing" links
- [ ] Code snippets section (curl, Python, JS examples)

### Phase 5: Design & Polish

- [ ] Dark mode (default)
- [ ] Mobile responsive grid
- [ ] Loading states / skeletons
- [ ] Empty state
- [ ] Error handling

## File Structure

```
/pokeapi
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Search page
│   ├── api/
│   │   ├── cards/
│   │   │   ├── search/route.ts
│   │   │   └── [id]/route.ts
│   │   ├── sets/route.ts
│   │   └── rarities/route.ts
│   └── globals.css
├── components/
│   ├── search-input.tsx
│   ├── filter-dropdowns.tsx
│   ├── card-grid.tsx
│   ├── card-item.tsx
│   ├── card-modal.tsx
│   ├── upsell-banner.tsx
│   └── code-snippets.tsx
├── lib/
│   ├── db.ts                 # Neon connection
│   └── queries.ts            # SQL queries
├── .env.local                # DATABASE_URL
└── claude.md                 # This file
```

## Environment Variables

```
DATABASE_URL=postgresql://...@...neon.tech/neondb?sslmode=require
```

## Key Queries

```sql
-- Search cards
SELECT * FROM tcgdex_cards
WHERE name_lower LIKE '%charizard%'
AND ($1::text IS NULL OR set_name_lower LIKE $1)
AND ($2::text IS NULL OR rarity = $2)
ORDER BY name, set_name
LIMIT 10;

-- Get total count (for upsell)
SELECT COUNT(*) FROM tcgdex_cards WHERE name_lower LIKE '%charizard%';

-- List sets
SELECT DISTINCT set_name FROM tcgdex_cards ORDER BY set_name;

-- List rarities
SELECT DISTINCT rarity FROM tcgdex_cards WHERE rarity IS NOT NULL ORDER BY rarity;
```

## Upsell Copy

- **Results cap:** "Showing 10 of {total} results. [Get API access] to see all."
- **Search limit:** "You've searched 20 times. [Unlock unlimited searches] with our API."
- **JSON toggle:** Shows developers the exact payload they'd get from the API

## Notes

- Cards have images hosted on `assets.tcgdex.net` - no need to proxy
- Dark mode makes card images pop
- Keep it fast - edge functions + Neon serverless = low latency
