"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Define the User type
type User = {
  id: string
  name: string
  email: string
  role: "employee" | "employer" | "admin"
  profileCompleted?: boolean
  onboardingCompleted?: boolean
  [key: string]: any // Allow for additional properties
}

// Define the AuthContextType
type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateUser: (userData: any) => Promise<void>
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create the AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Initialize user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock login logic
      if (email === "employee@example.com" && password === "password") {
        const mockUser: User = {
          id: "1",
          name: "Demo Employee",
          email: "employee@example.com",
          role: "employee",
          profileCompleted: true,
          onboardingCompleted: true,
          phone: "+92 300 1234567",
          location: "Karachi, Pakistan",
          bio: "Experienced software developer with a passion for creating user-friendly applications.",
          skills: ["JavaScript", "React", "Node.js", "TypeScript", "UI/UX Design"],
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: "Welcome back, Demo Employee!",
        })

        router.push("/employee/dashboard")
      } else if (email === "employer@example.com" && password === "password") {
        const mockUser: User = {
          id: "3",
          name: "Demo Employer",
          email: "employer@example.com",
          role: "employer",
          profileCompleted: true,
          onboardingCompleted: true,
          company: {
            name: "Tech Innovations",
            website: "https://techinnovations.example.com",
            industry: "Information Technology",
          },
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: "Welcome back, Demo Employer!",
        })

        router.push("/employer/dashboard")
      } else if (email === "admin@example.com" && password === "password") {
        const mockUser: User = {
          id: "5",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          profileCompleted: true,
          onboardingCompleted: true,
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: "Welcome back, Admin!",
        })

        router.push("/admin/dashboard")
      } else {
        // For demo purposes, create a user based on the email
        const mockUser: User = {
          id: "999",
          name: email.split("@")[0],
          email: email,
          role: "employee",
          profileCompleted: false,
          onboardingCompleted: false,
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: `Welcome, ${mockUser.name}!`,
        })

        router.push("/employee/onboarding")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (userData: any) => {
    try {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a mock user based on registration data
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000).toString(),
        name: userData.name || userData.email.split("@")[0],
        email: userData.email,
        role: userData.role || "employee",
        profileCompleted: false,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
      })

      // Redirect based on role
      if (mockUser.role === "employee") {
        router.push("/employee/onboarding")
      } else if (mockUser.role === "employer") {
        router.push("/employer/onboarding")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "Failed to create your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  // Update user function
  const updateUser = async (userData: any) => {
    try {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the user with new data
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully!",
      })

      return updatedUser
    } catch (error) {
      console.error("Update user error:", error)
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Create the context value
  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Create the useAuth hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
