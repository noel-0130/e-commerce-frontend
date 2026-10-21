import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, clearCart } = useCart()

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  )

  const shippingFee = subtotal > 0 ? 50 : 0
  const total = subtotal + shippingFee

  const formatPrice = (price) =>
    Number(price).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (error) {
      setError("")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError("")

    if (isSubmitting) return

    if (cartItems.length === 0) {
      setError("Your cart is empty.")
      return
    }

    const hasInvalidItem = cartItems.some(
      (item) =>
        !Number.isFinite(Number(item.price)) ||
        Number(item.price) < 0 ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) <= 0
    )

    if (hasInvalidItem) {
      setError("Some cart items have invalid prices or quantities.")
      return
    }

    const requiredFields = [
      formData.fullName,
      formData.phone,
      formData.address,
      formData.city,
      formData.postalCode,
    ]

    if (requiredFields.some((value) => !value.trim())) {
      setError("Please complete all shipping information.")
      return
    }

    const order = {
      orderNumber: `ORD-${Date.now()}`,
      customer: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        postalCode: formData.postalCode.trim(),
      },
      items: cartItems.map((item) => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),
      subtotal,
      shippingFee,
      total,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      status: "Pending",
      createdAt: new Date().toISOString(),
    }

    try {
      setIsSubmitting(true)

      const existingOrders = JSON.parse(
        localStorage.getItem("orderHistory") || "[]"
      )

      const updatedOrders = [order, ...existingOrders]

      localStorage.setItem(
        "orderHistory",
        JSON.stringify(updatedOrders)
      )

      localStorage.setItem("lastOrder", JSON.stringify(order))

      clearCart()

      navigate("/order-confirmation")
    } catch (err) {
      console.error("Failed to save order:", err)

      setError(
        err.message
      )

      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty container">
        <i className="bi bi-cart-x"></i>

        <h2>Your cart is empty</h2>

        <p>
          Add some products before proceeding to checkout.
        </p>

        <button
          type="button"
          className="checkout-button"
          onClick={() => navigate("/products")}
        >
          <i className="bi bi-bag"></i>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <main className="checkout-page container">
      <header className="checkout-header">
        <h1>Checkout</h1>

        <p>
          Complete your shipping information and review your order.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="checkout-layout"
      >
        <div className="checkout-form">
          {/* SHIPPING INFORMATION */}

          <section className="checkout-section">
            <h2>
              <i className="bi bi-truck"></i>
              Shipping Information
            </h2>

            <div className="checkout-field">
              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09XX XXX XXXX"
                autoComplete="tel"
                maxLength={20}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="address">
                Complete Address
              </label>

              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House number, street, barangay"
                autoComplete="street-address"
                rows="3"
                maxLength={300}
                required
              />
            </div>

            <div className="checkout-field-row">
              <div className="checkout-field">
                <label htmlFor="city">
                  City / Province
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City / Province"
                  autoComplete="address-level2"
                  maxLength={100}
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="postalCode">
                  Postal Code
                </label>

                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  inputMode="numeric"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  autoComplete="postal-code"
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </section>

          {/* PAYMENT METHOD */}

          <section className="checkout-section">
            <h2>
              <i className="bi bi-credit-card"></i>
              Payment Method
            </h2>

            <div className="payment-option payment-option-selected">
              <span className="payment-icon">
                <i className="bi bi-cash-stack"></i>
              </span>

              <span className="payment-details">
                <strong>Cash on Delivery (COD)</strong>

                <small>
                  Pay when your order arrives.
                </small>
              </span>

              <i className="bi bi-check-circle-fill payment-check"></i>
            </div>

            <p className="checkout-payment-note">
              <i className="bi bi-info-circle"></i>
              COD is currently our only supported payment method.
            </p>
          </section>
        </div>

        {/* ORDER SUMMARY */}

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-items">
            {cartItems.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <div className="checkout-item-info">
                  <strong>{item.title}</strong>

                  <small>
                    Quantity: {item.quantity}
                  </small>
                </div>

                <span>
                  ₱
                  {formatPrice(
                    Number(item.price) *
                      Number(item.quantity)
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>

            <span>₱{formatPrice(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping Fee</span>

            <span>₱{formatPrice(shippingFee)}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>

            <strong>₱{formatPrice(total)}</strong>
          </div>

          {error && (
            <p
              className="checkout-error"
              role="alert"
            >
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="checkout-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>Placing Order...</span>
                <i className="bi bi-arrow-repeat"></i>
              </>
            ) : (
              <>
                <span>Place Order</span>
                <i className="bi bi-arrow-right"></i>
              </>
            )}
          </button>

          <p className="checkout-note">
            <i className="bi bi-shield-check"></i>

            Demo checkout. No online payment is required.
          </p>
        </aside>
      </form>
    </main>
  )
}

export default Checkout