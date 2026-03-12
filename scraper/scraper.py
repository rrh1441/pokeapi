"""eBay sold listings scraper using Playwright.

The Browse API does not support sold/completed items (that was the deprecated Finding API).
This module scrapes eBay's website directly to get sold listing data.
"""
import asyncio
import os
import re
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")


class EbayRateLimitError(Exception):
    """Raised when eBay rate limits or blocks us."""
    pass


def _get_proxy_config() -> dict | None:
    """Get proxy configuration from environment if enabled.

    Supports DataImpulse, Bright Data, and other rotating proxy providers.
    """
    if os.environ.get("PROXY_ENABLED", "").lower() != "true":
        return None

    host = os.environ.get("PROXY_HOST")
    port = os.environ.get("PROXY_PORT")
    username = os.environ.get("PROXY_USERNAME")
    password = os.environ.get("PROXY_PASSWORD")

    if not host or not port:
        return None

    proxy = {"server": f"http://{host}:{port}"}
    if username and password:
        proxy["username"] = username
        proxy["password"] = password

    return proxy


async def scrape_sold_listings(
    query: str,
    min_price: float = None,
    max_price: float = None,
    limit: int = 50,
    category: str = None,
) -> list[dict]:
    """
    Scrape sold listings from eBay website.

    Args:
        query: Search query
        min_price: Minimum price filter
        max_price: Maximum price filter
        limit: Max results to return
        category: eBay category ID (optional)

    Returns:
        List of sold item dicts with price, title, url
    """
    from playwright.async_api import async_playwright

    # Build URL with sold filter
    url = f"https://www.ebay.com/sch/i.html?_nkw={query.replace(' ', '+')}&_sacat={category or '0'}&LH_Complete=1&LH_Sold=1"

    if min_price is not None:
        url += f"&_udlo={min_price}"
    if max_price is not None:
        url += f"&_udhi={max_price}"

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        proxy = _get_proxy_config()
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            proxy=proxy,
        )
        page = await context.new_page()

        await page.goto(url, wait_until="domcontentloaded", timeout=30000)
        await page.wait_for_timeout(2000)

        # Check for rate limiting / blocking signals
        page_url = page.url

        # Detect CAPTCHA - only trigger on VISIBLE challenges
        captcha_detected = await page.evaluate('''() => {
            if (document.title.toLowerCase().includes('robot') ||
                document.title.toLowerCase().includes('security check') ||
                document.title.toLowerCase().includes('verify')) return 'title-verify';

            const recaptchaFrame = document.querySelector('iframe[src*="recaptcha/api2/anchor"], iframe[src*="recaptcha/api2/bframe"]');
            if (recaptchaFrame) {
                const rect = recaptchaFrame.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) return 'visible-recaptcha';
            }

            const bodyText = document.body?.innerText?.toLowerCase() || '';
            if (bodyText.includes("verify you're human") ||
                bodyText.includes("please verify you're not a robot") ||
                bodyText.includes("confirm you're not a robot")) return 'body-verify';

            const hasSearchResults = document.querySelector('.srp-results, .s-item, .s-card');
            const hasCaptchaChallenge = document.querySelector('#captcha, .captcha-container, .g-recaptcha-response');
            if (!hasSearchResults && hasCaptchaChallenge) return 'captcha-page';

            return null;
        }''')
        if captcha_detected:
            await browser.close()
            raise EbayRateLimitError(f"CAPTCHA detected ({captcha_detected}) - eBay is rate limiting")

        # Detect access denied / blocking
        blocking_detected = await page.evaluate('''() => {
            const title = document.title.toLowerCase();
            if (title.includes('access denied') || title.includes('blocked')) return 'title-blocked';
            const bodyText = document.body?.innerText?.toLowerCase() || '';
            if (bodyText.includes('your access to this page has been blocked') ||
                bodyText.includes('you have been blocked')) return 'body-blocked';
            return null;
        }''')
        if blocking_detected:
            await browser.close()
            raise EbayRateLimitError(f"Access denied ({blocking_detected}) - eBay is blocking requests")

        # Detect redirect to error page
        if "error" in page_url.lower() and "sch/i.html" not in page_url:
            await browser.close()
            raise EbayRateLimitError(f"Redirected to error page: {page_url}")

        # Extract items using JavaScript
        items = await page.evaluate('''() => {
            const items = [];

            // Try new eBay structure first (.s-card)
            document.querySelectorAll('.s-card').forEach(el => {
                const titleEl = el.querySelector('.s-card__title, [class*="s-card__title"]');
                const priceEl = el.querySelector('.s-card__price, [class*="s-card__price"]');
                const linkEl = el.querySelector('a[href*="/itm/"]');
                const imgEl = el.querySelector('img');
                const dateEl = el.querySelector('.s-card__caption, [class*="caption"]');

                if (titleEl && priceEl) {
                    const title = titleEl.innerText || titleEl.textContent;
                    const price = priceEl.innerText || priceEl.textContent;
                    const url = linkEl ? linkEl.href : '';
                    const image = imgEl ? imgEl.src : '';
                    const soldDate = dateEl ? dateEl.innerText : '';

                    if (title && !title.includes('Shop on eBay')) {
                        items.push({
                            title: title.trim(),
                            price_text: price.trim(),
                            url: url,
                            image_url: image,
                            sold_date: soldDate.trim()
                        });
                    }
                }
            });

            // Fallback to old structure (.s-item)
            if (items.length === 0) {
                document.querySelectorAll('.s-item').forEach(el => {
                    const titleEl = el.querySelector('.s-item__title');
                    const priceEl = el.querySelector('.s-item__price');
                    const linkEl = el.querySelector('.s-item__link');
                    const imgEl = el.querySelector('.s-item__image img');
                    const dateEl = el.querySelector('.s-item__caption, .POSITIVE');

                    if (titleEl && priceEl) {
                        const title = titleEl.innerText;
                        const price = priceEl.innerText;
                        const url = linkEl ? linkEl.href : '';
                        const image = imgEl ? imgEl.src : '';
                        const soldDate = dateEl ? dateEl.innerText : '';

                        if (!title.includes('Shop on eBay')) {
                            items.push({
                                title: title,
                                price_text: price,
                                url: url,
                                image_url: image,
                                sold_date: soldDate
                            });
                        }
                    }
                });
            }

            return items;
        }''')

        await browser.close()

    # Parse prices and filter
    results = []
    for item in items[:limit]:
        # Extract numeric price
        match = re.search(r'\$([\d,]+\.\d{2})', item['price_text'])
        if match:
            price = float(match.group(1).replace(',', ''))

            # Apply price filters
            if min_price is not None and price < min_price:
                continue
            if max_price is not None and price > max_price:
                continue

            results.append({
                'title': item['title'],
                'price': price,
                'url': item['url'],
                'image_url': item.get('image_url', ''),
                'sold_date': item.get('sold_date', ''),
                'ebay_item_id': extract_item_id(item['url']),
            })

    return results


async def scrape_active_listings(
    query: str,
    min_price: float = None,
    max_price: float = None,
    limit: int = 50,
    category: str = None,
    listing_type: str = None,  # "auction" or "buy_it_now"
) -> list[dict]:
    """
    Scrape active (non-sold) listings from eBay website.

    Args:
        query: Search query
        min_price: Minimum price filter
        max_price: Maximum price filter
        limit: Max results to return
        category: eBay category ID (optional)
        listing_type: "auction" or "buy_it_now" (optional)

    Returns:
        List of active listing dicts
    """
    from playwright.async_api import async_playwright

    # Build URL without sold filter
    url = f"https://www.ebay.com/sch/i.html?_nkw={query.replace(' ', '+')}&_sacat={category or '0'}"

    if min_price is not None:
        url += f"&_udlo={min_price}"
    if max_price is not None:
        url += f"&_udhi={max_price}"
    if listing_type == "auction":
        url += "&LH_Auction=1"
    elif listing_type == "buy_it_now":
        url += "&LH_BIN=1"

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        proxy = _get_proxy_config()
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            proxy=proxy,
        )
        page = await context.new_page()

        await page.goto(url, wait_until="domcontentloaded", timeout=30000)
        await page.wait_for_timeout(2000)

        # Same rate limit detection as sold listings
        captcha_detected = await page.evaluate('''() => {
            if (document.title.toLowerCase().includes('robot') ||
                document.title.toLowerCase().includes('security check')) return 'title-verify';
            return null;
        }''')
        if captcha_detected:
            await browser.close()
            raise EbayRateLimitError(f"CAPTCHA detected ({captcha_detected})")

        # Extract items
        items = await page.evaluate('''() => {
            const items = [];

            document.querySelectorAll('.s-item, .s-card').forEach(el => {
                const titleEl = el.querySelector('.s-item__title, .s-card__title');
                const priceEl = el.querySelector('.s-item__price, .s-card__price');
                const linkEl = el.querySelector('.s-item__link, a[href*="/itm/"]');
                const imgEl = el.querySelector('img');
                const bidsEl = el.querySelector('.s-item__bids, [class*="bids"]');
                const timeEl = el.querySelector('.s-item__time-left, [class*="time-left"]');

                if (titleEl && priceEl) {
                    const title = (titleEl.innerText || '').trim();
                    if (title && !title.includes('Shop on eBay')) {
                        items.push({
                            title: title,
                            price_text: (priceEl.innerText || '').trim(),
                            url: linkEl ? linkEl.href : '',
                            image_url: imgEl ? imgEl.src : '',
                            bids: bidsEl ? bidsEl.innerText : '',
                            time_left: timeEl ? timeEl.innerText : ''
                        });
                    }
                }
            });
            return items;
        }''')

        await browser.close()

    # Parse results
    results = []
    for item in items[:limit]:
        match = re.search(r'\$([\d,]+\.\d{2})', item['price_text'])
        if match:
            price = float(match.group(1).replace(',', ''))
            if min_price is not None and price < min_price:
                continue
            if max_price is not None and price > max_price:
                continue

            results.append({
                'title': item['title'],
                'price': price,
                'url': item['url'],
                'image_url': item.get('image_url', ''),
                'bids': item.get('bids', ''),
                'time_left': item.get('time_left', ''),
                'ebay_item_id': extract_item_id(item['url']),
            })

    return results


def extract_item_id(url: str) -> Optional[str]:
    """Extract eBay item ID from URL."""
    match = re.search(r'/itm/(\d+)', url)
    return match.group(1) if match else None


def search_sold_sync(
    query: str,
    min_price: float = None,
    max_price: float = None,
    limit: int = 50,
) -> list[dict]:
    """Synchronous wrapper for scrape_sold_listings."""
    return asyncio.run(scrape_sold_listings(query, min_price, max_price, limit))


def search_active_sync(
    query: str,
    min_price: float = None,
    max_price: float = None,
    limit: int = 50,
    listing_type: str = None,
) -> list[dict]:
    """Synchronous wrapper for scrape_active_listings."""
    return asyncio.run(scrape_active_listings(query, min_price, max_price, limit, listing_type=listing_type))


def get_median_price(listings: list[dict]) -> Optional[float]:
    """Calculate median price from listings."""
    if not listings:
        return None
    prices = sorted([l['price'] for l in listings])
    n = len(prices)
    if n % 2 == 0:
        return (prices[n // 2 - 1] + prices[n // 2]) / 2
    return prices[n // 2]


def get_price_stats(listings: list[dict]) -> Optional[dict]:
    """Get price statistics from listings."""
    if not listings:
        return None

    prices = [l['price'] for l in listings]
    prices.sort()
    n = len(prices)

    if n % 2 == 0:
        median = (prices[n // 2 - 1] + prices[n // 2]) / 2
    else:
        median = prices[n // 2]

    return {
        'median_price': median,
        'avg_price': sum(prices) / n,
        'min_price': min(prices),
        'max_price': max(prices),
        'count': n,
    }
