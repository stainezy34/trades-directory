import { memo } from 'react'
import { Check } from 'lucide-react'
import { NotificationItem } from './NotificationItem'
import { LoadingSpinner } from '../shared/LoadingSpinner'
import { useNotifications } from '../../lib/hooks/useNotifications'

type Props = {
  onClose: () => void
}

export const NotificationList = memo(function NotificationList({ onClose }: Props) {
  const { notifications, loading, markAllAsRead } = useNotifications()

  if (loading) return <LoadingSpinner />

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <Check className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No notifications
          </p>
        ) : (
          notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={() => {
                if (notification.link) {
                  window.location.href = notification.link
                }
                onClose()
              }}
            />
          ))
        )}
      </div>
    </div>
  )
})