import { useEffect, useState } from "react"
import { getProduct } from "../api/product.js"
import ProductCard from "../components/ProductCard.jsx"

function Products() {
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

  return (
    <main className="products-page">
      <section className="products-header">
        <span className="products-eyebrow">OUR COLLECTION</span>
        <h1>Discover Our Products</h1>
        <p>Find the perfect products for your everyday needs.</p>
      </section>

      <section className="products-section">
        <div className="products-toolbar">
          <h2>All Products</h2>
          <span>{products.length} products available</span>
        </div>

        {loading && <p>Loading products...</p>}

        {error && (
          <div className="error-message">
            <p>⚠️ Failed to load products.</p>
            <p>{error}</p>

            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p>No products available.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Products