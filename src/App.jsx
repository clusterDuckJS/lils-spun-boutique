import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import DemoCheckout from './pages/DemoCheckout';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import LegalPage from './pages/LegalPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <HashRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-text">
              {/* Site Header */}
              <Header />

              {/* Main Content Viewport */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/collections/:category" element={<Collection />} />
                  <Route path="/products/:slug" element={<ProductDetails />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<DemoCheckout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/pages/faqs" element={<FAQ />} />
                  <Route path="/pages/shipping" element={<Shipping />} />
                  <Route path="/pages/returns" element={<Returns />} />
                  <Route path="/pages/privacy" element={<LegalPage />} />
                  <Route path="/pages/terms" element={<LegalPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Site Footer */}
              <Footer />
            </div>
          </HashRouter>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
