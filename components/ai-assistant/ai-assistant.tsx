"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Wand2, PenTool, X } from 'lucide-react'
import { useResumeStore } from '@/lib/resume-store'

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
  section: string
}

export function AIAssistant({ isOpen, onClose, section }: AIAssistantProps) {
  const [customRequest, setCustomRequest] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const { updatePersonalInfo, currentResume } = useResumeStore()

  const suggestions = [
    {
      icon: <Sparkles className="h-4 w-4" />,
      title: 'Generate Tailored Summary',
      description: 'Create a professional summary tailored to your target role'
    },
    {
      icon: <PenTool className="h-4 w-4" />,
      title: 'Improve Writing',
      description: 'Enhance the language and impact of your content'
    },
    {
      icon: <Wand2 className="h-4 w-4" />,
      title: 'Add Keywords',
      description: 'Include industry-relevant keywords for ATS optimization'
    }
  ]

  const handleSuggestion = async (suggestionTitle: string) => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (suggestionTitle === 'Generate Tailored Summary') {
      const generatedSummary = "Experienced professional with a proven track record of delivering exceptional results in dynamic environments. Skilled in strategic planning, team leadership, and process optimization. Passionate about driving innovation and achieving organizational goals through collaborative problem-solving and data-driven decision making."
      updatePersonalInfo({ summary: generatedSummary })
    }
    
    setIsGenerating(false)
    onClose()
  }

  const handleCustomRequest = async () => {
    if (!customRequest.trim()) return
    
    setIsGenerating(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsGenerating(false)
    setCustomRequest('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <CardTitle className="text-lg">AI ASSISTANT</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Suggestions */}
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-3"
                onClick={() => handleSuggestion(suggestion.title)}
                disabled={isGenerating}
              >
                <div className="flex items-start gap-3">
                  {suggestion.icon}
                  <div className="text-left">
                    <div className="font-medium">{suggestion.title}</div>
                    <div className="text-xs text-gray-500">{suggestion.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500">or</div>

          {/* Custom Request */}
          <div className="space-y-3">
            <Textarea
              placeholder="Enter a custom request"
              value={customRequest}
              onChange={(e) => setCustomRequest(e.target.value)}
              rows={3}
            />
            <Button
              onClick={handleCustomRequest}
              disabled={!customRequest.trim() || isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
