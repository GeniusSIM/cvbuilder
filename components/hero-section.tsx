"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useResumeStore } from '@/lib/resume-store'
import { EnhancedAuthModal } from '@/components/auth/enhanced-auth-modal'
import { ScoreModal } from '@/components/resume-score/score-modal'

export function HeroSection() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const { isAuthenticated } = useResumeStore()
  const router = useRouter()

  const handleBuildResume = () => {
    if (isAuthenticated) {
      router.push('/onboarding')
    } else {
      setShowAuthModal(true)
    }
  }

  const handleGetScore = () => {
    setShowScoreModal(true)
  }

  return (
    <>
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Enhancv's{" "}
                <span className="text-purple-600">Resume Builder</span>{" "}
                helps you get hired at top companies
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg"
                  onClick={handleBuildResume}
                >
                  Build Your Resume
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 px-8 py-3 text-lg"
                  onClick={handleGetScore}
                >
                  Get Your Resume Score
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700">Excellent</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-green-500 text-green-500" />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-600">4,662 Reviews</span>
              </div>
            </div>

            <div className="pt-8">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
                Pick a resume template and build your resume in minutes!
              </h2>
            </div>
          </div>

          {/* Right Content - Resume Preview */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-4">
                {/* Resume Header */}
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold text-gray-900">Jamie Smith</h3>
                  <p className="text-gray-600">Senior Product Manager</p>
                  <p className="text-sm text-gray-500">jamie.smith@email.com • +1 (555) 123-4567</p>
                </div>

                {/* Experience Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">EXPERIENCE</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-800">Senior Product Manager</h5>
                      <p className="text-sm text-gray-600">Tech Company • 2020 - Present</p>
                      <ul className="text-xs text-gray-600 mt-1 space-y-1">
                        <li>• Led cross-functional teams to deliver 5+ major product features</li>
                        <li>• Increased user engagement by 40% through data-driven decisions</li>
                        <li>• Managed product roadmap for $10M+ revenue stream</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Product Manager</h5>
                      <p className="text-sm text-gray-600">StartupCo • 2018 - 2020</p>
                      <ul className="text-xs text-gray-600 mt-1 space-y-1">
                        <li>• Launched 3 successful products from concept to market</li>
                        <li>• Collaborated with engineering and design teams</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">SKILLS</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Product Strategy', 'Data Analysis', 'Agile', 'Leadership'].map((skill) => (
                      <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">ACHIEVEMENTS</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>🏆 Winner of Best Product Launch 2022</li>
                    <li>📈 Increased team productivity by 35%</li>
                    <li>🎯 Achieved 98% customer satisfaction rate</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <EnhancedAuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      <ScoreModal open={showScoreModal} onOpenChange={setShowScoreModal} />
    </>
  )
}
