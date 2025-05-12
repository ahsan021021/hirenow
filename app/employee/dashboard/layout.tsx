"use client"

import type React from "react"

import ProtectedRoute from "@/components/protected-route"

export default function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRole="employee">{children}</ProtectedRoute>
}
