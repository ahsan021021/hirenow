"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { registerCompany } from "@/app/services/companyService"
import { useAuth } from "@/hooks/use-auth"
import { Building, MapPin, Globe, Phone, Mail, Users, Calendar } from "lucide-react"

export default function CompanyRegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    website: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "Pakistan",
    description: "",
    logo: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.companyName || !formData.industry || !formData.email) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Create form data for file upload
      const data = new FormData()
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key])
        }
      })

      // Register company
      const response = await registerCompany(data)

      toast({
        title: "Registration successful",
        description: "Your company has been registered successfully.",
      })

      // Redirect to employer onboarding
      router.push("/employer/onboarding")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Register Your Company</h1>
          <p className="text-slate-400 mt-2">Create your employer profile to start hiring top talent in Pakistan</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Company Information</CardTitle>
              <CardDescription>Provide details about your company to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-white">
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                        placeholder="Your company name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-white">
                      Industry <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => handleSelectChange("industry", value)}
                      required
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySize" className="text-white">
                      Company Size
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Select
                        value={formData.companySize}
                        onValueChange={(value) => handleSelectChange("companySize", value)}
                      >
                        <SelectTrigger className="pl-10 bg-slate-800 border-slate-700 text-white">
                          <SelectValue placeholder="Number of employees" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501-1000">501-1000 employees</SelectItem>
                          <SelectItem value="1001+">1001+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundedYear" className="text-white">
                      Founded Year
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="foundedYear"
                        name="foundedYear"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={formData.foundedYear}
                        onChange={handleInputChange}
                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                        placeholder="e.g. 2010"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-white">
                      Website
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                        placeholder="https://www.example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                        placeholder="+92 XXX XXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Company Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                        placeholder="info@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      Address
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                        placeholder="Street address"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white">
                      City
                    </Label>
                    <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="karachi">Karachi</SelectItem>
                        <SelectItem value="lahore">Lahore</SelectItem>
                        <SelectItem value="islamabad">Islamabad</SelectItem>
                        <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                        <SelectItem value="faisalabad">Faisalabad</SelectItem>
                        <SelectItem value="multan">Multan</SelectItem>
                        <SelectItem value="peshawar">Peshawar</SelectItem>
                        <SelectItem value="quetta">Quetta</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white">
                      Country
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="bg-slate-800 border-slate-700 text-white"
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Company Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
                    placeholder="Tell us about your company, mission, and culture..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo" className="text-white">
                    Company Logo
                  </Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                  <p className="text-xs text-slate-500">Recommended size: 400x400px. Max file size: 2MB.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register Company"}
              </Button>
              <p className="text-sm text-slate-400 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-cyan-500 hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
