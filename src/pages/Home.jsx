import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProduct } from "../api/product.js"
import ProductCard from "../components/ProductCard.jsx"

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getProduct()
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const featuredProducts = products.slice(0, 3)

  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            <i className="bi bi-pc-display-horizontal"></i>
            LAPTOPS & PC COMPONENTS
          </span>

          <h1>
            Power Up Your
            <br />
            <span>Next Build.</span>
          </h1>

          <p>
            Discover laptops, processors, graphics cards, storage,
            and essential PC components for work, gaming, and everyday use.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="hero-button primary">
              Explore Products
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="hero-trust">
            <div>
              <i className="bi bi-cpu"></i>
              <span>PC Components</span>
            </div>

            <div>
              <i className="bi bi-laptop"></i>
              <span>Laptops & Accessories</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>

          <div className="hero-product-card">
            <div className="hero-product-icon">
              <i className="bi bi-motherboard"></i>
            </div>

            <span>BUILD YOUR SETUP</span>
            <h3>Performance Starts Here.</h3>
            <p>Choose your parts. Build your future.</p>
          </div>

          <div className="hero-floating-icon icon-one">
            <i className="bi bi-cpu"></i>
          </div>

          <div className="hero-floating-icon icon-two">
            <i className="bi bi-gpu-card"></i>
          </div>

          <div className="hero-floating-icon icon-three">
            <i className="bi bi-device-ssd"></i>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="benefits-section">
        <div className="benefit-item">
          <div className="benefit-icon">
            <i className="bi bi-laptop"></i>
          </div>

          <div>
            <h3>Laptops</h3>
            <p>Devices for work, study, and play.</p>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <i className="bi bi-cpu"></i>
          </div>

          <div>
            <h3>PC Components</h3>
            <p>Processors, graphics cards, and more.</p>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <i className="bi bi-device-ssd"></i>
          </div>

          <div>
            <h3>Storage & Accessories</h3>
            <p>Upgrade your setup your way.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="featured-header">
          <div>
            <span className="section-eyebrow">
              EXPLORE OUR COLLECTION
            </span>

            <h2>Featured Products</h2>

            <p>
              Discover components and devices for your next setup.
            </p>
          </div>

          <Link to="/products" className="view-all-link">
            View All Products
            <i className="bi bi-arrow-up-right"></i>
          </Link>
        </div>

        {loading && (
          <p>Loading featured products...</p>
        )}

        {error && (
          <div className="error-message">
            <p>Unable to load featured products.</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && featuredProducts.length === 0 && (
          <p>No products available at the moment.</p>
        )}

        {!loading && !error && featuredProducts.length > 0 && (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* Bottom Promotional Section */}
      <section className="home-cta">
        <div>
          <span>BUILT FOR YOUR NEXT UPGRADE</span>

          <h2>Better hardware. Better possibilities.</h2>

          <p>
            Find the right components and accessories for your setup.
          </p>
        </div>
      </section>

    </main>
  )
}

export default Home