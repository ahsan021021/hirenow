import { api } from "../api/api"

// Get employer dashboard statistics
export const getEmployerDashboardStats = async () => {
  const response = await api.get("/analytics/employer/dashboard")
  return response.data
}

// Get job performance analytics
export const getJobPerformance = async (jobId) => {
  const response = await api.get(`/analytics/employer/jobs/${jobId}`)
  return response.data
}

// Get application statistics
export const getApplicationStats = async () => {
  const response = await api.get("/analytics/employer/applications")
  return response.data
}

// Get admin dashboard statistics
export const getAdminDashboardStats = async () => {
  const response = await api.get("/analytics/admin/dashboard")
  return response.data
}

// Get user activity statistics
export const getUserActivity = async () => {
  const response = await api.get("/analytics/admin/users")
  return response.data
}

// Get revenue statistics
export const getRevenueStats = async () => {
  const response = await api.get("/analytics/admin/revenue")
  return response.data
}
