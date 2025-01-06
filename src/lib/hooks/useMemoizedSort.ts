import { useMemo } from 'react'
import type { SortState } from '../utils/pagination'

export function useMemoizedSort<T>(
  items: T[],
  sort: SortState,
  sortFn: (a: T, b: T, sort: SortState) => number
) {
  return useMemo(() => {
    return [...items].sort((a, b) => sortFn(a, b, sort))
  }, [items, sort, sortFn])
}