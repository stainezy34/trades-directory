import { ArrowUpDown } from 'lucide-react'
import type { SortState } from '../../lib/utils/pagination'

type Props = {
  sort: SortState
  onChange: (sort: SortState) => void
}

const SORT_OPTIONS = [
  { label: 'Rating (High to Low)', field: 'rating', order: 'desc' },
  { label: 'Rating (Low to High)', field: 'rating', order: 'asc' },
  { label: 'Rate (Low to High)', field: 'hourly_rate', order: 'asc' },
  { label: 'Rate (High to Low)', field: 'hourly_rate', order: 'desc' },
  { label: 'Newest First', field: 'created_at', order: 'desc' },
  { label: 'Oldest First', field: 'created_at', order: 'asc' },
] as const

export function TradeSort({ sort, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-500" />
      <select
        value={`${sort.field}-${sort.order}`}
        onChange={(e) => {
          const [field, order] = e.target.value.split('-') as [SortState['field'], SortState['order']]
          onChange({ field, order })
        }}
        className="border-gray-300 rounded-md text-sm"
      >
        {SORT_OPTIONS.map((option) => (
          <option 
            key={`${option.field}-${option.order}`}
            value={`${option.field}-${option.order}`}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}