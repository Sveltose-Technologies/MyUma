import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, verifyOtp, logout } from "./authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordAPI,
  resetPasswordAPI,
  verifyOtpAPI,
  getImgURL, // Imported your image helper
} from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpEmail, isLoading } = useSelector((state) => state.auth);

  // --- Session Management (24 Hours) ---
  const SESSION_DURATION = 24 * 60 * 60 * 1000;
  const startSession = () => {
    const expiryTime = Date.now() + SESSION_DURATION;
    localStorage.setItem("sessionExpiry", expiryTime.toString());
  };

  useEffect(() => {
    const expiry = localStorage.getItem("sessionExpiry");
    if (expiry && Date.now() > parseInt(expiry)) {
      dispatch(logout());
      toast.warn("Session expired. Please login again.");
    }
  }, [dispatch]);

  // --- UI States ---
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [mode, setMode] = useState("auth");
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    country: "",
    city: "",
    contactNo: "",
    role: "user",
    status: "deactive", // Defaulted to deactive
    profileImage: null,
  });

  const [changePasswordData, setChangePasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRegisterData({ ...registerData, profileImage: file });
      setImagePreview(URL.createObjectURL(file)); // Create local preview
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(loginData));
    if (res.meta.requestStatus === "fulfilled") {
      startSession();
      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error(res.payload || "Login Failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", registerData.fullName);
    formData.append("email", registerData.email);
    formData.append("password", registerData.password);
    formData.append("address", registerData.address);
    formData.append("country", registerData.country);
    formData.append("city", registerData.city);
    formData.append("contactNo", registerData.contactNo);
    formData.append("role", registerData.role);
    formData.append("status", registerData.status);
    if (registerData.profileImage) {
      formData.append("profileImage", registerData.profileImage);
    }

    const res = await dispatch(registerUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP sent to your email");
      setShowOtp(true);
      setMode("auth");
    } else {
      toast.error(res.payload || "Signup Failed");
    }
  };

  // Login.js mein handleVerifyOtp function:
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const emailToVerify = mode === "forgot" ? resetEmail : otpEmail;

    if (mode === "forgot") {
      // ... forgot logic
    } else {
      const res = await dispatch(verifyOtp({ email: emailToVerify, otp }));

      if (res.meta.requestStatus === "fulfilled") {
        startSession();
        toast.success("Registration Successful!");

        // Navigate to pricing - data ab localStorage mein aa chuka hai
        navigate("/pricing");
      } else {
        toast.error(res.payload || "Invalid OTP");
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPasswordAPI({ email: resetEmail });
      setMode("forgot");
      setShowOtp(true);
      toast.info("Reset OTP sent to " + resetEmail);
    } catch (err) {
      toast.error("User not found");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (changePasswordData.password !== changePasswordData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await resetPasswordAPI({
        email: resetEmail,
        newPassword: changePasswordData.password,
        confirmPassword: changePasswordData.confirmPassword,
      });
      if (res?.message === "Password reset successful") {
        toast.success("Password reset successfully");
        setShowResetModal(false);
        setIsLoginTab(true);
      }
    } catch (err) {
      toast.error("Reset Failed");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              className="card border-0 shadow-lg p-4"
              style={{ borderRadius: "16px" }}>
              <h2
                className="fw-bold text-center mb-4"
                style={{ color: "#001f3f" }}>
                MyUma
              </h2>

              {showOtp ? (
                <form onSubmit={handleVerifyOtp}>
                  <p className="text-center text-muted mb-4">
                    Enter verification code
                  </p>
                  <input
                    type="text"
                    className="form-control form-control-lg mb-3 text-center"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <button
                    className="btn btn-lg w-100 text-white"
                    style={{ backgroundColor: "#001f3f" }}
                    disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify Account"}
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
                      <div className="mb-3">
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
                          style={{ color: "#f39c12" }}
                          data-bs-toggle="modal"
                          data-bs-target="#forgotModal">
                          Forgot Password?
                        </button>
                      </div>
                      <button
                        className="btn btn-lg w-100 text-white shadow-sm border-0"
                        style={{ backgroundColor: "#001f3f" }}>
                        Sign In
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleRegister}>
                      <div className="mb-3">
                        <label className="small fw-bold text-muted mb-2 d-block text-center">
                          Register As
                        </label>
                        <div className="d-flex gap-2 justify-content-center mb-4">
                          <button
                            type="button"
                            className={`btn btn-sm px-4 border ${registerData.role === "owner" ? "btn-dark" : "btn-outline-secondary"}`}
                            onClick={() =>
                              setRegisterData({
                                ...registerData,
                                role: "owner",
                              })
                            }>
                            Owner
                          </button>
                          <button
                            type="button"
                            className={`btn btn-sm px-4 border ${registerData.role === "user" ? "btn-dark" : "btn-outline-secondary"}`}
                            onClick={() =>
                              setRegisterData({ ...registerData, role: "user" })
                            }>
                            Guest
                          </button>
                        </div>
                      </div>

                      {/* Profile Image Section using getImgURL */}
                      <div className="text-center mb-4">
                        <div className="position-relative d-inline-block">
                          <img
                            src={imagePreview ? imagePreview : getImgURL(null)}
                            alt="Profile Preview"
                            className="rounded-circle border shadow-sm"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                          <label
                            htmlFor="profileUpload"
                            className="btn btn-sm btn-dark position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "32px", height: "32px" }}>
                            <i className="bi bi-camera"></i>
                            <input
                              type="file"
                              id="profileUpload"
                              hidden
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                        <p className="small text-muted mt-2">
                          Upload Profile Picture
                        </p>
                      </div>

                      <div className="row g-2 mb-2">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="Full Name"
                            required
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                fullName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="email"
                            className="form-control shadow-sm"
                            placeholder="Email Address"
                            required
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="row g-2 mb-2">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="Contact Number"
                            required
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                contactNo: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="City"
                            required
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                city: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="row g-2 mb-2">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="Country"
                            required
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                country: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="password"
                            title="password"
                            className="form-control shadow-sm"
                            placeholder="Password"
                            required
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <textarea
                        className="form-control shadow-sm mb-4"
                        placeholder="Complete Address"
                        rows="2"
                        required
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            address: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btn btn-lg w-100 text-white fw-bold shadow-sm border-0"
                        style={{ backgroundColor: "#001f3f" }}>
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

      {/* Forgot Password Modal */}
      <div className="modal fade" id="forgotModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content border-0 shadow"
            style={{ borderRadius: "16px" }}>
            <div className="modal-body p-4 text-center">
              <h4 className="fw-bold mb-3">Forgot Password</h4>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter Registered Email"
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <button
                className="btn w-100 text-white"
                style={{ backgroundColor: "#001f3f" }}
                onClick={handleForgotPassword}
                data-bs-dismiss="modal">
                Send Reset Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Modal */}
      {showResetModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Set New Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowResetModal(false)}></button>
              </div>
              <form onSubmit={handleResetPassword}>
                <div className="modal-body">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="form-control mb-3"
                    required
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
                    className="form-control mb-3"
                    required
                    onChange={(e) =>
                      setChangePasswordData({
                        ...changePasswordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="submit"
                    className="btn text-white w-100"
                    style={{ backgroundColor: "#001f3f" }}>
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};;

export default Login;
