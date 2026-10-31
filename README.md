# TechHub — E-commerce Frontend

Frontend application for TechHub, an e-commerce platform built with React and Vite.

🌐 **Live Website:** https://noel-llosa.vercel.app/  
📦 **Backend Repository:** https://github.com/noel-0130/e-commerce-backend

## Features

- User registration and login
- Google OAuth authentication
- Email verification
- Resend verification email
- Session-based authentication
- Product browsing
- Shopping cart
- Checkout
- Cash on Delivery (COD)
- Order history
- Privacy Policy and Terms of Service

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- Bootstrap Icons
- Google OAuth
- Ruby on Rails API
- PostgreSQL

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/noel-0130/e-commerce-frontend.git
cd e-commerce-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Vite loads different files depending on the mode:

| File | Used by | Purpose |
| --- | --- | --- |
| `.env` | all modes | Shared values |
| `.env.development` | `npm run dev` | Local development values |
| `.env.production` | `npm run build` | Production values |

Copy `.env.example` and fill in the values for each environment:

```bash
cp .env.example .env.development
cp .env.example .env.production
```

`.env.development` example:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

`.env.production` example:

```env
VITE_API_URL=https://your-production-api.example.com
VITE_GOOGLE_CLIENT_ID=your_production_google_client_id
```

Only variables prefixed with `VITE_` are exposed to the browser. On Vercel, the
values set in Project Settings → Environment Variables override these files.

### 4. Start Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```text
src/
├── api/
├── assets/
├── components/
├── context/
├── data/
├── pages/
└── utils/
```

## Backend Configuration

This frontend communicates with the TechHub backend API.

Make sure the backend is running and that the API URL is correctly configured.

Backend repository:

https://github.com/noel-0130/e-commerce-backend

## Deployment

The frontend is deployed using Vercel.

Production URL:

https://noel-llosa.vercel.app/

Configure the required environment variables in your Vercel project settings.

## Future Plans

The following features are planned for future development:

- [ ] Online payment integration (GCash, Maya, and other payment providers)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Improved product search, filtering, and sorting
- [ ] Order tracking
- [ ] Discount codes and promotional features
- [ ] Improved mobile user experience
- [ ] Performance and accessibility improvements

## Author

Noel A. Llosa