import io from "socket.io-client"
import { getToken } from "./authService"

let socket: any

export const initializeSocket = () => {
  const token = getToken()

  if (!socket && token) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
      auth: {
        token,
      },
    })

    socket.on("connect", () => {
      console.log("Socket connected")
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    socket.on("error", (error: any) => {
      console.error("Socket error:", error)
    })
  }

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

// Message functions
export const sendPrivateMessage = (conversationId: string, recipientId: string, content: string) => {
  if (socket) {
    socket.emit("private_message", { conversationId, recipientId, content })
  }
}

export const onPrivateMessage = (callback: (message: any) => void) => {
  if (socket) {
    socket.on("private_message", callback)
    return () => socket.off("private_message", callback)
  }
  return () => {}
}

export const onMessageSent = (callback: (message: any) => void) => {
  if (socket) {
    socket.on("message_sent", callback)
    return () => socket.off("message_sent", callback)
  }
  return () => {}
}

// Typing indicator functions
export const sendTypingIndicator = (conversationId: string, recipientId: string, isTyping: boolean) => {
  if (socket) {
    socket.emit("typing", { conversationId, recipientId, isTyping })
  }
}

export const onTypingIndicator = (callback: (data: any) => void) => {
  if (socket) {
    socket.on("typing", callback)
    return () => socket.off("typing", callback)
  }
  return () => {}
}

// Read receipts
export const markMessagesAsRead = (conversationId: string, senderId: string) => {
  if (socket) {
    socket.emit("mark_read", { conversationId, senderId })
  }
}

export const onMessagesRead = (callback: (data: any) => void) => {
  if (socket) {
    socket.on("messages_read", callback)
    return () => socket.off("messages_read", callback)
  }
  return () => {}
}

// User status
export const onUserStatus = (callback: (data: any) => void) => {
  if (socket) {
    socket.on("user_status", callback)
    return () => socket.off("user_status", callback)
  }
  return () => {}
}
