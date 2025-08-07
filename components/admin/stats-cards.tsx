"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminStats } from '@/lib/admin-store'
import { Users, DollarSign, FileText, TrendingUp } from 'lucide-react'

interface StatsCardsProps {
  stats: AdminStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.userGrowth}%`,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: '+12.5%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Total Revenue',
      value: `$${(stats.totalRevenue / 1000).toFixed(0)}k`,
      change: '+23.1%',
      icon: DollarSign,
      color: 'text-yellow-600'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      change: '+2.3%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {card.change} from last month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
