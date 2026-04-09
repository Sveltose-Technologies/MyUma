import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">
          {/* Brand & Description */}
          <div className="col-lg-4 col-md-12">
            <Link
              className="navbar-brand d-flex align-items-center text-decoration-none"
              to="/">
              <span className="brand-text text-white fs-2 fw-bold pb-2">
                My<span className="text-tan">Uma</span>
              </span>
            </Link>
            <p className="text-white-50 mb-4">
              Connecting you with top-rated local businesses and services.
              Discover the best your city has to offer with our professional
              directory.
            </p>
            <div className="d-flex gap-2">
              <a
                href="#"
                className="btn bg-gold rounded-circle d-flex align-items-center justify-content-center p-0"
                style={{ width: "35px", height: "35px" }}>
                <i className="bi bi-facebook text-navy"></i>
              </a>
              <a
                href="#"
                className="btn bg-gold rounded-circle d-flex align-items-center justify-content-center p-0"
                style={{ width: "35px", height: "35px" }}>
                <i className="bi bi-instagram text-navy"></i>
              </a>
              <a
                href="#"
                className="btn bg-gold rounded-circle d-flex align-items-center justify-content-center p-0"
                style={{ width: "35px", height: "35px" }}>
                <i className="bi bi-twitter-x text-navy"></i>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-lg-2 col-6">
            <h6 className="fw-bold text-gold mb-4 text-uppercase">Explore</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Listings
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Categories
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-lg-2 col-6">
            <h6 className="fw-bold text-gold mb-4 text-uppercase">Services</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Add Listing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Advertising
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-12">
            <h6 className="fw-bold text-gold mb-4 text-uppercase">Office</h6>
            <div className="d-flex mb-3">
              <i className="bi bi-geo-alt text-gold me-3"></i>
              <span className="text-white-50 small">
                123 Business Street, New York, NY 10001
              </span>
            </div>
            <div className="d-flex mb-3">
              <i className="bi bi-envelope text-gold me-3"></i>
              <span className="text-white-50 small">
                support@directorypro.com
              </span>
            </div>
            <div className="d-flex">
              <i className="bi bi-telephone text-gold me-3"></i>
              <span className="text-white-50 small">+1 (234) 567 890</span>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Line */}
        <hr className="mt-5 mb-4 border-secondary opacity-25" />

        {/* Copyright Section */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-white-50 small mb-0">
              © {new Date().getFullYear()} DirectoryPro. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a
              href="#"
              className="text-white-50 small text-decoration-none me-3">
              Privacy
            </a>
            <a href="#" className="text-white-50 small text-decoration-none">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
