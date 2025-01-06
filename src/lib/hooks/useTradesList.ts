import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import type { Database } from '../supabase/types'
import type { FilterParams } from '../utils/filters'
import type { SortState } from '../utils/pagination'

type Profile = Database['public']['Tables']['profiles']['Row']

export function useTradesList(filters: FilterParams, sort: SortState) {
  const [trades, setTrades] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        let query = supabase.from('profiles').select('*')

        // Apply filters
        if (filters.search) {
          query = query.or(`full_name.ilike.%${filters.search}%,business_name.ilike.%${filters.search}%`)
        }
        if (filters.tradeType) {
          query = query.contains('trade_type', [filters.tradeType])
        }
        if (filters.location) {
          query = query.ilike('location', `%${filters.location}%`)
        }
        if (filters.minRating) {
          query = query.gte('rating', filters.minRating)
        }
        if (filters.maxRate) {
          query = query.lte('hourly_rate', filters.maxRate)
        }
        if (filters.available !== undefined) {
          query = query.eq('available', filters.available)
        }

        // Apply sorting
        query = query.order(sort.field, { ascending: sort.order === 'asc' })

        const { data, error: fetchError } = await query

        if (fetchError) throw fetchError
        setTrades(data || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load trades')
      } finally {
        setLoading(false)
      }
    }

    fetchTrades()
  }, [filters, sort])

  return { trades, loading, error }
}