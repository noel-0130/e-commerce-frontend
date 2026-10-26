import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getOrders } from "../api/orders.js"

function OrderHistory() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const formatDate = (date) => {
    if (!date) return "Date unavailable"

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable"
    }

    return parsedDate.toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  }

  const formatStatus = (status) =>
    status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"

  if (loading) {
    return (
      <main className="order-history-page container">
        <p>Loading orders...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="order-history-page container">
        <p className="checkout-error" role="alert">
          {error}
        </p>
      </main>
    )
  }

  if (orders.length === 0) {
    return (
      <main className="order-history-page container">
        <header className="order-history-header">
          <h1>My Orders</h1>
          <p>Track and review your previous purchases.</p>
        </header>

        <section className="order-history-empty">
          <i className="bi bi-bag"></i>

          <h2>No orders yet</h2>

          <p>
            Your completed checkout orders will appear here.
          </p>

          <button
            className="history-button"
            onClick={() => navigate("/products")}
          >
            <i className="bi bi-shop"></i>
            Start Shopping
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="order-history-page container">
      <header className="order-history-header">
        <h1>My Orders</h1>

        <p>
          You have {orders.length}{" "}
          {orders.length === 1 ? "order" : "orders"}.
        </p>
      </header>

      <section className="order-history-list">
        {orders.map((order) => (
          <article
            className="history-order-card"
            key={order.id}
          >
            <div className="history-order-header">
              <div>
                <span className="history-label">
                  Order Number
                </span>

                <h2>{order.order_number}</h2>

                <p className="history-date">
                  {formatDate(order.created_at)}
                </p>
              </div>

              <span className="history-status">
                {formatStatus(order.status)}
              </span>
            </div>

            <div className="history-order-items">
              {order.items.map((item, index) => (
                <div
                  className="history-order-item"
                  key={`${order.id}-${item.product_id}-${index}`}
                >
                  <div>
                    <strong>{item.name}</strong>

                    <p>
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <span>
                    ₱{formatPrice(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="history-order-footer">
              <div>
                <span className="history-label">
                  Payment Method
                </span>

                <strong>COD</strong>
              </div>

              <div className="history-total">
                <span className="history-label">
                  Total Amount
                </span>

                <strong>
                  ₱{formatPrice(order.total_amount)}
                </strong>
              </div>
            </div>

            <button
              className="history-details-button"
              onClick={() =>
                navigate(`/order-confirmation?order=${order.id}`)
              }
            >
              View Order Details
              <i className="bi bi-arrow-right"></i>
            </button>
          </article>
        ))}
      </section>

      <button
        className="history-continue-button"
        onClick={() => navigate("/products")}
      >
        <i className="bi bi-shop"></i>
        Continue Shopping
      </button>
    </main>
  )
}

export default OrderHistory