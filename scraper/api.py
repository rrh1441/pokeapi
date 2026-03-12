"""FastAPI wrapper for eBay scraper API.

This module exposes the scraper functionality via REST API endpoints,
suitable for deployment on RapidAPI, Apify, or direct hosting.
"""
import os
import time
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException, Security, Depends, Query
from fastapi.security import APIKeyHeader
from pydantic import BaseModel, Field

from scraper.scraper import (
    scrape_sold_listings,
    scrape_active_listings,
    get_price_stats,
    EbayRateLimitError,
)

# API Key authentication
API_KEY_HEADER = APIKeyHeader(name="X-API-Key", auto_error=False)
RAPIDAPI_KEY_HEADER = APIKeyHeader(name="X-RapidAPI-Proxy-Secret", auto_error=False)


def get_api_key(
    api_key: str = Security(API_KEY_HEADER),
    rapidapi_key: str = Security(RAPIDAPI_KEY_HEADER),
) -> str:
    """Validate API key from header or RapidAPI proxy."""
    valid_keys = os.environ.get("API_KEYS", "").split(",")
    rapidapi_secret = os.environ.get("RAPIDAPI_PROXY_SECRET", "")

    # Check RapidAPI proxy secret first
    if rapidapi_secret and rapidapi_key == rapidapi_secret:
        return "rapidapi"

    # Check direct API key
    if api_key and api_key in valid_keys:
        return api_key

    raise HTTPException(status_code=401, detail="Invalid or missing API key")


# Request/Response models
class SoldListingsRequest(BaseModel):
    query: str = Field(..., description="Search query", example="PSA 10 Charizard")
    min_price: Optional[float] = Field(None, description="Minimum price filter")
    max_price: Optional[float] = Field(None, description="Maximum price filter")
    limit: int = Field(50, ge=1, le=200, description="Maximum results to return")
    category: Optional[str] = Field(None, description="eBay category ID")


class ActiveListingsRequest(BaseModel):
    query: str = Field(..., description="Search query")
    min_price: Optional[float] = Field(None, description="Minimum price filter")
    max_price: Optional[float] = Field(None, description="Maximum price filter")
    limit: int = Field(50, ge=1, le=200, description="Maximum results to return")
    category: Optional[str] = Field(None, description="eBay category ID")
    listing_type: Optional[str] = Field(None, description="'auction' or 'buy_it_now'")


class ListingItem(BaseModel):
    title: str
    price: float
    url: str
    image_url: Optional[str] = None
    ebay_item_id: Optional[str] = None
    sold_date: Optional[str] = None
    bids: Optional[str] = None
    time_left: Optional[str] = None


class PriceStats(BaseModel):
    median_price: float
    avg_price: float
    min_price: float
    max_price: float
    count: int


class SoldListingsResponse(BaseModel):
    query: str
    count: int
    listings: list[ListingItem]
    stats: Optional[PriceStats] = None
    scraped_at: str


class ActiveListingsResponse(BaseModel):
    query: str
    count: int
    listings: list[ListingItem]
    scraped_at: str


# FastAPI app
app = FastAPI(
    title="eBay Market Pricing API",
    description="Get real sold prices and active listings from eBay for price research and market analysis",
    version="0.1.0",
)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}


@app.post("/sold", response_model=SoldListingsResponse)
async def get_sold_listings(
    request: SoldListingsRequest,
    api_key: str = Depends(get_api_key),
):
    """
    Get sold/completed listings from eBay.

    Returns actual sale prices (what items sold for, not asking prices).
    Great for price research, market analysis, and arbitrage.
    """
    try:
        start_time = time.time()

        listings = await scrape_sold_listings(
            query=request.query,
            min_price=request.min_price,
            max_price=request.max_price,
            limit=request.limit,
            category=request.category,
        )

        stats = get_price_stats(listings) if listings else None

        return SoldListingsResponse(
            query=request.query,
            count=len(listings),
            listings=[ListingItem(**l) for l in listings],
            stats=PriceStats(**stats) if stats else None,
            scraped_at=datetime.utcnow().isoformat(),
        )

    except EbayRateLimitError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scraping failed: {str(e)}")


@app.post("/active", response_model=ActiveListingsResponse)
async def get_active_listings(
    request: ActiveListingsRequest,
    api_key: str = Depends(get_api_key),
):
    """
    Get active (non-sold) listings from eBay.

    Returns current listings including auctions and buy-it-now.
    """
    try:
        listings = await scrape_active_listings(
            query=request.query,
            min_price=request.min_price,
            max_price=request.max_price,
            limit=request.limit,
            category=request.category,
            listing_type=request.listing_type,
        )

        return ActiveListingsResponse(
            query=request.query,
            count=len(listings),
            listings=[ListingItem(**l) for l in listings],
            scraped_at=datetime.utcnow().isoformat(),
        )

    except EbayRateLimitError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scraping failed: {str(e)}")


@app.get("/sold", response_model=SoldListingsResponse)
async def get_sold_listings_get(
    query: str = Query(..., description="Search query"),
    min_price: Optional[float] = Query(None, description="Minimum price"),
    max_price: Optional[float] = Query(None, description="Maximum price"),
    limit: int = Query(50, ge=1, le=200, description="Max results"),
    category: Optional[str] = Query(None, description="eBay category ID"),
    api_key: str = Depends(get_api_key),
):
    """GET endpoint for sold listings (convenience for simple requests)."""
    request = SoldListingsRequest(
        query=query,
        min_price=min_price,
        max_price=max_price,
        limit=limit,
        category=category,
    )
    return await get_sold_listings(request, api_key)


@app.get("/active", response_model=ActiveListingsResponse)
async def get_active_listings_get(
    query: str = Query(..., description="Search query"),
    min_price: Optional[float] = Query(None, description="Minimum price"),
    max_price: Optional[float] = Query(None, description="Maximum price"),
    limit: int = Query(50, ge=1, le=200, description="Max results"),
    category: Optional[str] = Query(None, description="eBay category ID"),
    listing_type: Optional[str] = Query(None, description="'auction' or 'buy_it_now'"),
    api_key: str = Depends(get_api_key),
):
    """GET endpoint for active listings (convenience for simple requests)."""
    request = ActiveListingsRequest(
        query=query,
        min_price=min_price,
        max_price=max_price,
        limit=limit,
        category=category,
        listing_type=listing_type,
    )
    return await get_active_listings(request, api_key)


# For running with uvicorn directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
