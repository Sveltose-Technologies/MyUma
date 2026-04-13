import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProfile } from "../features/auth/api";
import { getUser } from "../utils/storage";

const ProfileUpdate = () => {
  const [role, setRole] = useState("guest");
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    address: "",
  });

  const themeStyles = {
    primaryBg: "#001f3f", // Deep Indigo
    accentColor: "#f39c12", // Professional Gold/Orange
    charcoal: "#2c3e50",
    cardRadius: "16px",
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const getprofileHandler = async () => {
    const user = await getUser("user"); // Assuming you store user ID in localStorage after login
    console.log("user", user);

    try {
      // const response = await getProfile(userId); // replace userId with actual user ID
    } catch (error) {
      console.log(error);
    } // API call to fetch profile data and set it to state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile Updated Successfully! ✨");
    // API logic here
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
              style={{ borderRadius: themeStyles.cardRadius }}
            >
              <div className="row g-0">
                {/* Left Sidebar - Profile Summary */}
                <div
                  className="col-md-4 text-white text-center p-4"
                  style={{ backgroundColor: themeStyles.primaryBg }}
                >
                  <div className="position-relative d-inline-block mb-3">
                    <img
                      src={profileImage || "https://via.placeholder.com/120"}
                      alt="Avatar"
                      className="rounded-circle border border-4 border-white shadow"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                    <label
                      htmlFor="avatarUpload"
                      className="position-absolute bottom-0 end-0 bg-warning rounded-circle p-2 shadow-sm"
                      style={{
                        cursor: "pointer",
                        width: "35px",
                        height: "35px",
                      }}
                    >
                      <span className="text-dark small">📷</span>
                      <input
                        type="file"
                        id="avatarUpload"
                        hidden
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <h5 className="fw-bold mb-1">Update Avatar</h5>
                  <p className="small opacity-75">
                    Make your profile stand out
                  </p>

                  <hr className="my-4 opacity-25" />

                  <div className="nav flex-column nav-pills small fw-bold">
                    <span className="mb-2 d-block opacity-50 text-uppercase">
                      Current Role
                    </span>
                    <div className="bg-white text-dark py-2 rounded-3 shadow-sm text-capitalize">
                      {role}
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="col-md-8 bg-white p-4 p-md-5">
                  <h3
                    className="fw-bold mb-4"
                    style={{ color: themeStyles.charcoal }}
                  >
                    Account Settings
                  </h3>

                  <form onSubmit={handleSubmit}>
                    {/* Role Selection */}
                    <div className="mb-4">
                      <label className="small fw-bold text-muted mb-2 d-block text-uppercase">
                        Account Type
                      </label>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className={`btn btn-sm flex-fill py-2 transition-all ${role === "guest" ? "btn-dark shadow" : "btn-outline-secondary opacity-50"}`}
                          onClick={() => setRole("guest")}
                        >
                          Guest
                        </button>
                        <button
                          type="button"
                          className={`btn btn-sm flex-fill py-2 transition-all ${role === "owner" ? "btn-dark shadow" : "btn-outline-secondary opacity-50"}`}
                          onClick={() => setRole("owner")}
                        >
                          Owner
                        </button>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control py-2 bg-light border-0 shadow-sm"
                          placeholder="John"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">
                          E-mail
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control py-2 bg-light border-0 shadow-sm"
                          placeholder="john@example.com"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="small fw-bold text-muted mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control py-2 bg-light border-0 shadow-sm"
                          placeholder="••••••••"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="small fw-bold text-muted mb-1">
                          Address
                        </label>
                        <textarea
                          name="address"
                          className="form-control py-2 bg-light border-0 shadow-sm"
                          rows="3"
                          placeholder="123 Luxury St, Appartment 4B"
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-5 d-flex gap-3">
                      <button
                        type="submit"
                        className="btn btn-lg text-white px-5 fw-bold shadow-sm"
                        style={{ backgroundColor: themeStyles.primaryBg }}
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-lg btn-link text-decoration-none text-muted small"
                      >
                        Cancel
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
