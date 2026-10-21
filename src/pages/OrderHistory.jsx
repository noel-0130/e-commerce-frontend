import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function OrderHistory() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("orderHistory") || "[]"
      )

      setOrders(
        Array.isArray(savedOrders) ? savedOrders : []
      )
    } catch (error) {
      console.error("Failed to load order history:", error)
      setOrders([])
    }
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
            key={order.orderNumber}
          >
            <div className="history-order-header">
              <div>
                <span className="history-label">
                  Order Number
                </span>

                <h2>{order.orderNumber}</h2>

                <p className="history-date">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <span className="history-status">
                {order.status || "Pending"}
              </span>
            </div>

            <div className="history-order-items">
              {(order.items || []).map((item, index) => (
                <div
                  className="history-order-item"
                  key={`${order.orderNumber}-${item.id}-${index}`}
                >
                  <div>
                    <strong>{item.title}</strong>

                    <p>
                      Quantity: {item.quantity}
                    </p>
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

            <div className="history-order-footer">
              <div>
                <span className="history-label">
                  Payment Method
                </span>

                <strong>
                  {order.paymentMethod || "COD"}
                </strong>
              </div>

              <div className="history-total">
                <span className="history-label">
                  Total Amount
                </span>

                <strong>
                  ₱{formatPrice(order.total)}
                </strong>
              </div>
            </div>

            <button
              className="history-details-button"
              onClick={() =>
                navigate(
                  `/order-confirmation?order=${encodeURIComponent(
                    order.orderNumber
                  )}`
                )
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