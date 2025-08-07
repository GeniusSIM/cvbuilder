export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  summary: string
}

export interface Experience {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  graduationDate: string
  gpa?: string
}

export interface Skill {
  id: string
  name: string
  level: number
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}

export interface User {
  id: string
  email: string
  name: string
  resumes: ResumeData[]
}

export interface Template {
  id: string
  name: string
  category: string
  preview: string
  component: React.ComponentType<{ data: ResumeData }>
}
