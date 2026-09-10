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
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// --- PAGES ---
import VerifyPage from "./pages/VerifyPage";
import LabReportsPage from "./pages/LabReportsPage";
import AdminLabReports from "./pages/AdminLabReports";
import AdminLogin from "./pages/AdminLogin";

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
        {/* HERO */}
        <Hero />

        {/* FEATURES */}
        <Features />

        {/* PRODUCTS */}
        <Product />

        {/* ABOUT */}
        <About />

        {/* TICKER */}
        <Ticker />

        {/* DISTRIBUTOR */}
        <Distributor />

        {/* CONTACT */}
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

        {/* ==========================================
            HOME PAGE
            ========================================== */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* ==========================================
            PUBLIC LAB REPORTS
            ========================================== */}
        <Route
          path="/lab-reports"
          element={<LabReportsPage />}
        />

        {/* ==========================================
            ADMIN LOGIN
            ========================================== */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ==========================================
            PROTECTED ADMIN AREA
            ========================================== */}
        <Route element={<AdminProtectedRoute />}>

          <Route
            path="/admin/lab-reports"
            element={<AdminLabReports />}
          />

        </Route>

        {/* ==========================================
            PRODUCT INFORMATION
            ========================================== */}
        <Route
          path="/productinfo"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
                  Loading Product Info...
                </div>
              }
            >
              <ProductInfo />
            </Suspense>
          }
        />

        {/* ==========================================
            QR VERIFICATION
            ========================================== */}
        <Route
          path="/verify"
          element={<VerifyPage />}
        />

        {/* ==========================================
            CART
            ========================================== */}
        <Route
          path="/cart"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
                  Loading Cart...
                </div>
              }
            >
              <Cart />
            </Suspense>
          }
        />

        {/* ==========================================
            CHECKOUT
            ========================================== */}
        <Route
          path="/checkout"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
                  Loading Checkout...
                </div>
              }
            >
              <Checkout />
            </Suspense>
          }
        />

        {/* ==========================================
            ORDER SUCCESS
            ========================================== */}
        <Route
          path="/order-success"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
                  Loading...
                </div>
              }
            >
              <OrderSuccess />
            </Suspense>
          }
        />

        {/* ==========================================
            404 PAGE
            ========================================== */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl">
              404 - Page Not Found
            </div>
          }
        />

      </Routes>

      {/* ==========================================
          FLOATING WHATSAPP BUTTON
          ========================================== */}
      <a
        href="https://wa.me/916362302029"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          fixed
          bottom-6
          right-6
          z-50
          bg-[#25D366]
          hover:bg-[#1EBE5D]
          text-white
          p-4
          rounded-full
          shadow-2xl
          transition-all
          duration-300
          hover:scale-110
        "
      >
        <FaWhatsapp size={32} />
      </a>
    </>
  );
}