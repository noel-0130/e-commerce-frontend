const API_URL = import.meta.env.VITE_API_URL

export async function getProduct(id) {
  let url = `${API_URL}/api/products`

  if(id) {
    url = `${API_URL}/api/products/${id}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  return response.json()
}