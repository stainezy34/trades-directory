import { memo } from 'react'
import { format } from 'date-fns'
import { cn } from '../../lib/utils/cn'
import { useNotifications } from '../../lib/hooks/useNotifications'
import type { Notification } from '../../lib/types/notification'

type Props = {
  notification: Notification
  onClick: () => void
}

export const NotificationItem = memo(function NotificationItem({
  notification,
  onClick
}: Props) {
  const { markAsRead } = useNotifications()

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full text-left p-4 hover:bg-gray-50 border-b last:border-b-0",
        !notification.read && "bg-blue-50"
      )}
    >
      <h3 className="font-medium text-gray-900">{notification.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
      <time className="text-xs text-gray-500 mt-2 block">
        {format(new Date(notification.created_at), 'MMM d, h:mm a')}
      </time>
    </button>
  )
})