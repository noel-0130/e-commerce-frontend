import { Link } from "react-router-dom"

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "Noel Shop collects your name and email address when you sign up, only to create and verify your account and process your orders.",
      "We use your email only to send account verification and order-related messages. We do not sell or share your personal information with third parties.",
      "You can ask us to delete your account and data at any time by contacting us.",
      "Contact: noelllosa1998@gmail.com",
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      "By using Noel Shop you agree to provide accurate information and to use the site lawfully.",
      "This is a demo/small e-commerce project. We may change or discontinue features at any time.",
      "Contact: noelllosa1998@gmail.com",
    ],
  },
}

function LegalPage({ type }) {
  const page = CONTENT[type]
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>{page.title}</h1>
        {page.body.map((text) => (
          <p key={text} className="auth-subtitle">{text}</p>
        ))}
        <Link to="/" className="auth-submit">Back to home</Link>
      </section>
    </main>
  )
}

export default LegalPage