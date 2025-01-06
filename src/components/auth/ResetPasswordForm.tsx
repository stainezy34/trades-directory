import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Loader } from 'lucide-react'
import { supabase } from '../../lib/supabase/client'

const resetSchema = z.object({
  email: z.string().email('Invalid email address')
})

type ResetData = z.infer<typeof resetSchema>

export function ResetPasswordForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetData>({
    resolver: zodResolver(resetSchema)
  })

  const onSubmit = async (data: ResetData) => {
    try {
      setError(null)
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.email,
        { redirectTo: `${window.location.origin}/reset-password` }
      )
      
      if (resetError) throw resetError
      setStatus('success')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send reset email')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-3 bg-green-50 text-green-700 rounded-lg">
        Check your email for the password reset link.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            {...register('email')}
            className="pl-10 w-full rounded-lg border-gray-300"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <Loader className="w-5 h-5 mx-auto animate-spin" />
        ) : (
          'Send Reset Link'
        )}
      </button>
    </form>
  )
}