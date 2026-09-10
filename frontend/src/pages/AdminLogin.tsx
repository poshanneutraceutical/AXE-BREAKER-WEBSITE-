import { useState } from "react";
import {
  LockKeyhole,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { adminApi } from "../lib/adminApi";

export default function AdminLogin() {

  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    if (!username.trim()) {

      setError(
        "Please enter your admin ID."
      );

      return;
    }

    if (!password) {

      setError(
        "Please enter your password."
      );

      return;
    }

    try {

      setLoading(true);

      await adminApi.login(
        username.trim(),
        password
      );

      navigate(
        "/admin/lab-reports",
        {
          replace: true,
        }
      );

    } catch (error) {

      console.error(
        "Admin login error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Invalid admin ID or password."
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-white/50
            hover:text-white
            transition-colors
            text-sm
            mb-8
          "
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div
          className="
            bg-[#111111]
            border
            border-white/10
            p-8
            md:p-10
          "
        >

          <div className="flex justify-center mb-7">

            <div
              className="
                w-14
                h-14
                flex
                items-center
                justify-center
                bg-[#e41e26]
              "
            >
              <LockKeyhole size={24} />
            </div>

          </div>

          <div className="text-center mb-8">

            <div
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#e41e26]
                mb-3
              "
            >
              Administration
            </div>

            <h1
              className="
                ghost-logo-text
                text-4xl
                md:text-5xl
              "
            >
              ADMIN{" "}
              <span className="text-[#e41e26]">
                LOGIN
              </span>
            </h1>

            <p className="text-white/40 text-sm mt-4">
              Sign in to manage laboratory reports.
            </p>

          </div>

          {error && (

            <div
              className="
                bg-[#e41e26]/10
                border
                border-[#e41e26]/20
                text-[#e41e26]
                p-4
                mb-5
                text-sm
              "
            >
              {error}
            </div>

          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label
                className="
                  block
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  text-white/50
                  mb-2
                "
              >
                Admin ID
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                autoComplete="username"
                className="
                  w-full
                  bg-[#0a0a0a]
                  border
                  border-white/10
                  px-4
                  py-4
                  text-white
                  outline-none
                  focus:border-[#e41e26]
                "
              />

            </div>

            <div>

              <label
                className="
                  block
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  text-white/50
                  mb-2
                "
              >
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                autoComplete="current-password"
                className="
                  w-full
                  bg-[#0a0a0a]
                  border
                  border-white/10
                  px-4
                  py-4
                  text-white
                  outline-none
                  focus:border-[#e41e26]
                "
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                btn-primary
                w-full
                justify-center
                disabled:opacity-50
              "
            >

              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Logging In...
                </>
              ) : (
                <>
                  <LockKeyhole size={17} />
                  Login
                </>
              )}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}