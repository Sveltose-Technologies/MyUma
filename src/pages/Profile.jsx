import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "../utils/storage";
import { getProfileAPI, updateProfileAPI } from "../features/auth/api";
import { getImgURL } from "../services/authService";

const ProfileUpdate = () => {
  const [role, setRole] = useState("user");
  const [profileImage, setProfileImage] = useState(null); // For local preview
  const [dbImage, setDbImage] = useState(""); // Path from Database

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
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

 const [selectedFile, setSelectedFile] = useState(null);
 const [previewImage, setPreviewImage] = useState(null);

 const handleImageChange = (e) => {
   if (e.target.files && e.target.files[0]) {
     const file = e.target.files[0];
     setSelectedFile(file); // This goes to the API
     setPreviewImage(URL.createObjectURL(file)); // This shows the preview on screen
   }
 };
  // 1. Fetch Profile and Sync with LocalStorage immediately
 const getprofileHandler = async () => {
   const user = getUser();
   const userId = user?._id || user?.id;
   if (!userId) return;

   try {
     const res = await getProfileAPI(userId);
     // Agar data 'res.auth' mein hai to usey nikaalein
     const profile = res?.auth || res?.data || res;

     if (profile) {
       setFormData({
         fullName: profile.fullName || "",
         email: profile.email || "",
         address: profile.address || "",
       });
       setRole(profile.role || "user");
       setDbImage(profile.profileImage || "");

       // LocalStorage ko sync karein taaki Navbar purana photo na dikhaye
       localStorage.setItem("user", JSON.stringify(profile));
       window.dispatchEvent(new Event("storage"));
     }
   } catch (error) {
     console.error("Error:", error);
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
  data.append("role", role);
  if (selectedFile) {
    data.append("profileImage", selectedFile);
  }

  try {
    const response = await updateProfileAPI(userId, data);

    // Dhyaan dein: Aapka data 'response.auth' ke andar hai
    if (response && response.auth) {
      // Navbar ko image dikhane ke liye ye line sabse zaroori hai:
      localStorage.setItem("user", JSON.stringify(response.auth));

      // Navbar ko turant batane ke liye ki data badal gaya hai
      window.dispatchEvent(new Event("storage"));

      toast.success("Profile Updated Successfully! ✨");
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
                        profileImage ||
                        (dbImage
                          ? getImgURL(dbImage.trim())
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
                      }}>
                      <span style={{ fontSize: "18px" }}>📷</span>
                      <input
                        type="file"
                        id="avatarUpload"
                        hidden
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <h5 className="fw-bold mb-1">{formData.fullName}</h5>
                  <p className="small opacity-75 text-capitalize">{role}</p>
                  <hr className="my-4 opacity-25" />
                </div>

                {/* Right Side Form */}
                <div className="col-md-8 bg-white p-4 p-md-5">
                  <h3
                    className="fw-bold mb-4"
                    style={{ color: themeStyles.charcoal }}>
                    Account Settings
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="small fw-bold text-muted mb-2 d-block">
                        ACCOUNT TYPE
                      </label>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className={`btn btn-sm flex-fill py-2 ${role === "user" ? "btn-dark" : "btn-outline-secondary"}`}
                          onClick={() => setRole("user")}>
                          User
                        </button>
                        <button
                          type="button"
                          className={`btn btn-sm flex-fill py-2 ${role === "owner" ? "btn-dark" : "btn-outline-secondary"}`}
                          onClick={() => setRole("owner")}>
                          Owner
                        </button>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="small fw-bold text-muted">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className="form-control bg-light border-0 shadow-sm"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small fw-bold text-muted">
                          E-mail
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control bg-light border-0 shadow-sm"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="small fw-bold text-muted">
                          Address
                        </label>
                        <textarea
                          name="address"
                          className="form-control bg-light border-0 shadow-sm"
                          rows="3"
                          value={formData.address}
                          onChange={handleInputChange}></textarea>
                      </div>
                    </div>

                    <div className="mt-5">
                      <button
                        type="submit"
                        className="btn btn-lg text-white px-5 fw-bold"
                        style={{ backgroundColor: themeStyles.primaryBg }}>
                        Save Changes
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
