"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
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

type Message = {
  id: number
  content: string
  sender: "user" | "contact"
  timestamp: string
  read: boolean
}

type Contact = {
  id: number
  name: string
  title: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  online: boolean
  messages: Message[]
}

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState("")
  const [activeContact, setActiveContact] = useState<Contact | null>(null)

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Muhammad Khan",
      title: "Senior Frontend Developer",
      avatar: "/placeholder.svg",
      lastMessage: "Thank you for considering my application. I'm very interested in the position.",
      lastMessageTime: "10:30 AM",
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          content: "Hello! I'm writing regarding the Senior Frontend Developer position I applied for.",
          sender: "contact",
          timestamp: "10:25 AM",
          read: true,
        },
        {
          id: 2,
          content: "Thank you for considering my application. I'm very interested in the position.",
          sender: "contact",
          timestamp: "10:30 AM",
          read: true,
        },
        {
          id: 3,
          content:
            "Hi Muhammad, thanks for your interest. Your experience looks great. When would you be available for an interview?",
          sender: "user",
          timestamp: "10:45 AM",
          read: false,
        },
      ],
    },
    {
      id: 2,
      name: "Sara Rizvi",
      title: "UI/UX Designer",
      avatar: "/placeholder.svg",
      lastMessage: "I've attached my portfolio with some additional projects as you requested.",
      lastMessageTime: "Yesterday",
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          content: "Hello, I'm following up on my application for the UI/UX Designer position.",
          sender: "contact",
          timestamp: "Yesterday",
          read: true,
        },
        {
          id: 2,
          content: "Hi Sara, thanks for reaching out. Could you share more examples of your work?",
          sender: "user",
          timestamp: "Yesterday",
          read: true,
        },
        {
          id: 3,
          content: "I've attached my portfolio with some additional projects as you requested.",
          sender: "contact",
          timestamp: "Yesterday",
          read: true,
        },
      ],
    },
    {
      id: 3,
      name: "Ahmed Khan",
      title: "Full Stack Developer",
      avatar: "/placeholder.svg",
      lastMessage: "I'm available for an interview on Monday at 2 PM or Tuesday morning.",
      lastMessageTime: "2 days ago",
      unread: 0,
      online: true,
      messages: [
        {
          id: 1,
          content: "Thank you for considering my application for the Full Stack Developer role.",
          sender: "contact",
          timestamp: "2 days ago",
          read: true,
        },
        {
          id: 2,
          content: "Hi Ahmed, we'd like to schedule an interview. What's your availability next week?",
          sender: "user",
          timestamp: "2 days ago",
          read: true,
        },
        {
          id: 3,
          content: "I'm available for an interview on Monday at 2 PM or Tuesday morning.",
          sender: "contact",
          timestamp: "2 days ago",
          read: true,
        },
      ],
    },
  ]

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!message.trim() || !activeContact) return

    // In a real app, this would send the message to the backend
    // For now, we'll just update the UI
    setMessage("")
  }

  return (
    <EmployerDashboardLayout>
      <div className="flex-1 flex h-[calc(100vh-64px)]">
        {/* Contacts Sidebar */}
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
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors ${
                    activeContact?.id === contact.id ? "bg-slate-800" : ""
                  }`}
                  onClick={() => setActiveContact(contact)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback className="bg-slate-700 text-white">{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-white truncate">{contact.name}</h3>
                        <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{contact.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-cyan-500 truncate">{contact.title}</p>
                      <p className="text-sm text-slate-500 truncate mt-1">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && <Badge className="bg-cyan-500 text-white ml-2">{contact.unread}</Badge>}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-slate-500">No contacts found</div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {activeContact ? (
          <div className="hidden md:flex flex-1 flex-col bg-slate-950">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={activeContact.avatar || "/placeholder.svg"} alt={activeContact.name} />
                    <AvatarFallback className="bg-slate-700 text-white">{activeContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {activeContact.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">{activeContact.name}</h3>
                  <p className="text-sm text-cyan-500">{activeContact.title}</p>
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
              {activeContact.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "contact" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src={activeContact.avatar || "/placeholder.svg"} alt={activeContact.name} />
                      <AvatarFallback className="bg-slate-700 text-white text-xs">
                        {activeContact.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        : "bg-slate-800 text-white"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <div
                      className={`text-xs mt-1 flex items-center ${
                        msg.sender === "user" ? "text-blue-100 justify-end" : "text-slate-400"
                      }`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
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
                  className="bg-slate-800 border-slate-700 text-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
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
              <p className="mt-1 text-sm text-slate-400">Choose a candidate from the list to start messaging</p>
            </div>
          </div>
        )}

        {/* Mobile View - Show only contacts list or chat */}
        <div className="md:hidden flex-1 flex flex-col">
          {!activeContact ? (
            // Show contacts on mobile
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors"
                    onClick={() => setActiveContact(contact)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          <AvatarFallback className="bg-slate-700 text-white">{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-white truncate">{contact.name}</h3>
                          <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                            {contact.lastMessageTime}
                          </span>
                        </div>
                        <p className="text-sm text-cyan-500 truncate">{contact.title}</p>
                        <p className="text-sm text-slate-500 truncate mt-1">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && <Badge className="bg-cyan-500 text-white ml-2">{contact.unread}</Badge>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">No contacts found</div>
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
                    onClick={() => setActiveContact(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={activeContact.avatar || "/placeholder.svg"} alt={activeContact.name} />
                      <AvatarFallback className="bg-slate-700 text-white">
                        {activeContact.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {activeContact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{activeContact.name}</h3>
                    <p className="text-sm text-cyan-500">{activeContact.title}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeContact.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "contact" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src={activeContact.avatar || "/placeholder.svg"} alt={activeContact.name} />
                        <AvatarFallback className="bg-slate-700 text-white text-xs">
                          {activeContact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <div
                        className={`text-xs mt-1 flex items-center ${
                          msg.sender === "user" ? "text-blue-100 justify-end" : "text-slate-400"
                        }`}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
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
                    className="bg-slate-800 border-slate-700 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
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
    </EmployerDashboardLayout>
  )
}
