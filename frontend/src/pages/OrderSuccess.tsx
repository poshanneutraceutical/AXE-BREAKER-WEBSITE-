import { CheckCircle, ShoppingBag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccess() {

  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order; // ✅ FIXED

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-2xl w-full bg-[#111111] rounded-2xl border border-white/10 p-10 text-center">

        <CheckCircle className="mx-auto text-green-500 mb-6" size={90} />

        <h1 className="text-5xl font-bold mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-white/60 mb-8">
          Thank you for shopping with X Axe Breaker.
          Your order has been received successfully.
        </p>

        {order && (
          <div className="bg-[#1a1a1a] rounded-xl p-6 text-left mb-8">

            <h2 className="text-2xl font-bold mb-5">
              Order Details
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Order ID</span>
                <span>#{order.id}</span>
              </div>

              <div className="flex justify-between">
                <span>Customer</span>
                <span>{order.customerName}</span>
              </div>

              <div className="flex justify-between">
                <span>Email</span>
                <span>{order.email}</span>
              </div>

              <div className="flex justify-between">
                <span>Total</span>
                <span>₹{Number(order.totalAmount).toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment Status</span>
                <span className="text-yellow-400">{order.paymentStatus}</span>
              </div>

              <div className="flex justify-between">
                <span>Order Status</span>
                <span className="text-green-500">{order.orderStatus}</span>
              </div>

            </div>

          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="btn-primary flex items-center justify-center gap-2 mx-auto"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </button>

      </div>
    </div>
  );
}