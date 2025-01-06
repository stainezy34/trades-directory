import { memo } from 'react'
import { Bell } from 'lucide-react'
import { cn } from '../../lib/utils/cn'

type Props = {
  count: number
  onClick: () => void
  className?: string
}

export const NotificationIcon = memo(function NotificationIcon({ 
  count, 
  onClick,
  className 
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-2 text-gray-600 hover:text-gray-900 transition-colors",
        className
      )}
    >
      <Bell className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center 
                       min-w-[20px] h-5 text-xs font-bold text-white bg-red-500 
                       rounded-full px-1">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  )
})