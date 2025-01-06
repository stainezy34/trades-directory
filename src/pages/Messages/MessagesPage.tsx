import { useParams } from 'react-router-dom'
import { useMessages } from '../../lib/hooks/useMessages'
import { MessageList } from './components/MessageList'
import { MessageInput } from './components/MessageInput'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'

export function MessagesPage() {
  const { id } = useParams<{ id?: string }>()
  const { messages, loading, sendMessage } = useMessages(id || '')

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          Select a conversation to start messaging
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <MessageList messages={messages} />
            <MessageInput onSend={sendMessage} />
          </>
        )}
      </div>
    </div>
  )
}