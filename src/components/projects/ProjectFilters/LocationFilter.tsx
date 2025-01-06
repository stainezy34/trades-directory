import { Search } from 'lucide-react'

type Props = {
  value?: string
  onChange: (location: string | undefined) => void
}

export function LocationFilter({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Location
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value || undefined)}
          placeholder="Filter by location..."
          className="w-full pl-10 rounded-lg border-gray-300"
        />
      </div>
    </div>
  )
}