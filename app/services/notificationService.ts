import api from "../api/api"

// Get current user's notifications
export const getMyNotifications = async (page = 1, limit = 20) => {
  const response = await api.get(`/notifications?page=${page}&limit=${limit}`)
  return response.data
}

// Mark notification as read
export const markNotificationAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}/read`)
  return response.data
}

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  const response = await api.put("/notifications/read-all")
  return response.data
}

// Delete notification
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`)
  return response.data
}
