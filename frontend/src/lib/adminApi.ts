import type { LabReport } from "./api";

const API_URL =
  (import.meta.env.VITE_API_URL as string) ||
  "/api";

export type AdminLoginResponse = {
  authenticated: boolean;
  message: string;
};

async function adminRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,

      credentials: "include",

      headers: {
        ...(options.body instanceof FormData
          ? {}
          : {
              "Content-Type":
                "application/json",
            }),

        ...(options.headers || {}),
      },
    }
  );

  if (!response.ok) {

    const text =
      await response
        .text()
        .catch(
          () => "Request failed."
        );

    throw new Error(
      text ||
      `Request failed (${response.status})`
    );
  }

  if (response.status === 204) {

    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const adminApi = {

  login: (
    username: string,
    password: string
  ) =>

    adminRequest<AdminLoginResponse>(
      "/admin/login",
      {
        method: "POST",

        body: JSON.stringify({
          username,
          password,
        }),
      }
    ),

  checkSession: () =>

    adminRequest<AdminLoginResponse>(
      "/admin/session",
      {
        method: "GET",
      }
    ),

  logout: () =>

    adminRequest<void>(
      "/admin/logout",
      {
        method: "POST",
      }
    ),

  uploadLabReport: (
    title: string,
    productName: string,
    reportDate: string,
    file: File
  ) => {

    const formData =
      new FormData();

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

    return adminRequest<LabReport>(
      "/lab-reports",
      {
        method: "POST",
        body: formData,
      }
    );
  },

  deleteLabReport: (
    id: number
  ) =>

    adminRequest<void>(
      `/lab-reports/${id}`,
      {
        method: "DELETE",
      }
    ),
};