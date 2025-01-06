import { useMemo } from 'react'
import type { FilterParams } from '../utils/filters'

export function useMemoizedFilter<T>(
  items: T[],
  filters: FilterParams,
  filterFn: (item: T, filters: FilterParams) => boolean
) {
  return useMemo(() => {
    return items.filter(item => filterFn(item, filters))
  }, [items, filters, filterFn])
}