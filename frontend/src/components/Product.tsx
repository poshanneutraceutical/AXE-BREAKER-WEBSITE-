import { useEffect, useState } from "react";
import {
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

import { type Product } from "../lib/api";
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

    name: "Devils Pump Non-Stim Pre-Workout",

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

    badge: "BEST SELLER",

    featured: true,

    inStock: true,
  },
];


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


  const [quickViewOpen, setQuickViewOpen] =
    useState(false);


  const [
    showPreWorkoutProducts,
    setShowPreWorkoutProducts,
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
   *
   * IMPORTANT:
   *
   * flavourId is now passed to CartContext.
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


      /*
       * Close the Quick View after successful add.
       */
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
     * Protein Matrix-ISO has variants.
     *
     * Therefore clicking Add should open
     * the variant selector instead of adding
     * the old parent price.
     */
    if (
      product.id === 5 &&
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
      id="arsenal"
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
              The Arsenal
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
              Arsenal
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
            PRE-WORKOUT PRODUCTS
        ================================================== */}

        {showPreWorkoutProducts ? (

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

              Back to Arsenal

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

                The Arsenal

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
                    className="
                      product-card
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
                          onClick={() =>
                            handleAddProduct(
                              p
                            )
                          }
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
                    justify-between
                  "
                >

                  <span
                    className="
                      text-white/60
                      text-sm
                    "
                  >

                    3 Products

                  </span>


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
                    className="
                      product-card
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
                          onClick={() =>
                            handleAddProduct(
                              p
                            )
                          }
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

                            /*
                             * Prevent the card click.
                             */

                            e.stopPropagation();


                            /*
                             * Since Protein Matrix-ISO
                             * has variants, open the
                             * selector instead of adding
                             * the old parent price.
                             */

                            if (
                              p.flavours &&
                              p.flavours.length > 0
                            ) {

                              openQuickView(p);

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

        {!showPreWorkoutProducts && (

          <div
            className="
              text-center
              mt-14
            "
          >

            <a
              href="#distribute"
              className="btn-outline"
            >

              View Full Catalog

              <ArrowRight
                size={16}
              />

            </a>

          </div>

        )}


        {/* QUICK VIEW */}

        <ProductQuickView

          product={selectedProduct}

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