import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Common Components
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

// Pages Imports
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import Pricing from "../pages/Pricing";
import PaymentSuccess from "../pages/PaymentSuccess";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import ProfileUpdate from "../pages/profile";
import BrowseListings from "../pages/BrowseListings";
import BrowseDetails from "../pages/BrowseDetails";
import AboutUs from "../pages/AboutUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import Listing from "../pages/Listing";
import ListingDetails from "../pages/ListingDetails";
import Messages from "../pages/Messages";
import DashboardLayout from "../components/layout/DashboardLayout";
import Reviews from "../pages/Reviews";
import ListingReviews from "../pages/ListingReviews";
import ContactUs from "../pages/ContactUs";
import TestimonialPage from "../pages/TestimonialPage";
import MyBookings from "../pages/MyBookings";

// --- Route Protection Logic ---
const ProtectedRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar user deactive hai toh use pricing par bhejo
  if (user && user.status === "deactive") {
    return <Navigate to="/pricing" replace />;
  }

  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          {/* --- PUBLIC ROUTES (Har koi dekh sakta hai) --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/testimonials" element={<TestimonialPage />} />

          {/* --- PROTECTED ROUTES (Sirf Login aur Payment ke baad) --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/browse" element={<BrowseListings />} />
            <Route path="/browse/:slug" element={<BrowseDetails />} />
            <Route path="/reviews/:slug" element={<ListingReviews />} />
            <Route path="/listing/:slug" element={<ListingDetails />} />

            {/* Dashboard Nested Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/listing" element={<Listing />} />
              <Route path="/profile" element={<ProfileUpdate />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/bookmarks" element={<MyBookings />} />
            </Route>
          </Route>
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default AppRoutes;
