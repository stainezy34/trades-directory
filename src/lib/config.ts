// Environment variables
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  app: {
    name: 'TradesPro',
    description: 'Connect with Skilled Tradespeople',
    url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  },
  features: {
    emailVerification: false,
    socialAuth: false,
    fileUploads: true,
  },
  limits: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
    maxBidsPerProject: 20,
  }
} as const

// Type validation
const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'] as const
requiredEnvVars.forEach(envVar => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
})

export type Config = typeof config