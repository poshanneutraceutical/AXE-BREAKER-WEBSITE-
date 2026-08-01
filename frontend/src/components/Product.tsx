import { useEffect, useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { type Product } from "../lib/api";
import { useCart } from '../context/CartContext';
import ProductCarousel from "./ProductCarousel";
import ProductQuickView from "./ProductQuickView";
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Blood Rush Pre-Workout",
    price: 2800,
    description:
      "Blood Rush Pre-Workout is crafted to deliver explosive energy, intense focus, and long-lasting endurance for athletes who refuse to settle. Powered by premium performance ingredients, it helps maximize strength, improve training intensity, and support peak performance—so every workout brings you one step closer to your goals.",
    category: "pre-workout",
    images: [
      "/products/pre-workout/1.png",
      "/products/pre-workout/2.png",
      "/products/pre-workout/3.png",
      "/products/pre-workout/4.png",
      "/products/pre-workout/5.png",
      "/products/pre-workout/6.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },
 {
   id: 2,
   name: " Burn Syndicate Pre-workout + Fat burner",
   price: 2800,
   description:
    "Push beyond your limits with   Axe Breaker Pre-Workout + Fat Burner. Engineered to ignite explosive energy, razor-sharp focus, and relentless endurance, this formula is built for those who refuse to quit. Train harder, move faster, and dominate every session with confidence.",
      category: "pre-workout",
   images: [
     "/products/Fat-burner/7.png",
          "/products/Fat-burner/8.png",
          "/products/Fat-burner/9.png",
          "/products/Fat-burner/10.png",
          "/products/Fat-burner/11.png",
          "/products/Fat-burner/12.png",
   ],
   badge: "BEST SELLER",
   featured: true,
   inStock: true,
 },
 {
   id: 3,
   name: " Devils Pump Non-Stim Pre-Workout  ",
   price: 2600,
   description:
    "Axe Breaker Non-Stim Pre-Workout delivers clean performance without relying on stimulants. Engineered to support endurance, focus, and workout intensity, it helps you stay consistent and perform at your peak—day or night.",
      category: "pre-workout",
   images: [
     "/products/Non-stim preworkout/13.png",
     "/products/Non-stim preworkout/14.png",
     "/products/Non-stim preworkout/15.png",
     "/products/Non-stim preworkout/16.png",
     "/products/Non-stim preworkout/17.png",
     "/products/Non-stim preworkout/18.png",
   ],
   badge: "BEST SELLER",
   featured: true,
   inStock: true,
 },
{
   id: 4,
   name: " EAA + Electrolytes  ",
   price: 2600,

    description:
     "Axe Breaker EAA + Electrolytes is crafted to support hydration, endurance, and muscle recovery with a premium blend of essential amino acids and electrolytes. Designed for athletes and fitness enthusiasts, it helps you stay hydrated, maintain performance, and recover efficiently throughout every training session.",
      category: "pre-workout",
   images: [
     "/products/EAA electrolyte/19.png",
     "/products/EAA electrolyte/20.png",
     "/products/EAA electrolyte/21.png",
     "/products/EAA electrolyte/22.png",
     "/products/EAA electrolyte/23.png",
     "/products/EAA electrolyte/24.png",
   ],
   badge: "BEST SELLER",
   featured: true,
   inStock: true,
 },
{
   id: 5,
   name: " Protein Matrix-150  ",
   price: 3000,

    description:
     " Axe Breaker Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
      category: "pre-workout",
   images: [
     "/products/protein/25.png",
     "/products/protein/26.png",
     "/products/protein/27.png",
   ],
   badge: "BEST SELLER",
   featured: true,
   inStock: true,
 },
{
   id: 6,
   name: " Protein Matrix-150 Coffee  ",
   price: 3000,

    description:
     " Axe Breaker Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
      category: "pre-workout",
   images: [
     "/products/protein coffee/28.png",
     "/products/protein coffee/29.png",
     "/products/protein coffee/30.png",
   ],
   badge: "BEST SELLER",
   featured: true,
   inStock: true,
 },
{
   id: 7,
   name: " Protein Matrix-150 balgain  ",
   price: 3000,

    description:
     " Axe Breaker Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
      category: "pre-workout",
   images: [
     "/products/protein balgain/31.png",
     "/products/protein balgain/32.png",
     "/products/protein balgain/33.png",
   ],
   badge: "BEST SELLER",
   featured: true,
   inStock: true,
 },
{
   id: 8,
   name: " Protein 2kg Matrix-150 coffee  ",
   price: 5800,

    description:
     " Axe Breaker Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
      category: "pre-workout",
   images: [
     "/products/protein 2kg coffee/34.png",
     "/products/protein 2kg coffee/35.png",
     "/products/protein 2kg coffee/36.png",
   ],
   badge: "BEST SELLER",
   featured: true,
   inStock: true,
 },
{
   id: 9,
   name: " Protein 2kg Matrix-150  Mango ",
   price: 5800,

    description:
     "Axe Breaker Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
      category: "pre-workout",
   images: [
     "/products/protein 2kg/37.png",
     "/products/protein 2kg/38.png",
     "/products/protein 2kg/39.png",
   ],
   badge: "BEST SELLER",
   featured: true,
   inStock: true,
 }
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const [addingProductId, setAddingProductId] =
    useState<number | null>(null);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [quickViewOpen, setQuickViewOpen] =
    useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);
const openQuickView = (product: Product) => {
  setSelectedProduct(product);
  setQuickViewOpen(true);
};

const closeQuickView = () => {
  setQuickViewOpen(false);
  setSelectedProduct(null);
};

const handleAddFromModal = async (productId: number) => {
  try {
    setAddingProductId(productId);

    await addToCart(productId, 1);

    const product = products.find((p) => p.id === productId);

    if (product) {
      alert(`${product.name} added to cart`);
    }
  } catch (error) {
    console.error(error);
    alert("Unable to add product to cart.");
  } finally {
    setAddingProductId(null);
  }
};


  return (
    <section id="arsenal" className="relative py-24 bg-[#0a0a0a] stripe-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#e41e26]" />
            <span className="section-label">The Arsenal</span>
            <div className="w-8 h-[2px] bg-[#e41e26]" />
          </div>
          <h2 className="ghost-logo-text text-5xl md:text-6xl text-white mb-4">
            Elite <span className="text-[#e41e26]">Arsenal</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Every product is forged in the shadows, tested in the fire, and delivered
            to those who demand nothing less than dominance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <article
              key={p.id}
              className="product-card group relative bg-[#111111] border border-white/5 overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">

                {p.badge && (
                  <span className="product-badge z-20">
                    {p.badge}
                  </span>
                )}

               <div
                 onClick={() => openQuickView(p)}
                 className="cursor-pointer"
               >
                 <ProductCarousel
                   images={p.images}
                   productName={p.name}
                 />
               </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {!p.inStock && (
                  <div className="absolute inset-0 z-30 bg-black/60 flex items-center justify-center">
                    <span className="font-fire text-white tracking-widest">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>
              {/* Body */}
              <div className="p-6">
                <div className="text-[0.65rem] tracking-[0.2em] text-[#e41e26] uppercase font-display mb-2">
                  {p.category}
                </div>
                <h3 className="font-fire text-xl text-white mb-2 group-hover:text-[#e41e26] transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-white/50 mb-4 leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="ghost-logo-text text-2xl text-white">
                    ₹{Number(p.price).toLocaleString('en-IN')}
                  </span>
                 <button
                   disabled={!p.inStock || addingProductId === p.id}
                   onClick={async () => {
                     try {
                       setAddingProductId(p.id);

                       await addToCart(p.id, 1);

                       alert(`${p.name} added to cart`);
                     } catch (error) {
                       console.error(error);
                       alert("Unable to add product to cart.");
                     } finally {
                       setAddingProductId(null);
                     }
                   }}
                   className="btn-primary !py-2 !px-4 !text-xs disabled:opacity-50"
                 >
                   <ShoppingBag size={14} />

                   {addingProductId === p.id ? "Adding..." : "Add"}
                 </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a href="#distribute" className="btn-outline">
            View Full Catalog
            <ArrowRight size={16} />
          </a>
        </div>


            {/* Product Quick View */}
            <ProductQuickView
              product={selectedProduct}
              isOpen={quickViewOpen}
              onClose={closeQuickView}
              addingProductId={addingProductId}
              onAddToCart={handleAddFromModal}
            />
          </div>
          </section>
  );
}