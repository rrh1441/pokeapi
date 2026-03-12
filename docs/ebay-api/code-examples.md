# eBay Market Pricing API - Code Examples

## Authentication
All requests require an API key passed in the `X-API-Key` header.

---

## GET /sold - Sold Listings (Simple)

### cURL
```bash
curl -X GET "https://ebay-market-pricing.p.rapidapi.com/sold?query=PSA%2010%20Charizard&limit=10" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Python
```python
import requests

url = "https://ebay-market-pricing.p.rapidapi.com/sold"
params = {
    "query": "PSA 10 Charizard",
    "limit": 10
}
headers = {
    "X-API-Key": "YOUR_API_KEY"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()

print(f"Found {data['count']} sold listings")
print(f"Median price: ${data['stats']['median_price']:.2f}")

for listing in data['listings']:
    print(f"  {listing['title']}: ${listing['price']:.2f}")
```

### JavaScript
```javascript
const response = await fetch(
  'https://ebay-market-pricing.p.rapidapi.com/sold?query=PSA%2010%20Charizard&limit=10',
  {
    headers: {
      'X-API-Key': 'YOUR_API_KEY'
    }
  }
);

const data = await response.json();

console.log(`Found ${data.count} sold listings`);
console.log(`Median price: $${data.stats.median_price.toFixed(2)}`);

data.listings.forEach(listing => {
  console.log(`  ${listing.title}: $${listing.price.toFixed(2)}`);
});
```

---

## POST /sold - Sold Listings (With Filters)

### cURL
```bash
curl -X POST "https://ebay-market-pricing.p.rapidapi.com/sold" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Pokemon Base Set Booster Box",
    "min_price": 5000,
    "max_price": 20000,
    "limit": 50
  }'
```

### Python
```python
import requests

url = "https://ebay-market-pricing.p.rapidapi.com/sold"
headers = {
    "X-API-Key": "YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "query": "Pokemon Base Set Booster Box",
    "min_price": 5000,
    "max_price": 20000,
    "limit": 50
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()

# Analyze price distribution
if data['stats']:
    stats = data['stats']
    print(f"Price Range: ${stats['min_price']:.2f} - ${stats['max_price']:.2f}")
    print(f"Average: ${stats['avg_price']:.2f}")
    print(f"Median: ${stats['median_price']:.2f}")
    print(f"Sample size: {stats['count']} sales")
```

### JavaScript
```javascript
const response = await fetch('https://ebay-market-pricing.p.rapidapi.com/sold', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'Pokemon Base Set Booster Box',
    min_price: 5000,
    max_price: 20000,
    limit: 50
  })
});

const data = await response.json();

if (data.stats) {
  console.log(`Price Range: $${data.stats.min_price} - $${data.stats.max_price}`);
  console.log(`Average: $${data.stats.avg_price.toFixed(2)}`);
  console.log(`Median: $${data.stats.median_price.toFixed(2)}`);
}
```

---

## GET /active - Active Listings

### cURL
```bash
curl -X GET "https://ebay-market-pricing.p.rapidapi.com/active?query=Nintendo%20Switch%20OLED&listing_type=buy_it_now&limit=20" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Python
```python
import requests

url = "https://ebay-market-pricing.p.rapidapi.com/active"
params = {
    "query": "Nintendo Switch OLED",
    "listing_type": "buy_it_now",  # or "auction"
    "min_price": 200,
    "max_price": 400,
    "limit": 20
}
headers = {
    "X-API-Key": "YOUR_API_KEY"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()

print(f"Found {data['count']} active listings")

for listing in data['listings']:
    print(f"${listing['price']:.2f} - {listing['title'][:50]}...")
    if listing.get('time_left'):
        print(f"  Time left: {listing['time_left']}")
```

### JavaScript
```javascript
const params = new URLSearchParams({
  query: 'Nintendo Switch OLED',
  listing_type: 'buy_it_now',
  min_price: 200,
  max_price: 400,
  limit: 20
});

const response = await fetch(
  `https://ebay-market-pricing.p.rapidapi.com/active?${params}`,
  {
    headers: {
      'X-API-Key': 'YOUR_API_KEY'
    }
  }
);

const data = await response.json();

console.log(`Found ${data.count} active listings`);
data.listings.forEach(listing => {
  console.log(`$${listing.price} - ${listing.title.substring(0, 50)}...`);
});
```

---

## POST /active - Active Listings (With Filters)

### cURL
```bash
curl -X POST "https://ebay-market-pricing.p.rapidapi.com/active" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "MacBook Pro M3",
    "listing_type": "auction",
    "min_price": 1000,
    "limit": 30
  }'
```

### Python
```python
import requests

url = "https://ebay-market-pricing.p.rapidapi.com/active"
headers = {
    "X-API-Key": "YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "query": "MacBook Pro M3",
    "listing_type": "auction",
    "min_price": 1000,
    "limit": 30
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()

# Find auctions ending soon
for listing in data['listings']:
    if listing.get('time_left'):
        print(f"${listing['price']} ({listing['bids']} bids) - ends in {listing['time_left']}")
```

### JavaScript
```javascript
const response = await fetch('https://ebay-market-pricing.p.rapidapi.com/active', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'MacBook Pro M3',
    listing_type: 'auction',
    min_price: 1000,
    limit: 30
  })
});

const data = await response.json();

// Find auctions ending soon
data.listings.forEach(listing => {
  if (listing.time_left) {
    console.log(`$${listing.price} (${listing.bids} bids) - ends in ${listing.time_left}`);
  }
});
```

---

## Error Handling

### Python
```python
import requests

try:
    response = requests.get(url, params=params, headers=headers)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.HTTPError as e:
    if response.status_code == 401:
        print("Invalid API key")
    elif response.status_code == 429:
        print("Rate limit exceeded - please wait before retrying")
    elif response.status_code == 422:
        print(f"Validation error: {response.json()}")
    else:
        print(f"HTTP error: {e}")
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
```

### JavaScript
```javascript
try {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded');
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  const data = await response.json();
} catch (error) {
  console.error('Request failed:', error.message);
}
```
