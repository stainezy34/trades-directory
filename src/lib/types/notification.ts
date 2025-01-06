export type NotificationType = 
  | 'bid_received'
  | 'bid_accepted'
  | 'bid_rejected'
  | 'message_received'
  | 'project_update'
  | 'review_received'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  link?: string
  read: boolean
  created_at: string
}