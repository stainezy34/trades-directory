import { memo } from 'react'
import { AddReviewButton } from '../AddReviewButton'
import type { Review } from '../../../lib/types/review'

type Props = {
  tradesPersonId: string
  onAddReview: (review: Review) => void
  onSortChange: (sort: 'recent' | 'rating') => void
}

export const ReviewListHeader = memo(function ReviewListHeader({
  tradesPersonId,
  onAddReview,
  onSortChange
}: Props) {
  return (
    <div className="flex justify-between items-center mb-6">
      <AddReviewButton
        tradesPersonId={tradesPersonId}
        onSuccess={onAddReview}
      />
      <select
        onChange={(e) => onSortChange(e.target.value as 'recent' | 'rating')}
        className="border-gray-300 rounded-md text-sm"
      >
        <option value="recent">Most Recent</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  )
})