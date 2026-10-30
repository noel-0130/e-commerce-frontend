import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

function EmailVerified() {
  const { refreshUser } = useAuth()
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function checkAuthentication() {
      try {
        const user = await refreshUser()

        if (!active) return

        if (user) {
          navigate("/products", { replace: true })
        } else {
          setError(true)
        }
      } catch {
        if (active) setError(true)
      } finally {
        if (active) setChecking(false)
      }
    }

    checkAuthentication()

    return () => {
      active = false
    }
  }, [refreshUser, navigate])

  if (checking) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <h1>Email verified!</h1>
          <p>Checking your account...</p>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <h1>Email verified!</h1>
          <p>
            Your email is verified, but automatic login
            was unsuccessful. Please sign in.
          </p>

          <Link to="/login" className="auth-submit">
            Sign in
          </Link>
        </section>
      </main>
    )
  }

  return null
}

export default EmailVerified