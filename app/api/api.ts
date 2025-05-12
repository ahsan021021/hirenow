import axios from "axios"
import { getToken, isTokenExpired, isTokenExpiringSoon, refreshToken, removeToken } from "../services/authService"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies for CSRF protection
})

// Request interceptor to add auth token and handle token refresh
api.interceptors.request.use(
  async (config) => {
    // Add CSRF token if available
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1]

    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken
    }

    // Add authorization token if available
    const token = getToken()
    if (token) {
      // Check if token is expired or about to expire
      if (isTokenExpired(token)) {
        // Token is expired, try to refresh
        const newToken = await refreshToken()
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`
        } else {
          // Refresh failed, redirect to login
          if (typeof window !== "undefined") {
            window.location.href = "/login?session=expired"
          }
          return Promise.reject(new Error("Session expired"))
        }
      } else if (isTokenExpiringSoon(token)) {
        // Token is about to expire, refresh in background
        refreshToken().catch(() => {
          console.warn("Background token refresh failed")
        })
        // Still use current token for this request
        config.headers.Authorization = `Bearer ${token}`
      } else {
        // Token is valid
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const newToken = await refreshToken()
        if (newToken) {
          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          // Retry the original request
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh token failed
        console.error("Token refresh failed:", refreshError)
      }

      // Clear local storage and redirect to login
      removeToken()
      if (typeof window !== "undefined") {
        window.location.href = "/login?session=expired"
      }
    }

    // Handle 403 Forbidden errors (insufficient permissions)
    if (error.response && error.response.status === 403) {
      console.error("Permission denied:", error.response.data)
    }

    // Handle 404 Not Found errors
    if (error.response && error.response.status === 404) {
      console.error("Resource not found:", error.response.data)
    }

    // Handle 422 Validation errors
    if (error.response && error.response.status === 422) {
      console.error("Validation error:", error.response.data)
    }

    // Handle 429 Too Many Requests
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded:", error.response.data)
    }

    // Handle 500 Internal Server Error
    if (error.response && error.response.status === 500) {
      console.error("Server error:", error.response.data)
    }

    // Handle network errors
    if (error.message === "Network Error") {
      console.error("Network error - check your internet connection")
    }

    return Promise.reject(error)
  },
)

// Add cache control
const cachedEndpoints = ["/jobs/featured", "/companies/featured"]

api.interceptors.request.use((config) => {
  const url = config.url
  if (url && cachedEndpoints.some((endpoint) => url.includes(endpoint)) && config.method === "get") {
    config.headers["Cache-Control"] = "max-age=300" // Cache for 5 minutes
  }
  return config
})

export default api

// Utility function to handle API errors in components
export const handleApiError = (error: any, toast: any) => {
  const message = error.message || "An unexpected error occurred"

  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  })

  return { message, errors: error.errors || {} }
}
