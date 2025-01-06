import { useInfiniteScroll } from '../../../lib/hooks/useInfiniteScroll'
import { TradeCard } from '../TradeCard'
import { LoadingIndicator } from '../../shared/LoadingIndicator'
import type { Database } from '../../../lib/supabase/types'
import { supabase } from '../../../lib/supabase/client'

type Profile = Database['public']['Tables']['profiles']['Row']

const PAGE_SIZE = 10

export function TradesList() {
  const fetchTrades = async (page: number) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
      .order('rating', { ascending: false })

    return data || []
  }

  const { items: trades, loading, hasMore, lastItemRef } = useInfiniteScroll<Profile>(
    fetchTrades,
    { pageSize: PAGE_SIZE }
  )

  return (
    <div className="space-y-6">
      {trades.map((trade, index) => (
        <div
          key={trade.id}
          ref={index === trades.length - 1 ? lastItemRef : undefined}
        >
          <TradeCard tradesperson={trade} />
        </div>
      ))}
      {loading && <LoadingIndicator />}
      {!hasMore && trades.length > 0 && (
        <p className="text-center text-gray-500 py-4">No more trades to load</p>
      )}
    </div>
  )
}