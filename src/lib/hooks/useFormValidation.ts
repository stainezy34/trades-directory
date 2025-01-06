import { useState, useCallback } from 'react'
import { z } from 'zod'
import { validateRequest } from '../middleware/validation'

export function useFormValidation<T>(schema: z.ZodSchema<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = useCallback((data: unknown) => {
    const result = validateRequest(schema, data)
    
    if (!result.success) {
      const errorMap = result.errors.reduce((acc, err) => ({
        ...acc,
        [err.path]: err.message
      }), {})
      
      setErrors(errorMap)
      return null
    }

    setErrors({})
    return result.data
  }, [schema])

  const validateField = useCallback((field: keyof T, value: unknown) => {
    const fieldSchema = schema.shape[field as string]
    if (!fieldSchema) return true

    const result = fieldSchema.safeParse(value)
    
    setErrors(prev => ({
      ...prev,
      [field]: result.success ? '' : result.error.errors[0].message
    }))

    return result.success
  }, [schema])

  return {
    errors,
    validateForm,
    validateField,
    hasErrors: Object.keys(errors).length > 0
  }
}