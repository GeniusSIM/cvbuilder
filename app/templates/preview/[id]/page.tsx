"use client"

import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ZoomIn, ZoomOut, Download } from 'lucide-react'
import { templates } from '@/lib/templates'
import { useState } from 'react'
import { useResumeStore } from '@/lib/resume-store'

const sampleData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    website: 'johndoe.com',
    linkedin: 'linkedin.com/in/johndoe',
    summary: 'Experienced professional with a proven track record of success in dynamic environments. Skilled in leadership, project management, and strategic planning.'
  },
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Manager',
      company: 'Tech Corp',
      location: 'New York, NY',
      startDate: '2020-01',
      endDate: '2024-01',
      current: false,
      description: ['Led team of 10+ developers', 'Increased productivity by 40%', 'Managed $2M budget']
    },
    {
      id: '2',
      jobTitle: 'Project Manager',
      company: 'Innovation Inc',
      location: 'Boston, MA',
      startDate: '2018-03',
      endDate: '2019-12',
      current: false,
      description: ['Coordinated cross-functional teams', 'Delivered projects on time and under budget', 'Improved client satisfaction by 25%']
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Master of Business Administration',
      school: 'Harvard Business School',
      location: 'Cambridge, MA',
      graduationDate: '2018-05'
    },
    {
      id: '2',
      degree: 'Bachelor of Science in Computer Science',
      school: 'MIT',
      location: 'Cambridge, MA',
      graduationDate: '2016-05'
    }
  ],
  skills: [
    { id: '1', name: 'Leadership', level: 5 },
    { id: '2', name: 'Project Management', level: 4 },
    { id: '3', name: 'Strategic Planning', level: 4 },
    { id: '4', name: 'Data Analysis', level: 3 },
    { id: '5', name: 'Team Building', level: 5 },
    { id: '6', name: 'Budget Management', level: 4 }
  ]
}

export default function TemplatePreview() {
  const params = useParams()
  const router = useRouter()
  const [zoom, setZoom] = useState(80)
  const { setSelectedTemplate } = useResumeStore()
  
  const templateId = params.id as string
  const template = templates.find(t => t.id === templateId)
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <Button onClick={() => router.push('/templates')}>
            Back to Templates
          </Button>
        </div>
      </div>
    )
  }

  const TemplateComponent = template.component

  const handleUseTemplate = () => {
    setSelectedTemplate(templateId)
    router.push('/builder')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/templates')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{template.name} Template</h1>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.max(30, zoom - 10))}
              disabled={zoom <= 30}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.min(120, zoom + 10))}
              disabled={zoom >= 120}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button onClick={handleUseTemplate} className="bg-teal-500 hover:bg-teal-600">
              Use This Template
            </Button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div 
              className="transform origin-top-left transition-transform duration-200"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg">
                <TemplateComponent data={sampleData} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
