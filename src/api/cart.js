import { apiRequest } from "./client.js"

const tokenHeader = (token) => ({ "X-Cart-Token": token })

export const createCart = () =>
  apiRequest("/api/carts", { method: "POST" })

export const getCart = (cartId, token) =>
  apiRequest(`/api/carts/${cartId}`, { headers: tokenHeader(token) })

export const addCartItem = (cartId, token, productId, quantity = 1) =>
  apiRequest(`/api/carts/${cartId}/cart_items`, {
    method: "POST",
    headers: tokenHeader(token),
    body: JSON.stringify({
      cart_item: { product_id: productId, quantity },
    }),
  })

export const updateCartItem = (cartId, token, itemId, quantity) =>
  apiRequest(`/api/carts/${cartId}/cart_items/${itemId}`, {
    method: "PATCH",
    headers: tokenHeader(token),
    body: JSON.stringify({ cart_item: { quantity } }),
  })

export const removeCartItem = (cartId, token, itemId) =>
  apiRequest(`/api/carts/${cartId}/cart_items/${itemId}`, {
    method: "DELETE",
    headers: tokenHeader(token),
  })

export const checkoutCart = (cartId, token, customer) =>
  apiRequest(`/api/carts/${cartId}/checkout`, {
    method: "POST",
    headers: tokenHeader(token),
    body: JSON.stringify(customer),
  })