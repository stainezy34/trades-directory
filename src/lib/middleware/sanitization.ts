import { sanitizeHtml, sanitizeUserInput, sanitizeUrl } from '../utils/security'

// Types for request data
type RequestData = {
  [key: string]: any
}

// Sanitization options
type SanitizeOptions = {
  allowHtml?: boolean
  allowUrls?: boolean
  maxLength?: number
}

/**
 * Sanitizes request data recursively
 */
export function sanitizeData(
  data: RequestData,
  options: SanitizeOptions = {}
): RequestData {
  if (typeof data !== 'object' || data === null) {
    return sanitizeValue(data, options)
  }

  const sanitized: RequestData = {}

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      sanitized[key] = value.map(item => sanitizeData(item, options))
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeData(value, options)
    } else {
      sanitized[key] = sanitizeValue(value, options)
    }
  }

  return sanitized
}

/**
 * Sanitizes a single value based on its type and options
 */
function sanitizeValue(value: any, options: SanitizeOptions): any {
  if (typeof value !== 'string') {
    return value
  }

  let sanitized = value

  // Apply length restriction
  if (options.maxLength && sanitized.length > options.maxLength) {
    sanitized = sanitized.slice(0, options.maxLength)
  }

  // Handle HTML content
  if (options.allowHtml) {
    sanitized = sanitizeHtml(sanitized)
  } else {
    sanitized = sanitizeUserInput(sanitized)
  }

  // Handle URLs
  if (options.allowUrls && (sanitized.startsWith('http://') || sanitized.startsWith('https://'))) {
    sanitized = sanitizeUrl(sanitized)
  }

  return sanitized
}

/**
 * Creates middleware for request sanitization
 */
export function createSanitizeMiddleware(options: SanitizeOptions = {}) {
  return (req: any, _res: any, next: () => void) => {
    // Sanitize query parameters
    if (req.query) {
      req.query = sanitizeData(req.query, options)
    }

    // Sanitize body data
    if (req.body) {
      req.body = sanitizeData(req.body, options)
    }

    // Sanitize URL parameters
    if (req.params) {
      req.params = sanitizeData(req.params, options)
    }

    next()
  }
}