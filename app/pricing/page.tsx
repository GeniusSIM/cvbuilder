"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '1 resume template',
      'Basic resume builder',
      'PDF download',
      'Email support'
    ],
    limitations: [
      'Limited customization',
      'Enhancv watermark'
    ],
    popular: false,
    cta: 'Get Started Free'
  },
  {
    name: 'Pro',
    price: '$19.95',
    period: 'per month',
    description: 'Most popular for job seekers',
    features: [
      'All resume templates',
      'Cover letter builder',
      'Resume checker with AI feedback',
      'ATS optimization',
      'Multiple resume versions',
      'Priority support',
      'No watermark'
    ],
    limitations: [],
    popular: true,
    cta: 'Start Pro Trial'
  },
  {
    name: 'Premium',
    price: '$39.95',
    period: 'per month',
    description: 'For serious professionals',
    features: [
      'Everything in Pro',
      'LinkedIn profile optimization',
      'Personal branding consultation',
      'Interview preparation guide',
      'Salary negotiation tips',
      'Career coaching session',
      'White-label resumes'
    ],
    limitations: [],
    popular: false,
    cta: 'Go Premium'
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the tools you need to land your dream job. Start free, upgrade when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-teal-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-teal-500 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center gap-3 opacity-60">
                      <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                        <div className="h-1 w-3 bg-gray-400 rounded"></div>
                      </div>
                      <span className="text-gray-500 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us within 30 days for a full refund.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use industry-standard encryption to protect your data and never share your personal information with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-teal-500 to-blue-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Land Your Dream Job?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of professionals who've successfully landed jobs using Enhancv.
              </p>
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Start Building Your Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
