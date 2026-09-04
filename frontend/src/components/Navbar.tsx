import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import CartIcon from '../components/CartIcon';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Our Story', href: '#story' },
  { label: 'Distribute', href: '#distribute' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* =========================
            LOGO
        ========================== */}
        <a href="#home" className="flex items-center group">
          <img
            src="AXE.png"
            alt="Axe Breaker"
            className="
              object-contain
              w-[200px]
              h-[100px]
              -translate-y-[10px]

              max-md:w-[165px]
              max-md:h-[75px]
              max-md:-translate-y-[4px]
            "
          />
        </a>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <ul className="hidden md:flex items-center gap-8">

          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* LAB REPORTS */}
          <li>
            <Link
              to="/lab-reports"
              className="nav-link"
            >
              Lab Reports
            </Link>
          </li>

        </ul>

        {/* =========================
            DESKTOP RIGHT SIDE
        ========================== */}
        <div className="hidden md:flex items-center gap-4">

          {/* Verify Product */}
          <Link
            to="/verify"
            className="
              text-sm
              font-semibold
              text-white/80
              hover:text-red-500
              transition-colors
            "
          >
            Verify Product
          </Link>

          {/* Cart */}
          <CartIcon />

          {/* Shop Now */}
          <button
            className="
              btn-primary
              flex
              items-center
              gap-2
            "
          >
            <ShoppingBag size={16} />
            Shop Now
          </button>

        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}
        <button
          className="
            md:hidden
            text-white
            flex
            items-center
            justify-center
            shrink-0
          "
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>

      </nav>

      {/* =========================
          MOBILE MENU
      ========================== */}
      {open && (
        <div
          className="
            md:hidden
            bg-black/95
            border-t
            border-white/5
            animate-slideDown
          "
        >
          <ul className="flex flex-col px-6 py-4 gap-4">

            {/* Navigation Links */}
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link block py-2"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}

            {/* Lab Reports */}
            <li>
              <Link
                to="/lab-reports"
                className="nav-link block py-2"
                onClick={() => setOpen(false)}
              >
                Lab Reports
              </Link>
            </li>

            {/* Verify Product */}
            <li>
              <Link
                to="/verify"
                className="nav-link block py-2"
                onClick={() => setOpen(false)}
              >
                Verify Product
              </Link>
            </li>

            {/* Cart */}
            <li className="flex justify-center py-2">
              <CartIcon />
            </li>

            {/* Shop Now */}
            <li>
              <button
                className="
                  btn-primary
                  w-full
                  justify-center
                  flex
                  items-center
                  gap-2
                "
              >
                <ShoppingBag size={16} />
                Shop Now
              </button>
            </li>

          </ul>
        </div>
      )}
    </header>
  );
}