import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin,
  Heart,
  Clock,
  User,
  Layers,
  Phone,
  MessageCircle,
  Send,
  X,
  Loader2,
  ArrowLeft,
} from "lucide-react";
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
} from "react-icons/fa6";

import {
  getAllListingsApi,
  getImgURL,
  getFavoritesByUserAPI,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getRatingsAPI,
  getChatHistoryAPI,
  sendMessageAPI,
  getChatByAdminAPI,
} from "../services/authService";
import { getUser } from "../utils/storage";
import BusinessDetailsUI from "./BusinessDetailsUI";

const BrowseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const { isAuthenticated, user: reduxUser } = useSelector(
    (state) => state.auth,
  );
  const [listing, setListing] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listingRatings, setListingRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- CHAT STATES ---
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  const currentUser = reduxUser || getUser();
  const currentId = currentUser?._id || currentUser?.id;
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
      if (isLoggedIn && currentId) {
        const favRes = await getFavoritesByUserAPI(currentId);
        if (favRes.success) setFavorites(favRes.data);
      }
    } catch (e) {
      console.error("Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  }, [slug, isLoggedIn, currentId]);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [fetchData]);

  // --- CHAT LOGIC ---
  const isOwnerOfListing = isLoggedIn && currentId === listing?.ownerId?._id;

  // REQ: Login check logic for Chat Icon
  const handleChatIconClick = () => {
    if (!isLoggedIn) {
      toast.info("Please login to start a conversation with the owner.");
      navigate("/login");
      return;
    }
    setShowChat(true);
  };

  const fetchChatData = async () => {
    if (!isLoggedIn || !listing) return;
    try {
      if (isOwnerOfListing) {
        const res = await getChatByAdminAPI(currentId);
        if (res.success) {
          const uniqueUsers = [];
          const map = new Map();
          res.data.forEach((msg) => {
            const otherUser =
              msg.senderId === currentId ? msg.receiverData : msg.senderData;
            if (otherUser && !map.has(otherUser._id)) {
              map.set(otherUser._id, true);
              uniqueUsers.push(otherUser);
            }
          });
          setChatUsers(uniqueUsers);
        }
        if (selectedUser) {
          const history = await getChatHistoryAPI(currentId, selectedUser._id);
          if (history.success) setChatMessages(history.data);
        }
      } else {
        const history = await getChatHistoryAPI(currentId, listing.ownerId._id);
        if (history.success) setChatMessages(history.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (showChat) {
      fetchChatData();
      const interval = setInterval(fetchChatData, 4000);
      return () => clearInterval(interval);
    }
  }, [showChat, selectedUser, listing]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, viewMode]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setIsSending(true);
    try {
      const payload = {
        senderId: currentId,
        receiverId: isOwnerOfListing ? selectedUser._id : listing.ownerId._id,
        message: newMessage,
      };
      const res = await sendMessageAPI(payload);
      if (res.success) {
        setNewMessage("");
        fetchChatData();
      }
    } catch (err) {
      toast.error("Failed to send");
    } finally {
      setIsSending(false);
    }
  };

  const handleBookmark = async (e, item) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.info("Login to bookmark this item");
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
      } else {
        const res = await addFavoriteAPI({
          userId: currentId,
          itemId: item._id,
        });
        if (res.success) setFavorites([...favorites, res.data]);
      }
    } catch (error) {
      toast.error("Bookmark failed");
    }
  };

  if (loading || !listing)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        Loading...
      </div>
    );

  const isAlreadyFavorited = favorites.some(
    (f) =>
      (typeof f.itemId === "object" ? f.itemId._id : f.itemId) === listing._id,
  );

  return (
    <div className="bg-light min-vh-100 mt-5 pt-lg-5 pt-4 pb-5">
      {/* HEADER */}
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
                  {listing.address}
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
                      : "Bookmark"
                    : "Login to Bookmark"}
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
              <div className="ratio ratio-16x9" style={{ maxHeight: "450px" }}>
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
              nearby={nearby || []}
              navigate={navigate}
              slugify={slugify}
              getImgURL={getImgURL}
              listingRatings={listingRatings || []}
              refreshData={fetchData}
            />
          </div>

          <div className="col-lg-4 col-12">
            {/* CATEGORY & CHAT BUTTON */}
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
              <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted d-block mb-1">Subcategory</small>
                  <h6 className="text-navy fw-bold m-0">
                    <Layers size={16} className="me-2" />
                    {listing.subCategoryId?.subcategoryName || "General"}
                  </h6>
                </div>
                {!isOwnerOfListing && (
                  <button
                    onClick={handleChatIconClick}
                    className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center shadow"
                    style={{ width: "42px", height: "42px" }}>
                    <MessageCircle size={22} color="white" />
                  </button>
                )}
              </div>
            </div>

            {/* OPENING HOURS UI */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <h6 className="fw-800 mb-3 text-navy d-flex align-items-center">
                <Clock size={18} className="text-warning me-2" /> OPENING HOURS
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
                <div className="d-flex justify-content-between py-2 text-danger fw-bold">
                  <span>Sunday</span> <span>Closed</span>
                </div>
              </div>
            </div>

            {/* OWNER INFO */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border text-center">
              <div className="d-flex align-items-center gap-3 justify-content-center">
                <div
                  className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center border"
                  style={{ width: "60px", height: "60px" }}>
                  {listing.ownerId?.profileImage ? (
                    <img
                      src={getImgURL(listing.ownerId.profileImage)}
                      alt="Owner"
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <User size={30} className="text-secondary" />
                  )}
                </div>
                <div className="text-start">
                  <small className="text-muted d-block">Added By</small>
                  <h5 className="fw-800 m-0 text-navy">
                    {listing.ownerId?.fullName || "Owner"}
                  </h5>
                </div>
              </div>
              <hr className="my-3 opacity-50" />
              {isLoggedIn ? (
                <div className="py-2">
                  <p className="text-muted small mb-1 fw-bold">
                    Contact Details
                  </p>
                  <a
                    href={`tel:${listing.phone}`}
                    className="text-danger fw-800 text-decoration-none h5 d-flex align-items-center justify-content-center gap-2">
                    <Phone size={18} /> {listing.phone}
                  </a>
                </div>
              ) : (
                <p className="small mb-0">
                  Please{" "}
                  <span
                    className="text-danger fw-bold cursor-pointer"
                    onClick={() => navigate("/login")}>
                    sign in
                  </span>{" "}
                  to see contact.
                </p>
              )}
            </div>

            {/* SOCIAL MEDIA DYNAMIC UI */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border">
              <h6
                className="fw-800 mb-3 text-navy ls-1 text-uppercase text-center"
                style={{ fontSize: "11px" }}>
                Connect with Business
              </h6>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {listing.facebook && (
                  <a
                    href={listing.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary btn-sm rounded-pill px-3 shadow-sm">
                    <FaFacebook />
                  </a>
                )}
                {listing.instagram && (
                  <a
                    href={listing.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-danger btn-sm rounded-pill px-3 shadow-sm">
                    <FaInstagram />
                  </a>
                )}
                {listing.linkedin && (
                  <a
                    href={listing.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-info btn-sm rounded-pill px-3 shadow-sm">
                    <FaLinkedin />
                  </a>
                )}
                {listing.youtube && (
                  <a
                    href={listing.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-danger btn-sm rounded-pill px-3 shadow-sm">
                    <FaYoutube />
                  </a>
                )}
                {listing.whatsappNo && (
                  <a
                    href={`https://wa.me/${listing.whatsappNo.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-success btn-sm rounded-pill px-3 shadow-sm">
                    <FaWhatsapp />
                  </a>
                )}
                {/* Fallback if no socials */}
                {!listing.facebook &&
                  !listing.instagram &&
                  !listing.linkedin &&
                  !listing.youtube &&
                  !listing.whatsappNo && (
                    <small className="text-muted italic">
                      No social links provided.
                    </small>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- WHATSAPP STYLE CHAT POPUP --- */}
      {showChat && (
        <div
          className="position-fixed bottom-0 end-0 m-3 shadow-lg border-0 rounded-4 overflow-hidden bg-white chat-popup"
          style={{
            width: "380px",
            zIndex: 10000,
            height: "550px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ddd",
          }}>
          {/* Header */}
          <div
            className="p-3 d-flex justify-content-between align-items-center text-white"
            style={{ backgroundColor: "#001f3f" }}>
            <div className="d-flex align-items-center gap-2">
              {isOwnerOfListing && viewMode === "chat" && (
                <ArrowLeft
                  className="cursor-pointer me-2"
                  size={20}
                  onClick={() => {
                    setViewMode("list");
                    setSelectedUser(null);
                  }}
                />
              )}
              <div
                className="bg-white rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
                style={{ width: "38px", height: "38px" }}>
                {!isOwnerOfListing && listing.ownerId?.profileImage ? (
                  <img
                    src={getImgURL(listing.ownerId.profileImage)}
                    className="w-100 h-100 object-fit-cover"
                    alt="owner"
                  />
                ) : selectedUser?.profileImage ? (
                  <img
                    src={getImgURL(selectedUser.profileImage)}
                    className="w-100 h-100 object-fit-cover"
                    alt="user"
                  />
                ) : (
                  <User size={18} color="#001f3f" />
                )}
              </div>
              <div>
                <span
                  className="fw-bold d-block lh-1"
                  style={{ fontSize: "14px" }}>
                  {isOwnerOfListing
                    ? viewMode === "list"
                      ? "Clients"
                      : selectedUser?.fullName
                    : listing.ownerId?.fullName}
                </span>
                <small style={{ fontSize: "10px", opacity: 0.8 }}>Online</small>
              </div>
            </div>
            <X
              className="cursor-pointer"
              size={20}
              onClick={() => setShowChat(false)}
            />
          </div>

          {/* Chat Body */}
          <div
            className="flex-grow-1 overflow-auto p-3 d-flex flex-column"
            style={{
              backgroundColor: "#e5ddd5",
              backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
              backgroundRepeat: "repeat",
            }}>
            {isOwnerOfListing && viewMode === "list" ? (
              <div className="d-flex flex-column gap-2">
                {chatUsers.length > 0 ? (
                  chatUsers.map((u) => (
                    <div
                      key={u._id}
                      onClick={() => {
                        setSelectedUser(u);
                        setViewMode("chat");
                      }}
                      className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 shadow-sm cursor-pointer border">
                      <div className="bg-light rounded-circle p-2">
                        <User size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <div className="fw-bold text-navy text-truncate small">
                          {u.fullName}
                        </div>
                        <div
                          className="text-muted text-truncate"
                          style={{ fontSize: "11px" }}>
                          {u.email}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center mt-5 p-3 bg-white rounded-3 shadow-sm">
                    No messages yet.
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {chatMessages.map((msg, i) => {
                  const sId =
                    typeof msg.senderId === "object"
                      ? msg.senderId._id
                      : msg.senderId;
                  const isMe = sId === currentId;
                  return (
                    <div
                      key={i}
                      className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
                      <div
                        className="shadow-sm position-relative"
                        style={{
                          maxWidth: "85%",
                          padding: "10px 45px 20px 12px",
                          fontSize: "14px",
                          lineHeight: "1.4",
                          borderRadius: isMe
                            ? "15px 15px 0 15px"
                            : "15px 15px 15px 0",
                          backgroundColor: isMe ? "#001f3f" : "#ffffff",
                          color: isMe ? "#ffffff" : "#333333",
                          minWidth: "80px",
                          wordBreak: "break-word",
                        }}>
                        <span>{msg.message}</span>
                        <div
                          className="position-absolute"
                          style={{
                            bottom: "4px",
                            right: "8px",
                            fontSize: "10px",
                            opacity: isMe ? 0.8 : 0.6,
                            whiteSpace: "nowrap",
                            color: isMe ? "#fff" : "#666",
                          }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {/* Input Form */}
          {(viewMode === "chat" || !isOwnerOfListing) && (
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-light border-top d-flex gap-2 align-items-center">
              <input
                type="text"
                className="form-control rounded-pill border-0 shadow-sm px-4 py-2 small"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={isSending || !newMessage.trim()}
                className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow"
                style={{
                  width: "45px",
                  height: "45px",
                  flexShrink: 0,
                  backgroundColor: "#001f3f",
                }}>
                {isSending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default BrowseDetails;
