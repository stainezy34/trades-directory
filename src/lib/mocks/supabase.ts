import { vi } from 'vitest'

export const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } }
    }))
  },
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: vi.fn(),
        order: vi.fn()
      })),
      order: vi.fn(),
      range: vi.fn()
    })),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }))
}