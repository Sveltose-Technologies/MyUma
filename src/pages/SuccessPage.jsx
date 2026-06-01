import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card border-0 shadow-lg p-5 text-center rounded-5"
        style={{ maxWidth: "500px" }}>
        <div className="mb-4">
          {/* सुन्दर एनीमेशन के साथ ग्रीन टिक */}
          <div className="d-inline-flex p-4 rounded-circle bg-success bg-opacity-10 text-success animate-bounce">
            <CheckCircle size={80} strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="fw-bold text-navy mb-3">Payment Successful!</h1>
        <p className="text-muted fs-5 mb-4">
        Your payment has been processed. Your premium subscription is
          now active.
        </p>

        <div className="bg-light p-3 rounded-4 mb-4 text-start border">
          <small
            className="text-muted d-block text-uppercase fw-bold mb-1"
            style={{ fontSize: "10px" }}>
            Order Status
          </small>
          <span className="badge bg-success px-3 py-2 rounded-pill">
            COMPLETED
          </span>
        </div>

        <button
          className="btn btn-warning w-100 py-3 rounded-pill fw-bold fs-5 shadow-sm text-white"
          style={{ backgroundColor: "#de9f57", border: "none" }}
          onClick={() => navigate("/pricing")}>
          Back to Dashboard
        </button>
      </div>

      <style>{`
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
