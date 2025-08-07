"use client"

import { AdminHeader } from '@/components/admin/admin-header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts'

const analyticsData = [
  { date: '2024-01-01', users: 1200, sessions: 2400, pageViews: 4800, conversions: 48 },
  { date: '2024-01-02', users: 1350, sessions: 2700, pageViews: 5200, conversions: 52 },
  { date: '2024-01-03', users: 1180, sessions: 2200, pageViews: 4400, conversions: 44 },
  { date: '2024-01-04', users: 1420, sessions: 2800, pageViews: 5600, conversions: 58 },
  { date: '2024-01-05', users: 1680, sessions: 3200, pageViews: 6400, conversions: 64 },
  { date: '2024-01-06', users: 1550, sessions: 3100, pageViews: 6200, conversions: 62 },
  { date: '2024-01-07', users: 1750, sessions: 3500, pageViews: 7000, conversions: 70 }
]

const deviceData = [
  { device: 'Desktop', users: 8500, percentage: 65 },
  { device: 'Mobile', users: 3800, percentage: 29 },
  { device: 'Tablet', users: 780, percentage: 6 }
]

const topPages = [
  { page: '/builder', views: 15420, bounceRate: 25.3 },
  { page: '/templates', views: 12350, bounceRate: 18.7 },
  { page: '/', views: 9870, bounceRate: 35.2 },
  { page: '/checker', views: 7650, bounceRate: 22.1 },
  { page: '/pricing', views: 5430, bounceRate: 45.8 }
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Analytics" 
        subtitle="Detailed insights into user behavior and platform performance"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13,070</div>
            <p className="text-xs text-green-600">+12.5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21,900</div>
            <p className="text-xs text-green-600">+8.2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43,800</div>
            <p className="text-xs text-green-600">+15.3% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">398</div>
            <p className="text-xs text-green-600">+23.1% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis />
                <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="sessions" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="device" type="category" />
                <Tooltip />
                <Bar dataKey="users" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium">{page.page}</div>
                    <div className="text-sm text-gray-500">{page.views.toLocaleString()} views</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{page.bounceRate}%</div>
                  <div className="text-xs text-gray-500">Bounce Rate</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
