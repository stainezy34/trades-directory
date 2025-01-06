import { useState } from 'react'
import { SettingsLayout } from './components/SettingsLayout'
import { ProfileSettings } from './components/ProfileSettings'
import { NotificationSettings } from './components/NotificationSettings'
import { PrivacySettings } from './components/PrivacySettings'
import { AccountSettings } from './components/AccountSettings'
import { useAuth } from '../../lib/hooks/useAuth'
import { LoadingSpinner } from '../../components/shared/LoadingSpinner'

export function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  if (!user) return <LoadingSpinner />

  return (
    <SettingsLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'profile' && <ProfileSettings />}
      {activeTab === 'notifications' && <NotificationSettings />}
      {activeTab === 'privacy' && <PrivacySettings />}
      {activeTab === 'account' && <AccountSettings />}
    </SettingsLayout>
  )
}