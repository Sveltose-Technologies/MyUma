import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapPin, Heart, Clock, Star, User, Share2, Layers } from "lucide-react";
import { toast } from "react-toastify";

// Swiper for Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaSquareXTwitter,
  FaEnvelope,
  FaPinterest,
} from "react-icons/fa6";

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

  const { isAuthenticated, user: reduxUser } = useSelector(
    (state) => state.auth,
  );
  const [listing, setListing] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listingRatings, setListingRatings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleBookmark = async (e, item) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.info("Please login to bookmark items...");
      navigate("/login");
      return;
    }
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
    <div className="bg-light min-vh-100 mt-5 pt-lg-5 pt-4 pb-5">
      {/* HEADER SECTION */}
      <div className="bg-white border-bottom py-4 shadow-sm">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-8">
              <h1 className="fw-800 h2 mb-2 text-navy">{listing.title}</h1>
              <div className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-danger mt-1 flex-shrink-0" />
                <p
                  className="text-muted m-0 lh-sm"
                  style={{ fontSize: "14px" }}>
                  {listing.address}{" "}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 text-md-end">
              <button
                onClick={(e) => handleBookmark(e, listing)}
                className="btn bg-white border rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm">
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
                    : "Login To Bookmark"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-lg-8 col-12">
            {/* CAROUSEL */}
            <div className="rounded-4 overflow-hidden mb-4 shadow-sm border bg-white">
              <div
                className="ratio ratio-16x9 ratio-md-4x3"
                style={{ maxHeight: "450px" }}>
                <Swiper
                  modules={[Pagination, Autoplay]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3500 }}
                  loop={listing.images?.length > 1}
                  className="w-100 h-100">
                  {listing.images?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={getImgURL(img)}
                        className="w-100 h-100 object-fit-cover"
                        alt={listing.title}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <BusinessDetailsUI
              listing={listing}
              nearby={nearby}
              navigate={navigate}
              slugify={slugify}
              getImgURL={getImgURL}
              listingRatings={listingRatings}
              refreshData={fetchData}
            />
          </div>

          <div className="col-lg-4 col-12">
            {/* DYNAMIC CATEGORY & PRICE */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <small className="text-muted d-block mb-1">Category</small>
                  <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-3 fw-800">
                    {listing.categoryId?.name}
                  </span>
                </div>
                <div className="text-end">
                  <small className="text-muted d-block mb-1">Price Range</small>
                  <h4 className="fw-800 m-0 text-navy">
                    ${listing.items?.[0]?.price || 0}
                  </h4>
                </div>
              </div>
              {listing.subCategoryId && (
                <div className="pt-2 border-top">
                  <small className="text-muted d-block mb-1">Subcategory</small>
                  <div className="d-flex align-items-center gap-2 text-navy fw-bold small">
                    <Layers size={14} /> {listing.subCategoryId.subcategoryName}
                  </div>
                </div>
              )}
            </div>
            {/* DYNAMIC OWNER INFO */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <h6 className="fw-800 mb-3 d-flex align-items-center gap-2 text-navy">
                <Clock size={18} className="text-warning" /> OPENING HOURS
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

            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: "60px", height: "60px" }}>
                  <User size={30} className="text-secondary" />
                </div>
                <div>
                  <small className="text-muted d-block">Added By</small>
                  <h5 className="fw-800 m-0 text-navy">MyUma</h5>
                  <button className="btn btn-link text-danger p-0 text-decoration-none small fw-bold">
                    View Profile ›
                  </button>
                </div>
              </div>
              <hr className="my-3 opacity-50" />
              <p className="text-center small mb-0">
                Please{" "}
                <span
                  className="text-danger fw-bold cursor-pointer"
                  onClick={() => navigate("/login")}>
                  sign in
                </span>{" "}
                to see contact details.
              </p>
            </div>
            {/* FULLY DYNAMIC SOCIAL PROFILES - ONLY SHOWS IF DATA EXISTS */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <h6
                className="fw-800 mb-3 text-navy ls-1 text-uppercase"
                style={{ fontSize: "12px" }}>
                Connect with Business
              </h6>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {listing.facebook && (
                  <a
                    href={listing.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-facebook btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <FaFacebook /> <span className="fw-bold">Facebook</span>
                  </a>
                )}
                {listing.twitter && (
                  <a
                    href={listing.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-dark btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <FaSquareXTwitter />{" "}
                    <span className="fw-bold">Twitter</span>
                  </a>
                )}
                {listing.linkedin && (
                  <a
                    href={listing.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-linkedin btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <FaLinkedin /> <span className="fw-bold">LinkedIn</span>
                  </a>
                )}
                {listing.instagram && (
                  <a
                    href={listing.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-instagram btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <FaInstagram /> <span className="fw-bold">Instagram</span>
                  </a>
                )}
                {listing.youtube && (
                  <a
                    href={listing.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-danger btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <FaYoutube /> <span className="fw-bold">YouTube</span>
                  </a>
                )}
                {listing.whatsappNo && (
                  <a
                    href={`https://wa.me/${listing.whatsappNo.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-success btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <FaWhatsapp /> <span className="fw-bold">WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* OPENING HOURS */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseDetails;
