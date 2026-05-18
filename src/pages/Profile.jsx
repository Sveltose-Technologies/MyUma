import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "../utils/storage";
import { getProfileAPI, updateProfileAPI } from "../features/auth/api";
import { getImgURL } from "../services/authService";

const ProfileUpdate = () => {
  // Lock role to "owner"
  const [role, setRole] = useState("owner");
  const [dbImage, setDbImage] = useState(""); // Image from Server
  const [selectedFile, setSelectedFile] = useState(null); // File for API
  const [previewImage, setPreviewImage] = useState(null); // Local Preview URL

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const themeStyles = {
    primaryBg: "#001f3f",
    accentColor: "#f39c12",
    charcoal: "#2c3e50",
    cardRadius: "16px",
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview immediately
    }
  };

  const getprofileHandler = async () => {
    const user = getUser();
    const userId = user?._id || user?.id;
    if (!userId) return;

    try {
      const res = await getProfileAPI(userId);
      const profile = res?.auth || res?.data || res;

      if (profile) {
        setFormData({
          fullName: profile.fullName || "",
          email: profile.email || "",
          address: profile.address || "",
        });
        setRole("owner"); // Ensure it stays owner on this page
        setDbImage(profile.profileImage || "");

        localStorage.setItem("user", JSON.stringify(profile));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getUser();
    const userId = user?._id || user?.id;
    if (!userId) return;

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("role", "owner"); // Always send owner
    if (selectedFile) {
      data.append("profileImage", selectedFile);
    }

    try {
      const response = await updateProfileAPI(userId, data);
      if (response && response.auth) {
        localStorage.setItem("user", JSON.stringify(response.auth));
        window.dispatchEvent(new Event("storage"));
        toast.success("Owner Profile Updated Successfully! ✨");
        setDbImage(response.auth.profileImage);
        setSelectedFile(null);
      }
    } catch (error) {
      toast.error("Failed to update profile ❌");
    }
  };

  useEffect(() => {
    getprofileHandler();
  }, []);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card border-0 shadow-lg overflow-hidden"
              style={{ borderRadius: themeStyles.cardRadius }}>
              <div className="row g-0">
                {/* Left Sidebar */}
                <div
                  className="col-md-4 text-white text-center p-4"
                  style={{ backgroundColor: themeStyles.primaryBg }}>
                  <div className="position-relative d-inline-block mb-3 mt-4">
                    <img
                      src={
                        previewImage ||
                        (dbImage
                          ? getImgURL(dbImage)
                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png")
                      }
                      alt="Avatar"
                      className="rounded-circle border border-4 border-white shadow"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        backgroundColor: "#eee",
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                      }}
                    />
                    <label
                      htmlFor="avatarUpload"
                      className="position-absolute bottom-0 end-0 bg-warning rounded-circle p-2 shadow"
                      style={{
                        cursor: "pointer",
                        width: "40px",
                        height: "40px",
                        border: "2px solid white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      <span>📷</span>
                      <input
                        type="file"
                        id="avatarUpload"
                        hidden
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <h5 className="fw-bold mb-1 text-truncate px-2">
                    {formData.fullName || "Owner Name"}
                  </h5>
                  <p className="small opacity-75 text-uppercase letter-spacing-1">
                    Business Owner
                  </p>
                  <hr className="my-4 opacity-25" />
                </div>

                {/* Right Side Form */}
                <div className="col-md-8 bg-white p-4 p-md-5">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3
                      className="fw-bold m-0"
                      style={{ color: themeStyles.charcoal }}>
                      Owner Settings
                    </h3>
                    <span className="badge bg-primary px-3 py-2">
                      Owner Account
                    </span>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-md-12">
                        <label className="small fw-bold text-muted mb-1 text-uppercase">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className="form-control bg-light border-0 shadow-sm py-2"
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-12">
                        <label className="small fw-bold text-muted mb-1 text-uppercase">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control bg-light border-0 shadow-sm py-2"
                          placeholder="owner@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-12">
                        <label className="small fw-bold text-muted mb-1 text-uppercase">
                          Business / Personal Address
                        </label>
                        <textarea
                          name="address"
                          className="form-control bg-light border-0 shadow-sm"
                          rows="3"
                          placeholder="Enter full address"
                          value={formData.address}
                          onChange={handleInputChange}></textarea>
                      </div>
                    </div>

                    <div className="mt-5">
                      <button
                        type="submit"
                        className="btn btn-lg text-white px-5 fw-bold w-100"
                        style={{
                          backgroundColor: themeStyles.primaryBg,
                          borderRadius: "10px",
                        }}>
                        Update Owner Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
