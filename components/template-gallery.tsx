"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useResumeStore } from '@/lib/resume-store'
import { useState } from 'react'
import { EnhancedAuthModal } from '@/components/auth/enhanced-auth-modal'
import { templates } from '@/lib/templates'

export function TemplateGallery() {
  const { isAuthenticated, setSelectedTemplate } = useResumeStore()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const router = useRouter()

  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    if (isAuthenticated) {
      router.push('/onboarding')
    } else {
      setShowAuthModal(true)
    }
  }

  return (
    <>
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose from our professional resume templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our templates are designed by HR experts and tailored for different industries and career levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={template.preview || "/placeholder.svg"}
                    alt={`${template.name} resume template`}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                      {template.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-colors duration-300"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    Use This Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8" onClick={() => router.push('/templates')}>
            View All Templates
          </Button>
        </div>
      </section>
      
      <EnhancedAuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  )
}
