import api from "../api/api"

// Get all conversations
export const getConversations = async () => {
  const response = await api.get("/messages/conversations")
  return response.data
}

// Get conversation by ID
export const getConversationById = async (id) => {
  const response = await api.get(`/messages/conversations/${id}`)
  return response.data
}

// Create new conversation
export const createConversation = async (recipientId) => {
  const response = await api.post("/messages/conversations", { recipientId })
  return response.data
}

// Get messages for a conversation
export const getMessages = async (conversationId, page = 1, limit = 20) => {
  const response = await api.get(`/messages/conversations/${conversationId}/messages?page=${page}&limit=${limit}`)
  return response.data
}

// Send message
export const sendMessage = async (conversationId, content) => {
  const response = await api.post(`/messages/conversations/${conversationId}/messages`, { content })
  return response.data
}

// Mark message as read
export const markMessageAsRead = async (messageId) => {
  const response = await api.put(`/messages/messages/${messageId}/read`)
  return response.data
}
