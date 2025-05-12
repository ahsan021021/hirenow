"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { EmployeeDashboardLayout } from "@/components/layouts/employee-dashboard-layout"
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

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const jobId = params.id
  const [isApplying, setIsApplying] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Mock job data based on ID
  const job = {
    id: jobId,
    title: jobId === "1" ? "Senior React Developer" : jobId === "2" ? "UI/UX Designer" : "Full Stack Developer",
    company: jobId === "1" ? "TechCorp Pakistan" : jobId === "2" ? "Acme Inc" : "Systems Ltd",
    location: jobId === "1" ? "Lahore" : jobId === "2" ? "Remote" : "Islamabad",
    type: "Full-time",
    category: "Software Development",
    experience: jobId === "1" ? "3-5 years" : jobId === "2" ? "2-4 years" : "3-6 years",
    salary: {
      min: jobId === "1" ? 150000 : jobId === "2" ? 120000 : 140000,
      max: jobId === "1" ? 250000 : jobId === "2" ? 200000 : 230000,
    },
    postedDate: "May 15, 2024",
    deadline: "June 15, 2024",
    description:
      "We are looking for an experienced developer to join our team. The ideal candidate will have strong skills in modern web development and a passion for creating high-quality applications.",
    requirements: [
      "Strong experience with React and related technologies",
      "Proficiency in JavaScript/TypeScript",
      "Experience with state management libraries",
      "Good understanding of responsive design principles",
      "Ability to write clean, maintainable code",
    ],
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable components and libraries",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with other team members and stakeholders",
      "Ensure the technical feasibility of UI/UX designs",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Flexible working hours",
      "Professional development opportunities",
      "Remote work options",
    ],
    skills: ["React", "TypeScript", "Next.js", "Redux", "CSS"],
    companyLogo: "/placeholder.svg",
    companyDescription:
      "We are a leading technology company specializing in web and mobile application development. With over a decade of experience, we've helped businesses of all sizes transform their digital presence.",
    matchScore: 92,
  }

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

  return (
    <EmployeeDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Button
              variant="outline"
              size="sm"
              className="mb-4 border-slate-700 text-white hover:bg-slate-800"
              onClick={() => router.push("/employee/jobs")}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
            <h2 className="text-3xl font-bold tracking-tight text-white">{job.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <div className="flex items-center">
                <Building className="mr-1 h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>Posted on {job.postedDate}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-1 h-4 w-4" />
                <span>
                  PKR {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                </span>
              </div>
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
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Job Description</h3>
                    <p className="text-slate-300">{job.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Requirements</h3>
                    <ul className="list-disc pl-6 text-slate-300 space-y-2">
                      {job.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Responsibilities</h3>
                    <ul className="list-disc pl-6 text-slate-300 space-y-2">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Benefits</h3>
                    <ul className="list-disc pl-6 text-slate-300 space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isApplying && (
              <Card className="dashboard-card">
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
                        className="bg-slate-800 border-slate-700 text-white min-h-[200px]"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="border-slate-700 text-white hover:bg-slate-800"
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
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded bg-slate-800 flex items-center justify-center">
                    <img
                      src={job.companyLogo || "/placeholder.svg"}
                      alt={job.company}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{job.company}</h3>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-cyan-500 hover:text-cyan-400"
                      onClick={() => router.push(`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`)}
                    >
                      View Company Profile
                    </Button>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">{job.companyDescription}</p>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Job Match</h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-cyan-100 text-cyan-700 font-bold text-xl flex items-center justify-center">
                    {job.matchScore}%
                  </div>
                  <div>
                    <p className="text-slate-300">Your profile matches {job.matchScore}% of the job requirements</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-cyan-500 hover:text-cyan-400"
                      onClick={() => router.push("/employee/profile")}
                    >
                      Update your profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Job Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-400">Experience</p>
                    <p className="text-white">{job.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Job Type</p>
                    <p className="text-white">{job.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Category</p>
                    <p className="text-white">{job.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Salary Range</p>
                    <p className="text-white">
                      PKR {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Application Deadline</p>
                    <p className="text-white">{job.deadline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Report Job</h3>
                <p className="text-slate-300 text-sm mb-4">
                  If you believe this job posting is inappropriate or fraudulent, please report it.
                </p>
                <Button
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 w-full"
                  onClick={handleReportJob}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Report This Job
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EmployeeDashboardLayout>
  )
}
