"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeDashboardLayout } from "@/components/layouts/employee-dashboard-layout"
import {
  Search,
  Filter,
  ChevronDown,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Eye,
  MessageSquare,
  XCircle,
} from "lucide-react"

export default function ApplicationsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Mock applications data
  const allApplications = [
    {
      id: 1,
      jobTitle: "Senior React Developer",
      company: "TechCorp Pakistan",
      companyLogo: "/placeholder.svg",
      location: "Lahore",
      type: "Full-time",
      salary: "PKR 150,000 - 250,000",
      appliedDate: "2 days ago",
      status: "pending",
      coverLetter:
        "I am excited to apply for the Senior React Developer position. With 5 years of experience in frontend development, I believe I would be a great fit for your team.",
    },
    {
      id: 2,
      jobTitle: "UI/UX Designer",
      company: "Acme Inc",
      companyLogo: "/placeholder.svg",
      location: "Remote",
      type: "Full-time",
      salary: "PKR 120,000 - 200,000",
      appliedDate: "1 week ago",
      status: "reviewing",
      coverLetter:
        "I am applying for the UI/UX Designer position. I have 3 years of experience working with design systems and creating user-centered experiences.",
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "Systems Ltd",
      companyLogo: "/placeholder.svg",
      location: "Islamabad",
      type: "Full-time",
      salary: "PKR 140,000 - 230,000",
      appliedDate: "2 weeks ago",
      status: "interview",
      coverLetter:
        "I am interested in the Full Stack Developer position. With my experience in both frontend and backend technologies, I can contribute to all aspects of your projects.",
    },
    {
      id: 4,
      jobTitle: "Frontend Developer",
      company: "WebTech Solutions",
      companyLogo: "/placeholder.svg",
      location: "Karachi",
      type: "Contract",
      salary: "PKR 100,000 - 180,000",
      appliedDate: "3 weeks ago",
      status: "rejected",
      coverLetter:
        "I am applying for the Frontend Developer position. I have 2 years of experience working with React and related technologies.",
    },
    {
      id: 5,
      jobTitle: "Product Manager",
      company: "InnovatePK",
      companyLogo: "/placeholder.svg",
      location: "Lahore",
      type: "Full-time",
      salary: "PKR 180,000 - 300,000",
      appliedDate: "1 month ago",
      status: "offered",
      coverLetter:
        "I am excited to apply for the Product Manager position. With my experience in product development and team leadership, I can help drive your product vision forward.",
    },
  ]

  const [applications, setApplications] = useState(allApplications)

  const filteredApplications = applications.filter(
    (application) =>
      application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleWithdraw = (id: number) => {
    // In a real app, this would call an API to withdraw the application
    setApplications(applications.filter((application) => application.id !== id))
  }

  return (
    <EmployeeDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">My Applications</h2>
            <p className="text-slate-400">Track and manage your job applications</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search by job title or company"
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
                  <h3 className="font-medium text-white">Status</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="interview">Interview</option>
                    <option value="offered">Offered</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Date Applied</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="3months">Last 3 Months</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Job Type</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
              All ({filteredApplications.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-slate-700">
              Pending ({filteredApplications.filter((a) => a.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="reviewing" className="data-[state=active]:bg-slate-700">
              Reviewing ({filteredApplications.filter((a) => a.status === "reviewing").length})
            </TabsTrigger>
            <TabsTrigger value="interview" className="data-[state=active]:bg-slate-700">
              Interview ({filteredApplications.filter((a) => a.status === "interview").length})
            </TabsTrigger>
            <TabsTrigger value="offered" className="data-[state=active]:bg-slate-700">
              Offered ({filteredApplications.filter((a) => a.status === "offered").length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-slate-700">
              Rejected ({filteredApplications.filter((a) => a.status === "rejected").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    onWithdraw={() => handleWithdraw(application.id)}
                    onView={() => router.push(`/employee/jobs/${application.id}`)}
                  />
                ))
              ) : (
                <EmptyState searchTerm={searchTerm} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-6">
              {filteredApplications.filter((a) => a.status === "pending").length > 0 ? (
                filteredApplications
                  .filter((a) => a.status === "pending")
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onWithdraw={() => handleWithdraw(application.id)}
                      onView={() => router.push(`/employee/jobs/${application.id}`)}
                    />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="pending" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviewing">
            <div className="space-y-6">
              {filteredApplications.filter((a) => a.status === "reviewing").length > 0 ? (
                filteredApplications
                  .filter((a) => a.status === "reviewing")
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onWithdraw={() => handleWithdraw(application.id)}
                      onView={() => router.push(`/employee/jobs/${application.id}`)}
                    />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="reviewing" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="interview">
            <div className="space-y-6">
              {filteredApplications.filter((a) => a.status === "interview").length > 0 ? (
                filteredApplications
                  .filter((a) => a.status === "interview")
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onWithdraw={() => handleWithdraw(application.id)}
                      onView={() => router.push(`/employee/jobs/${application.id}`)}
                    />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="interview" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="offered">
            <div className="space-y-6">
              {filteredApplications.filter((a) => a.status === "offered").length > 0 ? (
                filteredApplications
                  .filter((a) => a.status === "offered")
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onWithdraw={() => handleWithdraw(application.id)}
                      onView={() => router.push(`/employee/jobs/${application.id}`)}
                    />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="offered" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-6">
              {filteredApplications.filter((a) => a.status === "rejected").length > 0 ? (
                filteredApplications
                  .filter((a) => a.status === "rejected")
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onWithdraw={() => handleWithdraw(application.id)}
                      onView={() => router.push(`/employee/jobs/${application.id}`)}
                    />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="rejected" />
              )}
            </div>
          </TabsContent>
        </Tabs>

        {filteredApplications.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              >
                1
              </Button>
              <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </EmployeeDashboardLayout>
  )
}

type Application = {
  id: number
  jobTitle: string
  company: string
  companyLogo: string
  location: string
  type: string
  salary: string
  appliedDate: string
  status: string
  coverLetter: string
}

function ApplicationCard({
  application,
  onWithdraw,
  onView,
}: {
  application: Application
  onWithdraw: () => void
  onView: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()

  return (
    <Card className="dashboard-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center">
              <img
                src={application.companyLogo || "/placeholder.svg"}
                alt={application.company}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">{application.jobTitle}</h3>
              <p className="text-cyan-500">{application.company}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span>{application.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-1 h-3 w-3" />
                  <span>{application.type}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-3 w-3" />
                  <span>{application.salary}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Applied {application.appliedDate}</span>
                </div>
                <Badge
                  className={
                    application.status === "pending"
                      ? "bg-blue-500/20 text-blue-500"
                      : application.status === "reviewing"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : application.status === "interview"
                          ? "bg-purple-500/20 text-purple-500"
                          : application.status === "offered"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                  }
                >
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 text-white hover:bg-slate-800"
              onClick={onView}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Job
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 text-white hover:bg-slate-800"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Hide Details" : "Show Details"}
            </Button>
            {application.status !== "rejected" && application.status !== "offered" && (
              <Button
                variant="outline"
                size="sm"
                className="border-red-900/50 text-red-500 hover:bg-red-950/50 hover:text-red-400"
                onClick={onWithdraw}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            )}
          </div>
        </div>

        {expanded && (
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Cover Letter</h4>
                <p className="text-slate-400">{application.coverLetter}</p>
              </div>

              {application.status === "interview" && (
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Interview Details</h4>
                  <p className="text-slate-400">
                    You have been invited for an interview. Please check your email for details or contact the employer.
                  </p>
                  <Button className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Employer
                  </Button>
                </div>
              )}

              {application.status === "offered" && (
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Offer Details</h4>
                  <p className="text-slate-400">
                    Congratulations! You have received a job offer. Please check your email for details or contact the
                    employer.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                      Accept Offer
                    </Button>
                    <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                      Negotiate
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-900/50 text-red-500 hover:bg-red-950/50 hover:text-red-400"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              )}

              {application.status === "rejected" && (
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Application Status</h4>
                  <p className="text-slate-400">
                    We're sorry, but your application was not selected for this position. Don't be discouraged - keep
                    applying to other opportunities that match your skills.
                  </p>
                  <Button
                    className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    onClick={() => router.push("/employee/jobs")}
                  >
                    Browse More Jobs
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function EmptyState({ searchTerm, status }: { searchTerm: string; status?: string }) {
  const router = useRouter()
  return (
    <div className="text-center py-12">
      <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
        <Search className="h-8 w-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-medium text-white">No applications found</h3>
      <p className="mt-1 text-sm text-slate-400">
        {searchTerm
          ? "No applications match your search criteria. Try adjusting your filters."
          : status
            ? `You don't have any ${status} applications.`
            : "You haven't applied to any jobs yet."}
      </p>
      <Button
        className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
        onClick={() => router.push("/employee/jobs")}
      >
        Browse Jobs
      </Button>
    </div>
  )
}
