'use client'

import { useState } from 'react'
import { PLANS, PlanType } from '@/lib/stripe'

interface ApiKey {
  id: number
  key_prefix: string
  name: string
  requests_this_month: number
  last_used_at: string | null
  is_active: boolean
  created_at: string
}

interface ApiKeyManagerProps {
  initialKeys: ApiKey[]
  planConfig: (typeof PLANS)[PlanType]
}

export function ApiKeyManager({ initialKeys, planConfig }: ApiKeyManagerProps) {
  const [keys, setKeys] = useState(initialKeys)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const activeKeys = keys.filter((k) => k.is_active)

  async function createKey() {
    setIsCreating(true)
    setError(null)

    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: keyName || 'API Key' }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create key')
      }

      setNewKey(data.key)
      setKeyName('')

      // Refresh keys list
      const keysRes = await fetch('/api/keys')
      const keysData = await keysRes.json()
      setKeys(keysData.keys)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create key')
    } finally {
      setIsCreating(false)
    }
  }

  async function revokeKey(keyId: number) {
    if (!confirm('Are you sure you want to revoke this API key? This cannot be undone.')) {
      return
    }

    try {
      const res = await fetch(`/api/keys/${keyId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to revoke key')
      }

      setKeys(keys.map((k) => (k.id === keyId ? { ...k, is_active: false } : k)))
    } catch (err) {
      setError('Failed to revoke key')
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      {/* New Key Display */}
      {newKey && (
        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
          <p className="text-sm text-green-500 font-medium mb-2">
            Your new API key (save it now - you won&apos;t see it again):
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-background p-2 rounded text-sm font-mono break-all">
              {newKey}
            </code>
            <button
              onClick={() => copyToClipboard(newKey)}
              className="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Copy
            </button>
          </div>
          <button
            onClick={() => setNewKey(null)}
            className="mt-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Create New Key */}
      {activeKeys.length < 5 && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Key name (optional)"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="flex-1 bg-background border rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={createKey}
            disabled={isCreating}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {isCreating ? 'Creating...' : 'Create Key'}
          </button>
        </div>
      )}

      {/* Keys List */}
      <div className="space-y-2">
        {keys.map((key) => (
          <div
            key={key.id}
            className={`flex items-center justify-between p-3 border rounded-lg ${
              !key.is_active ? 'opacity-50' : ''
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono">{key.key_prefix}...</code>
                <span className="text-sm text-muted-foreground">{key.name}</span>
                {!key.is_active && (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-xs rounded">
                    Revoked
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Created {new Date(key.created_at).toLocaleDateString()}
                {key.last_used_at &&
                  ` · Last used ${new Date(key.last_used_at).toLocaleDateString()}`}
              </p>
            </div>
            {key.is_active && (
              <button
                onClick={() => revokeKey(key.id)}
                className="text-sm text-red-500 hover:text-red-400"
              >
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>

      {keys.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          No API keys yet. Create one to get started.
        </p>
      )}
    </div>
  )
}
