import { sanitizeData } from '../middleware/sanitization'

// Request interceptor
export function sanitizeRequest(config: any) {
  if (config.data) {
    config.data = sanitizeData(config.data, {
      allowHtml: false,
      maxLength: 1000
    })
  }
  
  if (config.params) {
    config.params = sanitizeData(config.params, {
      allowHtml: false,
      maxLength: 100
    })
  }
  
  return config
}

// Response interceptor
export function sanitizeResponse(response: any) {
  if (response.data) {
    response.data = sanitizeData(response.data, {
      allowHtml: true, // Allow safe HTML in responses
      maxLength: 10000
    })
  }
  
  return response
}