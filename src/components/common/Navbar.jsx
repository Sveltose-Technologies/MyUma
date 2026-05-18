// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { clearStorage } from "../../utils/storage";
// import { getLogoAPI, getImgURL } from "../../services/authService";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const token = localStorage.getItem("token");

//   // Get user data from localStorage
// const userData = JSON.parse(localStorage.getItem("user") || "{}");
//   const role = userData?.role;
//   const fullName = userData?.fullName;

// const profileImgPath = userData?.profileImage;

//   const [logoUrl, setLogoUrl] = useState("");
//   const [imageError, setImageError] = useState(false);

//   // Function to check if a link is active
//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogo = async () => {
//       try {
//         const res = await getLogoAPI();
//         if (res && res.logo && res.logo.logo) {
//           const finalUrl = getImgURL(res.logo.logo);
//           setLogoUrl(finalUrl);
//         }
//       } catch (error) {
//         console.error("Failed to fetch logo", error);
//       }
//     };
//     fetchLogo();
//   }, []);

//   const handleNavigation = (path) => {
//     navigate(path);
//     const offcanvasElement = document.getElementById("navbarOffcanvas");
//     if (offcanvasElement) {
//       const bsOffcanvas =
//         window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
//       if (bsOffcanvas) bsOffcanvas.hide();
//     }
//   };

//   const handleLogout = () => {
//     clearStorage();
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm w-100 border-0 py-2">
//       <div className="container px-4">
//         {/* Logo Section */}
//         <Link
//           className="navbar-brand d-flex align-items-center text-decoration-none"
//           to="/">
//           {logoUrl && !imageError ? (
//             <img
//               src={logoUrl}
//               alt="Logo"
//               onError={() => setImageError(true)}
//               style={{ maxHeight: "45px", width: "auto", objectFit: "contain" }}
//             />
//           ) : (
//             <span className="brand-text text-dark fs-3 fw-bold">
//               My<span className="text-tan">Uma</span>
//             </span>
//           )}
//         </Link>

//         {/* Mobile Toggler */}
//         <button
//           className="navbar-toggler border-0 shadow-none bg-light"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#navbarOffcanvas">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Offcanvas Menu */}
//         <div
//           className="offcanvas offcanvas-end bg-white border-0"
//           id="navbarOffcanvas"
//           tabIndex="-1">
//           <div className="offcanvas-header px-4 pt-4 border-bottom">
//             <h5 className="offcanvas-title text-dark fw-bold">Menu</h5>
//             <button
//               type="button"
//               className="btn-close shadow-none"
//               data-bs-dismiss="offcanvas"></button>
//           </div>

//           <div className="offcanvas-body align-items-center">
//             {/* Center Navigation Links */}
//             <ul className="navbar-nav mx-auto text-start text-lg-center mb-4 mb-lg-0 w-100 justify-content-center align-items-lg-center gap-lg-2">
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/") ? "active text-tan" : ""}`}
//                   style={{ color: isActive("/") ? "var(--tan)" : "black" }}>
//                   Home
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/pricing")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/pricing") ? "active text-tan" : ""}`}
//                   style={{
//                     color: isActive("/pricing") ? "var(--tan)" : "black",
//                   }}>
//                   Pricing
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/blog")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/blog") ? "active text-tan" : ""}`}
//                   style={{ color: isActive("/blog") ? "var(--tan)" : "black" }}>
//                   Blog
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/contact")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/contact") ? "active text-tan" : ""}`}
//                   style={{
//                     color: isActive("/contact") ? "var(--tan)" : "black",
//                   }}>
//                   Contact us
//                 </button>
//               </li>

//               {/* OWNER ONLY SECTION (My Account + Buttons) */}
//               {token && role === "owner" && (
//                 <li className="nav-item d-flex flex-column flex-lg-row align-items-lg-center gap-2 ms-lg-2 mt-2 mt-lg-0">
//                   <div className="dropdown">
//                     <button
//                       className="uma-btn-navy btn-sm px-3 dropdown-toggle shadow-none w-100"
//                       type="button"
//                       data-bs-toggle="dropdown"
//                       style={{ fontSize: "13px", textTransform: "none" }}>
//                       My Account
//                     </button>
//                     <ul className="dropdown-menu shadow border-0 mt-lg-2">
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/listing")}>
//                           My Listing
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/reviews")}>
//                           Reviews
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/bookmarks")}>
//                           Bookmarks
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/profile")}>
//                           My Profile
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                   <button
//                     onClick={() => handleNavigation("/listing")}
//                     className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
//                     style={{
//                       fontSize: "13px",
//                       borderRadius: "20px",
//                       padding: "8px 20px",
//                       textTransform: "none",
//                     }}>
//                     New Listing
//                   </button>
//                   <button
//                     onClick={() => handleNavigation("/browse")}
//                     className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
//                     style={{
//                       fontSize: "13px",
//                       borderRadius: "20px",
//                       padding: "8px 20px",
//                       textTransform: "none",
//                     }}>
//                     Browse Listings
//                   </button>
//                 </li>
//               )}
//             </ul>

//             {/* Right Side: Identity Section */}
//             <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 mt-3 mt-lg-0 ms-lg-3 border-lg-start ps-lg-3">
//               {token ? (
//                 <div className="dropdown">
//                   <button
//                     className="btn bg-transparent border-0 p-0 d-flex align-items-center gap-2 shadow-none"
//                     type="button"
//                     data-bs-toggle="dropdown">
//                     <div
//                       className="text-end d-none d-lg-block"
//                       style={{ lineHeight: "1" }}>
//                       <div
//                         className="fw-bold text-black"
//                         style={{ fontSize: "13px" }}>
//                         {fullName}
//                       </div>
//                       <small
//                         className="text-muted text-capitalize"
//                         style={{ fontSize: "10px" }}>
//                         {role}
//                       </small>
//                     </div>
//                     <img
//                       src={getImgURL(profileImgPath)}
//                       alt="Profile"
//                       className="rounded-circle border"
//                       style={{
//                         width: "42px",
//                         height: "42px",
//                         objectFit: "cover",
//                       }}
//                       onError={(e) => {
//                         // Agar link phir bhi na chale toh default icon dikhao
//                         e.target.src =
//                           "https://cdn-icons-png.flaticon.com/512/149/149071.png";
//                       }}
//                     />
//                   </button>
//                   <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
//                     <li>
//                       <button
//                         className="dropdown-item text-danger fw-bold"
//                         onClick={handleLogout}>
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => handleNavigation("/login")}
//                   className="uma-btn-navy py-2 px-4 fw-bold text-nowrap d-inline-block shadow-none border-0"
//                   style={{
//                     fontSize: "14px",
//                     borderRadius: "20px",
//                     textTransform: "none",
//                     whiteSpace: "nowrap",
//                     minWidth: "fit-content",
//                   }}>
//                   Sign In
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { clearStorage } from "../../utils/storage";
// import { getLogoAPI, getImgURL } from "../../services/authService";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const token = localStorage.getItem("token");

//   // Keep your exact data reading logic
//   // We use State here so the image updates instantly after clicking Save
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("user") || "{}"),
//   );

//   const role = userData?.role;
//   const fullName = userData?.fullName;
//   const profileImgPath = userData?.profileImage;

//   const [logoUrl, setLogoUrl] = useState("");
//   const [imageError, setImageError] = useState(false);

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     // This is the only change: it refreshes the image when you click Save on profile page
//     const syncProfile = () => {
//       setUserData(JSON.parse(localStorage.getItem("user") || "{}"));
//     };
//     window.addEventListener("storage", syncProfile);

//     const fetchLogo = async () => {
//       try {
//         const res = await getLogoAPI();
//         if (res && res.logo && res.logo.logo) {
//           const finalUrl = getImgURL(res.logo.logo);
//           setLogoUrl(finalUrl);
//         }
//       } catch (error) {
//         console.error("Failed to fetch logo", error);
//       }
//     };
//     fetchLogo();
//     return () => window.removeEventListener("storage", syncProfile);
//   }, []);

//   const handleNavigation = (path) => {
//     navigate(path);
//     const offcanvasElement = document.getElementById("navbarOffcanvas");
//     if (offcanvasElement) {
//       const bsOffcanvas =
//         window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
//       if (bsOffcanvas) bsOffcanvas.hide();
//     }
//   };

//   const handleLogout = () => {
//     clearStorage();
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm w-100 border-0 py-2">
//       <div className="container px-4">
//         <Link
//           className="navbar-brand d-flex align-items-center text-decoration-none"
//           to="/">
//           {logoUrl && !imageError ? (
//             <img
//               src={logoUrl}
//               alt="Logo"
//               onError={() => setImageError(true)}
//               style={{ maxHeight: "45px", width: "auto", objectFit: "contain" }}
//             />
//           ) : (
//             <span className="brand-text text-dark fs-3 fw-bold">
//               My<span className="text-tan">Uma</span>
//             </span>
//           )}
//         </Link>

//         <button
//           className="navbar-toggler border-0 shadow-none bg-light"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#navbarOffcanvas">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div
//           className="offcanvas offcanvas-end bg-white border-0"
//           id="navbarOffcanvas"
//           tabIndex="-1">
//           <div className="offcanvas-header px-4 pt-4 border-bottom">
//             <h5 className="offcanvas-title text-dark fw-bold">Menu</h5>
//             <button
//               type="button"
//               className="btn-close shadow-none"
//               data-bs-dismiss="offcanvas"></button>
//           </div>

//           <div className="offcanvas-body align-items-center">
//             <ul className="navbar-nav mx-auto text-start text-lg-center mb-4 mb-lg-0 w-100 justify-content-center align-items-lg-center gap-lg-2">
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/") ? "active text-tan" : ""}`}>
//                   Home
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/pricing")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/pricing") ? "active text-tan" : ""}`}>
//                   Pricing
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/blog")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/blog") ? "active text-tan" : ""}`}>
//                   Blog
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/contact")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/contact") ? "active text-tan" : ""}`}>
//                   Contact us
//                 </button>
//               </li>

//               {/* LOGIC UNCHANGED: Owner checks */}
//               {token && role === "owner" && (
//                 <li className="nav-item d-flex flex-column flex-lg-row align-items-lg-center gap-2 ms-lg-2 mt-2 mt-lg-0">
//                   <div className="dropdown">
//                     <button
//                       className="uma-btn-navy btn-sm px-3 dropdown-toggle shadow-none w-100"
//                       type="button"
//                       data-bs-toggle="dropdown"
//                       style={{ fontSize: "13px" }}>
//                       My Account
//                     </button>
//                     <ul className="dropdown-menu shadow border-0 mt-lg-2">
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/listing")}>
//                           My Listing
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/reviews")}>
//                           Reviews
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/bookmarks")}>
//                           Bookmarks
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/profile")}>
//                           My Profile
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                   <button
//                     onClick={() => handleNavigation("/listing")}
//                     className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
//                     style={{
//                       fontSize: "13px",
//                       borderRadius: "20px",
//                       padding: "8px 20px",
//                     }}>
//                     New Listing
//                   </button>
//                   <button
//                     onClick={() => handleNavigation("/browse")}
//                     className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
//                     style={{
//                       fontSize: "13px",
//                       borderRadius: "20px",
//                       padding: "8px 20px",
//                     }}>
//                     Browse Listings
//                   </button>
//                 </li>
//               )}
//             </ul>

//             {/* IDENTITY SECTION (Show Profile Image) */}
//             <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 mt-3 mt-lg-0 ms-lg-3 border-lg-start ps-lg-3">
//               {token ? (
//                 <div className="dropdown">
//                   <button
//                     className="btn bg-transparent border-0 p-0 d-flex align-items-center gap-2 shadow-none"
//                     type="button"
//                     data-bs-toggle="dropdown">
//                     <div
//                       className="text-end d-none d-lg-block"
//                       style={{ lineHeight: "1" }}>
//                       <div
//                         className="fw-bold text-black"
//                         style={{ fontSize: "13px" }}>
//                         {fullName}
//                       </div>
//                       <small
//                         className="text-muted text-capitalize"
//                         style={{ fontSize: "10px" }}>
//                         {role}
//                       </small>
//                     </div>
//                     {/* PROFILE IMAGE SHOWING HERE */}
//                     <img
//                       src={getImgURL(profileImgPath)}
//                       alt="Profile"
//                       className="rounded-circle border"
//                       style={{
//                         width: "42px",
//                         height: "42px",
//                         objectFit: "cover",
//                       }}
//                       onError={(e) => {
//                         e.target.src =
//                           "https://cdn-icons-png.flaticon.com/512/149/149071.png";
//                       }}
//                     />
//                   </button>
//                   <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
//                     <li>
//                       <button
//                         className="dropdown-item text-danger fw-bold"
//                         onClick={handleLogout}>
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => handleNavigation("/login")}
//                   className="uma-btn-navy py-2 px-4 fw-bold text-nowrap shadow-none border-0"
//                   style={{ fontSize: "14px", borderRadius: "20px" }}>
//                   Sign In
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { clearStorage } from "../../utils/storage";
// import { getLogoAPI, getImgURL } from "../../services/authService";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Token aur UserData ko state mein rakha hai taaki login/logout pe Navbar turant badle
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("user") || "{}"),
//   );
//   const [logoUrl, setLogoUrl] = useState("");
//   const [imageError, setImageError] = useState(false);

//   const role = userData?.role;
//   const fullName = userData?.fullName || "Guest";
//   const profileImgPath = userData?.profileImage;

//   // Alphabet nikalne ka logic
//   const firstLetter = fullName.charAt(0).toUpperCase();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     // Ye function check karega ki localStorage mein kuch badla toh nahi
//     const syncProfile = () => {
//       setToken(localStorage.getItem("token"));
//       setUserData(JSON.parse(localStorage.getItem("user") || "{}"));
//       setImageError(false); // Nayi image ke liye error reset karein
//     };

//     // Same window/tab ke liye storage listener
//     window.addEventListener("storage", syncProfile);

//     const fetchLogo = async () => {
//       try {
//         const res = await getLogoAPI();
//         if (res && res.logo && res.logo.logo) {
//           setLogoUrl(getImgURL(res.logo.logo));
//         }
//       } catch (error) {
//         console.error("Failed to fetch logo", error);
//       }
//     };
//     fetchLogo();

//     return () => window.removeEventListener("storage", syncProfile);
//   }, []);

//   const handleNavigation = (path) => {
//     navigate(path);
//     const offcanvasElement = document.getElementById("navbarOffcanvas");
//     if (offcanvasElement) {
//       const bsOffcanvas =
//         window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
//       if (bsOffcanvas) bsOffcanvas.hide();
//     }
//   };

//   const handleLogout = () => {
//     clearStorage();
//     setToken(null);
//     setUserData({});
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-white fixed-top shadow-sm w-100 border-0 py-2">
//       <div className="container px-4">
//         {/* Logo Section */}
//         <Link
//           className="navbar-brand d-flex align-items-center text-decoration-none"
//           to="/">
//           {logoUrl && !imageError ? (
//             <img
//               src={logoUrl}
//               alt="Logo"
//               onError={() => setImageError(true)}
//               style={{ maxHeight: "45px", width: "auto", objectFit: "contain" }}
//             />
//           ) : (
//             <span className="brand-text text-dark fs-3 fw-bold">
//               My<span className="text-tan">Uma</span>
//             </span>
//           )}
//         </Link>

//         {/* Mobile Toggler */}
//         <button
//           className="navbar-toggler border-0 shadow-none bg-light"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#navbarOffcanvas">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div
//           className="offcanvas offcanvas-end bg-white border-0"
//           id="navbarOffcanvas"
//           tabIndex="-1">
//           <div className="offcanvas-header px-4 pt-4 border-bottom">
//             <h5 className="offcanvas-title text-dark fw-bold">Menu</h5>
//             <button
//               type="button"
//               className="btn-close shadow-none"
//               data-bs-dismiss="offcanvas"></button>
//           </div>

//           <div className="offcanvas-body align-items-center">
//             {/* Main Nav Links - ALL TAPS INCLUDED */}
//             <ul className="navbar-nav mx-auto text-start text-lg-center mb-4 mb-lg-0 w-100 justify-content-center align-items-lg-center gap-lg-2">
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/") ? "active text-tan" : ""}`}>
//                   Home
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/pricing")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/pricing") ? "active text-tan" : ""}`}>
//                   Pricing
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/blog")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/blog") ? "active text-tan" : ""}`}>
//                   Blog
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/contact")}
//                   className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/contact") ? "active text-tan" : ""}`}>
//                   Contact us
//                 </button>
//               </li>
//               <li className="nav-item">
//                <button
//                     onClick={() => handleNavigation("/browse")}
//                     className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
//                     style={{
//                       fontSize: "13px",
//                       borderRadius: "20px",
//                       padding: "8px 20px",
//                     }}>
//                     Browse Listings
//                   </button>
//                   </li>
//               {/* OWNER ONLY SECTION - Logic Unchanged */}
//               {token && role === "owner" && (
//                 <li className="nav-item d-flex flex-column flex-lg-row align-items-lg-center gap-2 ms-lg-2 mt-2 mt-lg-0">
//                   <div className="dropdown">
//                     <button
//                       className="uma-btn-navy btn-sm px-3 dropdown-toggle shadow-none w-100"
//                       type="button"
//                       data-bs-toggle="dropdown"
//                       style={{ fontSize: "13px" }}>
//                       My Account
//                     </button>
//                     <ul className="dropdown-menu shadow border-0 mt-lg-2">
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/listing")}>
//                           My Listing
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/reviews")}>
//                           Reviews
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/bookmarks")}>
//                           Bookmarks
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2"
//                           onClick={() => handleNavigation("/profile")}>
//                           My Profile
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                   <button
//                     onClick={() => handleNavigation("/listing")}
//                     className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
//                     style={{
//                       fontSize: "13px",
//                       borderRadius: "20px",
//                       padding: "8px 20px",
//                     }}>
//                     New Listing
//                   </button>

//                 </li>
//               )}
//             </ul>

//             {/* IDENTITY SECTION (Image or Alphabet) */}
//             <div className="d-flex align-items-center mt-3 mt-lg-0 ms-lg-3 ps-lg-3 border-lg-start">
//               {token ? (
//                 <div className="dropdown">
//                   <button
//                     className="btn bg-transparent border-0 p-0 d-flex align-items-center flex-nowrap gap-3 shadow-none"
//                     type="button"
//                     data-bs-toggle="dropdown">
//                     <div className="text-end" style={{ lineHeight: "1.1" }}>
//                       <div
//                         className="fw-bold text-black"
//                         style={{
//                           fontSize: "14px",
//                           whiteSpace: "nowrap",
//                           maxWidth: "130px",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}>
//                         {fullName}
//                       </div>
//                       <small
//                         className="text-muted text-capitalize d-block"
//                         style={{ fontSize: "11px" }}>
//                         {role}
//                       </small>
//                     </div>

//                     {/* IMAGE OR ALPHABET LOGIC */}
//                     {profileImgPath && !imageError ? (
//                       <img
//                         src={getImgURL(profileImgPath)}
//                         alt="Profile"
//                         className="rounded-circle border"
//                         style={{
//                           width: "42px",
//                           height: "42px",
//                           objectFit: "cover",
//                         }}
//                         onError={() => setImageError(true)}
//                       />
//                     ) : (
//                       <div
//                         className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
//                         style={{
//                           width: "42px",
//                           height: "42px",
//                           backgroundColor: "#001f3f", // Navy blue theme
//                           fontSize: "18px",
//                           border: "2px solid #f39c12",
//                         }}>
//                         {firstLetter}
//                       </div>
//                     )}
//                   </button>
//                   <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">

//                     <li>
//                       <button
//                         className="dropdown-item text-danger fw-bold"
//                         onClick={handleLogout}>
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => handleNavigation("/login")}
//                   className="uma-btn-navy py-2 px-4 fw-bold text-nowrap shadow-none border-0"
//                   style={{ borderRadius: "20px" }}>
//                   Sign In
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearStorage } from "../../utils/storage";
import { getLogoAPI, getImgURL } from "../../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user") || "{}"),
  );
  const [logoUrl, setLogoUrl] = useState("");
  const [imageError, setImageError] = useState(false);

  const role = userData?.role;
  const fullName = userData?.fullName || "Guest";
  const profileImgPath = userData?.profileImage;

  const firstLetter = fullName.charAt(0).toUpperCase();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const syncProfile = () => {
      setToken(localStorage.getItem("token"));
      setUserData(JSON.parse(localStorage.getItem("user") || "{}"));
      setImageError(false);
    };

    window.addEventListener("storage", syncProfile);

    const fetchLogo = async () => {
      try {
        const res = await getLogoAPI();
        if (res && res.logo && res.logo.logo) {
          setLogoUrl(getImgURL(res.logo.logo));
        }
      } catch (error) {
        console.error("Failed to fetch logo", error);
      }
    };
    fetchLogo();

    return () => window.removeEventListener("storage", syncProfile);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    const offcanvasElement = document.getElementById("navbarOffcanvas");
    if (offcanvasElement) {
      const bsOffcanvas =
        window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  const handleLogout = () => {
    clearStorage();
    setToken(null);
    setUserData({});
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top shadow-sm w-100 border-0 py-2">
      <div className="container px-4">
        {/* Logo Section */}
        <Link
          className="navbar-brand d-flex align-items-center text-decoration-none"
          to="/">
          {logoUrl && !imageError ? (
            <img
              src={logoUrl}
              alt="Logo"
              onError={() => setImageError(true)}
              style={{ maxHeight: "45px", width: "auto", objectFit: "contain" }}
            />
          ) : (
            <span className="brand-text text-dark fs-3 fw-bold">
              My<span className="text-tan">Uma</span>
            </span>
          )}
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler border-0 shadow-none bg-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvas">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-end bg-white border-0"
          id="navbarOffcanvas"
          tabIndex="-1">
          <div className="offcanvas-header px-4 pt-4 border-bottom">
            <h5 className="offcanvas-title text-dark fw-bold">Menu</h5>
            <button
              type="button"
              className="btn-close shadow-none"
              data-bs-dismiss="offcanvas"></button>
          </div>

          <div className="offcanvas-body align-items-center">
            {/* Main Nav Links */}
            <ul className="navbar-nav mx-auto text-start text-lg-center mb-4 mb-lg-0 w-100 justify-content-center align-items-lg-center gap-lg-2">
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/")}
                  data-bs-dismiss="offcanvas"
                  className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/") ? "active text-tan" : ""}`}>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/pricing")}
                  data-bs-dismiss="offcanvas"
                  className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/pricing") ? "active text-tan" : ""}`}>
                  Pricing
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/blog")}
                  data-bs-dismiss="offcanvas"
                  className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/blog") ? "active text-tan" : ""}`}>
                  Blog
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/contact")}
                  data-bs-dismiss="offcanvas"
                  className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/contact") ? "active text-tan" : ""}`}>
                  Contact us
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/browse")}
                  data-bs-dismiss="offcanvas"
                  className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
                  style={{
                    fontSize: "13px",
                    borderRadius: "20px",
                    padding: "8px 20px",
                  }}>
                  Browse Listings
                </button>
              </li>

              {/* OWNER ONLY - NEW LISTING BUTTON ONLY */}
              {token && role === "owner" && (
                <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
                  <button
                    onClick={() => handleNavigation("/listing")}
                    data-bs-dismiss="offcanvas"
                    className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
                    style={{
                      fontSize: "13px",
                      borderRadius: "20px",
                      padding: "8px 20px",
                    }}>
                    New Listing
                  </button>
                </li>
              )}
            </ul>

            {/* IDENTITY SECTION (Integrated Dropdown) */}
            <div className="d-flex align-items-center mt-3 mt-lg-0 ms-lg-3 ps-lg-3 border-lg-start">
              {token ? (
                <div className="dropdown">
                  <button
                    className="btn bg-transparent border-0 p-0 d-flex align-items-center flex-nowrap gap-3 shadow-none dropdown-toggle-no-caret"
                    type="button"
                    data-bs-toggle="dropdown">
                    <div className="text-end" style={{ lineHeight: "1.1" }}>
                      <div
                        className="fw-bold text-black"
                        style={{
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          maxWidth: "130px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                        {fullName}
                      </div>
                      <small
                        className="text-muted text-capitalize d-block"
                        style={{ fontSize: "11px" }}>
                        {role}
                      </small>
                    </div>

                    {profileImgPath && !imageError ? (
                      <img
                        src={getImgURL(profileImgPath)}
                        alt="Profile"
                        className="rounded-circle border"
                        style={{
                          width: "42px",
                          height: "42px",
                          objectFit: "cover",
                        }}
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                        style={{
                          width: "42px",
                          height: "42px",
                          backgroundColor: "#001f3f",
                          fontSize: "18px",
                          border: "2px solid #f39c12",
                        }}>
                        {firstLetter}
                      </div>
                    )}
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                    {/* OWNER OPTIONS ADDED HERE */}
                    {role === "owner" && (
                      <>
                        <li>
                          <button
                            className="dropdown-item py-2"
                            data-bs-dismiss="offcanvas"
                            onClick={() => handleNavigation("/listing")}>
                            My Listing
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item py-2"
                            data-bs-dismiss="offcanvas"
                            onClick={() => handleNavigation("/reviews")}>
                            Reviews
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item py-2"
                            data-bs-dismiss="offcanvas"
                            onClick={() => handleNavigation("/bookmarks")}>
                            Bookmarks
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item py-2"
                            data-bs-dismiss="offcanvas"
                            onClick={() => handleNavigation("/profile")}>
                            My Profile
                          </button>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                      </>
                    )}
                    <li>
                      <button
                        className="dropdown-item text-danger fw-bold"
                        onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation("/login")}
                  data-bs-dismiss="offcanvas"
                  className="uma-btn-navy py-2 px-4 fw-bold text-nowrap shadow-none border-0"
                  style={{ borderRadius: "20px" }}>
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