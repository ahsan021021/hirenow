"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building,
  Filter,
  X,
  ChevronDown,
  BookmarkPlus,
} from "lucide-react"
import { searchJobsService, getAllJobs } from "@/app/services/jobService"

export default function JobsPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialLocation = searchParams.get("location") || ""

  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [location, setLocation] = useState(initialLocation)
  const [showFilters, setShowFilters] = useState(false)
  const [salaryRange, setSalaryRange] = useState([50, 200])
  const [jobTypes, setJobTypes] = useState<string[]>([])
  const [experienceLevels, setExperienceLevels] = useState<string[]>([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 10

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        let response

        if (initialQuery) {
          response = await searchJobsService(initialQuery, {
            location: initialLocation,
            // Add other filters if needed
          })
        } else {
          response = await getAllJobs()
        }

        if (response.success) {
          setJobs(response.data || [])
        } else {
          setJobs([])
        }
      } catch (error) {
        console.error("Error fetching jobs:", error)
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [initialQuery, initialLocation])

  const handleJobTypeChange = (type: string) => {
    if (jobTypes.includes(type)) {
      setJobTypes(jobTypes.filter((t) => t !== type))
    } else {
      setJobTypes([...jobTypes, type])
    }
  }

  const handleExperienceLevelChange = (level: string) => {
    if (experienceLevels.includes(level)) {
      setExperienceLevels(experienceLevels.filter((l) => l !== level))
    } else {
      setExperienceLevels([...experienceLevels, level])
    }
  }

  const clearFilters = () => {
    setSalaryRange([50, 200])
    setJobTypes([])
    setExperienceLevels([])
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Update URL with search parameters
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchTerm)
    if (location) url.searchParams.set("location", location)
    else url.searchParams.delete("location")
    window.history.pushState({}, "", url.toString())

    // Fetch jobs with search parameters
    const fetchSearchResults = async () => {
      setLoading(true)
      try {
        const response = await searchJobsService(searchTerm, {
          location,
          jobTypes,
          experienceLevels,
          salaryRange,
        })

        if (response.success) {
          setJobs(response.data || [])
        } else {
          setJobs([])
        }
      } catch (error) {
        console.error("Error searching jobs:", error)
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob)
  const totalPages = Math.ceil(jobs.length / jobsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Find Jobs</h1>
            <p className="text-slate-400">Discover opportunities that match your skills and preferences</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search job titles, skills, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white w-full md:w-60"
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
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {showFilters && (
          <Card className="mb-6 bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Advanced Filters</h3>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Salary Range (PKR in thousands)</h4>
                  <div className="space-y-2">
                    <Slider
                      value={salaryRange}
                      min={0}
                      max={500}
                      step={10}
                      onValueChange={setSalaryRange}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>PKR {salaryRange[0]}K</span>
                      <span>PKR {salaryRange[1]}K</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-white">Job Type</h4>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-type-${type}`}
                          checked={jobTypes.includes(type)}
                          onCheckedChange={() => handleJobTypeChange(type)}
                        />
                        <Label htmlFor={`job-type-${type}`} className="text-slate-400 cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-white">Experience Level</h4>
                  <div className="space-y-2">
                    {["Entry Level", "Mid Level", "Senior Level", "Manager", "Executive"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`exp-level-${level}`}
                          checked={experienceLevels.includes(level)}
                          onCheckedChange={() => handleExperienceLevelChange(level)}
                        />
                        <Label htmlFor={`exp-level-${level}`} className="text-slate-400 cursor-pointer">
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-40 bg-slate-800/50 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-6">
            {currentJobs.map((job) => (
              <Card key={job.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded bg-slate-700 flex items-center justify-center text-white font-bold">
                        {job.company?.charAt(0) || "C"}
                      </div>
                      <div>
                        <Link href={`/jobs/${job.id}`} className="hover:underline">
                          <h3 className="text-lg font-medium text-white">{job.title}</h3>
                        </Link>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                          <div className="flex items-center">
                            <Building className="mr-1 h-3 w-3" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>{job.location || "Remote"}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="mr-1 h-3 w-3" />
                            <span>{job.salary || "Salary not disclosed"}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="mr-1 h-3 w-3" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Posted {job.postedDate || "recently"}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {job.skills &&
                            job.skills.slice(0, 4).map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-slate-700 text-slate-300 border-slate-600"
                              >
                                {skill}
                              </Badge>
                            ))}
                        </div>
                        <p className="mt-4 text-slate-400 line-clamp-2">{job.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <BookmarkPlus className="h-5 w-5" />
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        asChild
                      >
                        <Link href={`/jobs/${job.id}`}>View Job</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-white mb-2">No jobs found</h3>
            <p className="text-slate-400">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </div>
        )}

        {/* Pagination */}
        {jobs.length > jobsPerPage && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-white hover:bg-slate-800"
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page
                let pageNum = i + 1
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 3 + i
                }
                if (pageNum > totalPages) return null

                return (
                  <Button
                    key={pageNum}
                    variant="outline"
                    size="sm"
                    className={`border-slate-700 ${
                      currentPage === pageNum ? "bg-slate-700" : ""
                    } text-white hover:bg-slate-800`}
                    onClick={() => paginate(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}

              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-white hover:bg-slate-800"
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
