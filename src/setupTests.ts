import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { mockSupabase } from './lib/mocks/supabase'

// Mock Supabase client
vi.mock('./lib/supabase/client', () => ({
  supabase: mockSupabase
}))

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver