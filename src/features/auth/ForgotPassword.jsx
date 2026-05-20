import React, { useState } from "react";
import { forgotPasswordAPI } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const handleSendCode = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1. पहले "user" रोल के साथ ट्राई करें
    let res = await forgotPasswordAPI({ email, role: "user" });

    if (res.success || res.status) {
      toast.success("Verification code sent.");
      navigate("/verify-otp", { state: { email, type: "forgot" } });
    }
  } catch (err) {
    // 2. अगर "user" रोल फेल हो गया, तो "owner" रोल के साथ ट्राई करें
    try {
      let resOwner = await forgotPasswordAPI({ email, role: "owner" });

      if (resOwner.success || resOwner.status) {
        toast.success("Verification code sent.");
        navigate("/verify-otp", { state: { email, type: "forgot" } });
      }
    } catch (errOwner) {
      // 3. अगर दोनों फेल हो गए, तब "Auth Not Found" दिखाएँ
      console.error("Both roles failed:", errOwner);
      toast.error("Auth Not Found");
    }
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ maxWidth: "420px", width: "100%", borderRadius: "20px" }}>
        <div className="text-center mb-4">
          <h4 className="fw-bold" style={{ color: "#001f3f" }}>
            Forgot Password
          </h4>
          <p className="text-muted small">
            Verify your email to reset password
          </p>
        </div>

        <form onSubmit={handleSendCode}>
          <div className="mb-4">
            <label className="form-label small fw-bold">Email Address</label>
            <input
              type="email"
              className="form-control py-2 shadow-sm"
              placeholder="Enter registered email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="btn btn-lg w-100 text-white shadow-sm"
            style={{ backgroundColor: "#001f3f", borderRadius: "10px" }}
            disabled={loading}>
            {loading ? "Verifying..." : "Send Reset Code"}
          </button>

          <div className="text-center mt-3">
            <Link
              to="/login"
              className="text-decoration-none small text-muted fw-bold">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
