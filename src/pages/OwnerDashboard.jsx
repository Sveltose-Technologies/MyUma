import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getAllListingsApi, 
  getBookingsByOwnerAPI, 
  getRatingsAPI 
} from "../services/authService";
import { getUser } from "../utils/storage";
import { Layers, BookmarkCheck, Star, ArrowRight } from "lucide-react";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ 
    totalListings: 0, 
    totalBookmarks: 0, 
    totalReviews: 0 
  });

  const currentUser = getUser();
  const currentUserId = currentUser?._id || currentUser?.id;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log("--- Dashboard Debug ---");
        console.log("Logged In Owner ID:", currentUserId);

        const [listingsRes, ratingsRes, bookingsRes] = await Promise.all([
          getAllListingsApi(),
          getRatingsAPI(),
          getBookingsByOwnerAPI(currentUserId)
        ]);

        // 1. My Listings Count
        const myListings = listingsRes?.listings?.filter(
          (l) => (l.ownerId?._id || l.ownerId)?.toString() === currentUserId?.toString()
        ) || [];
        console.log("Listings Count:", myListings.length);

        // 2. My Bookmarks Count (API already filters this)
        const myBookmarks = bookingsRes?.bookings || [];
        console.log("Bookmarks Count:", myBookmarks.length);

        // 3. REVIEWS RECEIVED COUNT (Using getRatingsAPI)
        // We check if the owner of the listing being rated matches the current owner
        const ratingsData = ratingsRes?.data || [];
        console.log("Total ratings in database:", ratingsData.length);

        const myReceivedReviews = ratingsData.filter((rate) => {
          // Access ownerId inside itemId object
          const itemOwnerId = rate.itemId?.ownerId?._id || rate.itemId?.ownerId;
          return itemOwnerId?.toString() === currentUserId?.toString();
        });

        console.log("Matched Reviews for this owner:", myReceivedReviews.length);

        setStats({
          totalListings: myListings.length,
          totalBookmarks: myBookmarks.length,
          totalReviews: myReceivedReviews.length,
        });

      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      }
    };

    if (currentUserId) fetchDashboardData();
  }, [currentUserId]);

  const StatCard = ({ title, count, icon: Icon, link, bgColor, iconColor }) => (
    <div className="col-md-4 mb-4">
      <div className="card border-0 shadow-sm rounded-4 p-4 h-100 transition-hover">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h6 className="text-muted fw-bold text-uppercase mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>
              {title}
            </h6>
            <h1 className="fw-800 text-navy mb-0" style={{ fontSize: '32px' }}>{count}</h1>
          </div>
          <div className="p-3 rounded-4" style={{ backgroundColor: bgColor }}>
            <Icon size={26} color={iconColor} />
          </div>
        </div>
        <hr className="my-3 opacity-25" />
        <button 
          onClick={() => navigate(link)}
          className="btn btn-link p-0 text-decoration-none fw-bold text-navy d-flex align-items-center gap-1 small"
        >
          View All <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4 bg-light min-vh-100 text-start">
      <div className="mb-5">
        <h2 className="fw-800 text-navy">Welcome, {currentUser?.fullName?.split(' ')[0]}.</h2>
        <p className="text-muted small">Real-time statistics from your business listings.</p>
      </div>

      <div className="row">
        {/* Box 1 */}
        <StatCard 
          title="Listings" 
          count={stats.totalListings} 
          icon={Layers} 
          bgColor="#eef5ff" 
          iconColor="#448ef6" 
          link="/manage-listings" 
        />

        {/* Box 2 */}
        <StatCard 
          title="Bookmarks" 
          count={stats.totalBookmarks} 
          icon={BookmarkCheck} 
          bgColor="#fff0f0" 
          iconColor="#f64444" 
          link="/bookmarks" 
        />

        {/* Box 3 - FIXED Logic using getRatingsAPI */}
        <StatCard 
          title="Reviews Received" 
          count={stats.totalReviews} 
          icon={Star} 
          bgColor="#fff9e6" 
          iconColor="#f6b144" 
          link="/reviews" 
        />
      </div>

      <style>{`
        .fw-800 { font-weight: 800; }
        .text-navy { color: #001f3f; }
        .transition-hover { transition: transform 0.3s ease; }
        .transition-hover:hover { transform: translateY(-5px); }
      `}</style>
    </div>
  );
};

export default OwnerDashboard;