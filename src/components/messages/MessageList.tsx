import { format } from 'date-fns'
import type { Database } from '../../lib/supabase/types'
import { useAuth } from '../../lib/hooks/useAuth'

type Message = Database['public']['Tables']['messages']['Row']

type Props = {
  messages: Message[]
}

export function MessageList({ messages }: Props) {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map((message) => {
        const isOwn = message.sender_id === user?.id
        
        return (
          <div
            key={message.id}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                isOwn 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}
            >
              <p className="break-words">{message.content}</p>
              <time className={`text-xs mt-1 block ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                {format(new Date(message.created_at), 'h:mm a')}
              </time>
            </div>
          </div>
        )
      })}
    </div>
  )
}