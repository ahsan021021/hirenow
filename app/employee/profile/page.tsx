"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeDashboardLayout } from "@/components/layouts/employee-dashboard-layout"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { MapPin, Mail, Phone, Globe, Linkedin, Github, Plus, X, Edit, Save, Upload, Trash2 } from "lucide-react"

export default function EmployeeProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [isEditingSkills, setIsEditingSkills] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [skills, setSkills] = useState(["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "UI/UX Design"])

  const handleSavePersonal = () => {
    setIsEditingPersonal(false)
    toast({
      title: "Profile updated",
      description: "Your personal information has been updated successfully.",
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSaveSkills = () => {
    setIsEditingSkills(false)
    toast({
      title: "Skills updated",
      description: "Your skills have been updated successfully.",
    })
  }

  return (
    <EmployeeDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">My Profile</h2>
            <p className="text-slate-400">Manage your personal information and career details</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
            Preview Public Profile
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
                      <AvatarFallback className="bg-slate-800 text-white text-2xl">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                  <p className="text-slate-400">Senior Frontend Developer</p>
                  <div className="mt-2 flex items-center justify-center text-sm text-slate-400">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>Lahore, Pakistan</span>
                  </div>
                  <div className="mt-4 flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-slate-700 text-white hover:bg-slate-800"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-slate-700 text-white hover:bg-slate-800"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-slate-700 text-white hover:bg-slate-800"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-slate-700 text-white hover:bg-slate-800"
                    >
                      <Globe className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Skills</CardTitle>
                  {!isEditingSkills ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                      onClick={() => setIsEditingSkills(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-500 hover:text-green-400"
                      onClick={handleSaveSkills}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditingSkills ? (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                      <Button
                        variant="outline"
                        className="border-slate-700 text-white hover:bg-slate-800"
                        onClick={handleAddSkill}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-slate-800 text-slate-300 border-slate-700 flex items-center gap-1"
                        >
                          {skill}
                          <button
                            className="ml-1 text-slate-400 hover:text-white"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="text-white">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <p className="text-white">+92 300 1234567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="text-white">Lahore, Pakistan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="bg-slate-800 border border-slate-700">
                <TabsTrigger value="about" className="data-[state=active]:bg-slate-700">
                  About
                </TabsTrigger>
                <TabsTrigger value="experience" className="data-[state=active]:bg-slate-700">
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-slate-700">
                  Education
                </TabsTrigger>
                <TabsTrigger value="certifications" className="data-[state=active]:bg-slate-700">
                  Certifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Personal Information</CardTitle>
                      {!isEditingPersonal ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                          onClick={() => setIsEditingPersonal(true)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-500 hover:text-green-400"
                          onClick={handleSavePersonal}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isEditingPersonal ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-white">
                              Full Name
                            </Label>
                            <Input
                              id="fullName"
                              defaultValue={user?.name}
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="title" className="text-white">
                              Professional Title
                            </Label>
                            <Input
                              id="title"
                              defaultValue="Senior Frontend Developer"
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">
                              Email
                            </Label>
                            <Input
                              id="email"
                              defaultValue={user?.email}
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white">
                              Phone
                            </Label>
                            <Input
                              id="phone"
                              defaultValue="+92 300 1234567"
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location" className="text-white">
                              Location
                            </Label>
                            <Input
                              id="location"
                              defaultValue="Lahore, Pakistan"
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website" className="text-white">
                              Website
                            </Label>
                            <Input
                              id="website"
                              defaultValue="https://myportfolio.com"
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio" className="text-white">
                            Professional Summary
                          </Label>
                          <Textarea
                            id="bio"
                            rows={6}
                            defaultValue="Experienced Frontend Developer with 5+ years of expertise in building responsive web applications using React, TypeScript, and Next.js. Passionate about creating intuitive user interfaces and optimizing web performance."
                            className="bg-slate-800 border-slate-700 text-white resize-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-white mb-2">Professional Summary</h3>
                          <p className="text-slate-400">
                            Experienced Frontend Developer with 5+ years of expertise in building responsive web
                            applications using React, TypeScript, and Next.js. Passionate about creating intuitive user
                            interfaces and optimizing web performance.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-400">Full Name</p>
                            <p className="text-white">{user?.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Professional Title</p>
                            <p className="text-white">Senior Frontend Developer</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Email</p>
                            <p className="text-white">{user?.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Phone</p>
                            <p className="text-white">+92 300 1234567</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Location</p>
                            <p className="text-white">Lahore, Pakistan</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Website</p>
                            <p className="text-white">https://myportfolio.com</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Work Experience</CardTitle>
                      <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[1, 2].map((exp) => (
                        <div key={exp} className="border-b border-slate-800 pb-6 last:border-0 last:pb-0">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center text-white font-bold">
                                {exp === 1 ? "TC" : "AI"}
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-white">
                                  {exp === 1 ? "Senior Frontend Developer" : "Frontend Developer"}
                                </h3>
                                <p className="text-slate-400">{exp === 1 ? "TechCorp Pakistan" : "Acme Inc"}</p>
                                <p className="text-sm text-slate-500">
                                  {exp === 1 ? "Jan 2021 - Present" : "Mar 2018 - Dec 2020"} •
                                  {exp === 1 ? " 2 years 5 months" : " 2 years 9 months"}
                                </p>
                                <p className="text-sm text-slate-500">
                                  {exp === 1 ? "Lahore, Pakistan" : "Karachi, Pakistan"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-slate-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 pl-16">
                            <p className="text-slate-400">
                              {exp === 1
                                ? "Led the frontend development team in building responsive web applications using React, TypeScript, and Next.js. Implemented CI/CD pipelines and improved web performance by 40%."
                                : "Developed and maintained multiple client websites using React and JavaScript. Collaborated with designers to implement UI/UX improvements and responsive designs."}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Education</CardTitle>
                      <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[1, 2].map((edu) => (
                        <div key={edu} className="border-b border-slate-800 pb-6 last:border-0 last:pb-0">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center text-white font-bold">
                                {edu === 1 ? "NU" : "PU"}
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-white">
                                  {edu === 1 ? "BS Computer Science" : "MS Computer Science"}
                                </h3>
                                <p className="text-slate-400">
                                  {edu === 1
                                    ? "National University of Computer & Emerging Sciences"
                                    : "Punjab University"}
                                </p>
                                <p className="text-sm text-slate-500">{edu === 1 ? "2014 - 2018" : "2018 - 2020"}</p>
                                <p className="text-sm text-slate-500">
                                  {edu === 1 ? "CGPA: 3.8/4.0" : "CGPA: 3.9/4.0"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-slate-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications">
                <Card className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Certifications</CardTitle>
                      <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Certification
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[1, 2, 3].map((cert) => (
                        <div key={cert} className="border-b border-slate-800 pb-6 last:border-0 last:pb-0">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center text-white font-bold">
                                {cert === 1 ? "AWS" : cert === 2 ? "GCP" : "MS"}
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-white">
                                  {cert === 1
                                    ? "AWS Certified Developer"
                                    : cert === 2
                                      ? "Google Cloud Professional Developer"
                                      : "Microsoft Certified: Azure Developer Associate"}
                                </h3>
                                <p className="text-slate-400">
                                  {cert === 1
                                    ? "Amazon Web Services"
                                    : cert === 2
                                      ? "Google Cloud Platform"
                                      : "Microsoft"}
                                </p>
                                <p className="text-sm text-slate-500">
                                  Issued: {cert === 1 ? "Jan 2022" : cert === 2 ? "Aug 2021" : "Mar 2020"} • Expires:{" "}
                                  {cert === 1 ? "Jan 2025" : cert === 2 ? "Aug 2024" : "Mar 2023"}
                                </p>
                                <p className="text-sm text-slate-500">
                                  Credential ID:{" "}
                                  {cert === 1 ? "AWS-DEV-12345" : cert === 2 ? "GCP-PD-67890" : "MS-AZ-24680"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-slate-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </EmployeeDashboardLayout>
  )
}
