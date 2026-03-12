"""eBay Browse API client for searching active listings.

Note: The Browse API does NOT support sold/completed items.
Use the scraper module for sold listings.
"""
import os
import base64
import time
import re
import requests
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")


class EbayClient:
    """eBay Browse API client with OAuth2 authentication."""

    AUTH_URL = "https://api.ebay.com/identity/v1/oauth2/token"
    BROWSE_URL = "https://api.ebay.com/buy/browse/v1"

    SCOPES = ["https://api.ebay.com/oauth/api_scope"]

    def __init__(
        self,
        client_id: str = None,
        client_secret: str = None,
        sandbox: bool = False,
    ):
        self.client_id = client_id or os.environ.get("EBAY_CLIENT_ID")
        self.client_secret = client_secret or os.environ.get("EBAY_CLIENT_SECRET")

        if not self.client_id or not self.client_secret:
            raise ValueError(
                "eBay credentials required. Set EBAY_CLIENT_ID and EBAY_CLIENT_SECRET"
            )

        if sandbox:
            self.AUTH_URL = "https://api.sandbox.ebay.com/identity/v1/oauth2/token"
            self.BROWSE_URL = "https://api.sandbox.ebay.com/buy/browse/v1"

        self._token = None
        self._token_expiry = None

    def _get_token(self) -> str:
        """Get valid access token, refreshing if needed."""
        now = datetime.now(timezone.utc)

        if self._token and self._token_expiry:
            if now < self._token_expiry - timedelta(minutes=5):
                return self._token

        credentials = base64.b64encode(
            f"{self.client_id}:{self.client_secret}".encode()
        ).decode()

        response = requests.post(
            self.AUTH_URL,
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": f"Basic {credentials}",
            },
            data={
                "grant_type": "client_credentials",
                "scope": " ".join(self.SCOPES),
            },
        )

        if response.status_code != 200:
            raise Exception(f"eBay auth failed: {response.status_code} {response.text}")

        data = response.json()
        self._token = data["access_token"]
        self._token_expiry = now + timedelta(seconds=data["expires_in"])

        return self._token

    def _request(
        self,
        method: str,
        endpoint: str,
        params: dict = None,
        retry_count: int = 3,
    ) -> dict:
        """Make authenticated request with retry logic."""
        url = f"{self.BROWSE_URL}{endpoint}"
        headers = {
            "Authorization": f"Bearer {self._get_token()}",
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
            "Content-Type": "application/json",
        }

        for attempt in range(retry_count):
            try:
                response = requests.request(
                    method, url, headers=headers, params=params, timeout=30
                )

                if response.status_code == 429:
                    wait_time = int(response.headers.get("Retry-After", 60))
                    time.sleep(wait_time)
                    continue

                if response.status_code == 401:
                    self._token = None
                    continue

                response.raise_for_status()
                time.sleep(0.5)
                return response.json()

            except requests.exceptions.Timeout:
                if attempt < retry_count - 1:
                    time.sleep(2 ** attempt)
                    continue
                raise

        raise Exception(f"Request failed after {retry_count} attempts")

    def search(
        self,
        query: str,
        min_price: float = None,
        max_price: float = None,
        listing_type: str = None,
        condition: str = None,
        limit: int = 50,
        offset: int = 0,
        category_ids: str = None,
    ) -> list[dict]:
        """
        Search for items on eBay.

        Args:
            query: Search query
            min_price: Minimum price filter
            max_price: Maximum price filter
            listing_type: AUCTION, FIXED_PRICE
            condition: NEW, LIKE_NEW, etc.
            limit: Max results (up to 200)
            offset: Pagination offset
            category_ids: eBay category ID

        Returns:
            List of listing dicts
        """
        params = {
            "q": query,
            "limit": min(limit, 200),
            "offset": offset,
        }

        if category_ids:
            params["category_ids"] = category_ids

        filters = []

        if min_price is not None or max_price is not None:
            min_p = min_price or ""
            max_p = max_price or ""
            filters.append(f"price:[{min_p}..{max_p}]")
            filters.append("priceCurrency:USD")

        if listing_type:
            filters.append(f"buyingOptions:{{{listing_type}}}")

        if condition:
            filters.append(f"conditions:{{{condition}}}")

        if filters:
            params["filter"] = ",".join(filters)

        data = self._request("GET", "/item_summary/search", params)

        listings = []
        for item in data.get("itemSummaries", []):
            listings.append(self._parse_item(item, query))

        return listings

    def search_all(
        self,
        query: str,
        max_results: int = 500,
        **kwargs,
    ) -> list[dict]:
        """Search with pagination to get more results."""
        all_listings = []
        offset = 0
        limit = 200

        while offset < max_results:
            results = self.search(query, limit=limit, offset=offset, **kwargs)
            if not results:
                break
            all_listings.extend(results)
            offset += len(results)
            if len(results) < limit:
                break

        return all_listings[:max_results]

    def get_item(self, item_id: str) -> Optional[dict]:
        """Get detailed item info by ID."""
        try:
            data = self._request("GET", f"/item/{item_id}")
            return self._parse_item_detail(data)
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                return None
            raise

    def _parse_item(self, item: dict, search_query: str = None) -> dict:
        """Parse item summary into simplified format."""
        price_info = item.get("price", {})
        seller_info = item.get("seller", {})

        image = item.get("image", {})
        images = item.get("additionalImages", [])
        image_urls = []
        if image.get("imageUrl"):
            image_urls.append(self._to_full_res(image["imageUrl"]))
        for img in images:
            if img.get("imageUrl"):
                image_urls.append(self._to_full_res(img["imageUrl"]))

        buying_options = item.get("buyingOptions", [])
        if "AUCTION" in buying_options:
            listing_type = "AUCTION"
        elif "BEST_OFFER" in buying_options:
            listing_type = "BEST_OFFER"
        else:
            listing_type = "FIXED_PRICE"

        return {
            "ebay_item_id": item.get("itemId"),
            "title": item.get("title"),
            "price": float(price_info.get("value", 0)),
            "currency": price_info.get("currency", "USD"),
            "shipping_cost": self._parse_shipping(item),
            "listing_type": listing_type,
            "condition_text": item.get("condition"),
            "seller_username": seller_info.get("username"),
            "seller_feedback_score": seller_info.get("feedbackScore"),
            "seller_feedback_percent": seller_info.get("feedbackPercentage"),
            "image_urls": image_urls,
            "item_url": item.get("itemWebUrl"),
            "auction_end_time": item.get("itemEndDate"),
            "search_query": search_query,
        }

    def _parse_item_detail(self, item: dict) -> dict:
        """Parse detailed item response."""
        result = self._parse_item(item)
        result["description"] = item.get("description")
        result["item_location"] = item.get("itemLocation", {}).get("city")
        return result

    def _parse_shipping(self, item: dict) -> Optional[float]:
        """Parse shipping cost from item."""
        shipping = item.get("shippingOptions", [])
        if shipping:
            cost = shipping[0].get("shippingCost", {})
            if cost.get("value"):
                return float(cost["value"])
        return None

    def _to_full_res(self, url: str) -> str:
        """Convert eBay thumbnail URL to full resolution."""
        return re.sub(r's-l\d+\.', 's-l1600.', url)
