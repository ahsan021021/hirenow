"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EmployeeDashboardLayout } from "@/components/layouts/employee-dashboard-layout"
import {
  Search,
  Filter,
  ChevronDown,
  MapPin,
  Building,
  DollarSign,
  Briefcase,
  Trash2,
  Eye,
  BookmarkPlus,
} from "lucide-react"

export default function SavedJobsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Mock saved jobs data
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Pakistan",
      companyLogo: "/placeholder.svg",
      location: "Lahore",
      type: "Full-time",
      salary: "PKR 150,000 - 250,000",
      postedDate: "2 days ago",
      savedDate: "1 day ago",
      skills: ["React", "TypeScript", "Next.js", "Redux"],
      matchScore: 92,
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Acme Inc",
      companyLogo: "/placeholder.svg",
      location: "Remote",
      type: "Full-time",
      salary: "PKR 120,000 - 200,000",
      postedDate: "1 week ago",
      savedDate: "3 days ago",
      skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
      matchScore: 85,
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Systems Ltd",
      companyLogo: "/placeholder.svg",
      location: "Islamabad",
      type: "Full-time",
      salary: "PKR 140,000 - 230,000",
      postedDate: "2 weeks ago",
      savedDate: "1 week ago",
      skills: ["Node.js", "React", "MongoDB", "Express"],
      matchScore: 88,
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "WebTech Solutions",
      companyLogo: "/placeholder.svg",
      location: "Karachi",
      type: "Contract",
      salary: "PKR 100,000 - 180,000",
      postedDate: "3 weeks ago",
      savedDate: "2 weeks ago",
      skills: ["JavaScript", "HTML", "CSS", "Vue.js"],
      matchScore: 78,
    },
  ])

  const filteredJobs = savedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const removeJob = (id: number) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id))
  }

  return (
    <EmployeeDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Saved Jobs</h2>
            <p className="text-slate-400">Jobs you've saved for later</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search by job title, company, or skills"
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

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Location</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">All Locations</option>
                    <option value="lahore">Lahore</option>
                    <option value="karachi">Karachi</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="remote">Remote Only</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Date Saved</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="3months">Last 3 Months</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="dashboard-card hover:border-slate-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center">
                        <img
                          src={job.companyLogo || "/placeholder.svg"}
                          alt={job.company}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{job.title}</h3>
                        <p className="text-cyan-500">{job.company}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="mr-1 h-3 w-3" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="mr-1 h-3 w-3" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center">
                            <Building className="mr-1 h-3 w-3" />
                            <span>Posted {job.postedDate}</span>
                          </div>
                          <div className="flex items-center">
                            <BookmarkPlus className="mr-1 h-3 w-3" />
                            <span>Saved {job.savedDate}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="bg-slate-800 text-slate-300 border-slate-700"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-100 text-cyan-700 font-bold">
                        {job.matchScore}%
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-slate-700 text-red-400 hover:text-red-300 hover:bg-slate-800"
                          onClick={() => removeJob(job.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        onClick={() => router.push(`/employee/jobs/${job.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Job
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <BookmarkPlus className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-white">No saved jobs found</h3>
              <p className="mt-1 text-sm text-slate-400">
                {searchTerm
                  ? "No saved jobs match your search criteria. Try adjusting your filters."
                  : "You haven't saved any jobs yet."}
              </p>
              <Button
                className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                onClick={() => router.push("/employee/jobs")}
              >
                Browse Jobs
              </Button>
            </div>
          )}
        </div>

        {filteredJobs.length > 0 && (
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
