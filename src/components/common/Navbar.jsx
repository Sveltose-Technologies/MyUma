import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { getLogoAPI, getImgURL } from "../../services/authService";
 
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
 
  const { token, user: userData } = useSelector((state) => state.auth);
 
  const [logoUrl, setLogoUrl] = useState("");
  const [imageError, setImageError] = useState(false);
 
  const role = userData?.role;
  const fullName = userData?.fullName || "Guest";
  const profileImgPath = userData?.profileImage;
  const firstLetter = fullName.charAt(0).toUpperCase();
 
  const isActive = (path) => location.pathname === path;
 
  // Reset image error state when profile image changes to allow real-time update
  useEffect(() => {
    setImageError(false);
  }, [profileImgPath]);
 
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await getLogoAPI();
        if (res?.logo?.logo) {
          setLogoUrl(getImgURL(res.logo.logo));
        }
      } catch (error) {
        console.error("Failed to fetch logo", error);
      }
    };
    fetchLogo();
  }, []);
 
  const handleNavigation = (path) => {
    navigate(path);
    const offcanvasElement = document.getElementById("navbarOffcanvas");
    if (offcanvasElement) {
      const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };
 
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
 
  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top shadow-sm w-100 border-0 py-2">
      <div className="container px-4">
        <Link className="navbar-brand d-flex align-items-center text-decoration-none" to="/">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              style={{ maxHeight: "45px", width: "auto", objectFit: "contain" }}
            />
          ) : (
            <span className="brand-text text-dark fs-3 fw-bold">
              My<span className="text-tan">Uma</span>
            </span>
          )}
        </Link>
 
        <button
          className="navbar-toggler border-0 shadow-none bg-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvas">
          <span className="navbar-toggler-icon"></span>
        </button>
 
        <div className="offcanvas offcanvas-end bg-white border-0" id="navbarOffcanvas" tabIndex="-1">
          <div className="offcanvas-header px-4 pt-4 border-bottom">
            <h5 className="offcanvas-title text-dark fw-bold">Menu</h5>
            <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas"></button>
          </div>
 
          <div className="offcanvas-body align-items-center">
            <ul className="navbar-nav mx-auto text-start text-lg-center mb-4 mb-lg-0 w-100 justify-content-center align-items-lg-center gap-lg-2">
              <li className="nav-item">
                <button onClick={() => handleNavigation("/")} className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/") ? "active text-tan" : ""}`}>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => handleNavigation("/pricing")} className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/pricing") ? "active text-tan" : ""}`}>
                  Pricing
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => handleNavigation("/blog")} className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/blog") ? "active text-tan" : ""}`}>
                  Blog
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => handleNavigation("/contact")} className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/contact") ? "active text-tan" : ""}`}>
                  Contact us
                </button>
              </li>
 
              {token && role === "owner" && (
                <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
                  <button onClick={() => handleNavigation("/listing")} className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0" style={{ fontSize: "13px", borderRadius: "20px", padding: "8px 20px" }}>
                    New Listing
                  </button>
                </li>
              )}
            </ul>
 
            <div className="d-flex align-items-center mt-3 mt-lg-0 ms-lg-3 ps-lg-3 border-lg-start">
              {token ? (
                <div className="dropdown">
                  <button className="btn bg-transparent border-0 p-0 d-flex align-items-center flex-nowrap gap-3 shadow-none dropdown-toggle-no-caret" type="button" data-bs-toggle="dropdown">
                    <div className="text-end" style={{ lineHeight: "1.1" }}>
                      <div className="fw-bold text-black" style={{ fontSize: "14px", whiteSpace: "nowrap", maxWidth: "130px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {fullName}
                      </div>
                      <small className="text-muted text-capitalize d-block" style={{ fontSize: "11px" }}>
                        {role}
                      </small>
                    </div>
 
                    {profileImgPath && !imageError ? (
                      <img
                        key={profileImgPath} // Force re-render when path changes
                        src={getImgURL(profileImgPath)}
                        alt="Profile"
                        className="rounded-circle border"
                        style={{ width: "42px", height: "42px", objectFit: "cover" }}
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: "42px", height: "42px", backgroundColor: "#001f3f", fontSize: "18px", border: "2px solid #f39c12" }}>
                        {firstLetter}
                      </div>
                    )}
                  </button>
 
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                    {role === "owner" && (
                      <>
                        <li><button className="dropdown-item py-2" onClick={() => handleNavigation("/listing")}>My Listing</button></li>
                        <li><button className="dropdown-item py-2" onClick={() => handleNavigation("/reviews")}>Reviews</button></li>
                        <li><button className="dropdown-item py-2" onClick={() => handleNavigation("/booking")}>Bookmarks</button></li>
                        <li><button className="dropdown-item py-2" onClick={() => handleNavigation("/profile")}>My Profile</button></li>
                        <li><hr className="dropdown-divider" /></li>
                      </>
                    )}
 
                    {role === "user" && (
                      <li>
                        <button className="dropdown-item py-2 fw-bold" onClick={() => handleNavigation("/user-update-profile")}>
                          My Account
                        </button>
                      </li>
                    )}
 
                    <li>
                      <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button onClick={() => handleNavigation("/login")} className="uma-btn-navy py-2 px-4 fw-bold text-nowrap shadow-none border-0" style={{ borderRadius: "20px" }}>
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}