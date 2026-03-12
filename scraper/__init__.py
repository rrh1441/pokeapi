"""eBay Scraper - Extract sold listings and product data from eBay."""

from scraper.scraper import (
    scrape_sold_listings,
    scrape_active_listings,
    search_sold_sync,
    search_active_sync,
    get_median_price,
    get_price_stats,
    EbayRateLimitError,
)
from scraper.api_client import EbayClient

__version__ = "0.1.0"
__all__ = [
    "scrape_sold_listings",
    "scrape_active_listings",
    "search_sold_sync",
    "search_active_sync",
    "get_median_price",
    "get_price_stats",
    "EbayRateLimitError",
    "EbayClient",
]
