import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {
  Navigation,
  MapPin,
  Layers,
  Star,
  MessageSquare,
  Heart,
  Calendar,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaSquareXTwitter,
  FaShareNodes,
} from "react-icons/fa6";

import { addRatingAPI } from "../services/authService";
import { getUser } from "../utils/storage";
import { toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Marker Fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

const BusinessDetailsUI = ({
  listing,
  nearby,
  favorites,
  handleBookmark,
  navigate,
  slugify,
  getImgURL,
  listingRatings = [],
  refreshData,
}) => {
  const [coords, setCoords] = useState([22.7196, 75.8577]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentUser = getUser();

  useEffect(() => {
    if (listing?.address) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0)
            setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        });
    }
  }, [listing.address]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: `Check out ${listing.title} on Cliky!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // --- FIXED RATING SUBMIT TO PREVENT 400 ERROR ---
  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please login to submit a rating");
      return;
    }

    setSubmitting(true);

    const ratingPayload = {
      userId: currentUser._id || currentUser.id,
      itemId: listing._id,
      rating: Number(rating), // Force it to be a Number
      comment: comment.trim(), // Clean whitespace
    };

    console.log("Submitting Rating Payload:", ratingPayload);

    try {
      const res = await addRatingAPI(ratingPayload);
      if (res.status) {
        toast.success("Rating submitted successfully!");
        setShowAddModal(false);
        setComment("");
        setRating(5);
        refreshData(); // Triggers re-fetch in parent
      } else {
        toast.error(res.message || "Failed to submit rating");
      }
    } catch (err) {
      console.error(
        "Submission Error Details:",
        err.response?.data || err.message,
      );
      toast.error("Failed to submit rating. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* REVIEW HEADER ACTIONS */}
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowListModal(true)}>
          <h5 className="fw-bold mb-1" style={{ color: "#002147" }}>
            Business Reviews
          </h5>
          <p className="text-muted small m-0 d-flex align-items-center gap-1 text-decoration-underline">
            <MessageSquare size={14} /> View all {listingRatings.length} reviews
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
          Write a Review
        </button>
      </div>

      {/* SOCIAL MEDIA SECTION */}
      <div className="bg-white p-3 rounded-4 shadow-sm mb-4 border">
        <div className="d-flex align-items-center gap-4 flex-wrap justify-content-center">
          {listing.facebook && (
            <a
              href={listing.facebook}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              style={{ color: "#1877F2" }}>
              <FaFacebook size={32} />
            </a>
          )}
          {listing.instagram && (
            <a
              href={listing.instagram}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              style={{ color: "#E4405F" }}>
              <FaInstagram size={32} />
            </a>
          )}
          {listing.twitter && (
            <a
              href={listing.twitter}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              style={{ color: "#000000" }}>
              <FaSquareXTwitter size={32} />
            </a>
          )}
          {listing.linkedin && (
            <a
              href={listing.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              style={{ color: "#0A66C2" }}>
              <FaLinkedin size={32} />
            </a>
          )}
          {listing.youtube && (
            <a
              href={listing.youtube}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              style={{ color: "#FF0000" }}>
              <FaYoutube size={32} />
            </a>
          )}
          {listing.whatsappNo && (
            <a
              href={`https://wa.me/${listing.whatsappNo.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              style={{ color: "#25D366" }}>
              <FaWhatsapp size={32} />
            </a>
          )}
          <button
            onClick={handleShare}
            className="btn border-0 p-0 social-btn"
            style={{ color: "#6c757d" }}>
            <FaShareNodes size={32} />
          </button>
        </div>
      </div>

      {/* PRICE & CATEGORY */}
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center">
        <div className="d-inline-flex align-items-center gap-2 border rounded-3 px-3 py-2 border-danger-subtle bg-light">
          <Layers size={18} className="text-danger" />
          <span className="fw-bold small">{listing.categoryId?.name}</span>
        </div>
        <div className="text-end">
          <small className="text-muted">Price</small>
          <h4 className="fw-bold m-0" style={{ color: "#002147" }}>
            ${listing.items?.[0]?.price || 0}
          </h4>
        </div>
      </div>

      {/* MAP */}
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
        <h5 className="fw-bold mb-3" style={{ color: "#002147" }}>
          Location
        </h5>
        <div
          className="rounded-3 overflow-hidden border"
          style={{ height: "350px" }}>
          <MapContainer
            center={coords}
            zoom={13}
            style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={coords} />
            <Marker position={coords} icon={DefaultIcon}>
              <Popup>{listing.title}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* NEARBY LISTINGS */}
      <div className="row g-4 mt-2">
        <h4
          className="fw-bold mb-4 border-bottom pb-3"
          style={{ color: "#002147" }}>
          Near by Listings
        </h4>
        {nearby.map((item) => (
          <div
            key={item._id}
            className="col-md-6"
            onClick={() => navigate(`/browse/${slugify(item.title)}`)}
            style={{ cursor: "pointer" }}>
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden border bg-white">
              <div className="position-relative">
                <div className="ratio ratio-4x3">
                  <img
                    src={getImgURL(item.images?.[0])}
                    className="object-fit-cover w-100 h-100"
                  />
                </div>
                <div
                  className="position-absolute bg-white px-2 py-1 rounded-2 shadow-sm"
                  style={{ top: "10px", left: "10px" }}>
                  <span className="fw-bold small" style={{ color: "#002147" }}>
                    ${item.items?.[0]?.price || 0}
                  </span>
                </div>
              </div>
              <div className="card-body p-4">
                <small
                  className="text-uppercase fw-bold mb-1"
                  style={{ color: "#7b92a6", fontSize: "11px" }}>
                  {item.categoryId?.name}
                </small>
                <h6 className="fw-bold mb-1" style={{ color: "#002147" }}>
                  {item.title}
                </h6>
                <p className="text-muted small mb-0 d-flex align-items-center gap-1">
                  <MapPin size={14} className="text-danger" /> {item.address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: ADD REVIEW */}
      {showAddModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-light border-0">
                <h5 className="modal-title fw-bold">Write a Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleRatingSubmit}>
                <div className="modal-body text-center p-4">
                  <p className="text-muted mb-4">
                    How would you rate your experience?
                  </p>
                  <div className="d-flex justify-content-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star
                        key={num}
                        size={35}
                        className="cursor-pointer"
                        fill={num <= rating ? "#ffc107" : "none"}
                        stroke={num <= rating ? "#ffc107" : "#ccc"}
                        onClick={() => setRating(num)}
                      />
                    ))}
                  </div>
                  <textarea
                    className="form-control rounded-3 border-light-subtle bg-light p-3"
                    rows="4"
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required></textarea>
                </div>
                <div className="modal-footer border-0 p-3">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill px-4"
                    onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger rounded-pill px-4 fw-bold"
                    disabled={submitting}>
                    {submitting ? "Posting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: LIST REVIEWS */}
      {showListModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header bg-light px-4 border-0">
                <h5 className="modal-title fw-bold">
                  Customer Reviews ({listingRatings.length})
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowListModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                {listingRatings.length > 0 ? (
                  listingRatings.map((rev, idx) => (
                    <div
                      key={rev._id}
                      className={`pb-3 mb-3 ${idx !== listingRatings.length - 1 ? "border-bottom" : ""}`}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="text-warning d-flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < rev.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                            />
                          ))}
                        </div>
                        <small className="text-muted fw-bold">
                          <Calendar size={14} className="me-1" />{" "}
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="m-0 text-dark small">
                        {rev.comment || "No comment provided."}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5 opacity-50">
                    <MessageSquare size={48} className="mb-2" />
                    <p className="fw-bold">No reviews found.</p>
                  </div>
                )}
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-navy text-white rounded-pill w-100 py-2"
                  style={{ background: "#002147" }}
                  onClick={() => setShowListModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .social-btn { transition: transform 0.2s; display: inline-block; cursor: pointer; }
        .social-btn:hover { transform: scale(1.15); }
        .cursor-pointer { cursor: pointer; }
      `}</style>
    </div>
  );
};

export default BusinessDetailsUI;
