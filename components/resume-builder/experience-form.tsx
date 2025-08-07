"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useResumeStore } from '@/lib/resume-store'
import { Experience } from '@/lib/types'
import { Plus, Trash2 } from 'lucide-react'

export function ExperienceForm() {
  const { currentResume, addExperience, updateExperience, removeExperience } = useResumeStore()
  const [showForm, setShowForm] = useState(false)
  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ['']
  })

  const handleAddExperience = () => {
    if (newExperience.jobTitle && newExperience.company) {
      addExperience({
        ...newExperience,
        id: Date.now().toString(),
        description: newExperience.description.filter(desc => desc.trim() !== '')
      })
      setNewExperience({
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ['']
      })
      setShowForm(false)
    }
  }

  const updateDescription = (index: number, value: string) => {
    const newDesc = [...newExperience.description]
    newDesc[index] = value
    setNewExperience({ ...newExperience, description: newDesc })
  }

  const addDescriptionPoint = () => {
    setNewExperience({
      ...newExperience,
      description: [...newExperience.description, '']
    })
  }

  const removeDescriptionPoint = (index: number) => {
    const newDesc = newExperience.description.filter((_, i) => i !== index)
    setNewExperience({ ...newExperience, description: newDesc })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Work Experience
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Experience */}
        {currentResume.experience.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{exp.jobTitle}</h4>
                <p className="text-gray-600">{exp.company} • {exp.location}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
              <Button
                onClick={() => removeExperience(exp.id)}
                variant="ghost"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {exp.description.length > 0 && (
              <ul className="list-disc list-inside text-sm space-y-1">
                {exp.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Add New Experience Form */}
        {showForm && (
          <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={newExperience.jobTitle}
                  onChange={(e) => setNewExperience({ ...newExperience, jobTitle: e.target.value })}
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="Tech Corp"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newExperience.location}
                  onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  disabled={newExperience.current}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={newExperience.current}
                  onCheckedChange={(checked) => 
                    setNewExperience({ ...newExperience, current: checked as boolean })
                  }
                />
                <Label htmlFor="current">I currently work here</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              {newExperience.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={desc}
                    onChange={(e) => updateDescription(index, e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={2}
                  />
                  {newExperience.description.length > 1 && (
                    <Button
                      onClick={() => removeDescriptionPoint(index)}
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                onClick={addDescriptionPoint}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Point
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddExperience}>Add Experience</Button>
              <Button onClick={() => setShowForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
