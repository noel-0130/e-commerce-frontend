import { useState } from "react"
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "../context/AuthContext.jsx"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(mode, values) {
  const errors = {}

  if (mode === "signup" && values.name.trim().length < 2) {
    errors.name = "Please enter your full name."
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Enter a valid email address."
  }
  if (mode === "signup") {
    if (values.password.length < 8) {
      errors.password = "Use at least 8 characters."
    }
    if (values.confirm !== values.password) {
      errors.confirm = "Passwords do not match."
    }
  } else if (!values.password) {
    errors.password = "Enter your password."
  }

  return errors
}

function passwordStrength(password) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

const STRENGTH_LABELS = ["Too weak", "Weak", "Okay", "Good", "Strong"]

function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete,
  hint,
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={`auth-field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <i className="bi bi-lock auth-input-icon" aria-hidden="true" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder="••••••••"
        />
        <button
          type="button"
          className="auth-eye"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <i className={`bi ${visible ? "bi-eye-slash" : "bi-eye"}`} />
        </button>
      </div>
      {hint}
      {error && (
        <p className="auth-field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

function Login() {
  const { user, loading, loginWithGoogle, loginWithEmail, registerWithEmail } =
    useAuth()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const mode = searchParams.get("mode") === "signup" ? "signup" : "login"
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname || "/"
  const isSignup = mode === "signup"

  if (loading) return <p className="auth-loading">Loading...</p>
  if (user) return <Navigate to={from} replace />

  function switchMode(next) {
    setErrors({})
    setFormError("")
    setSearchParams(next === "signup" ? { mode: "signup" } : {}, {
      replace: true,
      state: location.state,
    })
  }

  function setField(name) {
    return (e) => {
      setValues((v) => ({ ...v, [name]: e.target.value }))
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError("")

    const found = validate(mode, values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSubmitting(true)
    try {
      if (isSignup) {
        await registerWithEmail({
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        })
      } else {
        await loginWithEmail({
          email: values.email.trim(),
          password: values.password,
        })
      }
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const strength = passwordStrength(values.password)

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-brand">
          <span className="auth-logo" aria-hidden="true">
            <i className="bi bi-bag-heart-fill" />
          </span>
          <span className="auth-brand-name">Noel Shop</span>
        </div>

        <h1 id="auth-title">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="auth-subtitle">
          {isSignup
            ? "Join Noel Shop to save your cart and track your orders."
            : "Sign in to add items to your cart and checkout."}
        </p>

        <div className="auth-tabs" role="tablist" aria-label="Authentication">
          <button
            type="button"
            role="tab"
            aria-selected={!isSignup}
            className={!isSignup ? "active" : ""}
            onClick={() => switchMode("login")}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isSignup}
            className={isSignup ? "active" : ""}
            onClick={() => switchMode("signup")}
          >
            Sign up
          </button>
        </div>

        <div className="auth-google">
          <GoogleLogin
            onSuccess={(response) => {
              setFormError("")
              loginWithGoogle(response.credential).catch((err) =>
                setFormError(err.message)
              )
            }}
            onError={() => setFormError("Google sign-in failed. Try again.")}
            text={isSignup ? "signup_with" : "signin_with"}
            shape="pill"
            size="large"
            width="320"
            logo_alignment="left"
          />
        </div>

        <div className="auth-divider">
          <span>or continue with email</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <div className={`auth-field ${errors.name ? "has-error" : ""}`}>
              <label htmlFor="auth-name">Full name</label>
              <div className="auth-input-wrap">
                <i className="bi bi-person auth-input-icon" aria-hidden="true" />
                <input
                  id="auth-name"
                  type="text"
                  value={values.name}
                  onChange={setField("name")}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  placeholder="Juan Dela Cruz"
                />
              </div>
              {errors.name && <p className="auth-field-error">{errors.name}</p>}
            </div>
          )}

          <div className={`auth-field ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="auth-email">Email</label>
            <div className="auth-input-wrap">
              <i className="bi bi-envelope auth-input-icon" aria-hidden="true" />
              <input
                id="auth-email"
                type="email"
                value={values.email}
                onChange={setField("email")}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="auth-field-error">{errors.email}</p>}
          </div>

          <PasswordField
            id="auth-password"
            label="Password"
            value={values.password}
            onChange={setField("password")}
            error={errors.password}
            autoComplete={isSignup ? "new-password" : "current-password"}
            hint={
              isSignup && values.password ? (
                <div className="auth-strength" aria-live="polite">
                  <div className={`auth-strength-bar level-${strength}`}>
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <small>{STRENGTH_LABELS[strength]}</small>
                </div>
              ) : null
            }
          />

          {isSignup && (
            <PasswordField
              id="auth-confirm"
              label="Confirm password"
              value={values.confirm}
              onChange={setField("confirm")}
              error={errors.confirm}
              autoComplete="new-password"
            />
          )}

          {formError && (
            <p className="auth-form-error" role="alert">
              <i className="bi bi-exclamation-circle" aria-hidden="true" />{" "}
              {formError}
            </p>
          )}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? (
              <>
                <span className="auth-spinner" aria-hidden="true" />
                {isSignup ? "Creating account..." : "Signing in..."}
              </>
            ) : isSignup ? (
              "Create account"
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New to Noel Shop?"}{" "}
          <button
            type="button"
            onClick={() => switchMode(isSignup ? "login" : "signup")}
          >
            {isSignup ? "Sign in" : "Create an account"}
          </button>
        </p>

        <p className="auth-legal">
          By continuing, you agree to our <Link to="/">Terms</Link> and{" "}
          <Link to="/">Privacy Policy</Link>.
        </p>
      </section>
    </main>
  )
}

export default Login