import React, { useState } from "react";
import { resetPasswordAPI } from "../../services/authService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  if (!email) {
    navigate("/forgot-password");
    return null;
  }
const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword)
    return toast.error("Passwords do not match");

  setLoading(true);
  try {
    const res = await resetPasswordAPI({
      email,
      newPassword: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    // Check if backend returns role during reset
    if (res.data?.role === "admin") {
      toast.error("Admin cannot perform this action here.");
      navigate("/login");
      return;
    }

    toast.success("Password reset successful! Please login.");
    navigate("/login");
  } catch (err) {
    toast.error(err.response?.data?.message || "Reset Failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card shadow border-0 p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "16px" }}>
        <h4 className="fw-bold text-center mb-4">New Password</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            required
            className="form-control mb-3 py-2"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="form-control mb-4 py-2"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <button
            className="btn btn-lg w-100 text-white"
            style={{ backgroundColor: "#001f3f" }}
            disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
