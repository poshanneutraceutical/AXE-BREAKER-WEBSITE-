const API_URL =
  (import.meta.env.VITE_API_URL as string) ||
  "/api";

/*
 * Product flavour / variant
 *
 * Each flavour represents one specific
 * flavour + weight combination.
 *
 * Example:
 *
 * Mango + 1 KG
 * [
 *   "/products/protein/25.png",
 *   "/products/protein/26.png",
 *   "/products/protein/27.png"
 * ]
 *
 * Chocolate + 2 KG
 * [
 *   "/products/protein 2kg/40.png",
 *   "/products/protein 2kg/41.png",
 *   "/products/protein 2kg/42.png"
 * ]
 */
export type ProductFlavour = {
  id: number;

  flavourName: string;

  weight: string | null;

  price: number;

  description: string | null;

  images: string[];

  inStock: boolean;
};


/*
 * Product
 */
export type Product = {
  id: number;

  name: string;

  price: number;

  description: string | null;

  category: string | null;

  /*
   * Main product images.
   *
   * These are used for the product card
   * before a flavour/variant is selected.
   */
  images: string[];

  badge: string | null;

  featured: boolean;

  inStock: boolean;

  /*
   * All flavour + weight combinations.
   */
  flavours?: ProductFlavour[];
};


/*
 * Distributor inquiry
 */
export type DistributorInquiry = {
  fullName: string;

  email: string;

  phone?: string;

  businessName?: string;

  city?: string;

  state?: string;

  message?: string;
};


/*
 * Contact message
 */
export type ContactMessage = {
  name: string;

  email: string;

  subject?: string;

  message: string;
};


/*
 * Generic API request helper
 */
async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {

  const res = await fetch(
    `${API_URL}${path}`,
    {
      headers: {
        "Content-Type": "application/json",
      },

      ...options,
    }
  );


  if (!res.ok) {

    const text =
      await res
        .text()
        .catch(() => "Request failed");

    throw new Error(
      text ||
      `Request failed (${res.status})`
    );
  }


  if (res.status === 204) {

    return undefined as T;

  }


  return res.json() as Promise<T>;
}


/*
 * API
 */
export const api = {

  // -----------------------------------------
  // Products
  // -----------------------------------------

  getProducts: () =>
    request<Product[]>(
      "/products"
    ),


  getProduct: (id: number) =>
    request<Product>(
      `/products/${id}`
    ),


  // -----------------------------------------
  // Distributor
  // -----------------------------------------

  submitDistributor: (
    data: DistributorInquiry
  ) =>
    request<DistributorInquiry>(
      "/distributor",
      {
        method: "POST",

        body: JSON.stringify(data),
      }
    ),


  // -----------------------------------------
  // Contact
  // -----------------------------------------

  submitContact: (
    data: ContactMessage
  ) =>
    request<ContactMessage>(
      "/contact",
      {
        method: "POST",

        body: JSON.stringify(data),
      }
    ),

};