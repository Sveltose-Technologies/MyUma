import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin,
  Layers,
  Clock,
  LogIn,
  CalendarCheck,
  Heart,
  MessageCircle,
  ClipboardPen,
  Loader2,
  Phone,
} from "lucide-react";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa6";

import {
  getAllListingsApi,
  getImgURL,
  getRatingsAPI,
  createBookingAPI,
  getFavoritesByUserAPI,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getBookingByUserAPI,
  getMySubscriptionAPI,
  getPlansAPI,
} from "../services/authService";
import { getUser } from "../utils/storage";
import BusinessDetailsUI from "./BusinessDetailsUI";
import InquiryModal from "./InquiryModal";
import ChatPopup from "./ChatPopup";

const BrowseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { isAuthenticated, user: reduxUser } = useSelector(
    (state) => state.auth,
  );
  const currentUser = reduxUser || getUser();
  const currentId = currentUser?._id || currentUser?.id;
  const isLoggedIn = isAuthenticated || !!localStorage.getItem("token");

  const [listing, setListing] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [listingRatings, setListingRatings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookLoading, setBookLoading] = useState(false);
  const [isChatAllowedByPlan, setIsChatAllowedByPlan] = useState(false);

  const [showInquire, setShowInquire] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const isFavorited = favorites.some((fav) => {
    const favId = typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
    return favId?.toString() === listing?._id?.toString();
  });

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return navigate("/login");
    if (currentUser?.role !== "user")
      return toast.info("Only users can add favorites.");

    const existingFav = favorites.find((fav) => {
      const favId =
        typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
      return favId?.toString() === listing?._id?.toString();
    });

    try {
      if (existingFav) {
        await deleteFavoriteAPI(existingFav._id);
        setFavorites(favorites.filter((fav) => fav._id !== existingFav._id));
        toast.info("Removed from favorites");
      } else {
        const payload = { userId: currentId, itemId: listing._id };
        const res = await addFavoriteAPI(payload);
        if (res.success) {
          setFavorites([...favorites, res.data]);
          toast.success("Added to favorites! ❤️");
        }
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await getAllListingsApi();
      const slugify = (t) =>
        t
          ? t
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "")
          : "";

      const found = res?.listings?.find((i) => slugify(i.title) === slug);

      if (found) {
        setListing(found);
        const ownerId = found.ownerId?._id || found.ownerId;

        // Parallel Fetch for Stats and Chat Permission
        const [ratRes, subRes, plansRes] = await Promise.all([
          getRatingsAPI(),
          getMySubscriptionAPI(ownerId),
          getPlansAPI(),
        ]);

        // Logic: Check if Owner allows Chat
        if (subRes?.success && subRes.payments?.length > 0) {
          const latest = [...subRes.payments]
            .filter((p) => p.status === "success")
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

          if (latest) {
            const allPlans = plansRes?.data?.[0]?.Plan || [];
            const matchedPlan = allPlans.find(
              (p) => p.name === latest.planName,
            );
            if (matchedPlan && matchedPlan.chatIsActive)
              setIsChatAllowedByPlan(true);
          }
        }

        if (ratRes.status) {
          const filtered = ratRes.data.filter(
            (r) =>
              (r.itemId?._id || r.itemId)?.toString() === found._id?.toString(),
          );
          setListingRatings(filtered);
        }

        if (isLoggedIn && currentId) {
          const [bRes, favRes] = await Promise.all([
            getBookingByUserAPI(currentId),
            getFavoritesByUserAPI(currentId),
          ]);
          if (bRes.status) setUserBookings(bRes.bookings || []);
          if (favRes.success) setFavorites(favRes.data || []);
        }

        setNearby(
          res.listings.filter(
            (i) =>
              i.categoryId?._id === found.categoryId?._id &&
              i._id !== found._id,
          ),
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [slug, isLoggedIn, currentId]);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [fetchData]);

  const isOwner =
    isLoggedIn &&
    (currentUser?.role === "owner" ||
      currentId?.toString() === listing?.ownerId?._id?.toString());
  const isBooked = userBookings.some((b) => b.itemId?._id === listing?._id);

  const handleBook = async () => {
    if (!isLoggedIn) return navigate("/login");
    if (isBooked) return toast.info("Already bookmarked");
    setBookLoading(true);
    try {
      const res = await createBookingAPI({
        userId: currentId,
        itemId: listing._id,
      });
      if (res.status) {
        toast.success("Bookmarked Successfully!");
        fetchData();
      }
    } catch (err) {
      toast.error("Action failed");
    } finally {
      setBookLoading(false);
    }
  };

  if (loading || !listing)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center fw-bold">
        LOADING...
      </div>
    );

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="bg-white border-bottom py-4 shadow-sm mt-4">
        <div className="container text-start">
          <div className="row align-items-center g-3">
            <div className="col-md-8">
              <h1 className="fw-800 h2 mb-2 text-navy">{listing.title}</h1>
              <div className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-danger mt-1" />
                <p className="text-muted m-0 small">{listing.address}</p>
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex justify-content-md-end align-items-center gap-2">
                {isLoggedIn && currentUser?.role === "user" && (
                  <button
                    onClick={handleFavoriteToggle}
                    className="btn btn-white border shadow-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "white",
                    }}>
                    <Heart
                      size={22}
                      color={isFavorited ? "#ff4d4d" : "#666"}
                      fill={isFavorited ? "#ff4d4d" : "none"}
                    />
                  </button>
                )}
                {!isLoggedIn ? (
                  <Link
                    to="/login"
                    className="btn btn-outline-danger rounded-pill px-4 fw-bold shadow-sm">
                    <LogIn size={18} className="me-2" /> Login to Bookmark
                  </Link>
                ) : (
                  !isOwner && (
                    <button
                      onClick={handleBook}
                      disabled={bookLoading || isBooked}
                      className={`btn rounded-pill px-4 fw-bold shadow-sm ${isBooked ? "btn-secondary" : "btn-danger"}`}>
                      {bookLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <CalendarCheck size={18} className="me-2" />
                      )}
                      {isBooked ? "Bookmarked" : "Bookmark Now"}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4 text-start">
          <div className="col-lg-8">
            <div className="mb-4">
              <div className="rounded-4 overflow-hidden border bg-white shadow-sm mb-2">
                <Swiper
                  modules={[Thumbs, Autoplay]}
                  autoplay={{ delay: 3500 }}
                  thumbs={{ swiper: thumbsSwiper }}
                  className="ratio ratio-16x9">
                  {listing.images?.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={getImgURL(img)}
                        className="w-100 h-100 object-fit-cover"
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="thumbs-swiper">
                {listing.images?.map((img, i) => (
                  <SwiperSlide key={i} className="cursor-pointer">
                    <div
                      className="rounded-3 overflow-hidden border bg-white shadow-sm"
                      style={{ height: "75px" }}>
                      <img
                        src={getImgURL(img)}
                        className="w-100 h-100 object-fit-cover"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <BusinessDetailsUI
              listing={listing}
              nearby={nearby}
              navigate={navigate}
              getImgURL={getImgURL}
              listingRatings={listingRatings}
              refreshData={fetchData}
              isOwner={isOwner}
            />
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <small className="text-muted d-block">Category</small>
                  <span className="badge bg-danger-subtle text-danger">
                    {listing.categoryId?.name}
                  </span>
                </div>
                <div className="text-end">
                  <small className="text-muted d-block">Price</small>
                  <h4 className="fw-800 text-navy">
                    ${listing.items?.[0]?.price || 0}
                  </h4>
                </div>
              </div>
              <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <Layers size={18} className="text-primary" />
                  <span className="fw-bold text-navy">
                    {listing.subCategoryId?.subcategoryName || "General"}
                  </span>
                </div>
                {/* ⭐ CHAT BUTTON: ONLY SHOW IF ALLOWED AND NOT OWNER */}
                {isChatAllowedByPlan && !isOwner && (
                  <button
                    onClick={() =>
                      isLoggedIn ? setShowChat(true) : navigate("/login")
                    }
                    className="btn btn-primary rounded-circle shadow"
                    style={{
                      width: 42,
                      height: 42,
                      backgroundColor: "#001f3f",
                      border: "none",
                    }}>
                    <MessageCircle size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <h6 className="fw-800 mb-3 text-navy">BUSINESS HOURS</h6>
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
                    <span>{day}</span>
                    <span className="fw-bold text-dark">
                      09:00 AM - 06:00 PM
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white border">
              <img
                src={getImgURL(listing.ownerId?.profileImage)}
                className="rounded-circle mx-auto mb-2 border"
                style={{ width: 75, height: 75, objectFit: "cover" }}
                alt=""
              />
              <h5 className="fw-800 text-navy mb-1">
                {listing.ownerId?.fullName}
              </h5>
              {!isOwner && (
                <button
                  onClick={() =>
                    isLoggedIn ? setShowInquire(true) : navigate("/login")
                  }
                  className="btn w-100 rounded-pill fw-bold text-white py-2 shadow-sm mt-3"
                  style={{ backgroundColor: "#001f3f" }}>
                  <ClipboardPen size={18} className="me-2" /> INQUIRE NOW
                </button>
              )}
              <hr />
              <a
                href={`tel:${listing.phone}`}
                className="text-danger fw-800 text-decoration-none d-flex align-items-center justify-content-center gap-2 h5">
                <Phone size={18} /> {listing.phone || "N/A"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        show={showInquire}
        onClose={() => setShowInquire(false)}
        listingId={listing._id}
      />
      <ChatPopup
        show={showChat}
        onClose={() => setShowChat(false)}
        listing={listing}
        isOwner={isOwner}
        currentId={currentId}
      />
      <style>{`.thumbs-swiper .swiper-slide-thumb-active .border { border: 2px solid #ff4d4d !important; } .cursor-pointer { cursor: pointer; } .animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default BrowseDetails;
