import { useState, useCallback } from 'react'
import { debounce } from 'lodash'

export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  options = { debounceMs: 300 }
) {
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term)
    }, options.debounceMs),
    []
  )

  const filteredItems = items.filter(item => {
    if (!searchTerm) return true

    return searchFields.some(field => {
      const value = item[field]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return false
    })
  })

  return {
    searchTerm,
    setSearchTerm: debouncedSearch,
    filteredItems
  }
}