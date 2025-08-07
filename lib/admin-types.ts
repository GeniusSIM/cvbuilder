export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'super_admin' | 'moderator'
  avatar?: string
  lastLogin: string
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  resumeCount: number
  subscription: 'free' | 'pro' | 'premium'
}

export interface TemplateStats {
  id: string
  name: string
  category: string
  usageCount: number
  rating: number
  status: 'active' | 'draft' | 'archived'
  createdAt: string
  lastModified: string
  createdBy: string
}

export interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalResumes: number
  totalTemplates: number
  monthlyGrowth: number
  revenue: number
  conversionRate: number
}

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  timestamp: string
  details: string
  ipAddress: string
}

export interface AdminSettings {
  siteName: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  emailNotifications: boolean
  maxFileSize: number
  allowedFileTypes: string[]
  subscriptionPlans: {
    free: { resumeLimit: number; templateAccess: string[] }
    pro: { resumeLimit: number; templateAccess: string[] }
    premium: { resumeLimit: number; templateAccess: string[] }
  }
}
