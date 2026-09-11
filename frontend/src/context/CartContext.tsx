import { getCustomerId } from "../utils/customer";

import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    cartService,
    Cart,
    CartItem
} from "../services/cartService";


interface CartContextType {

    cart: Cart | null;

    loading: boolean;

    addToCart: (
        productId: number,
        quantity?: number,
        flavourId?: number
    ) => Promise<void>;

    removeItem: (
        productId: number,
        flavourId?: number
    ) => Promise<void>;

    updateQuantity: (
        productId: number,
        quantity: number,
        flavourId?: number
    ) => Promise<void>;

    refreshCart: () => Promise<void>;

    cartCount: number;

    clearCart: () => Promise<void>;
}


const CartContext =
    createContext<CartContextType | undefined>(
        undefined
    );


const CUSTOMER_ID =
    getCustomerId();


export const CartProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {


    const [cart, setCart] =
        useState<Cart | null>(null);


    const [loading, setLoading] =
        useState(false);


    // ============================================================
    // Load Cart
    // ============================================================
    const refreshCart = async () => {

        try {

            setLoading(true);


            const data =
                await cartService.getCart(
                    CUSTOMER_ID
                );


            setCart(data);


        } catch (error) {

            console.error(
                "Failed to load cart:",
                error
            );


            setCart(null);


        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        refreshCart();

    }, []);


    // ============================================================
    // Add Product
    // ============================================================
    const addToCart = async (
        productId: number,
        quantity: number = 1,
        flavourId?: number
    ) => {


        setLoading(true);


        try {


            const data =
                await cartService.addToCart({

                    customerId:
                        CUSTOMER_ID,

                    productId,

                    /*
                     * Send the real selected
                     * ProductFlavour ID.
                     */
                    flavourId:
                        flavourId !== undefined
                            ? flavourId
                            : null,

                    quantity,

                });


            setCart(data);


        } finally {


            setLoading(false);

        }

    };


    // ============================================================
    // Remove Product
    // ============================================================
    const removeItem = async (
        productId: number,
        flavourId?: number
    ) => {


        setLoading(true);


        try {


            const data =
                await cartService.removeItem(
                    CUSTOMER_ID,
                    productId,
                    flavourId
                );


            setCart(data);


        } finally {


            setLoading(false);

        }

    };


    // ============================================================
    // Update Quantity
    // ============================================================
    const updateQuantity = async (
        productId: number,
        quantity: number,
        flavourId?: number
    ) => {


        /*
         * Quantity 0 means remove this item.
         */
        if (quantity <= 0) {

            await removeItem(
                productId,
                flavourId
            );

            return;

        }


        setLoading(true);


        try {


            const data =
                await cartService.updateQuantity(
                    CUSTOMER_ID,
                    productId,
                    quantity,
                    flavourId
                );


            setCart(data);


        } finally {


            setLoading(false);

        }

    };


    // ============================================================
    // Clear Cart
    // ============================================================
    const clearCart = async () => {


        setLoading(true);


        try {


            await cartService.clearCart(
                CUSTOMER_ID
            );


            setCart(null);


            localStorage.removeItem(
                "cart"
            );


        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // Cart Quantity Count
    // ============================================================
    const cartCount =
        cart?.items?.reduce(
            (
                sum: number,
                item: CartItem
            ) =>
                sum + item.quantity,

            0

        ) || 0;


    return (

        <CartContext.Provider

            value={{

                cart,

                loading,

                addToCart,

                removeItem,

                updateQuantity,

                refreshCart,

                cartCount,

                clearCart,

            }}

        >

            {children}

        </CartContext.Provider>

    );

};


export const useCart = () => {


    const context =
        useContext(
            CartContext
        );


    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }


    return context;

};
