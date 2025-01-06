import type { Database } from '../supabase/types'

export type PaginationState = {
  page: number
  pageSize: number
  total: number
}

export type SortField = 'rating' | 'hourly_rate' | 'created_at'
export type SortOrder = 'asc' | 'desc'

export type SortState = {
  field: SortField
  order: SortOrder
}

export const PAGE_SIZES = [10, 20, 50] as const

export function getPaginationRange(pagination: PaginationState) {
  const start = pagination.pageSize * (pagination.page - 1)
  const end = start + pagination.pageSize - 1
  return { start, end }
}