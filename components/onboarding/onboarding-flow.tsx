"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Upload, Linkedin, FileText, Sparkles, Target, Users, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useResumeStore } from '@/lib/resume-store'
import { templates } from '@/lib/templates'

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    hasExistingResume: null as boolean | null,
    selectedTemplate: '',
    jobTitle: '',
    experience: '',
    industry: '',
    linkedinUrl: '',
    goals: [] as string[],
    uploadedFile: null as File | null
  })
  
  const router = useRouter()
  const { 
    setSelectedTemplate: setStoreTemplate, 
    setOnboardingCompleted,
    updatePersonalInfo,
    setOnboardingData
  } = useResumeStore()

  const totalSteps = 7

  const handleNext = async () => {
    setIsLoading(true)
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setIsLoading(false)
    } else {
      // Complete onboarding - this is step 7
      if (formData.selectedTemplate) {
        setStoreTemplate(formData.selectedTemplate)
      }
      
      // Apply onboarding data to resume
      if (formData.jobTitle) {
        updatePersonalInfo({ 
          summary: `Experienced ${formData.jobTitle} with ${formData.experience === 'entry' ? '0-2' : formData.experience === 'mid' ? '3-7' : formData.experience === 'senior' ? '8+' : '10+'} years of experience in the industry.`
        })
      }
      
      // Store onboarding data for future reference
      setOnboardingData(formData)
      
      // Mark onboarding as completed
      setOnboardingCompleted(true)
      
      // Complete the onboarding flow
      onComplete()
      
      // Navigate to builder with preloaded flag
      router.push('/builder?preloaded=true')
      
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900">Enhancv</span>
          </div>
        </div>
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        {currentStep === 7 && (
          <p className="mt-4 text-gray-600">Setting up your resume builder...</p>
        )}
      </div>
    </div>
  )

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentStep > 1 && (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">Enhancv</span>
            </div>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="w-32 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                  Welcome to Enhancv
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Let's create a resume that gets you hired. We'll guide you through the process step by step.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Professional Templates</h3>
                  <p className="text-gray-600 text-sm">Choose from expertly designed templates</p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
                  <p className="text-gray-600 text-sm">Get intelligent suggestions and improvements</p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">ATS Optimized</h3>
                  <p className="text-gray-600 text-sm">Pass applicant tracking systems</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg"
                onClick={handleNext}
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Step 2: Job Title */}
          {currentStep === 2 && (
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  What's your target job title?
                </h1>
                <p className="text-lg text-gray-600">
                  This helps us customize your resume for the right opportunities.
                </p>
              </div>
              
              <div className="space-y-4">
                <Input
                  placeholder="e.g. Software Engineer, Marketing Manager, Data Analyst"
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData({ jobTitle: e.target.value })}
                  className="text-lg p-4 text-center"
                />
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'Marketing Manager'].map((title) => (
                    <Button
                      key={title}
                      variant="outline"
                      size="sm"
                      onClick={() => updateFormData({ jobTitle: title })}
                    >
                      {title}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                onClick={handleNext}
                disabled={!formData.jobTitle}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 3: Experience Level */}
          {currentStep === 3 && (
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  What's your experience level?
                </h1>
                <p className="text-lg text-gray-600">
                  We'll tailor the resume format to match your career stage.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'entry', title: 'Entry Level', desc: '0-2 years of experience', icon: Users },
                  { id: 'mid', title: 'Mid Level', desc: '3-7 years of experience', icon: Award },
                  { id: 'senior', title: 'Senior Level', desc: '8+ years of experience', icon: Target },
                  { id: 'executive', title: 'Executive', desc: 'Leadership positions', icon: Sparkles }
                ].map((level) => (
                  <Card 
                    key={level.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      formData.experience === level.id ? 'ring-2 ring-teal-500 bg-teal-50' : ''
                    }`}
                    onClick={() => updateFormData({ experience: level.id })}
                  >
                    <CardContent className="p-6 text-center">
                      <level.icon className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">{level.title}</h3>
                      <p className="text-gray-600 text-sm">{level.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                onClick={handleNext}
                disabled={!formData.experience}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 4: Existing Resume */}
          {currentStep === 4 && (
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Do you have an existing resume?
                </h1>
                <p className="text-lg text-gray-600">
                  Upload it and we'll help you improve it, or start fresh.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    formData.hasExistingResume === true ? 'ring-2 ring-teal-500 bg-teal-50' : ''
                  }`}
                  onClick={() => updateFormData({ hasExistingResume: true })}
                >
                  <CardContent className="p-8 text-center">
                    <Upload className="h-16 w-16 text-teal-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-xl">Yes, I have one</h3>
                    <p className="text-gray-600">Upload your existing resume and we'll help improve it</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    formData.hasExistingResume === false ? 'ring-2 ring-teal-500 bg-teal-50' : ''
                  }`}
                  onClick={() => updateFormData({ hasExistingResume: false })}
                >
                  <CardContent className="p-8 text-center">
                    <FileText className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-xl">Start from scratch</h3>
                    <p className="text-gray-600">Create a new resume with our guided process</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button 
                size="lg" 
                className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                onClick={handleNext}
                disabled={formData.hasExistingResume === null}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 5: Template Selection */}
          {currentStep === 5 && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Choose your template
                </h1>
                <p className="text-lg text-gray-600">
                  Pick a design that matches your industry and personal style.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {templates.slice(0, 4).map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      formData.selectedTemplate === template.id ? 'ring-2 ring-teal-500' : ''
                    }`}
                    onClick={() => updateFormData({ selectedTemplate: template.id })}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src="/images/template-preview.png" 
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-center text-gray-900">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-500 text-center">
                        {template.category}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                onClick={handleNext}
                disabled={!formData.selectedTemplate}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 6: LinkedIn Import */}
          {currentStep === 6 && (
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Import from LinkedIn?
                </h1>
                <p className="text-lg text-gray-600">
                  Save time by importing your professional information from LinkedIn.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <Linkedin className="h-8 w-8 text-blue-600" />
                  <div className="flex-1">
                    <Input
                      placeholder="https://linkedin.com/in/your-profile"
                      value={formData.linkedinUrl}
                      onChange={(e) => updateFormData({ linkedinUrl: e.target.value })}
                      className="text-lg"
                    />
                  </div>
                  <Button variant="outline">
                    Import
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-500 mb-4">Or</p>
                  <Button 
                    variant="ghost" 
                    onClick={handleNext}
                    className="text-gray-600"
                  >
                    Skip this step
                  </Button>
                </div>
              </div>
              
              {formData.linkedinUrl && (
                <Button 
                  size="lg" 
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              )}
            </div>
          )}

          {/* Step 7: Final Setup */}
          {currentStep === 7 && (
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Almost ready!
                </h1>
                <p className="text-lg text-gray-600">
                  We're setting up your personalized resume builder.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-sm font-medium text-green-800">Template Selected</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-sm font-medium text-green-800">Profile Configured</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-sm font-medium text-blue-800">Finalizing...</p>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                  onClick={handleNext}
                >
                  Launch Resume Builder
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
