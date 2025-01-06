import { memo } from 'react'
import { TradeCard } from './TradeCard'
import { TradeListSkeleton } from './skeletons/TradeListSkeleton'
import { Pagination } from '../shared/Pagination'
import { useUrlState } from '../../lib/hooks/useUrlState'
import type { Database } from '../../lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  trades: Profile[]
  loading?: boolean
}

export const TradesList = memo(function TradesList({ trades, loading }: Props) {
  const [pagination, setPagination] = useUrlState({
    page: 1,
    pageSize: 10,
    total: trades.length
  })

  if (loading) {
    return <TradeListSkeleton />
  }

  const paginatedTrades = trades.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {paginatedTrades.map((trade) => (
          <TradeCard key={trade.id} tradesperson={trade} />
        ))}
      </div>

      {trades.length > pagination.pageSize && (
        <Pagination
          pagination={pagination}
          onChange={setPagination}
          className="mt-8"
        />
      )}
    </div>
  )
})