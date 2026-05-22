import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin,
  Layers,
  Phone,
  MessageCircle,
  Send,
  X,
  Loader2,
  ClipboardPen,
  CalendarCheck,
  Heart,
  Globe,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";

// Swiper for Gallery
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
  getChatHistoryAPI,
  sendMessageAPI,
  sendInquireApi,
  createBookingAPI,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getFavoritesByUserAPI,
} from "../services/authService";
import { getUser } from "../utils/storage";
import BusinessDetailsUI from "./BusinessDetailsUI";

const BrowseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  // State for Thumbnail sync
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
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Interaction States
  const [showInquireModal, setShowInquireModal] = useState(false);
  const [inquireLoading, setInquireLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [inquireForm, setInquireForm] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    comment: "",
  });
  const [showChat, setShowChat] = useState(false);

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
        if (ratRes.status)
          setListingRatings(ratRes.data.filter((r) => r.itemId === found._id));

        if (isLoggedIn) {
          const favRes = await getFavoritesByUserAPI(currentId);
          if (favRes.success) setFavorites(favRes.data);
        }
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

  // Logic: Check if visitor is the Owner
  const isOwner = isLoggedIn && currentId === listing?.ownerId?._id;

  const handleBookNow = async () => {
    if (!isLoggedIn) return navigate("/login");
    setBookLoading(true);
    try {
      const res = await createBookingAPI({
        userId: currentId,
        itemId: listing._id,
      });
      if (res.status) toast.success("Booking Request Sent!");
    } catch (err) {
      toast.error("Booking Failed");
    } finally {
      setBookLoading(false);
    }
  };

  const handleFavoriteAction = async () => {
    if (!isLoggedIn) return navigate("/login");
    const existing = favorites.find(
      (f) => (f.itemId?._id || f.itemId) === listing._id,
    );
    try {
      if (existing) {
        await deleteFavoriteAPI(existing._id);
        setFavorites(favorites.filter((f) => f._id !== existing._id));
        toast.info("Removed from Bookmarks");
      } else {
        const res = await addFavoriteAPI({
          userId: currentId,
          itemId: listing._id,
        });
        if (res.success) {
          setFavorites([...favorites, res.data]);
          toast.success("Added to Bookmarks");
        }
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  if (loading || !listing)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        Loading...
      </div>
    );

  return (
    <div className="bg-light min-vh-100 pt-4 pb-5">
      {/* PAGE HEADER */}
      <div className="bg-white border-bottom py-4 shadow-sm mt-5">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-8">
              <h1 className="fw-800 h2 mb-2 text-navy">{listing.title}</h1>
              <div className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-danger mt-1" />
                <p className="text-muted m-0 small">{listing.address}</p>
              </div>
            </div>
            <div className="col-12 col-md-4 text-md-end d-flex gap-2 justify-content-md-end">
              {!isOwner && (
                <>
                  <button
                    onClick={handleFavoriteAction}
                    className="btn border rounded-pill bg-white px-3 shadow-sm">
                    <Heart
                      size={20}
                      fill={
                        favorites.some(
                          (f) => (f.itemId?._id || f.itemId) === listing._id,
                        )
                          ? "#ff4d4d"
                          : "none"
                      }
                      color="#ff4d4d"
                    />
                  </button>
                  <button
                    onClick={handleBookNow}
                    disabled={bookLoading}
                    className="btn btn-danger rounded-pill px-4 fw-bold">
                    {bookLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <CalendarCheck size={18} className="me-2" />
                    )}
                    Book Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-lg-8">
            {/* GALLERY WITH THUMBNAILS */}
            <div className="mb-4">
              <div className="rounded-4 overflow-hidden border bg-white shadow-sm mb-2">
                <Swiper
                  modules={[Thumbs, Autoplay]}
                  autoplay={{ delay: 3500 }}
                  navigation={false} // Arrows removed
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

              {/* SMALL THUMBNAIL BOXES */}
              {listing.images?.length > 1 && (
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={5}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  className="thumbs-swiper"
                  breakpoints={{
                    0: { slidesPerView: 3 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 6 },
                  }}>
                  {listing.images.map((img, i) => (
                    <SwiperSlide key={i} className="cursor-pointer">
                      <div
                        className="rounded-3 overflow-hidden border bg-white shadow-sm"
                        style={{ height: "75px" }}>
                        <img
                          src={getImgURL(img)}
                          className="w-100 h-100 object-fit-cover"
                          alt="thumb"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>

            <BusinessDetailsUI
              listing={listing}
              nearby={nearby}
              navigate={navigate}
              slugify={slugify}
              getImgURL={getImgURL}
              listingRatings={listingRatings}
              refreshData={fetchData}
              isOwner={isOwner}
            />
          </div>

          <div className="col-lg-4">
            {/* CATEGORY & PRICE */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <small className="text-muted d-block">Category</small>
                  <span className="badge bg-danger-subtle text-danger px-3">
                    {listing.categoryId?.name}
                  </span>
                </div>
                <div className="text-end">
                  <small className="text-muted d-block">Price</small>
                  <h4 className="fw-800 text-navy">
                    ₹{listing.items?.[0]?.price || 0}
                  </h4>
                </div>
              </div>
              {!isOwner && (
                <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-navy">Chat with Owner</span>
                  <button
                    onClick={() => setShowChat(true)}
                    className="btn btn-primary rounded-circle shadow"
                    style={{ width: 42, height: 42 }}>
                    <MessageCircle size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* STATIC BUSINESS HOURS */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <h6 className="fw-800 mb-3 text-navy d-flex align-items-center">
                <Clock size={18} className="text-warning me-2" /> BUSINESS HOURS
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
                    <span>{day}</span>
                    <span className="fw-bold text-dark">
                      09:00 AM - 06:00 PM
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC CONNECT SECTION */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <h6 className="fw-bold mb-3 text-navy text-uppercase">
                Connect with Business
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {listing.facebook && (
                  <a
                    href={listing.facebook}
                    target="_blank"
                    className="btn btn-outline-primary rounded-circle p-2">
                    <FaFacebook size={18} />
                  </a>
                )}
                {listing.instagram && (
                  <a
                    href={listing.instagram}
                    target="_blank"
                    className="btn btn-outline-danger rounded-circle p-2">
                    <FaInstagram size={18} />
                  </a>
                )}
                {listing.whatsappNo && (
                  <a
                    href={`https://wa.me/${listing.whatsappNo.replace(/\+/g, "")}`}
                    target="_blank"
                    className="btn btn-outline-success rounded-circle p-2">
                    <FaWhatsapp size={18} />
                  </a>
                )}
                {listing.twitter && (
                  <a
                    href={listing.twitter}
                    target="_blank"
                    className="btn btn-outline-dark rounded-circle p-2">
                    <FaTwitter size={18} />
                  </a>
                )}
                {listing.linkedin && (
                  <a
                    href={listing.linkedin}
                    target="_blank"
                    className="btn btn-outline-primary rounded-circle p-2">
                    <FaLinkedin size={18} />
                  </a>
                )}
                {listing.youtube && (
                  <a
                    href={listing.youtube}
                    target="_blank"
                    className="btn btn-outline-danger rounded-circle p-2">
                    <FaYoutube size={18} />
                  </a>
                )}
                {listing.website && (
                  <a
                    href={listing.website}
                    target="_blank"
                    className="btn btn-outline-secondary rounded-circle p-2">
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* OWNER INFO */}
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
                  onClick={() => setShowInquireModal(true)}
                  className="btn w-100 rounded-pill fw-bold text-white py-2 shadow-sm mt-3"
                  style={{ backgroundColor: "#001f3f" }}>
                  <ClipboardPen size={18} className="me-2" /> INQUIRE NOW
                </button>
              )}
              <hr />
              <a
                href={`tel:${listing.phone}`}
                className="text-danger fw-800 text-decoration-none d-flex align-items-center justify-content-center gap-2 h5">
                <Phone size={18} /> {listing.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: INQUIRY */}
      {showInquireModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
          style={{ zIndex: 11000, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div
            className="bg-white rounded-4 shadow-lg w-100 overflow-hidden"
            style={{ maxWidth: "400px" }}>
            <div
              className="p-3 text-white d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#001f3f" }}>
              <h6 className="m-0">Direct Inquiry</h6>
              <X
                className="cursor-pointer"
                onClick={() => setShowInquireModal(false)}
              />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Inquiry Sent!");
                setShowInquireModal(false);
              }}
              className="p-4">
              <input
                type="text"
                placeholder="Full Name"
                className="form-control rounded-pill mb-3"
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="form-control rounded-pill mb-3"
                required
              />
              <textarea
                placeholder="Message..."
                className="form-control rounded-4 mb-3"
                rows="3"
                required></textarea>
              <button
                className="btn text-white w-100 rounded-pill fw-bold py-2"
                style={{ backgroundColor: "#001f3f" }}>
                SUBMIT INQUIRY
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .thumbs-swiper .swiper-slide-thumb-active .border { border: 2px solid #ff4d4d !important; }
        .cursor-pointer { cursor: pointer; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default BrowseDetails;
