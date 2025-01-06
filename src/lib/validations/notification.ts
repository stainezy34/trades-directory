import { z } from 'zod'

export const notificationSchema = z.object({
  type: z.enum([
    'bid_received',
    'bid_accepted',
    'bid_rejected',
    'message_received',
    'project_update',
    'review_received'
  ], {
    errorMap: () => ({ message: 'Invalid notification type' })
  }),
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title is too long'),
  message: z.string()
    .min(1, 'Message is required')
    .max(500, 'Message is too long'),
  link: z.string().url().optional(),
  userId: z.string().uuid('Invalid user ID')
})

export type NotificationInput = z.infer<typeof notificationSchema>