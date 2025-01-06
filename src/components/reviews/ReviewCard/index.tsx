import { format } from 'date-fns'
import { ReviewHeader } from './ReviewHeader'
import { ReviewContent } from './ReviewContent'
import { ReviewImages } from './ReviewImages'
import type { Review } from '../../../lib/types/review'

type Props = {
  review: Review
}

export function ReviewCard({ review }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <ReviewHeader
        reviewer={review.reviewer}
        rating={review.rating}
        date={format(new Date(review.createdAt), 'MMM d, yyyy')}
      />
      
      <ReviewContent
        projectDate={format(new Date(review.projectDate), 'MMM d, yyyy')}
        projectDescription={review.projectDescription}
        comment={review.comment}
      />

      {review.images && review.images.length > 0 && (
        <ReviewImages images={review.images} />
      )}
    </div>
  )
}