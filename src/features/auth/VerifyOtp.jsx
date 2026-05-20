import React, { useState, useEffect } from "react";
import { verifyOtpAPI } from "../../services/authService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // location.state se email aur type dono nikaalein
  const email = location.state?.email;
  const type = location.state?.type; // 'signup' ya 'forgot'

  useEffect(() => {
    // Agar email ya type missing hai to wapis login bhej do
    if (!email || !type) {
      navigate("/login");
    }
  }, [email, type, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length < 4) return toast.error("Please enter a valid code");

    setLoading(true);
    try {
      const res = await verifyOtpAPI({ email, otp });

      // Admin check logic
      const role = res.role || res.auth?.role;
      if (role === "admin") {
        toast.error("Auth Not Found");
        navigate("/login");
        return;
      }

      // --- MAIN LOGIC START ---
      if (type === "signup") {
        // Agar naya account banaya hai, to direct login page ya home bhejien
        toast.success("Account verified successfully! Please login.");
        navigate("/login");
      } else if (type === "forgot") {
        // Agar password bhul gaye hain, tabhi Reset Password par bhejien
        toast.success("Identity Verified!");
        navigate("/reset-password", { state: { email } });
      } else {
        // Default fallback
        navigate("/login");
      }
      // --- MAIN LOGIC END ---
    } catch (error) {
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
          {type === "signup"
            ? "Verify your new account"
            : "Reset your password"}{" "}
          <br />
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
              value={otp}
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
