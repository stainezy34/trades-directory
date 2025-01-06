import { useState } from 'react'
import { Search, Filter, Star } from 'lucide-react'
import { TRADE_TYPES, type FilterParams } from '../../lib/utils/filters'

type Props = {
  onFilterChange: (filters: FilterParams) => void
}

export function TradesFilter({ onFilterChange }: Props) {
  const [filters, setFilters] = useState<FilterParams>({})

  const handleFilterChange = (updates: Partial<FilterParams>) => {
    const newFilters = { ...filters, ...updates }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or business..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          onChange={(e) => handleFilterChange({ search: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Trade Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trade Type
          </label>
          <select
            className="w-full border rounded-lg"
            onChange={(e) => handleFilterChange({ tradeType: e.target.value as any })}
          >
            <option value="">All Trades</option>
            {TRADE_TYPES.map((trade) => (
              <option key={trade} value={trade}>{trade}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location..."
            className="w-full border rounded-lg"
            onChange={(e) => handleFilterChange({ location: e.target.value })}
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rating
          </label>
          <div className="relative">
            <select
              className="w-full border rounded-lg appearance-none"
              onChange={(e) => handleFilterChange({ minRating: Number(e.target.value) })}
            >
              <option value="">Any Rating</option>
              {[4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}+ Stars
                </option>
              ))}
            </select>
            <Star className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="mt-4 flex flex-wrap gap-4">
        {/* Rate Range */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Hourly Rate
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              min="0"
              placeholder="Max rate"
              className="w-full pl-8 border rounded-lg"
              onChange={(e) => handleFilterChange({ maxRate: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-end">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              onChange={(e) => handleFilterChange({ available: e.target.checked })}
            />
            <span className="ml-2 text-sm text-gray-700">Available Now</span>
          </label>
        </div>
      </div>
    </div>
  )
}