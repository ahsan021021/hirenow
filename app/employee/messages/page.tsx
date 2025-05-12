"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EmployeeDashboardLayout } from "@/components/layouts/employee-dashboard-layout"
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Info,
  Clock,
  MessageSquare,
  ChevronLeft,
} from "lucide-react"
import { getConversations, getMessages } from "@/app/services/messageService"
import {
  initializeSocket,
  sendPrivateMessage,
  sendTypingIndicator,
  markMessagesAsRead,
  onPrivateMessage,
  onMessageSent,
  onTypingIndicator,
  onMessagesRead,
  onUserStatus,
} from "@/app/services/socketService"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

export default function MessagesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [typingUsers, setTypingUsers] = useState({})
  const [onlineUsers, setOnlineUsers] = useState({})
  const messagesEndRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  // Initialize socket connection
  useEffect(() => {
    initializeSocket()

    // Fetch conversations
    fetchConversations()

    // Cleanup
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  // Set up socket event listeners
  useEffect(() => {
    const unsubscribePrivateMessage = onPrivateMessage((newMessage) => {
      if (activeConversation && newMessage.conversation === activeConversation._id) {
        setMessages((prevMessages) => [...prevMessages, newMessage])
        markMessagesAsRead(activeConversation._id, newMessage.sender._id)
      }

      // Update conversation list
      updateConversationWithNewMessage(newMessage)
    })

    const unsubscribeMessageSent = onMessageSent((sentMessage) => {
      if (activeConversation && sentMessage.conversation === activeConversation._id) {
        setMessages((prevMessages) => [...prevMessages, sentMessage])
      }

      // Update conversation list
      updateConversationWithNewMessage(sentMessage)
    })

    const unsubscribeTypingIndicator = onTypingIndicator((data) => {
      if (data.conversationId === activeConversation?._id) {
        setTypingUsers((prev) => ({
          ...prev,
          [data.userId]: data.isTyping,
        }))
      }
    })

    const unsubscribeMessagesRead = onMessagesRead((data) => {
      if (data.conversationId === activeConversation?._id) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg.sender._id === user._id ? { ...msg, read: true } : msg)),
        )
      }
    })

    const unsubscribeUserStatus = onUserStatus((data) => {
      setOnlineUsers((prev) => ({
        ...prev,
        [data.userId]: data.isOnline,
      }))
    })

    return () => {
      unsubscribePrivateMessage()
      unsubscribeMessageSent()
      unsubscribeTypingIndicator()
      unsubscribeMessagesRead()
      unsubscribeUserStatus()
    }
  }, [activeConversation, user])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mark messages as read when conversation changes
  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation._id)

      // Find the other participant
      const otherParticipant = activeConversation.participants.find((p) => p._id !== user._id)

      if (otherParticipant) {
        markMessagesAsRead(activeConversation._id, otherParticipant._id)
      }
    }
  }, [activeConversation, user])

  const fetchConversations = async () => {
    try {
      setLoading(true)
      const response = await getConversations()
      setConversations(response.conversations)

      // Initialize online status
      const onlineStatus = {}
      response.conversations.forEach((conv) => {
        const otherParticipant = conv.participants.find((p) => p._id !== user._id)
        if (otherParticipant) {
          onlineStatus[otherParticipant._id] = otherParticipant.isOnline || false
        }
      })
      setOnlineUsers(onlineStatus)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch conversations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId) => {
    try {
      const response = await getMessages(conversationId)
      setMessages(response.messages)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      })
    }
  }

  const handleSendMessage = () => {
    if (!message.trim() || !activeConversation) return

    // Find the other participant
    const recipient = activeConversation.participants.find((p) => p._id !== user._id)

    if (!recipient) return

    // Send message via socket
    sendPrivateMessage(activeConversation._id, recipient._id, message.trim())

    // Clear input
    setMessage("")

    // Clear typing indicator
    handleStopTyping()
  }

  const handleStartTyping = () => {
    if (!activeConversation) return

    // Find the other participant
    const recipient = activeConversation.participants.find((p) => p._id !== user._id)

    if (!recipient) return

    // Send typing indicator
    sendTypingIndicator(activeConversation._id, recipient._id, true)

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping()
    }, 3000)
  }

  const handleStopTyping = () => {
    if (!activeConversation) return

    // Find the other participant
    const recipient = activeConversation.participants.find((p) => p._id !== user._id)

    if (!recipient) return

    // Send typing indicator
    sendTypingIndicator(activeConversation._id, recipient._id, false)
  }

  const updateConversationWithNewMessage = (newMessage) => {
    setConversations((prevConversations) => {
      return prevConversations.map((conv) => {
        if (conv._id === newMessage.conversation) {
          return {
            ...conv,
            lastMessage: {
              content: newMessage.content,
              createdAt: newMessage.createdAt,
              sender: newMessage.sender._id,
            },
            updatedAt: newMessage.createdAt,
          }
        }
        return conv
      })
    })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const filteredConversations = conversations.filter((conv) => {
    const otherParticipant = conv.participants.find((p) => p._id !== user._id)

    if (!otherParticipant) return false

    return (
      otherParticipant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (otherParticipant.title && otherParticipant.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  const getOtherParticipant = (conversation) => {
    return conversation.participants.find((p) => p._id !== user._id)
  }

  const formatMessageTime = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  }

  const isUserTyping = (userId) => {
    return typingUsers[userId] || false
  }

  const isUserOnline = (userId) => {
    return onlineUsers[userId] || false
  }

  return (
    <EmployeeDashboardLayout>
      <div className="flex-1 flex h-[calc(100vh-64px)]">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-800 bg-slate-900 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search messages"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-800 animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-800 rounded animate-pulse"></div>
                      <div className="h-3 bg-slate-800 rounded animate-pulse w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation)
                const isOnline = isUserOnline(otherParticipant._id)
                const unreadCount = conversation.unreadCount || 0

                return (
                  <div
                    key={conversation._id}
                    className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors ${
                      activeConversation?._id === conversation._id ? "bg-slate-800" : ""
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={otherParticipant.profileImage || "/placeholder.svg"}
                            alt={otherParticipant.name}
                          />
                          <AvatarFallback className="bg-slate-700 text-white">
                            {otherParticipant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {isOnline && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-white truncate">{otherParticipant.name}</h3>
                          <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                            {conversation.lastMessage ? formatMessageTime(conversation.lastMessage.createdAt) : ""}
                          </span>
                        </div>
                        <p className="text-sm text-cyan-500 truncate">{otherParticipant.title || ""}</p>
                        <p className="text-sm text-slate-500 truncate mt-1">
                          {conversation.lastMessage ? conversation.lastMessage.content : "No messages yet"}
                        </p>
                      </div>
                      {unreadCount > 0 && <Badge className="bg-cyan-500 text-white ml-2">{unreadCount}</Badge>}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-4 text-center text-slate-500">No conversations found</div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {activeConversation ? (
          <div className="hidden md:flex flex-1 flex-col bg-slate-950">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={getOtherParticipant(activeConversation).profileImage || "/placeholder.svg"}
                      alt={getOtherParticipant(activeConversation).name}
                    />
                    <AvatarFallback className="bg-slate-700 text-white">
                      {getOtherParticipant(activeConversation).name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isUserOnline(getOtherParticipant(activeConversation)._id) && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">{getOtherParticipant(activeConversation).name}</h3>
                  <p className="text-sm text-cyan-500">{getOtherParticipant(activeConversation).title || ""}</p>
                  {isUserTyping(getOtherParticipant(activeConversation)._id) && (
                    <p className="text-xs text-slate-400">Typing...</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Info className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No messages yet</p>
                    <p className="text-sm">Start the conversation by sending a message</p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${msg.sender._id === user._id ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender._id !== user._id && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src={msg.sender.profileImage || "/placeholder.svg"} alt={msg.sender.name} />
                        <AvatarFallback className="bg-slate-700 text-white text-xs">
                          {msg.sender.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender._id === user._id
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <div
                        className={`text-xs mt-1 flex items-center ${
                          msg.sender._id === user._id ? "text-blue-100 justify-end" : "text-slate-400"
                        }`}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {formatMessageTime(msg.createdAt)}
                        {msg.sender._id === user._id && msg.read && <span className="ml-1 text-blue-100">• Read</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {isUserTyping(getOtherParticipant(activeConversation)._id) && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-white rounded-lg p-3 max-w-[70%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  onInput={handleStartTyping}
                  onBlur={handleStopTyping}
                  className="bg-slate-800 border-slate-700 text-white"
                />
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-slate-950">
            <div className="text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-white">Select a conversation</h3>
              <p className="mt-1 text-sm text-slate-400">Choose a contact from the list to start messaging</p>
            </div>
          </div>
        )}

        {/* Mobile View */}
        <div className="md:hidden flex-1 flex flex-col">
          {!activeConversation ? (
            // Show conversations on mobile
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-800 animate-pulse"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-800 rounded animate-pulse"></div>
                        <div className="h-3 bg-slate-800 rounded animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => {
                  const otherParticipant = getOtherParticipant(conversation)
                  const isOnline = isUserOnline(otherParticipant._id)
                  const unreadCount = conversation.unreadCount || 0

                  return (
                    <div
                      key={conversation._id}
                      className="p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors"
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage
                              src={otherParticipant.profileImage || "/placeholder.svg"}
                              alt={otherParticipant.name}
                            />
                            <AvatarFallback className="bg-slate-700 text-white">
                              {otherParticipant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white truncate">{otherParticipant.name}</h3>
                            <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                              {conversation.lastMessage ? formatMessageTime(conversation.lastMessage.createdAt) : ""}
                            </span>
                          </div>
                          <p className="text-sm text-cyan-500 truncate">{otherParticipant.title || ""}</p>
                          <p className="text-sm text-slate-500 truncate mt-1">
                            {conversation.lastMessage ? conversation.lastMessage.content : "No messages yet"}
                          </p>
                        </div>
                        {unreadCount > 0 && <Badge className="bg-cyan-500 text-white ml-2">{unreadCount}</Badge>}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="p-4 text-center text-slate-500">No conversations found</div>
              )}
            </div>
          ) : (
            // Show chat on mobile
            <div className="flex-1 flex flex-col bg-slate-950">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                    onClick={() => setActiveConversation(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div className="relative">
                    <Avatar>
                      <AvatarImage
                        src={getOtherParticipant(activeConversation).profileImage || "/placeholder.svg"}
                        alt={getOtherParticipant(activeConversation).name}
                      />
                      <AvatarFallback className="bg-slate-700 text-white">
                        {getOtherParticipant(activeConversation).name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isUserOnline(getOtherParticipant(activeConversation)._id) && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{getOtherParticipant(activeConversation).name}</h3>
                    <p className="text-sm text-cyan-500">{getOtherParticipant(activeConversation).title || ""}</p>
                    {isUserTyping(getOtherParticipant(activeConversation)._id) && (
                      <p className="text-xs text-slate-400">Typing...</p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No messages yet</p>
                      <p className="text-sm">Start the conversation by sending a message</p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${msg.sender._id === user._id ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender._id !== user._id && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src={msg.sender.profileImage || "/placeholder.svg"} alt={msg.sender.name} />
                          <AvatarFallback className="bg-slate-700 text-white text-xs">
                            {msg.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.sender._id === user._id
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                            : "bg-slate-800 text-white"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <div
                          className={`text-xs mt-1 flex items-center ${
                            msg.sender._id === user._id ? "text-blue-100 justify-end" : "text-slate-400"
                          }`}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {formatMessageTime(msg.createdAt)}
                          {msg.sender._id === user._id && msg.read && (
                            <span className="ml-1 text-blue-100">• Read</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isUserTyping(getOtherParticipant(activeConversation)._id) && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-white rounded-lg p-3 max-w-[70%]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    onInput={handleStartTyping}
                    onBlur={handleStopTyping}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </EmployeeDashboardLayout>
  )
}
