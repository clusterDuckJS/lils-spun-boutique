import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Storefront Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import LegalPage from './pages/LegalPage';
import NotFound from './pages/NotFound';

// Auth & Patron Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Account from './pages/Account';

// Admin Portal Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-text">
      {/* Show Customer Storefront Header on non-admin routes */}
      {!isAdminRoute && <Header />}

      {/* Main Viewport */}
      <main className="flex-1">
        <Routes>
          {/* Public Storefront Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/collections/:category" element={<Collection />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Auth & Patron Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          {/* Admin Management Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Mandatory Compliance & Static Boutique Pages with Standard Aliases */}
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/pages/faqs" element={<FAQ />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/pages/shipping" element={<Shipping />} />
          <Route path="/shipping-policy" element={<Shipping />} />
          <Route path="/pages/shipping-policy" element={<Shipping />} />
          <Route path="/pages/returns" element={<Returns />} />
          <Route path="/pages/cancellation-refund" element={<Returns />} />
          <Route path="/pages/refund-policy" element={<Returns />} />
          <Route path="/cancellation-and-refund-policy" element={<Returns />} />
          <Route path="/cancellation-refund-policy" element={<Returns />} />
          <Route path="/refund-policy" element={<Returns />} />
          <Route path="/pages/privacy" element={<LegalPage />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/pages/terms" element={<LegalPage />} />
          <Route path="/terms-and-conditions" element={<LegalPage />} />
          <Route path="/terms-of-service" element={<LegalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Show Customer Storefront Footer on non-admin routes */}
      {!isAdminRoute && <Footer />}

      {/* Floating WhatsApp Chat Assistant */}
      {!isAdminRoute && <WhatsAppButton />}
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <ToastProvider>
            <WishlistProvider>
              <CartProvider>
                <HashRouter>
                  <ScrollToTop />
                  <AppLayout />
                </HashRouter>
              </CartProvider>
            </WishlistProvider>
          </ToastProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </ProductProvider>
  );
}
