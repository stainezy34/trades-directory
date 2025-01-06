import { z } from 'zod'

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  projectDate: z.string().nonempty('Project date is required'),
  projectDescription: z.string()
    .min(10, 'Project description must be at least 10 characters')
    .max(500, 'Project description must be less than 500 characters'),
  comment: z.string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review must be less than 1000 characters'),
  images: z.array(z.string().url()).optional()
})