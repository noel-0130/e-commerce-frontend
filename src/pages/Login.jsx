import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "../context/AuthContext.jsx"

function Login() {
  const { user, loading, loginWithGoogle } = useAuth()
  const location = useLocation()
  const [error, setError] = useState("")

  const from = location.state?.from?.pathname || "/"

  if (loading) return <p className="auth-loading">Loading...</p>

  if (user) return <Navigate to={from} replace />

  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Welcome to ShopEase</h1>
        <p>Log in with Google to add items to your cart and checkout.</p>

        <GoogleLogin
          onSuccess={(response) => {
            setError("")
            loginWithGoogle(response.credential).catch((e) =>
              setError(e.message)
            )
          }}
          onError={() => setError("Google login failed.")}
        />

        {error && (
          <p className="checkout-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </main>
  )
}

export default Login