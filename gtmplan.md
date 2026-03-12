# Go-To-Market Plan

## Products

| Product | What It Does | Tech |
|---------|--------------|------|
| **Pokemon Card API** | 22,755 cards with metadata, images, set info | Next.js + Neon PostgreSQL |
| **eBay Pricing API** | Real-time sold prices, price stats, trends | FastAPI + Data Impulse proxies |

**Combined value prop:** Card data + market prices = instant card valuation.

---

## Distribution Channels

### RapidAPI (Primary)

List both APIs. Handles billing, docs hosting, and has 4M+ developers.

| API | Basic ($9.99/mo) | Pro ($29.99/mo) |
|-----|------------------|-----------------|
| Pokemon Card Data | 5K req/mo, full results | 25K req/mo |
| eBay Sold Prices | 2K req/mo | 10K req/mo |
| **Bundle** | $14.99/mo | $39.99/mo |

No free tier. Limited demo via the frontend site only.

### Apify Store

eBay pricing API only. Use **Rental model** ($15-29/mo flat fee).

- Users pay their own Apify compute
- You bring external proxies (Data Impulse @ $1/GB)
- 80% revenue after commission

### API Directories (Submit Once)

- ProgrammableWeb
- API List (apilist.fun)
- Public APIs GitHub repo (submit PR)

---

## SEO Strategy

### Programmatic Pages

Generate from existing data:

```
/cards/{tcgdex_id}          → 22,755 pages
/sets/{set-name}            → ~100 pages
/prices/{card-name}         → Landing pages for top 100 cards
```

Add JSON-LD structured data for rich snippets.

### Target Keywords

| Keyword Pattern | Example | Intent |
|-----------------|---------|--------|
| [card] price | "charizard base set price" | Valuation |
| [card] sold prices | "PSA 10 pikachu sold prices" | Market data |
| [set] card list | "base set card list" | Collectors |
| pokemon card api | - | Developers |
| ebay sold prices api | - | Developers |

### Content (One-Time)

- Dev.to article: "Building a Card Valuation Tool" (focus on use case, not implementation)
- Hashnode cross-post
- Product Hunt launch (single event, gets indexed)
- Indie Hackers post

---

## AI/LLM Discoverability

Goal: When someone asks ChatGPT "how do I get Pokemon card prices programmatically", your API shows up.

### Actions

1. Add `/llms.txt` to both sites - plain text API explanation for crawlers
2. Comprehensive `/docs` pages with curl/Python/JS examples
3. Answer 3-5 existing Stack Overflow questions about card pricing APIs
4. One "Show HN" post - gets indexed even without traction

---

## Cold Outreach: Card Shops

### Why This Channel

- High-intent buyers (they price cards daily)
- No mod approval needed
- Direct relationship = higher LTV
- Too small for Apollo, so less competition

### Target Segments

**1. Local Card Shops**
- Price cards for buy/sell counter
- Currently check TCGPlayer or eBay manually
- Need: fast lookups, bulk pricing

**2. Card Show Vendors**
- Price cards on the spot at conventions
- Using phone to check comps manually
- Need: instant mobile lookups, last sold price
- Pain point: slow manual process while customer waits

**3. Online Resellers**
- eBay/TCGPlayer/Whatnot sellers
- High volume, need pricing automation
- Need: API integration, bulk endpoints

### Finding Targets

| Source | Method | Segment |
|--------|--------|---------|
| Google Maps | "pokemon card shop" + major cities | Shops |
| eBay | Top sellers (10K+ feedback) | Resellers |
| TCGPlayer | Seller directory, filter by volume | Resellers |
| Whatnot | Live auction sellers | Resellers |
| Instagram | "DM to buy" accounts, 5K-50K followers | All |
| Facebook | "Pokemon card show" groups, vendor posts | Show vendors |
| Eventbrite/Facebook Events | Card show exhibitor lists | Show vendors |
| Card show websites | Vendor application pages sometimes list past vendors | Show vendors |

Build list of 100 high-value targets across segments.

### Finding Emails

- Website contact pages
- Hunter.io for domain lookup
- Instagram DMs as fallback

### Outreach Templates

**Card Shops / Resellers**

Subject: Instant sold comps for your card inventory

```
Pricing cards manually?

I built an API that returns real eBay sold prices in seconds.

Query "PSA 10 Charizard Base Set" → median $342, 47 sold last 30 days, trending +12%

Works for any card, any grade. $X/month for unlimited lookups.

Want to try it?
```

**Card Show Vendors**

Subject: Price cards faster at shows

```
Tired of checking eBay sold prices manually while customers wait?

I built a tool that gives you the last sold price instantly.

Type the card name → get median sold price, how many sold, price trend.

Works on your phone. No more fumbling through eBay searches at the table.

$X/month unlimited. Want access?
```

**Key messaging rules:**
- Focus on outcome (pricing data), not method
- Never mention scraping, automation, or data extraction
- Position as "market data" or "pricing tool"

### System

1. Build list: 100 shops (2 hours)
2. Find emails: Hunter.io + manual (1 hour)
3. Send from personal Gmail (not cold email tool)
4. 10 emails/day, personalize first line
5. Follow up once after 5 days

Time: ~15 min/day after initial setup.

---

## Messaging Framework

### Do Say

- "Real-time market prices"
- "Sold comps in seconds"
- "What cards are actually selling for"
- "Market data API"
- "Pricing intelligence"

### Don't Say

- Scraping
- Automation
- Data extraction
- eBay API
- Web scraping

### Frontend Demo Positioning

The Next.js site is the funnel:
- User searches cards
- Sees 10 results
- Sees "847 more results with API access"
- Converts to paid

Demo shows value. API unlocks it.

---

## What Not To Do

| Skip This | Why |
|-----------|-----|
| Reddit/Discord posts | Mods ban self-promo |
| Open source repo | Protect IP |
| Free tier marketing | You're monetizing, not growing users |
| Twitter engagement | Low ROI for this niche |
| YouTube content | Too much effort |
| Email newsletters | Wrong audience |
| Paid ads | You said no ad spend |

---

## Priority Actions

| Task | Time | Impact |
|------|------|--------|
| List both on RapidAPI | 3 hrs | High |
| Generate programmatic SEO pages | 2 hrs | High |
| Cold outreach list (100 shops) | 2 hrs | High |
| `/llms.txt` + docs pages | 1 hr | Medium |
| Apify Actor (rental model) | 2 hrs | Medium |
| Product Hunt launch | 30 min | Medium |
| Dev.to article | 1 hr | Low-Medium |
| API directory submissions | 30 min | Low |

---

## Revenue Targets

### Conservative (Month 3)

| Channel | Users | Avg Revenue | Monthly |
|---------|-------|-------------|---------|
| RapidAPI | 30 | $15 | $450 |
| Apify | 10 | $20 | $200 |
| Direct (card shops) | 5 | $50 | $250 |
| **Total** | | | **$900** |

### Growth (Month 6)

| Channel | Users | Avg Revenue | Monthly |
|---------|-------|-------------|---------|
| RapidAPI | 100 | $18 | $1,800 |
| Apify | 30 | $22 | $660 |
| Direct (card shops) | 20 | $60 | $1,200 |
| **Total** | | | **$3,660** |

Costs: ~$50/mo hosting + ~$100/mo proxies at scale = 90%+ margins.
