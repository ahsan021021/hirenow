"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import api from "@/app/api/api"
import { disconnectSocket } from "@/app/services/socketService"
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getCurrentUser,
  updateCurrentUser,
  isTokenExpired,
  getToken,
  refreshToken,
} from "@/app/services/authService"

interface User {
  _id: string
  name: string
  email: string
  role: "employee" | "employer" | "admin"
  profileCompleted?: boolean
  onboardingCompleted?: boolean
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateUser: (userData: any) => Promise<void>
  isAuthenticated: boolean
  checkAuth: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Check authentication status
  const checkAuth = useCallback(async (): Promise<boolean> => {
    const token = getToken()

    if (!token) {
      setIsAuthenticated(false)
      setUser(null)
      return false
    }

    if (isTokenExpired(token)) {
      try {
        // Try to refresh the token
        const newToken = await refreshToken()
        if (!newToken) {
          setIsAuthenticated(false)
          setUser(null)
          return false
        }
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        return false
      }
    }

    // Get user from localStorage
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setIsAuthenticated(true)
      return true
    }

    // If user not in localStorage but token is valid, fetch user
    try {
      const { data } = await api.get("/auth/me")
      setUser(data.user)
      updateCurrentUser(data.user)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      return false
    }
  }, [])

  // Check if user is logged in on initial load
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth()
      setLoading(false)
    }

    initAuth()
  }, [checkAuth])

  // Set up token refresh interval
  useEffect(() => {
    if (isAuthenticated) {
      const refreshInterval = setInterval(
        async () => {
          const token = getToken()
          if (token && isTokenExpired(token)) {
            try {
              await refreshToken()
            } catch (error) {
              console.error("Failed to refresh token:", error)
            }
          }
        },
        5 * 60 * 1000,
      ) // Check every 5 minutes

      return () => clearInterval(refreshInterval)
    }
  }, [isAuthenticated])

  // Update the login function to handle redirections better
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const data = await loginService(credentials)

      setUser(data.user)
      setIsAuthenticated(true)

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })

      // Redirect based on user role and onboarding status
      if (data.user.role === "employee") {
        if (!data.user.onboardingCompleted) {
          router.push("/employee/onboarding")
        } else {
          router.push("/employee/dashboard")
        }
      } else if (data.user.role === "employer") {
        if (!data.user.onboardingCompleted) {
          router.push("/employer/onboarding")
        } else {
          router.push("/employer/dashboard")
        }
      } else if (data.user.role === "admin") {
        router.push("/admin/dashboard")
      }

      // Force a reload after redirect to ensure the app recognizes the auth state
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      })
      throw error
    }
  }

  // Update the register function to handle redirections better
  const register = async (userData: any) => {
    try {
      const data = await registerService(userData)

      setUser(data.user)
      setIsAuthenticated(true)

      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      })

      // Redirect based on user role
      if (data.user.role === "employee") {
        router.push("/employee/onboarding")
      } else if (data.user.role === "employer") {
        router.push("/employer/onboarding")
      }

      // Force a reload after redirect to ensure the app recognizes the auth state
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Could not create account",
        variant: "destructive",
      })
      throw error
    }
  }

  const logout = () => {
    logoutService()
    setUser(null)
    setIsAuthenticated(false)
    disconnectSocket()
    router.push("/login")
  }

  const updateUser = async (userData: any) => {
    try {
      const { data } = await api.put("/users/profile", userData)

      setUser(data.user)
      updateCurrentUser(data.user)

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })

      return data.user
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.response?.data?.message || "Could not update profile",
        variant: "destructive",
      })
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
