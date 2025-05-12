"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const validateForm = () => {
    const newErrors: {
      email?: string
      password?: string
    } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Update the handleSubmit function to better handle login and redirection
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      await login({
        email,
        password,
      })

      // The redirect is handled in the auth provider
      // But we can add a fallback here
      setTimeout(() => {
        const user = localStorage.getItem("user")
        if (user) {
          const userData = JSON.parse(user)
          if (userData.role === "employee") {
            router.push("/employee/dashboard")
          } else if (userData.role === "employer") {
            router.push("/employer/dashboard")
          } else if (userData.role === "admin") {
            router.push("/admin/dashboard")
          }
        }
      }, 500)
    } catch (error) {
      // Error is handled in the auth provider
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
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-slate-400">Sign in to your HireNow.pk account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-cyan-500 hover:text-cyan-400">
                  Forgot password?
                </Link>
              </div>
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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-cyan-500 hover:text-cyan-400">
                Sign up
              </Link>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
