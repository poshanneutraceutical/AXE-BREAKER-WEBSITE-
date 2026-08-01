import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Product from "./components/Product";
import About from "./components/About";
import Ticker from "./components/Ticker";
import Distributor from "./components/Distributor";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// --- VERIFY PAGE (Loaded instantly for fast QR scanning) ---
import VerifyPage from "./pages/VerifyPage";

// --- LAZY LOADED PAGES ---
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const ProductInfo = lazy(() => import("./pages/ProductInfo"));

// --- HOME PAGE ---
function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Product />
        <About />
        <Ticker />
        <Distributor />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Product Information */}
        <Route
          path="/productinfo"
          element={
            <Suspense
              fallback={
                <div className="text-white text-center py-20 text-xl">
                  Loading Product Info...
                </div>
              }
            >
              <ProductInfo />
            </Suspense>
          }
        />

        {/* QR Verification */}
        <Route path="/verify" element={<VerifyPage />} />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <Suspense
              fallback={
                <div className="text-white text-center py-20 text-xl">
                  Loading Cart...
                </div>
              }
            >
              <Cart />
            </Suspense>
          }
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            <Suspense
              fallback={
                <div className="text-white text-center py-20 text-xl">
                  Loading Checkout...
                </div>
              }
            >
              <Checkout />
            </Suspense>
          }
        />

        {/* Order Success */}
        <Route
          path="/order-success"
          element={
            <Suspense
              fallback={
                <div className="text-white text-center py-20 text-xl">
                  Loading...
                </div>
              }
            >
              <OrderSuccess />
            </Suspense>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/916362302029"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp size={32} />
      </a>
    </>
  );
}