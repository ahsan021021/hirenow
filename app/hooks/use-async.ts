"use client"

import { useState, useCallback } from "react"

interface UseAsyncReturn<T, E = Error> {
  execute: (...args: any[]) => Promise<T | undefined>
  status: "idle" | "pending" | "success" | "error"
  value: T | null
  error: E | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export function useAsync<T, E = Error>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = false,
): UseAsyncReturn<T, E> {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the function is not recreated on each render
  const execute = useCallback(
    async (...args: any[]) => {
      setStatus("pending")
      setValue(null)
      setError(null)

      try {
        const response = await asyncFunction(...args)
        setValue(response)
        setStatus("success")
        return response
      } catch (error) {
        setError(error as E)
        setStatus("error")
        return undefined
      }
    },
    [asyncFunction],
  )

  // Call execute if immediate is true
  // useEffect(() => {
  //   if (immediate) {
  //     execute()
  //   }
  // }, [execute, immediate])

  return {
    execute,
    status,
    value,
    error,
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
  }
}
