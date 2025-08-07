"use client"

import { Button } from "@/components/ui/button"
import { useResumeStore } from '@/lib/resume-store'
import { Eye, EyeOff, User, Briefcase, GraduationCap, Award, Download, Share2, Settings, Crown, Sparkles, FileCheck } from 'lucide-react'

interface BuilderSidebarProps {
  onPreviewToggle: () => void
  showPreview: boolean
}

export function BuilderSidebar({ onPreviewToggle, showPreview }: BuilderSidebarProps) {
  const { isAuthenticated } = useResumeStore()

  const handlePremiumFeature = (featureName: string) => {
    if (!isAuthenticated) {
      // Show auth modal
      const event = new CustomEvent('showAuthModal', { detail: { mode: 'signup' } })
      window.dispatchEvent(event)
    } else {
      // Show premium upgrade modal
      alert(`${featureName} is a premium feature. Upgrade to Pro to unlock!`)
    }
  }

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
      {/* Preview Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onPreviewToggle}
        className="w-10 h-10 p-0"
        title={showPreview ? "Hide Preview" : "Show Preview"}
      >
        {showPreview ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </Button>

      {/* Section Navigation */}
      <div className="flex flex-col space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0"
          title="Personal Info"
          onClick={() => {
            const element = document.querySelector('[value="personal"]')
            if (element) (element as HTMLElement).click()
          }}
        >
          <User className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0"
          title="Experience"
          onClick={() => {
            const element = document.querySelector('[value="experience"]')
            if (element) (element as HTMLElement).click()
          }}
        >
          <Briefcase className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0"
          title="Education"
          onClick={() => {
            const element = document.querySelector('[value="education"]')
            if (element) (element as HTMLElement).click()
          }}
        >
          <GraduationCap className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0"
          title="Skills"
          onClick={() => {
            const element = document.querySelector('[value="skills"]')
            if (element) (element as HTMLElement).click()
          }}
        >
          <Award className="h-5 w-5" />
        </Button>
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-gray-200"></div>

      {/* Premium Features */}
      <div className="flex flex-col space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0 relative"
          title="ATS Checker (Premium)"
          onClick={() => handlePremiumFeature('ATS Checker')}
        >
          <FileCheck className="h-5 w-5" />
          <Crown className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0 relative"
          title="AI Assistant (Premium)"
          onClick={() => handlePremiumFeature('AI Assistant')}
        >
          <Sparkles className="h-5 w-5" />
          <Crown className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500" />
        </Button>
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-gray-200"></div>

      {/* Actions */}
      <div className="flex flex-col space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0"
          title="Download Resume"
          onClick={() => {
            if (!isAuthenticated) {
              handlePremiumFeature('Download')
            } else {
              window.print()
            }
          }}
        >
          <Download className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0"
          title="Share Resume"
          onClick={() => handlePremiumFeature('Share')}
        >
          <Share2 className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0"
          title="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
