"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { getEmployerDashboardStats, getApplicationStats } from "@/app/services/analyticsService"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AnalyticsPage() {
  const [dashboardStats, setDashboardStats] = useState(null)
  const [applicationStats, setApplicationStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [dashboardResponse, applicationResponse] = await Promise.all([
        getEmployerDashboardStats(),
        getApplicationStats(),
      ])
      setDashboardStats(dashboardResponse)
      setApplicationStats(applicationResponse)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  if (loading) {
    return (
      <EmployerDashboardLayout>
        <div className="container mx-auto py-6">
          <div className="space-y-6">
            <div className="h-8 w-64 bg-slate-800 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-800 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-80 bg-slate-800 rounded animate-pulse"></div>
          </div>
        </div>
      </EmployerDashboardLayout>
    )
  }

  return (
    <EmployerDashboardLayout>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-slate-400 mt-2">Track your hiring performance and optimize your recruitment process</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-slate-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Active Jobs</CardTitle>
                    <CardDescription>Currently active job postings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{dashboardStats?.activeJobsCount || 0}</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Total Applications</CardTitle>
                    <CardDescription>Applications received</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{dashboardStats?.totalApplicationsCount || 0}</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">New Applications</CardTitle>
                    <CardDescription>Applications this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{dashboardStats?.newApplicationsCount || 0}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Application Trend */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Application Trend</CardTitle>
                  <CardDescription>Applications received over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {dashboardStats?.applicationTrend && (
                      <ChartContainer
                        config={{
                          count: {
                            label: "Applications",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="h-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={dashboardStats.applicationTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="var(--color-count)" activeDot={{ r: 8 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Top Jobs */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Jobs</CardTitle>
                  <CardDescription>Jobs with the most applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {dashboardStats?.topJobs && (
                      <ChartContainer
                        config={{
                          applicationsCount: {
                            label: "Applications",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={dashboardStats.topJobs}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="title" width={150} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="applicationsCount" fill="var(--color-applicationsCount)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              {/* Application Status Distribution */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Application Status Distribution</CardTitle>
                  <CardDescription>Breakdown of applications by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {applicationStats?.statusStats && (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={applicationStats.statusStats.map((item) => ({
                              name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
                              value: item.count,
                            }))}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {applicationStats.statusStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Average Time to Hire */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Hiring Efficiency</CardTitle>
                  <CardDescription>Average time to hire candidates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-40">
                    <div className="text-5xl font-bold text-white">
                      {applicationStats?.avgTimeToHire ? applicationStats.avgTimeToHire.toFixed(1) : "0"}
                    </div>
                    <div className="text-slate-400 mt-2">Average days to hire</div>
                  </div>
                </CardContent>
              </Card>

              {/* Applications by Job */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Applications by Job</CardTitle>
                  <CardDescription>Number of applications per job posting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {applicationStats?.applicationsByJob && (
                      <ChartContainer
                        config={{
                          count: {
                            label: "Applications",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="h-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={applicationStats.applicationsByJob}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="jobTitle" width={150} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="count" fill="var(--color-count)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-6">
              {/* Job Performance */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Job Performance</CardTitle>
                  <CardDescription>View detailed performance metrics for individual jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 mb-4">
                    Select a job from your dashboard to view detailed performance metrics.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => router.push("/employer/jobs")}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                      Go to Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </EmployerDashboardLayout>
  )
}
