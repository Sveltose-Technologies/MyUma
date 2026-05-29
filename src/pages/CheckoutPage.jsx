import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkoutAPI } from "../services/authService";
import { getUser } from "../utils/storage";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const plan = location.state?.plan;
  const user = getUser(); // Uses your storage utility

  if (!plan || !user) {
    return (
      <div className="vh-100 bg-dark text-white d-flex align-items-center justify-content-center">
        Session Expired
      </div>
    );
  }

  const planPrice = Number(plan.price);
  const tax = planPrice * 0.18;
  const total = planPrice + tax;

  const handlePayNow = async () => {
    setLoading(true);
    // Simulating API call for now
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <div
      className="min-vh-100 py-5 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#121418" }}>
      <div
        className="p-4 rounded-5"
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#1c1f26",
          color: "#ffffff",
        }}>
        <h4 className="mb-4 fw-bold">Checkout</h4>

        {/* Plan Summary */}
        <div
          className="p-4 rounded-4 mb-3 d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "#252932", border: "1px solid #333" }}>
          <div>
            <h6 className="mb-0 fw-bold">{plan.name}</h6>
            <small className="text-muted">Subscription</small>
          </div>
          <div className="text-end">
            <h5 className="mb-0" style={{ color: "#de9f57" }}>
              ${planPrice}
            </h5>
          </div>
        </div>

        {/* Breakdown */}
        <div
          className="p-4 rounded-4 mb-4"
          style={{ border: "1px solid #333" }}>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Plan Price</span>
            <span>${planPrice}</span>
          </div>
          <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-3">
            <span className="text-muted">Tax (18%)</span>
            <span>${tax.toFixed(1)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-2">
            <span className="h6 fw-bold mb-0">Total</span>
            <span className="h5 fw-bold mb-0" style={{ color: "#de9f57" }}>
              ${total.toFixed(1)}
            </span>
          </div>
        </div>

        <button
          onClick={handlePayNow}
          className="btn btn-lg w-100 py-3 rounded-4 fw-bold mb-3 shadow"
          style={{ backgroundColor: "#6366f1", color: "white" }}
          disabled={loading}>
          {loading ? "Processing..." : `🔒 Pay $${total.toFixed(1)} Now`}
        </button>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content border-0 rounded-5 p-5 text-center shadow-lg"
              style={{ backgroundColor: "#1c1f26", color: "white" }}>
              <div className="mb-4">
                <i
                  className="bi bi-check-circle-fill"
                  style={{ fontSize: "70px", color: "#6366f1" }}></i>
              </div>
              <h2 className="fw-bold mb-2">Payment Successful!</h2>
              <p className="text-muted mb-4">
                Welcome, <strong>{user.fullName}</strong>. Your Owner account is
                now active.
              </p>
              <button
                className="btn btn-lg w-100 py-3 rounded-pill fw-bold"
                style={{ backgroundColor: "#6366f1", color: "white" }}
                onClick={() => navigate("/")} // Navigate to HOME
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
