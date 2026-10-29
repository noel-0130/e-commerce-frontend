import { Link } from "react-router-dom"

function VerifyFailed() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo" aria-hidden="true">
            <i className="bi bi-exclamation-triangle-fill" />
          </span>
          <span className="auth-brand-name">Noel Shop</span>
        </div>

        <h1>Link expired o invalid</h1>
        <p className="auth-subtitle">
          Baka na-verify mo na ang email mo, o lumipas na ang 24 oras.
          Mag-sign in para humiling ng bagong link.
        </p>

        <Link to="/login" className="auth-submit">
          Go to sign in
        </Link>
      </section>
    </main>
  )
}

export default VerifyFailed