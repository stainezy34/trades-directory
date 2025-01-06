import { memo } from 'react'
import { Star } from 'lucide-react'

type Props = {
  value: number
  size?: 'sm' | 'md' | 'lg'
}

export const Rating = memo(function Rating({ value, size = 'md' }: Props) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <div className="flex items-center gap-1">
      <Star className={`${sizes[size]} text-yellow-400 fill-current`} />
      <span className="font-medium">{value.toFixed(1)}</span>
    </div>
  )
})