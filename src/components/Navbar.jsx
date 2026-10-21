import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation()

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
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar