"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, BarChart3, Headphones, Building, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: <Users className="h-8 w-8 text-teal-600" />,
    title: 'Team Management',
    description: 'Manage multiple team members and their resume building progress from one dashboard.'
  },
  {
    icon: <Shield className="h-8 w-8 text-teal-600" />,
    title: 'Brand Consistency',
    description: 'Ensure all resumes follow your company branding guidelines and standards.'
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-teal-600" />,
    title: 'Analytics & Insights',
    description: 'Track team performance and get insights into resume effectiveness.'
  },
  {
    icon: <Headphones className="h-8 w-8 text-teal-600" />,
    title: 'Priority Support',
    description: 'Get dedicated support from our team to help your organization succeed.'
  }
]

const benefits = [
  'Bulk user management and provisioning',
  'Custom branding and templates',
  'Advanced analytics and reporting',
  'SSO integration',
  'API access for integrations',
  'Dedicated account manager',
  'Training and onboarding support',
  'Volume discounts available'
]

export default function OrganizationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-4">
              <Building className="h-4 w-4 mr-2" />
              For Organizations
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Empower Your Team with Professional Resume Building
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Help your employees, students, or members create outstanding resumes that get results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Request Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Get Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Built for Organizations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to help your team create professional resumes at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Organizations Choose Enhancv
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Trusted by 500+ Organizations
                </h3>
                <p className="text-gray-600">
                  From universities to Fortune 500 companies
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-teal-600">10M+</div>
                  <div className="text-sm text-gray-600">Resumes Created</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600">500+</div>
                  <div className="text-sm text-gray-600">Organizations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Get Started Today
                </CardTitle>
                <p className="text-gray-600">
                  Contact us to learn more about our organization solutions
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Your Company" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input id="teamSize" placeholder="e.g., 50-100 employees" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your needs..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-teal-500 hover:bg-teal-600">
                  Request Demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
