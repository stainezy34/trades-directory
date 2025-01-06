import { z } from 'zod'
import { sanitizeData } from './sanitization'

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown) {
  // First sanitize the input data
  const sanitizedData = sanitizeData(data)

  // Then validate against the schema
  const result = schema.safeParse(sanitizedData)

  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      path: err.path.join('.'),
      message: err.message
    }))
    
    return {
      success: false as const,
      errors
    }
  }

  return {
    success: true as const,
    data: result.data
  }
}

export function createValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return (req: any, res: any, next: () => void) => {
    // Validate query parameters
    if (req.query) {
      const result = validateRequest(schema, req.query)
      if (!result.success) {
        return res.status(400).json({ 
          error: 'Validation failed',
          details: result.errors
        })
      }
      req.query = result.data
    }

    // Validate body data
    if (req.body) {
      const result = validateRequest(schema, req.body)
      if (!result.success) {
        return res.status(400).json({ 
          error: 'Validation failed',
          details: result.errors
        })
      }
      req.body = result.data
    }

    next()
  }
}