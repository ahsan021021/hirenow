"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import {
  getSubscriptionPlans,
  getCurrentSubscription,
  subscribe,
  cancelSubscription,
} from "@/app/services/subscriptionService"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function SubscriptionPage() {
  const [plans, setPlans] = useState([])
  const [currentSubscription, setCurrentSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [plansResponse, subscriptionResponse] = await Promise.all([
        getSubscriptionPlans(),
        getCurrentSubscription(),
      ])
      setPlans(plansResponse.plans)
      setCurrentSubscription(subscriptionResponse.subscription)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load subscription data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (planId) => {
    try {
      setSubscribing(true)
      await subscribe({ planId, paymentMethod: "manual" })
      toast({
        title: "Success",
        description: "Subscription activated successfully",
      })
      fetchData()
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe",
        variant: "destructive",
      })
    } finally {
      setSubscribing(false)
    }
  }

  const handleCancelSubscription = async () => {
    try {
      setCancelling(true)
      await cancelSubscription()
      toast({
        title: "Success",
        description: "Subscription cancelled successfully",
      })
      fetchData()
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel subscription",
        variant: "destructive",
      })
    } finally {
      setCancelling(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <EmployerDashboardLayout>
        <div className="container mx-auto py-6">
          <div className="space-y-6">
            <div className="h-8 w-64 bg-slate-800 rounded animate-pulse"></div>
            <div className="h-4 w-full max-w-md bg-slate-800 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-slate-800 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </EmployerDashboardLayout>
    )
  }

  return (
    <EmployerDashboardLayout>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Subscription Plans</h1>
            <p className="text-slate-400 mt-2">
              Choose the right plan to boost your hiring process and find the best talent
            </p>
          </div>

          {currentSubscription && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Current Subscription</CardTitle>
                <CardDescription>
                  You are currently subscribed to the {currentSubscription.plan.name} plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <Badge variant={currentSubscription.status === "active" ? "default" : "secondary"}>
                      {currentSubscription.status.charAt(0).toUpperCase() + currentSubscription.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Start Date:</span>
                    <span className="text-white">{formatDate(currentSubscription.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">End Date:</span>
                    <span className="text-white">{formatDate(currentSubscription.endDate)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {currentSubscription.status === "active" && (
                  <Button variant="destructive" onClick={handleCancelSubscription} disabled={cancelling}>
                    {cancelling ? "Cancelling..." : "Cancel Subscription"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan._id}
                className={`bg-slate-900 border-slate-800 ${plan.isPopular ? "ring-2 ring-cyan-500" : ""}`}
              >
                <CardHeader>
                  {plan.isPopular && <Badge className="self-start mb-2 bg-cyan-500 text-white">Popular</Badge>}
                  <CardTitle className="text-white">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-white">{plan.price.toLocaleString()}</span>
                    <span className="text-slate-400 ml-1">PKR / month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-slate-300">Post up to {plan.jobPostLimit} jobs</span>
                    </li>
                    <li className="flex items-start">
                      {plan.featuredJobsLimit > 0 ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                      )}
                      <span className="text-slate-300">
                        {plan.featuredJobsLimit > 0
                          ? `${plan.featuredJobsLimit} featured job posts`
                          : "No featured job posts"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-slate-300">Search up to {plan.candidateSearchLimit} candidates</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        : ""
                    }`}
                    onClick={() => handleSubscribe(plan._id)}
                    disabled={
                      subscribing ||
                      (currentSubscription?.status === "active" && currentSubscription?.plan?._id === plan._id)
                    }
                  >
                    {subscribing
                      ? "Processing..."
                      : currentSubscription?.status === "active" && currentSubscription?.plan?._id === plan._id
                        ? "Current Plan"
                        : "Subscribe"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </EmployerDashboardLayout>
  )
}
