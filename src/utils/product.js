export function productImage(product) {
  return (
    product.image ||
    `https://placehold.co/300x300?text=${encodeURIComponent(
      product.name || "Product"
    )}`
  )
}