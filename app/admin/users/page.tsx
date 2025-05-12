"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminDashboardLayout } from "@/components/layouts/admin-dashboard-layout"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, ChevronDown, UserPlus } from "lucide-react"
import { getUsers } from "@/lib/mock-data"

export default function UsersManagementPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Get mock users data
  const [users, setUsers] = useState(getUsers())

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStatusChange = (id: number, newStatus: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)))

    toast({
      title: "User status updated",
      description: `User status has been changed to ${newStatus}.`,
    })
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))

    toast({
      title: "User deleted",
      description: "User has been deleted successfully.",
    })
  }

  return (
    <AdminDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">User Management</h2>
            <p className="text-slate-400">Manage platform users</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <Button
            variant="outline"
            className="border-slate-700 text-white hover:bg-slate-800 md:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {showFilters && (
          <Card className="dashboard-card">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-white">Role</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">All Roles</option>
                    <option value="employee">Employee</option>
                    <option value="employer">Employer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Status</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Joined Date</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
              All Users
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-slate-700">
              Employees
            </TabsTrigger>
            <TabsTrigger value="employers" className="data-[state=active]:bg-slate-700">
              Employers
            </TabsTrigger>
            <TabsTrigger value="admins" className="data-[state=active]:bg-slate-700">
              Admins
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <UserTable users={filteredUsers} onStatusChange={handleStatusChange} onDelete={handleDeleteUser} />
          </TabsContent>

          <TabsContent value="employees">
            <UserTable
              users={filteredUsers.filter((user) => user.role === "employee")}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteUser}
            />
          </TabsContent>

          <TabsContent value="employers">
            <UserTable
              users={filteredUsers.filter((user) => user.role === "employer")}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteUser}
            />
          </TabsContent>

          <TabsContent value="admins">
            <UserTable
              users={filteredUsers.filter((user) => user.role === "admin")}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteUser}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  )
}

type User = {
  id: number
  name: string
  email: string
  role: string
  status: string
  joinedDate: string
  lastActive: string
  avatar: string
}

function UserTable({
  users,
  onStatusChange,
  onDelete,
}: {
  users: User[]
  onStatusChange: (id: number, status: string) => void
  onDelete: (id: number) => void
}) {
  return (
    <Card className="dashboard-card">
      <CardContent className="p-0">
        {users.length > 0 ? (
          <div className="rounded-lg border border-slate-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800">
                  <th className="px-4 py-3 text-left font-medium text-white">User</th>
                  <th className="px-4 py-3 text-left font-medium text-white">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-white">Role</th>
                  <th className="px-4 py-3 text-left font-medium text-white">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-white">Joined</th>
                  <th className="px-4 py-3 text-left font-medium text-white">Last Active</th>
                  <th className="px-4 py-3 text-left font-medium text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((user) => (
                  <tr key={user.id} className="bg-slate-900 hover:bg-slate-800/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-800 overflow-hidden">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-500/10 text-purple-500"
                            : user.role === "employer"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-green-500/10 text-green-500"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={user.status}
                        onChange={(e) => onStatusChange(user.id, e.target.value)}
                        className={`rounded-full px-2.5 py-1 text-xs font-medium border-0 ${
                          user.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : user.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : user.status === "suspended"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-slate-500/10 text-slate-500"
                        }`}
                      >
                        <option value="active" className="bg-slate-800 text-green-500">
                          Active
                        </option>
                        <option value="pending" className="bg-slate-800 text-yellow-500">
                          Pending
                        </option>
                        <option value="suspended" className="bg-slate-800 text-red-500">
                          Suspended
                        </option>
                        <option value="inactive" className="bg-slate-800 text-slate-500">
                          Inactive
                        </option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{user.joinedDate}</td>
                    <td className="px-4 py-3 text-slate-300">{user.lastActive}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                          <span className="sr-only">Edit</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                          onClick={() => onDelete(user.id)}
                        >
                          <span className="sr-only">Delete</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-slate-400">No users found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
