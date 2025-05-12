"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { Eye, EyeOff, Loader2, User, Building } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || "employee"
  const { toast } = useToast()
  const { register } = useAuth()

  const [userType, setUserType] = useState<"employee" | "employer">(
    defaultType === "employer" ? "employer" : "employee",
  )
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
    terms?: string
  }>({})

  const validateForm = () => {
    const newErrors: {
      fullName?: string
      email?: string
      password?: string
      confirmPassword?: string
      terms?: string
    } = {}

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Update the handleSubmit function to better handle registration and redirection
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      await register({
        name: fullName,
        email,
        password,
        passwordConfirm: confirmPassword,
        role: userType,
      })

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      })

      // Redirect to dashboard based on user type
      // This is handled in the auth provider, but we can add a fallback here
      setTimeout(() => {
        if (userType === "employee") {
          router.push("/employee/onboarding")
        } else if (userType === "employer") {
          router.push("/employer/onboarding")
        }
      }, 500)
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">
        <motion.div
          className="w-full max-w-md px-8 py-12 rounded-xl bg-slate-900 border border-slate-800 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Create an Account</h1>
            <p className="mt-2 text-slate-400">Join HireNow.pk and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <RadioGroup
              value={userType}
              onValueChange={(value) => setUserType(value as "employee" | "employer")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="employee" id="employee" className="peer sr-only" />
                <Label
                  htmlFor="employee"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-slate-800 bg-slate-900 p-4 hover:border-cyan-900 peer-data-[state=checked]:border-cyan-500 [&:has([data-state=checked])]:border-cyan-500"
                >
                  <User className="mb-2 h-6 w-6 text-slate-400 peer-data-[state=checked]:text-cyan-500" />
                  <span className="text-white">Job Seeker</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="employer" id="employer" className="peer sr-only" />
                <Label
                  htmlFor="employer"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-slate-800 bg-slate-900 p-4 hover:border-cyan-900 peer-data-[state=checked]:border-cyan-500 [&:has([data-state=checked])]:border-cyan-500"
                >
                  <Building className="mb-2 h-6 w-6 text-slate-400 peer-data-[state=checked]:text-cyan-500" />
                  <span className="text-white">Employer</span>
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">
                {userType === "employer" ? "Company Name" : "Full Name"}
              </Label>
              <Input
                id="fullName"
                placeholder={userType === "employer" ? "Acme Inc." : "John Doe"}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`bg-slate-800 border-slate-700 text-white ${errors.fullName ? "border-red-500" : ""}`}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-slate-800 border-slate-700 text-white ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-slate-800 border-slate-700 text-white pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`bg-slate-800 border-slate-700 text-white pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className={errors.terms ? "border-red-500" : ""}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm text-slate-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-cyan-500 hover:text-cyan-400">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-cyan-500 hover:text-cyan-400">
                    Privacy Policy
                  </Link>
                </Label>
                {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-500 hover:text-cyan-400">
                Sign in
              </Link>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
