"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useResumeStore } from '@/lib/resume-store'
import { Education } from '@/lib/types'
import { Plus, Trash2, GraduationCap } from 'lucide-react'

export function EducationForm() {
  const { currentResume, updateEducation } = useResumeStore()
  const [editingId, setEditingId] = useState<string | null>(null)

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    }
    updateEducation([...currentResume.education, newEducation])
    setEditingId(newEducation.id)
  }

  const updateEducationItem = (id: string, field: keyof Education, value: string) => {
    const updatedEducation = currentResume.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    )
    updateEducation(updatedEducation)
  }

  const removeEducation = (id: string) => {
    const updatedEducation = currentResume.education.filter(edu => edu.id !== id)
    updateEducation(updatedEducation)
    if (editingId === id) {
      setEditingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-teal-500" />
          <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        </div>
        <Button onClick={addEducation} className="bg-teal-500 hover:bg-teal-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {currentResume.education.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No education added yet</h3>
            <p className="text-gray-600 mb-4">Add your educational background to strengthen your resume.</p>
            <Button onClick={addEducation} className="bg-teal-500 hover:bg-teal-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {currentResume.education.map((edu) => (
            <Card key={edu.id} className={editingId === edu.id ? 'ring-2 ring-teal-500' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {edu.degree || 'New Education'}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(editingId === edu.id ? null : edu.id)}
                    >
                      {editingId === edu.id ? 'Done' : 'Edit'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {editingId === edu.id && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`degree-${edu.id}`}>Degree *</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        placeholder="e.g., Bachelor of Science in Computer Science"
                        value={edu.degree}
                        onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`school-${edu.id}`}>School/University *</Label>
                      <Input
                        id={`school-${edu.id}`}
                        placeholder="e.g., University of California, Berkeley"
                        value={edu.school}
                        onChange={(e) => updateEducationItem(edu.id, 'school', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`location-${edu.id}`}>Location</Label>
                      <Input
                        id={`location-${edu.id}`}
                        placeholder="e.g., Berkeley, CA"
                        value={edu.location}
                        onChange={(e) => updateEducationItem(edu.id, 'location', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`graduation-${edu.id}`}>Graduation Date *</Label>
                      <Input
                        id={`graduation-${edu.id}`}
                        placeholder="e.g., May 2023"
                        value={edu.graduationDate}
                        onChange={(e) => updateEducationItem(edu.id, 'graduationDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                      <Input
                        id={`gpa-${edu.id}`}
                        placeholder="e.g., 3.8/4.0"
                        value={edu.gpa}
                        onChange={(e) => updateEducationItem(edu.id, 'gpa', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              )}

              {editingId !== edu.id && (
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{edu.school}</p>
                    <p>{edu.location} • {edu.graduationDate}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Education Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• List your most recent education first</li>
          <li>• Include relevant coursework, honors, or achievements</li>
          <li>• Only include GPA if it's 3.5 or higher</li>
          <li>• For recent graduates, education should come before experience</li>
        </ul>
      </div>
    </div>
  )
}
