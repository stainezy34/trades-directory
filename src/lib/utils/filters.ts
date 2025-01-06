export const TRADE_TYPES = [
  'Plumber',
  'Electrician',
  'Carpenter',
  'Painter',
  'HVAC Technician',
  'Roofer',
  'Mason',
  'Landscaper',
  'General Contractor',
] as const

export type TradeType = typeof TRADE_TYPES[number]

export type FilterParams = {
  search?: string
  tradeType?: TradeType
  location?: string
  minRating?: number
  maxRate?: number
  available?: boolean
}

export function buildFilterQuery(filters: FilterParams) {
  let query = supabase.from('profiles').select('*')

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

  return query.order('rating', { ascending: false })
}