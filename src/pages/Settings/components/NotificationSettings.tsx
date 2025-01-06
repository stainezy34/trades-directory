import { memo, useState } from 'react'
import { Switch } from '../../../components/shared/Switch'
import { useNotificationSettings } from '../../../lib/hooks/useNotificationSettings'
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner'

export const NotificationSettings = memo(function NotificationSettings() {
  const { settings, loading, error, updateSettings } = useNotificationSettings()

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Email Notifications</h3>
          <div className="space-y-4">
            <Switch
              label="New project matches"
              checked={settings.emailNewProjects}
              onChange={(checked) => updateSettings({ emailNewProjects: checked })}
            />
            <Switch
              label="Bid updates"
              checked={settings.emailBidUpdates}
              onChange={(checked) => updateSettings({ emailBidUpdates: checked })}
            />
            <Switch
              label="Messages"
              checked={settings.emailMessages}
              onChange={(checked) => updateSettings({ emailMessages: checked })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Push Notifications</h3>
          <div className="space-y-4">
            <Switch
              label="New project matches"
              checked={settings.pushNewProjects}
              onChange={(checked) => updateSettings({ pushNewProjects: checked })}
            />
            <Switch
              label="Bid updates"
              checked={settings.pushBidUpdates}
              onChange={(checked) => updateSettings({ pushBidUpdates: checked })}
            />
            <Switch
              label="Messages"
              checked={settings.pushMessages}
              onChange={(checked) => updateSettings({ pushMessages: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  )
})