import { CheckCircle, ShoppingBag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-8
        w-full
        min-w-0
      "
    >

      <div
        className="
          max-w-2xl
          w-full
          min-w-0
          bg-[#111111]
          rounded-2xl
          border
          border-white/10
          p-6
          sm:p-10
          text-center
        "
      >

        {/* SUCCESS ICON */}
        <CheckCircle
          className="
            mx-auto
            text-green-500
            mb-6
          "
          size={72}
        />

        {/* TITLE */}
        <h1
          className="
            text-5xl
            max-md:text-4xl
            max-sm:text-3xl
            font-bold
            mb-4
            break-words
          "
        >
          Order Placed Successfully!
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            text-white/60
            mb-8
            break-words
          "
        >
          Thank you for shopping with X Axe Breaker.
          Your order has been received successfully.
        </p>

        {order && (
          <div
            className="
              bg-[#1a1a1a]
              rounded-xl
              p-5
              sm:p-6
              text-left
              mb-8
              w-full
              min-w-0
            "
          >

            <h2
              className="
                text-2xl
                max-sm:text-xl
                font-bold
                mb-5
              "
            >
              Order Details
            </h2>

            <div className="space-y-3 w-full min-w-0">

              {/* ORDER ID */}
              <div
                className="
                  flex
                  justify-between
                  gap-4
                  items-start
                  w-full
                  min-w-0
                "
              >
                <span className="shrink-0">
                  Order ID
                </span>

                <span
                  className="
                    text-right
                    break-words
                    min-w-0
                  "
                >
                  #{order.id}
                </span>
              </div>

              {/* CUSTOMER */}
              <div
                className="
                  flex
                  justify-between
                  gap-4
                  items-start
                  w-full
                  min-w-0
                "
              >
                <span className="shrink-0">
                  Customer
                </span>

                <span
                  className="
                    text-right
                    break-words
                    min-w-0
                  "
                >
                  {order.customerName}
                </span>
              </div>

              {/* EMAIL */}
              <div
                className="
                  flex
                  justify-between
                  gap-4
                  items-start
                  w-full
                  min-w-0
                "
              >
                <span className="shrink-0">
                  Email
                </span>

                <span
                  className="
                    text-right
                    break-all
                    min-w-0
                  "
                >
                  {order.email}
                </span>
              </div>

              {/* TOTAL */}
              <div
                className="
                  flex
                  justify-between
                  gap-4
                  items-start
                  w-full
                  min-w-0
                "
              >
                <span className="shrink-0">
                  Total
                </span>

                <span
                  className="
                    text-right
                    whitespace-nowrap
                    shrink-0
                  "
                >
                  ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                </span>
              </div>

              {/* PAYMENT STATUS */}
              <div
                className="
                  flex
                  justify-between
                  gap-4
                  items-start
                  w-full
                  min-w-0
                "
              >
                <span className="shrink-0">
                  Payment Status
                </span>

                <span
                  className="
                    text-yellow-400
                    text-right
                    break-words
                    min-w-0
                  "
                >
                  {order.paymentStatus}
                </span>
              </div>

              {/* ORDER STATUS */}
              <div
                className="
                  flex
                  justify-between
                  gap-4
                  items-start
                  w-full
                  min-w-0
                "
              >
                <span className="shrink-0">
                  Order Status
                </span>

                <span
                  className="
                    text-green-500
                    text-right
                    break-words
                    min-w-0
                  "
                >
                  {order.orderStatus}
                </span>
              </div>

            </div>

          </div>
        )}

        {/* CONTINUE SHOPPING */}
        <button
          onClick={() => navigate("/")}
          className="
            btn-primary
            flex
            items-center
            justify-center
            gap-2
            mx-auto
            max-w-full
          "
          type="button"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </button>

      </div>
    </div>
  );
}