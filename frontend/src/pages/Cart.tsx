import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const getProductImage = (productId: number) => {
  const images: Record<number, string> = {
    1: "/products/pre-workout/1.png",
    2: "/products/Fat-burner/7.png",
    3: "/products/Non-stim preworkout/13.png",
    4: "/products/EAA electrolyte/19.png",
    5: "/products/protein/25.png",
    6: "/products/protein coffee/28.png",
    7: "/products/protein balgain/31.png",
    8: "/products/protein 2kg coffee/34.png",
    9: "/products/protein 2kg/37.png",
  };

  return images[productId] || "/products/default.png";
};

export default function Cart() {
  const {
    cart,
    loading,
    updateQuantity,
    removeItem,
  } = useCart();

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl px-4 text-center">
        Loading Cart...
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 text-center">
        <h1 className="text-4xl max-md:text-3xl font-bold mb-4">
          Your Cart is Empty
        </h1>

        <p className="text-white/60 mb-8">
          Add some X Axe Breaker products.
        </p>

        <button
          onClick={() => navigate("/")}
          className="btn-primary flex items-center gap-2 justify-center"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <div
        className="
          max-w-7xl
          mx-auto
          pt-32
          pb-16
          px-6
          max-md:px-4
          w-full
        "
      >

        <h1
          className="
            text-5xl
            max-md:text-4xl
            max-sm:text-3xl
            font-bold
            mb-12
            max-md:mb-8
          "
        >
          Shopping Cart
        </h1>

        <div
          className="
            grid
            lg:grid-cols-3
            gap-10
            max-lg:gap-8
            items-start
          "
        >

          {/* =========================
              CART ITEMS
          ========================== */}
          <div
            className="
              lg:col-span-2
              space-y-6
              min-w-0
              w-full
            "
          >

            {cart.items.map((item) => (

              <div
                key={item.productId}
                className="
                  bg-[#111111]
                  border
                  border-white/10
                  rounded-xl
                  p-5
                  max-md:p-4
                  flex
                  gap-5
                  max-md:gap-4
                  max-md:flex-col
                  w-full
                  min-w-0
                "
              >

                {/* =========================
                    PRODUCT IMAGE
                ========================== */}
                <div
                  className="
                    shrink-0
                    max-md:w-full
                    flex
                    justify-center
                  "
                >
                  <img
                    src={getProductImage(item.productId)}
                    alt={item.productName}
                    className="
                      w-28
                      h-28
                      max-md:w-32
                      max-md:h-32
                      rounded-lg
                      object-cover
                    "
                  />
                </div>

                {/* =========================
                    PRODUCT DETAILS
                ========================== */}
                <div
                  className="
                    flex-1
                    min-w-0
                    w-full
                  "
                >

                  <h2
                    className="
                      text-2xl
                      max-md:text-xl
                      font-semibold
                      mb-2
                      break-words
                    "
                  >
                    {item.productName}
                  </h2>

                  {item.flavourName && (
                    <p
                      className="
                        text-white/60
                        text-base
                        max-md:text-sm
                        mb-2
                        break-words
                      "
                    >
                      Flavour: {item.flavourName}
                    </p>
                  )}

                  <p
                    className="
                      text-red-500
                      text-xl
                      max-md:text-lg
                      mb-4
                    "
                  >
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  {/* =========================
                      ACTION ROW
                  ========================== */}
                  <div
                    className="
                      flex
                      items-center
                      gap-4
                      max-sm:gap-3
                      flex-wrap
                    "
                  >

                    {/* DECREASE */}
                    <button
                      className="
                        bg-[#1b1b1b]
                        p-2
                        rounded
                        shrink-0
                        flex
                        items-center
                        justify-center
                      "
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(
                            item.productId,
                            item.quantity - 1
                          );
                        }
                      }}
                      type="button"
                    >
                      <Minus size={18} />
                    </button>

                    {/* QUANTITY */}
                    <span
                      className="
                        text-xl
                        min-w-[24px]
                        text-center
                      "
                    >
                      {item.quantity}
                    </span>

                    {/* INCREASE */}
                    <button
                      className="
                        bg-[#1b1b1b]
                        p-2
                        rounded
                        shrink-0
                        flex
                        items-center
                        justify-center
                      "
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1
                        )
                      }
                      type="button"
                    >
                      <Plus size={18} />
                    </button>

                    {/* REMOVE */}
                    <button
                      className="
                        ml-auto
                        max-sm:ml-2
                        text-red-500
                        hover:text-red-600
                        p-2
                        shrink-0
                        flex
                        items-center
                        justify-center
                      "
                      onClick={() =>
                        removeItem(item.productId)
                      }
                      type="button"
                      aria-label={`Remove ${item.productName}`}
                    >
                      <Trash2 size={22} />
                    </button>

                  </div>

                </div>

                {/* =========================
                    SUBTOTAL
                ========================== */}
                <div
                  className="
                    text-right
                    shrink-0
                    max-md:text-left
                    max-md:border-t
                    max-md:border-white/10
                    max-md:pt-4
                    max-md:w-full
                  "
                >
                  <p
                    className="
                      text-2xl
                      max-md:text-xl
                      font-bold
                    "
                  >
                    ₹{item.subtotal.toLocaleString("en-IN")}
                  </p>
                </div>

              </div>

            ))}

          </div>

          {/* =========================
              ORDER SUMMARY
          ========================== */}
          <div
            className="
              bg-[#111111]
              border
              border-white/10
              rounded-xl
              p-6
              max-md:p-5
              h-fit
              lg:sticky
              lg:top-24
              w-full
              min-w-0
            "
          >

            <h2
              className="
                text-3xl
                max-md:text-2xl
                font-bold
                mb-6
              "
            >
              Order Summary
            </h2>

            <div className="flex justify-between mb-4 gap-4">
              <span>Items</span>
              <span className="shrink-0">
                {cart.items.length}
              </span>
            </div>

            <div
              className="
                flex
                justify-between
                gap-4
                text-2xl
                max-md:text-xl
                font-bold
                border-t
                border-white/10
                pt-5
              "
            >
              <span>Total</span>

              <span className="shrink-0 text-right">
                ₹{cart.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="
                btn-primary
                w-full
                mt-8
                justify-center
                text-center
              "
              type="button"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/")}
              className="
                btn-outline
                w-full
                mt-4
                justify-center
                text-center
              "
              type="button"
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}