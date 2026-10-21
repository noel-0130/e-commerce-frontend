import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function OrderConfirmation() {
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder")

    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder))
      } catch {
        setOrder(null)
      }
    }
  }, [])

  if (!order) {
    return (
      <div className="order-not-found">
        <i className="bi bi-receipt"></i>

        <h2>No Order Found</h2>

        <p>
          You haven't placed an order yet.
        </p>

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

          <strong>{order.orderNumber}</strong>
        </div>

        <div className="confirmation-status">
          <span>Order Status</span>
          <strong className="status-pending">
            {order.status || "Pending"}
          </strong>
        </div>

        <div className="confirmation-details">
          <h2>Order Details</h2>

          {order.items?.map((item) => (
            <div className="confirmation-item" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>Quantity: {item.quantity}</p>
              </div>

              <span>
                ₱{(
                  Number(item.price) * Number(item.quantity)
                ).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}

          <div className="confirmation-row">
            <span>Subtotal</span>
            <span>
              ₱{Number(order.subtotal).toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="confirmation-row">
            <span>Shipping Fee</span>
            <span>
              ₱{Number(order.shippingFee).toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="confirmation-total">
            <span>Total Amount</span>
            <strong>
              ₱{Number(order.total).toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
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
            <strong>{order.customer?.fullName}</strong>
          </p>

          <p>{order.customer?.phone}</p>

          <p>{order.customer?.address}</p>

          <p>
            {order.customer?.city}
            {order.customer?.postalCode
              ? `, ${order.customer.postalCode}`
              : ""}
          </p>
        </div>

        <button
          className="confirmation-button"
          onClick={() => navigate("/products")}
        >
          <i className="bi bi-bag"></i>
          Continue Shopping
        </button>

        <p className="confirmation-note">
          This is a demo order. Order information is currently saved
          in your browser only.
        </p>
      </section>
    </main>
  )
}

export default OrderConfirmation