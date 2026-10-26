const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (response.status === 204) return null

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(
      data?.error || data?.errors?.join(", ") || "Request failed"
    )
    error.status = response.status
    throw error
  }

  return data
}