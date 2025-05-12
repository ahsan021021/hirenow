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
import { ArrowLeft, Loader2, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would call an API to send a password reset email
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "If an account exists with this email, you will receive a password reset link.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending the reset link. Please try again.",
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
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
                <p className="mt-2 text-slate-400">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 bg-slate-800 border-slate-700 text-white ${error ? "border-red-500" : ""}`}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
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
              <div className="mx-auto w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-cyan-500" />
              </div>
              <h1 className="text-2xl font-bold text-white">Check Your Email</h1>
              <p className="mt-4 text-slate-400">
                We've sent a password reset link to <span className="text-white font-medium">{email}</span>
              </p>
              <p className="mt-2 text-slate-400">
                Please check your email and follow the instructions to reset your password.
              </p>
              <div className="mt-8 space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  onClick={() => setIsSubmitted(false)}
                >
                  Resend Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-white hover:bg-slate-800"
                  onClick={() => router.push("/login")}
                >
                  Back to Login
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
