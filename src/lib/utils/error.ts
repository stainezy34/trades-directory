import type { ErrorInfo } from 'react'

// Error severity levels
export type ErrorSeverity = 'error' | 'warning' | 'info'

// Error context interface
interface ErrorContext {
  severity: ErrorSeverity
  component?: string
  action?: string
  userId?: string
  metadata?: Record<string, unknown>
}

export function logError(
  error: Error,
  errorInfo?: ErrorInfo,
  context: ErrorContext = { severity: 'error' }
) {
  // In development, log to console with context
  if (process.env.NODE_ENV === 'development') {
    console.group('Error Details')
    console.error('Error:', error)
    console.error('Context:', context)
    if (errorInfo) {
      console.error('Component Stack:', errorInfo.componentStack)
    }
    console.groupEnd()
  }

  // In production, you would send this to your error tracking service
  // Example with a hypothetical error tracking service:
  // errorTrackingService.captureError(error, {
  //   severity: context.severity,
  //   component: context.component,
  //   action: context.action,
  //   user: context.userId,
  //   metadata: context.metadata,
  //   componentStack: errorInfo?.componentStack
  // })
}

export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    logError(error, undefined, { severity: 'error', action: 'API_CALL' })
    return error.message
  }
  
  if (typeof error === 'string') {
    logError(new Error(error), undefined, { severity: 'error', action: 'API_CALL' })
    return error
  }
  
  const fallbackMessage = 'An unexpected error occurred'
  logError(
    new Error(fallbackMessage),
    undefined,
    { severity: 'error', action: 'API_CALL', metadata: { originalError: error } }
  )
  return fallbackMessage
}