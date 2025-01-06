import { z } from 'zod'

// Common validation patterns
const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+?[\d\s-]{10,}$/,
  url: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
}

// Common validation schemas
export const commonSchemas = {
  email: z.string().email().regex(patterns.email),
  phone: z.string().regex(patterns.phone, 'Invalid phone number'),
  url: z.string().regex(patterns.url, 'Invalid URL'),
  password: z.string().regex(
    patterns.password,
    'Password must contain at least 8 characters, one uppercase, one lowercase and one number'
  )
}

// Validation helper functions
export function validateEmail(email: string): boolean {
  return patterns.email.test(email)
}

export function validatePhone(phone: string): boolean {
  return patterns.phone.test(phone)
}

export function validateUrl(url: string): boolean {
  return patterns.url.test(url)
}

export function validatePassword(password: string): boolean {
  return patterns.password.test(password)
}