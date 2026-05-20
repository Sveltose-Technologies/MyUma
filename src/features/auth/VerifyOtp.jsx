import React, { useState, useEffect } from "react";
import { verifyOtpAPI } from "../../services/authService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length < 4) return toast.error("Please enter a valid code");

    setLoading(true);
    try {
      const res = await verifyOtpAPI({ email, otp });

      // सुरक्षा के लिए यहाँ रोल चेक करें
      // अगर रिस्पॉन्स में रोल Admin आता है, तो उसे आगे न जाने दें
      const role = res.role || res.auth?.role;

      if (role === "admin") {
        toast.error("Auth Not Found"); // एडमिन को भी यही मैसेज दें
        navigate("/login");
        return;
      }

      // सिर्फ User और Owner ही यहाँ पहुँच पाएंगे
      toast.success("Identity Verified!");
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      // अगर ओटीपी गलत है या यूजर नहीं मिला
      const status = error.response?.status;
      if (status === 404) {
        toast.error("Auth Not Found");
      } else {
        toast.error("Invalid OTP. Please check again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "20px" }}>
        <h4 className="text-center fw-bold mb-2">Verify OTP</h4>
        <p className="text-center text-muted small mb-4">
          Code sent to: <br />
          <span className="text-dark fw-bold">{email}</span>
        </p>

        <form onSubmit={handleVerify}>
          <div className="mb-4 text-center">
            <input
              type="text"
              className="form-control form-control-lg text-center fw-bold"
              placeholder="Enter Code"
              maxLength="6"
              required
              onChange={(e) => setOtp(e.target.value)}
              style={{ letterSpacing: "8px", border: "2px solid #001f3f" }}
            />
          </div>
          <button
            className="btn btn-lg w-100 text-white shadow"
            style={{ backgroundColor: "#001f3f", borderRadius: "10px" }}
            disabled={loading}>
            {loading ? "Checking..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
