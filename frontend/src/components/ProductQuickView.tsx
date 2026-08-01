import { X, ShoppingBag } from "lucide-react";
import { createPortal } from "react-dom"; // <--- 1. ADD THIS IMPORT
import type { Product } from "../lib/api";
import ProductCarousel from "./ProductCarousel";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: number) => void;
  addingProductId: number | null;
}

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart,
  addingProductId,
}: ProductQuickViewProps) {
  if (!isOpen || !product) return null;

  // 2. WRAP THE RETURN IN createPortal
  return createPortal(
    <div
      className="fixed inset-0 z-[9999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button is now safe to be fixed to the screen! */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-6 right-6 z-[10000000] bg-black/70 hover:bg-red-600 transition-all duration-300 p-3 rounded-full shadow-lg"
      >
        <X className="text-white" size={24} />
      </button>

      {/* Modal */}
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111111] border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid lg:grid-cols-2 gap-10 p-8">
          {/* Left Side */}
          <div>
            <ProductCarousel
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center">
            {product.badge && (
              <span className="inline-block bg-red-600 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5 w-fit">
                {product.badge}
              </span>
            )}

            <h2 className="text-4xl font-bold text-white mb-4">
              {product.name}
            </h2>

            <p className="text-red-500 text-3xl font-bold mb-6">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            <div className="mb-6">
              <h3 className="text-white font-semibold mb-2">
                Product Description
              </h3>

              <p className="text-white/70 leading-8">
                {product.description}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Category</span>

                <span className="text-white capitalize">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Availability</span>

                <span
                  className={
                    product.inStock
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <button
              disabled={
                !product.inStock ||
                addingProductId === product.id
              }
              onClick={() => onAddToCart(product.id)}
              className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-4 rounded-xl text-lg font-semibold disabled:opacity-50"
            >
              <ShoppingBag size={20} />

              {addingProductId === product.id
                ? "Adding..."
                : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body // <--- 3. THIS TELEPORTS IT OUT OF THE TRAP!
  );
}