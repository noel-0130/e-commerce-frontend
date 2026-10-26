import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getOrder } from "../api/orders.js"

function OrderConfirmation() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get("order")

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(Boolean(orderId))

  useEffect(() => {
    if (!orderId) return

    getOrder(orderId)
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false))
  }, [orderId])

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const formatStatus = (status) =>
    status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"

  if (loading) {
    return (
      <div className="order-not-found">
        <p>Loading order...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="order-not-found">
        <i className="bi bi-receipt"></i>

        <h2>No Order Found</h2>

        <p>We couldn't find that order.</p>

        <button
          className="confirmation-button"
          onClick={() => navigate("/products")}
        >
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <main className="confirmation-page container">
      <section className="confirmation-card">
        <div className="confirmation-icon">
          <i className="bi bi-check-lg"></i>
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="confirmation-message">
          Thank you for your purchase. Your order has been received.
        </p>

        <div className="confirmation-order-number">
          <span>Order Number</span>

          <strong>{order.order_number}</strong>
        </div>

        <div className="confirmation-status">
          <span>Order Status</span>
          <strong className="status-pending">
            {formatStatus(order.status)}
          </strong>
        </div>

        <div className="confirmation-details">
          <h2>Order Details</h2>

          {order.items.map((item, index) => (
            <div
              className="confirmation-item"
              key={`${item.product_id}-${index}`}
            >
              <div>
                <strong>{item.name}</strong>
                <p>Quantity: {item.quantity}</p>
              </div>

              <span>₱{formatPrice(item.subtotal)}</span>
            </div>
          ))}

          <div className="confirmation-total">
            <span>Total Amount</span>
            <strong>₱{formatPrice(order.total_amount)}</strong>
          </div>
        </div>

        <div className="confirmation-payment">
          <i className="bi bi-cash-stack"></i>

          <div>
            <strong>Cash on Delivery</strong>
            <p>Pay when your order arrives.</p>
          </div>
        </div>

        <div className="confirmation-shipping">
          <h2>Delivery Information</h2>

          <p>
            <strong>{order.customer_name}</strong>
          </p>

          <p>{order.customer_email}</p>

          <p>{order.shipping_address}</p>
        </div>

        <button
          className="confirmation-button"
          onClick={() => navigate("/products")}
        >
          <i className="bi bi-bag"></i>
          Continue Shopping
        </button>
      </section>
    </main>
  )
}

export default OrderConfirmation