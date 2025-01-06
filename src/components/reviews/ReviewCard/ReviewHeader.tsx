import { User } from 'lucide-react'
import { OptimizedImage } from '../../shared/OptimizedImage'
import { Rating } from '../../shared/Rating'

type Props = {
  reviewer?: {
    fullName: string
    avatarUrl?: string | null
  }
  rating: number
  date: string
}

export function ReviewHeader({ reviewer, rating, date }: Props) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {reviewer?.avatarUrl ? (
          <OptimizedImage
            src={reviewer.avatarUrl}
            alt={reviewer.fullName}
            width={40}
            height={40}
            className="rounded-full"
            loading="lazy"
            sizes="40px"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-400" />
          </div>
        )}
        <div>
          <p className="font-medium">{reviewer?.fullName || 'Anonymous'}</p>
          <time className="text-sm text-gray-500">{date}</time>
        </div>
      </div>
      <Rating value={rating} />
    </div>
  )
}