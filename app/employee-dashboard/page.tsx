import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MessageSquare, Zap, Activity, User } from "lucide-react"

export default function EmployeeDashboard() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar userType="employee" />
      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Asad!</p>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600">
            <Zap className="mr-2 h-4 w-4" /> Boost Profile
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+14% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 new since yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Boost Status</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Inactive</div>
              <p className="text-xs text-muted-foreground">Boost your profile for more visibility</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Activity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Medium</div>
              <p className="text-xs text-muted-foreground">Complete your profile to increase activity</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Completion</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Personal Info</span>
                      <span className="text-sm">100%</span>
                    </div>
                    <Progress value={100} className="h-1.5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Skills</span>
                      <span className="text-sm">80%</span>
                    </div>
                    <Progress value={80} className="h-1.5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Experience</span>
                      <span className="text-sm">60%</span>
                    </div>
                    <Progress value={60} className="h-1.5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Education</span>
                      <span className="text-sm">100%</span>
                    </div>
                    <Progress value={100} className="h-1.5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="suggestions">
            <TabsList className="mb-4">
              <TabsTrigger value="suggestions">Job Suggestions</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            <TabsContent value="suggestions">
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((job) => (
                  <Card key={job}>
                    <CardHeader>
                      <CardTitle className="text-lg">Senior Frontend Developer</CardTitle>
                      <p className="text-sm text-muted-foreground">TechCorp Pakistan • Lahore</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        Looking for an experienced frontend developer with React expertise. Competitive salary and
                        benefits.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge>React</Badge>
                        <Badge>TypeScript</Badge>
                        <Badge>UI/UX</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                        <Button variant="outline" size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((message) => (
                      <div key={message} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-medium">Sarah Khan, HR Manager</h4>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Hi Asad, I came across your profile and was impressed with your skills. Would you be
                            interested in discussing a potential opportunity at our company?
                          </p>
                          <Button variant="outline" size="sm">
                            Reply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">{children}</span>
  )
}
