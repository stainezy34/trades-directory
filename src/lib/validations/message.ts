import { z } from 'zod'

export const messageSchema = z.object({
  content: z.string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message is too long'),
  recipientId: z.string().uuid('Invalid recipient ID')
})

export type MessageInput = z.infer<typeof messageSchema>