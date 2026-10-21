const API_URL = import.meta.env.VITE_API_URL

export async function createCart() {
  const response = await fetch(`${API_URL}/api/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if(!response.ok) {
    throw new Error("Failed to create cart")
  }

  return response.json()
}