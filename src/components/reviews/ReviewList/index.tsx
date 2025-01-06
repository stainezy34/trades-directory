import { memo } from 'react'
import { ReviewCard } from '../ReviewCard'
import { ReviewListContainer } from './ReviewListContainer'
import { ReviewListHeader } from './ReviewListHeader'
import { useReviewList } from '../../../lib/hooks/useReviewList'
import { LoadingSpinner } from '../../shared/LoadingSpinner'

type Props = {
  tradesPersonId: string
}

export const ReviewList = memo(function ReviewList({ tradesPersonId }: Props) {
  const { reviews, loading, error, setSortBy } = useReviewList(tradesPersonId)

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <ReviewListContainer reviews={reviews}>
      <ReviewListHeader
        tradesPersonId={tradesPersonId}
        onAddReview={(review) => {
          // Update reviews list
        }}
        onSortChange={setSortBy}
      />
      
      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
    </ReviewListContainer>
  )
})