import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Loader2,
} from "lucide-react";

import { api, type LabReport } from "../lib/api";

export default function LabReportsPage() {
  const [reports, setReports] = useState<LabReport[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD PUBLIC LAB REPORTS
  // ==========================================
  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getLabReports();

      setReports(data);
    } catch (err) {
      console.error("Lab reports error:", err);

      setError("Unable to load lab reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ==========================================
          TOP HEADER
          ========================================== */}
      <header className="bg-black border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-5">

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              text-white/60
              hover:text-white
              transition-colors
            "
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

        </div>

      </header>

      {/* ==========================================
          MAIN CONTENT
          ========================================== */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        {/* ==========================================
            PAGE TITLE
            ========================================== */}
        <div className="text-center mb-16">

          <div className="flex items-center justify-center gap-3 mb-6">

            <div className="w-12 h-[2px] bg-[#e41e26]" />

            <span
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/40
              "
            >
              Quality & Transparency
            </span>

            <div className="w-12 h-[2px] bg-[#e41e26]" />

          </div>

          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              uppercase
              tracking-[-0.03em]
            "
          >
            LAB{" "}
            <span className="text-[#e41e26]">
              REPORTS
            </span>
          </h1>

          <div className="w-16 h-[3px] bg-[#e41e26] mx-auto mt-6" />

          <p
            className="
              max-w-2xl
              mx-auto
              mt-8
              text-white/50
              text-base
              md:text-lg
              leading-relaxed
            "
          >
            Explore our laboratory reports and verify
            the quality behind every Axe Breaker formula.
          </p>

        </div>

        {/* ==========================================
            REPORT LIST
            ========================================== */}
        <section>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">

              <Loader2
                size={36}
                className="
                  animate-spin
                  text-[#e41e26]
                  mb-4
                "
              />

              <p className="text-white/40">
                Loading lab reports...
              </p>

            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className="
                text-center
                py-24
                border
                border-white/10
                bg-white/[0.02]
              "
            >

              <FileText
                size={45}
                className="
                  mx-auto
                  mb-5
                  text-white/20
                "
              />

              <h3
                className="
                  text-xl
                  font-bold
                  uppercase
                "
              >
                Unable to Load Lab Reports
              </h3>

              <p className="text-white/40 mt-2">
                {error}
              </p>

              <button
                onClick={loadReports}
                className="
                  mt-6
                  bg-[#e41e26]
                  hover:bg-[#c91820]
                  px-6
                  py-3
                  font-bold
                  uppercase
                  text-sm
                  transition-colors
                "
              >
                Try Again
              </button>

            </div>
          )}

          {/* No reports */}
          {!loading &&
            !error &&
            reports.length === 0 && (
              <div
                className="
                  text-center
                  py-24
                  border
                  border-white/10
                  bg-white/[0.02]
                "
              >

                <FileText
                  size={50}
                  className="
                    mx-auto
                    mb-5
                    text-white/20
                  "
                />

                <h3
                  className="
                    text-xl
                    font-bold
                    uppercase
                  "
                >
                  No Lab Reports Yet
                </h3>

                <p className="text-white/40 mt-2">
                  Laboratory reports will appear here
                  once they are published.
                </p>

              </div>
            )}

          {/* Reports */}
          {!loading &&
            !error &&
            reports.length > 0 && (
              <div
                className="
                  grid
                  md:grid-cols-2
                  lg:grid-cols-3
                  gap-6
                "
              >

                {reports.map((report) => (
                  <article
                    key={report.id}
                    className="
                      border
                      border-white/10
                      bg-white/[0.03]
                      p-6
                      hover:border-[#e41e26]/50
                      transition-colors
                    "
                  >

                    {/* Top */}
                    <div className="flex items-start justify-between">

                      <div
                        className="
                          w-12
                          h-12
                          flex
                          items-center
                          justify-center
                          bg-[#e41e26]/10
                          text-[#e41e26]
                        "
                      >
                        <FileText size={25} />
                      </div>

                    </div>

                    {/* Title */}
                    <h3
                      className="
                        text-xl
                        font-black
                        uppercase
                        mt-6
                        leading-tight
                      "
                    >
                      {report.title}
                    </h3>

                    {/* Product */}
                    {report.productName && (
                      <p
                        className="
                          text-white/50
                          text-sm
                          mt-3
                        "
                      >
                        Product:{" "}
                        <span className="text-white/70">
                          {report.productName}
                        </span>
                      </p>
                    )}

                    {/* Date */}
                    {report.reportDate && (
                      <p
                        className="
                          text-white/30
                          text-sm
                          mt-1
                        "
                      >
                        {report.reportDate}
                      </p>
                    )}

                    {/* File name */}
                    {report.fileName && (
                      <p
                        className="
                          text-white/20
                          text-xs
                          mt-4
                          truncate
                        "
                        title={report.fileName}
                      >
                        {report.fileName}
                      </p>
                    )}

                    {/* View */}
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        bg-white
                        text-black
                        hover:bg-[#e41e26]
                        hover:text-white
                        px-5
                        py-3
                        font-bold
                        uppercase
                        text-sm
                        transition-colors
                      "
                    >
                      View Report
                      <ExternalLink size={16} />
                    </a>

                  </article>
                ))}

              </div>
            )}

        </section>

      </main>

    </div>
  );
}