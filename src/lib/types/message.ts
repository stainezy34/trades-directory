export type MessageStatus = 'sent' | 'delivered' | 'read'

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  content: string
  status: MessageStatus
  read: boolean
  created_at: string
  sender?: {
    full_name: string
    avatar_url: string | null
  }
}