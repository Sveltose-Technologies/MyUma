import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import {
  Star,
  MessageSquare,
  Calendar,
  Info,
  PlayCircle,
  MapPin,
} from "lucide-react";
import { addRatingAPI } from "../services/authService";
import { getUser } from "../utils/storage";
import { toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Block Hindi Regex
const containsHindi = (text) => /[\u0900-\u097F]/.test(text);

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

const BusinessDetailsUI = ({
  listing,
  nearby,
  navigate,
  slugify,
  getImgURL,
  listingRatings,
  refreshData,
  isOwner,
}) => {
  const [coords, setCoords] = useState([22.7196, 75.8577]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentUser = getUser();
  const hasReviewed = listingRatings?.some(
    (r) =>
      (r.userId?._id || r.userId) === (currentUser?._id || currentUser?.id),
  );

  // YouTube Error 153 Fix
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  useEffect(() => {
    if (listing?.address) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`,
      )
        .then((r) => r.json())
        .then((d) => {
          if (d[0]) setCoords([parseFloat(d[0].lat), parseFloat(d[0].lon)]);
        });
    }
  }, [listing?.address]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return toast.error("Please login to review");
    if (containsHindi(comment))
      return toast.error("Hindi reviews are not allowed. Please use English.");

    setSubmitting(true);
    try {
      const res = await addRatingAPI({
        userId: currentUser._id || currentUser.id,
        itemId: listing._id,
        rating,
        comment: comment.trim(),
      });
      if (res.status) {
        toast.success("Review Added!");
        setShowAddModal(false);
        setComment("");
        refreshData();
      }
    } catch (err) {
      toast.error("Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* DESCRIPTION */}
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
        <h5 className="fw-bold mb-3 text-navy d-flex align-items-center gap-2">
          <Info size={20} className="text-primary" /> Description
        </h5>
        <p className="text-muted m-0 lh-lg">{listing.description}</p>
      </div>

      {/* VIDEO TOUR */}
      {getEmbedUrl(listing.video || listing.youtubeVideo) && (
        <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
          <h5 className="fw-bold mb-3 text-navy d-flex align-items-center gap-2">
            <PlayCircle size={20} className="text-danger" /> Video Tour
          </h5>
          <div className="ratio ratio-16x9 rounded-3 overflow-hidden border bg-light">
            <iframe
              src={getEmbedUrl(listing.video || listing.youtubeVideo)}
              title="Video"
              allowFullScreen></iframe>
          </div>
        </div>
      )}

      {/* REVIEWS HEADER */}
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center">
        <div className="cursor-pointer" onClick={() => setShowListModal(true)}>
          <h5 className="fw-bold mb-1 text-navy">
            Reviews ({listingRatings?.length || 0})
          </h5>
          <small className="text-primary text-decoration-underline">
            View user reviews
          </small>
        </div>
        {!isOwner &&
          (hasReviewed ? (
            <button className="btn btn-sm btn-outline-secondary rounded-pill disabled px-3">
              Already Reviewed
            </button>
          ) : (
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
              Write Review
            </button>
          ))}
      </div>

      {/* MAP */}
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
        <h5 className="fw-bold mb-3 text-navy">Location</h5>
        <div
          style={{ height: "350px" }}
          className="rounded-3 overflow-hidden border">
          <MapContainer center={coords} zoom={13} style={{ height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={coords} />
            <Marker
              position={coords}
              icon={L.icon({
                iconUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            />
          </MapContainer>
        </div>
      </div>

      {/* RELATED LISTINGS */}
      <div className="row g-3">
        <h5 className="fw-bold text-navy mt-2">Related Listings</h5>
        {nearby.slice(0, 4).map((item) => (
          <div
            key={item._id}
            className="col-md-6"
            onClick={() => navigate(`/browse/${slugify(item.title)}`)}>
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white cursor-pointer">
              <div className="ratio ratio-4x3">
                <img
                  src={getImgURL(item.images?.[0])}
                  className="object-fit-cover"
                  alt=""
                />
              </div>
              <div className="p-3">
                <h6 className="fw-bold mb-1 text-truncate">{item.title}</h6>
                <small className="text-muted">
                  <MapPin size={12} /> {item.address}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD REVIEW MODAL */}
      {showAddModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 12000 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header border-0">
                <h5 className="fw-bold">Write a Review</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}></button>
              </div>
              <form
                onSubmit={handleRatingSubmit}
                className="modal-body text-center">
                <div className="d-flex justify-content-center gap-2 mb-3 mt-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className="cursor-pointer"
                      size={30}
                      fill={n <= rating ? "#ffc107" : "none"}
                      stroke={n <= rating ? "#ffc107" : "#ccc"}
                      onClick={() => setRating(n)}
                    />
                  ))}
                </div>
                <textarea
                  className="form-control rounded-3"
                  rows="4"
                  placeholder="How was your experience? (English only)..."
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-danger w-100 mt-4 rounded-pill fw-bold py-2 shadow">
                  {submitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* LIST REVIEWS MODAL */}
      {showListModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 12000 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header bg-light">
                <h5 className="fw-bold">Reviews</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowListModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                {listingRatings.length > 0 ? (
                  listingRatings.map((r) => (
                    <div key={r._id} className="border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <div className="text-warning">
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                        <small className="text-muted">
                          <Calendar size={12} />{" "}
                          {new Date(r.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="m-0 small">{r.comment}</p>
                      <small className="fw-bold text-navy">
                        - {r.userId?.fullName || "Verified User"}
                      </small>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDetailsUI;
