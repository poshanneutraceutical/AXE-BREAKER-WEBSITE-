const API_URL =
  (import.meta.env.VITE_API_URL as string) ||
  "/api";


/*
 * =========================================================
 * PRODUCT FLAVOUR / VARIANT
 * =========================================================
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
 * =========================================================
 * PRODUCT
 * =========================================================
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
 * =========================================================
 * DISTRIBUTOR INQUIRY
 * =========================================================
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
 * =========================================================
 * CONTACT MESSAGE
 * =========================================================
 */
export type ContactMessage = {
  name: string;

  email: string;

  subject?: string;

  message: string;
};


/*
 * =========================================================
 * LAB REPORT
 * =========================================================
 */
export type LabReport = {
  id: number;

  title: string;

  productName?: string;

  reportDate?: string;

  fileName: string;

  contentType: string;

  /*
   * Public URL used to open the PDF.
   */
  url: string;
};


/*
 * =========================================================
 * AUTH TOKEN
 * =========================================================
 *
 * Your existing authentication system stores
 * the JWT in localStorage under "token".
 */
function getAuthToken(): string {
  return localStorage.getItem("token") || "";
}


/*
 * =========================================================
 * GENERIC API REQUEST HELPER
 * =========================================================
 */
async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {

  const token = getAuthToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };


  /*
   * Add JWT only when it exists.
   *
   * This keeps public API requests working while
   * allowing protected endpoints to authenticate.
   */
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }


  const res = await fetch(
    `${API_URL}${path}`,
    {
      ...options,

      headers: {
        ...headers,
        ...(options?.headers || {}),
      },
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


  /*
   * No content response.
   */
  if (res.status === 204) {
    return undefined as T;
  }


  return res.json() as Promise<T>;
}


/*
 * =========================================================
 * API
 * =========================================================
 */
export const api = {

  // =======================================================
  // PRODUCTS
  // =======================================================

  getProducts: () =>
    request<Product[]>(
      "/products"
    ),


  getProduct: (id: number) =>
    request<Product>(
      `/products/${id}`
    ),


  // =======================================================
  // DISTRIBUTOR
  // =======================================================

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


  // =======================================================
  // CONTACT
  // =======================================================

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


  // =======================================================
  // LAB REPORTS
  // =======================================================

  /*
   * Get all published lab reports.
   *
   * This endpoint is PUBLIC.
   *
   * Visitors do not need to log in to see reports.
   */
  getLabReports: () =>
    request<LabReport[]>(
      "/lab-reports"
    ),


  /*
   * Upload a new laboratory report.
   *
   * This endpoint is PROTECTED.
   *
   * The JWT is sent in the Authorization header.
   *
   * IMPORTANT:
   * Do NOT manually set Content-Type here.
   *
   * Browser automatically creates the correct
   * multipart/form-data boundary when using FormData.
   */
  uploadLabReport: async (
    title: string,
    productName: string,
    reportDate: string,
    file: File
  ): Promise<LabReport> => {

    const token = getAuthToken();


    const formData = new FormData();

    formData.append(
      "title",
      title
    );

    formData.append(
      "productName",
      productName
    );

    formData.append(
      "reportDate",
      reportDate
    );

    formData.append(
      "file",
      file
    );


    const headers: HeadersInit = {};


    /*
     * Send JWT for owner/admin authentication.
     */
    if (token) {
      headers["Authorization"] =
        `Bearer ${token}`;
    }


    const res = await fetch(
      `${API_URL}/lab-reports`,
      {
        method: "POST",

        headers,

        body: formData,
      }
    );


    if (!res.ok) {

      const text =
        await res
          .text()
          .catch(() => "Upload failed");


      throw new Error(
        text ||
        `Upload failed (${res.status})`
      );
    }


    return res.json() as Promise<LabReport>;
  },


  /*
   * Delete a laboratory report.
   *
   * This endpoint is PROTECTED.
   */
  deleteLabReport: async (
    id: number
  ): Promise<void> => {

    const token = getAuthToken();


    const headers: HeadersInit = {};


    if (token) {
      headers["Authorization"] =
        `Bearer ${token}`;
    }


    const res = await fetch(
      `${API_URL}/lab-reports/${id}`,
      {
        method: "DELETE",

        headers,
      }
    );


    if (!res.ok) {

      const text =
        await res
          .text()
          .catch(() => "Unable to delete lab report.");


      throw new Error(
        text ||
        `Unable to delete lab report (${res.status})`
      );
    }
  },


  /*
   * Get the public URL of a lab report PDF.
   *
   * The PDF itself is served by Spring Boot.
   */
  getLabReportUrl: (
    id: number
  ): string => {
    return `${API_URL}/lab-reports/${id}/file`;
  },

};