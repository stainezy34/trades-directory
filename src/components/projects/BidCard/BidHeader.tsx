import { format } from 'date-fns'
import { User } from 'lucide-react'
import { Badge } from '../../shared/Badge'
import type { BidStatus } from '../../../lib/types/bid'

type Props = {
  tradesperson?: {
    fullName: string
    businessName?: string | null
    rating?: number
  }
  status: BidStatus
  date: string
}

export function BidHeader({ tradesperson, status, date }: Props) {
  const statusVariants: Record<BidStatus, 'default' | 'success' | 'error'> = {
    pending: 'default',
    accepted: 'success',
    rejected: 'error'
  }

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <p className="font-medium">{tradesperson?.fullName}</p>
          {tradesperson?.businessName && (
            <p className="text-sm text-gray-600">{tradesperson.businessName}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Badge variant={statusVariants[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <time className="text-sm text-gray-500">
          {format(new Date(date), 'MMM d, yyyy')}
        </time>
      </div>
    </div>
  )
}