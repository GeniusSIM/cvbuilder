"use client"

import { AdminHeader } from '@/components/admin/admin-header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAdminStore } from '@/lib/admin-store'
import { useState, useEffect } from 'react'

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAdminStore()
  const [localSettings, setLocalSettings] = useState(settings)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Update local settings when store settings change
  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      updateSettings(localSettings)
      setSaveMessage('Settings saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      setSaveMessage('Error saving settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubscriptionPlanChange = (plan: 'free' | 'pro' | 'premium', field: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      subscriptionPlans: {
        ...prev.subscriptionPlans,
        [plan]: {
          ...prev.subscriptionPlans[plan],
          [field]: value
        }
      }
    }))
  }

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="System Settings" 
        subtitle="Configure platform settings and preferences"
      />

      {saveMessage && (
        <div className={`p-4 rounded-md ${saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={localSettings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-500">
                  Enable to temporarily disable the site
                </p>
              </div>
              <Switch
                checked={localSettings.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Registration Enabled</Label>
                <p className="text-sm text-gray-500">
                  Allow new users to register
                </p>
              </div>
              <Switch
                checked={localSettings.registrationEnabled}
                onCheckedChange={(checked) => handleInputChange('registrationEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Send system notifications via email
                </p>
              </div>
              <Switch
                checked={localSettings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* File Upload Settings */}
        <Card>
          <CardHeader>
            <CardTitle>File Upload Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={localSettings.maxFileSize}
                onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value) || 2)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="allowedTypes">Allowed File Types</Label>
              <Input
                id="allowedTypes"
                value={localSettings.allowedFileTypes.join(', ')}
                onChange={(e) => handleInputChange('allowedFileTypes', e.target.value.split(', ').filter(Boolean))}
                placeholder="pdf, docx, doc"
              />
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Plan */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Free Plan</h3>
                <div className="space-y-2">
                  <Label>Resume Limit</Label>
                  <Input
                    type="number"
                    value={localSettings.subscriptionPlans.free.resumeLimit}
                    onChange={(e) => handleSubscriptionPlanChange('free', 'resumeLimit', parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Template Access</Label>
                  <Input
                    value={localSettings.subscriptionPlans.free.templateAccess.join(', ')}
                    onChange={(e) => handleSubscriptionPlanChange('free', 'templateAccess', e.target.value.split(', ').filter(Boolean))}
                    placeholder="professional"
                  />
                </div>
              </div>

              {/* Pro Plan */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Pro Plan</h3>
                <div className="space-y-2">
                  <Label>Resume Limit</Label>
                  <Input
                    type="number"
                    value={localSettings.subscriptionPlans.pro.resumeLimit}
                    onChange={(e) => handleSubscriptionPlanChange('pro', 'resumeLimit', parseInt(e.target.value) || 5)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Template Access</Label>
                  <Input
                    value={localSettings.subscriptionPlans.pro.templateAccess.join(', ')}
                    onChange={(e) => handleSubscriptionPlanChange('pro', 'templateAccess', e.target.value.split(', ').filter(Boolean))}
                    placeholder="professional, modern, creative"
                  />
                </div>
              </div>

              {/* Premium Plan */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Premium Plan</h3>
                <div className="space-y-2">
                  <Label>Resume Limit</Label>
                  <Input
                    type="number"
                    value={localSettings.subscriptionPlans.premium.resumeLimit}
                    onChange={(e) => handleSubscriptionPlanChange('premium', 'resumeLimit', parseInt(e.target.value) || -1)}
                    placeholder="-1 for unlimited"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Template Access</Label>
                  <Input
                    value={localSettings.subscriptionPlans.premium.templateAccess.join(', ')}
                    onChange={(e) => handleSubscriptionPlanChange('premium', 'templateAccess', e.target.value.split(', ').filter(Boolean))}
                    placeholder="all"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-teal-500 hover:bg-teal-600"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
