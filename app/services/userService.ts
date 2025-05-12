import api from "../api/api"

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get("/users/profile")
  return response.data
}

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await api.put("/users/profile", userData)
  return response.data
}

// Upload profile image
export const uploadProfileImage = async (imageFile) => {
  const formData = new FormData()
  formData.append("image", imageFile)

  const response = await api.post("/users/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}

// Complete onboarding
export const completeOnboarding = async () => {
  const response = await api.put("/users/onboarding", { completed: true })
  return response.data
}

// Save profile (for employers)
export const saveProfile = async (profileId) => {
  const response = await api.post(`/users/profiles/${profileId}/save`)
  return response.data
}

// Unsave profile (for employers)
export const unsaveProfile = async (profileId) => {
  const response = await api.delete(`/users/profiles/${profileId}/save`)
  return response.data
}

// Get saved profiles (for employers)
export const getSavedProfiles = async (page = 1, limit = 10) => {
  const response = await api.get(`/users/profiles/saved?page=${page}&limit=${limit}`)
  return response.data
}

// Get all users (admin only)
export const getAllUsers = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters,
  })

  const response = await api.get(`/users?${queryParams}`)
  return response.data
}
