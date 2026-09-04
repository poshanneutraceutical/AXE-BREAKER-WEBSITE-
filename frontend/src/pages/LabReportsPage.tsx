import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";

import { api, type LabReport } from "../lib/api";

export default function LabReportsPage() {
  const [reports, setReports] = useState<LabReport[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Upload form
  const [title, setTitle] = useState("");
  const [productName, setProductName] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  /*
   * IMPORTANT:
   * This only determines whether to DISPLAY
   * the upload interface.
   *
   * Real security must be handled by the
   * Spring Boot backend.
   */
  const token = localStorage.getItem("token");

  // ==========================================
  // LOAD REPORTS
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

  // ==========================================
  // UPLOAD REPORT
  // ==========================================
  const handleUpload = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setUploadMessage("");

    if (!title.trim()) {
      setUploadMessage("Please enter a report title.");
      return;
    }

    if (!file) {
      setUploadMessage("Please select a PDF file.");
      return;
    }

    if (file.type !== "application/pdf") {
      setUploadMessage("Only PDF files are allowed.");
      return;
    }

    // 15 MB limit
    const maxSize = 15 * 1024 * 1024;

    if (file.size > maxSize) {
      setUploadMessage(
        "The PDF file must be smaller than 15 MB."
      );
      return;
    }

    try {
      setUploading(true);

      await api.uploadLabReport(
        title.trim(),
        productName.trim(),
        reportDate.trim(),
        file
      );

      // Reset form
      setTitle("");
      setProductName("");
      setReportDate("");
      setFile(null);

      const fileInput = document.getElementById(
        "lab-report-file"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      setUploadMessage(
        "Lab report uploaded successfully."
      );

      // Reload reports so the newly uploaded
      // report appears immediately.
      await loadReports();
    } catch (err) {
      console.error("Upload error:", err);

      setUploadMessage(
        err instanceof Error
          ? err.message
          : "Unable to upload lab report."
      );
    } finally {
      setUploading(false);
    }
  };

  // ==========================================
  // DELETE REPORT
  // ==========================================
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lab report?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.deleteLabReport(id);

      await loadReports();
    } catch (err) {
      console.error("Delete error:", err);

      alert("Unable to delete lab report.");
    }
  };

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
            OWNER / ADMIN UPLOAD PANEL
            ========================================== */}
        {token && (
          <section className="mb-16">

            <div
              className="
                border
                border-white/10
                bg-white/[0.03]
                p-6
                md:p-8
              "
            >

              {/* Upload heading */}
              <div className="flex items-center gap-4 mb-8">

                <div
                  className="
                    w-12
                    h-12
                    flex
                    items-center
                    justify-center
                    bg-[#e41e26]
                  "
                >
                  <Upload size={22} />
                </div>

                <div>

                  <h2
                    className="
                      text-xl
                      md:text-2xl
                      font-black
                      uppercase
                    "
                  >
                    Upload Lab Report
                  </h2>

                  <p className="text-sm text-white/40 mt-1">
                    Upload a PDF laboratory report.
                  </p>

                </div>

              </div>

              {/* Upload form */}
              <form
                onSubmit={handleUpload}
                className="grid md:grid-cols-2 gap-5"
              >

                {/* Title */}
                <div>
                  <label
                    htmlFor="report-title"
                    className="
                      block
                      text-xs
                      uppercase
                      tracking-wider
                      text-white/40
                      mb-2
                    "
                  >
                    Report Title
                  </label>

                  <input
                    id="report-title"
                    type="text"
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    placeholder="Example: Whey Protein Lab Report"
                    className="
                      w-full
                      bg-black
                      border
                      border-white/10
                      px-4
                      py-4
                      text-white
                      outline-none
                      placeholder:text-white/20
                      focus:border-[#e41e26]
                      transition-colors
                    "
                  />
                </div>

                {/* Product */}
                <div>
                  <label
                    htmlFor="product-name"
                    className="
                      block
                      text-xs
                      uppercase
                      tracking-wider
                      text-white/40
                      mb-2
                    "
                  >
                    Product Name
                  </label>

                  <input
                    id="product-name"
                    type="text"
                    value={productName}
                    onChange={(e) =>
                      setProductName(e.target.value)
                    }
                    placeholder="Example: Axe Whey Protein"
                    className="
                      w-full
                      bg-black
                      border
                      border-white/10
                      px-4
                      py-4
                      text-white
                      outline-none
                      placeholder:text-white/20
                      focus:border-[#e41e26]
                      transition-colors
                    "
                  />
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="report-date"
                    className="
                      block
                      text-xs
                      uppercase
                      tracking-wider
                      text-white/40
                      mb-2
                    "
                  >
                    Report Date
                  </label>

                  <input
                    id="report-date"
                    type="text"
                    value={reportDate}
                    onChange={(e) =>
                      setReportDate(e.target.value)
                    }
                    placeholder="Example: September 2026"
                    className="
                      w-full
                      bg-black
                      border
                      border-white/10
                      px-4
                      py-4
                      text-white
                      outline-none
                      placeholder:text-white/20
                      focus:border-[#e41e26]
                      transition-colors
                    "
                  />
                </div>

                {/* PDF */}
                <div>
                  <label
                    htmlFor="lab-report-file"
                    className="
                      block
                      text-xs
                      uppercase
                      tracking-wider
                      text-white/40
                      mb-2
                    "
                  >
                    PDF File
                  </label>

                  <input
                    id="lab-report-file"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={(e) =>
                      setFile(
                        e.target.files?.[0] || null
                      )
                    }
                    className="
                      w-full
                      bg-black
                      border
                      border-white/10
                      px-4
                      py-3
                      text-white/50
                      file:mr-4
                      file:border-0
                      file:bg-[#e41e26]
                      file:text-white
                      file:px-4
                      file:py-2
                      file:font-bold
                      file:cursor-pointer
                    "
                  />
                </div>

                {/* Upload button */}
                <button
                  type="submit"
                  disabled={uploading}
                  className="
                    md:col-span-2
                    bg-[#e41e26]
                    hover:bg-[#c91820]
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    text-white
                    px-6
                    py-4
                    font-black
                    uppercase
                    tracking-wider
                    transition-colors
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  {uploading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={20} />
                      Upload Report
                    </>
                  )}
                </button>

              </form>

              {/* Upload message */}
              {uploadMessage && (
                <div
                  className="
                    mt-5
                    border
                    border-white/10
                    bg-black
                    px-4
                    py-3
                    text-sm
                    text-white/70
                  "
                >
                  {uploadMessage}
                </div>
              )}

            </div>

          </section>
        )}

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

                      {/* Delete */}
                      {token && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(report.id)
                          }
                          className="
                            text-white/25
                            hover:text-red-500
                            transition-colors
                          "
                          title="Delete report"
                          aria-label="Delete report"
                        >
                          <Trash2 size={19} />
                        </button>
                      )}

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