"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { resetPassword } from "@/app/services/authService"
import { ArrowLeft, Check, Eye, EyeOff, Loader2, Lock } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{
    password?: string
    passwordConfirm?: string
  }>({})

  const token = params.token as string

  // Password validation
  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters" }))
      return false
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      setErrors((prev) => ({ ...prev, password: "Password must contain at least one uppercase letter" }))
      return false
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      setErrors((prev) => ({ ...prev, password: "Password must contain at least one lowercase letter" }))
      return false
    }

    // Check for at least one number
    if (!/\d/.test(password)) {
      setErrors((prev) => ({ ...prev, password: "Password must contain at least one number" }))
      return false
    }

    setErrors((prev) => ({ ...prev, password: undefined }))
    return true
  }

  const validateForm = (): boolean => {
    let isValid = true

    if (!validatePassword(password)) {
      isValid = false
    }

    if (password !== passwordConfirm) {
      setErrors((prev) => ({ ...prev, passwordConfirm: "Passwords do not match" }))
      isValid = false
    } else {
      setErrors((prev) => ({ ...prev, passwordConfirm: undefined }))
    }

    return isValid
  }

  // Update the handleSubmit function to better handle redirection after password reset
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      await resetPassword(token, { password, passwordConfirm })

      setIsSuccess(true)
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now log in with your new password.",
      })

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.response?.data?.error || "Invalid or expired token. Please try again.",
        variant: "destructive",
      })
    } finally {
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
          {!isSuccess ? (
            <>
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                  <Lock className="h-8 w-8 text-cyan-500" />
                </div>
                <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
                <p className="mt-2 text-slate-400">Enter your new password below</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        validatePassword(e.target.value)
                      }}
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
                  <Label htmlFor="passwordConfirm" className="text-white">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="passwordConfirm"
                      type={showPasswordConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      className={`bg-slate-800 border-slate-700 text-white pr-10 ${
                        errors.passwordConfirm ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    >
                      {showPasswordConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.passwordConfirm && <p className="text-sm text-red-500">{errors.passwordConfirm}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>

                <div className="text-center text-sm text-slate-400">
                  <Link href="/login" className="flex items-center justify-center text-cyan-500 hover:text-cyan-400">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-white">Password Reset Successful</h1>
              <p className="mt-4 text-slate-400">Your password has been reset successfully.</p>
              <p className="mt-2 text-slate-400">You will be redirected to the login page in a few seconds.</p>
              <div className="mt-8">
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  onClick={() => router.push("/login")}
                >
                  Go to Login
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
