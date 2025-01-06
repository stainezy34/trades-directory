import { createClient } from '@supabase/supabase-js'
import { sanitizeData } from '../middleware/sanitization'
import { config } from '../config'
import type { Database } from '../supabase/types'

// Create base Supabase client
const baseClient = createClient<Database>(
  config.supabase.url,
  config.supabase.anonKey
)

// Create wrapped client with sanitization
export const supabase = {
  ...baseClient,
  from: (table: string) => {
    const query = baseClient.from(table)
    
    // Wrap insert and update methods to sanitize data
    return {
      ...query,
      insert: (data: any, options?: any) => {
        const sanitizedData = sanitizeData(data, {
          allowHtml: false,
          maxLength: 1000
        })
        return query.insert(sanitizedData, options)
      },
      update: (data: any, options?: any) => {
        const sanitizedData = sanitizeData(data, {
          allowHtml: false,
          maxLength: 1000
        })
        return query.update(sanitizedData, options)
      }
    }
  }
}