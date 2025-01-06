import { memo } from 'react'
import { format } from 'date-fns'
import { MessageBubble } from './MessageBubble'
import type { Message } from '../../../lib/types/message'

type Props = {
  date: string
  messages: Message[]
  isOwn: boolean
}

export const MessageGroup = memo(function MessageGroup({ date, messages, isOwn }: Props) {
  return (
    <div className="mb-6">
      <div className="text-center mb-4">
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
          {format(new Date(date), 'MMMM d, yyyy')}
        </span>
      </div>
      <div className="space-y-2">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={isOwn}
          />
        ))}
      </div>
    </div>
  )
})