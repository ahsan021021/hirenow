"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { Briefcase, GraduationCap, User, MapPin, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react"

export default function EmployeeOnboarding() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
  })

  // Skills
  const [skills, setSkills] = useState<string[]>(user?.skills || [])
  const [skillInput, setSkillInput] = useState("")

  // Education
  const [education, setEducation] = useState<any[]>(user?.education || [])
  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  })

  // Experience
  const [experience, setExperience] = useState<any[]>(user?.experience || [])
  const [currentExperience, setCurrentExperience] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  })

  // Handle personal info change
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    })
  }

  // Add skill
  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput])
      setSkillInput("")
    }
  }

  // Remove skill
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  // Handle education change
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentEducation({
      ...currentEducation,
      [e.target.name]: e.target.value,
    })
  }

  // Add education
  const addEducation = () => {
    if (currentEducation.school && currentEducation.degree) {
      setEducation([...education, currentEducation])
      setCurrentEducation({
        school: "",
        degree: "",
        fieldOfStudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
      })
    }
  }

  // Remove education
  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  // Handle experience change
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentExperience({
      ...currentExperience,
      [e.target.name]: e.target.value,
    })
  }

  // Add experience
  const addExperience = () => {
    if (currentExperience.title && currentExperience.company) {
      setExperience([...experience, currentExperience])
      setCurrentExperience({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
      })
    }
  }

  // Remove experience
  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  // Handle next step
  const handleNextStep = () => {
    if (step === 1) {
      if (!personalInfo.name || !personalInfo.location) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
    } else if (step === 2) {
      if (skills.length === 0) {
        toast({
          title: "Missing skills",
          description: "Please add at least one skill",
          variant: "destructive",
        })
        return
      }
    }

    setStep(step + 1)
  }

  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1)
  }

  // Complete onboarding
  const completeOnboarding = async () => {
    try {
      setLoading(true)

      // Update user profile with mock data
      await updateUser({
        ...personalInfo,
        skills,
        education,
        experience,
        profileCompleted: true,
        onboardingCompleted: true,
      })

      // Simulate a delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Onboarding completed",
        description: "Your profile has been set up successfully!",
      })

      // Redirect to dashboard
      router.push("/employee/dashboard")
    } catch (error) {
      console.error("Onboarding error:", error)
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col">
      <main className="flex-1 container max-w-5xl py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Complete Your Profile</h1>
          <p className="mt-2 text-slate-400">Let's set up your profile to help you find the perfect job</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-cyan-500" : "bg-slate-700"}`}
            >
              <User className="h-5 w-5 text-white" />
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? "bg-cyan-500" : "bg-slate-700"}`}></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-cyan-500" : "bg-slate-700"}`}
            >
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? "bg-cyan-500" : "bg-slate-700"}`}></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-cyan-500" : "bg-slate-700"}`}
            >
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className={`h-1 w-16 ${step >= 4 ? "bg-cyan-500" : "bg-slate-700"}`}></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? "bg-cyan-500" : "bg-slate-700"}`}
            >
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="text-sm text-slate-400">Step {step} of 4</div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-white">
                      Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="location"
                        name="location"
                        value={personalInfo.location}
                        onChange={handlePersonalInfoChange}
                        className="bg-slate-800 border-slate-700 text-white pl-10 mt-1"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-white">
                      Professional Summary
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={personalInfo.bio}
                      onChange={handlePersonalInfoChange}
                      className="bg-slate-800 border-slate-700 text-white mt-1 h-32"
                      placeholder="Write a short professional summary about yourself"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="skills" className="text-white">
                      Add Your Skills
                    </Label>
                    <div className="flex mt-1">
                      <Input
                        id="skills"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white rounded-r-none"
                        placeholder="e.g. React, JavaScript, UI Design"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSkill()
                          }
                        }}
                      />
                      <Button onClick={addSkill} className="rounded-l-none bg-cyan-600 hover:bg-cyan-700">
                        Add
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Your Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skills.length === 0 ? (
                        <p className="text-slate-400 text-sm">No skills added yet</p>
                      ) : (
                        skills.map((skill, index) => (
                          <div key={index} className="bg-slate-800 text-white px-3 py-1 rounded-full flex items-center">
                            <span>{skill}</span>
                            <button
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-slate-400 hover:text-red-400"
                            >
                              &times;
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Education & Experience</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Education</h3>

                    <div className="space-y-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="school" className="text-white">
                            School/University
                          </Label>
                          <Input
                            id="school"
                            name="school"
                            value={currentEducation.school}
                            onChange={handleEducationChange}
                            className="bg-slate-800 border-slate-700 text-white mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="degree" className="text-white">
                            Degree
                          </Label>
                          <Input
                            id="degree"
                            name="degree"
                            value={currentEducation.degree}
                            onChange={handleEducationChange}
                            className="bg-slate-800 border-slate-700 text-white mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="fieldOfStudy" className="text-white">
                            Field of Study
                          </Label>
                          <Input
                            id="fieldOfStudy"
                            name="fieldOfStudy"
                            value={currentEducation.fieldOfStudy}
                            onChange={handleEducationChange}
                            className="bg-slate-800 border-slate-700 text-white mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor="from" className="text-white">
                              From
                            </Label>
                            <Input
                              id="from"
                              name="from"
                              type="date"
                              value={currentEducation.from}
                              onChange={handleEducationChange}
                              className="bg-slate-800 border-slate-700 text-white mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="to" className="text-white">
                              To
                            </Label>
                            <Input
                              id="to"
                              name="to"
                              type="date"
                              value={currentEducation.to}
                              onChange={handleEducationChange}
                              className="bg-slate-800 border-slate-700 text-white mt-1"
                            />
                          </div>
                        </div>
                      </div>

                      <Button onClick={addEducation} className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                        Add Education
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {education.length === 0 ? (
                        <p className="text-slate-400 text-sm">No education added yet</p>
                      ) : (
                        education.map((edu, index) => (
                          <div key={index} className="bg-slate-800 rounded-lg p-3 flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-white">
                                {edu.degree} in {edu.fieldOfStudy}
                              </h4>
                              <p className="text-sm text-slate-400">{edu.school}</p>
                              <p className="text-xs text-slate-500">
                                {new Date(edu.from).toLocaleDateString()} -
                                {edu.current ? " Present" : new Date(edu.to).toLocaleDateString()}
                              </p>
                            </div>
                            <button
                              onClick={() => removeEducation(index)}
                              className="text-slate-400 hover:text-red-400"
                            >
                              &times;
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Experience</h3>

                    <div className="space-y-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title" className="text-white">
                            Job Title
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            value={currentExperience.title}
                            onChange={handleExperienceChange}
                            className="bg-slate-800 border-slate-700 text-white mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="company" className="text-white">
                            Company
                          </Label>
                          <Input
                            id="company"
                            name="company"
                            value={currentExperience.company}
                            onChange={handleExperienceChange}
                            className="bg-slate-800 border-slate-700 text-white mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="expLocation" className="text-white">
                            Location
                          </Label>
                          <Input
                            id="expLocation"
                            name="location"
                            value={currentExperience.location}
                            onChange={handleExperienceChange}
                            className="bg-slate-800 border-slate-700 text-white mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor="expFrom" className="text-white">
                              From
                            </Label>
                            <Input
                              id="expFrom"
                              name="from"
                              type="date"
                              value={currentExperience.from}
                              onChange={handleExperienceChange}
                              className="bg-slate-800 border-slate-700 text-white mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="expTo" className="text-white">
                              To
                            </Label>
                            <Input
                              id="expTo"
                              name="to"
                              type="date"
                              value={currentExperience.to}
                              onChange={handleExperienceChange}
                              className="bg-slate-800 border-slate-700 text-white mt-1"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="expDescription" className="text-white">
                            Description
                          </Label>
                          <Textarea
                            id="expDescription"
                            name="description"
                            value={currentExperience.description}
                            onChange={handleExperienceChange}
                            className="bg-slate-800 border-slate-700 text-white mt-1"
                          />
                        </div>
                      </div>

                      <Button onClick={addExperience} className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                        Add Experience
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {experience.length === 0 ? (
                        <p className="text-slate-400 text-sm">No experience added yet</p>
                      ) : (
                        experience.map((exp, index) => (
                          <div key={index} className="bg-slate-800 rounded-lg p-3 flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-white">{exp.title}</h4>
                              <p className="text-sm text-slate-400">
                                {exp.company}, {exp.location}
                              </p>
                              <p className="text-xs text-slate-500">
                                {new Date(exp.from).toLocaleDateString()} -
                                {exp.current ? " Present" : new Date(exp.to).toLocaleDateString()}
                              </p>
                            </div>
                            <button
                              onClick={() => removeExperience(index)}
                              className="text-slate-400 hover:text-red-400"
                            >
                              &times;
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Review & Complete</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Personal Information</h3>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-400">Name</p>
                          <p className="text-white">{personalInfo.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Phone</p>
                          <p className="text-white">{personalInfo.phone || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Location</p>
                          <p className="text-white">{personalInfo.location}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-slate-400">Professional Summary</p>
                        <p className="text-white">{personalInfo.bio || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Skills</h3>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <div key={index} className="bg-slate-700 text-white px-3 py-1 rounded-full">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Education</h3>
                    <div className="bg-slate-800 rounded-lg p-4">
                      {education.length === 0 ? (
                        <p className="text-slate-400">No education added</p>
                      ) : (
                        <div className="space-y-3">
                          {education.map((edu, index) => (
                            <div key={index}>
                              <h4 className="font-medium text-white">
                                {edu.degree} in {edu.fieldOfStudy}
                              </h4>
                              <p className="text-sm text-slate-400">{edu.school}</p>
                              <p className="text-xs text-slate-500">
                                {new Date(edu.from).toLocaleDateString()} -
                                {edu.current ? " Present" : new Date(edu.to).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Experience</h3>
                    <div className="bg-slate-800 rounded-lg p-4">
                      {experience.length === 0 ? (
                        <p className="text-slate-400">No experience added</p>
                      ) : (
                        <div className="space-y-3">
                          {experience.map((exp, index) => (
                            <div key={index}>
                              <h4 className="font-medium text-white">{exp.title}</h4>
                              <p className="text-sm text-slate-400">
                                {exp.company}, {exp.location}
                              </p>
                              <p className="text-xs text-slate-500">
                                {new Date(exp.from).toLocaleDateString()} -
                                {exp.current ? " Present" : new Date(exp.to).toLocaleDateString()}
                              </p>
                              {exp.description && <p className="text-sm text-slate-400 mt-1">{exp.description}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <div className="mt-6 flex justify-between">
          {step > 1 ? (
            <Button
              onClick={handlePrevStep}
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <Button
              onClick={handleNextStep}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={completeOnboarding}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              {loading ? "Completing..." : "Complete Profile"}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
