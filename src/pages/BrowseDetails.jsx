import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react"; // Icons ke liye
import {
  getAllListingsApi,
  getImgURL,
  addRatingAPI,
  addReviewAPI,
  getRatingsAPI,
  getReviewsAPI,
  createBookingAPI, // Added this
} from "../services/authService";

const BrowseDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState("");

  // --- REVIEW & RATING STATES ---
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currentUserId = localStorage.getItem("userId") || ""; // Login user ki ID

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const fetchDetails = async () => {
    try {
      const res = await getAllListingsApi();
      const found = res?.listings?.find((item) => slugify(item.title) === slug);
      if (found) {
        setListing(found);
        setActiveImg(found.images?.[0] || "");

        // Is Item ke saare reviews aur ratings mangwana
        const [ratRes, revRes] = await Promise.all([
          getRatingsAPI(),
          getReviewsAPI(),
        ]);

        // Filter reviews for this item
        const itemReviews =
          revRes?.data?.filter((r) => r.itemId === found._id) || [];
        const itemRatings =
          ratRes?.data?.filter((r) => r.itemId === found._id) || [];

        // Dono ko merge karna taaki user name aur rating ek saath dikhe
        const merged = itemReviews.map((rev) => {
          const matchingRating = itemRatings.find(
            (rat) => rat.userId === rev.userId,
          );
          return {
            ...rev,
            ratingValue: matchingRating ? matchingRating.rating : 5,
          };
        });

        setAllReviews(merged);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [slug]);
const handleBooking = async () => {
  // Check exact keys from localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Debugging: Check console if values are null
  console.log("Current Token:", token);
  console.log("Current UserId:", userId);

  if (!token) {
    alert("Token not found. Please login again.");
    navigate("/login");
    return;
  }

  if (!userId) {
    alert("User ID not found in storage. Please login again.");
    navigate("/login");
    return;
  }

  try {
    setIsSubmitting(true);
    const payload = {
      userId: userId,
      itemId: listing._id,
    };

    const response = await createBookingAPI(payload);

    if (response.status || response.success) {
      alert("Success! Your visit has been scheduled.");
      navigate("/my-bookings"); // Navigate to the new page we created
    }
  } catch (error) {
    console.error("Booking Error:", error);
    alert(error.response?.data?.message || "Failed to schedule visit.");
  } finally {
    setIsSubmitting(false);
  }
};
  // --- SUBMIT REVIEW FUNCTION ---
  const handlePostReview = async () => {
    if (!userRating) return alert("Please select stars!");
    if (!comment) return alert("Please write a comment!");

    setSubmitting(true);
    try {
      const payload = { userId: currentUserId, itemId: listing._id };

      // Dono API call honge
      await addRatingAPI({ ...payload, rating: userRating });
      await addReviewAPI({ ...payload, comment: comment });

      alert("Review posted successfully!");
      setComment("");
      setUserRating(0);
      fetchDetails(); // List refresh
    } catch (err) {
      alert("Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="container min-vh-100 d-flex align-items-center justify-content-center">
        Loading...
      </div>
    );
  if (!listing)
    return (
      <div className="container py-5 text-center">
        <h3>Listing Not Found</h3>
      </div>
    );

  return (
    <div className="bg-white min-vh-100">
      {/* TOP NAVIGATION */}
      <nav
        className="bg-white border-bottom sticky-top shadow-sm py-2"
        style={{ zIndex: 1020 }}>
        <div className="container d-flex justify-content-between align-items-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-navy text-decoration-none fw-800 ls-1 p-0 shadow-none">
            <i className="bi bi-arrow-left me-2"></i> BACK TO BROWSE
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row g-5">
          {/* LEFT COLUMN */}
          <div className="col-12 col-lg-8">
            {/* Professional Image Gallery */}
            <section className="mb-5">
              <div className="ratio ratio-21x9 rounded-4 overflow-hidden shadow-sm mb-3">
                <img
                  src={getImgURL(activeImg)}
                  className="object-fit-cover"
                  alt="Business Main"
                />
              </div>
              <div className="d-flex gap-2 overflow-auto pb-2 scrollbar-hidden">
                {listing.images?.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`flex-shrink-0 rounded-3 cursor-pointer overflow-hidden border-2 border transition-hover ${activeImg === img ? "border-gold" : "border-transparent"}`}
                    style={{ width: "110px", height: "75px" }}>
                    <img
                      src={getImgURL(img)}
                      className="w-100 h-100 object-fit-cover opacity-hover"
                      alt="Thumbnail"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Business Identity */}
            <section className="mb-5">
              <h1 className="display-5 fw-800 text-navy mb-3 ls-1">
                {listing.title}
              </h1>
              <p className="fs-5 text-muted d-flex align-items-start border-start border-4 border-gold ps-3 py-1">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>{" "}
                {listing.address}
              </p>
            </section>

            {/* WRITE REVIEW SECTION (CLICKABLE STARS) */}
            <section className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-light">
              <h5 className="fw-800 text-navy mb-4">LEAVE A REVIEW</h5>

              {/* Star Rating */}
              <div className="d-flex align-items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    style={{ cursor: "pointer" }}
                    fill={(hover || userRating) >= star ? "#ffc107" : "none"}
                    color={(hover || userRating) >= star ? "#ffc107" : "#ccc"}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setUserRating(star)} // Rating count set yahan hoga
                  />
                ))}
                <span className="ms-2 fw-bold text-navy">({userRating}/5)</span>
              </div>

              <textarea
                className="form-control border-0 shadow-sm rounded-3 mb-3 p-3"
                rows="3"
                placeholder="Share your experience with this service..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}></textarea>

              <button
                className="uma-btn-navy uma-btn px-5 py-2 w-auto"
                onClick={handlePostReview}
                disabled={submitting}>
                {submitting ? "SUBMITTING..." : "POST REVIEW"}
              </button>
            </section>

            {/* READ OLD REVIEWS */}
            <section className="mb-5">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
                <h4 className="fw-800 text-navy mb-0">USER REVIEWS</h4>
                <button
                  className="btn btn-sm btn-outline-navy fw-bold"
                  onClick={() => setShowReviews(!showReviews)}>
                  {showReviews ? "HIDE" : `READ REVIEWS (${allReviews.length})`}
                </button>
              </div>

              {showReviews && (
                <div className="review-container">
                  {allReviews.length > 0 ? (
                    allReviews.map((rev, i) => (
                      <div
                        key={i}
                        className="card border-0 border-bottom rounded-0 mb-3 pb-3 bg-transparent">
                        <div className="d-flex justify-content-between">
                          {/* Yahan ID ki jagah Name dikhane ka logic */}
                          <h6 className="fw-bold text-navy mb-1">
                            {rev.userId?.name ||
                              `User_${rev.userId.toString().slice(-4)}`}
                          </h6>
                          <small className="text-muted">
                            {rev.createdAt?.split("T")[0]}
                          </small>
                        </div>
                        <div className="text-warning mb-2">
                          {[...Array(rev.ratingValue || 5)].map((_, si) => (
                            <i
                              key={si}
                              className="bi bi-star-fill small me-1"></i>
                          ))}
                        </div>
                        <p className="text-secondary small mb-0">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted text-center py-4">
                      No reviews yet for this listing.
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Services Table (Original) */}
            <section className="mb-5">
              <h4 className="fw-800 text-navy mb-4 ls-1 border-bottom pb-2">
                PREMIUM SERVICES
              </h4>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th className="py-3 ps-4 border-0 ls-1 fw-bold small">
                          SERVICE DESCRIPTION
                        </th>
                        <th className="py-3 text-end pe-4 border-0 ls-1 fw-bold small">
                          INVESTMENT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listing.items?.map((item, i) => (
                        <tr key={i}>
                          <td className="py-4 ps-4 fw-bold text-navy">
                            <i className="bi bi-check2-circle text-tan me-2"></i>{" "}
                            {item.name}
                          </td>
                          <td className="py-4 text-end pe-4 fw-800 text-tan fs-5">
                            ₹{item.price?.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: SIDEBAR (Original) */}
          <div className="col-12 col-lg-4">
            <aside className="sticky-top" style={{ top: "120px" }}>
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden border-gold-top">
                <div className="p-4 bg-white">
                  <div className="mb-4">
                    <span className="text-muted fw-bold small ls-1 text-uppercase">
                      Starting From
                    </span>
                    <h2 className="display-6 fw-800 text-navy mb-0">
                      ₹{listing.items?.[0]?.price?.toLocaleString() || 0}
                    </h2>
                  </div>
                  <div className="d-grid gap-3 mb-4">
                    <button
                      className="uma-btn-navy uma-btn w-100 py-3 shadow border-0"
                      onClick={handleBooking}>
                      SCHEDULE VISIT NOW
                    </button>
                    <a
                      href={`tel:${listing.phone}`}
                      className="btn btn-outline-navy fw-800 w-100 py-3 rounded-3 border-2 transition-hover">
                      <i className="bi bi-telephone-fill me-2"></i>{" "}
                      {listing.phone}
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseDetails;
