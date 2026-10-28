# TechHub

E-commerce site for laptops and PC components.

**Live demo:** https://noel-llosa.vercel.app/
**Backend repo:** https://github.com/noel-0130/e-commerce-backend.git

## Features
- Google login
- Shopping cart
- Checkout
- Order history

## Tech Stack
- **Frontend:** React + Vite (single-page app), deployed on Vercel
- **Backend:** Rails API (separate repo)
- **Auth:** Google OAuth

## Run Locally
1. Clone the repo:
   `git clone https://github.com/noel-0130/e-commerce-frontend.git`
2. Install dependencies:
   `npm install`
3. Create a `.env` file in the project root and add the variables below
4. Start the dev server:
   `npm run dev`

Make sure the Rails API is running too (see the backend README).

## Environment Variables
Add these to your `.env` file:

| Name | Description | Example |
|------|-------------|---------|
| `VITE_API_URL` | URL of the Rails API | `http://localhost:3000` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | `your-client-id` |

## Decisions
- **Separate Rails API:** [why, e.g. I'm comfortable with Rails and wanted the backend independent from the UI]
- **Google login:** [why, e.g. faster signup and no passwords to store]
- **Single-page app (CSR):** [why, e.g. simple to start with; I know SEO is a trade-off]

## Roadmap
- [ ] Quantity buttons (+ / -) in the cart
- [ ] Email and password login (in addition to Google), with email verification before first login
- [ ] Admin module:
  - [ ] Add and manage products
  - [ ] Manage users
  - [ ] Update order status (e.g. pending, paid, shipped, completed)