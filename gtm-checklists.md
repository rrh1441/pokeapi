# GTM Implementation Checklists

Each section has:
- **Agent tasks** (can be done autonomously)
- **Human tasks** (requires your action)
- **Agent prompt** (copy-paste to hand off)

---

## 1. RapidAPI - eBay Pricing API

### Agent Tasks

- [x] Generate OpenAPI 3.0 spec from FastAPI (export /openapi.json)
- [x] Write RapidAPI listing copy (title, description, long description)
- [x] Create code examples (curl, Python, JavaScript, Ruby)
- [x] Write pricing tier recommendations with rationale
- [x] Create example response JSON for documentation
- [ ] Write API tutorial/getting started guide

### Human Tasks

- [ ] Create RapidAPI provider account at https://rapidapi.com/provider
- [ ] Deploy eBay scraper API to Railway/Render/Fly.io
- [ ] Set RAPIDAPI_PROXY_SECRET env var on your server
- [ ] Create new API listing in RapidAPI dashboard
- [ ] Paste OpenAPI spec or connect endpoint
- [ ] Configure pricing tiers in dashboard
- [ ] Submit for review

### Agent Prompt

```
I have a FastAPI-based eBay pricing API at /Users/ryanheger/pokeapi/scraper/api.py

Tasks:
1. Run the FastAPI app locally and export the OpenAPI spec to /Users/ryanheger/pokeapi/docs/ebay-api/openapi.json
2. Create /Users/ryanheger/pokeapi/docs/ebay-api/rapidapi-listing.md with:
   - API title (max 50 chars)
   - Short description (max 150 chars)
   - Long description (features, use cases, no mention of scraping)
   - Pricing tier recommendations (Free limited, Basic $9.99, Pro $29.99, Enterprise $99.99)
3. Create /Users/ryanheger/pokeapi/docs/ebay-api/code-examples.md with curl, Python, and JavaScript examples for:
   - GET /sold endpoint
   - POST /sold endpoint with filters
   - GET /active endpoint
4. Create /Users/ryanheger/pokeapi/docs/ebay-api/example-responses.json with sample responses for documentation

Focus messaging on "market pricing data" and "sold price lookup" - never mention scraping.
```

---

## 2. RapidAPI - Pokemon Card API

### Agent Tasks

- [ ] Create OpenAPI 3.0 spec for the Next.js API routes
- [ ] Write RapidAPI listing copy
- [ ] Create code examples (curl, Python, JavaScript)
- [ ] Write pricing tier recommendations
- [ ] Create example response JSON

### Human Tasks

- [ ] Create RapidAPI provider account (if not done above)
- [ ] PokeAPI is already on Vercel - just need the URL
- [ ] Add API key auth middleware to protect endpoints for RapidAPI
- [ ] Create new API listing in RapidAPI dashboard
- [ ] Configure pricing tiers
- [ ] Submit for review

### Agent Prompt

```
I have a Next.js Pokemon card API at /Users/ryanheger/pokeapi

API routes are at:
- /app/api/cards/search/route.ts (GET with q, set, rarity, number, holo, limit params)
- /app/api/cards/[id]/route.ts (GET single card)
- /app/api/sets/route.ts (GET all sets)
- /app/api/rarities/route.ts (GET all rarities)

Tasks:
1. Create /Users/ryanheger/pokeapi/docs/pokemon-api/openapi.yaml with OpenAPI 3.0 spec for all endpoints
2. Create /Users/ryanheger/pokeapi/docs/pokemon-api/rapidapi-listing.md with:
   - API title, short description, long description
   - Focus on: 22,755 cards, all sets, metadata, images
   - Pricing tiers: Basic $9.99 (5K req/mo), Pro $29.99 (25K req/mo)
3. Create /Users/ryanheger/pokeapi/docs/pokemon-api/code-examples.md with curl, Python, JavaScript examples
4. Create /Users/ryanheger/pokeapi/docs/pokemon-api/example-responses.json with sample card data

Also: Add API key authentication middleware to the API routes. Check for X-API-Key header or X-RapidAPI-Proxy-Secret header. Create a new file /lib/auth.ts for this.
```

---

## 3. Apify Actor - eBay Pricing

### Agent Tasks

- [ ] Create Apify Actor project structure
- [ ] Write Actor wrapper that calls your hosted API (or runs scraper directly)
- [ ] Create INPUT_SCHEMA.json for Actor inputs
- [ ] Write Actor README.md for Apify Store listing
- [ ] Create Dockerfile for Actor
- [ ] Write .actor/actor.json config

### Human Tasks

- [ ] Create Apify developer account at https://apify.com
- [ ] Create new Actor project
- [ ] Push code to Apify (or connect GitHub repo)
- [ ] Configure external proxy (Data Impulse credentials)
- [ ] Set Rental pricing model ($19-29/mo)
- [ ] Publish to Apify Store

### Agent Prompt

```
Create an Apify Actor for eBay sold price lookups at /Users/ryanheger/pokeapi/apify-actor/

The Actor should:
- Accept inputs: query (string), min_price (number), max_price (number), limit (number)
- Call my existing eBay scraper API OR run the scraper directly
- Output: listings array with price stats
- Use external proxy configuration (not Apify proxies)

Create these files:
1. /apify-actor/src/main.py - Actor entry point
2. /apify-actor/.actor/actor.json - Actor config
3. /apify-actor/.actor/INPUT_SCHEMA.json - Input schema for UI
4. /apify-actor/README.md - Store listing (focus on: real sold prices, price stats, market data)
5. /apify-actor/Dockerfile
6. /apify-actor/requirements.txt

Use Rental pricing model. Messaging: "market price data" not "scraping".

Reference the existing scraper at /Users/ryanheger/pokeapi/scraper/scraper.py for how to call the scraper functions.
```

---

## 4. SEO - Programmatic Pages

### Agent Tasks

- [x] Create /llms.txt file for AI discoverability
- [x] Create dynamic route for individual card pages (/cards/[id])
- [x] Create dynamic route for set pages (/sets/[slug])
- [ ] Create price pages with eBay data (/prices/[card-slug]) - DEFERRED: waiting for pricing database
- [ ] Create graded price pages (/prices/[card-slug]/psa-10, etc.) - DEFERRED: waiting for pricing database
- [x] Add JSON-LD structured data (Product schema with price)
- [x] Add meta tags (title, description, og:image) to card pages
- [x] Create sitemap.xml generation
- [x] Create robots.txt
- [ ] Add "last updated" timestamps to price pages - DEFERRED: waiting for pricing database

### Human Tasks

- [ ] Deploy changes to Vercel
- [ ] Submit sitemap to Google Search Console
- [ ] Verify site in Search Console
- [ ] Set up Vercel cron or GitHub Action to rebuild price pages daily/weekly

### Agent Prompt

```
Add SEO infrastructure to /Users/ryanheger/pokeapi for programmatic card pages.

Tasks:
1. Create /public/llms.txt with plain text description of the Pokemon Card API:
   - What it does (22,755 cards, metadata, images, search)
   - API endpoints with examples
   - No marketing fluff, just facts for LLM crawlers

2. Create /app/cards/[id]/page.tsx - Individual card pages
   - Fetch card by tcgdex_id
   - Display card image, name, set, rarity, HP, types, illustrator
   - Add JSON-LD Product schema
   - Meta tags: title "[Card Name] - Pokemon Card | PokeAPI", description with set/rarity
   - og:image using the card's image_url

3. Create /app/sets/[slug]/page.tsx - Set listing pages
   - Fetch all cards in that set
   - Display grid of cards
   - Add JSON-LD ItemList schema
   - Meta tags for set name

4. Create /app/prices/[slug]/page.tsx - Card price pages (UPDATED FREQUENTLY)
   - Slug format: "charizard-base-set" (card name + set, URL-safe)
   - Fetch current eBay sold prices via internal API call to ebayscrape
   - Display: median price, price range, # sold last 30 days, trend
   - Show recent sales list (last 10-20)
   - Add JSON-LD Product schema with offers.price set to median
   - "Last updated: [timestamp]" prominent on page (Google likes freshness signals)
   - Meta: "[Card Name] Price - Current Market Value | PokeAPI"
   - Target: "[card name] price", "[card name] value"

5. Create /app/prices/[slug]/[grade]/page.tsx - Graded price pages
   - Grades: psa-10, psa-9, psa-8, bgs-10, bgs-9.5, cgc-10, cgc-9.5
   - Same as above but filtered to graded listings
   - Query eBay with "PSA 10 [card name]" etc.
   - Meta: "[Card Name] PSA 10 Price - Graded Card Value"
   - Target: "[card name] psa 10 price", "[card name] bgs 10 value"

6. Create /app/sitemap.ts - Dynamic sitemap generation
   - Include all card pages
   - Include all set pages
   - Include price pages for top 500 most-searched cards
   - Include graded price pages for top 100 cards × 7 grades
   - Use Next.js sitemap convention
   - Set lastmod to actual last-updated date for price pages

7. Create /public/robots.txt
   - Allow all crawlers
   - Point to sitemap

For price pages: Cache eBay results for 24 hours. Display cached data with timestamp.
Use ISR (Incremental Static Regeneration) with revalidate: 86400 (daily) for price pages.
```

---

## 5. SEO - Content Pages

### Agent Tasks

- [x] Create /docs page with API documentation
- [x] Create /pricing page with tier comparison
- [x] Create grading guides (/guides/psa-grading, /guides/bgs-grading, /guides/cgc-grading)
- [x] Create "what grade should I get" guide
- [x] Add structured data to homepage

### Human Tasks

- [ ] Deploy
- [ ] Submit to Product Hunt (when ready)
- [ ] Post on Indie Hackers

### Agent Prompt

```
Add content pages to /Users/ryanheger/pokeapi for SEO and conversion.

Tasks:
1. Create /app/docs/page.tsx - API documentation page
   - Endpoint reference (search, card detail, sets, rarities)
   - Code examples: curl, Python, JavaScript
   - Authentication section (mention API key)
   - Link to RapidAPI for access
   - Target keyword: "pokemon card api"

2. Create /app/pricing/page.tsx - Pricing page
   - Tier comparison table (Basic, Pro, Enterprise)
   - Feature list per tier
   - CTA buttons to RapidAPI
   - FAQ section

3. Create /app/guides/page.tsx - Guides index
   - Links to all guides
   - Brief descriptions

4. Create /app/guides/psa-grading/page.tsx
   - What is PSA grading
   - PSA grade scale (1-10, qualifiers like OC, MC, ST, PD)
   - PSA 10 vs PSA 9 value difference (with example cards from your data)
   - How to submit to PSA
   - Current PSA turnaround times and costs
   - Target: "psa grading guide", "psa card grading", "what is psa 10"

5. Create /app/guides/bgs-grading/page.tsx
   - What is BGS/Beckett grading
   - BGS subgrades (centering, corners, edges, surface)
   - BGS 10 Black Label explained
   - BGS vs PSA comparison
   - Target: "bgs grading guide", "beckett grading"

6. Create /app/guides/cgc-grading/page.tsx
   - What is CGC grading
   - CGC vs PSA vs BGS comparison
   - CGC pricing advantage
   - Target: "cgc card grading", "cgc vs psa"

7. Create /app/guides/which-grading-company/page.tsx
   - Comparison table: PSA vs BGS vs CGC
   - When to use each (value, speed, cost)
   - Which grades add the most value (data from your eBay prices if possible)
   - Target: "best card grading company", "psa vs bgs vs cgc"

8. Update /app/page.tsx (homepage)
   - Add JSON-LD Organization schema
   - Improve meta description for "pokemon card search api"

Use shadcn/ui components. Keep it simple, dark mode.
Guides should be ~800-1200 words each for SEO.
Add internal links between guides and to relevant price pages.
```

---

## 6. Cold Outreach - Lead Research

### Agent Tasks

- [ ] Scrape Google Maps for card shops (top 50 US cities)
- [ ] Find top eBay Pokemon card sellers (10K+ feedback)
- [ ] Find TCGPlayer high-volume sellers
- [ ] Search Facebook for card show vendor groups
- [ ] Find upcoming card shows and their vendor lists
- [ ] Compile master spreadsheet with: name, source, contact method, email if found
- [ ] Use Hunter.io to find emails for shops with websites

### Human Tasks

- [ ] Review and clean up the list
- [ ] Send outreach emails (10/day from personal Gmail)
- [ ] Follow up after 5 days

### Agent Prompt

```
Research and compile a list of potential customers for a card pricing API.

Target segments:
1. Local card shops (need pricing for buy counter)
2. Card show vendors (need mobile pricing on the spot)
3. High-volume online resellers (need API integration)

Tasks:
1. Search Google Maps for "pokemon card shop", "trading card store", "card game store" in these cities:
   - New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose
   - Austin, Jacksonville, Fort Worth, Columbus, Charlotte, Indianapolis, Seattle, Denver, Boston, Nashville
   Save results to /Users/ryanheger/pokeapi/leads/card-shops.csv with columns: name, city, address, phone, website, google_maps_url

2. Search eBay for top Pokemon card sellers:
   - Go to eBay, search "pokemon cards", filter by seller feedback 10000+
   - Extract: seller username, feedback score, store name if any
   Save to /Users/ryanheger/pokeapi/leads/ebay-sellers.csv

3. Search Facebook for:
   - "Pokemon card show vendors" groups
   - "TCG vendors" groups
   - "Card show" events in major cities
   Note group names and member counts in /Users/ryanheger/pokeapi/leads/facebook-groups.md

4. Search for upcoming card shows:
   - Google "pokemon card show 2024", "TCG convention 2024"
   - Check show websites for vendor/exhibitor information
   Save to /Users/ryanheger/pokeapi/leads/card-shows.md with: show name, date, location, vendor contact if available

5. For any shop with a website, try to find email via:
   - Contact page
   - Hunter.io lookup
   Add email column to card-shops.csv

Create /Users/ryanheger/pokeapi/leads/ directory for all outputs.
Target: 100+ leads total across all sources.
```

---

## Execution Order

1. **SEO programmatic pages** - Get indexed while you set up marketplaces
2. **SEO content/guides** - Evergreen content, builds authority
3. **Lead research** - Build outreach list in parallel
4. **RapidAPI eBay API** - Higher margin, you control infra
5. **RapidAPI Pokemon API** - Add auth, list it
6. **Apify Actor** - Secondary channel, different audience
7. **Cold outreach** - Start emailing once APIs are live

---

## Time Estimates (Agent Work)

| Task | Agent Time |
|------|------------|
| RapidAPI eBay docs/spec | ~10 min |
| RapidAPI Pokemon docs/spec + auth | ~15 min |
| Apify Actor creation | ~15 min |
| SEO programmatic pages (cards, sets, prices) | ~25 min |
| SEO price pages with eBay integration | ~20 min |
| SEO grading guides (4 guides) | ~30 min |
| SEO content pages (docs, pricing) | ~15 min |
| Lead research (shops, shows, sellers) | ~30 min |

**Total agent work: ~2.5 hours**

Your time: Account creation, dashboard config, deploy, submit, send emails.
