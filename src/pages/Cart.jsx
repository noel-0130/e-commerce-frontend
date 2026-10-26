import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext.jsx"

function Cart() {
  const navigate = useNavigate()

  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    loading,
    error,
  } = useCart()

  if (loading) {
    return (
      <main className="cart-page">
        <p>Loading cart...</p>
      </main>
    )
  }

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <i className="bi bi-cart3"></i>
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added anything yet.</p>

          {error && (
            <p className="checkout-error" role="alert">
              {error}
            </p>
          )}

          <Link to="/products" className="cart-continue-button">
            Browse Products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cartCount} item(s) in your cart</p>
      </header>

      {error && (
        <p className="checkout-error" role="alert">
          {error}
        </p>
      )}

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                {item.category && <p>{item.category}</p>}

                <strong>
                  ₱{item.price.toLocaleString("en-PH")}
                </strong>

                <div className="cart-quantity">
                  <label htmlFor={`quantity-${item.id}`}>
                    Quantity
                  </label>

                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(item.id, event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="cart-item-actions">
                <strong>
                  ₱{(item.price * item.quantity).toLocaleString("en-PH")}
                </strong>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <i className="bi bi-trash"></i> Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="cart-summary-row">
            <span>Items ({cartCount})</span>
            <span>₱{cartTotal.toLocaleString("en-PH")}</span>
          </div>

          <div className="cart-summary-total">
            <span>Total</span>
            <strong>₱{cartTotal.toLocaleString("en-PH")}</strong>
          </div>

          <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <Link to="/products" className="cart-continue-link">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  )
}

export default Cart