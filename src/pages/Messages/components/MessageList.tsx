import { memo, useEffect, useRef } from 'react'
import { groupBy } from 'lodash'
import { format } from 'date-fns'
import { MessageGroup } from './MessageGroup'
import { TypingIndicator } from './TypingIndicator'
import { useAuth } from '../../../lib/hooks/useAuth'
import type { Message } from '../../../lib/types/message'

type Props = {
  messages: Message[]
  typing?: boolean
  onRead?: (messageIds: string[]) => void
}

export const MessageList = memo(function MessageList({ 
  messages, 
  typing,
  onRead 
}: Props) {
  const { user } = useAuth()
  const bottomRef = useRef<HTMLDivElement>(null)

  // Group messages by date
  const groupedMessages = groupBy(messages, message => 
    format(new Date(message.created_at), 'yyyy-MM-dd')
  )

  // Mark messages as read when they become visible
  useEffect(() => {
    if (!onRead) return

    const unreadMessageIds = messages
      .filter(m => m.recipient_id === user?.id && !m.read)
      .map(m => m.id)

    if (unreadMessageIds.length > 0) {
      onRead(unreadMessageIds)
    }
  }, [messages, user?.id, onRead])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col gap-4 p-4 max-h-[600px] overflow-y-auto">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <MessageGroup
          key={date}
          date={date}
          messages={dateMessages}
          isOwn={dateMessages[0].sender_id === user?.id}
        />
      ))}
      {typing && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
})