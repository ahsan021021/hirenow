import api from "../api/api"
import { jwtDecode } from "jwt-decode"

// Get token from localStorage
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem("token", token)
}

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token)
    return decoded.exp * 1000 < Date.now()
  } catch (error) {
    return true
  }
}

// Check if token is about to expire (within 5 minutes)
export const isTokenExpiringSoon = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token)
    // Check if token expires in less than 5 minutes
    return decoded.exp * 1000 < Date.now() + 5 * 60 * 1000
  } catch (error) {
    return true
  }
}

// Refresh token
export const refreshToken = async (): Promise<string | null> => {
  try {
    const { data } = await api.post("/auth/refresh-token")
    const { token } = data
    setToken(token)
    return token
  } catch (error) {
    removeToken()
    return null
  }
}

// Login
export const login = async (credentials: { email: string; password: string }): Promise<any> => {
  const { data } = await api.post("/auth/login", credentials)

  // Make sure to store the token and user data properly
  setToken(data.token)

  // Store user data with proper stringification
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user))
  }

  return data
}

// Register
export const register = async (userData: any): Promise<any> => {
  const { data } = await api.post("/auth/register", userData)

  // Make sure to store the token and user data properly
  setToken(data.token)

  // Store user data with proper stringification
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user))
  }

  return data
}

// Logout
export const logout = async (): Promise<void> => {
  try {
    await api.post("/auth/logout")
  } finally {
    removeToken()
  }
}

// Forgot password
export const forgotPassword = async (email: string): Promise<any> => {
  const { data } = await api.post("/auth/forgot-password", { email })
  return data
}

// Reset password
export const resetPassword = async (
  token: string,
  passwords: { password: string; passwordConfirm: string },
): Promise<any> => {
  const { data } = await api.put(`/auth/reset-password/${token}`, passwords)
  return data
}

// Verify email
export const verifyEmail = async (token: string): Promise<any> => {
  const { data } = await api.get(`/auth/verify-email/${token}`)
  return data
}

// Resend verification email
export const resendVerificationEmail = async (email: string): Promise<any> => {
  const { data } = await api.post("/auth/resend-verification", { email })
  return data
}

// Get current user
export const getCurrentUser = (): any | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }
  return null
}

// Update current user in localStorage
export const updateCurrentUser = (userData: any): void => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    localStorage.setItem("user", JSON.stringify({ ...currentUser, ...userData }))
  }
}

// Add a function to verify if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken()
  if (!token) return false

  // Check if token is valid
  return !isTokenExpired(token)
}
