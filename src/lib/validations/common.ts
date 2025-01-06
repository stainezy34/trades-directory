import { z } from 'zod'

// Common validation patterns
export const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+?[\d\s-]{10,}$/,
  url: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
  safeString: /^[^<>{}]*$/, // Prevents basic HTML/script injection
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
}

// Base schemas for common fields
export const baseSchemas = {
  id: z.string().uuid(),
  email: z.string().email().regex(patterns.email),
  phone: z.string().regex(patterns.phone, 'Invalid phone number format'),
  url: z.string().url().regex(patterns.url, 'Invalid URL format'),
  safeString: z.string().regex(patterns.safeString, 'Contains invalid characters'),
  nonEmptyString: z.string().min(1, 'Field cannot be empty').regex(patterns.safeString),
  positiveNumber: z.number().positive('Must be greater than 0'),
  futureDate: z.string().refine(date => new Date(date) > new Date(), {
    message: 'Date must be in the future'
  }),
  slug: z.string().regex(patterns.slug, 'Invalid format')
}