"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import {
  Building,
  Home,
  Users,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  Plus,
  Briefcase,
  CreditCard,
} from "lucide-react"

interface EmployerDashboardLayoutProps {
  children: React.ReactNode
}

export function EmployerDashboardLayout({ children }: EmployerDashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { user, logout } = useAuth()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const navItems = [
    { href: "/employer/dashboard", label: "Dashboard", icon: Home },
    { href: "/employer/jobs", label: "Jobs", icon: Briefcase },
    { href: "/employer/candidates", label: "Candidates", icon: Users },
    { href: "/employer/messages", label: "Messages", icon: MessageSquare },
    { href: "/employer/company", label: "Company", icon: Building },
    { href: "/employer/subscription", label: "Subscription", icon: CreditCard },
    { href: "/employer/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar - Desktop */}
      <motion.aside
        className="hidden md:flex w-64 flex-col bg-slate-900 border-r border-slate-800"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-slate-800">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              HireNow.pk
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`sidebar-link ${pathname === item.href ? "sidebar-link-active" : ""}`}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="mt-10 pt-6 border-t border-slate-800">
            <Link href="/employer/post-job">
              <div className="sidebar-link">
                <Plus className="h-5 w-5 text-cyan-500" />
                <span className="text-cyan-500 font-medium">Post a Job</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt={user?.name || "Company"} />
              <AvatarFallback className="bg-slate-800 text-white">{user?.name?.charAt(0) || "C"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">Premium Plan</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-slate-900 p-4"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    HireNow.pk
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={user?.name || "Company"} />
                    <AvatarFallback className="bg-slate-700 text-white">{user?.name?.charAt(0) || "C"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400">Premium Plan</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`sidebar-link ${pathname === item.href ? "sidebar-link-active" : ""}`}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ))}

                <div className="pt-4 mt-4 border-t border-slate-800">
                  <Link href="/employer/post-job" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="sidebar-link">
                      <Plus className="h-5 w-5 text-cyan-500" />
                      <span className="text-cyan-500 font-medium">Post a Job</span>
                    </div>
                  </Link>
                </div>
              </nav>

              <div className="absolute bottom-4 left-4 right-4">
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-white hover:bg-slate-800"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-slate-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-white md:hidden">
                {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  className="w-64 rounded-md border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-medium text-white">
                  5
                </span>
              </Button>

              <div className="hidden md:flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={user?.name || "Company"} />
                  <AvatarFallback className="bg-slate-800 text-white">{user?.name?.charAt(0) || "C"}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-white">{user?.name}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
