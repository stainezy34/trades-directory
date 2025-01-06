import { rateLimit } from 'express-rate-limit'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

// Create DOMPurify instance
const window = new JSDOM('').window
const purify = DOMPurify(window)

// Sanitize HTML content
export function sanitizeHtml(dirty: string): string {
  return purify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  })
}

// Validate and sanitize user input
export function sanitizeUserInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

// Validate file uploads
export function validateFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  const maxSize = 5 * 1024 * 1024 // 5MB

  return (
    allowedTypes.includes(file.type) &&
    file.size <= maxSize
  )
}

// Prevent XSS in URLs
export function sanitizeUrl(url: string): string {
  const pattern = /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  return pattern.test(url) ? url : ''
}