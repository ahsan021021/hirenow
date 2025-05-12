"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  MapPin,
  Clock,
  Users,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function JobsManagement() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  const handleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter((s) => s !== status))
    } else {
      setStatusFilter([...statusFilter, status])
    }
  }

  const clearFilters = () => {
    setStatusFilter([])
  }

  return (
    <EmployerDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Manage Jobs</h2>
            <p className="text-slate-400">Create, edit, and track your job listings</p>
          </div>
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            onClick={() => router.push("/employer/post-job")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search job titles or keywords"
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
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-white mb-2">Job Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Active", "Draft", "Paused", "Closed", "Expired"].map((status) => (
                      <Badge
                        key={status}
                        variant={statusFilter.includes(status) ? "default" : "outline"}
                        className={
                          statusFilter.includes(status)
                            ? "bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer"
                            : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 cursor-pointer"
                        }
                        onClick={() => handleStatusFilter(status)}
                      >
                        {status}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
              All Jobs
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-slate-700">
              Active
            </TabsTrigger>
            <TabsTrigger value="draft" className="data-[state=active]:bg-slate-700">
              Draft
            </TabsTrigger>
            <TabsTrigger value="closed" className="data-[state=active]:bg-slate-700">
              Closed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((job) => (
                <Card key={job} className="dashboard-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-white">
                            {job === 1
                              ? "Senior React Developer"
                              : job === 2
                                ? "UI/UX Designer"
                                : job === 3
                                  ? "Full Stack Developer"
                                  : job === 4
                                    ? "Product Manager"
                                    : "DevOps Engineer"}
                          </h3>
                          <Badge
                            className={
                              job === 1
                                ? "bg-green-500/20 text-green-500"
                                : job === 2
                                  ? "bg-green-500/20 text-green-500"
                                  : job === 3
                                    ? "bg-yellow-500/20 text-yellow-500"
                                    : job === 4
                                      ? "bg-slate-500/20 text-slate-400"
                                      : "bg-red-500/20 text-red-500"
                            }
                          >
                            {job === 1
                              ? "Active"
                              : job === 2
                                ? "Active"
                                : job === 3
                                  ? "Draft"
                                  : job === 4
                                    ? "Closed"
                                    : "Expired"}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>
                              {job === 1
                                ? "Lahore"
                                : job === 2
                                  ? "Remote"
                                  : job === 3
                                    ? "Islamabad"
                                    : job === 4
                                      ? "Karachi"
                                      : "Lahore"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Posted {job * 2} days ago</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            <span>
                              {job === 1
                                ? "42 applicants"
                                : job === 2
                                  ? "28 applicants"
                                  : job === 3
                                    ? "0 applicants"
                                    : job === 4
                                      ? "15 applicants"
                                      : "8 applicants"}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job === 1 ? (
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
                          ) : job === 2 ? (
                            <>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Figma
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                UI Design
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                UX Research
                              </Badge>
                            </>
                          ) : job === 3 ? (
                            <>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Node.js
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                React
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                MongoDB
                              </Badge>
                            </>
                          ) : job === 4 ? (
                            <>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Product Management
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Agile
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Scrum
                              </Badge>
                            </>
                          ) : (
                            <>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                AWS
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Docker
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Kubernetes
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col gap-2">
                        <div className="dropdown relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-400 hover:text-white hover:bg-slate-800"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                          <div className="dropdown-menu absolute right-0 mt-2 w-48 rounded-md bg-slate-800 border border-slate-700 shadow-lg hidden">
                            <div className="py-1">
                              <a
                                href="#"
                                className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Job
                              </a>
                              <a
                                href="#"
                                className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Job
                              </a>
                              <a
                                href="#"
                                className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </a>
                              <a
                                href="#"
                                className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-slate-700"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-slate-700 text-white hover:bg-slate-800"
                          onClick={() => router.push(`/employer/jobs/${job}/applicants`)}
                        >
                          View Applicants
                        </Button>
                        <Button
                          variant="outline"
                          className="border-slate-700 text-white hover:bg-slate-800"
                          onClick={() => router.push(`/employer/jobs/${job}/edit`)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="space-y-6">
              {[1, 2].map((job) => (
                <Card key={job} className="dashboard-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-white">
                            {job === 1 ? "Senior React Developer" : "UI/UX Designer"}
                          </h3>
                          <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>{job === 1 ? "Lahore" : "Remote"}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Posted {job * 2} days ago</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            <span>{job === 1 ? "42 applicants" : "28 applicants"}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job === 1 ? (
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
                                UX Research
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col gap-2">
                        <Button
                          variant="outline"
                          className="border-slate-700 text-white hover:bg-slate-800"
                          onClick={() => router.push(`/employer/jobs/${job}/applicants`)}
                        >
                          View Applicants
                        </Button>
                        <Button
                          variant="outline"
                          className="border-slate-700 text-white hover:bg-slate-800"
                          onClick={() => router.push(`/employer/jobs/${job}/edit`)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <div className="space-y-6">
              <Card className="dashboard-card">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-white">Full Stack Developer</h3>
                        <Badge className="bg-yellow-500/20 text-yellow-500">Draft</Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>Islamabad</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>Last edited 3 days ago</span>
                        </div>
                        <div className="flex items-center">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          <span>Not published</span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                          Node.js
                        </Badge>
                        <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                          React
                        </Badge>
                        <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                          MongoDB
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2">
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Publish
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-700 text-white hover:bg-slate-800"
                        onClick={() => router.push(`/employer/jobs/3/edit`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="closed">
            <div className="space-y-6">
              {[4, 5].map((job) => (
                <Card key={job} className="dashboard-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-white">
                            {job === 4 ? "Product Manager" : "DevOps Engineer"}
                          </h3>
                          <Badge
                            className={job === 4 ? "bg-slate-500/20 text-slate-400" : "bg-red-500/20 text-red-500"}
                          >
                            {job === 4 ? "Closed" : "Expired"}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>{job === 4 ? "Karachi" : "Lahore"}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{job === 4 ? "Closed 5 days ago" : "Expired 2 days ago"}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            <span>{job === 4 ? "15 applicants" : "8 applicants"}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job === 4 ? (
                            <>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Product Management
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Agile
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Scrum
                              </Badge>
                            </>
                          ) : (
                            <>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                AWS
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Docker
                              </Badge>
                              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                                Kubernetes
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col gap-2">
                        <Button
                          variant="outline"
                          className="border-slate-700 text-white hover:bg-slate-800"
                          onClick={() => router.push(`/employer/jobs/${job}/applicants`)}
                        >
                          View Applicants
                        </Button>
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                          <Copy className="mr-2 h-4 w-4" />
                          Repost
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
              1
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
              2
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
              3
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
              Next
            </Button>
          </div>
        </div>
      </div>
    </EmployerDashboardLayout>
  )
}
