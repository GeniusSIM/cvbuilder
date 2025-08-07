"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useResumeStore } from '@/lib/resume-store'
import { scoreResume } from '@/lib/resume-scorer'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface ScoreModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScoreModal({ open, onOpenChange }: ScoreModalProps) {
  const { currentResume } = useResumeStore()
  const score = scoreResume(currentResume)

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Resume Score Analysis</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Overall Score
                <span className={`text-3xl font-bold ${getScoreColor(score.overall)}`}>
                  {getScoreGrade(score.overall)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Score: {score.overall}/100</span>
                  <span className={getScoreColor(score.overall)}>
                    {score.overall >= 90 ? 'Excellent' : 
                     score.overall >= 80 ? 'Good' : 
                     score.overall >= 60 ? 'Fair' : 'Needs Improvement'}
                  </span>
                </div>
                <Progress value={score.overall} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Personal Information</span>
                  <span>{score.breakdown.personalInfo}/25</span>
                </div>
                <Progress value={(score.breakdown.personalInfo / 25) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Work Experience</span>
                  <span>{score.breakdown.experience}/35</span>
                </div>
                <Progress value={(score.breakdown.experience / 35) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Education</span>
                  <span>{score.breakdown.education}/20</span>
                </div>
                <Progress value={(score.breakdown.education / 20) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Skills</span>
                  <span>{score.breakdown.skills}/20</span>
                </div>
                <Progress value={(score.breakdown.skills / 20) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {score.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
