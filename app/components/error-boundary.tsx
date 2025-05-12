"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })

    // Log error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)

    // In a production app, you would send this to your error tracking service
    // Example: Sentry.captureException(error)
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            We're sorry, but there was an error loading this content. Please try refreshing the page.
          </p>
          <div className="space-x-4">
            <Button onClick={this.handleReset} variant="outline" className="flex items-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()} className="flex items-center">
              Refresh Page
            </Button>
          </div>

          {process.env.NODE_ENV !== "production" && this.state.error && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md text-left overflow-auto max-w-full">
              <p className="font-mono text-sm text-red-600 mb-2">{this.state.error.toString()}</p>
              {this.state.errorInfo && (
                <details className="whitespace-pre-wrap">
                  <summary className="cursor-pointer text-sm font-semibold mb-2">Stack trace</summary>
                  <p className="font-mono text-xs text-gray-700">{this.state.errorInfo.componentStack}</p>
                </details>
              )}
            </div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
