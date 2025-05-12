"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import {
  ChevronLeft,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Briefcase,
  BookmarkPlus,
  Share2,
  Flag,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { getJob } from "@/app/services/jobService"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const jobId = params.id
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isApplying, setIsApplying] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true)
      try {
        const response = await getJob(jobId)
        if (response.success) {
          setJob(response.data)
        } else {
          toast({
            title: "Error",
            description: response.error || "Failed to load job details",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching job details:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [jobId, toast])

  const handleSaveJob = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Job removed from saved jobs" : "Job saved",
      description: isSaved
        ? "The job has been removed from your saved jobs."
        : "The job has been added to your saved jobs.",
    })
  }

  const handleShareJob = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Job link has been copied to clipboard.",
    })
  }

  const handleReportJob = () => {
    // In a real app, this would open a report dialog
    toast({
      title: "Report submitted",
      description: "Thank you for your feedback. We'll review this job posting.",
    })
  }

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      toast({
        title: "Cover letter required",
        description: "Please provide a cover letter to apply for this job.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to submit the application
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setHasApplied(true)
      setIsApplying(false)
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container py-4">
            <MainNav />
          </div>
        </header>
        <main className="flex-1 container py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container py-4">
            <MainNav />
          </div>
        </header>
        <main className="flex-1 container py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
            <p className="text-slate-400 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              <Link href="/jobs">Browse All Jobs</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
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
            <Button variant="outline" size="sm" className="mb-4 border-slate-700 text-white hover:bg-slate-800" asChild>
              <Link href="/jobs">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-white">{job.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <div className="flex items-center">
                <Building className="mr-1 h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{job.location || "Remote"}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>Posted {job.postedDate || "recently"}</span>
              </div>
              {job.salary && (
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className={`border-slate-700 ${
                isSaved ? "text-yellow-500 hover:text-yellow-400" : "text-white hover:text-white"
              } hover:bg-slate-800`}
              onClick={handleSaveJob}
            >
              <BookmarkPlus className="mr-2 h-4 w-4" />
              {isSaved ? "Saved" : "Save Job"}
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800"
              onClick={handleShareJob}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              onClick={() => setIsApplying(true)}
              disabled={hasApplied}
            >
              {hasApplied ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Applied
                </>
              ) : (
                "Apply Now"
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Job Description</h3>
                    <p className="text-slate-300">{job.description}</p>
                  </div>

                  {job.requirements && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Requirements</h3>
                      <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        {Array.isArray(job.requirements) ? (
                          job.requirements.map((requirement, index) => <li key={index}>{requirement}</li>)
                        ) : (
                          <li>{job.requirements}</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {job.responsibilities && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Responsibilities</h3>
                      <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        {Array.isArray(job.responsibilities) ? (
                          job.responsibilities.map((responsibility, index) => <li key={index}>{responsibility}</li>)
                        ) : (
                          <li>{job.responsibilities}</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {job.benefits && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Benefits</h3>
                      <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        {Array.isArray(job.benefits) ? (
                          job.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)
                        ) : (
                          <li>{job.benefits}</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {job.skills && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {isApplying && (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Apply for this position</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="coverLetter" className="block text-white font-medium mb-2">
                        Cover Letter
                      </label>
                      <Textarea
                        id="coverLetter"
                        placeholder="Introduce yourself and explain why you're a good fit for this position..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white min-h-[200px]"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="border-slate-700 text-white hover:bg-slate-700"
                        onClick={() => setIsApplying(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        onClick={handleApply}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded bg-slate-700 flex items-center justify-center">
                    <Building className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{job.company}</h3>
                    <Button variant="link" className="p-0 h-auto text-cyan-500 hover:text-cyan-400" asChild>
                      <Link href={`/companies/${job.companyId || job.company.toLowerCase().replace(/\s+/g, "-")}`}>
                        View Company Profile
                      </Link>
                    </Button>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  {job.companyDescription ||
                    "A leading company in the industry looking for talented professionals to join their team."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Job Details</h3>
                <div className="space-y-3">
                  {job.experience && (
                    <div>
                      <p className="text-sm text-slate-400">Experience</p>
                      <p className="text-white">{job.experience}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-slate-400">Job Type</p>
                    <p className="text-white">{job.type}</p>
                  </div>
                  {job.category && (
                    <div>
                      <p className="text-sm text-slate-400">Category</p>
                      <p className="text-white">{job.category}</p>
                    </div>
                  )}
                  {job.salary && (
                    <div>
                      <p className="text-sm text-slate-400">Salary Range</p>
                      <p className="text-white">{job.salary}</p>
                    </div>
                  )}
                  {job.deadline && (
                    <div>
                      <p className="text-sm text-slate-400">Application Deadline</p>
                      <p className="text-white">{job.deadline}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Report Job</h3>
                <p className="text-slate-300 text-sm mb-4">
                  If you believe this job posting is inappropriate or fraudulent, please report it.
                </p>
                <Button
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-700 w-full"
                  onClick={handleReportJob}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Report This Job
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
