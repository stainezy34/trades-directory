import { memo } from 'react'
import { Bell } from 'lucide-react'
import { useNotifications } from '../../lib/hooks/useNotifications'

type Props = {
  onClick: () => void
}

export const NotificationBell = memo(function NotificationBell({ onClick }: Props) {
  const { unreadCount } = useNotifications()

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900"
    >
      <Bell className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  )
})