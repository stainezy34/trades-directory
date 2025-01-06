import DOMPurify from 'dompurify'
import { patterns } from './common'

export function sanitizeInput(input: string, options: {
  allowHtml?: boolean
  maxLength?: number
} = {}): string {
  if (typeof input !== 'string') return ''

  let sanitized = input.trim()

  // Apply length restriction
  if (options.maxLength) {
    sanitized = sanitized.slice(0, options.maxLength)
  }

  // Remove potentially dangerous characters if HTML is not allowed
  if (!options.allowHtml) {
    sanitized = sanitized.replace(/[<>{}]/g, '')
  } else {
    // If HTML is allowed, use DOMPurify with strict config
    sanitized = DOMPurify.sanitize(sanitized, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href']
    })
  }

  return sanitized
}

export function validateAndSanitize<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: 'Validation failed' }
  }
}