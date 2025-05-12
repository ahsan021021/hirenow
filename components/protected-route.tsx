"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "employee" | "employer" | "admin"
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter()
  const { user, loading, checkAuth } = useAuth()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!loading) {
        // Check if user is authenticated
        const isUserAuthenticated = await checkAuth()

        if (!isUserAuthenticated) {
          // If not authenticated, redirect to login
          router.push("/login")
          return
        }

        // If role is required, check if user has the required role
        if (requiredRole && user?.role !== requiredRole) {
          // If not, redirect to appropriate dashboard
          if (user?.role === "employee") {
            router.push("/employee/dashboard")
          } else if (user?.role === "employer") {
            router.push("/employer/dashboard")
          } else if (user?.role === "admin") {
            router.push("/admin/dashboard")
          } else {
            router.push("/login")
          }
          return
        }

        // Check onboarding status for employees and employers
        if (
          user?.role === "employee" &&
          !user.onboardingCompleted &&
          !window.location.pathname.includes("/onboarding")
        ) {
          router.push("/employee/onboarding")
          return
        }

        if (
          user?.role === "employer" &&
          !user.onboardingCompleted &&
          !window.location.pathname.includes("/onboarding")
        ) {
          router.push("/employer/onboarding")
          return
        }

        setIsChecking(false)
      }
    }

    checkAuthentication()
  }, [loading, user, router, checkAuth, requiredRole])

  // Show nothing while checking authentication
  if (loading || isChecking) {
    return null
  }

  // If all checks pass, render the children
  return <>{children}</>
}
