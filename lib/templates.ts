import { ProfessionalTemplate } from '@/components/resume-templates/professional-template'
import { ModernTemplate } from '@/components/resume-templates/modern-template'
import { ExecutiveTemplate } from '@/components/resume-templates/executive-template'
import { CreativeTemplate } from '@/components/resume-templates/creative-template'
import { MinimalistTemplate } from '@/components/resume-templates/minimalist-template'
import { TechTemplate } from '@/components/resume-templates/tech-template'
import { Template } from './types'

export const templates: Template[] = [
  {
    id: 'professional',
    name: 'Professional',
    category: 'Classic',
    preview: '/placeholder.svg?height=400&width=300&text=Professional+Resume',
    component: ProfessionalTemplate,
    description: 'Clean and traditional design perfect for corporate roles'
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Creative',
    preview: '/placeholder.svg?height=400&width=300&text=Modern+Resume',
    component: ModernTemplate,
    description: 'Contemporary sidebar layout with color accents'
  },
  {
    id: 'executive',
    name: 'Executive',
    category: 'Professional',
    preview: '/placeholder.svg?height=400&width=300&text=Executive+Resume',
    component: ExecutiveTemplate,
    description: 'Sophisticated dark theme for senior positions'
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'Creative',
    preview: '/placeholder.svg?height=400&width=300&text=Creative+Resume',
    component: CreativeTemplate,
    description: 'Colorful and dynamic design for creative professionals'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Simple',
    preview: '/placeholder.svg?height=400&width=300&text=Minimalist+Resume',
    component: MinimalistTemplate,
    description: 'Clean and simple design focusing on content'
  },
  {
    id: 'tech',
    name: 'Tech',
    category: 'Industry',
    preview: '/placeholder.svg?height=400&width=300&text=Tech+Resume',
    component: TechTemplate,
    description: 'Modern tech-focused design with coding elements'
  }
]

export const getTemplateById = (id: string) => {
  return templates.find(template => template.id === id)
}
