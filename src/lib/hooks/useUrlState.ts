import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useUrlState<T extends Record<string, any>>(defaultState: T) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<T>(() => {
    const urlState = {} as T
    
    // Parse URL params into initial state
    for (const [key, value] of searchParams.entries()) {
      try {
        // Handle arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          urlState[key as keyof T] = JSON.parse(value)
        }
        // Handle booleans
        else if (value === 'true' || value === 'false') {
          urlState[key as keyof T] = value === 'true'
        }
        // Handle numbers
        else if (!isNaN(Number(value))) {
          urlState[key as keyof T] = Number(value)
        }
        // Handle strings
        else {
          urlState[key as keyof T] = value
        }
      } catch {
        urlState[key as keyof T] = value
      }
    }

    return { ...defaultState, ...urlState }
  })

  const updateState = useCallback((updates: Partial<T>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams()

    Object.entries(state).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          params.set(key, JSON.stringify(value))
        } else {
          params.set(key, String(value))
        }
      }
    })

    setSearchParams(params)
  }, [state, setSearchParams])

  return [state, updateState] as const
}