import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapPin, Heart, Clock, Star } from "lucide-react";
import { toast } from "react-toastify";
import {
  getAllListingsApi,
  getImgURL,
  getFavoritesByUserAPI,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getRatingsAPI,
} from "../services/authService";
import { getUser } from "../utils/storage";
import BusinessDetailsUI from "./BusinessDetailsUI";

const BrowseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Get Auth state from Redux
  const { isAuthenticated, user: reduxUser } = useSelector(
    (state) => state.auth,
  );

  const [listing, setListing] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listingRatings, setListingRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Syncing login check (Redux + LocalStorage)
  const currentUser = reduxUser || getUser();
  const isLoggedIn = isAuthenticated || !!localStorage.getItem("token");

  const slugify = (text) =>
    text
      ? text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";

  const fetchData = useCallback(async () => {
    try {
      const res = await getAllListingsApi();
      const all = res?.listings || [];
      const found = all.find((i) => slugify(i.title) === slug);

      if (found) {
        setListing(found);
        setNearby(
          all.filter(
            (i) =>
              i.categoryId?._id === found.categoryId?._id &&
              i._id !== found._id,
          ),
        );

        // Fetch Ratings
        const ratRes = await getRatingsAPI();
        if (ratRes.status && ratRes.data) {
          const filtered = ratRes.data.filter((r) => r.itemId === found._id);
          setListingRatings(filtered);
        }
      }

      if (isLoggedIn && currentUser) {
        const userId = currentUser._id || currentUser.id;
        const favRes = await getFavoritesByUserAPI(userId);
        if (favRes.success) setFavorites(favRes.data);
      }
    } catch (e) {
      console.error("Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  }, [slug, isLoggedIn, currentUser]);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [fetchData]);

  // Handle Bookmark Action
  const handleBookmark = async (e, item) => {
    e.stopPropagation();

    // IF NOT LOGGED IN -> REDIRECT TO LOGIN PAGE
    if (!isLoggedIn) {
      toast.info("Please login to bookmark items...");
      navigate("/login");
      return;
    }

    // IF LOGGED IN -> PERFORM BOOKMARK LOGIC
    const existingFav = favorites.find(
      (fav) =>
        (typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId) ===
        item._id,
    );

    try {
      if (existingFav) {
        await deleteFavoriteAPI(existingFav._id);
        setFavorites(favorites.filter((f) => f._id !== existingFav._id));
        toast.info("Removed from bookmarks");
      } else {
        const res = await addFavoriteAPI({
          userId: currentUser._id || currentUser.id,
          itemId: item._id,
        });
        if (res.success) {
          setFavorites([...favorites, res.data]);
          toast.success("Added to bookmarks");
        }
      }
    } catch (error) {
      toast.error("Bookmark action failed");
    }
  };

  if (loading || !listing)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center fw-bold text-navy">
        Loading...
      </div>
    );

  const isAlreadyFavorited = favorites.some(
    (f) =>
      (typeof f.itemId === "object" ? f.itemId._id : f.itemId) === listing._id,
  );

  return (
    <div className="bg-light min-vh-100 mt-5 pt-5 pb-5">
      {/* HEADER SECTION */}
      <div className="bg-white border-bottom py-4 shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-start flex-wrap">
            <div>
              <h1 className="fw-bold h2 mb-1" style={{ color: "#002147" }}>
                {listing.title}
              </h1>
              <div className="d-flex align-items-center gap-3 mt-1">
                <p className="text-muted small m-0 d-flex align-items-center gap-1">
                  <MapPin size={14} className="text-danger" /> {listing.address}
                </p>
                <div className="d-flex align-items-center gap-1 bg-warning-subtle px-2 py-1 rounded text-warning fw-bold small">
                  <Star size={12} fill="currentColor" /> {listingRatings.length}{" "}
                  Ratings
                </div>
              </div>
            </div>

            {/* DYNAMIC BOOKMARK BUTTON */}
            <button
              onClick={(e) => handleBookmark(e, listing)}
              className="btn bg-white border rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm mt-2"
              style={{ borderColor: "#ddd", color: "#555" }}>
              <Heart
                size={18}
                color="#ff4d4d"
                fill={isAlreadyFavorited ? "#ff4d4d" : "none"}
              />
              <span className="fw-bold small">
                {isLoggedIn
                  ? isAlreadyFavorited
                    ? "Bookmarked"
                    : "Bookmark Listing"
                  : "Login To Bookmark Items"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <div
              className="rounded-4 overflow-hidden mb-4 shadow-sm border"
              style={{ height: "400px" }}>
              <img
                src={getImgURL(listing.images?.[0])}
                className="w-100 h-100 object-fit-cover"
                alt={listing.title}
              />
            </div>

            <BusinessDetailsUI
              listing={listing}
              nearby={nearby}
              favorites={favorites}
              handleBookmark={handleBookmark}
              navigate={navigate}
              slugify={slugify}
              getImgURL={getImgURL}
              listingRatings={listingRatings}
              refreshData={fetchData}
            />
          </div>

          <div className="col-lg-4">
            {/* OPENING HOURS */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <h6
                className="fw-bold mb-4 d-flex align-items-center gap-2"
                style={{ color: "#002147" }}>
                <Clock size={18} className="text-warning" /> Opening Hours
              </h6>
              <div className="small text-muted">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div
                    key={day}
                    className="d-flex justify-content-between py-2 border-bottom border-light">
                    <span>{day}</span>{" "}
                    <span className="fw-bold text-dark">
                      08:00 AM - 06:00 PM
                    </span>
                  </div>
                ))}
                <div className="d-flex justify-content-between py-2 text-danger fw-bold">
                  <span>Sunday</span> <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseDetails;
