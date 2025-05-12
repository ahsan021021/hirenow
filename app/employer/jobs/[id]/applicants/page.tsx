"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  Star,
  MessageSquare,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  Briefcase,
} from "lucide-react"

export default function JobApplicantsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const jobId = params.id
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Mock job data
  const job = {
    id: jobId,
    title: jobId === "1" ? "Senior React Developer" : jobId === "2" ? "UI/UX Designer" : "Full Stack Developer",
    location: jobId === "1" ? "Lahore" : jobId === "2" ? "Remote" : "Islamabad",
    type: "Full-time",
    postedDate: "May 15, 2024",
    applicants: 42,
    status: "Active",
  }

  // Mock applicants data
  const allApplicants = [
    {
      id: 1,
      name: "Muhammad Khan",
      title: "Senior Frontend Developer",
      avatar: "/placeholder.svg",
      location: "Lahore",
      experience: "5 years",
      appliedDate: "2 days ago",
      status: "new",
      matchScore: 92,
      skills: ["React", "TypeScript", "Next.js"],
      education: "BS Computer Science",
      coverLetter:
        "I am excited to apply for the Senior React Developer position. With 5 years of experience in frontend development, I believe I would be a great fit for your team.",
    },
    {
      id: 2,
      name: "Sara Rizvi",
      title: "Frontend Developer",
      avatar: "/placeholder.svg",
      location: "Karachi",
      experience: "3 years",
      appliedDate: "3 days ago",
      status: "reviewing",
      matchScore: 85,
      skills: ["React", "JavaScript", "CSS"],
      education: "BS Software Engineering",
      coverLetter:
        "I am applying for the Senior React Developer position. I have 3 years of experience working with React and related technologies.",
    },
    {
      id: 3,
      name: "Ahmed Khan",
      title: "Full Stack Developer",
      avatar: "/placeholder.svg",
      location: "Islamabad",
      experience: "4 years",
      appliedDate: "1 week ago",
      status: "shortlisted",
      matchScore: 88,
      skills: ["React", "Node.js", "MongoDB"],
      education: "MS Computer Science",
      coverLetter:
        "I am interested in the Senior React Developer position. With my full stack experience, I can contribute to both frontend and backend aspects of your projects.",
    },
    {
      id: 4,
      name: "Fatima Ali",
      title: "React Developer",
      avatar: "/placeholder.svg",
      location: "Lahore",
      experience: "2 years",
      appliedDate: "1 week ago",
      status: "rejected",
      matchScore: 75,
      skills: ["React", "Redux", "JavaScript"],
      education: "BS Computer Science",
      coverLetter:
        "I am applying for the Senior React Developer position. Although I have only 2 years of experience, I am a quick learner and passionate about React development.",
    },
    {
      id: 5,
      name: "Ali Hassan",
      title: "Senior Web Developer",
      avatar: "/placeholder.svg",
      location: "Faisalabad",
      experience: "6 years",
      appliedDate: "2 weeks ago",
      status: "interviewing",
      matchScore: 90,
      skills: ["React", "Angular", "Vue.js"],
      education: "BS Software Engineering",
      coverLetter:
        "I am excited to apply for the Senior React Developer position. With 6 years of experience across multiple frontend frameworks, I can bring valuable insights to your team.",
    },
  ]

  const [applicants, setApplicants] = useState(allApplicants)

  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const updateApplicantStatus = (id: number, status: string) => {
    setApplicants(applicants.map((applicant) => (applicant.id === id ? { ...applicant, status: status } : applicant)))
  }

  return (
    <EmployerDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-slate-700 text-white hover:bg-slate-800"
                onClick={() => router.push("/employer/jobs")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-3xl font-bold tracking-tight text-white">{job.title}</h2>
              <Badge
                className={
                  job.status === "Active"
                    ? "bg-green-500/20 text-green-500"
                    : job.status === "Draft"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-slate-500/20 text-slate-400"
                }
              >
                {job.status}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Posted on {job.postedDate}</span>
              </div>
              <div className="flex items-center">
                <Badge className="bg-cyan-500 text-white">{job.applicants} Applicants</Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800"
              onClick={() => router.push(`/employer/jobs/${jobId}/edit`)}
            >
              Edit Job
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
              <Eye className="mr-2 h-4 w-4" />
              View Job
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search applicants by name, title, or skills"
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
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Experience</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">Any Experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Applied Date</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
              All ({filteredApplicants.length})
            </TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-slate-700">
              New ({filteredApplicants.filter((a) => a.status === "new").length})
            </TabsTrigger>
            <TabsTrigger value="reviewing" className="data-[state=active]:bg-slate-700">
              Reviewing ({filteredApplicants.filter((a) => a.status === "reviewing").length})
            </TabsTrigger>
            <TabsTrigger value="shortlisted" className="data-[state=active]:bg-slate-700">
              Shortlisted ({filteredApplicants.filter((a) => a.status === "shortlisted").length})
            </TabsTrigger>
            <TabsTrigger value="interviewing" className="data-[state=active]:bg-slate-700">
              Interviewing ({filteredApplicants.filter((a) => a.status === "interviewing").length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-slate-700">
              Rejected ({filteredApplicants.filter((a) => a.status === "rejected").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => (
                  <ApplicantCard key={applicant.id} applicant={applicant} updateStatus={updateApplicantStatus} />
                ))
              ) : (
                <EmptyState searchTerm={searchTerm} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="space-y-6">
              {filteredApplicants.filter((a) => a.status === "new").length > 0 ? (
                filteredApplicants
                  .filter((a) => a.status === "new")
                  .map((applicant) => (
                    <ApplicantCard key={applicant.id} applicant={applicant} updateStatus={updateApplicantStatus} />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="new" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviewing">
            <div className="space-y-6">
              {filteredApplicants.filter((a) => a.status === "reviewing").length > 0 ? (
                filteredApplicants
                  .filter((a) => a.status === "reviewing")
                  .map((applicant) => (
                    <ApplicantCard key={applicant.id} applicant={applicant} updateStatus={updateApplicantStatus} />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="reviewing" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="shortlisted">
            <div className="space-y-6">
              {filteredApplicants.filter((a) => a.status === "shortlisted").length > 0 ? (
                filteredApplicants
                  .filter((a) => a.status === "shortlisted")
                  .map((applicant) => (
                    <ApplicantCard key={applicant.id} applicant={applicant} updateStatus={updateApplicantStatus} />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="shortlisted" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="interviewing">
            <div className="space-y-6">
              {filteredApplicants.filter((a) => a.status === "interviewing").length > 0 ? (
                filteredApplicants
                  .filter((a) => a.status === "interviewing")
                  .map((applicant) => (
                    <ApplicantCard key={applicant.id} applicant={applicant} updateStatus={updateApplicantStatus} />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="interviewing" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-6">
              {filteredApplicants.filter((a) => a.status === "rejected").length > 0 ? (
                filteredApplicants
                  .filter((a) => a.status === "rejected")
                  .map((applicant) => (
                    <ApplicantCard key={applicant.id} applicant={applicant} updateStatus={updateApplicantStatus} />
                  ))
              ) : (
                <EmptyState searchTerm={searchTerm} status="rejected" />
              )}
            </div>
          </TabsContent>
        </Tabs>

        {filteredApplicants.length > 0 && (
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
    </EmployerDashboardLayout>
  )
}

type Applicant = {
  id: number
  name: string
  title: string
  avatar: string
  location: string
  experience: string
  appliedDate: string
  status: string
  matchScore: number
  skills: string[]
  education: string
  coverLetter: string
}

function ApplicantCard({
  applicant,
  updateStatus,
}: {
  applicant: Applicant
  updateStatus: (id: number, status: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="dashboard-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
              <AvatarFallback className="bg-slate-800 text-white">{applicant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium text-white">{applicant.name}</h3>
              <p className="text-cyan-500">{applicant.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span>{applicant.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-1 h-3 w-3" />
                  <span>{applicant.experience} experience</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Applied {applicant.appliedDate}</span>
                </div>
                <Badge
                  className={
                    applicant.status === "new"
                      ? "bg-blue-500/20 text-blue-500"
                      : applicant.status === "reviewing"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : applicant.status === "shortlisted"
                          ? "bg-green-500/20 text-green-500"
                          : applicant.status === "interviewing"
                            ? "bg-purple-500/20 text-purple-500"
                            : "bg-red-500/20 text-red-500"
                  }
                >
                  {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {applicant.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-100 text-cyan-700 font-bold">
              {applicant.matchScore}%
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Star className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Download className="h-5 w-5" />
              </Button>
            </div>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Hide Details" : "View Details"}
            </Button>
          </div>
        </div>

        {expanded && (
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Cover Letter</h4>
                <p className="text-slate-400">{applicant.coverLetter}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Education</h4>
                <p className="text-slate-400">{applicant.education}</p>

                <h4 className="text-lg font-medium text-white mt-4 mb-2">Actions</h4>
                <div className="flex flex-wrap gap-2">
                  {applicant.status !== "shortlisted" && (
                    <Button
                      variant="outline"
                      className="border-green-700 bg-green-500/10 text-green-500 hover:bg-green-500/20"
                      onClick={() => updateStatus(applicant.id, "shortlisted")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Shortlist
                    </Button>
                  )}
                  {applicant.status !== "interviewing" && (
                    <Button
                      variant="outline"
                      className="border-purple-700 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
                      onClick={() => updateStatus(applicant.id, "interviewing")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Interview
                    </Button>
                  )}
                  {applicant.status !== "rejected" && (
                    <Button
                      variant="outline"
                      className="border-red-700 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      onClick={() => updateStatus(applicant.id, "rejected")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function EmptyState({ searchTerm, status }: { searchTerm: string; status?: string }) {
  return (
    <div className="text-center py-12">
      <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
        <Search className="h-8 w-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-medium text-white">No applicants found</h3>
      <p className="mt-1 text-sm text-slate-400">
        {searchTerm
          ? "No applicants match your search criteria. Try adjusting your filters."
          : status
            ? `You don't have any ${status} applicants yet.`
            : "There are no applicants for this job yet."}
      </p>
    </div>
  )
}
