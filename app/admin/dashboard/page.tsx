"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminDashboardLayout } from "@/components/layouts/admin-dashboard-layout"
import { Users, Building, CreditCard, BarChart, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <AdminDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h2>
            <p className="text-slate-400">Platform overview and management</p>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
        >
          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Total Users</CardTitle>
                <Users className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">15,482</div>
                <p className="dashboard-stat-label">+124 this week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Companies</CardTitle>
                <Building className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">542</div>
                <p className="dashboard-stat-label">+18 this week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">PKR 245,320</div>
                <p className="dashboard-stat-label">+12% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Active Jobs</CardTitle>
                <BarChart className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">1,245</div>
                <p className="dashboard-stat-label">+85 this week</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-700">
              Users
            </TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-slate-700">
              Companies
            </TabsTrigger>
            <TabsTrigger value="approvals" className="data-[state=active]:bg-slate-700">
              Pending Approvals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-white">User Growth</CardTitle>
                  <CardDescription className="text-slate-400">New user registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 rounded-lg bg-slate-800 flex items-center justify-center">
                    <p className="text-slate-400">User Growth Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-white">Revenue</CardTitle>
                  <CardDescription className="text-slate-400">Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 rounded-lg bg-slate-800 flex items-center justify-center">
                    <p className="text-slate-400">Revenue Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Platform Statistics</CardTitle>
                <CardDescription className="text-slate-400">Key metrics and performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-400">Job Match Rate</h3>
                    <div className="text-2xl font-bold text-white">87%</div>
                    <p className="text-xs text-green-500">↑ 3% from last month</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-400">Avg. Time to Hire</h3>
                    <div className="text-2xl font-bold text-white">14 days</div>
                    <p className="text-xs text-green-500">↓ 2 days from last month</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-400">Active Subscriptions</h3>
                    <div className="text-2xl font-bold text-white">428</div>
                    <p className="text-xs text-green-500">↑ 12 from last month</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-400">Profile Completion</h3>
                    <div className="text-2xl font-bold text-white">76%</div>
                    <p className="text-xs text-green-500">↑ 4% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-slate-400">Manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-800">
                        <th className="px-4 py-3 text-left font-medium text-white">User</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Email</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Role</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Status</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Joined</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {[1, 2, 3, 4, 5].map((user) => (
                        <tr key={user} className="hover:bg-slate-800/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" alt="User" />
                                <AvatarFallback className="bg-slate-700 text-white">
                                  {user % 2 === 0 ? "AK" : "SR"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-white">
                                {user % 2 === 0 ? "Ahmed Khan" : "Sara Rizvi"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-400">
                            {user % 2 === 0 ? "ahmed.khan@example.com" : "sara.rizvi@example.com"}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              {user % 2 === 0 ? "Employee" : "Employer"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                user % 3 === 0 ? "bg-yellow-500/20 text-yellow-500" : "bg-green-500/20 text-green-500"
                              }
                            >
                              {user % 3 === 0 ? "Pending" : "Active"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-slate-400">
                            {user % 2 === 0 ? "May 12, 2023" : "June 3, 2023"}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-slate-700 text-white hover:bg-slate-800"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-red-900/50 text-red-500 hover:bg-red-950/50 hover:text-red-400"
                              >
                                Suspend
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Company Management</CardTitle>
                <CardDescription className="text-slate-400">Manage registered companies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-800">
                        <th className="px-4 py-3 text-left font-medium text-white">Company</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Contact</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Plan</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Status</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Jobs</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {[1, 2, 3, 4, 5].map((company) => (
                        <tr key={company} className="hover:bg-slate-800/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" alt="Company" />
                                <AvatarFallback className="bg-slate-700 text-white">
                                  {company % 3 === 0 ? "TC" : company % 3 === 1 ? "AI" : "SL"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-white">
                                {company % 3 === 0
                                  ? "TechCorp Pakistan"
                                  : company % 3 === 1
                                    ? "Acme Inc"
                                    : "Systems Ltd"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-400">
                            {company % 3 === 0
                              ? "hr@techcorp.pk"
                              : company % 3 === 1
                                ? "jobs@acme.com"
                                : "careers@systems.pk"}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                company % 3 === 0
                                  ? "bg-cyan-500/20 text-cyan-500"
                                  : company % 3 === 1
                                    ? "bg-purple-500/20 text-purple-500"
                                    : "bg-blue-500/20 text-blue-500"
                              }
                            >
                              {company % 3 === 0 ? "Premium" : company % 3 === 1 ? "Enterprise" : "Basic"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                company % 4 === 0
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-green-500/20 text-green-500"
                              }
                            >
                              {company % 4 === 0 ? "Pending Verification" : "Verified"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-slate-400">{company * 3 + 2}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-slate-700 text-white hover:bg-slate-800"
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-slate-700 text-white hover:bg-slate-800"
                              >
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Pending Approvals</CardTitle>
                <CardDescription className="text-slate-400">Items requiring admin approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Profile Boost Requests</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((boost) => (
                      <div
                        key={boost}
                        className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg" alt="User" />
                            <AvatarFallback className="bg-slate-700 text-white">
                              {boost === 1 ? "MK" : boost === 2 ? "FA" : "ZA"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-white">
                              {boost === 1 ? "Muhammad Khan" : boost === 2 ? "Fatima Ali" : "Zain Ahmed"}
                            </h4>
                            <p className="text-sm text-slate-400">
                              Requested {boost === 1 ? "7 days" : boost === 2 ? "14 days" : "30 days"} boost
                            </p>
                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                              <Clock className="h-3 w-3" />
                              <span>
                                Requested {boost} hour{boost !== 1 ? "s" : ""} ago
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-red-900/50 text-red-500 hover:bg-red-950/50 hover:text-red-400"
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Company Verifications</h3>
                  <div className="space-y-4">
                    {[1, 2].map((company) => (
                      <div
                        key={company}
                        className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg" alt="Company" />
                            <AvatarFallback className="bg-slate-700 text-white">
                              {company === 1 ? "NI" : "DT"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-white">
                              {company === 1 ? "NextInnovate" : "DevTech Solutions"}
                            </h4>
                            <p className="text-sm text-slate-400">
                              {company === 1 ? "Software Development" : "IT Consulting"}
                            </p>
                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                              <AlertCircle className="h-3 w-3" />
                              <span>Pending verification for {company === 1 ? "2 days" : "1 day"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verify
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-slate-700 text-white hover:bg-slate-800"
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Reported Content</h3>
                  <div className="space-y-4">
                    {[1, 2].map((report) => (
                      <div
                        key={report}
                        className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4"
                      >
                        <div>
                          <h4 className="font-medium text-white">
                            {report === 1 ? "Inappropriate Job Description" : "Misleading Company Information"}
                          </h4>
                          <p className="text-sm text-slate-400">
                            {report === 1 ? "Job ID: #45892" : "Company: DataTech Solutions"}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                            <AlertCircle className="h-3 w-3 text-red-500" />
                            <span>Reported by {report === 1 ? "3 users" : "2 users"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-slate-700 text-white hover:bg-slate-800"
                          >
                            Review
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-red-900/50 text-red-500 hover:bg-red-950/50 hover:text-red-400"
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  )
}
