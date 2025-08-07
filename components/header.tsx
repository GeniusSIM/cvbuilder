"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, Menu, X, User, Settings } from 'lucide-react'
import { EnhancedAuthModal } from '@/components/auth/enhanced-auth-modal'
import { useResumeStore } from '@/lib/resume-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { isAuthenticated, user, signOut } = useResumeStore()

  const navigation = [
    {
      name: 'Resume',
      items: [
        { name: 'Resume Builder', href: '/builder' },
        { name: 'Resume Checker', href: '/checker' },
        { name: 'Resume Templates', href: '/templates' },
        { name: 'Upload Resume', href: '/upload' }
      ]
    },
    {
      name: 'Cover Letter',
      items: [
        { name: 'Cover Builder', href: '/cover-letter' },
        { name: 'Cover Letter Templates', href: '/cover-templates' }
      ]
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Organizations', href: '/organizations' }
  ]

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect to builder if already authenticated
      window.location.href = '/builder'
    } else {
      setShowAuthModal(true)
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-teal-500 fill-current" />
              <span className="text-xl font-bold text-gray-900">Enhancv</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                item.items ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link href={subItem.href} className="w-full">
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-teal-500 hover:bg-teal-600"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </>
              )}
              <Link href="/admin/login">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                {navigation.map((item) => (
                  item.items ? (
                    <div key={item.name} className="space-y-1">
                      <div className="text-gray-900 font-medium px-3 py-2 text-base">
                        {item.name}
                      </div>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="text-gray-600 hover:text-gray-900 block px-6 py-2 text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="pt-4 space-y-2">
                  {isAuthenticated && user ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 px-3 py-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {user.name}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          signOut()
                          setIsMenuOpen(false)
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => {
                          setShowAuthModal(true)
                          setIsMenuOpen(false)
                        }}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                      <Button 
                        className="w-full bg-teal-500 hover:bg-teal-600"
                        onClick={() => {
                          handleGetStarted()
                          setIsMenuOpen(false)
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                  <Link href="/admin/login">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Portal
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <EnhancedAuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
    </>
  )
}
