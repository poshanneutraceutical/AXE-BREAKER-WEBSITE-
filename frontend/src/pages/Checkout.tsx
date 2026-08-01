import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderService } from "../services/orderService";
import { getCustomerId } from "../utils/customer";
import { useEffect } from "react";
const CUSTOMER_ID = getCustomerId();

export default function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart(); // ✅ added clearCart

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

  // ⚠️ safer navigation (avoid render-time navigate crash)
  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // ✅ IMPORTANT: clear cart after successful order
      clearCart();

      // optional: if cart is stored in localStorage also clear it
      localStorage.removeItem("cart");

      navigate("/order-success", {
        state: { order }, // ✅ FIXED structure
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
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-bold mb-10">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="space-y-5">
            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4"
              placeholder="Full Name"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4"
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4"
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4"
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4"
              placeholder="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4"
              placeholder="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          {/* RIGHT */}
          <div className="bg-[#111] rounded-xl border border-white/10 p-6">
            <h2 className="text-3xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-5">
              {cart.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between"
                >
                  <div>
                    <p>{item.productName}</p>
                    <small className="text-white/50">
                      Qty : {item.quantity}
                    </small>
                  </div>

                  <p>
                    ₹{item.subtotal.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-6 border-white/10" />

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>
                ₹{cart.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              disabled={loading}
              onClick={placeOrder}
              className="btn-primary w-full mt-8 justify-center"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}