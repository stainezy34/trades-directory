import { describe, it, expect } from 'vitest'
import { cn, formatCurrency, formatDate, truncateText } from '../utils'

describe('Utility Functions', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('base', 'extra')).toBe('base extra')
      expect(cn('base', { conditional: true })).toBe('base conditional')
      expect(cn('base', { conditional: false })).toBe('base')
    })
  })

  describe('formatCurrency', () => {
    it('formats currency values correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00')
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
      expect(formatCurrency(0)).toBe('$0.00')
    })
  })

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2024-01-15')
      expect(formatDate(date)).toBe('January 15, 2024')
      expect(formatDate('2024-01-15')).toBe('January 15, 2024')
    })
  })

  describe('truncateText', () => {
    it('truncates text correctly', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...')
      expect(truncateText('Short', 10)).toBe('Short')
    })
  })
})