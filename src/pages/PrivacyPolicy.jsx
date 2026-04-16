import React, { useEffect, useState } from "react";
import { getPrivacyPolicyAPI } from "../features/auth/api";
import { toast } from "react-toastify";
import { Loader2, Lock, Mail, ExternalLink } from "lucide-react";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await getPrivacyPolicyAPI();
        if (res.privacyPolicy && res.privacyPolicy.length > 0) {
          setPolicy(res.privacyPolicy[0]);
        }
      } catch (err) {
        toast.error("Failed to load Privacy Policy");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
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
                <div className="bg-white bg-opacity-10 p-3 rounded-circle">
                  <Lock size={32} className="text-warning" />
                </div>
                <div>
                  <h1 className="fw-bold mb-0">Privacy Policy</h1>
                  <p className="opacity-75 mb-0">
                    Protecting your data at myuma.net
                  </p>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div
              className="card border-0 shadow-sm p-4 p-md-5"
              style={{ borderRadius: "20px" }}
            >
              {!policy ? (
                <div className="text-center py-5">
                  <p className="text-muted">
                    Privacy policy details are being updated.
                  </p>
                </div>
              ) : (
                <>
                  {/* Text Editor Content Rendering */}
                  <div
                    className="policy-content text-secondary"
                    style={{ lineHeight: "1.8", fontSize: "1.05rem" }}
                    dangerouslySetInnerHTML={{ __html: policy.content }}
                  />

                  <div className="mt-5 pt-4 border-top">
                    <div className="row g-4 align-items-center">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center gap-2 text-muted small">
                          <Mail size={16} />
                          <span>Questions? Email us at: </span>
                          <a
                            href={`mailto:${policy.email}`}
                            className="text-primary fw-bold text-decoration-none"
                          >
                            {policy.email}
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <a
                          href={policy.webLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm rounded-pill px-3"
                        >
                          <ExternalLink size={14} className="me-1" /> View
                          Official Version
                        </a>
                      </div>
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
};

export default PrivacyPolicy;
