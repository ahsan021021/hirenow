"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { Users, CreditCard, Plus, ChevronRight, MapPin, Briefcase, Star, Clock } from "lucide-react"

export default function EmployerDashboard() {
  const { user } = useAuth()
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
    <EmployerDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back, {user?.name}</h2>
            <p className="text-slate-400">Here's what's happening with your recruitment.</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Post a Job
          </Button>
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
                <CardTitle className="text-sm font-medium text-slate-400">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">7</div>
                <p className="dashboard-stat-label">2 closing soon</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Total Applicants</CardTitle>
                <Users className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">142</div>
                <p className="dashboard-stat-label">+23 this week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Subscription</CardTitle>
                <CreditCard className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">Premium</div>
                <p className="dashboard-stat-label">Valid until June 2025</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Saved Profiles</CardTitle>
                <Star className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">24</div>
                <p className="dashboard-stat-label">5 new matches</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <Tabs defaultValue="candidates" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="candidates" className="data-[state=active]:bg-slate-700">
              Top Candidates
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-slate-700">
              Active Jobs
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-slate-700">
              Recent Applications
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="candidates" className="space-y-6">
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[1, 2, 3, 4, 5, 6].map((candidate) => (
                <Card key={candidate} className="dashboard-card">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt="Candidate" />
                          <AvatarFallback className="bg-slate-800 text-white">
                            {candidate % 2 === 0 ? "AK" : "SR"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-white">
                            {candidate % 2 === 0 ? "Ahmed Khan" : "Sara Rizvi"}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {candidate % 2 === 0 ? "Frontend Developer" : "UI/UX Designer"}
                          </p>
                        </div>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-500 font-medium text-sm">
                        {candidate % 2 === 0 ? "92%" : "88%"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {candidate % 2 === 0 ? (
                        <>
                          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                            React
                          </Badge>
                          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                            TypeScript
                          </Badge>
                          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                            Next.js
                          </Badge>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                            Figma
                          </Badge>
                          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                            UI Design
                          </Badge>
                          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                            Prototyping
                          </Badge>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-slate-400">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{candidate % 2 === 0 ? "Lahore" : "Karachi"}</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <div className="flex justify-center">
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                View All Candidates <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Active Job Listings</CardTitle>
                <CardDescription className="text-slate-400">Manage your current job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((job) => (
                    <div
                      key={job}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6"
                    >
                      <div>
                        <h3 className="font-medium text-white">
                          {job === 1
                            ? "Senior React Developer"
                            : job === 2
                              ? "UI/UX Designer"
                              : job === 3
                                ? "Full Stack Developer"
                                : "Product Manager"}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>
                              {job === 1 ? "Lahore" : job === 2 ? "Remote" : job === 3 ? "Islamabad" : "Karachi"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Posted {job * 2} days ago</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            <span>{job * 10 + 5} applicants</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                          View Applicants
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Recent Applications</CardTitle>
                <CardDescription className="text-slate-400">
                  Candidates who recently applied to your jobs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((application) => (
                    <div key={application} className="flex items-start gap-4 border-b border-slate-800 pb-6">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="Applicant" />
                        <AvatarFallback className="bg-slate-800 text-white">
                          {application % 3 === 0 ? "MK" : application % 3 === 1 ? "FA" : "ZA"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-white">
                              {application % 3 === 0
                                ? "Muhammad Khan"
                                : application % 3 === 1
                                  ? "Fatima Ali"
                                  : "Zain Ahmed"}
                            </h4>
                            <p className="text-sm text-slate-400">
                              Applied for{" "}
                              <span className="font-medium text-white">
                                {application % 3 === 0
                                  ? "Senior React Developer"
                                  : application % 3 === 1
                                    ? "UI/UX Designer"
                                    : "Full Stack Developer"}
                              </span>
                            </p>
                          </div>
                          <span className="text-xs text-slate-400">
                            {application} day{application !== 1 ? "s" : ""} ago
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {application % 3 === 0 ? (
                            <>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                React
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                TypeScript
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                5 years exp
                              </Badge>
                            </>
                          ) : application % 3 === 1 ? (
                            <>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Figma
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                UI Design
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                3 years exp
                              </Badge>
                            </>
                          ) : (
                            <>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Node.js
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                MongoDB
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                4 years exp
                              </Badge>
                            </>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                          >
                            Review
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-700 text-white hover:bg-slate-800"
                          >
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Recruitment Analytics</CardTitle>
                <CardDescription className="text-slate-400">Overview of your recruitment performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-slate-400">Average Time to Hire</h3>
                      <div className="text-2xl font-bold text-white">18 days</div>
                      <p className="text-xs text-green-500">↓ 12% from last month</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-slate-400">Application Completion Rate</h3>
                      <div className="text-2xl font-bold text-white">78%</div>
                      <p className="text-xs text-green-500">↑ 5% from last month</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-slate-400">Candidate Quality Score</h3>
                      <div className="text-2xl font-bold text-white">8.4/10</div>
                      <p className="text-xs text-green-500">↑ 0.6 from last month</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 p-6">
                    <h3 className="mb-4 text-lg font-medium text-white">Applications by Job</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Senior React Developer</span>
                          <span className="text-sm text-white">45 applications</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">UI/UX Designer</span>
                          <span className="text-sm text-white">32 applications</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Full Stack Developer</span>
                          <span className="text-sm text-white">28 applications</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: "50%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Product Manager</span>
                          <span className="text-sm text-white">18 applications</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployerDashboardLayout>
  )
}
