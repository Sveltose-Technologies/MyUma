import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, verifyOtp } from "./authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../utils/storage";
// FIXED IMPORT PATH BELOW
import {
  forgotPasswordAPI,
  resetPasswordAPI,
  verifyOtpAPI,
} from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpEmail } = useSelector((state) => state.auth);

  const SESSION_DURATION = 24 * 60 * 60 * 1000;

  const startSession = () => {
    const expiryTime = Date.now() + SESSION_DURATION;
    localStorage.setItem("sessionExpiry", expiryTime.toString());
  };

  useEffect(() => {
    const expiry = localStorage.getItem("sessionExpiry");
    if (expiry && Date.now() > parseInt(expiry)) {
      localStorage.clear();
      sessionStorage.clear();
      toast.warn("Session expired. Please login again.");
    }
  }, []);

  const [mode, setMode] = useState("login");
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const [changePasswordData, setChangePasswordData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [role, setRole] = useState("guest");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
  });

  const handleCloseModal = () => setShowModal(false);

  const themeStyles = {
    primaryBg: "#001f3f",
    accentColor: "#f39c12",
    cardRadius: "16px",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(loginData));
    if (res.meta.requestStatus === "fulfilled") {
      setUser(res?.payload?.auth);
      setToken(res?.payload?.auth?.token);
      startSession();
      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error(res.payload || "Login Failed ❌");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      registerUser({
        ...registerData,
        role: role === "owner" ? "admin" : "user",
      }),
    );
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP sent 📩");
      setShowOtp(true);
    } else {
      toast.error(res.payload || "Signup Failed ❌");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (mode === "otp-forgot") {
      try {
        const res = await verifyOtpAPI({ email: resetEmail, otp: otp });
        if (res?.message === "OTP verified successfully") {
          toast.success("OTP verified ✅");
          setShowOtp(false);
          setShowModal(true);
          return;
        }
      } catch (err) {
        toast.error("OTP Failed ❌");
      }
      return;
    }

    const res = await dispatch(verifyOtp({ email: otpEmail, otp: otp }));
    if (res.meta.requestStatus === "fulfilled") {
      startSession();
      toast.success("Signup Successful ✅");
      navigate("/pricing");
    } else {
      toast.error(res.payload || "Invalid OTP ❌");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await forgotPasswordAPI({ email: resetEmail });
    setShowOtp(true);
    setMode("otp-forgot");
    toast.info(`Reset OTP sent to ${resetEmail}`);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (changePasswordData.password !== changePasswordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await resetPasswordAPI({
        email: resetEmail,
        newPassword: changePasswordData.password,
        confirmPassword: changePasswordData.confirmPassword,
      });
      if (res?.message === "Password reset successful") {
        toast.success("Password reset successful ✅");
        handleCloseModal();
        setShowOtp(false);
        setMode("login");
        setIsLoginTab(true);
        navigate("/login");
      }
    } catch (err) {
      toast.error("Reset failed ❌");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div
              className="card border-0 shadow-lg p-4"
              style={{ borderRadius: themeStyles.cardRadius }}>
              <h2
                className="fw-bold text-center mb-4"
                style={{ color: themeStyles.primaryBg }}>
                MyUma
              </h2>

              {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4">
                      <div className="modal-header">
                        <h5 className="modal-title">Change Password</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={handleCloseModal}></button>
                      </div>
                      <form onSubmit={handleChangePassword}>
                        <div className="modal-body">
                          <input
                            type="email"
                            className="form-control mb-3"
                            value={resetEmail}
                            readOnly
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            name="password"
                            className="form-control mb-3"
                            onChange={(e) =>
                              setChangePasswordData({
                                ...changePasswordData,
                                password: e.target.value,
                              })
                            }
                          />
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className="form-control mb-3"
                            onChange={(e) =>
                              setChangePasswordData({
                                ...changePasswordData,
                                confirmPassword: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCloseModal}>
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn text-white"
                            style={{ backgroundColor: themeStyles.primaryBg }}>
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {showOtp ? (
                <form onSubmit={handleVerifyOtp}>
                  <p className="text-center text-muted mb-4">
                    Verification code sent to your email.
                  </p>
                  <input
                    type="text"
                    className="form-control form-control-lg mb-3 text-center"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    className="btn btn-lg w-100 text-white"
                    style={{ backgroundColor: themeStyles.primaryBg }}>
                    Verify Account
                  </button>
                </form>
              ) : (
                <>
                  <div className="p-1 mb-4 d-flex bg-light rounded-3 border">
                    <button
                      className={`btn w-50 py-2 border-0 ${isLoginTab ? "bg-white shadow-sm fw-bold" : "text-muted"}`}
                      onClick={() => setIsLoginTab(true)}>
                      Login
                    </button>
                    <button
                      className={`btn w-50 py-2 border-0 ${!isLoginTab ? "bg-white shadow-sm fw-bold" : "text-muted"}`}
                      onClick={() => setIsLoginTab(false)}>
                      Register
                    </button>
                  </div>

                  {isLoginTab ? (
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <label className="small fw-bold text-muted mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control py-2 shadow-sm"
                          placeholder="name@example.com"
                          required
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-2">
                        <label className="small fw-bold text-muted mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control py-2 shadow-sm"
                          placeholder="••••••••"
                          required
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="text-end mb-4">
                        <button
                          type="button"
                          className="btn btn-link p-0 text-decoration-none small fw-bold"
                          style={{
                            color: themeStyles.accentColor,
                            fontSize: "0.85rem",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#forgotPasswordModal">
                          Forgot Password?
                        </button>
                      </div>
                      <button
                        className="btn btn-lg w-100 text-white shadow-sm border-0"
                        style={{ backgroundColor: themeStyles.primaryBg }}>
                        Sign In
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleRegister}>
                      <div className="mb-3">
                        <label className="small fw-bold text-muted mb-2 d-block">
                          Register As
                        </label>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className={`btn btn-sm flex-fill border ${role === "owner" ? "btn-dark" : "btn-outline-secondary"}`}
                            onClick={() => setRole("owner")}>
                            Owner
                          </button>
                          <button
                            type="button"
                            className={`btn btn-sm flex-fill border ${role === "guest" ? "btn-dark" : "btn-outline-secondary"}`}
                            onClick={() => setRole("guest")}>
                            Guest
                          </button>
                        </div>
                      </div>
                      <div className="row g-2 mb-2">
                        <div className="col-12">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                fullName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-12">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Password"
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                      />
                      <textarea
                        className="form-control mb-4"
                        placeholder="Address"
                        rows="2"
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            address: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btn btn-lg w-100 text-white fw-bold"
                        style={{ backgroundColor: themeStyles.primaryBg }}>
                        Create Account
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex="-1"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content border-0 shadow"
            style={{ borderRadius: themeStyles.cardRadius }}>
            <div className="modal-header border-0 pb-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body p-4 pt-0 text-center">
              <div className="display-6 mb-2">🔑</div>
              <h4 className="fw-bold">Forgot Password?</h4>
              <p className="text-muted small">
                Enter your email for a reset OTP.
              </p>
              <form onSubmit={handleForgotPassword}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control py-2"
                    placeholder="name@example.com"
                    value={resetEmail}
                    required
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100 text-white fw-bold py-2 shadow-sm"
                  style={{ backgroundColor: themeStyles.primaryBg }}
                  data-bs-dismiss="modal">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
