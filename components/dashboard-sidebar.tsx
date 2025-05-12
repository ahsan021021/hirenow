"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, User, MessageSquare, Zap, Activity, Search, Users, CreditCard, Settings, LogOut } from "lucide-react"

type DashboardSidebarProps = {
  userType: "employee" | "employer"
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname()

  const employeeMenuItems = [
    { icon: Home, label: "Dashboard", href: "/employee-dashboard" },
    { icon: User, label: "Profile", href: "/employee-dashboard/profile" },
    { icon: Zap, label: "Boost Profile", href: "/employee-dashboard/boost" },
    { icon: MessageSquare, label: "Messages", href: "/employee-dashboard/messages" },
    { icon: Activity, label: "Activity", href: "/employee-dashboard/activity" },
  ]

  const employerMenuItems = [
    { icon: Home, label: "Dashboard", href: "/employer-dashboard" },
    { icon: Search, label: "Search Candidates", href: "/employer-dashboard/search" },
    { icon: Users, label: "Saved Profiles", href: "/employer-dashboard/saved" },
    { icon: CreditCard, label: "Subscription", href: "/employer-dashboard/subscription" },
  ]

  const menuItems = userType === "employee" ? employeeMenuItems : employerMenuItems

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b">
          <div className="flex items-center p-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl font-bold">HireNow.pk</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Logout">
                <Link href="/logout">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarTrigger className="absolute right-4 top-4 md:hidden" />
      </Sidebar>
    </SidebarProvider>
  )
}
