"use client"

import { useState, useEffect } from "react"

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return
    }

    // Set initial state
    setIsOffline(!window.navigator.onLine)

    // Define event handlers
    const handleOffline = () => setIsOffline(true)
    const handleOnline = () => setIsOffline(false)

    // Add event listeners
    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    // Clean up event listeners
    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [])

  return isOffline
}
