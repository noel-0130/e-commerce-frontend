import { apiRequest } from "./client.js"

export const getOrders = () => apiRequest("/api/orders")

export const getOrder = (id) => apiRequest(`/api/orders/${id}`)