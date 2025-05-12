"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { MapPin, Mail, Phone, Globe, Linkedin, Facebook, Upload, Edit, Save, Plus, X, Clock, Users } from "lucide-react"

export default function CompanyProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditingCompany, setIsEditingCompany] = useState(false)
  const [isEditingTeam, setIsEditingTeam] = useState(false)
  const [benefits, setBenefits] = useState([
    "Flexible working hours",
    "Health insurance",
    "Professional development",
    "Remote work options",
    "Competitive salary",
  ])
  const [newBenefit, setNewBenefit] = useState("")

  const handleSaveCompany = () => {
    setIsEditingCompany(false)
    toast({
      title: "Company profile updated",
      description: "Your company information has been updated successfully.",
    })
  }

  const handleSaveTeam = () => {
    setIsEditingTeam(false)
    toast({
      title: "Team information updated",
      description: "Your team information has been updated successfully.",
    })
  }

  const handleAddBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const handleRemoveBenefit = (benefitToRemove: string) => {
    setBenefits(benefits.filter((benefit) => benefit !== benefitToRemove))
  }

  return (
    <EmployerDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Company Profile</h2>
            <p className="text-slate-400">Manage your company information and team details</p>
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
                      <AvatarImage src="/placeholder.svg" alt={user?.name || "Company"} />
                      <AvatarFallback className="bg-slate-800 text-white text-2xl">
                        {user?.name?.charAt(0) || "C"}
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
                  <p className="text-slate-400">Software Development Company</p>
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
                      <Globe className="h-4 w-4" />
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
                      <Facebook className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
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
                    <p className="text-white">info@techcorp.pk</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <p className="text-white">+92 42 35880001</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-400">Website</p>
                    <p className="text-white">www.techcorp.pk</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-400">Address</p>
                    <p className="text-white">123 Tech Street, Gulberg III, Lahore, Pakistan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Benefits & Perks</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                    onClick={() => setIsEditingCompany(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditingCompany ? (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a benefit"
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                      <Button
                        variant="outline"
                        className="border-slate-700 text-white hover:bg-slate-800"
                        onClick={handleAddBenefit}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span className="text-slate-300">{benefit}</span>
                          <button
                            className="text-slate-400 hover:text-white"
                            onClick={() => handleRemoveBenefit(benefit)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      onClick={handleSaveCompany}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></div>
                        <span className="text-slate-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="bg-slate-800 border border-slate-700">
                <TabsTrigger value="about" className="data-[state=active]:bg-slate-700">
                  About
                </TabsTrigger>
                <TabsTrigger value="team" className="data-[state=active]:bg-slate-700">
                  Team
                </TabsTrigger>
                <TabsTrigger value="jobs" className="data-[state=active]:bg-slate-700">
                  Jobs
                </TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-slate-700">
                  Gallery
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Company Information</CardTitle>
                      {!isEditingCompany ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                          onClick={() => setIsEditingCompany(true)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-500 hover:text-green-400"
                          onClick={handleSaveCompany}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isEditingCompany ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="companyName" className="text-white">
                              Company Name
                            </Label>
                            <Input
                              id="companyName"
                              defaultValue={user?.name}
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="industry" className="text-white">
                              Industry
                            </Label>
                            <Input
                              id="industry"
                              defaultValue="Software Development"
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="companySize" className="text-white">
                              Company Size
                            </Label>
                            <select
                              id="companySize"
                              className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                              defaultValue="51-200"
                            >
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="201-500">201-500 employees</option>
                              <option value="501-1000">501-1000 employees</option>
                              <option value="1001+">1001+ employees</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="founded" className="text-white">
                              Founded
                            </Label>
                            <Input
                              id="founded"
                              type="number"
                              defaultValue="2010"
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website" className="text-white">
                              Website
                            </Label>
                            <Input
                              id="website"
                              defaultValue="https://www.techcorp.pk"
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location" className="text-white">
                              Headquarters
                            </Label>
                            <Input
                              id="location"
                              defaultValue="Lahore, Pakistan"
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="about" className="text-white">
                            About Company
                          </Label>
                          <Textarea
                            id="about"
                            rows={6}
                            defaultValue="TechCorp Pakistan is a leading software development company specializing in web and mobile application development. With over a decade of experience, we've helped businesses of all sizes transform their digital presence. Our team of skilled developers, designers, and project managers work together to deliver innovative solutions that drive growth and efficiency."
                            className="bg-slate-800 border-slate-700 text-white resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mission" className="text-white">
                            Mission & Vision
                          </Label>
                          <Textarea
                            id="mission"
                            rows={4}
                            defaultValue="Our mission is to empower businesses through technology by providing innovative, reliable, and scalable software solutions. We envision a future where every business in Pakistan has access to world-class technology solutions that drive growth and success."
                            className="bg-slate-800 border-slate-700 text-white resize-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-white mb-2">About Company</h3>
                          <p className="text-slate-400">
                            TechCorp Pakistan is a leading software development company specializing in web and mobile
                            application development. With over a decade of experience, we've helped businesses of all
                            sizes transform their digital presence. Our team of skilled developers, designers, and
                            project managers work together to deliver innovative solutions that drive growth and
                            efficiency.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white mb-2">Mission & Vision</h3>
                          <p className="text-slate-400">
                            Our mission is to empower businesses through technology by providing innovative, reliable,
                            and scalable software solutions. We envision a future where every business in Pakistan has
                            access to world-class technology solutions that drive growth and success.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-400">Industry</p>
                            <p className="text-white">Software Development</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Company Size</p>
                            <p className="text-white">51-200 employees</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Founded</p>
                            <p className="text-white">2010</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Headquarters</p>
                            <p className="text-white">Lahore, Pakistan</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team">
                <Card className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Leadership Team</CardTitle>
                      {!isEditingTeam ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                          onClick={() => setIsEditingTeam(true)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-500 hover:text-green-400"
                          onClick={handleSaveTeam}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isEditingTeam ? (
                      <div className="space-y-6">
                        {[1, 2, 3].map((member) => (
                          <div
                            key={member}
                            className="space-y-4 border-b border-slate-800 pb-6 last:border-0 last:pb-0"
                          >
                            <div className="flex items-start gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src="/placeholder.svg" alt="Team Member" />
                                <AvatarFallback className="bg-slate-700 text-white">
                                  {member === 1 ? "MR" : member === 2 ? "SA" : "AK"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`name-${member}`} className="text-white">
                                    Name
                                  </Label>
                                  <Input
                                    id={`name-${member}`}
                                    defaultValue={
                                      member === 1 ? "Muhammad Raza" : member === 2 ? "Sarah Ahmed" : "Ali Khan"
                                    }
                                    className="bg-slate-800 border-slate-700 text-white"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`position-${member}`} className="text-white">
                                    Position
                                  </Label>
                                  <Input
                                    id={`position-${member}`}
                                    defaultValue={member === 1 ? "CEO" : member === 2 ? "CTO" : "Head of HR"}
                                    className="bg-slate-800 border-slate-700 text-white"
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <Label htmlFor={`bio-${member}`} className="text-white">
                                    Bio
                                  </Label>
                                  <Textarea
                                    id={`bio-${member}`}
                                    rows={3}
                                    defaultValue={
                                      member === 1
                                        ? "Founder and CEO with 15+ years of experience in the tech industry. Passionate about innovation and technology."
                                        : member === 2
                                          ? "Technical leader with expertise in software architecture and emerging technologies."
                                          : "HR professional focused on building great teams and company culture."
                                    }
                                    className="bg-slate-800 border-slate-700 text-white resize-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Team Member
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3].map((member) => (
                          <div key={member} className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                              <AvatarImage src="/placeholder.svg" alt="Team Member" />
                              <AvatarFallback className="bg-slate-700 text-white text-xl">
                                {member === 1 ? "MR" : member === 2 ? "SA" : "AK"}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-medium text-white">
                              {member === 1 ? "Muhammad Raza" : member === 2 ? "Sarah Ahmed" : "Ali Khan"}
                            </h3>
                            <p className="text-cyan-500">
                              {member === 1 ? "CEO" : member === 2 ? "CTO" : "Head of HR"}
                            </p>
                            <p className="mt-2 text-sm text-slate-400">
                              {member === 1
                                ? "Founder and CEO with 15+ years of experience in the tech industry. Passionate about innovation and technology."
                                : member === 2
                                  ? "Technical leader with expertise in software architecture and emerging technologies."
                                  : "HR professional focused on building great teams and company culture."}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jobs">
                <Card className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Active Job Listings</CardTitle>
                      <Button
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        onClick={() => (window.location.href = "/employer/post-job")}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Job
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[1, 2, 3].map((job) => (
                        <div
                          key={job}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 last:border-0 last:pb-0"
                        >
                          <div>
                            <h3 className="text-lg font-medium text-white">
                              {job === 1
                                ? "Senior React Developer"
                                : job === 2
                                  ? "UI/UX Designer"
                                  : "Full Stack Developer"}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>{job === 1 ? "Lahore" : job === 2 ? "Remote" : "Islamabad"}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>Posted {job * 2} days ago</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="mr-1 h-3 w-3" />
                                <span>{job * 10 + 5} applicants</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-700 text-white hover:bg-slate-800"
                            >
                              View Applicants
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-700 text-white hover:bg-slate-800"
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery">
                <Card className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Company Gallery</CardTitle>
                      <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Photos
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((photo) => (
                        <div key={photo} className="relative aspect-video rounded-lg overflow-hidden group">
                          <img
                            src={`/placeholder.svg?height=200&width=300`}
                            alt={`Company photo ${photo}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
                            >
                              <X className="h-4 w-4" />
                            </Button>
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
    </EmployerDashboardLayout>
  )
}
