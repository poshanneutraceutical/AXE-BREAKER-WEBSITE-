import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartIcon() {

    const { cartCount } = useCart();

    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/cart")}
            className="relative p-2 hover:text-orange-500 transition"
        >
            <ShoppingCart size={28} />

            {cartCount > 0 && (
                <span
                    className="
                        absolute
                        -top-2
                        -right-2
                        bg-red-500
                        text-white
                        rounded-full
                        w-5
                        h-5
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-bold
                    "
                >
                    {cartCount}
                </span>
            )}
        </button>
    );
}