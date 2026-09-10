import {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { adminApi } from "../lib/adminApi";

export default function AdminProtectedRoute() {

  const [checking, setChecking] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {

    const check = async () => {

      try {

        await adminApi.checkSession();

        setAuthenticated(true);

      } catch {

        setAuthenticated(false);

      } finally {

        setChecking(false);
      }
    };

    check();

  }, []);

  if (checking) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/50 text-sm uppercase tracking-[0.25em]">
          Checking Admin Access...
        </div>
      </div>
    );
  }

  if (!authenticated) {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <Outlet />;
}