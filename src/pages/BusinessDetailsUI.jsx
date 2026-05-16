import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapPin, Star, MessageSquare, Calendar } from "lucide-react";
import { addRatingAPI } from "../services/authService";
import { getUser } from "../utils/storage";
import { toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
  const hasReviewed = listingRatings.some(
    (rev) =>
      (rev.userId?._id || rev.userId) === (currentUser?._id || currentUser?.id),
  );

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

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return toast.error("Please login to submit a rating");
    setSubmitting(true);
    try {
      const res = await addRatingAPI({
        userId: currentUser._id || currentUser.id,
        itemId: listing._id,
        rating: Number(rating),
        comment: comment.trim(),
      });
      if (res.status) {
        toast.success("Rating submitted successfully!");
        setShowAddModal(false);
        setComment("");
        refreshData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* REVIEW HEADER */}
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
        {hasReviewed ? (
          <button
            className="btn btn-outline-secondary rounded-pill px-4 fw-bold shadow-sm"
            disabled>
            Review Submitted
          </button>
        ) : (
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
            Write a Review
          </button>
        )}
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

      {/* NEARBY */}
      <div className="row g-4 mt-2">
        <h4
          className="fw-bold mb-4 border-bottom pb-3"
          style={{ color: "#002147" }}>
          Related Listings
        </h4>
        {nearby.map((item) => (
          <div
            key={item._id}
            className="col-md-6"
            onClick={() => navigate(`/browse/${slugify(item.title)}`)}
            style={{ cursor: "pointer" }}>
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden border bg-white">
              <div className="ratio ratio-4x3">
                <img
                  src={getImgURL(item.images?.[0])}
                  className="object-fit-cover w-100 h-100"
                  alt={item.title}
                />
              </div>
              <div className="card-body p-4">
                <small
                  className="text-uppercase fw-bold text-muted mb-1 d-block"
                  style={{ fontSize: "11px" }}>
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

      {/* MODALS (Review Add/List) */}
      {showAddModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header border-0">
                <h5 className="fw-bold">Write a Review</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleRatingSubmit}>
                <div className="modal-body text-center">
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
                    className="form-control rounded-3 bg-light p-3"
                    rows="4"
                    placeholder="Your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required></textarea>
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill"
                    onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger rounded-pill fw-bold"
                    disabled={submitting}>
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showListModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header bg-light px-4 border-0">
                <h5 className="fw-bold">Reviews ({listingRatings.length})</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowListModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                {listingRatings.length > 0 ? (
                  listingRatings.map((rev) => (
                    <div key={rev._id} className="pb-3 mb-3 border-bottom">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-warning d-flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < rev.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                            />
                          ))}
                        </div>
                        <small className="text-muted">
                          <Calendar size={12} />{" "}
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="m-0 small">{rev.comment}</p>
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
      <style>{`.cursor-pointer { cursor: pointer; }`}</style>
    </div>
  );
};

export default BusinessDetailsUI;
