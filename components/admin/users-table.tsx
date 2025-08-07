"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAdminStore, User } from '@/lib/admin-store'
import { MoreHorizontal, Edit, Trash2, Ban, CheckCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
  const { updateUser, deleteUser } = useAdminStore()

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    updateUser(userId, { status: newStatus })
  }

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId)
    }
  }

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-gray-100 text-gray-800'
      case 'Suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan: User['plan']) => {
    switch (plan) {
      case 'Free': return 'bg-gray-100 text-gray-800'
      case 'Pro': return 'bg-blue-100 text-blue-800'
      case 'Premium': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Plan</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Resumes</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </td>
              <td className="py-3 px-4">
                <Badge className={getPlanColor(user.plan)}>
                  {user.plan}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <Badge className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </td>
              <td className="py-3 px-4 text-gray-900">
                {user.resumesCreated}
              </td>
              <td className="py-3 px-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    {user.status === 'Active' ? (
                      <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'Suspended')}>
                        <Ban className="h-4 w-4 mr-2" />
                        Suspend
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'Active')}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Activate
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
