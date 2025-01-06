import { describe, it, expect } from 'vitest'
import { sanitizeData } from '../sanitization'

describe('Sanitization Middleware', () => {
  describe('sanitizeData', () => {
    it('sanitizes simple string values', () => {
      const input = { name: '<script>alert("xss")</script>John' }
      const output = sanitizeData(input)
      expect(output.name).toBe('alert("xss")John')
    })

    it('allows specified HTML tags when allowHtml is true', () => {
      const input = { content: '<b>Hello</b><script>alert("xss")</script>' }
      const output = sanitizeData(input, { allowHtml: true })
      expect(output.content).toBe('<b>Hello</b>')
    })

    it('sanitizes nested objects', () => {
      const input = {
        user: {
          name: '<script>alert("xss")</script>John',
          profile: {
            bio: '<img src="x" onerror="alert(1)">Bio'
          }
        }
      }
      const output = sanitizeData(input)
      expect(output.user.name).toBe('alert("xss")John')
      expect(output.user.profile.bio).toBe('Bio')
    })

    it('sanitizes arrays', () => {
      const input = {
        tags: ['<script>bad</script>', 'good', '<img src="x" onerror="alert(1)">']
      }
      const output = sanitizeData(input)
      expect(output.tags).toEqual(['bad', 'good', ''])
    })

    it('handles non-string values', () => {
      const input = {
        number: 123,
        boolean: true,
        null: null,
        undefined: undefined
      }
      const output = sanitizeData(input)
      expect(output).toEqual(input)
    })

    it('respects maxLength option', () => {
      const input = { text: 'This is a long text that should be truncated' }
      const output = sanitizeData(input, { maxLength: 10 })
      expect(output.text.length).toBe(10)
    })

    it('sanitizes URLs', () => {
      const input = {
        url: 'javascript:alert(1)',
        safeUrl: 'https://example.com'
      }
      const output = sanitizeData(input, { allowUrls: true })
      expect(output.url).toBe('')
      expect(output.safeUrl).toBe('https://example.com')
    })
  })
})