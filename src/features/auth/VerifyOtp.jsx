import React, { useState, useEffect } from "react";
import { verifyOtpAPI, forgotPasswordAPI } from "../../services/authService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Timer State
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);

  // Get data from navigation state
  const email = location.state?.email;
  const type = location.state?.type;
  // IMPORTANT: Capture the role here. If no role is passed, default to "owner"
  const role = location.state?.role || "owner";

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (!email || !type) {
      navigate("/login");
    }
  }, [email, type, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (timeLeft === 0) return toast.error("OTP expired! Resend code.");
    if (otp.length < 4) return toast.error("Enter valid code");

    setLoading(true);
    try {
      const res = await verifyOtpAPI({ email, otp });
      if (type === "signup") {
        toast.success("Verified! Please login.");
        navigate("/login");
      } else if (type === "forgot") {
        toast.success("Verified!");
        // Send email to reset page
        navigate("/reset-password", { state: { email } });
      }
    } catch (error) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    // 1. Start loading state
    setLoading(true);

    try {
      // 2. Prepare payload (Email and Role are usually required)
      const payload = {
        email: email,
        role: location.state?.role || "owner",
      };

      // 3. Call the new resend-otp endpoint
      const res = await resendOtpAPI(payload);

      if (res) {
        // 4. Show success message
        toast.success("A new OTP has been sent to your email!");

        // 5. Reset UI and Timer functionality
        setTimeLeft(120); // Restart 2-minute countdown
        setCanResend(false); // Disable resend button
        setOtp(""); // Clear the OTP input field
      }
    } catch (error) {
      // 6. Handle errors and show toast
      const errorMsg = error.response?.data?.message || "Failed to resend OTP";
      toast.error(errorMsg);
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
          Code sent to: <span className="text-dark fw-bold">{email}</span>
        </p>

        <form onSubmit={handleVerify}>
          <div className="mb-2 text-center">
            <input
              type="text"
              className="form-control form-control-lg text-center fw-bold"
              placeholder="000000"
              maxLength="6"
              required
              value={otp}
              disabled={timeLeft === 0 || loading}
              onChange={(e) => setOtp(e.target.value)}
              style={{ letterSpacing: "8px", border: "2px solid #001f3f" }}
            />
          </div>
          <div className="text-center mb-4">
            <small
              className={timeLeft === 0 ? "text-danger fw-bold" : "text-muted"}>
              {timeLeft > 0 ? `Expires in: ${formatTime(timeLeft)}` : "Expired"}
            </small>
          </div>
          <button
            className="btn btn-lg w-100 text-white shadow mb-3"
            style={{ backgroundColor: "#001f3f" }}
            disabled={loading || timeLeft === 0}>
            {loading ? "Checking..." : "Confirm"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={!canResend || loading}
            className="btn btn-link btn-sm p-0 fw-bold text-decoration-none"
            style={{ color: canResend ? "#001f3f" : "#ccc" }}>
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
