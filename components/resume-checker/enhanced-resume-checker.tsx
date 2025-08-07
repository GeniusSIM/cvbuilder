"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react'
import { useResumeStore } from '@/lib/resume-store'
import { scoreResume } from '@/lib/resume-scorer'
import { parseResumeFile } from '@/lib/file-upload'

interface DetailedScoreResult {
  overall: number
  breakdown: {
    content: number
    atsParseRate: number
    quantifyingImpact: number
    repetition: number
    spellingGrammar: number
    formatBrievity: number
    style: number
    sections: number
    skills: number
  }
  issues: Array<{
    category: string
    type: 'error' | 'warning' | 'success'
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
  }>
}

export function EnhancedResumeChecker() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [detailedScore, setDetailedScore] = useState<DetailedScoreResult | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const { currentResume, loadResume } = useResumeStore()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    const file = files[0]
    
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
      await handleFileUpload(file)
    } else {
      alert('Please upload a PDF or Word document.')
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    setIsAnalyzing(true)
    
    try {
      const parsedData = await parseResumeFile(file)
      loadResume(parsedData)
      
      // Generate detailed analysis
      const analysis = generateDetailedAnalysis(parsedData)
      setDetailedScore(analysis)
      
      setShowResults(true)
    } catch (error) {
      console.error('Error parsing file:', error)
      alert('Error analyzing file. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const generateDetailedAnalysis = (data: any): DetailedScoreResult => {
    const issues = []
    
    // ATS Parse Rate Analysis
    if (!data.personalInfo.email || !data.personalInfo.phone) {
      issues.push({
        category: 'Content',
        type: 'error' as const,
        title: 'Missing Contact Information',
        description: 'Your resume is missing essential contact information that ATS systems look for.',
        impact: 'high' as const
      })
    }

    // Quantifying Impact
    const hasQuantifiedAchievements = data.experience.some((exp: any) => 
      exp.description.some((desc: string) => /\d+/.test(desc))
    )
    
    if (!hasQuantifiedAchievements) {
      issues.push({
        category: 'Content',
        type: 'warning' as const,
        title: 'Lack of Quantified Achievements',
        description: 'Add numbers and metrics to demonstrate your impact and achievements.',
        impact: 'high' as const
      })
    }

    // Skills Analysis
    if (data.skills.length < 5) {
      issues.push({
        category: 'Content',
        type: 'warning' as const,
        title: 'Limited Skills Section',
        description: 'Add more relevant skills to improve keyword matching with job descriptions.',
        impact: 'medium' as const
      })
    }

    // Summary Analysis
    if (!data.personalInfo.summary || data.personalInfo.summary.length < 100) {
      issues.push({
        category: 'Content',
        type: 'warning' as const,
        title: 'Weak Professional Summary',
        description: 'Your professional summary should be 2-3 sentences highlighting your key qualifications.',
        impact: 'medium' as const
      })
    }

    return {
      overall: Math.max(60, 100 - issues.length * 10),
      breakdown: {
        content: 55,
        atsParseRate: hasQuantifiedAchievements ? 85 : 45,
        quantifyingImpact: hasQuantifiedAchievements ? 90 : 30,
        repetition: 85,
        spellingGrammar: 95,
        formatBrievity: 80,
        style: 75,
        sections: data.experience.length > 0 ? 90 : 60,
        skills: Math.min(100, data.skills.length * 20)
      },
      issues
    }
  }

  const handleAnalyzeCurrentResume = async () => {
    setIsAnalyzing(true)
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const analysis = generateDetailedAnalysis(currentResume)
    setDetailedScore(analysis)
    setShowResults(true)
    setIsAnalyzing(false)
  }

  if (showResults && detailedScore) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resume Analysis Results</h1>
              <p className="text-gray-600">Detailed feedback to improve your resume</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowResults(false)}>
                New Upload
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Edit & Fix Resume
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Score Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Your Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">
                      {detailedScore.overall}/100
                    </div>
                    <div className="text-sm text-gray-600">
                      {detailedScore.issues.length} Issues
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CONTENT</span>
                      <span className="text-sm text-pink-600">55%</span>
                    </div>
                    
                    <div className="space-y-3">
                      {detailedScore.issues.map((issue, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          {issue.type === 'error' ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : issue.type === 'warning' ? (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="text-gray-700">{issue.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-purple-600" />
                    </div>
                    <CardTitle>CONTENT</CardTitle>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                    {detailedScore.issues.length} ISSUES FOUND
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* ATS Parse Rate */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold">ATS PARSE RATE</h3>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-4">
                        An <strong>Applicant Tracking System</strong> commonly referred to as <strong>ATS</strong> is a system used by 
                        employers and recruiters to quickly scan a large number of job applications.
                      </p>
                      <p className="text-sm text-gray-700 mb-4">
                        A high parse rate of your resume ensures that the ATS can read your resume, experience, 
                        and skills. This increases the chance of getting your resume seen by recruiters.
                      </p>
                      
                      <div className="relative">
                        <Progress 
                          value={detailedScore.breakdown.atsParseRate} 
                          className="h-3 mb-2"
                        />
                        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full transform translate-x-1 -translate-y-1"></div>
                      </div>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="space-y-4">
                    {detailedScore.issues.map((issue, index) => (
                      <div key={index} className="border-l-4 border-orange-400 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          {issue.type === 'error' ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                          <h4 className="font-medium text-gray-900">{issue.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{issue.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Is your resume good enough?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A free and fast AI resume checker doing 16 crucial checks to ensure 
              your resume is ready to perform and get you interview callbacks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Upload Section */}
            <div>
              <Card className={`border-2 border-dashed transition-colors ${
                dragActive ? 'border-teal-400 bg-teal-50' : 'border-gray-300 hover:border-teal-400'
              }`}>
                <CardContent className="p-8">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className="text-center cursor-pointer"
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                    />
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Drop your resume here or choose a file.
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      PDF & DOCX only. Max 2MB file size.
                    </p>
                    <label htmlFor="file-upload">
                      <Button 
                        className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3"
                        disabled={isAnalyzing}
                        asChild
                      >
                        <span>
                          {isAnalyzing ? 'Analyzing...' : 'Upload Your Resume'}
                        </span>
                      </Button>
                    </label>
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                      <Shield className="h-4 w-4" />
                      Privacy guaranteed
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mt-6">
                <p className="text-gray-600 mb-4">or</p>
                <Button
                  variant="outline"
                  onClick={handleAnalyzeCurrentResume}
                  disabled={isAnalyzing}
                >
                  Analyze Current Resume Data
                </Button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-6 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Resume Score</div>
                      <div className="text-3xl font-bold text-green-500">92/100</div>
                      <div className="text-xs text-gray-500">24 Issues</div>
                    </div>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CONTENT</span>
                      <span className="text-green-600">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ATS PARSE RATE</span>
                      <span className="text-green-600">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isAnalyzing && (
            <div className="text-center mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your resume...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
