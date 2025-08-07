"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useAdminStore } from '@/lib/admin-store'
import { Upload, X, FileText, Image, Plus } from 'lucide-react'
import { toast } from 'sonner'

interface AddTemplateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTemplateModal({ open, onOpenChange }: AddTemplateModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    newCategory: '',
    description: '',
    tags: '',
    price: '',
    isPremium: false,
    templateFile: null as File | null,
    previewImage: null as File | null
  })
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { addTemplate, categories, addCategory, addActivity } = useAdminStore()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'template' | 'preview') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (type === 'template') {
      // Accept PDF, DOC, DOCX files for templates
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      const allowedExtensions = ['.pdf', '.doc', '.docx']
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
      
      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        toast.error('Please upload a valid template file (PDF, DOC, DOCX)')
        return
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Template file size must be less than 10MB')
        return
      }

      setFormData(prev => ({ ...prev, templateFile: file }))
      toast.success('Template file uploaded successfully')
    } else {
      // Accept image files for preview
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, WebP, SVG)')
        return
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Preview image size must be less than 5MB')
        return
      }

      setFormData(prev => ({ ...prev, previewImage: file }))
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      toast.success('Preview image uploaded successfully')
    }
  }

  const createNewCategory = () => {
    if (formData.newCategory.trim()) {
      addCategory(formData.newCategory.trim())
      setFormData(prev => ({ 
        ...prev, 
        category: formData.newCategory.trim(),
        newCategory: ''
      }))
      setShowNewCategory(false)
      toast.success('New category created successfully!')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Template name is required')
      return
    }
    
    if (!formData.category) {
      toast.error('Please select a category')
      return
    }

    if (!formData.templateFile) {
      toast.error('Please upload a template file')
      return
    }

    if (!formData.previewImage) {
      toast.error('Please upload a preview image')
      return
    }

    setIsLoading(true)

    try {
      const newTemplate = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        price: formData.price ? parseFloat(formData.price) : 0,
        isPremium: formData.isPremium,
        templateFile: {
          name: formData.templateFile.name,
          size: formData.templateFile.size,
          type: formData.templateFile.type,
          url: URL.createObjectURL(formData.templateFile)
        },
        previewImage: {
          name: formData.previewImage.name,
          size: formData.previewImage.size,
          type: formData.previewImage.type,
          url: previewUrl
        },
        status: 'active' as const,
        downloads: 0,
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      addTemplate(newTemplate)
      addActivity({
        id: Date.now().toString(),
        type: 'template_added',
        description: `New template "${formData.name}" added to ${formData.category} category`,
        timestamp: new Date().toISOString(),
        user: 'Admin'
      })

      toast.success('Template added successfully!')
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        newCategory: '',
        description: '',
        tags: '',
        price: '',
        isPremium: false,
        templateFile: null,
        previewImage: null
      })
      setPreviewUrl('')
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to add template')
      console.error('Error adding template:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-500" />
    } else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      return <FileText className="h-5 w-5 text-blue-500" />
    }
    return <FileText className="h-5 w-5 text-gray-500" />
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Template</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Template Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Template Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter template name"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            {!showNewCategory ? (
              <div className="flex gap-2">
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    if (value === 'create-new') {
                      setShowNewCategory(true)
                    } else {
                      setFormData(prev => ({ ...prev, category: value }))
                    }
                  }}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="create-new">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Create New Category
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={formData.newCategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, newCategory: e.target.value }))}
                  placeholder="Enter new category name"
                  className="flex-1"
                />
                <Button type="button" onClick={createNewCategory} size="sm">
                  Add
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowNewCategory(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Template File Upload */}
          <div className="space-y-2">
            <Label>Template File * (PDF, DOC, DOCX)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => handleFileUpload(e, 'template')}
                className="hidden"
                id="template-upload"
              />
              <label htmlFor="template-upload" className="cursor-pointer">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload template file or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </div>
              </label>
              
              {formData.templateFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getFileIcon(formData.templateFile)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {formData.templateFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(formData.templateFile.size)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, templateFile: null }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Image Upload */}
          <div className="space-y-2">
            <Label>Preview Image * (JPEG, PNG, WebP, SVG)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={(e) => handleFileUpload(e, 'preview')}
                className="hidden"
                id="preview-upload"
              />
              <label htmlFor="preview-upload" className="cursor-pointer">
                <div className="text-center">
                  <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload preview image or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPEG, PNG, WebP, SVG up to 5MB
                  </p>
                </div>
              </label>
              
              {previewUrl && (
                <div className="mt-4">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-32 object-cover rounded-lg mx-auto"
                  />
                  <div className="mt-2 text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, previewImage: null }))
                        setPreviewUrl('')
                      }}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter template description"
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="professional, modern, creative"
            />
            {formData.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.tags.split(',').map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Premium Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="premium">Premium Template</Label>
                <p className="text-sm text-gray-500">
                  Mark as premium to require subscription
                </p>
              </div>
              <Switch
                id="premium"
                checked={formData.isPremium}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPremium: checked }))}
              />
            </div>

            {formData.isPremium && (
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="9.99"
                />
              </div>
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
              {isLoading ? 'Adding Template...' : 'Add Template'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
