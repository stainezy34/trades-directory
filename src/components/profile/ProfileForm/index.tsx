import { useState } from 'react'
import { BasicInfoForm } from './BasicInfoForm'
import { TradeInfoForm } from './TradeInfoForm'
import { ContactInfoForm } from './ContactInfoForm'
import { useProfile } from '../../../lib/hooks/useProfile'
import { LoadingSpinner } from '../../shared/LoadingSpinner'
import { supabase } from '../../../lib/supabase/client'
import type { Profile } from '../../../lib/types/profile'

type Props = {
  profileId: string
  onSuccess: () => void
  onCancel: () => void
}

export function ProfileForm({ profileId, onSuccess, onCancel }: Props) {
  const { profile, loading, error } = useProfile(profileId)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (data: Partial<Profile>) => {
    setSubmitting(true)
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', profileId)

      if (updateError) throw updateError
      onSuccess()
    } catch (e) {
      console.error('Error updating profile:', e)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>
  if (!profile) return <div>Profile not found</div>

  return (
    <div className="space-y-8">
      {step === 1 && (
        <BasicInfoForm
          initialData={profile}
          onSubmit={(data) => {
            handleSubmit(data)
            setStep(2)
          }}
          onCancel={onCancel}
          submitting={submitting}
        />
      )}

      {step === 2 && (
        <TradeInfoForm
          initialData={profile}
          onSubmit={(data) => {
            handleSubmit(data)
            setStep(3)
          }}
          onBack={() => setStep(1)}
          submitting={submitting}
        />
      )}

      {step === 3 && (
        <ContactInfoForm
          initialData={profile}
          onSubmit={async (data) => {
            await handleSubmit(data)
            onSuccess()
          }}
          onBack={() => setStep(2)}
          submitting={submitting}
        />
      )}

      <div className="flex justify-between items-center">
        <div className="space-x-1">
          <span className={`h-2 w-2 rounded-full inline-block ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <span className={`h-2 w-2 rounded-full inline-block ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <span className={`h-2 w-2 rounded-full inline-block ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`} />
        </div>
        <p className="text-sm text-gray-500">Step {step} of 3</p>
      </div>
    </div>
  )
}