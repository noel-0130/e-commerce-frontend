import { apiRequest } from "./client.js"

export function getProduct(id) {
  return apiRequest(id ? `/api/products/${id}` : "/api/products")
}