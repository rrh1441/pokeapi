'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface FilterDropdownsProps {
  sets: string[]
  rarities: string[]
  selectedSet: string
  selectedRarity: string
  cardNumber: string
  onSetChange: (value: string) => void
  onRarityChange: (value: string) => void
  onNumberChange: (value: string) => void
}

export function FilterDropdowns({
  sets,
  rarities,
  selectedSet,
  selectedRarity,
  cardNumber,
  onSetChange,
  onRarityChange,
  onNumberChange,
}: FilterDropdownsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select
        value={selectedSet}
        onValueChange={(value) => onSetChange(value ?? 'all')}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="All Sets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sets</SelectItem>
          {sets.map((set) => (
            <SelectItem key={set} value={set}>
              {set}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedRarity}
        onValueChange={(value) => onRarityChange(value ?? 'all')}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All Rarities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Rarities</SelectItem>
          {rarities.map((rarity) => (
            <SelectItem key={rarity} value={rarity}>
              {rarity}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="text"
        value={cardNumber}
        onChange={(e) => onNumberChange(e.target.value)}
        placeholder="Card #"
        className="w-full sm:w-[100px]"
      />
    </div>
  )
}
