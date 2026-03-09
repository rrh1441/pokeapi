'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const snippets = {
  curl: `curl "https://api.pokecard.io/v1/cards/search?q=charizard" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  python: `import requests

response = requests.get(
    "https://api.pokecard.io/v1/cards/search",
    params={"q": "charizard"},
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)
cards = response.json()`,
  javascript: `const response = await fetch(
  "https://api.pokecard.io/v1/cards/search?q=charizard",
  {
    headers: {
      "Authorization": "Bearer YOUR_API_KEY"
    }
  }
);
const { cards } = await response.json();`,
}

type Language = keyof typeof snippets

export function CodeSnippets() {
  const [language, setLanguage] = useState<Language>('curl')

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex border-b border-border">
        {(Object.keys(snippets) as Language[]).map((lang) => (
          <Button
            key={lang}
            variant="ghost"
            size="sm"
            className={`rounded-none ${language === lang ? 'bg-muted' : ''}`}
            onClick={() => setLanguage(lang)}
          >
            {lang === 'curl' ? 'cURL' : lang === 'python' ? 'Python' : 'JavaScript'}
          </Button>
        ))}
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code>{snippets[language]}</code>
      </pre>
    </div>
  )
}
