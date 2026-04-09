import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-navy sticky-top py-3 shadow">
      <div className="container px-4">
        {/* Brand Logo */}
        <Link
          className="navbar-brand d-flex align-items-center text-decoration-none"
          to="/">
          <span className="brand-text text-white fs-3 fw-bold">
            My<span className="text-tan">Uma</span>
          </span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#umaNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="umaNavbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link-uma active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link-uma" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link-uma" to="#">
                Blog
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-4">
            <div className="uma-cart position-relative">
              <i className="bi bi-cart3 text-white fs-4"></i>
              <span className="uma-badge-tan">8</span>
            </div>
            {/* React Router Link used here */}
            <Link to="/login">
              <button className="btn-tan-solid rounded-pill px-4">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
