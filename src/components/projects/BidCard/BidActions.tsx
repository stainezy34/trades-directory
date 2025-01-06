import { useState } from 'react'
import { Loader } from 'lucide-react'

type Props = {
  bidId: string
  onAccept?: (bidId: string) => Promise<void>
  onReject?: (bidId: string) => Promise<void>
}

export function BidActions({ bidId, onAccept, onReject }: Props) {
  const [loading, setLoading] = useState(false)

  const handleAction = async (action: 'accept' | 'reject') => {
    setLoading(true)
    try {
      if (action === 'accept' && onAccept) {
        await onAccept(bidId)
      } else if (action === 'reject' && onReject) {
        await onReject(bidId)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={() => handleAction('reject')}
        disabled={loading}
        className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50"
      >
        {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Reject'}
      </button>
      <button
        onClick={() => handleAction('accept')}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Accept'}
      </button>
    </div>
  )
}