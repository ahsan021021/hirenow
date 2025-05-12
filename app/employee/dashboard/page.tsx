"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EmployeeDashboardLayout } from "@/components/layouts/employee-dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import {
  User,
  Briefcase,
  MessageSquare,
  BarChart,
  Eye,
  Zap,
  ChevronRight,
  MapPin,
  Building,
  Clock,
  DollarSign,
} from "lucide-react"

export default function EmployeeDashboard() {
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
    <EmployeeDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back, {user?.name}</h2>
            <p className="text-slate-400">Here's what's happening with your profile today.</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
            <Zap className="mr-2 h-4 w-4" /> Boost Profile
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
                <CardTitle className="text-sm font-medium text-slate-400">Profile Views</CardTitle>
                <Eye className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">127</div>
                <p className="dashboard-stat-label">+14% from last week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Job Matches</CardTitle>
                <Briefcase className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">23</div>
                <p className="dashboard-stat-label">5 new matches</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">8</div>
                <p className="dashboard-stat-label">3 unread messages</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Profile Strength</CardTitle>
                <BarChart className="h-4 w-4 text-cyan-500" />
              </CardHeader>
              <CardContent>
                <div className="dashboard-stat">75%</div>
                <Progress value={75} className="mt-2 bg-slate-700" />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-slate-700">
              Job Matches
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-slate-700">
              Messages
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-slate-700">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="dashboard-card col-span-4">
                <CardHeader>
                  <CardTitle className="text-white">Profile Completion</CardTitle>
                  <CardDescription className="text-slate-400">
                    Complete your profile to increase visibility to employers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Overall Completion</span>
                      <span className="text-sm font-medium text-white">75%</span>
                    </div>
                    <Progress value={75} className="h-2 bg-slate-700" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Personal Info</span>
                        <span className="text-sm text-slate-400">100%</span>
                      </div>
                      <Progress value={100} className="h-1.5 bg-slate-700" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Skills</span>
                        <span className="text-sm text-slate-400">80%</span>
                      </div>
                      <Progress value={80} className="h-1.5 bg-slate-700" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Experience</span>
                        <span className="text-sm text-slate-400">60%</span>
                      </div>
                      <Progress value={60} className="h-1.5 bg-slate-700" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Education</span>
                        <span className="text-sm text-slate-400">100%</span>
                      </div>
                      <Progress value={100} className="h-1.5 bg-slate-700" />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">
                    Complete Your Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="dashboard-card col-span-3">
                <CardHeader>
                  <CardTitle className="text-white">Boost Status</CardTitle>
                  <CardDescription className="text-slate-400">
                    Boost your profile to get more visibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="mb-4 h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Your profile is not boosted</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Get up to 5x more profile views and increase your chances of getting hired
                    </p>
                    <Button className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                      Boost Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="dashboard-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Recent Job Matches</CardTitle>
                      <CardDescription className="text-slate-400">
                        Jobs that match your skills and preferences
                      </CardDescription>
                    </div>
                    <Button variant="link" className="text-cyan-500 hover:text-cyan-400 p-0">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((job) => (
                      <div
                        key={job}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded bg-slate-800 flex items-center justify-center text-white font-bold">
                            TC
                          </div>
                          <div>
                            <h3 className="font-medium text-white">Senior React Developer</h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                              <div className="flex items-center">
                                <Building className="mr-1 h-3 w-3" />
                                <span>TechCorp Pakistan</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>Lahore</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="mr-1 h-3 w-3" />
                                <span>PKR 150K - 250K</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>Posted 2 days ago</span>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                React
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                TypeScript
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Next.js
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                          Apply Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="jobs">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">All Job Matches</CardTitle>
                <CardDescription className="text-slate-400">
                  Jobs that match your skills and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((job) => (
                    <div
                      key={job}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded bg-slate-800 flex items-center justify-center text-white font-bold">
                          {job % 2 === 0 ? "AC" : "TC"}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {job % 2 === 0 ? "Frontend Developer" : "React Native Developer"}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                            <div className="flex items-center">
                              <Building className="mr-1 h-3 w-3" />
                              <span>{job % 2 === 0 ? "Acme Inc" : "TechCorp Pakistan"}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              <span>{job % 2 === 0 ? "Karachi" : "Lahore"}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="mr-1 h-3 w-3" />
                              <span>PKR {job % 2 === 0 ? "100K - 180K" : "150K - 250K"}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>Posted {job} days ago</span>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {job % 2 === 0 ? (
                              <>
                                <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                  JavaScript
                                </Badge>
                                <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                  HTML/CSS
                                </Badge>
                                <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                  Vue.js
                                </Badge>
                              </>
                            ) : (
                              <>
                                <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                  React
                                </Badge>
                                <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                  TypeScript
                                </Badge>
                                <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                  Mobile
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Messages</CardTitle>
                <CardDescription className="text-slate-400">Your conversations with employers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3].map((message) => (
                    <div key={message} className="flex items-start gap-4 border-b border-slate-800 pb-6">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt="Employer" />
                        <AvatarFallback className="bg-slate-800 text-white">
                          {message === 1 ? "SK" : message === 2 ? "AI" : "MR"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-white">
                            {message === 1
                              ? "Sarah Khan, HR Manager"
                              : message === 2
                                ? "Ali Imran, CTO"
                                : "Muhammad Raza, CEO"}
                          </h4>
                          <span className="text-xs text-slate-400">{message} days ago</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">
                          {message === 1
                            ? "Hi there, I came across your profile and was impressed with your skills. Would you be interested in discussing a potential opportunity at our company?"
                            : message === 2
                              ? "Thanks for applying to our Frontend Developer position. Your experience looks great! Are you available for an interview next week?"
                              : "We'd like to invite you for a second interview with our team. Please let me know your availability for next Monday or Tuesday."}
                        </p>
                        <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                          Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-slate-400">Your recent actions and profile activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-white">
                        You applied for <span className="font-medium">Senior React Developer</span> at TechCorp Pakistan
                      </p>
                      <p className="text-sm text-slate-400">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Eye className="h-4 w-4 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-white">
                        Your profile was viewed by <span className="font-medium">Sarah Khan</span> from Acme Inc
                      </p>
                      <p className="text-sm text-slate-400">Yesterday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-white">
                        You received a message from <span className="font-medium">Ali Imran</span> at TechCorp Pakistan
                      </p>
                      <p className="text-sm text-slate-400">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-white">You updated your profile skills</p>
                      <p className="text-sm text-slate-400">3 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-white">
                        You applied for <span className="font-medium">Frontend Developer</span> at Acme Inc
                      </p>
                      <p className="text-sm text-slate-400">5 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeDashboardLayout>
  )
}
