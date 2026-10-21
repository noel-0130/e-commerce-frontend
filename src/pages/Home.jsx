import { Link } from "react-router-dom"
import products from "../data/products.json"
import ProductCard from "../components/ProductCard.jsx"

function Home() {
  const featuredProducts = products.slice(0, 3)

  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            <i className="bi bi-stars"></i>
            YOUR EVERYDAY SHOPPING DESTINATION
          </span>

          <h1>
            Find Your Next
            <br />
            <span>Favorite Thing.</span>
          </h1>

          <p>
            Discover quality products at great prices.
            Everything you need, all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="hero-button primary">
              Shop Now
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link to="/products" className="hero-button secondary">
              Explore Products
            </Link>
          </div>

          <div className="hero-trust">
            <div>
              <i className="bi bi-shield-check"></i>
              <span>Quality Products</span>
            </div>

            <div>
              <i className="bi bi-tag"></i>
              <span>Great Prices</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>

          <div className="hero-product-card">
            <div className="hero-product-icon">
              <i className="bi bi-bag-heart"></i>
            </div>

            <span>YOUR NEXT FAVORITE</span>
            <h3>Smart Shopping.</h3>
            <p>Simple. Convenient. Everyday.</p>
          </div>

          <div className="hero-floating-icon icon-one">
            <i className="bi bi-headphones"></i>
          </div>

          <div className="hero-floating-icon icon-two">
            <i className="bi bi-keyboard"></i>
          </div>

          <div className="hero-floating-icon icon-three">
            <i className="bi bi-controller"></i>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefit-item">
          <div className="benefit-icon">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <h3>Quality Selection</h3>
            <p>Products chosen for your needs.</p>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <i className="bi bi-wallet2"></i>
          </div>

          <div>
            <h3>Great Value</h3>
            <p>Find products at great prices.</p>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">
            <i className="bi bi-heart"></i>
          </div>

          <div>
            <h3>Easy Shopping</h3>
            <p>A simple and convenient experience.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="featured-header">
          <div>
            <span className="section-eyebrow">HANDPICKED FOR YOU</span>
            <h2>Featured Products</h2>
            <p>Check out some of our favorite picks.</p>
          </div>

          <Link to="/products" className="view-all-link">
            View All Products
            <i className="bi bi-arrow-up-right"></i>
          </Link>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="home-cta">
        <div>
          <span>READY TO EXPLORE?</span>
          <h2>Your next great find is waiting.</h2>
          <p>Browse our collection and discover something you love.</p>
        </div>

        <Link to="/products" className="cta-button">
          Browse Products
          <i className="bi bi-arrow-right"></i>
        </Link>
      </section>

    </main>
  )
}

export default Home