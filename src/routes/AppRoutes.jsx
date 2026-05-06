import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common Components
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

// Pages Imports
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import Pricing from "../pages/Pricing";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import ProfileUpdate from "../pages/profile";
import BrowseListings from "../pages/BrowseListings";
import BrowseDetails from "../pages/BrowseDetails"
import AboutUs from "../pages/AboutUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";

// --- LISTING IMPORTS (Aapke file names ke hisaab se) ---
import Listing from "../pages/Listing";
import ListingDetails from "../pages/ListingDetails"; // FIXED: Added 's' to match your file
// Note: Agar aapke paas Listings.jsx (plural) file nahi hai,
// toh aap niche route mein Listing (singular) use karein.
import Messages from "../pages/Messages";
// Layout
import DashboardLayout from "../components/layout/DashboardLayout";
import Reviews from "../pages/Reviews";
import ListingReviews from "../pages/ListingReviews";
import ContactUs from "../pages/ContactUs";
import TestimonialPage from "../pages/TestimonialPage";
import MyBookings from "../pages/MyBookings";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/browse" element={<BrowseListings />} />
          <Route path="/browse/:slug" element={<BrowseDetails />} />
          <Route path="/reviews/:slug" element={<ListingReviews />} />
          <Route path="/testimonials" element={<TestimonialPage />} />;
          {/* Detail Page Route (Slug base) */}
          <Route path="/listing/:slug" element={<ListingDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* Dashboard Routes (Sidebar wale) */}
          <Route element={<DashboardLayout />}>
            <Route path="/listing" element={<Listing />} />
            <Route path="/profile" element={<ProfileUpdate />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/bookmark" element={<MyBookings />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default AppRoutes;
