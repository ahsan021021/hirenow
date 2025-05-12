"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft, Save, Trash2, Plus, X, Eye, Clock, MapPin, Briefcase, DollarSign } from "lucide-react"

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const jobId = params.id

  // Mock job data based on ID
  const jobData = {
    id: jobId,
    title: jobId === "1" ? "Senior React Developer" : jobId === "2" ? "UI/UX Designer" : "Full Stack Developer",
    location: jobId === "1" ? "Lahore" : jobId === "2" ? "Remote" : "Islamabad",
    type: "Full-time",
    category: "Software Development",
    experience: jobId === "1" ? "3-5 years" : jobId === "2" ? "2-4 years" : "3-6 years",
    salary: {
      min: jobId === "1" ? 150000 : jobId === "2" ? 120000 : 140000,
      max: jobId === "1" ? 250000 : jobId === "2" ? 200000 : 230000,
    },
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
    postedDate: "May 15, 2024",
    expiryDate: "June 15, 2024",
    status: "Active",
    showSalary: true,
    allowRemote: jobId === "2" ? true : false,
    featured: jobId === "1" ? true : false,
    urgent: false,
  }

  const [job, setJob] = useState(jobData)
  const [requirements, setRequirements] = useState(jobData.requirements)
  const [responsibilities, setResponsibilities] = useState(jobData.responsibilities)
  const [benefits, setBenefits] = useState(jobData.benefits)
  const [skills, setSkills] = useState(jobData.skills)
  const [newRequirement, setNewRequirement] = useState("")
  const [newResponsibility, setNewResponsibility] = useState("")
  const [newBenefit, setNewBenefit] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === "salaryMin" || name === "salaryMax") {
      setJob({
        ...job,
        salary: {
          ...job.salary,
          [name === "salaryMin" ? "min" : "max"]: Number.parseInt(value),
        },
      })
    } else {
      setJob({
        ...job,
        [name]: value,
      })
    }
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setJob({
      ...job,
      [name]: checked,
    })
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setResponsibilities([...responsibilities, newResponsibility.trim()])
      setNewResponsibility("")
    }
  }

  const removeResponsibility = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index))
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSave = () => {
    // In a real app, this would save the job to the backend
    toast({
      title: "Job updated",
      description: "Your job posting has been updated successfully.",
    })
    router.push("/employer/jobs")
  }

  const handlePreview = () => {
    // In a real app, this would show a preview of the job
    toast({
      title: "Preview mode",
      description: "This would show a preview of your job posting.",
    })
  }

  const handleDelete = () => {
    // In a real app, this would delete the job
    toast({
      title: "Job deleted",
      description: "Your job posting has been deleted.",
      variant: "destructive",
    })
    router.push("/employer/jobs")
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
              <h2 className="text-3xl font-bold tracking-tight text-white">Edit Job</h2>
            </div>
            <p className="text-slate-400">Update your job posting details</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800"
              onClick={handlePreview}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              onClick={handleSave}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={job.title}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Job Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={job.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-slate-800 border-slate-700 text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">
                      Job Category
                    </Label>
                    <select
                      id="category"
                      name="category"
                      value={job.category}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                    >
                      <option value="Software Development">Software Development</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Customer Support">Customer Support</option>
                      <option value="Finance">Finance</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-white">
                      Employment Type
                    </Label>
                    <select
                      id="type"
                      name="type"
                      value={job.type}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={job.location}
                      onChange={handleInputChange}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-white">
                      Experience Required
                    </Label>
                    <select
                      id="experience"
                      name="experience"
                      value={job.experience}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                    >
                      <option value="0-1 years">0-1 years</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-7 years">5-7 years</option>
                      <option value="7+ years">7+ years</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaryMin" className="text-white">
                      Minimum Salary (PKR)
                    </Label>
                    <Input
                      id="salaryMin"
                      name="salaryMin"
                      type="number"
                      value={job.salary.min}
                      onChange={handleInputChange}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaryMax" className="text-white">
                      Maximum Salary (PKR)
                    </Label>
                    <Input
                      id="salaryMax"
                      name="salaryMax"
                      type="number"
                      value={job.salary.max}
                      onChange={handleInputChange}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-white">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={job.expiryDate}
                      onChange={handleInputChange}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-white">
                      Status
                    </Label>
                    <select
                      id="status"
                      name="status"
                      value={job.status}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                      <option value="Paused">Paused</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a requirement"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addRequirement()
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="border-slate-700 text-white hover:bg-slate-800"
                    onClick={addRequirement}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <ul className="space-y-2">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center justify-between bg-slate-800 p-3 rounded-md">
                      <span className="text-slate-300">{requirement}</span>
                      <button className="text-slate-400 hover:text-white" onClick={() => removeRequirement(index)}>
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a responsibility"
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addResponsibility()
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="border-slate-700 text-white hover:bg-slate-800"
                    onClick={addResponsibility}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <ul className="space-y-2">
                  {responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-center justify-between bg-slate-800 p-3 rounded-md">
                      <span className="text-slate-300">{responsibility}</span>
                      <button className="text-slate-400 hover:text-white" onClick={() => removeResponsibility(index)}>
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a benefit"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addBenefit()
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="border-slate-700 text-white hover:bg-slate-800"
                    onClick={addBenefit}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center justify-between bg-slate-800 p-3 rounded-md">
                      <span className="text-slate-300">{benefit}</span>
                      <button className="text-slate-400 hover:text-white" onClick={() => removeBenefit(index)}>
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Job Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-slate-800 p-4">
                  <h3 className="text-lg font-medium text-white">{job.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-3 w-3" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{job.experience}</span>
                    </div>
                    {job.showSalary && (
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-3 w-3" />
                        <span>
                          PKR {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.featured && <Badge className="bg-yellow-500 text-white">Featured</Badge>}
                    {job.urgent && <Badge className="bg-red-500 text-white">Urgent</Badge>}
                    {job.allowRemote && <Badge className="bg-green-500 text-white">Remote</Badge>}
                    <Badge
                      className={
                        job.status === "Active"
                          ? "bg-green-500/20 text-green-500"
                          : job.status === "Draft"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : job.status === "Paused"
                              ? "bg-orange-500/20 text-orange-500"
                              : "bg-slate-500/20 text-slate-400"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="border-slate-700 text-white hover:bg-slate-800"
                    onClick={addSkill}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-slate-800 text-slate-300 border-slate-700 flex items-center gap-1 py-1.5"
                    >
                      {skill}
                      <button className="text-slate-400 hover:text-white ml-1" onClick={() => removeSkill(skill)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Job Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Show Salary Range</Label>
                    <p className="text-xs text-slate-500">Display salary information on job posting</p>
                  </div>
                  <Switch
                    checked={job.showSalary}
                    onCheckedChange={(checked) => handleSwitchChange("showSalary", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Allow Remote Applications</Label>
                    <p className="text-xs text-slate-500">Allow candidates to apply from any location</p>
                  </div>
                  <Switch
                    checked={job.allowRemote}
                    onCheckedChange={(checked) => handleSwitchChange("allowRemote", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Featured Job</Label>
                    <p className="text-xs text-slate-500">Highlight this job in search results</p>
                  </div>
                  <Switch
                    checked={job.featured}
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Mark as Urgent</Label>
                    <p className="text-xs text-slate-500">Add an urgent tag to this job</p>
                  </div>
                  <Switch checked={job.urgent} onCheckedChange={(checked) => handleSwitchChange("urgent", checked)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EmployerDashboardLayout>
  )
}
