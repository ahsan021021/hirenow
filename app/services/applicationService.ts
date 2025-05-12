import api from "../api/api"

// Get all applications for admin
export const getAllApplications = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters,
  })

  const response = await api.get(`/applications?${queryParams}`)
  return response.data
}

// Get application by ID
export const getApplicationById = async (id) => {
  const response = await api.get(`/applications/${id}`)
  return response.data
}

// Get applications for a specific job
export const getJobApplications = async (jobId, page = 1, limit = 10) => {
  const response = await api.get(`/applications/job/${jobId}?page=${page}&limit=${limit}`)
  return response.data
}

// Get current employee's applications
export const getMyApplications = async (page = 1, limit = 10) => {
  const response = await api.get(`/applications/me?page=${page}&limit=${limit}`)
  return response.data
}

// Create application
export const createApplication = async (jobId, applicationData) => {
  const response = await api.post(`/applications/${jobId}`, applicationData)
  return response.data
}

// Update application status
export const updateApplicationStatus = async (id, status) => {
  const response = await api.put(`/applications/${id}/status`, { status })
  return response.data
}
