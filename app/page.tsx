"use client"

import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { TemplateGallery } from '@/components/template-gallery'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <Header />
      <main>
        <HeroSection />
        <TemplateGallery />
      </main>
      <Footer />
    </div>
  )
}
