import { z } from 'zod'
import { TRADE_TYPES } from '../utils/filters'

export const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  tradeType: z.enum(TRADE_TYPES),
  location: z.string().min(3, 'Location is required'),
  budget: z.number().positive('Budget must be greater than 0'),
  deadline: z.string().refine(date => new Date(date) > new Date(), {
    message: 'Deadline must be in the future'
  }),
  estimatedDuration: z.string().min(1, 'Estimated duration is required')
})

export const bidSchema = z.object({
  amount: z.number()
    .positive('Bid amount must be greater than 0'),
  estimatedDuration: z.string()
    .min(1, 'Estimated duration is required'),
  proposal: z.string()
    .min(50, 'Proposal must be at least 50 characters')
    .max(1000, 'Proposal must be less than 1000 characters')
})