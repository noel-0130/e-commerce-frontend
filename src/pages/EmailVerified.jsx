import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

function EmailVerified() {
  const { refreshUser } = useAuth()

  const [checking, setChecking] = useState(true)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    let active = true

    async function checkVerification() {
      try {
        const user = await refreshUser()

        if (!active) return

        if (user?.email_verified_at) {
          setVerified(true)
        }
      } catch (error) {
        console.error(error)
      } finally {
        if (active) setChecking(false)
      }
    }

    checkVerification()

    return () => {
      active = false
    }
  }, [refreshUser])

  if (checking) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <h1>Checking Email Verification...</h1>
          <p>Please wait.</p>
        </section>
      </main>
    )
  }

  if (!verified) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <h1>Email Not Yet Verified</h1>

          <p>
            Please check your inbox and click the
            verification link sent to your email.
          </p>

          <Link to="/login" className="auth-submit">
            Back to Login
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>🎉 Email Verified Successfully!</h1>

        <p>
          Your email has been successfully verified.
          Your account is now ready.
        </p>

        <Link to="/products" className="auth-submit">
          Continue to Shopping
        </Link>
      </section>
    </main>
  )
}

export default EmailVerified