import axios from "axios";

const API = "/api/orders";

export interface CheckoutRequest {
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  orderDate: string;
  items: OrderItem[];
}

export const orderService = {
  checkout: async (request: CheckoutRequest): Promise<Order> => {
    const response = await axios.post(`${API}/checkout`, request);

    return response.data;
  },
};