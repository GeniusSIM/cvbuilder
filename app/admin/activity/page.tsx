"use client"

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/admin-header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download } from 'lucide-react'
import { useAdminStore } from '@/lib/admin-store'

export default function AdminActivityPage() {
  const { activityLogs } = useAdminStore()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLogs = activityLogs.filter(log =>
    log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getActionBadge = (action: string) => {
    switch (action.toLowerCase()) {
      case 'created':
        return <Badge className="bg-green-100 text-green-800">Created</Badge>
      case 'updated':
        return <Badge className="bg-blue-100 text-blue-800">Updated</Badge>
      case 'deleted':
        return <Badge className="bg-red-100 text-red-800">Deleted</Badge>
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Activity Logs" 
        subtitle="Monitor all system activities and user actions"
      />

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{log.userName}</span>
                    {getActionBadge(log.action)}
                    <span className="text-gray-600">{log.resource}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                    <span>IP: {log.ipAddress}</span>
                    <span>ID: {log.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
