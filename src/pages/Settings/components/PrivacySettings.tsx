import { memo } from 'react'
import { Switch } from '../../../components/shared/Switch'
import { usePrivacySettings } from '../../../lib/hooks/usePrivacySettings'
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner'

export const PrivacySettings = memo(function PrivacySettings() {
  const { settings, loading, error, updateSettings } = usePrivacySettings()

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Profile Visibility</h3>
          <div className="space-y-4">
            <Switch
              label="Show profile in search results"
              checked={settings.showInSearch}
              onChange={(checked) => updateSettings({ showInSearch: checked })}
            />
            <Switch
              label="Show contact information"
              checked={settings.showContact}
              onChange={(checked) => updateSettings({ showContact: checked })}
            />
            <Switch
              label="Show portfolio"
              checked={settings.showPortfolio}
              onChange={(checked) => updateSettings({ showPortfolio: checked })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Communication</h3>
          <div className="space-y-4">
            <Switch
              label="Allow direct messages"
              checked={settings.allowMessages}
              onChange={(checked) => updateSettings({ allowMessages: checked })}
            />
            <Switch
              label="Show online status"
              checked={settings.showOnlineStatus}
              onChange={(checked) => updateSettings({ showOnlineStatus: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  )
})