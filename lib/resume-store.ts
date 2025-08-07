"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ResumeData, User, PersonalInfo, Experience, Education, Skill } from './types'

interface OnboardingData {
  hasExistingResume: boolean | null
  selectedTemplate: string
  jobTitle: string
  experience: string
  industry: string
  linkedinUrl: string
  goals: string[]
  uploadedFile: File | null
}

interface ResumeStore {
  currentResume: ResumeData
  selectedTemplate: string
  user: User | null
  isAuthenticated: boolean
  onboardingCompleted: boolean
  onboardingData: OnboardingData | null
  
  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: (education: Education) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  setSelectedTemplate: (templateId: string) => void
  setOnboardingCompleted: (completed: boolean) => void
  setOnboardingData: (data: Partial<OnboardingData>) => void
  saveResume: () => void
  loadResume: (resumeData: ResumeData) => void
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signOut: () => void
  resetResume: () => void
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: []
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      currentResume: initialResumeData,
      selectedTemplate: 'professional',
      user: null,
      isAuthenticated: false,
      onboardingCompleted: false,
      onboardingData: null,

      updatePersonalInfo: (info) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            personalInfo: { ...state.currentResume.personalInfo, ...info }
          }
        })),

      addExperience: (experience) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience: [...state.currentResume.experience, experience]
          }
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience: state.currentResume.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            )
          }
        })),

      removeExperience: (id) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience: state.currentResume.experience.filter((exp) => exp.id !== id)
          }
        })),

      addEducation: (education) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            education: [...state.currentResume.education, education]
          }
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            education: state.currentResume.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            )
          }
        })),

      removeEducation: (id) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            education: state.currentResume.education.filter((edu) => edu.id !== id)
          }
        })),

      addSkill: (skill) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            skills: [...state.currentResume.skills, skill]
          }
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            skills: state.currentResume.skills.map((s) =>
              s.id === id ? { ...s, ...skill } : s
            )
          }
        })),

      removeSkill: (id) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            skills: state.currentResume.skills.filter((skill) => skill.id !== id)
          }
        })),

      setSelectedTemplate: (templateId) =>
        set({ selectedTemplate: templateId }),

      setOnboardingCompleted: (completed) =>
        set({ onboardingCompleted: completed }),

      setOnboardingData: (data) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, ...data } as OnboardingData
        })),

      saveResume: () => {
        const { user, currentResume } = get()
        if (user) {
          const updatedUser = {
            ...user,
            resumes: [...user.resumes.filter((r) => r !== currentResume), currentResume]
          }
          set({ user: updatedUser })
        }
      },

      loadResume: (resumeData) =>
        set({ currentResume: resumeData }),

      signIn: async (email, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          plan: 'pro',
          resumes: []
        }
        
        set({ user: mockUser, isAuthenticated: true })
        return true
      },

      signUp: async (email, password, name) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
          plan: 'free',
          resumes: []
        }
        
        set({ user: mockUser, isAuthenticated: true })
        return true
      },

      signOut: () =>
        set({ 
          user: null, 
          isAuthenticated: false, 
          currentResume: initialResumeData, 
          onboardingCompleted: false,
          onboardingData: null
        }),

      resetResume: () =>
        set({ currentResume: initialResumeData })
    }),
    {
      name: 'resume-store',
      partialize: (state) => ({
        currentResume: state.currentResume,
        selectedTemplate: state.selectedTemplate,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingCompleted: state.onboardingCompleted,
        onboardingData: state.onboardingData
      })
    }
  )
)
