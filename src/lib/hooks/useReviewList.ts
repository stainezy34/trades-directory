import { useState, useCallback } from 'react'
import { supabase } from '../supabase/client'
import { useMemoizedSort } from './useMemoizedSort'
import type { Review } from '../types/review'

type SortOption = 'recent' | 'rating'

export function useReviewList(tradesPersonId: string) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const sortReviews = useCallback((a: Review, b: Review, sort: { field: SortOption }) => {
    if (sort.field === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return b.rating - a.rating
  }, [])

  const sortedReviews = useMemoizedSort(
    reviews,
    { field: sortBy, order: 'desc' },
    sortReviews
  )

  return {
    reviews: sortedReviews,
    loading,
    error,
    setSortBy
  }
}