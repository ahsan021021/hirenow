import { api } from "../api/api"

// Get all subscription plans
export const getSubscriptionPlans = async () => {
  const response = await api.get("/subscriptions/plans")
  return response.data
}

// Get current subscription
export const getCurrentSubscription = async () => {
  const response = await api.get("/subscriptions/current")
  return response.data
}

// Subscribe to a plan
export const subscribe = async (data) => {
  const response = await api.post("/subscriptions/subscribe", data)
  return response.data
}

// Cancel subscription
export const cancelSubscription = async () => {
  const response = await api.post("/subscriptions/cancel")
  return response.data
}

// Get subscription history
export const getSubscriptionHistory = async () => {
  const response = await api.get("/subscriptions/history")
  return response.data
}
