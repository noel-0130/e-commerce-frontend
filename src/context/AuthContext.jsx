import { createContext, useContext, useEffect, useState } from "react"
import { apiRequest } from "../api/client.js"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiRequest("/api/v1/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function loginWithGoogle(credential) {
    const data = await apiRequest("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    })
    setUser(data.user)
  }

  // NOTE: these two need matching backend endpoints.
  async function loginWithEmail({ email, password }) {
    const data = await apiRequest("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    setUser(data.user)
  }

  async function registerWithEmail({ name, email, password }) {
    const data = await apiRequest("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
    setUser(data.user)
  }

  async function logout() {
    try {
      await apiRequest("/api/v1/auth/logout", { method: "DELETE" })
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}