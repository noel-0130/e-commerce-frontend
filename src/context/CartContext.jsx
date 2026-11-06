import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useAuth } from "./AuthContext.jsx"
import {
  createCart,
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  checkoutCart,
} from "../api/cart.js"

const CartContext = createContext()

function mapItem(item) {
  return {
    id: item.product_id,
    cartItemId: item.cart_item_id,
    name: item.name,
    price: Number(item.price),
    stock: item.stock,
    quantity: item.quantity,
    image: item.image_url || `https://placehold.co/300x300?text=${encodeURIComponent(item.name || "Product")}`,
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id

  const [cart, setCart] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const ensureCart = useCallback(async () => {
    if (cart) return cart
    if (!userId) throw new Error("Not authenticated")

    setLoading(true)
    setError("")
    try {
      const newCart = await createCart()
      const data = await getCart(newCart.id, newCart.token)
      setCart(newCart)
      setItems(data.items.map(mapItem))
      return newCart
    } catch (e) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [cart, userId])

  async function reload() {
    if (!cart) return
    const data = await getCart(cart.id, cart.token)
    setItems(data.items.map(mapItem))
  }

  // Kapag naka-logout, walang laman ang cart
  const cartItems = userId ? items : []

  async function run(action) {
    if (!userId) {
      setError("Please log in first.")
      return false
    }
    try {
      setError("")
      await ensureCart()
      await action()
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  const addToCart = (product) =>
    run(async () => {
      if (product.stock <= 0) throw new Error("Out of stock")

      const existing = cartItems.find((i) => i.id === product.id)
      if (existing && existing.quantity >= product.stock) {
        throw new Error("Maximum available stock reached")
      }

      await addCartItem(cart.id, cart.token, product.id, 1)
      await reload()
    })

  const removeFromCart = (productId) =>
    run(async () => {
      const item = cartItems.find((i) => i.id === productId)
      if (!item) return
      await removeCartItem(cart.id, cart.token, item.cartItemId)
      await reload()
    })

  const updateQuantity = (productId, quantity) =>
    run(async () => {
      const item = cartItems.find((i) => i.id === productId)
      if (!item) return

      const qty = Math.max(1, Math.min(Number(quantity) || 1, item.stock))

      setItems((current) =>
        current.map((i) =>
          i.id === productId ? { ...i, quantity: qty } : i
        )
      )

      try {
        await updateCartItem(cart.id, cart.token, item.cartItemId, qty)
      } catch (e) {
        await reload()
        throw e
      }
    })

  async function checkout(customer) {
    await ensureCart()
    const result = await checkoutCart(cart.id, cart.token, customer)
    setItems([])
    setCart(null)
    return result
  }

  const cartCount = cartItems.reduce((total, i) => total + i.quantity, 0)
  const cartTotal = cartItems.reduce(
    (total, i) => total + i.price * i.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading: userId ? loading : false,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}