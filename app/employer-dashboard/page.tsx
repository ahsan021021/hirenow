import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Search, Users, CreditCard, Building } from "lucide-react"

export default function EmployerDashboard() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar userType="employer" />
      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, TechCorp Pakistan!</p>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600">
            <Search className="mr-2 h-4 w-4" /> Search Candidates
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Premium</div>
              <p className="text-xs text-muted-foreground">Valid until June 15, 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Profiles</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">5 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 closing soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">12 new applications</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="matches">
            <TabsList className="mb-4">
              <TabsTrigger value="matches">Top Matches</TabsTrigger>
              <TabsTrigger value="boosted">Boosted Profiles</TabsTrigger>
              <TabsTrigger value="saved">Saved Profiles</TabsTrigger>
            </TabsList>
            <TabsContent value="matches">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((candidate) => (
                  <Card key={candidate}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Frontend Developer</CardTitle>
                          <p className="text-sm text-muted-foreground">5 years experience</p>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 font-bold">
                          92%
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge>React</Badge>
                          <Badge>TypeScript</Badge>
                          <Badge>Next.js</Badge>
                          <Badge>UI/UX</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">Lahore, Pakistan</p>
                          <Button size="sm">View Profile</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="boosted">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((candidate) => (
                  <Card key={candidate} className="border-cyan-500">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">UI/UX Designer</CardTitle>
                            <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Boosted
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">3 years experience</p>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 font-bold">
                          88%
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge>Figma</Badge>
                          <Badge>Adobe XD</Badge>
                          <Badge>Prototyping</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">Karachi, Pakistan</p>
                          <Button size="sm">View Profile</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="saved">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4].map((candidate) => (
                  <Card key={candidate}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Backend Developer</CardTitle>
                          <p className="text-sm text-muted-foreground">4 years experience</p>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 font-bold">
                          85%
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge>Node.js</Badge>
                          <Badge>Express</Badge>
                          <Badge>MongoDB</Badge>
                          <Badge>AWS</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">Islamabad, Pakistan</p>
                          <Button size="sm">View Profile</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
