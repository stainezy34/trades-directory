import { memo } from 'react'
import { SearchBar } from '../../shared/SearchBar'
import { FilterSection } from '../../trades/TradeFilters/FilterSection'
import { TRADE_TYPES } from '../../../lib/utils/filters'
import type { Project } from '../../../lib/types/project'

type Props = {
  projects: Project[]
  onFilter: (filtered: Project[]) => void
}

export const ProjectFilters = memo(function ProjectFilters({ projects, onFilter }: Props) {
  const [filters, setFilters] = useState({
    search: '',
    tradeType: '',
    location: '',
    minBudget: '',
    maxBudget: '',
    status: ''
  })

  useEffect(() => {
    const filtered = projects.filter(project => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        if (!project.title.toLowerCase().includes(searchTerm) &&
            !project.description.toLowerCase().includes(searchTerm)) {
          return false
        }
      }

      // Trade type filter
      if (filters.tradeType && project.tradeType !== filters.tradeType) {
        return false
      }

      // Location filter
      if (filters.location && !project.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Budget filter
      const budget = Number(project.budget)
      if (filters.minBudget && budget < Number(filters.minBudget)) {
        return false
      }
      if (filters.maxBudget && budget > Number(filters.maxBudget)) {
        return false
      }

      // Status filter
      if (filters.status && project.status !== filters.status) {
        return false
      }

      return true
    })

    onFilter(filtered)
  }, [projects, filters, onFilter])

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <SearchBar
        value={filters.search}
        onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
        placeholder="Search projects..."
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FilterSection title="Trade Type">
          <select
            value={filters.tradeType}
            onChange={(e) => setFilters(prev => ({ ...prev, tradeType: e.target.value }))}
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
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Enter location..."
            className="w-full border rounded-lg"
          />
        </FilterSection>

        <FilterSection title="Budget Range">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={filters.minBudget}
                onChange={(e) => setFilters(prev => ({ ...prev, minBudget: e.target.value }))}
                placeholder="Min"
                className="w-full pl-8 border rounded-lg"
                min="0"
              />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={filters.maxBudget}
                onChange={(e) => setFilters(prev => ({ ...prev, maxBudget: e.target.value }))}
                placeholder="Max"
                className="w-full pl-8 border rounded-lg"
                min="0"
              />
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Status">
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full border rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </FilterSection>
      </div>
    </div>
  )
})