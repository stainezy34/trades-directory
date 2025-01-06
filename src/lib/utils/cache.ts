type CacheOptions = {
  maxAge?: number // Time in milliseconds
  maxSize?: number // Maximum number of items
}

export class Cache<T> {
  private cache: Map<string, { data: T; timestamp: number }>
  private maxAge: number
  private maxSize: number

  constructor(options: CacheOptions = {}) {
    this.cache = new Map()
    this.maxAge = options.maxAge || 5 * 60 * 1000 // 5 minutes default
    this.maxSize = options.maxSize || 100
  }

  set(key: string, data: T): void {
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  get(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) return null
    
    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear(): void {
    this.cache.clear()
  }
}

// Create cache instances
export const projectsCache = new Cache<any>()
export const profilesCache = new Cache<any>()