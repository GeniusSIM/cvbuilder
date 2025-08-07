"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from '@/components/resume-builder/personal-info-form'
import { ExperienceForm } from '@/components/resume-builder/experience-form'
import { EducationForm } from '@/components/resume-builder/education-form'
import { SkillsForm } from '@/components/resume-builder/skills-form'
import { BuilderSidebar } from '@/components/resume-builder/builder-sidebar'
import { templates } from '@/lib/templates'
import { useResumeStore } from '@/lib/resume-store'
import { Save, Upload, Undo, Redo } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { EnhancedAuthModal } from '@/components/auth/enhanced-auth-modal'

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('personal')
  const [showPreview, setShowPreview] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  
  const { 
    currentResume, 
    selectedTemplate, 
    setSelectedTemplate, 
    saveResume, 
    isAuthenticated, 
    onboardingCompleted,
    onboardingData,
    updatePersonalInfo
  } = useResumeStore()
  const router = useRouter()
  
  useEffect(() => {
    // Check if user needs to go through onboarding
    const urlParams = new URLSearchParams(window.location.search)
    const preloaded = urlParams.get('preloaded')
    
    // If user is not authenticated and hasn't completed onboarding, redirect to onboarding
    if (!isAuthenticated && !onboardingCompleted && !preloaded) {
      router.push('/onboarding')
      return
    }
    
    // If user completed onboarding but URL doesn't have preloaded flag, add it
    if (onboardingCompleted && !preloaded) {
      router.replace('/builder?preloaded=true')
    }
  }, [isAuthenticated, onboardingCompleted, router])

  // Apply onboarding data when component mounts
  useEffect(() => {
    if (onboardingData && onboardingCompleted) {
      // Apply job title to summary if not already set
      if (onboardingData.jobTitle && !currentResume.personalInfo.summary) {
        const experienceText = onboardingData.experience === 'entry' ? '0-2' : 
                              onboardingData.experience === 'mid' ? '3-7' : 
                              onboardingData.experience === 'senior' ? '8+' : '10+'
        
        updatePersonalInfo({
          summary: `Experienced ${onboardingData.jobTitle} with ${experienceText} years of experience in the industry. Passionate about delivering high-quality results and contributing to team success.`
        })
      }

      // Set LinkedIn URL if provided
      if (onboardingData.linkedinUrl && !currentResume.personalInfo.linkedin) {
        updatePersonalInfo({
          linkedin: onboardingData.linkedinUrl
        })
      }
    }
  }, [onboardingData, onboardingCompleted, currentResume.personalInfo, updatePersonalInfo])
  
  const currentTemplateData = templates.find(t => t.id === selectedTemplate) || templates[0]
  const SelectedTemplate = currentTemplateData.component

  const handleSave = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    saveResume()
    // Show success notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
    notification.textContent = 'Resume saved successfully!'
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <BuilderSidebar 
        onPreviewToggle={() => setShowPreview(!showPreview)}
        showPreview={showPreview}
      />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Form Section */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                  <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Enhancv</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = '.pdf,.doc,.docx'
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                          // Show upload notification
                          const notification = document.createElement('div')
                          notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
                          notification.textContent = `Uploading ${file.name}...`
                          document.body.appendChild(notification)
                          setTimeout(() => notification.remove(), 3000)
                        }
                      }
                      input.click()
                    }}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Resume
                  </Button>
                  <span>•</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => router.push('/templates')}
                  >
                    Resume Examples
                  </Button>
                  <span>•</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Redo className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500"
                  onClick={() => {
                    // Show help modal or redirect to help page
                    alert('Help documentation coming soon!')
                  }}
                >
                  Help
                </Button>
                {!isAuthenticated ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAuthModal(true)}
                    >
                      Login
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-teal-500 hover:bg-teal-600"
                      onClick={() => setShowAuthModal(true)}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleSave} size="sm" className="bg-teal-500 hover:bg-teal-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Onboarding Summary */}
              {onboardingData && onboardingCompleted && (
                <Card className="bg-teal-50 border-teal-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <h3 className="font-semibold text-teal-800">Onboarding Complete</h3>
                    </div>
                    <div className="text-sm text-teal-700 space-y-1">
                      {onboardingData.jobTitle && <p>Target Role: {onboardingData.jobTitle}</p>}
                      {onboardingData.experience && <p>Experience Level: {onboardingData.experience}</p>}
                      <p>Template: {currentTemplateData.name}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Template Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <Button
                        key={template.id}
                        variant={selectedTemplate === template.id ? 'default' : 'outline'}
                        onClick={() => setSelectedTemplate(template.id)}
                        className="h-20 flex flex-col"
                      >
                        <span className="font-medium">{template.name}</span>
                        <span className="text-xs opacity-70">{template.category}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Form Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="mt-6">
                  <PersonalInfoForm />
                </TabsContent>
                
                <TabsContent value="experience" className="mt-6">
                  <ExperienceForm />
                </TabsContent>
                
                <TabsContent value="education" className="mt-6">
                  <EducationForm />
                </TabsContent>
                
                <TabsContent value="skills" className="mt-6">
                  <SkillsForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="w-1/2 border-l border-gray-200 bg-white">
            <div className="sticky top-0 h-screen flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Preview</h3>
                    <p className="text-sm text-gray-500">{currentTemplateData.name} Template</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      // Create full page preview modal
                      const modal = document.createElement('div')
                      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
                      modal.innerHTML = `
                        <div class="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-auto relative">
                          <button class="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10" onclick="this.closest('.fixed').remove()">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                          <div class="p-8">
                            ${document.getElementById('resume-preview')?.innerHTML || ''}
                          </div>
                        </div>
                      `
                      document.body.appendChild(modal)
                    }}
                  >
                    Full Preview
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto bg-gray-100 p-4">
                <div 
                  className="bg-white shadow-lg"
                  id="resume-preview"
                >
                  <SelectedTemplate data={currentResume} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <EnhancedAuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
    </div>
  )
}
