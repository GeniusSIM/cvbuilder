"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useResumeStore } from '@/lib/resume-store'
import { Download, Save, Eye } from 'lucide-react'

interface CoverLetterData {
  recipientName: string
  recipientTitle: string
  companyName: string
  jobTitle: string
  introduction: string
  body: string
  closing: string
}

export default function CoverLetterBuilder() {
  const [showPreview, setShowPreview] = useState(false)
  const { currentResume, isAuthenticated } = useResumeStore()
  const [coverLetter, setCoverLetter] = useState<CoverLetterData>({
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    jobTitle: '',
    introduction: '',
    body: '',
    closing: ''
  })

  const updateField = (field: keyof CoverLetterData, value: string) => {
    setCoverLetter(prev => ({ ...prev, [field]: value }))
  }

  const generateSampleContent = () => {
    setCoverLetter({
      recipientName: 'Hiring Manager',
      recipientTitle: 'Human Resources',
      companyName: 'Tech Corporation',
      jobTitle: 'Software Engineer',
      introduction: `I am writing to express my strong interest in the ${coverLetter.jobTitle || 'Software Engineer'} position at ${coverLetter.companyName || 'your company'}. With my background in software development and passion for innovative technology solutions, I am excited about the opportunity to contribute to your team.`,
      body: `In my previous role as a Senior Developer, I successfully led multiple projects that resulted in improved system performance and user satisfaction. My experience with modern technologies and agile methodologies aligns perfectly with your requirements. I am particularly drawn to your company's commitment to innovation and would love to bring my problem-solving skills to help achieve your goals.`,
      closing: `Thank you for considering my application. I look forward to discussing how my skills and enthusiasm can contribute to your team's success. I am available for an interview at your convenience.`
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access the Cover Letter Builder.</p>
            <Button onClick={() => window.location.href = '/'}>
              Go to Home Page
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cover Letter Builder</h1>
          <div className="flex gap-2">
            <Button onClick={generateSampleContent} variant="outline">
              Generate Sample
            </Button>
            <Button onClick={() => setShowPreview(!showPreview)} variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Recipient Information */}
            <Card>
              <CardHeader>
                <CardTitle>Recipient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      value={coverLetter.recipientName}
                      onChange={(e) => updateField('recipientName', e.target.value)}
                      placeholder="Hiring Manager"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientTitle">Recipient Title</Label>
                    <Input
                      id="recipientTitle"
                      value={coverLetter.recipientTitle}
                      onChange={(e) => updateField('recipientTitle', e.target.value)}
                      placeholder="Human Resources Director"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={coverLetter.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      placeholder="Tech Corporation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={coverLetter.jobTitle}
                      onChange={(e) => updateField('jobTitle', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cover Letter Content */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="introduction">Introduction Paragraph</Label>
                  <Textarea
                    id="introduction"
                    value={coverLetter.introduction}
                    onChange={(e) => updateField('introduction', e.target.value)}
                    placeholder="Write your opening paragraph here..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Body Paragraph</Label>
                  <Textarea
                    id="body"
                    value={coverLetter.body}
                    onChange={(e) => updateField('body', e.target.value)}
                    placeholder="Describe your experience and qualifications..."
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closing">Closing Paragraph</Label>
                  <Textarea
                    id="closing"
                    value={coverLetter.closing}
                    onChange={(e) => updateField('closing', e.target.value)}
                    placeholder="Write your closing paragraph here..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-8 shadow-lg max-h-[800px] overflow-y-auto">
                    {/* Header */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {currentResume.personalInfo.fullName || 'Your Name'}
                      </h2>
                      <div className="text-sm text-gray-600 space-y-1">
                        {currentResume.personalInfo.email && <p>{currentResume.personalInfo.email}</p>}
                        {currentResume.personalInfo.phone && <p>{currentResume.personalInfo.phone}</p>}
                        {currentResume.personalInfo.location && <p>{currentResume.personalInfo.location}</p>}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
                    </div>

                    {/* Recipient */}
                    <div className="mb-6">
                      {coverLetter.recipientName && <p className="font-medium">{coverLetter.recipientName}</p>}
                      {coverLetter.recipientTitle && <p className="text-gray-600">{coverLetter.recipientTitle}</p>}
                      {coverLetter.companyName && <p className="text-gray-600">{coverLetter.companyName}</p>}
                    </div>

                    {/* Subject */}
                    {coverLetter.jobTitle && (
                      <div className="mb-6">
                        <p className="font-medium">Re: Application for {coverLetter.jobTitle} Position</p>
                      </div>
                    )}

                    {/* Salutation */}
                    <div className="mb-4">
                      <p>Dear {coverLetter.recipientName || 'Hiring Manager'},</p>
                    </div>

                    {/* Body */}
                    <div className="space-y-4 mb-6">
                      {coverLetter.introduction && (
                        <p className="text-gray-800 leading-relaxed">{coverLetter.introduction}</p>
                      )}
                      {coverLetter.body && (
                        <p className="text-gray-800 leading-relaxed">{coverLetter.body}</p>
                      )}
                      {coverLetter.closing && (
                        <p className="text-gray-800 leading-relaxed">{coverLetter.closing}</p>
                      )}
                    </div>

                    {/* Signature */}
                    <div>
                      <p className="mb-4">Sincerely,</p>
                      <p className="font-medium">{currentResume.personalInfo.fullName || 'Your Name'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
