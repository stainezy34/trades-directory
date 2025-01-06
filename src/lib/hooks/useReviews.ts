import { useState } from 'react'
import { supabase } from '../supabase/client'
import type { Database } from '../supabase/types'

type Review = Database['public']['Tables']['reviews']['Row']
type NewReview = Omit<Review, 'id' | 'created_at' | 'updated_at'>

export function useReviews() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitReview = async (review: NewReview) => {
    setSubmitting(true)
    setError(null)

    try {
      const { error: submitError } = await supabase
        .from('reviews')
        .insert(review)

      if (submitError) throw submitError

      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to submit review')
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return { submitReview, submitting, error }
}