"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useResumeStore } from '@/lib/resume-store'
import { Plus, X } from 'lucide-react'

export function SkillsForm() {
  const { currentResume, addSkill, updateSkill, removeSkill } = useResumeStore()
  const [newSkill, setNewSkill] = useState({
    id: '',
    name: '',
    level: 3,
    category: 'Technical'
  })

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill({
        ...newSkill,
        id: Date.now().toString()
      })
      setNewSkill({
        id: '',
        name: '',
        level: 3,
        category: 'Technical'
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Skill */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="skillName">Skill Name</Label>
            <Input
              id="skillName"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              onKeyPress={handleKeyPress}
              placeholder="JavaScript, Project Management, etc."
            />
          </div>
          
          <Button onClick={handleAddSkill} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>

        {/* Skills List */}
        {currentResume.skills.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Your Skills</h3>
            <div className="space-y-2">
              {currentResume.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                      className="border-none bg-transparent p-0 font-medium"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentResume.skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No skills added yet. Add your first skill above!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
