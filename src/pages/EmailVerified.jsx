import { Link } from "react-router-dom"

function EmailVerified() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo" aria-hidden="true">
            <i className="bi bi-patch-check-fill" />
          </span>
          <span className="auth-brand-name">Noel Shop</span>
        </div>

        <h1>Email verified!</h1>
        <p className="auth-subtitle">
          Tapos na ang signup mo. Naka-login ka na at pwede ka nang mamili.
        </p>

        <Link to="/products" className="auth-submit">
          Start shopping
        </Link>
      </section>
    </main>
  )
}

export default EmailVerified