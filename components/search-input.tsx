'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search Pokemon cards...' }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, onChange, value])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <Input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
      className="w-full"
    />
  )
}
