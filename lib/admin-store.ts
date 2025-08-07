"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AdminUser {
  id: string
  name: string
  email: string
  plan: string
  status: string
  joinDate: string
  lastActive: string
  resumesCreated: number
}

export interface AdminTemplate {
  id: string
  name: string
  category: string
  description: string
  tags: string[]
  price: number
  isPremium: boolean
  templateFile: {
    name: string
    size: number
    type: string
    url: string
  }
  previewImage: {
    name: string
    size: number
    type: string
    url: string
  }
  status: 'active' | 'draft' | 'archived'
  downloads: number
  rating: number
  createdAt: string
  updatedAt: string
}

export interface AdminActivity {
  id: string
  type: string
  description: string
  timestamp: string
  user: string
}

export interface AdminSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  maxFileSize: number
  allowedFileTypes: string[]
  subscriptionPlans: {
    free: { name: string; price: number; features: string[] }
    pro: { name: string; price: number; features: string[] }
    premium: { name: string; price: number; features: string[] }
  }
}

interface AdminStore {
  // State
  users: AdminUser[]
  templates: AdminTemplate[]
  activities: AdminActivity[]
  categories: string[]
  settings: AdminSettings
  isAuthenticated: boolean
  
  // Actions
  addUser: (user: AdminUser) => void
  updateUser: (id: string, updates: Partial<AdminUser>) => void
  deleteUser: (id: string) => void
  addTemplate: (template: AdminTemplate) => void
  updateTemplate: (id: string, updates: Partial<AdminTemplate>) => void
  deleteTemplate: (id: string) => void
  addActivity: (activity: AdminActivity) => void
  addCategory: (category: string) => void
  updateSettings: (settings: Partial<AdminSettings>) => void
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
}

const initialSettings: AdminSettings = {
  siteName: 'Enhancv',
  siteDescription: 'Professional Resume Builder',
  contactEmail: 'admin@enhancv.com',
  maxFileSize: 10,
  allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png', 'svg'],
  subscriptionPlans: {
    free: {
      name: 'Free',
      price: 0,
      features: ['Basic templates', 'PDF download', 'Email support']
    },
    pro: {
      name: 'Pro',
      price: 9.99,
      features: ['All templates', 'Premium features', 'Priority support', 'ATS checker']
    },
    premium: {
      name: 'Premium',
      price: 19.99,
      features: ['Everything in Pro', 'AI assistance', 'Custom branding', 'Analytics']
    }
  }
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Initial state
      users: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          plan: 'pro',
          status: 'active',
          joinDate: '2024-01-15',
          lastActive: '2024-01-20',
          resumesCreated: 3
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          plan: 'free',
          status: 'active',
          joinDate: '2024-01-10',
          lastActive: '2024-01-19',
          resumesCreated: 1
        }
      ],
      templates: [
        {
          id: '1',
          name: 'Professional Template',
          category: 'Professional',
          description: 'Clean and professional resume template',
          tags: ['professional', 'clean', 'modern'],
          price: 0,
          isPremium: false,
          templateFile: {
            name: 'professional-template.pdf',
            size: 1024000,
            type: 'application/pdf',
            url: '/templates/professional.pdf'
          },
          previewImage: {
            name: 'professional-preview.jpg',
            size: 512000,
            type: 'image/jpeg',
            url: '/images/template-preview.png'
          },
          status: 'active',
          downloads: 150,
          rating: 4.5,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        }
      ],
      activities: [
        {
          id: '1',
          type: 'user_registered',
          description: 'New user John Doe registered',
          timestamp: '2024-01-20T10:30:00Z',
          user: 'System'
        }
      ],
      categories: ['Professional', 'Creative', 'Modern', 'Executive', 'Technical'],
      settings: initialSettings,
      isAuthenticated: false,

      // Actions
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user]
        })),

      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updates } : user
          )
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id)
        })),

      addTemplate: (template) =>
        set((state) => ({
          templates: [...state.templates, template]
        })),

      updateTemplate: (id, updates) =>
        set((state) => ({
          templates: state.templates.map((template) =>
            template.id === id ? { ...template, ...updates } : template
          )
        })),

      deleteTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((template) => template.id !== id)
        })),

      addActivity: (activity) =>
        set((state) => ({
          activities: [activity, ...state.activities.slice(0, 99)] // Keep last 100 activities
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category]
        })),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),

      signIn: async (email, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (email === 'admin@enhancv.com' && password === 'admin123') {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },

      signOut: () =>
        set({ isAuthenticated: false })
    }),
    {
      name: 'admin-store',
      partialize: (state) => ({
        users: state.users,
        templates: state.templates,
        activities: state.activities,
        categories: state.categories,
        settings: state.settings,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
