import { memo } from 'react'
import { format } from 'date-fns'
import { Check, CheckCheck } from 'lucide-react'
import type { Message } from '../../../lib/types/message'

type Props = {
  message: Message
  isOwn: boolean
}

export const MessageBubble = memo(function MessageBubble({ message, isOwn }: Props) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isOwn 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="break-words">{message.content}</p>
        <div className={`flex items-center gap-1 text-xs mt-1 
          ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}
        >
          <time>{format(new Date(message.created_at), 'h:mm a')}</time>
          {isOwn && (
            <span>
              {message.status === 'read' ? (
                <CheckCheck className="w-4 h-4" />
              ) : message.status === 'delivered' ? (
                <Check className="w-4 h-4" />
              ) : null}
            </span>
          )}
        </div>
      </div>
    </div>
  )
})