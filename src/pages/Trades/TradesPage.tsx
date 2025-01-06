import { useState, useCallback } from 'react'
import { TradesFilter } from '../../components/trades/TradesFilter'
import { TradesList } from '../../components/trades/TradesList'
import { TradeSort } from '../../components/trades/TradeSort'
import { useTradesList } from '../../lib/hooks/useTradesList'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'
import { ErrorBoundary } from '../../components/shared/ErrorBoundary'
import { useMemoizedSort } from '../../lib/hooks/useMemoizedSort'
import type { FilterParams } from '../../lib/utils/filters'
import type { SortState } from '../../lib/utils/pagination'
import type { Database } from '../../lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

export function TradesPage() {
  const [filters, setFilters] = useState<FilterParams>({})
  const [sort, setSort] = useState<SortState>({
    field: 'rating',
    order: 'desc'
  })
  
  const { trades, loading, error } = useTradesList(filters, sort)

  const sortTrades = useCallback((a: Profile, b: Profile, sort: SortState) => {
    const value = (a[sort.field] as number) - (b[sort.field] as number)
    return sort.order === 'asc' ? value : -value
  }, [])

  const sortedTrades = useMemoizedSort(trades, sort, sortTrades)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Find Tradespeople</h1>
        <TradeSort sort={sort} onChange={setSort} />
      </div>

      <ErrorBoundary>
        <TradesFilter onFilterChange={setFilters} />
        
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <TradesList trades={sortedTrades} />
        )}
      </ErrorBoundary>
    </div>
  )
}