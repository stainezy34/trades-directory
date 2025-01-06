import { useState, useEffect } from 'react'
import { ReviewCard } from './ReviewCard'
import { AddReviewButton } from './AddReviewButton'
import { LoadingSpinner } from '../shared/LoadingSpinner'
import { supabase } from '../../lib/supabase/client'
import type { Database } from '../../lib/supabase/types'

type Review = Database['public']['Tables']['reviews']['Row']

type Props = {
  tradesPersonId: string
}

export function ReviewList({ tradesPersonId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('reviews')
          .select('*, reviewer:profiles!reviewer_id(full_name, avatar_url)')
          .eq('tradesperson_id', tradesPersonId)
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        setReviews(data || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [tradesPersonId])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-6">
      <AddReviewButton tradesPersonId={tradesPersonId} onSuccess={(review) => {
        setReviews(prev => [review, ...prev])
      }} />
      
      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
    </div>
  )
}