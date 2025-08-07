"use client"

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/admin-header'
import { AddTemplateModal } from '@/components/admin/add-template-modal'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAdminStore } from '@/lib/admin-store'
import { Search, Filter, Download, MoreHorizontal, Edit, Archive, Trash2, Star, Eye, FileText, Calendar, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminTemplatesPage() {
  const { templates, updateTemplate, deleteTemplate } = useAdminStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleArchive = (templateId: string) => {
    updateTemplate(templateId, { status: 'Archived' })
    toast.success('Template archived successfully')
  }

  const handleActivate = (templateId: string) => {
    updateTemplate(templateId, { status: 'Active' })
    toast.success('Template activated successfully')
  }

  const handleDelete = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      deleteTemplate(templateId)
      toast.success('Template deleted successfully')
    }
  }

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Category', 'Status', 'Usage Count', 'Created Date', 'Last Modified'],
      ...filteredTemplates.map(template => [
        template.name,
        template.category,
        template.status,
        template.usageCount.toString(),
        new Date(template.createdDate).toLocaleDateString(),
        new Date(template.lastModified).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `templates-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Templates exported successfully')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200'
      case 'Draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Archived': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return '🟢'
      case 'Draft': return '🟡'
      case 'Archived': return '⚫'
      default: return '⚪'
    }
  }

  // Calculate stats
  const totalTemplates = templates.length
  const activeTemplates = templates.filter(t => t.status === 'Active').length
  const draftTemplates = templates.filter(t => t.status === 'Draft').length
  const totalUsage = templates.reduce((sum, t) => sum + t.usageCount, 0)

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Template Management" 
        subtitle="Manage resume templates, categories, and usage analytics"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{totalTemplates}</p>
              </div>
              <FileText className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Templates</p>
                <p className="text-2xl font-bold text-green-600">{activeTemplates}</p>
              </div>
              <div className="text-2xl">🟢</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft Templates</p>
                <p className="text-2xl font-bold text-yellow-600">{draftTemplates}</p>
              </div>
              <div className="text-2xl">🟡</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-blue-600">{totalUsage.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Templates Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Templates ({filteredTemplates.length})
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Category
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Classic')}>
                    Classic
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Creative')}>
                    Creative
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Professional')}>
                    Professional
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Modern')}>
                    Modern
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Active')}>
                    🟢 Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Draft')}>
                    🟡 Draft
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Archived')}>
                    ⚫ Archived
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <AddTemplateModal />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template) => (
                  <TableRow key={template.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded border flex items-center justify-center">
                          <FileText className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{template.name}</div>
                          <div className="text-sm text-gray-500">ID: {template.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {template.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(template.status)}>
                        {getStatusIcon(template.status)} {template.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {template.usageCount.toLocaleString()}
                        </div>
                        <div className="text-gray-500">downloads</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.5</span>
                        <span className="text-xs text-gray-500">(24)</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {new Date(template.createdDate).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(template.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {new Date(template.lastModified).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500">
                          {Math.floor((Date.now() - new Date(template.lastModified).getTime()) / (1000 * 60 * 60 * 24))} days ago
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview Template
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Template
                          </DropdownMenuItem>
                          {template.status === 'Draft' && (
                            <DropdownMenuItem onClick={() => handleActivate(template.id)}>
                              <div className="h-4 w-4 mr-2">🟢</div>
                              Activate
                            </DropdownMenuItem>
                          )}
                          {template.status === 'Active' && (
                            <DropdownMenuItem onClick={() => handleArchive(template.id)}>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleDelete(template.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Template
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Get started by adding your first template'
                }
              </p>
              {!searchTerm && categoryFilter === 'all' && statusFilter === 'all' && (
                <AddTemplateModal />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
