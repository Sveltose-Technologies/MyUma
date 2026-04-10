import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);

    // 2. Find the offcanvas element and close it using Bootstrap's API
    const offcanvasElement = document.getElementById("navbarOffcanvas");
    if (offcanvasElement) {
      const bsOffcanvas =
        window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      } else {
        offcanvasElement.classList.remove("show");
        const backdrop = document.querySelector(".offcanvas-backdrop");
        if (backdrop) backdrop.remove();
        document.body.style.overflow = "auto";
      }
    }
  };

  const handleLogout = () => {
    clearStorage();
    handleNavigation("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-navy sticky-top py-3 shadow">
      <div className="container px-4">
        {/* Brand Logo */}
        <Link
          className="navbar-brand d-flex align-items-center text-decoration-none"
          to="/"
        >
          <span className="brand-text text-white fs-3 fw-bold">
            My<span className="text-tan">Uma</span>
          </span>
        </Link>

        {/* Sidebar Toggler */}
        <button
          className="navbar-toggler border-0 shadow-none bg-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvas"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Sidebar Container */}
        <div
          className="offcanvas offcanvas-end bg-navy border-0"
          id="navbarOffcanvas"
        >
          <div className="offcanvas-header px-4 pt-4">
            <h5 className="offcanvas-title text-white fw-bold">
              My<span className="text-tan">Uma</span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav mx-auto text-start text-lg-center">
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/")}
                  className="nav-link-uma bg-transparent border-0 w-100 text-start text-lg-center">
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/pricing")}
                  className="nav-link-uma bg-transparent border-0 w-100 text-start text-lg-center">
                  Pricing
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/#")}
                  className="nav-link-uma bg-transparent border-0 w-100 text-start text-lg-center">
                  Blog
                </button>
              </li>
            </ul>

            {/* Sign In Button */}
            <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-4 mt-lg-0">
              <button
                onClick={() => handleNavigation("/login")}
                className="btn-tan-solid w-100 px-4 py-2 text-center">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
