// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { clearStorage } from "../../utils/storage";

// // export default function Navbar() {
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");

// //   const handleNavigation = (path) => {
// //     navigate(path);
// //     const offcanvasElement = document.getElementById("navbarOffcanvas");
// //     if (offcanvasElement) {
// //       const bsOffcanvas =
// //         window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
// //       if (bsOffcanvas) {
// //         bsOffcanvas.hide();
// //       } else {
// //         offcanvasElement.classList.remove("show");
// //         const backdrop = document.querySelector(".offcanvas-backdrop");
// //         if (backdrop) backdrop.remove();
// //         document.body.style.overflow = "auto";
// //       }
// //     }
// //   };

// //   const handleLogout = () => {
// //     clearStorage();
// //     handleNavigation("/login");
// //   };

// //   return (
// //     <nav className="navbar navbar-expand-lg bg-navy sticky-top py-3 shadow">
// //       <div className="container px-4">
// //         {/* Brand Logo */}
// //         <Link
// //           className="navbar-brand d-flex align-items-center text-decoration-none"
// //           to="/"
// //         >
// //           <span className="brand-text text-white fs-3 fw-bold">
// //             My<span className="text-tan">Uma</span>
// //           </span>
// //         </Link>

// //         {/* Sidebar Toggler */}
// //         <button
// //           className="navbar-toggler border-0 shadow-none bg-light"
// //           type="button"
// //           data-bs-toggle="offcanvas"
// //           data-bs-target="#navbarOffcanvas"
// //         >
// //           <span className="navbar-toggler-icon"></span>
// //         </button>

// //         {/* Sidebar Container */}
// //         <div
// //           className="offcanvas offcanvas-end bg-navy border-0"
// //           id="navbarOffcanvas"
// //         >
// //           <div className="offcanvas-header px-4 pt-4">
// //             <h5 className="offcanvas-title text-white fw-bold">
// //               My<span className="text-tan">Uma</span>
// //             </h5>
// //             <button
// //               type="button"
// //               className="btn-close btn-close-white"
// //               data-bs-dismiss="offcanvas"
// //             ></button>
// //           </div>

// //           <div className="offcanvas-body">
// //             <ul className="navbar-nav mx-auto text-start text-lg-center">
// //               <li className="nav-item">
// //                 <button
// //                   onClick={() => handleNavigation("/")}
// //                   className="nav-link-uma bg-transparent border-0"
// //                 >
// //                   Home
// //                 </button>
// //               </li>
// //               <li className="nav-item">
// //                 <button
// //                   onClick={() => handleNavigation("/pricing")}
// //                   className="nav-link-uma bg-transparent border-0"
// //                 >
// //                   Pricing
// //                 </button>
// //               </li>
// //               <li className="nav-item">
// //                 <button
// //                   onClick={() => handleNavigation("/blog")}
// //                   className="nav-link-uma bg-transparent border-0"
// //                 >
// //                   Blog
// //                 </button>
// //               </li>
// //                <li className="nav-item">
// //                 <button
// //                   onClick={() => handleNavigation("/contact")}
// //                   className="nav-link-uma bg-transparent border-0"
// //                 >
// //                   Contact us
// //                 </button>
// //               </li>
// //             </ul>

// //             <div className="d-flex flex-column flex-lg-row align-items-center gap-2 mt-4 mt-lg-0">
// //               {token ? (
// //                 <>
// //                   {/* BUTTONS CONTAINER: Side-by-side on desktop, stacked on mobile */}
// //                   <div className="d-flex flex-column flex-lg-row gap-2 w-100">
// //                     {/* MY ACCOUNT DROPDOWN */}
// //                     <div className="dropdown flex-fill">
// //                       <button
// //                         className=" btn btn-secondary dropdown-toggle px-3 py-2 w-100 d-flex align-items-center justify-content-center gap-2"
// //                         type="button"
// //                         id="accountDropdown"
// //                         data-bs-toggle="dropdown"
// //                         aria-expanded="false"
// //                         style={{
// //                           backgroundColor: "#6c757d",
// //                           border: "none",
// //                           fontSize: "14px",
// //                         }}
// //                       >
// //                         <i className="bi bi-person-circle"></i> My Account
// //                       </button>
// //                       <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 py-0 overflow-hidden">
// //                         <li>
// //                           <button
// //                             className="dropdown-item py-2 border-bottom"
// //                             onClick={() => handleNavigation("/listing")}
// //                           >
// //                             <i className="bi bi-file-earmark-text me-2"></i> My
// //                             Listing
// //                           </button>
// //                         </li>
// //                         <li>
// //                           <button
// //                             className="dropdown-item py-2 border-bottom"
// //                             onClick={() => handleNavigation("/reviews")}
// //                           >
// //                             <i className="bi bi-star me-2"></i> Reviews
// //                           </button>
// //                         </li>
//                         // <li>
//                         //   <button
//                         //     className="dropdown-item py-2 border-bottom"
//                         //     // onClick={() => handleNavigation("/bookmarks")}
//                         //   >
//                         //     <i className="bi bi-bookmark me-2"></i> Bookmarks
//                         //   </button>
//                         // </li>
// //                         <li>
// //                           <button
// //                             className="dropdown-item py-2 border-bottom"
// //                             onClick={() => handleNavigation("/messages")}
// //                           >
// //                             <i className="bi bi-chat-left-text me-2"></i>{" "}
// //                             Message
// //                           </button>
// //                         </li>
// //                         <li>
// //                           <button
// //                             className="dropdown-item py-2 border-bottom"
// //                             onClick={() => handleNavigation("/profile")}
// //                           >
// //                             <i className="bi bi-person me-2"></i> My Profile
// //                           </button>
// //                         </li>
// //                         <li>
// //                           <button
// //                             className="dropdown-item py-2 text-danger fw-bold bg-light"
// //                             onClick={handleLogout}
// //                           >
// //                             <i className="bi bi-box-arrow-right me-2"></i>{" "}
// //                             Logout
// //                           </button>
// //                         </li>
// //                       </ul>
// //                     </div>

// //                     {/* NEW LISTING BUTTON */}
// //                     <button
// //                       onClick={() => handleNavigation("/listing")}
// //                       className="uma-btn uma-btn-primary"
// //                       style={{ fontSize: "14px", height: "37px" }}
// //                     >
// //                       New Listing
// //                     </button>

// //                     {/* BROWSE LISTINGS BUTTON */}
// //                     <button
// //                       onClick={() => handleNavigation("/browse")}
// //                       className="uma-btn uma-btn-primary"
// //                       style={{ fontSize: "14px", height: "37px" }}
// //                     >
// //                       Browse Listings
// //                     </button>
// //                   </div>
// //                 </>
// //               ) : (
// //                 /* SIGN IN BUTTON */
// //                 <button
// //                   onClick={() => handleNavigation("/login")}
// //                   className="uma-btn uma-btn-primary "
// //                 >
// //                   Sign In
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { clearStorage } from "../../utils/storage";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleNavigation = (path) => {
//     navigate(path);
//     const offcanvasElement = document.getElementById("navbarOffcanvas");
//     if (offcanvasElement) {
//       const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
//       if (bsOffcanvas) {
//         bsOffcanvas.hide();
//       } else {
//         offcanvasElement.classList.remove("show");
//         const backdrop = document.querySelector(".offcanvas-backdrop");
//         if (backdrop) backdrop.remove();
//         document.body.style.overflow = "auto";
//       }
//     }
//   };

//   const handleLogout = () => {
//     clearStorage();
//     handleNavigation("/login");
//   };

//   return (
//     // Added 'w-100' and ensured 'top-0' via sticky-top
//     <nav className="navbar navbar-expand-lg bg-navy sticky-top py-3 shadow w-100 border-0">
//       <div className="container px-4">
//         {/* Brand Logo */}
//         <Link
//           className="navbar-brand d-flex align-items-center text-decoration-none"
//           to="/">
//           <span className="brand-text text-white fs-3 fw-bold">
//             My<span className="text-tan">Uma</span>
//           </span>
//         </Link>

//         {/* Sidebar Toggler */}
//         <button
//           className="navbar-toggler border-0 shadow-none bg-light"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#navbarOffcanvas">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Sidebar Container */}
//         <div
//           className="offcanvas offcanvas-end bg-navy border-0"
//           id="navbarOffcanvas"
//           tabIndex="-1">
//           <div className="offcanvas-header px-4 pt-4">
//             <h5 className="offcanvas-title text-white fw-bold">
//               My<span className="text-tan">Uma</span>
//             </h5>
//             <button
//               type="button"
//               className="btn-close btn-close-white shadow-none"
//               data-bs-dismiss="offcanvas"></button>
//           </div>

//           <div className="offcanvas-body">
//             <ul className="navbar-nav mx-auto text-start text-lg-center mb-4 mb-lg-0">
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/")}
//                   className="nav-link-uma bg-transparent border-0 w-100 text-start text-lg-center">
//                   Home
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/pricing")}
//                   className="nav-link-uma bg-transparent border-0 w-100 text-start text-lg-center">
//                   Pricing
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/blog")}
//                   className="nav-link-uma bg-transparent border-0 w-100 text-start text-lg-center">
//                   Blog
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   onClick={() => handleNavigation("/contact")}
//                   className="nav-link-uma bg-transparent border-0 w-100 text-start text-lg-center">
//                   Contact us
//                 </button>
//               </li>
//             </ul>

//             <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
//               {token ? (
//                 <div className="d-flex flex-column flex-lg-row gap-2 w-100 align-items-stretch align-items-lg-center">
//                   {/* DROPDOWN */}
//                   <div className="dropdown flex-grow-1">
//                     <button
//                       className="btn btn-secondary dropdown-toggle px-3 py-2 w-100 d-flex align-items-center justify-content-center gap-2 shadow-none border-0"
//                       type="button"
//                       id="accountDropdown"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                       style={{ backgroundColor: "#6c757d", fontSize: "14px" }}>
//                       <i className="bi bi-person-circle"></i> My Account
//                     </button>
//                     <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 py-0 overflow-hidden">
//                       <li>
//                         <button
//                           className="dropdown-item py-2 border-bottom"
//                           onClick={() => handleNavigation("/listing")}>
//                           My Listing
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2 border-bottom"
//                           onClick={() => handleNavigation("/reviews")}>
//                           Reviews
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2 border-bottom"
//                           onClick={() => handleNavigation("/bookmarks")}>
//                           <i className="bi bi-bookmark me-2"></i> Bookmarks
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2 border-bottom"
//                           onClick={() => handleNavigation("/profile")}>
//                           My Profile
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item py-2 text-danger fw-bold bg-light"
//                           onClick={handleLogout}>
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>

//                   <button
//                     onClick={() => handleNavigation("/listing")}
//                     className="uma-btn uma-btn-primary py-2 px-3"
//                     style={{ fontSize: "12px" }}>
//                     New Listing
//                   </button>
//                   <button
//                     onClick={() => handleNavigation("/browse")}
//                     className="uma-btn uma-btn-primary py-2 px-3"
//                     style={{ fontSize: "12px" }}>
//                     Browse Listings
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => handleNavigation("/login")}
//                   className="uma-btn uma-btn-primary w-100 w-lg-auto">
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

//   // Get user data from localStorage
//   const userData = JSON.parse(localStorage.getItem("user") || "{}");
//   const role = userData?.role;
//   const fullName = userData?.fullName;
//   const profileImage = userData?.profileImage;

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
//                       fontSize: "15px",
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
//                       fontSize: "15px",
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
//                       src={getImgURL(profileImage)}
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
//                   className="uma-btn-navy py-2 px-4 fw-bold text-nowrap d-inline-block shadow-none border-0"
//                   style={{
//                     fontSize: "14px",
//                     borderRadius: "20px",
//                     textTransform: "none",
//                     whiteSpace: "nowrap", // Yeh line ensure karegi ki text ek hi row mein rahe
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

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearStorage } from "../../utils/storage";
import { getLogoAPI, getImgURL } from "../../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Get user data from localStorage
const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const role = userData?.role;
  const fullName = userData?.fullName;

const profileImgPath = userData?.profileImage; 

  const [logoUrl, setLogoUrl] = useState("");
  const [imageError, setImageError] = useState(false);

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await getLogoAPI();
        if (res && res.logo && res.logo.logo) {
          const finalUrl = getImgURL(res.logo.logo);
          setLogoUrl(finalUrl);
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
      const bsOffcanvas =
        window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  const handleLogout = () => {
    clearStorage();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm w-100 border-0 py-2">
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

        {/* Offcanvas Menu */}
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
            {/* Center Navigation Links */}
            <ul className="navbar-nav mx-auto text-start text-lg-center mb-4 mb-lg-0 w-100 justify-content-center align-items-lg-center gap-lg-2">
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/")}
                  className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/") ? "active text-tan" : ""}`}
                  style={{ color: isActive("/") ? "var(--tan)" : "black" }}>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/pricing")}
                  className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/pricing") ? "active text-tan" : ""}`}
                  style={{
                    color: isActive("/pricing") ? "var(--tan)" : "black",
                  }}>
                  Pricing
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/blog")}
                  className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/blog") ? "active text-tan" : ""}`}
                  style={{ color: isActive("/blog") ? "var(--tan)" : "black" }}>
                  Blog
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/contact")}
                  className={`nav-link-uma bg-transparent border-0 text-black py-2 px-3 fw-bold ${isActive("/contact") ? "active text-tan" : ""}`}
                  style={{
                    color: isActive("/contact") ? "var(--tan)" : "black",
                  }}>
                  Contact us
                </button>
              </li>

              {/* OWNER ONLY SECTION (My Account + Buttons) */}
              {token && role === "owner" && (
                <li className="nav-item d-flex flex-column flex-lg-row align-items-lg-center gap-2 ms-lg-2 mt-2 mt-lg-0">
                  <div className="dropdown">
                    <button
                      className="uma-btn-navy btn-sm px-3 dropdown-toggle shadow-none w-100"
                      type="button"
                      data-bs-toggle="dropdown"
                      style={{ fontSize: "13px", textTransform: "none" }}>
                      My Account
                    </button>
                    <ul className="dropdown-menu shadow border-0 mt-lg-2">
                      <li>
                        <button
                          className="dropdown-item py-2"
                          onClick={() => handleNavigation("/listing")}>
                          My Listing
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item py-2"
                          onClick={() => handleNavigation("/reviews")}>
                          Reviews
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item py-2"
                          onClick={() => handleNavigation("/bookmarks")}>
                          Bookmarks
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item py-2"
                          onClick={() => handleNavigation("/profile")}>
                          My Profile
                        </button>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleNavigation("/listing")}
                    className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
                    style={{
                      fontSize: "13px",
                      borderRadius: "20px",
                      padding: "8px 20px",
                      textTransform: "none",
                    }}>
                    New Listing
                  </button>
                  <button
                    onClick={() => handleNavigation("/browse")}
                    className="uma-btn-primary btn-sm px-3 text-nowrap w-100 fw-bold border-0"
                    style={{
                      fontSize: "13px",
                      borderRadius: "20px",
                      padding: "8px 20px",
                      textTransform: "none",
                    }}>
                    Browse Listings
                  </button>
                </li>
              )}
            </ul>

            {/* Right Side: Identity Section */}
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 mt-3 mt-lg-0 ms-lg-3 border-lg-start ps-lg-3">
              {token ? (
                <div className="dropdown">
                  <button
                    className="btn bg-transparent border-0 p-0 d-flex align-items-center gap-2 shadow-none"
                    type="button"
                    data-bs-toggle="dropdown">
                    <div
                      className="text-end d-none d-lg-block"
                      style={{ lineHeight: "1" }}>
                      <div
                        className="fw-bold text-black"
                        style={{ fontSize: "13px" }}>
                        {fullName}
                      </div>
                      <small
                        className="text-muted text-capitalize"
                        style={{ fontSize: "10px" }}>
                        {role}
                      </small>
                    </div>
                    <img
                      src={getImgURL(profileImgPath)}
                      alt="Profile"
                      className="rounded-circle border"
                      style={{
                        width: "42px",
                        height: "42px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        // Agar link phir bhi na chale toh default icon dikhao
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                      }}
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
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
                  className="uma-btn-navy py-2 px-4 fw-bold text-nowrap d-inline-block shadow-none border-0"
                  style={{
                    fontSize: "14px",
                    borderRadius: "20px",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    minWidth: "fit-content",
                  }}>
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