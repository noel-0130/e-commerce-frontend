import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import { useCart } from "../context/CartContext.jsx"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { cartCount } = useCart()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/"
    }

    return location.pathname === path
  }

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: "bi-house-door",
    },
    {
      label: "Products",
      path: "/products",
      icon: "bi-grid",
    },
    {
      label: "My Orders",
      path: "/order-history",
      icon: "bi-receipt",
    },
    {
      label: "Cart",
      path: "/cart",
      icon: "bi-cart3",
    },
  ]

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ShopEase<span>.</span>
      </Link>

      <div className="navbar-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${
              isActive(item.path) ? "active" : ""
            }`}
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>

            {item.path === "/cart" && cartCount > 0 && (
              <span
                className="cart-badge"
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-user">
              <i className="bi bi-person-circle"></i> {user.name}
            </span>
            <button
              type="button"
              className="nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar