"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Calendar, Star, Building, ChevronRight } from "lucide-react"
import { EmployeeDashboardLayout } from "@/components/layouts/employee-dashboard-layout"
import { getRecommendedJobs } from "@/app/services/jobService"
import { applyForJob, saveJob } from "@/app/services/applicationService"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"

export default function RecommendedJobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState({})
  const [saving, setSaving] = useState({})
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchRecommendedJobs()
  }, [])

  const fetchRecommendedJobs = async () => {
    try {
      setLoading(true)
      const response = await getRecommendedJobs()
      setJobs(response.jobs)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load recommended jobs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (jobId) => {
    try {
      setApplying((prev) => ({ ...prev, [jobId]: true }))
      await applyForJob(jobId)
      toast({
        title: "Success",
        description: "Application submitted successfully",
      })
      // Update job status in the list
      setJobs((prevJobs) => prevJobs.map((job) => (job._id === jobId ? { ...job, hasApplied: true } : job)))
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to apply for job",
        variant: "destructive",
      })
    } finally {
      setApplying((prev) => ({ ...prev, [jobId]: false }))
    }
  }

  const handleSave = async (jobId) => {
    try {
      setSaving((prev) => ({ ...prev, [jobId]: true }))
      await saveJob(jobId)
      toast({
        title: "Success",
        description: "Job saved successfully",
      })
      // Update job status in the list
      setJobs((prevJobs) => prevJobs.map((job) => (job._id === jobId ? { ...job, isSaved: true } : job)))
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to save job",
        variant: "destructive",
      })
    } finally {
      setSaving((prev) => ({ ...prev, [jobId]: false }))
    }
  }

  const formatPostedDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  }

  if (loading) {
    return (
      <EmployeeDashboardLayout>
        <div className="container mx-auto py-6">
          <div className="space-y-6">
            <div className="h-8 w-64 bg-slate-800 rounded animate-pulse"></div>
            <div className="h-4 w-full max-w-md bg-slate-800 rounded animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-slate-800 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </EmployeeDashboardLayout>
    )
  }

  return (
    <EmployeeDashboardLayout>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Recommended Jobs</h1>
            <p className="text-slate-400 mt-2">Jobs that match your skills and experience</p>
          </div>

          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job._id} className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          {job.company?.name || "Company Name"}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className="bg-cyan-500 text-white mb-2">{job.matchScore}% Match</Badge>
                        <div className="text-sm text-slate-400">{formatPostedDate(job.createdAt)}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-slate-400 mr-2" />
                        <span className="text-slate-300">{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-slate-400 mr-2" />
                        <span className="text-slate-300">{job.type}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-400 mr-2" />
                        <span className="text-slate-300">{job.experience}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-slate-400 mr-2" />
                        <span className="text-slate-300">{new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 line-clamp-2">{job.description}</p>
                    {job.skills && job.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-slate-300 border-slate-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      onClick={() => router.push(`/employee/jobs/${job._id}`)}
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                    <div className="flex gap-2">
                      {!job.isSaved ? (
                        <Button
                          variant="outline"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                          onClick={() => handleSave(job._id)}
                          disabled={saving[job._id]}
                        >
                          <Star className="h-4 w-4 mr-2" />
                          {saving[job._id] ? "Saving..." : "Save"}
                        </Button>
                      ) : (
                        <Button variant="outline" className="border-slate-700 bg-slate-800 text-cyan-500" disabled>
                          <Star className="h-4 w-4 mr-2 fill-current" />
                          Saved
                        </Button>
                      )}
                      {!job.hasApplied ? (
                        <Button
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                          onClick={() => handleApply(job._id)}
                          disabled={applying[job._id]}
                        >
                          {applying[job._id] ? "Applying..." : "Apply Now"}
                        </Button>
                      ) : (
                        <Button className="bg-slate-800 text-slate-300" disabled>
                          Applied
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
              <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No recommended jobs yet</h3>
              <p className="text-slate-400 mb-6">
                Complete your profile with skills and experience to get personalized job recommendations
              </p>
              <Button
                onClick={() => router.push("/employee/profile")}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                Update Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </EmployeeDashboardLayout>
  )
}
