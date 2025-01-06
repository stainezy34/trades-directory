import { z } from 'zod'
import { commonSchemas } from './common'

export const bidSchema = z.object({
  amount: commonSchemas.positiveNumber
    .min(1, 'Bid amount must be at least $1'),
  estimatedDuration: z.string()
    .min(3, 'Please provide a valid duration estimate')
    .max(100, 'Duration estimate is too long'),
  proposal: z.string()
    .min(50, 'Proposal must be at least 50 characters')
    .max(2000, 'Proposal must be less than 2000 characters'),
  projectId: z.string().uuid('Invalid project ID'),
  tradespersonId: z.string().uuid('Invalid tradesperson ID')
})

export type BidInput = z.infer<typeof bidSchema>