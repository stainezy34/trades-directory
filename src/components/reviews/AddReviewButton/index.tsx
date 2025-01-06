import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ReviewForm } from '../ReviewForm'
import { Modal } from './Modal'
import { useAuth } from '../../../lib/hooks/useAuth'
import type { Review } from '../../../lib/types/review'

type Props = {
  tradesPersonId: string
  onSuccess: (review: Review) => void
}

export function AddReviewButton({ tradesPersonId, onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <Plus className="w-5 h-5" />
        Add Review
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Write a Review"
      >
        <ReviewForm
          tradesperson={{ id: tradesPersonId }}
          onSuccess={(review) => {
            onSuccess(review)
            setIsOpen(false)
          }}
          onCancel={() => setIsOpen(false)}
        />
      </Modal>
    </>
  )
}