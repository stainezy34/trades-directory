import { cn } from '../../../lib/utils/cn'
import type { SkeletonVariant } from './types'

type Props = {
  className?: string
  variant?: SkeletonVariant
}

export function SkeletonItem({ className, variant = 'default' }: Props) {
  const variants = {
    default: 'h-4',
    text: 'h-4',
    title: 'h-6 w-1/4',
    avatar: 'h-12 w-12 rounded-full',
    thumbnail: 'h-24 w-24 rounded-lg',
    card: 'h-48',
    banner: 'h-32',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded',
        variants[variant],
        className
      )}
    />
  )
}