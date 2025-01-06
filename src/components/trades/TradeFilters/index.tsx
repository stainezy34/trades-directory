import { memo } from 'react'
import { SearchBar } from '../../shared/SearchBar'
import { FilterSection } from './FilterSection'
import { TRADE_TYPES } from '../../../lib/utils/filters'
import type { FilterParams } from '../../../lib/utils/filters'

type Props = {
  filters: FilterParams
  onFilterChange: (filters: FilterParams) => void
}

export const TradeFilters = memo(function TradeFilters({ filters, onFilterChange }: Props) {
  const handleFilterChange = (key: keyof FilterParams, value: any) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <SearchBar
        value={filters.search || ''}
        onChange={(value) => handleFilterChange('search', value)}
        placeholder="Search by name or business..."
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FilterSection title="Trade Type">
          <select
            value={filters.tradeType || ''}
            onChange={(e) => handleFilterChange('tradeType', e.target.value)}
            className="w-full border rounded-lg"
          >
            <option value="">All Trades</option>
            {TRADE_TYPES.map((trade) => (
              <option key={trade} value={trade}>{trade}</option>
            ))}
          </select>
        </FilterSection>

        <FilterSection title="Location">
          <input
            type="text"
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            placeholder="Enter location..."
            className="w-full border rounded-lg"
          />
        </FilterSection>

        <FilterSection title="Rating">
          <select
            value={filters.minRating || ''}
            onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
            className="w-full border rounded-lg"
          >
            <option value="">Any Rating</option>
            {[4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>{rating}+ Stars</option>
            ))}
          </select>
        </FilterSection>

        <FilterSection title="Hourly Rate">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">$</span>
            <input
              type="number"
              value={filters.maxRate || ''}
              onChange={(e) => handleFilterChange('maxRate', Number(e.target.value))}
              placeholder="Max rate"
              className="w-full border rounded-lg"
              min="0"
              step="5"
            />
          </div>
        </FilterSection>

        <FilterSection title="Availability">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.available || false}
              onChange={(e) => handleFilterChange('available', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Available Now</span>
          </label>
        </FilterSection>
      </div>
    </div>
  )
})