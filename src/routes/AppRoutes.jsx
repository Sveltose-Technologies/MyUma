import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Pricing from "../pages/Pricing";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import ProfileUpdate from "../pages/profile";
const AppRoutes = () => {
  return (
    <Router>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/profile" element={<ProfileUpdate />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default AppRoutes;
