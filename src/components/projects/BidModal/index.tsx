import { memo } from 'react'
import { X } from 'lucide-react'
import { BidForm } from '../BidForm'
import type { BidInput } from '../../../lib/validations/bid'

type Props = {
  projectId: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: BidInput) => Promise<void>
  isSubmitting?: boolean
}

export const BidModal = memo(function BidModal({ 
  projectId,
  isOpen, 
  onClose, 
  onSubmit,
  isSubmitting 
}: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Submit Bid</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <BidForm
            projectId={projectId}
            onSubmit={onSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
})