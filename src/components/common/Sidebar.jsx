
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Role check karne ke liye
import { clearStorage } from "../../utils/storage";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redux se user data nikalna
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const handleLogout = () => {
    clearStorage();
    navigate("/login");
  };

  // 1. Owner ke liye menu items
  const ownerMenuItems = [
    { name: "My Listing", icon: "bi-file-earmark-text", path: "/listing" },
    { name: "Listing Manage", icon: "bi-gear", path: "/manage-listings" },
    { name: "Messages", icon: "bi-chat-left-text", path: "/messages" },
    { name: "Reviews", icon: "bi-star", path: "/reviews" },
    { name: "Bookmarks", icon: "bi-bookmark", path: "/bookmarks" },
    {
      name: "Blog Comments",
      icon: "bi-chat-left-text",
      path: "/blog-comments",
    },
    { name: "Inquiries", icon: "bi-person", path: "/inquiries" },
    { name: "My Profile", icon: "bi-person", path: "/profile" },
  ];

  const userMenuItems = [
    {
      name: "My Account",
      icon: "bi-person-circle",
      path: "/user-update-profile",
    },
    {
      name: "My Bookmarks",
      icon: "bi-bookmark-heart",
      path: "/user-bookmarks",
    },
    { name: "My Reviews", icon: "bi-star", path: "/user-reviews" },
    { name: "My Inquiries", icon: "bi-question-circle", path: "/user-inquiries" },
    { name: "My Blog Comments", icon: "bi-chat-left-text", path: "/user-blog-comments" },
    { name: "My Favorites", icon: "bi-heart", path: "/user-favorites" },

  ];

  // Role ke basis par decide karna ki kaunsa menu dikhana hai
  const menuItems = role === "owner" ? ownerMenuItems : userMenuItems;

  return (
    <div
      className="bg-navy text-white min-vh-100 p-0 shadow"
      style={{ width: "260px" }}>
      <div className="p-4 border-bottom border-secondary border-opacity-25">
        <h6 className="text-uppercase small fw-bold opacity-50 mb-0">
          {role === "owner" ? "Owner Menu" : "User Menu"}
        </h6>
      </div>

      <ul className="nav flex-column mt-2">
        {menuItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <Link
              to={item.path}
              className={`nav-link d-flex align-items-center gap-3 px-4 py-3 transition-all ${
                location.pathname === item.path
                  ? "bg-tan text-navy fw-bold"
                  : "text-white opacity-75 hover-bg-light"
              }`}>
              <i className={`bi ${item.icon} fs-5`}></i>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>


      {/* Same CSS as you provided */}
      <style jsx="true">{`
        .transition-all {
          transition: all 0.3s ease;
        }
        .hover-bg-light:hover {
          background: rgba(255, 255, 255, 0.1);
          opacity: 1;
        }
        .bg-tan {
          background-color: #c49a6c !important;
        }
        .text-navy {
          color: #1a2b49 !important;
        }
        .bg-navy {
          background-color: #1a2b49 !important;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;