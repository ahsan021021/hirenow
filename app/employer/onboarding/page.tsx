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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { Building, MapPin, Globe, CheckCircle, ChevronRight, ChevronLeft, Upload } from "lucide-react"
import api from "@/app/api/api"

export default function EmployerOnboarding() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Company Info
  const [companyInfo, setCompanyInfo] = useState({
    name: user?.name || "",
    industry: "",
    size: "",
    founded: "",
    website: "",
    location: "",
    description: "",
  })

  // Social Media
  const [socialMedia, setSocialMedia] = useState({
    linkedin: "",
    twitter: "",
    facebook: "",
  })

  // Logo
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  // Handle company info change
  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.name]: e.target.value,
    })
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setCompanyInfo({
      ...companyInfo,
      [name]: value,
    })
  }

  // Handle social media change
  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialMedia({
      ...socialMedia,
      [e.target.name]: e.target.value,
    })
  }

  // Handle logo change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogo(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle next step
  const handleNextStep = () => {
    if (step === 1) {
      if (!companyInfo.name || !companyInfo.industry || !companyInfo.location) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
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

      // Create company
      const companyData = {
        ...companyInfo,
        socialMedia,
      }

      const { data: companyResponse } = await api.post("/companies", companyData)

      // Upload logo if exists
      if (logo && companyResponse.company._id) {
        const formData = new FormData()
        formData.append("logo", logo)

        await api.post(`/companies/${companyResponse.company._id}/logo`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      }

      // Update user
      await updateUser({
        name: companyInfo.name,
        profileCompleted: true,
        onboardingCompleted: true,
      })

      // Complete onboarding
      await api.put("/users/onboarding", { completed: true })

      toast({
        title: "Onboarding completed",
        description: "Your company profile has been set up successfully!",
      })

      // Redirect to dashboard
      router.push("/employer/dashboard")
    } catch (error) {
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
          <h1 className="text-3xl font-bold text-white">Set Up Your Company Profile</h1>
          <p className="mt-2 text-slate-400">Let's create your company profile to help you find the best talent</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-cyan-500" : "bg-slate-700"}`}
            >
              <Building className="h-5 w-5 text-white" />
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? "bg-cyan-500" : "bg-slate-700"}`}></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-cyan-500" : "bg-slate-700"}`}
            >
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? "bg-cyan-500" : "bg-slate-700"}`}></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-cyan-500" : "bg-slate-700"}`}
            >
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="text-sm text-slate-400">Step {step} of 3</div>
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
                <h2 className="text-xl font-semibold text-white mb-4">Company Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Company Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={companyInfo.name}
                      onChange={handleCompanyInfoChange}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry" className="text-white">
                        Industry
                      </Label>
                      <Select
                        value={companyInfo.industry}
                        onValueChange={(value) => handleSelectChange("industry", value)}
                      >
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="size" className="text-white">
                        Company Size
                      </Label>
                      <Select value={companyInfo.size} onValueChange={(value) => handleSelectChange("size", value)}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501-1000">501-1000 employees</SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="founded" className="text-white">
                        Founded Year
                      </Label>
                      <Input
                        id="founded"
                        name="founded"
                        type="number"
                        value={companyInfo.founded}
                        onChange={handleCompanyInfoChange}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                        placeholder="e.g. 2010"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-white">
                        Website
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        value={companyInfo.website}
                        onChange={handleCompanyInfoChange}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                        placeholder="e.g. https://example.com"
                      />
                    </div>
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
                        value={companyInfo.location}
                        onChange={handleCompanyInfoChange}
                        className="bg-slate-800 border-slate-700 text-white pl-10 mt-1"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">
                      Company Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={companyInfo.description}
                      onChange={handleCompanyInfoChange}
                      className="bg-slate-800 border-slate-700 text-white mt-1 h-32"
                      placeholder="Write a description about your company"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Online Presence</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Company Logo</h3>

                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-lg p-6 bg-slate-800/50">
                      {logoPreview ? (
                        <div className="text-center">
                          <img
                            src={logoPreview || "/placeholder.svg"}
                            alt="Company Logo Preview"
                            className="w-32 h-32 object-contain mx-auto mb-4"
                          />
                          <Button
                            variant="outline"
                            className="border-slate-700 text-white hover:bg-slate-800"
                            onClick={() => {
                              setLogo(null)
                              setLogoPreview(null)
                            }}
                          >
                            Remove Logo
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-slate-400 mb-4">Upload your company logo</p>
                          <Label
                            htmlFor="logo-upload"
                            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md cursor-pointer"
                          >
                            Choose File
                          </Label>
                          <Input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Social Media</h3>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="linkedin" className="text-white">
                          LinkedIn
                        </Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          value={socialMedia.linkedin}
                          onChange={handleSocialMediaChange}
                          className="bg-slate-800 border-slate-700 text-white mt-1"
                          placeholder="e.g. https://linkedin.com/company/yourcompany"
                        />
                      </div>

                      <div>
                        <Label htmlFor="twitter" className="text-white">
                          Twitter
                        </Label>
                        <Input
                          id="twitter"
                          name="twitter"
                          value={socialMedia.twitter}
                          onChange={handleSocialMediaChange}
                          className="bg-slate-800 border-slate-700 text-white mt-1"
                          placeholder="e.g. https://twitter.com/yourcompany"
                        />
                      </div>

                      <div>
                        <Label htmlFor="facebook" className="text-white">
                          Facebook
                        </Label>
                        <Input
                          id="facebook"
                          name="facebook"
                          value={socialMedia.facebook}
                          onChange={handleSocialMediaChange}
                          className="bg-slate-800 border-slate-700 text-white mt-1"
                          placeholder="e.g. https://facebook.com/yourcompany"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Review & Complete</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Company Information</h3>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-400">Company Name</p>
                          <p className="text-white">{companyInfo.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Industry</p>
                          <p className="text-white">{companyInfo.industry || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Size</p>
                          <p className="text-white">{companyInfo.size || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Founded</p>
                          <p className="text-white">{companyInfo.founded || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Website</p>
                          <p className="text-white">{companyInfo.website || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Location</p>
                          <p className="text-white">{companyInfo.location}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-slate-400">Description</p>
                        <p className="text-white">{companyInfo.description || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Company Logo</h3>
                    <div className="bg-slate-800 rounded-lg p-4 flex justify-center">
                      {logoPreview ? (
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Company Logo"
                          className="w-32 h-32 object-contain"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center">
                          <Building className="h-12 w-12 text-slate-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Social Media</h3>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-slate-400">LinkedIn</p>
                          <p className="text-white">{socialMedia.linkedin || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Twitter</p>
                          <p className="text-white">{socialMedia.twitter || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Facebook</p>
                          <p className="text-white">{socialMedia.facebook || "Not provided"}</p>
                        </div>
                      </div>
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

          {step < 3 ? (
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
