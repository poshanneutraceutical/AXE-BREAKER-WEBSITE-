import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderService } from "../services/orderService";
import { getCustomerId } from "../utils/customer";

const CUSTOMER_ID = getCustomerId();

export default function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Redirect to cart when there are no items.
  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    try {
      setLoading(true);

      const order = await orderService.checkout({
        customerId: CUSTOMER_ID,
        ...form,
      });

      // Clear cart after successful order.
      clearCart();

      // Clear localStorage cart as well.
      localStorage.removeItem("cart");

      navigate("/order-success", {
        state: { order },
      });
    } catch (error) {
      console.error(error);
      alert("Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <div
        className="
          max-w-7xl
          mx-auto
          py-16
          max-md:py-28
          px-6
          max-md:px-4
          w-full
          min-w-0
        "
      >

        {/* =========================
            PAGE TITLE
        ========================== */}
        <h1
          className="
            text-5xl
            max-md:text-4xl
            max-sm:text-3xl
            font-bold
            mb-10
            max-md:mb-8
          "
        >
          Checkout
        </h1>

        <div
          className="
            grid
            lg:grid-cols-2
            gap-12
            max-md:gap-8
            w-full
            min-w-0
            items-start
          "
        >

          {/* =========================
              LEFT - CUSTOMER DETAILS
          ========================== */}
          <div className="space-y-5 w-full min-w-0">

            <input
              className="
                w-full
                min-w-0
                bg-[#111]
                border
                border-white/10
                rounded-lg
                p-4
                text-white
                outline-none
                focus:border-red-500
              "
              placeholder="Full Name"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
            />

            <input
              className="
                w-full
                min-w-0
                bg-[#111]
                border
                border-white/10
                rounded-lg
                p-4
                text-white
                outline-none
                focus:border-red-500
              "
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              className="
                w-full
                min-w-0
                bg-[#111]
                border
                border-white/10
                rounded-lg
                p-4
                text-white
                outline-none
                focus:border-red-500
              "
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              className="
                w-full
                min-w-0
                bg-[#111]
                border
                border-white/10
                rounded-lg
                p-4
                text-white
                outline-none
                focus:border-red-500
              "
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <input
              className="
                w-full
                min-w-0
                bg-[#111]
                border
                border-white/10
                rounded-lg
                p-4
                text-white
                outline-none
                focus:border-red-500
              "
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />

            <input
              className="
                w-full
                min-w-0
                bg-[#111]
                border
                border-white/10
                rounded-lg
                p-4
                text-white
                outline-none
                focus:border-red-500
              "
              placeholder="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />

            <input
              className="
                w-full
                min-w-0
                bg-[#111]
                border
                border-white/10
                rounded-lg
                p-4
                text-white
                outline-none
                focus:border-red-500
              "
              placeholder="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />

          </div>

          {/* =========================
              RIGHT - ORDER SUMMARY
          ========================== */}
          <div
            className="
              bg-[#111]
              rounded-xl
              border
              border-white/10
              p-6
              max-md:p-5
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

            <div className="space-y-5 w-full min-w-0">

              {cart.items.map((item) => (

                <div
                  key={item.productId}
                  className="
                    flex
                    justify-between
                    gap-4
                    items-start
                    min-w-0
                    w-full
                  "
                >

                  {/* ITEM DETAILS */}
                  <div className="min-w-0 flex-1">

                    <p className="break-words">
                      {item.productName}
                    </p>

                    {item.flavourName && (
                      <p
                        className="
                          text-white/50
                          text-sm
                          mt-1
                          break-words
                        "
                      >
                        Flavour: {item.flavourName}
                      </p>
                    )}

                    {item.weight && (
                      <p
                        className="
                          text-white/40
                          text-sm
                          mt-1
                        "
                      >
                        Weight: {item.weight}
                      </p>
                    )}

                    <small className="text-white/50">
                      Qty : {item.quantity}
                    </small>

                  </div>

                  {/* ITEM PRICE */}
                  <p
                    className="
                      shrink-0
                      text-right
                      whitespace-nowrap
                    "
                  >
                    ₹{item.subtotal.toLocaleString("en-IN")}
                  </p>

                </div>

              ))}

            </div>

            <hr className="my-6 border-white/10" />

            {/* TOTAL */}
            <div
              className="
                flex
                justify-between
                gap-4
                text-2xl
                max-md:text-xl
                font-bold
              "
            >
              <span>Total</span>

              <span className="shrink-0 text-right">
                ₹{cart.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            {/* PLACE ORDER */}
            <button
              disabled={loading}
              onClick={placeOrder}
              className="
                btn-primary
                w-full
                mt-8
                justify-center
                text-center
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}