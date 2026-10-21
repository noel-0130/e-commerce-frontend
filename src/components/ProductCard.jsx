import { Link } from "react-router-dom"

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-card-footer">
          <span className="product-price">
            ₱{product.price.toLocaleString("en-PH")}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="product-view-button"
          >
            View Details
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard