import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearStorage } from "../../utils/storage";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleNavigation = (path) => {
    navigate(path);
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
                  className="nav-link-uma bg-transparent border-0"
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/pricing")}
                  className="nav-link-uma bg-transparent border-0"
                >
                  Pricing
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNavigation("/blog")}
                  className="nav-link-uma bg-transparent border-0"
                >
                  Blog
                </button>
              </li>
            </ul>

            <div className="d-flex flex-column flex-lg-row align-items-center gap-2 mt-4 mt-lg-0">
              {token ? (
                <>
                  {/* BUTTONS CONTAINER: Side-by-side on desktop, stacked on mobile */}
                  <div className="d-flex flex-column flex-lg-row gap-2 w-100">
                    {/* MY ACCOUNT DROPDOWN */}
                    <div className="dropdown flex-fill">
                      <button
                        className="btn btn-secondary dropdown-toggle px-3 py-2 w-100 d-flex align-items-center justify-content-center gap-2"
                        type="button"
                        id="accountDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          backgroundColor: "#6c757d",
                          border: "none",
                          fontSize: "14px",
                        }}
                      >
                        <i className="bi bi-person-circle"></i> My Account
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 py-0 overflow-hidden">
                        <li>
                          <button
                            className="dropdown-item py-2 border-bottom"
                            onClick={() => handleNavigation("/my-listings")}
                          >
                            <i className="bi bi-file-earmark-text me-2"></i> My
                            Listing
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item py-2 border-bottom"
                            onClick={() => handleNavigation("/reviews")}
                          >
                            <i className="bi bi-star me-2"></i> Reviews
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item py-2 border-bottom"
                            onClick={() => handleNavigation("/bookmarks")}
                          >
                            <i className="bi bi-bookmark me-2"></i> Bookmarks
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item py-2 border-bottom"
                            onClick={() => handleNavigation("/messages")}
                          >
                            <i className="bi bi-chat-left-text me-2"></i>{" "}
                            Message
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item py-2 border-bottom"
                            onClick={() => handleNavigation("/profile")}
                          >
                            <i className="bi bi-person me-2"></i> My Profile
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item py-2 text-danger fw-bold bg-light"
                            onClick={handleLogout}
                          >
                            <i className="bi bi-box-arrow-right me-2"></i>{" "}
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* NEW LISTING BUTTON */}
                    <button
                      onClick={() => handleNavigation("/add-listing")}
                      className="btn-tan-solid flex-fill px-3 py-2 text-center text-nowrap"
                      style={{ fontSize: "14px" }}
                    >
                      New Listing
                    </button>

                    {/* BROWSE LISTINGS BUTTON */}
                    <button
                      onClick={() => handleNavigation("/listings")}
                      className="btn-tan-solid flex-fill px-3 py-2 text-center text-nowrap"
                      style={{ fontSize: "14px" }}
                    >
                      Browse Listings
                    </button>
                  </div>
                </>
              ) : (
                /* SIGN IN BUTTON */
                <button
                  onClick={() => handleNavigation("/login")}
                  className="btn-tan-solid px-4 py-2 text-center"
                >
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
