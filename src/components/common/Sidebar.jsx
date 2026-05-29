

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  // ⭐ MANUAL CLOSE FUNCTION
  const closeMobileMenu = () => {
    const offcanvasElement = document.getElementById("mobileSidebar");
    if (offcanvasElement) {
      // Access the Bootstrap Instance
      const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  const ownerMenuItems = [
    { name: "Dashboard", icon: "bi-grid", path: "/owner-dashboard" },
    { name: "My Listing", icon: "bi-list-ul", path: "/listing" },
    { name: "Reviews", icon: "bi-star", path: "/reviews" },
    { name: "Bookmarks", icon: "bi-bookmark", path: "/bookmarks" },
    { name: "Inquiries", icon: "bi-envelope", path: "/inquiries" },
    { name: "My Profile", icon: "bi-person", path: "/profile" },
  ];

  const userMenuItems = [
    { name: "My Account", icon: "bi-person", path: "/user-update-profile" },
    { name: "My Bookmarks", icon: "bi-bookmark-heart", path: "/user-bookmarks" },
    { name: "My Reviews", icon: "bi-star", path: "/user-reviews" },
    { name: "My Inquiries", icon: "bi-question-circle", path: "/user-inquiries" },
    { name: "My Favorites", icon: "bi-heart", path: "/user-favorites" },
  ];

  const menuItems = role === "owner" ? ownerMenuItems : userMenuItems;

  return (
    <div className="nav flex-column py-2">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          onClick={closeMobileMenu} // ⭐ CALL CLOSE FUNCTION
          className={`nav-link d-flex align-items-center gap-3 px-4 py-3 border-start border-4 ${
            location.pathname === item.path
              ? "bg-tan text-navy fw-bold border-white"
              : "text-white opacity-75 border-transparent"
          }`}
        >
          <i className={`bi ${item.icon} fs-5`}></i>
          <span className="small text-uppercase ls-1 fw-bold">{item.name}</span>
        </Link>
      ))}
   <style>{`
        .bg-tan { background-color: #c49a6c !important; }
        .text-navy { color: #1a2b49 !important; }
        .border-transparent { border-left-color: transparent !important; }
        .hover-bg-navy-light:hover { background-color: rgba(255,255,255,0.05); color: white; opacity: 1; }
        .ls-1 { letter-spacing: 1px; }
      `}</style>    </div>
  );
};

export default Sidebar;