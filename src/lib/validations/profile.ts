import { z } from 'zod'
import { TRADE_TYPES } from '../utils/filters'

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  business_name: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  avatar_url: z.string().url().optional(),
  trade_type: z.array(z.enum(TRADE_TYPES)).min(1, 'Select at least one trade'),
  hourly_rate: z.number().min(0, 'Hourly rate must be positive').optional(),
  location: z.string().min(2, 'Location is required'),
  available: z.boolean(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  social_links: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    facebook: z.string().url().optional()
  }).optional()
})