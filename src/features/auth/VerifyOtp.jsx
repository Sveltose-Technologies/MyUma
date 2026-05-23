import React, { useState, useEffect } from "react";
import { verifyOtpAPI, resendOtpAPI } from "../../services/authService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Timer State: 120 seconds = 2 minutes
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);

  const email = location.state?.email;
  const type = location.state?.type; // 'signup' or 'forgot'

  // Countdown Logic
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true); // Enable resend button when time is up
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

    if (timeLeft === 0) {
      return toast.error("OTP has expired. Please resend a new code.");
    }

    if (otp.length < 4) return toast.error("Please enter a valid code");

    setLoading(true);
    try {
      const res = await verifyOtpAPI({ email, otp });

      if (res) {
        toast.success("Verification Successful!");
        if (type === "signup") {
          navigate("/login");
        } else if (type === "forgot") {
          navigate("/reset-password", { state: { email } });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP METHOD
  const handleResend = async () => {
    setLoading(true);
    try {
      // Calling endpoint: /auth/resend-otp with { email }
      const res = await resendOtpAPI({ email });

      if (res) {
        toast.success("A new verification code has been sent!");

        // RESET TIMER LOGIC
        setTimeLeft(120); // Start 2-minute timer again
        setCanResend(false); // Disable resend button
        setOtp(""); // Clear input field
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
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
          <div className="mb-2 text-center">
            <input
              type="text"
              className={`form-control form-control-lg text-center fw-bold ${timeLeft === 0 ? "is-invalid" : ""}`}
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
            {timeLeft > 0 ? (
              <small className="text-muted">
                Expires in:{" "}
                <span className="text-danger fw-bold">
                  {formatTime(timeLeft)}
                </span>
              </small>
            ) : (
              <small className="text-danger fw-bold">OTP Expired</small>
            )}
          </div>

          <button
            className="btn btn-lg w-100 text-white shadow mb-3"
            style={{ backgroundColor: "#001f3f", borderRadius: "10px" }}
            disabled={loading || timeLeft === 0}>
            {loading ? "Checking..." : "Confirm"}
          </button>
        </form>

        <div className="text-center">
          <p className="small text-muted">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={!canResend || loading}
              className="btn btn-link btn-sm p-0 fw-bold text-decoration-none"
              style={{ color: canResend ? "#001f3f" : "#ccc" }}>
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
