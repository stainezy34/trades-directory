import { memo } from 'react'
import { cn } from '../../lib/utils'

type Props = {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error'
  className?: string
}

export const Badge = memo(function Badge({ 
  children, 
  variant = 'default', 
  className 
}: Props) {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  }

  return (
    <span className={cn(
      'px-2 py-1 text-sm rounded-full inline-flex items-center',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
})