"use client"

import type React from "react"

import ProtectedRoute from "@/components/protected-route"

export default function EmployerDashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRole="employer">{children}</ProtectedRoute>
}
