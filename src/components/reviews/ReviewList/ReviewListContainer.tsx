import { memo } from 'react'
import type { Review } from '../../../lib/types/review'

type Props = {
  reviews: Review[]
  children: React.ReactNode
}

export const ReviewListContainer = memo(function ReviewListContainer({ 
  reviews,
  children 
}: Props) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  )
})