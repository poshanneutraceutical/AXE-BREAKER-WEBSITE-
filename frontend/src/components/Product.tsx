import { useEffect, useState } from "react";
import {
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

import { type Product, type ProductFlavour } from "../lib/api";
import { useCart } from "../context/CartContext";
import ProductCarousel from "./ProductCarousel";
import ProductQuickView from "./ProductQuickView";
import { api } from "../lib/api";


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

    name: "Burn Syndicate Pre-workout + Fat burner",

    price: 2800,

    description:
      "Push beyond your limits with Axe Breaker Pre-Workout + Fat Burner. Engineered to ignite explosive energy, razor-sharp focus, and relentless endurance, this formula is built for those who refuse to quit. Train harder, move faster, and dominate every session with confidence.",

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
    id: 3,

    name: "Devils Pump Non-Stim Pre-Workout",

    price: 2600,

    description:
      "Axe Breaker Non-Stim Pre-Workout delivers clean performance without relying on stimulants. Engineered to support endurance, focus, and workout intensity, it helps you stay consistent and perform at your peak—day or night.",

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
    id: 4,

    name: "EAA + Electrolytes",

    price: 2600,

    description:
      "Axe Breaker EAA + Electrolytes is crafted to support hydration, endurance, and muscle recovery with a premium blend of essential amino acids and electrolytes. Designed for athletes and fitness enthusiasts, it helps you stay hydrated, maintain performance, and recover efficiently throughout every training session.",

    category: "eaa + electrolytes",

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

    name: "Protein Matrix-ISO",

    price: 3000,

    description:
      "Axe Breaker Protein Matrix ISO is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",

    category: "protein",

    images: [
      "/products/protein/25.png",
      "/products/protein/26.png",
      "/products/protein/27.png",
    ],



    featured: true,

    inStock: true,
  },

];


type CatalogVariant = {
  productId: number;
  productName: string;
  variantName: string;
  taste: string;
  images: string[];
};

const fullCatalogVariants: CatalogVariant[] = [

  // PRE-WORKOUT
  {
    productId: 1,
    productName: "Blood Rush Pre-Workout",
    variantName: "Neon Venom",
    taste: "Citrus Lemon",
    images: [
      "/products/pre-workout/4.png",
      "/products/pre-workout/5.png",
      "/products/pre-workout/6.png",
    ],
  },
  {
    productId: 1,
    productName: "Blood Rush Pre-Workout",
    variantName: "Midnight Fizz",
    taste: "Cola",
    images: [
      "/products/pre-workout/1.png",
      "/products/pre-workout/2.png",
      "/products/pre-workout/3.png",
    ],
  },
  {
    productId: 2,
    productName: "Burn Syndicate Pre-workout + Fat burner",
    variantName: "Frozen Ghost",
    taste: "Apple Mint",
    images: [
      "/products/Non-stim preworkout/16.png",
            "/products/Non-stim preworkout/17.png",
            "/products/Non-stim preworkout/18.png",
    ],
  },
  {
    productId: 2,
    productName: "Burn Syndicate Pre-workout + Fat burner",
    variantName: "Spirit Colada",
    taste: "Pina Colada",
    images: [
      "/products/Non-stim preworkout/13.png",
            "/products/Non-stim preworkout/14.png",
            "/products/Non-stim preworkout/15.png",
    ],
  },
  {
    productId: 3,
    productName: "Devils Pump Non-Stim Pre-Workout",
    variantName: "Toxic Fusion",
    taste: "Peach Mango",
    images: [
      "/products/Fat-burner/10.png",
            "/products/Fat-burner/11.png",
            "/products/Fat-burner/12.png",
    ],
  },
  {
    productId: 3,
    productName: "Devils Pump Non-Stim Pre-Workout",
    variantName: "Blue Venom",
    taste: "Blueberry",
    images: [
      "/products/Fat-burner/7.png",
            "/products/Fat-burner/8.png",
            "/products/Fat-burner/9.png",
    ],
  },

  // EAA + ELECTROLYTES
  {
    productId: 4,
    productName: "EAA + Electrolytes",
    variantName: "Toxic Fusion",
    taste: "Strawberry Kiwi",
    images: [
      "/products/EAA electrolyte/19.png",
      "/products/EAA electrolyte/20.png",
      "/products/EAA electrolyte/21.png",
    ],
  },
  {
    productId: 4,
    productName: "EAA + Electrolytes",
    variantName: "Spirit Colada",
    taste: "Pina Colada",
    images: [
      "/products/EAA electrolyte/22.png",
      "/products/EAA electrolyte/23.png",
      "/products/EAA electrolyte/24.png",
    ],
  },

  // PROTEIN MATRIX-ISO
  {
    productId: 5,
    productName: "Protein Matrix-ISO",
    variantName: "Mango - 1 KG",
    taste: "Mango",
    images: [
      "/products/protein/25.png",
      "/products/protein/26.png",
      "/products/protein/27.png",
    ],
  },
  {
    productId: 5,
    productName: "Protein Matrix-ISO",
    variantName: "Chocolate - 1 KG",
    taste: "Chocolate",
    images: [
      "/products/protein coffee/28.png",
      "/products/protein coffee/29.png",
      "/products/protein coffee/30.png",
    ],
  },
  {
    productId: 5,
    productName: "Protein Matrix-ISO",
    variantName: "Coffee - 1 KG",
    taste: "Coffee",
    images: [
      "/products/protein balgain/31.png",
      "/products/protein balgain/32.png",
      "/products/protein balgain/33.png",
    ],
  },
  {
    productId: 5,
    productName: "Protein Matrix-ISO",
    variantName: "Mango - 2 KG",
    taste: "Mango",
    images: [
      "/products/protein 2kg coffee/34.png",
      "/products/protein 2kg coffee/35.png",
      "/products/protein 2kg coffee/36.png",
    ],
  },
  {
    productId: 5,
    productName: "Protein Matrix-ISO",
    variantName: "Chocolate - 2 KG",
    taste: "Chocolate",
    images: [
      "/products/protein 2kg/37.png",
      "/products/protein 2kg/38.png",
      "/products/protein 2kg/39.png",
    ],
  },
  {
    productId: 5,
    productName: "Protein Matrix-ISO",
    variantName: "Coffee - 2 KG",
    taste: "Coffee",
    images: [
      "/products/protein2kgcofees/40.png",
      "/products/protein2kgcofees/41.png",
      "/products/protein2kgcofees/42.png",
    ],
  },
];

const getCatalogBackendFlavour = (
  product: Product,
  variant: CatalogVariant
): ProductFlavour | undefined => {

  if (!product.flavours) {
    return undefined;
  }

  const variantName = variant.variantName
    .toLowerCase()
    .replace(/\s*-\s*1\s*kg/g, "")
    .replace(/\s*-\s*2\s*kg/g, "")
    .trim();

  const requestedWeightMatch =
    variant.variantName
      .toLowerCase()
      .match(/\b(1|2)\s*kg\b/);

  const requestedWeight =
    requestedWeightMatch
      ? `${requestedWeightMatch[1]} kg`
      : null;

  return product.flavours.find((flavour) => {

    const flavourName =
      (flavour.flavourName || "")
        .toLowerCase()
        .trim();

    const flavourWeight =
      flavour.weight
        ?.trim()
        .toLowerCase() ?? null;

    const nameMatches =
      flavourName.includes(variantName);

    const weightMatches =
      !requestedWeight ||
      flavourWeight === requestedWeight;

    return nameMatches && weightMatches;
  });
};


export default function Products() {

  const [products, setProducts] =
    useState<Product[]>(fallbackProducts);


  const [loading, setLoading] =
    useState(true);


  const { addToCart } =
    useCart();


  const [addingProductId, setAddingProductId] =
    useState<number | null>(null);


  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);


  const [
    selectedFlavourId,
    setSelectedFlavourId
  ] = useState<number | null>(null);


  const [quickViewOpen, setQuickViewOpen] =
    useState(false);


  const [
    showPreWorkoutProducts,
    setShowPreWorkoutProducts,
  ] = useState(false);


  const [
    showFullCatalog,
    setShowFullCatalog,
  ] = useState(false);


  /*
   * ============================================================
   * LOAD PRODUCTS
   * ============================================================
   */

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const backendProducts =
          await api.getProducts();


        setProducts(
          (currentProducts) =>

            currentProducts.map(
              (frontendProduct) => {

                const backendProduct =
                  backendProducts.find(
                    (backend) =>
                      backend.id ===
                      frontendProduct.id
                  );


                if (!backendProduct) {
                  return frontendProduct;
                }


                return {
                  ...frontendProduct,

                  /*
                   * Use the real backend flavour
                   * records for all products.
                   */
                  flavours:
                    backendProduct.flavours ||
                    [],
                };

              }
            )
        );

      } catch (error) {

        console.error(
          "Unable to load product flavours:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadProducts();

  }, []);


  /*
   * ============================================================
   * OPEN QUICK VIEW
   * ============================================================
   */

  const openQuickView = (
    product: Product
  ) => {

    setSelectedProduct(product);

    setSelectedFlavourId(null);

    setQuickViewOpen(true);
  };


  const openQuickViewWithFlavour = (
    product: Product,
    flavourId?: number
  ) => {

    setSelectedProduct(product);

    setSelectedFlavourId(
      flavourId ?? null
    );

    setQuickViewOpen(true);
  };


  /*
   * ============================================================
   * CLOSE QUICK VIEW
   * ============================================================
   */

  const closeQuickView = () => {

    setQuickViewOpen(false);

    setSelectedProduct(null);
  };


  /*
   * ============================================================
   * ADD FROM QUICK VIEW
   * ============================================================
   */

  const handleAddFromModal = async (
    productId: number,
    flavourId?: number
  ) => {

    try {

      setAddingProductId(
        productId
      );


      await addToCart(
        productId,
        1,
        flavourId
      );


      const product =
        products.find(
          (p) =>
            p.id === productId
        );


      if (product) {

        alert(
          `${product.name} added to cart`
        );

      }


      closeQuickView();

    } catch (error) {

      console.error(error);

      alert(
        "Unable to add product to cart."
      );

    } finally {

      setAddingProductId(null);

    }

  };


  /*
   * ============================================================
   * DIRECT ADD
   * ============================================================
   */

  const handleAddProduct = async (
    product: Product
  ) => {

    /*
     * Products with variants should open the
     * variant selector.
     *
     * Protein Matrix-ISO:
     * id 5
     *
     * Pre-Workout:
     * ids 1, 2, 3
     */

    if (
      (
        product.id === 1 ||
        product.id === 2 ||
        product.id === 3 ||
        product.id === 4 ||
        product.id === 5
      ) &&
      product.flavours &&
      product.flavours.length > 0
    ) {

      openQuickView(product);

      return;

    }


    try {

      setAddingProductId(
        product.id
      );


      await addToCart(
        product.id,
        1
      );


      alert(
        `${product.name} added to cart`
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to add product to cart."
      );

    } finally {

      setAddingProductId(null);

    }

  };


  /*
   * ============================================================
   * PRE-WORKOUT PRODUCTS
   * ============================================================
   */

  const preWorkoutProducts =
    products.filter(
      (product) =>
        product.id === 1 ||
        product.id === 2 ||
        product.id === 3
    );


  /*
   * ============================================================
   * MAIN PRODUCTS
   * ============================================================
   */

  const mainProducts =
    products.filter(
      (product) =>
        product.id === 4 ||
        product.id === 5
    );


  return (

    <section
      id="products"
      className="
        relative
        py-24
        bg-[#0a0a0a]
        stripe-bg
        overflow-hidden
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          relative
          z-10
        "
      >

        {/* HEADER */}

        <div
          className="
            text-center
            mb-16
          "
        >

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mb-4
            "
          >

            <div
              className="
                w-8
                h-[2px]
                bg-[#e41e26]
              "
            />

            <span className="section-label">
              The Products
            </span>

            <div
              className="
                w-8
                h-[2px]
                bg-[#e41e26]
              "
            />

          </div>


          <h2
            className="
              ghost-logo-text
              text-5xl
              md:text-6xl
              text-white
              mb-4
            "
          >

            Elite{" "}

            <span
              className="text-[#e41e26]"
            >
              Products
            </span>

          </h2>


          <p
            className="
              text-white/50
              max-w-2xl
              mx-auto
            "
          >
            Every product is forged in the
            shadows, tested in the fire, and
            delivered to those who demand
            nothing less than dominance.
          </p>

        </div>


        {/* ==================================================
            FULL CATALOG
        ================================================== */}

        {showFullCatalog ? (

          <div>

            <button
              type="button"
              onClick={() =>
                setShowFullCatalog(false)
              }
              className="
                mb-8
                flex
                items-center
                gap-2
                text-white/70
                hover:text-white
                transition-colors
              "
            >

              <ChevronLeft
                size={20}
              />

              Back to Products

            </button>


            <div className="mb-10">

              <div
                className="
                  text-[0.7rem]
                  tracking-[0.2em]
                  text-[#e41e26]
                  uppercase
                  font-display
                  mb-2
                "
              >
                The Products
              </div>


              <h3
                className="
                  ghost-logo-text
                  text-4xl
                  md:text-5xl
                  text-white
                "
              >
                Full Product Catalog
              </h3>


              <p
                className="
                  text-white/50
                  mt-3
                  max-w-3xl
                "
              >
                Explore every product flavour with
                its dedicated product images and
                corresponding taste.
              </p>

            </div>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {fullCatalogVariants.map(
                (variant, index) => {

                  const product =
                    products.find(
                      (p) =>
                        p.id ===
                        variant.productId
                    );

                  const backendFlavour =
                    product
                      ? getCatalogBackendFlavour(
                          product,
                          variant
                        )
                      : undefined;

                  const price =
                    backendFlavour?.price ??
                    product?.price ??
                    0;

                  const inStock =
                    backendFlavour?.inStock ??
                    product?.inStock ??
                    false;

                  return (

                    <article
                      key={`${variant.productId}-${variant.variantName}`}
                      onClick={() =>
                        product &&
                        openQuickViewWithFlavour(
                          product,
                          backendFlavour?.id
                        )
                      }
                      className="
                        product-card
                        cursor-pointer
                        group
                        relative
                        bg-[#111111]
                        border
                        border-white/5
                        overflow-hidden
                        animate-fadeInUp
                      "
                      style={{
                        animationDelay:
                          `${(index % 3) * 0.08}s`,
                      }}
                    >

                      <div
                        className="
                          relative
                          aspect-square
                          overflow-hidden
                          bg-[#1a1a1a]
                        "
                      >

                        <ProductCarousel
                          images={variant.images}
                          productName={
                            `${variant.productName} ${variant.variantName}`
                          }
                        />

                        {variant.productId === 5 && (
                          <div
                            className="
                              absolute
                              top-5
                              left-5
                              z-30
                              bg-red-600
                              text-white
                              px-4
                              py-2
                              rounded-full
                              text-xs
                              font-bold
                              tracking-widest
                              uppercase
                              shadow-lg
                            "
                          >
                            Coming Soon
                          </div>
                        )}


                        <div
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/80
                            via-transparent
                            to-transparent
                          "
                        />


                        {!inStock && (

                          <div
                            className="
                              absolute
                              inset-0
                              z-30
                              bg-black/60
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <span
                              className="
                                font-fire
                                text-white
                                tracking-widest
                              "
                            >
                              Sold Out
                            </span>

                          </div>

                        )}

                      </div>


                      <div
                        className="p-6"
                      >

                        <div
                          className="
                            text-[0.65rem]
                            tracking-[0.2em]
                            text-[#e41e26]
                            uppercase
                            font-display
                            mb-2
                          "
                        >
                          {product?.category ??
                            "Product"}
                        </div>


                        <h3
                          className="
                            font-fire
                            text-xl
                            text-white
                            mb-2
                            group-hover:text-[#e41e26]
                            transition-colors
                          "
                        >
                          {variant.productName}
                        </h3>


                        <div
                          className="
                            text-white
                            font-semibold
                            mb-1
                          "
                        >
                          {variant.variantName}
                        </div>


                        <div
                          className="
                            text-[#e41e26]
                            text-sm
                            font-semibold
                            mb-4
                          "
                        >
                          {variant.taste}
                        </div>


                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-4
                          "
                        >

                          <span
                            className="
                              ghost-logo-text
                              text-2xl
                              text-white
                            "
                          >
                            ₹
                            {Number(
                              price
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </span>


                          <button
                            type="button"
                            disabled={
                              !inStock ||
                              addingProductId ===
                                variant.productId
                            }
                            onClick={(event) => {

                              event.stopPropagation();

                              if (
                                product &&
                                backendFlavour
                              ) {

                                handleAddFromModal(
                                  variant.productId,
                                  backendFlavour.id
                                );

                                return;
                              }

                              if (product) {
                                openQuickView(
                                  product
                                );
                              }

                            }}
                            className="
                              btn-primary
                              !py-2
                              !px-4
                              !text-xs
                              disabled:opacity-50
                            "
                          >

                            <ShoppingBag
                              size={14}
                            />

                            {addingProductId ===
                            variant.productId
                              ? "Adding..."
                              : "Add"}

                          </button>

                        </div>

                      </div>

                    </article>

                  );

                }
              )}

            </div>

          </div>

        ) : showPreWorkoutProducts ? (

          <div>

            <button
              type="button"
              onClick={() =>
                setShowPreWorkoutProducts(
                  false
                )
              }
              className="
                mb-8
                flex
                items-center
                gap-2
                text-white/70
                hover:text-white
                transition-colors
              "
            >

              <ChevronLeft
                size={20}
              />

              Back to Products

            </button>


            <div className="mb-10">

              <div
                className="
                  text-[0.7rem]
                  tracking-[0.2em]
                  text-[#e41e26]
                  uppercase
                  font-display
                  mb-2
                "
              >
                The Products
              </div>


              <h3
                className="
                  ghost-logo-text
                  text-4xl
                  md:text-5xl
                  text-white
                "
              >
                Pre-Workout
              </h3>


              <p
                className="
                  text-white/50
                  mt-3
                  max-w-2xl
                "
              >
                Choose your weapon. Every
                formula is engineered for
                maximum training performance.
              </p>

            </div>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {preWorkoutProducts.map(
                (p, i) => (

                  <article
                    key={p.id}
                    onClick={() =>
                      openQuickView(p)
                    }
                    className="
                      product-card
                      group
                      cursor-pointer
                      relative
                      bg-[#111111]
                      border
                      border-white/5
                      overflow-hidden
                      animate-fadeInUp
                    "
                    style={{
                      animationDelay:
                        `${i * 0.08}s`,
                    }}
                  >

                    <div
                      className="
                        relative
                        aspect-square
                        overflow-hidden
                        bg-[#1a1a1a]
                      "
                    >

                      {p.badge && (

                        <span
                          className="
                            product-badge
                            z-20
                          "
                        >
                          {p.badge}
                        </span>

                      )}


                      <div
                        onClick={() =>
                          openQuickView(p)
                        }
                        className="cursor-pointer"
                      >

                        <ProductCarousel
                          images={p.images}
                          productName={p.name}
                        />

                      </div>


                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/80
                          via-transparent
                          to-transparent
                        "
                      />


                      {!p.inStock && (

                        <div
                          className="
                            absolute
                            inset-0
                            z-30
                            bg-black/60
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <span
                            className="
                              font-fire
                              text-white
                              tracking-widest
                            "
                          >
                            Sold Out
                          </span>

                        </div>

                      )}

                    </div>


                    <div
                      className="p-6"
                    >

                      <div
                        className="
                          text-[0.65rem]
                          tracking-[0.2em]
                          text-[#e41e26]
                          uppercase
                          font-display
                          mb-2
                        "
                      >
                        Pre-Workout
                      </div>


                      <h3
                        className="
                          font-fire
                          text-xl
                          text-white
                          mb-2
                          group-hover:text-[#e41e26]
                          transition-colors
                        "
                      >
                        {p.name}
                      </h3>


                      {/* NUMBER OF FLAVOURS */}

                      <div
                        className="
                          text-[#e41e26]
                          text-xs
                          font-semibold
                          tracking-wide
                          mb-3
                        "
                      >
                        2 Flavours
                      </div>


                      <p
                        className="
                          text-sm
                          text-white/50
                          mb-4
                          leading-relaxed
                          line-clamp-3
                        "
                      >
                        {p.description}
                      </p>


                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >

                        <span
                          className="
                            ghost-logo-text
                            text-2xl
                            text-white
                          "
                        >
                          ₹
                          {Number(
                            p.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>


                        <button
                          disabled={
                            !p.inStock ||
                            addingProductId ===
                              p.id
                          }
                          onClick={(event) => {
                            event.stopPropagation();

                            handleAddProduct(
                              p
                            );
                          }}
                          className="
                            btn-primary
                            !py-2
                            !px-4
                            !text-xs
                            disabled:opacity-50
                          "
                        >

                          <ShoppingBag
                            size={14}
                          />

                          {addingProductId ===
                          p.id
                            ? "Adding..."
                            : "Add"}

                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          </div>

        ) : (

          /* ==================================================
             MAIN ARSENAL
          ================================================== */

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >

            {/* PRE-WORKOUT */}

            <article
              className="
                product-card
                group
                relative
                bg-[#111111]
                border
                border-white/5
                overflow-hidden
                animate-fadeInUp
                cursor-pointer
              "
              onClick={() =>
                setShowPreWorkoutProducts(
                  true
                )
              }
            >

              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  bg-[#1a1a1a]
                "
              >

                <span
                  className="
                    product-badge
                    z-20
                  "
                >
                  BEST SELLER
                </span>


                <ProductCarousel
                  images={[
                    "/products/pre-workout/1.png",
                    "/products/pre-workout/2.png",
                    "/products/pre-workout/3.png",
                    "/products/pre-workout/4.png",
                    "/products/pre-workout/5.png",
                    "/products/pre-workout/6.png",
                  ]}
                  productName="Pre-Workout"
                />


                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-transparent
                    to-transparent
                  "
                />

              </div>


              <div
                className="p-6"
              >

                <div
                  className="
                    text-[0.65rem]
                    tracking-[0.2em]
                    text-[#e41e26]
                    uppercase
                    font-display
                    mb-2
                  "
                >
                  Performance
                </div>


                <h3
                  className="
                    font-fire
                    text-2xl
                    text-white
                    mb-2
                    group-hover:text-[#e41e26]
                    transition-colors
                  "
                >
                  Pre-Workout
                </h3>


                <div
                  className="
                    text-[#e41e26]
                    text-xs
                    font-semibold
                    tracking-wide
                    mb-3
                  "
                >
                  3 Products
                </div>


                <p
                  className="
                    text-sm
                    text-white/50
                    mb-5
                    leading-relaxed
                  "
                >
                  Choose from our collection
                  of high-performance pre-workout
                  formulas engineered for energy,
                  focus, endurance and intensity.
                </p>


                <div
                  className="
                    flex
                    items-center
                    justify-end
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      gap-2
                      text-[#e41e26]
                      font-semibold
                      text-sm
                      group-hover:gap-3
                      transition-all
                    "
                  >
                    View Products

                    <ArrowRight
                      size={16}
                    />

                  </span>

                </div>

              </div>

            </article>


            {/* EAA */}

            {mainProducts
              .filter(
                (p) =>
                  p.id === 4
              )
              .map(
                (p, i) => (

                  <article
                    key={p.id}
                    onClick={() =>
                      openQuickView(p)
                    }
                    className="
                      product-card
                      group
                      cursor-pointer
                      relative
                      bg-[#111111]
                      border
                      border-white/5
                      overflow-hidden
                      animate-fadeInUp
                    "
                    style={{
                      animationDelay:
                        `${(i + 1) * 0.08}s`,
                    }}
                  >

                    <div
                      className="
                        relative
                        aspect-square
                        overflow-hidden
                        bg-[#1a1a1a]
                      "
                    >

                      {p.badge && (

                        <span
                          className="
                            product-badge
                            z-20
                          "
                        >
                          {p.badge}
                        </span>

                      )}


                      <div
                        onClick={() =>
                          openQuickView(p)
                        }
                        className="cursor-pointer"
                      >

                        <ProductCarousel
                          images={p.images}
                          productName={p.name}
                        />

                      </div>


                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/80
                          via-transparent
                          to-transparent
                        "
                      />


                      {!p.inStock && (

                        <div
                          className="
                            absolute
                            inset-0
                            z-30
                            bg-black/60
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <span
                            className="
                              font-fire
                              text-white
                              tracking-widest
                            "
                          >
                            Sold Out
                          </span>

                        </div>

                      )}

                    </div>


                    <div
                      className="p-6"
                    >

                      <div
                        className="
                          text-[0.65rem]
                          tracking-[0.2em]
                          text-[#e41e26]
                          uppercase
                          font-display
                          mb-2
                        "
                      >
                        {p.category}
                      </div>


                      <h3
                        className="
                          font-fire
                          text-xl
                          text-white
                          mb-2
                          group-hover:text-[#e41e26]
                          transition-colors
                        "
                      >
                        {p.name}
                      </h3>


                      {p.id === 4 && (
                        <div
                          className="
                            text-[#e41e26]
                            text-xs
                            font-semibold
                            tracking-wide
                            mb-3
                          "
                        >
                          2 Flavours
                        </div>
                      )}


                      <p
                        className="
                          text-sm
                          text-white/50
                          mb-4
                          leading-relaxed
                          line-clamp-2
                        "
                      >
                        {p.description}
                      </p>


                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            ghost-logo-text
                            text-2xl
                            text-white
                          "
                        >
                          ₹
                          {Number(
                            p.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>


                        <button
                          disabled={
                            !p.inStock ||
                            addingProductId ===
                              p.id
                          }
                          onClick={(event) => {
                            event.stopPropagation();

                            handleAddProduct(
                              p
                            );
                          }}
                          className="
                            btn-primary
                            !py-2
                            !px-4
                            !text-xs
                            disabled:opacity-50
                          "
                        >

                          <ShoppingBag
                            size={14}
                          />

                          {addingProductId ===
                          p.id
                            ? "Adding..."
                            : "Add"}

                        </button>

                      </div>

                    </div>

                  </article>

                )
              )
            }


            {/* ==================================================
                PROTEIN MATRIX-ISO
            ================================================== */}

            {mainProducts
              .filter(
                (p) =>
                  p.id === 5
              )
              .map(
                (p, i) => (

                  <article
                    key={p.id}
                    onClick={() =>
                      openQuickView(p)
                    }
                    className="
                      product-card
                      group
                      relative
                      bg-[#111111]
                      border
                      border-white/5
                      overflow-hidden
                      animate-fadeInUp
                      cursor-pointer
                    "
                    style={{
                      animationDelay:
                        `${(i + 2) * 0.08}s`,
                    }}
                  >

                    <div
                      className="
                        relative
                        aspect-square
                        overflow-hidden
                        bg-[#1a1a1a]
                      "
                    >

                      {p.badge && (

                        <span
                          className="
                            product-badge
                            z-20
                          "
                        >
                          {p.badge}
                        </span>

                      )}


                      <ProductCarousel
                        images={p.images}
                        productName={p.name}
                      />

                      <div
                        className="
                          absolute
                          top-5
                          left-5
                          z-30
                          bg-red-600
                          text-white
                          px-4
                          py-2
                          rounded-full
                          text-xs
                          font-bold
                          tracking-widest
                          uppercase
                          shadow-lg
                        "
                      >
                        Coming Soon
                      </div>


                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/80
                          via-transparent
                          to-transparent
                        "
                      />


                      {!p.inStock && (

                        <div
                          className="
                            absolute
                            inset-0
                            z-30
                            bg-black/60
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <span
                            className="
                              font-fire
                              text-white
                              tracking-widest
                            "
                          >
                            Sold Out
                          </span>

                        </div>

                      )}

                    </div>


                    <div
                      className="p-6"
                    >

                      <div
                        className="
                          text-[0.65rem]
                          tracking-[0.2em]
                          text-[#e41e26]
                          uppercase
                          font-display
                          mb-2
                        "
                      >
                        Protein
                      </div>


                      <h3
                        className="
                          font-fire
                          text-xl
                          text-white
                          mb-2
                          group-hover:text-[#e41e26]
                          transition-colors
                        "
                      >
                        {p.name}
                      </h3>


                      <div
                        className="
                          text-[#e41e26]
                          text-xs
                          font-semibold
                          tracking-wide
                          mb-3
                        "
                      >
                        3 Flavours
                      </div>


                      <p
                        className="
                          text-sm
                          text-white/50
                          mb-4
                          leading-relaxed
                          line-clamp-2
                        "
                      >
                        {p.description}
                      </p>


                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            ghost-logo-text
                            text-2xl
                            text-white
                          "
                        >
                          ₹
                          {Number(
                            p.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>


                        <button
                          disabled={
                            !p.inStock ||
                            addingProductId ===
                              p.id
                          }
                          onClick={(e) => {

                            e.stopPropagation();


                            if (
                              p.flavours &&
                              p.flavours.length > 0
                            ) {

                              openQuickView(
                                p
                              );

                              return;

                            }


                            handleAddProduct(
                              p
                            );

                          }}
                          className="
                            btn-primary
                            !py-2
                            !px-4
                            !text-xs
                            disabled:opacity-50
                          "
                        >

                          <ShoppingBag
                            size={14}
                          />

                          {addingProductId ===
                          p.id
                            ? "Adding..."
                            : "Add"}

                        </button>

                      </div>

                    </div>

                  </article>

                )
              )
            }

          </div>

        )}


        {/* CTA */}

        {!showPreWorkoutProducts &&
          !showFullCatalog && (

          <div
            className="
              text-center
              mt-14
            "
          >

            <button
              type="button"
              onClick={() =>
                setShowFullCatalog(true)
              }
              className="btn-outline"
            >
              View Full Catalog

              <ArrowRight
                size={16}
              />

            </button>

          </div>

        )}


        {/* QUICK VIEW */}

        <ProductQuickView
          product={selectedProduct}
          initialFlavourId={
            selectedFlavourId ?? undefined
          }
          isOpen={quickViewOpen}
          onClose={closeQuickView}
          addingProductId={
            addingProductId
          }
          onAddToCart={
            handleAddFromModal
          }
        />

      </div>

    </section>

  );

}
