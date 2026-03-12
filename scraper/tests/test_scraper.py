"""Basic tests for the eBay scraper."""
import pytest
from scraper.scraper import extract_item_id, get_median_price, get_price_stats


def test_extract_item_id():
    """Test extracting item ID from eBay URL."""
    url = "https://www.ebay.com/itm/123456789?hash=abc"
    assert extract_item_id(url) == "123456789"

    url2 = "https://www.ebay.com/itm/987654321"
    assert extract_item_id(url2) == "987654321"

    assert extract_item_id("invalid-url") is None


def test_get_median_price():
    """Test median price calculation."""
    listings = [{"price": 10}, {"price": 20}, {"price": 30}]
    assert get_median_price(listings) == 20

    listings = [{"price": 10}, {"price": 20}]
    assert get_median_price(listings) == 15

    assert get_median_price([]) is None


def test_get_price_stats():
    """Test price statistics calculation."""
    listings = [{"price": 10}, {"price": 20}, {"price": 30}, {"price": 40}]
    stats = get_price_stats(listings)

    assert stats["count"] == 4
    assert stats["min_price"] == 10
    assert stats["max_price"] == 40
    assert stats["median_price"] == 25  # (20 + 30) / 2
    assert stats["avg_price"] == 25  # (10 + 20 + 30 + 40) / 4

    assert get_price_stats([]) is None
