import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileText,
  Trash2,
  Loader2,
  CheckCircle2,
  LogOut,
} from 'lucide-react';

import {
  api,
  type LabReport,
} from '../lib/api';

import { adminApi } from '../lib/adminApi';

export default function AdminLabReports() {
  const navigate = useNavigate();

  const [reports, setReports] =
    useState<LabReport[]>([]);

  const [title, setTitle] =
    useState('');

  const [productName, setProductName] =
    useState('');

  const [reportDate, setReportDate] =
    useState('');

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [loadingReports, setLoadingReports] =
    useState(true);

  const [checkingSession, setCheckingSession] =
    useState(true);

  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');

  // ==========================================
  // CHECK ADMIN SESSION
  // ==========================================
  useEffect(() => {
    const checkSession = async () => {
      try {
        await adminApi.checkSession();
      } catch (err) {
        console.error(
          'Admin session check failed:',
          err
        );

        navigate(
          '/admin/login',
          {
            replace: true,
          }
        );
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [navigate]);

  // ==========================================
  // LOAD REPORTS
  // ==========================================
  const loadReports = async () => {
    try {
      setLoadingReports(true);
      setError('');

      const data =
        await api.getLabReports();

      setReports(data);
    } catch (err) {
      console.error(err);

      setError(
        'Unable to load lab reports.'
      );
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    if (!checkingSession) {
      loadReports();
    }
  }, [checkingSession]);

  // ==========================================
  // UPLOAD REPORT
  // ==========================================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setMessage('');
    setError('');

    if (!title.trim()) {
      setError(
        'Please enter a report title.'
      );

      return;
    }

    if (!file) {
      setError(
        'Please select a PDF file.'
      );

      return;
    }

    if (
      file.type !==
      'application/pdf'
    ) {
      setError(
        'Only PDF files are allowed.'
      );

      return;
    }

    // 15 MB limit
    const maxSize =
      15 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        'The PDF file must be smaller than 15 MB.'
      );

      return;
    }

    try {
      setLoading(true);

      await adminApi.uploadLabReport(
        title.trim(),
        productName.trim(),
        reportDate,
        file
      );

      setTitle('');
      setProductName('');
      setReportDate('');
      setFile(null);

      const input =
        document.getElementById(
          'lab-report-file'
        ) as HTMLInputElement | null;

      if (input) {
        input.value = '';
      }

      setMessage(
        'Lab report uploaded successfully.'
      );

      await loadReports();

    } catch (err) {
      console.error(
        'Upload error:',
        err
      );

      if (
        err instanceof Error &&
        err.message
          .toLowerCase()
          .includes('admin login required')
      ) {
        navigate(
          '/admin/login',
          {
            replace: true,
          }
        );

        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : 'Upload failed.'
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE REPORT
  // ==========================================
  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        'Are you sure you want to delete this lab report?'
      );

    if (!confirmed) {
      return;
    }

    setError('');
    setMessage('');

    try {
      await adminApi.deleteLabReport(
        id
      );

      setReports(
        reports.filter(
          (report) =>
            report.id !== id
        )
      );

      setMessage(
        'Lab report deleted successfully.'
      );

    } catch (err) {
      console.error(
        'Delete error:',
        err
      );

      if (
        err instanceof Error &&
        err.message
          .toLowerCase()
          .includes('admin login required')
      ) {
        navigate(
          '/admin/login',
          {
            replace: true,
          }
        );

        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete report.'
      );
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = async () => {
    try {
      await adminApi.logout();
    } catch (err) {
      console.error(
        'Logout error:',
        err
      );
    } finally {
      navigate(
        '/admin/login',
        {
          replace: true,
        }
      );
    }
  };

  // ==========================================
  // SESSION CHECK SCREEN
  // ==========================================
  if (checkingSession) {
    return (
      <div
        className="
          min-h-screen
          bg-[#0a0a0a]
          text-white
          flex
          items-center
          justify-center
          p-6
        "
      >
        <div className="flex items-center gap-3 text-white/50">

          <Loader2
            size={24}
            className="
              text-[#e41e26]
              animate-spin
            "
          />

          <span className="uppercase tracking-[0.2em] text-sm">
            Checking Admin Access...
          </span>

        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#0a0a0a]
        text-white
        p-6
        md:p-10
      "
    >

      <div
        className="
          max-w-6xl
          mx-auto
        "
      >

        {/* ==========================================
            HEADER
            ========================================== */}
        <div
          className="
            mb-10
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-6
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-3
                mb-4
              "
            >

              <div
                className="
                  w-10
                  h-[2px]
                  bg-[#e41e26]
                "
              />

              <span className="section-label">
                Administration
              </span>

            </div>

            <h1
              className="
                ghost-logo-text
                text-4xl
                md:text-6xl
                leading-none
              "
            >
              LAB
              <span className="text-[#e41e26]">
                REPORTS
              </span>
            </h1>

            <p
              className="
                text-white/40
                mt-4
              "
            >
              Upload and manage laboratory reports
              displayed on the public website.
            </p>

          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              border
              border-white/10
              text-white/60
              hover:border-[#e41e26]/50
              hover:text-[#e41e26]
              px-5
              py-3
              text-sm
              font-semibold
              uppercase
              tracking-wider
              transition-colors
            "
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

        {/* ==========================================
            UPLOAD FORM
            ========================================== */}
        <div
          className="
            bg-[#111111]
            border
            border-white/10
            p-6
            md:p-8
            mb-10
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-7
            "
          >

            <Upload
              size={22}
              className="text-[#e41e26]"
            />

            <h2
              className="
                font-fire
                text-2xl
              "
            >
              Upload New Report
            </h2>

          </div>

          {/* Success message */}
          {message && (
            <div
              className="
                flex
                items-center
                gap-2
                bg-green-500/10
                border
                border-green-500/20
                text-green-400
                p-4
                mb-5
                text-sm
              "
            >

              <CheckCircle2 size={18} />

              {message}

            </div>
          )}

          {/* Error message */}
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

            <div
              className="
                grid
                md:grid-cols-2
                gap-5
              "
            >

              {/* Report Title */}
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
                  Report Title *
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  placeholder="Protein Matrix-150 Lab Report"
                  className="
                    ghost-input
                    w-full
                  "
                  disabled={loading}
                />

              </div>

              {/* Product Name */}
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
                  Product Name
                </label>

                <input
                  value={productName}
                  onChange={(e) =>
                    setProductName(
                      e.target.value
                    )
                  }
                  placeholder="Protein Matrix-150"
                  className="
                    ghost-input
                    w-full
                  "
                  disabled={loading}
                />

              </div>

            </div>

            {/* Report Date */}
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
                Report Date
              </label>

              <input
                type="date"
                value={reportDate}
                onChange={(e) =>
                  setReportDate(
                    e.target.value
                  )
                }
                className="
                  ghost-input
                  w-full
                "
                disabled={loading}
              />

            </div>

            {/* PDF */}
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
                Laboratory Report PDF *
              </label>

              <input
                id="lab-report-file"
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) =>
                  setFile(
                    e.target.files?.[0] ||
                    null
                  )
                }
                className="
                  block
                  w-full
                  text-sm
                  text-white/50
                  file:mr-4
                  file:py-3
                  file:px-5
                  file:border-0
                  file:bg-[#e41e26]
                  file:text-white
                  file:font-semibold
                  file:cursor-pointer
                  bg-[#0a0a0a]
                  border
                  border-white/10
                  p-2
                "
                disabled={loading}
              />

              <p
                className="
                  text-white/30
                  text-xs
                  mt-2
                "
              >
                PDF only • Maximum size: 15 MB
              </p>

            </div>

            {/* Upload button */}
            <button
              type="submit"
              disabled={loading}
              className="
                btn-primary
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={17} />

                  Upload Lab Report
                </>
              )}

            </button>

          </form>

        </div>

        {/* ==========================================
            EXISTING REPORTS
            ========================================== */}
        <div
          className="
            bg-[#111111]
            border
            border-white/10
          "
        >

          <div
            className="
              p-6
              border-b
              border-white/10
            "
          >

            <h2
              className="
                font-fire
                text-2xl
              "
            >
              Published Reports
            </h2>

          </div>

          {loadingReports ? (

            <div
              className="
                flex
                justify-center
                p-12
              "
            >

              <Loader2
                size={28}
                className="
                  text-[#e41e26]
                  animate-spin
                "
              />

            </div>

          ) : error && reports.length === 0 ? (

            <div
              className="
                p-12
                text-center
              "
            >

              <p className="text-[#e41e26]">
                {error}
              </p>

              <button
                type="button"
                onClick={loadReports}
                className="
                  mt-5
                  btn-outline
                "
              >
                Try Again
              </button>

            </div>

          ) : reports.length === 0 ? (

            <div
              className="
                p-12
                text-center
                text-white/40
              "
            >

              No laboratory reports
              have been uploaded yet.

            </div>

          ) : (

            <div className="divide-y divide-white/10">

              {reports.map((report) => (

                <div
                  key={report.id}
                  className="
                    p-5
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    justify-between
                    gap-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        w-11
                        h-11
                        flex
                        items-center
                        justify-center
                        bg-[#e41e26]/10
                        border
                        border-[#e41e26]/20
                      "
                    >

                      <FileText
                        size={21}
                        className="
                          text-[#e41e26]
                        "
                      />

                    </div>

                    <div>

                      <h3
                        className="
                          text-white
                          font-medium
                        "
                      >
                        {report.title}
                      </h3>

                      <p
                        className="
                          text-white/30
                          text-xs
                          mt-1
                        "
                      >
                        {report.fileName}
                      </p>

                      {report.productName && (
                        <p
                          className="
                            text-white/25
                            text-xs
                            mt-1
                          "
                        >
                          {report.productName}
                        </p>
                      )}

                      {report.reportDate && (
                        <p
                          className="
                            text-white/20
                            text-xs
                            mt-1
                          "
                        >
                          {report.reportDate}
                        </p>
                      )}

                    </div>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        btn-outline
                      "
                    >
                      View
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          report.id
                        )
                      }
                      className="
                        p-3
                        border
                        border-[#e41e26]/30
                        text-[#e41e26]
                        hover:bg-[#e41e26]
                        hover:text-white
                        transition-colors
                      "
                      title="Delete report"
                      aria-label="Delete report"
                    >

                      <Trash2 size={17} />

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}