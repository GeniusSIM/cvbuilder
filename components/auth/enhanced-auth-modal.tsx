"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, FileText, Zap, Target } from 'lucide-react'
import { useResumeStore } from '@/lib/resume-store'

interface EnhancedAuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EnhancedAuthModal({ open, onOpenChange }: EnhancedAuthModalProps) {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showGoogleTooltip, setShowGoogleTooltip] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
    emailUpdates: false
  })
  
  const { signIn, signUp } = useResumeStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password)
      } else {
        await signUp(formData.email, formData.password, formData.name)
      }
      onOpenChange(false)
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleClick = () => {
    setShowGoogleTooltip(true)
    setTimeout(() => setShowGoogleTooltip(false), 3000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="flex min-h-[600px]">
          {/* Left Side - Features */}
          <div className="w-1/2 bg-gradient-to-br from-purple-50 to-blue-50 p-8 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  A resume that's already formatted
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Fit key achievements in a single page
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Remove wasted space with the Compact template
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Stand out with visually appealing sections & icons
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Auth Form */}
          <div className="w-1/2 p-8 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Welcome back' : 'Create your account'}
                </h1>
              </div>
              
              {/* Social Login */}
              <div className="space-y-3 mb-6">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 h-12"
                  onClick={() => {/* LinkedIn login */}}
                >
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                  LinkedIn
                </Button>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 h-12"
                    onClick={handleGoogleClick}
                  >
                    <div className="w-5 h-5">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    Google
                  </Button>
                  
                  {/* Google Tooltip */}
                  {showGoogleTooltip && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap">
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                      You used your Google account to sign in the last time. Click here to login to the same account.
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 text-white hover:bg-gray-700"
                        onClick={() => setShowGoogleTooltip(false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                )}
                
                <Input
                  type="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                
                <Input
                  type="password"
                  placeholder="Password*"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                
                {!isLogin && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                        }
                        className="mt-1"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to <span className="text-blue-600">Terms of Service</span> and{' '}
                        <span className="text-blue-600">Privacy policy</span>*
                      </label>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="updates"
                        checked={formData.emailUpdates}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, emailUpdates: checked as boolean }))
                        }
                        className="mt-1"
                      />
                      <label htmlFor="updates" className="text-sm text-gray-600">
                        Email me tailored resume advice & updates from Enhancv
                      </label>
                    </div>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-teal-500 hover:bg-teal-600 h-12"
                  disabled={isLoading || (!isLogin && !formData.agreeToTerms)}
                >
                  {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>
              
              <div className="text-center mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gray-600"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
