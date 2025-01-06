import { memo, useState, useRef } from 'react'
import { useOnClickOutside } from '../../lib/hooks/useOnClickOutside'
import { NotificationIcon } from './NotificationIcon'
import { NotificationList } from './NotificationList'
import { useNotifications } from '../../lib/hooks/useNotifications'

export const NotificationPopover = memo(function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const { unreadCount } = useNotifications()
  const popoverRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popoverRef, () => setIsOpen(false))

  return (
    <div className="relative" ref={popoverRef}>
      <NotificationIcon
        count={unreadCount}
        onClick={() => setIsOpen(!isOpen)}
      />
      
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50">
          <NotificationList onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  )
})