import { useState } from 'react'
import { supabase } from '../api/client'
import { sanitizeRequest, sanitizeResponse } from '../api/interceptors'
import { handleApiError } from '../utils/error'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = async <T>(
    method: string,
    endpoint: string,
    data?: any,
    options?: any
  ): Promise<T | null> => {
    setLoading(true)
    setError(null)

    try {
      // Sanitize request
      const sanitizedConfig = sanitizeRequest({ data, ...options })
      
      // Make request
      const response = await supabase
        .from(endpoint)[method](sanitizedConfig.data, sanitizedConfig.options)

      // Sanitize response
      const sanitizedResponse = sanitizeResponse(response)

      if (response.error) throw response.error
      return sanitizedResponse.data
    } catch (err) {
      const message = handleApiError(err)
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    request
  }
}