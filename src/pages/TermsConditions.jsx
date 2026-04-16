import React, { useEffect, useState } from "react";
import { getTermsAPI } from "../features/auth/api";
import { toast } from "react-toastify";
import { Loader2, ShieldCheck, Mail } from "lucide-react";

export default function TermsConditions() {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await getTermsAPI();
        if (res.termcondition && res.termcondition.length > 0) {
          setTerms(res.termcondition[0]);
        }
      } catch (err) {
        toast.error("Failed to load Terms & Conditions");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header Card */}
            <div
              className="card border-0 shadow-sm p-5 text-white mb-4"
              style={{ backgroundColor: "#001f3f", borderRadius: "20px" }}
            >
              <div className="d-flex align-items-center gap-3">
                <ShieldCheck size={40} className="text-warning" />
                <div>
                  <h1 className="fw-bold mb-0">Terms & Conditions</h1>
                  <p className="opacity-75 mb-0">
                    Last updated:{" "}
                    {terms
                      ? new Date(terms.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div
              className="card border-0 shadow-sm p-4 p-md-5"
              style={{ borderRadius: "20px" }}
            >
              {!terms ? (
                <div className="text-center py-5">
                  <p className="text-muted">
                    No terms available at this moment.
                  </p>
                </div>
              ) : (
                <>
                  {/* API HTML Content Rendering */}
                  <div
                    className="terms-content text-secondary fs-6"
                    style={{ lineHeight: "1.7", textAlign: "justify" }}
                    dangerouslySetInnerHTML={{ __html: terms.content }}
                  />

                  <hr className="my-5 opacity-25" />

                  {/* Footer Support Info */}
                  <div className="bg-light p-4 rounded-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className="mb-md-0 text-muted small">
                      Have questions? Reach out to our legal team.
                    </p>
                    <div className="d-flex align-items-center text-primary fw-bold">
                      <Mail size={18} className="me-2" />
                      {terms.email}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
