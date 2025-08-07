"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useResumeStore } from '@/lib/resume-store'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AIAssistant } from '@/components/ai-assistant/ai-assistant'
import { Sparkles } from 'lucide-react'

export function PersonalInfoForm() {
  const { currentResume, updatePersonalInfo } = useResumeStore()
  const { personalInfo } = currentResume
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              placeholder="New York, NY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={personalInfo.website || ''}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              placeholder="https://johndoe.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin || ''}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary">Professional Summary</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAIAssistant(true)}
              className="flex items-center gap-2 text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              <Sparkles className="h-3 w-3" />
              AI Assistant
            </Button>
          </div>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
            placeholder="Write a brief summary of your professional background and career objectives..."
            rows={4}
          />
        </div>
      </CardContent>
      <AIAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        section="summary"
      />
    </Card>
  )
}
