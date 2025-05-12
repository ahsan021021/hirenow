"use client"

import { useOffline } from "@/app/hooks/use-offline"
import { WifiOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect, useState } from "react"

export function OfflineBanner() {
  const isOffline = useOffline()
  const [showBanner, setShowBanner] = useState(false)

  // Only show the banner after a short delay to prevent flashing on page load
  useEffect(() => {
    if (isOffline) {
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setShowBanner(false)
    }
  }, [isOffline])

  if (!showBanner) return null

  return (
    <Alert variant="destructive" className="fixed bottom-4 right-4 max-w-md z-50 animate-in slide-in-from-bottom-5">
      <WifiOff className="h-4 w-4" />
      <AlertTitle>You're offline</AlertTitle>
      <AlertDescription>
        Some features may be unavailable. We'll automatically reconnect when you're back online.
      </AlertDescription>
    </Alert>
  )
}
