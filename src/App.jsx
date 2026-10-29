import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext.jsx"
import { CartProvider } from "./context/CartContext.jsx"
import Navbar from "./components/Navbar.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Products from "./pages/Products.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import Cart from "./pages/Cart.jsx"
import Checkout from "./pages/Checkout.jsx"
import OrderConfirmation from "./pages/OrderConfirmation"
import OrderHistory from "./pages/OrderHistory"
import EmailVerified from "./pages/EmailVerified.jsx"
import VerifyFailed from "./pages/VerifyFailed.jsx"
import LegalPage from "./pages/LegalPage.jsx"

// Hide the navbar on full-page screens like /login
const HIDE_NAVBAR_PATHS = ["/login"]

function AppNavbar() {
  const { pathname } = useLocation()
  if (HIDE_NAVBAR_PATHS.includes(pathname)) return null
  return <Navbar />
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppNavbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/email-verified" element={<EmailVerified />} /> 
            <Route path="/verify-failed" element={<VerifyFailed />} /> 
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route
              path="/cart"
              element={<ProtectedRoute><Cart /></ProtectedRoute>}
            />
            <Route
              path="/checkout"
              element={<ProtectedRoute><Checkout /></ProtectedRoute>}
            />
            <Route
              path="/order-confirmation"
              element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>}
            />
            <Route
              path="/order-history"
              element={<ProtectedRoute><OrderHistory /></ProtectedRoute>}
            />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App