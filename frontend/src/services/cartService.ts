import axios from "axios";


const API = "/api/cart";


export interface AddToCartRequest {

    customerId: string;

    productId: number;

    /*
     * Selected ProductFlavour / variant.
     *
     * Optional because normal products do not
     * have variants.
     */
    flavourId?: number;

    quantity: number;

}


export interface CartItem {

    productId: number;

    productName: string;

    imageUrl?: string;

    /*
     * Selected flavour variant ID.
     */
    flavourId?: number | null;

    /*
     * Selected flavour name.
     */
    flavourName?: string | null;

    /*
     * Selected weight.
     */
    weight?: string | null;

    /*
     * Exact price of this cart item.
     */
    price: number;

    quantity: number;

    subtotal: number;

}


export interface Cart {

    id: number;

    customerId: string;

    totalAmount: number;

    items: CartItem[];

}


export const cartService = {


    // ============================================================
    // Add Product To Cart
    // ============================================================
    addToCart: async (
        data: AddToCartRequest
    ): Promise<Cart> => {


        const response =
            await axios.post(
                `${API}/add`,
                data
            );


        return response.data;

    },


    // ============================================================
    // Get Customer Cart
    // ============================================================
    getCart: async (
        customerId: string
    ): Promise<Cart> => {


        const response =
            await axios.get(
                `${API}/${customerId}`
            );


        return response.data;

    },


    // ============================================================
    // Update Quantity
    // ============================================================
    updateQuantity: async (

        customerId: string,

        productId: number,

        quantity: number

    ): Promise<Cart> => {


        const response =
            await axios.put(

                `${API}/${customerId}/${productId}`,

                null,

                {
                    params: {
                        quantity
                    }
                }

            );


        return response.data;

    },


    // ============================================================
    // Remove Product
    // ============================================================
    removeItem: async (

        customerId: string,

        productId: number

    ): Promise<Cart> => {


        const response =
            await axios.delete(

                `${API}/${customerId}/${productId}`

            );


        return response.data;

    },


    // ============================================================
    // Clear Cart
    // ============================================================
    clearCart: async (
        customerId: string
    ): Promise<void> => {


        await axios.delete(
            `${API}/${customerId}/clear`
        );

    }

};