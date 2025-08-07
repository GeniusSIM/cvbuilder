"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAdminStore } from '@/lib/admin-store'
import { User, Mail, Crown, Shield, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface AddUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'free',
    status: 'active'
  })
  const [isLoading, setIsLoading] = useState(false)
  
  const { addUser, addActivity } = useAdminStore()

  const planOptions = [
    {
      value: 'free',
      label: 'Free',
      price: '$0/month',
      features: ['Basic templates', 'PDF download', 'Email support'],
      icon: User,
      color: 'text-gray-600'
    },
    {
      value: 'pro',
      label: 'Pro',
      price: '$9.99/month',
      features: ['All templates', 'Premium features', 'Priority support', 'ATS checker'],
      icon: Crown,
      color: 'text-blue-600'
    },
    {
      value: 'premium',
      label: 'Premium',
      price: '$19.99/month',
      features: ['Everything in Pro', 'AI assistance', 'Custom branding', 'Analytics'],
      icon: Shield,
      color: 'text-purple-600'
    }
  ]

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'text-green-600' },
    { value: 'inactive', label: 'Inactive', color: 'text-gray-600' },
    { value: 'suspended', label: 'Suspended', color: 'text-red-600' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Name is required')
      return
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const newUser = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        plan: formData.plan,
        status: formData.status,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        resumesCreated: 0
      }

      addUser(newUser)
      addActivity({
        id: Date.now().toString(),
        type: 'user_added',
        description: `New user "${formData.name}" added with ${formData.plan} plan`,
        timestamp: new Date().toISOString(),
        user: 'Admin'
      })

      toast.success('User added successfully!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        plan: 'free',
        status: 'active'
      })
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to add user')
      console.error('Error adding user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedPlan = planOptions.find(plan => plan.value === formData.plan)
  const selectedStatus = statusOptions.find(status => status.value === formData.status)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Plan Selection */}
          <div className="space-y-2">
            <Label htmlFor="plan">Subscription Plan</Label>
            <Select
              value={formData.plan}
              onValueChange={(value) => setFormData(prev => ({ ...prev, plan: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                {planOptions.map((plan) => (
                  <SelectItem key={plan.value} value={plan.value}>
                    <div className="flex items-center gap-2">
                      <plan.icon className={`h-4 w-4 ${plan.color}`} />
                      <span className="font-medium">{plan.label}</span>
                      <span className="text-sm text-gray-500">{plan.price}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Plan Features Preview */}
            {selectedPlan && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <selectedPlan.icon className={`h-4 w-4 ${selectedPlan.color}`} />
                  <span className="font-medium text-sm">{selectedPlan.label} Plan Features:</span>
                </div>
                <ul className="space-y-1">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Account Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <span className={status.color}>{status.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedStatus && (
              <p className="text-xs text-gray-500 mt-1">
                {selectedStatus.value === 'active' && 'User can access all features according to their plan'}
                {selectedStatus.value === 'inactive' && 'User account is temporarily disabled'}
                {selectedStatus.value === 'suspended' && 'User account is suspended due to policy violations'}
              </p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding User...' : 'Add User'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
