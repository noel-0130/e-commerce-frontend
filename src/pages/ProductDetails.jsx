import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getProduct } from "../api/product.js"
import { useCart } from "../context/CartContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import { productImage } from "../utils/product.js"

function ProductDetails() {
  const { addToCart, error: cartError } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [added, setAdded] = useState(false)

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login", { state: { from: location } })
      return
    }

    const ok = await addToCart(product)
    setAdded(ok)
  }

  if (loading) {
    return <p>Loading product...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!product) {
    return (
      <main className="product-not-found">
        <i className="bi bi-exclamation-circle"></i>
        <h1>Product Not Found</h1>
        <p>Sorry, we couldn't find that product.</p>
        <Link to="/products">Back to Products</Link>
      </main>
    )
  }

  return (
    <main className="product-details-page">
      <div className="product-details-breadcrumb">
        <Link to="/">Home</Link>
        <i className="bi bi-chevron-right"></i>
        <Link to="/products">Products</Link>
        <i className="bi bi-chevron-right"></i>
        <span>{product.name}</span>
      </div>

      <section className="product-details-layout">
        <div className="product-details-image">
          <img src={productImage(product)} alt={product.name} />
          {product.category && (
            <span className="product-details-category">
              {product.category}
            </span>
          )}
        </div>

        <div className="product-details-info">
          <span className="product-details-eyebrow">
            SHOP EASE COLLECTION
          </span>

          <h1>{product.name}</h1>

          <div className="product-details-price">
            ₱{Number(product.price).toLocaleString("en-PH")}
          </div>

          <p className="product-details-description">
            {product.description}
          </p>

          <div className="product-stock">
            <i
              className={`bi ${
                product.stock > 0
                  ? "bi-check-circle-fill"
                  : "bi-x-circle-fill"
              }`}
            ></i>

            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of stock"}
          </div>

          <div className="product-details-divider"></div>

          <div className="product-details-actions">
            <button
              type="button"
              className="product-add-button"
              disabled={product.stock <= 0}
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus"></i>
              Add to Cart
            </button>

            <Link to="/products" className="product-back-button">
              <i className="bi bi-arrow-left"></i>
              Back to Products
            </Link>
          </div>

          {added && (
            <p>
              Added to cart! <Link to="/cart">View Cart</Link>
            </p>
          )}

          {cartError && <p className="error-message">{cartError}</p>}

          <div className="product-details-benefits">
            <div>
              <i className="bi bi-shield-check"></i>
              <span>Quality Products</span>
            </div>

            <div>
              <i className="bi bi-box-seam"></i>
              <span>Carefully Selected</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails