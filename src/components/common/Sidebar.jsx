import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearStorage } from "../../utils/storage";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearStorage();
    navigate("/login");
  };

  const menuItems = [
    { name: "My Listing", icon: "bi-file-earmark-text", path: "/listing" },
    { name: "Messages", icon: "bi-chat-left-text", path: "/messages" },
    { name: "Reviews", icon: "bi-star", path: "/reviews" },
    { name: "Bookmarks", icon: "bi-bookmark", path: "/bookmarks" },
    { name: "My Profile", icon: "bi-person", path: "/profile" },
  ];

  return (
    <div
      className="bg-navy text-white min-vh-100 p-0 shadow"
      style={{ width: "260px" }}>
      <div className="p-4 border-bottom border-secondary border-opacity-25">
        <h6 className="text-uppercase small fw-bold opacity-50 mb-0">
          Main Menu
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

      <div className="mt-4 p-4 border-top border-secondary border-opacity-25">
        <h6 className="text-uppercase small fw-bold opacity-50 mb-3">
          Account
        </h6>
        <button
          onClick={handleLogout}
          className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-0 opacity-75 hover-opacity-100">
          <i className="bi bi-box-arrow-right fs-5"></i>
          <span>Logout</span>
        </button>
      </div>

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
      `}</style>
    </div>
  );
};

export default Sidebar;
