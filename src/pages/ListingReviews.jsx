import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Star, ArrowLeft, MessageSquare, User } from "lucide-react";
import { getRatingsAPI, getReviewsAPI } from "../services/authService";

const ListingReviews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();

  // Listing ID aur Title hum BrowseListings se state mein bhej rahe hain
  const listingId = location.state?.listingId;
  const listingTitle = location.state?.title || "Listing";

  const [combinedReviews, setCombinedReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listingId) {
      fetchListingData();
    }
  }, [listingId]);

  const fetchListingData = async () => {
    try {
      setLoading(true);
      // Dono API se data mangwana
      const [ratRes, revRes] = await Promise.all([
        getRatingsAPI(),
        getReviewsAPI(),
      ]);

      // 1. Sirf is listing ke reviews aur ratings filter karna
      const itemReviews =
        revRes?.data?.filter((r) => r.itemId === listingId) || [];
      const itemRatings =
        ratRes?.data?.filter((r) => r.itemId === listingId) || [];

      // 2. Reviews aur Ratings ko merge karna taaki User ke comment ke saath uske stars dikhen
      const merged = itemReviews.map((rev) => {
        const matchingRating = itemRatings.find(
          (rat) => rat.userId === rev.userId,
        );
        return {
          ...rev,
          ratingValue: matchingRating ? matchingRating.rating : 5, // Default 5 stars
          // Username Logic: Agar backend object de raha hai toh name, warna ID ka short version
          displayName:
            rev.userId?.name || `User_${rev.userId?.toString().slice(-4)}`,
        };
      });

      setCombinedReviews(merged);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <div className="spinner-border text-navy mb-3" role="status"></div>
        <div className="fw-bold text-navy">FETCHING REVIEWS...</div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-link text-navy fw-bold mb-4 p-0 text-decoration-none d-flex align-items-center">
          <ArrowLeft size={18} className="me-2" /> Back to Listings
        </button>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Header Section */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <div className="d-flex align-items-center gap-3 mb-2">
                <div className="bg-tan-light p-3 rounded-circle">
                  <MessageSquare className="text-navy" size={24} />
                </div>
                <div>
                  <h3 className="fw-800 text-navy mb-0 ls-1 text-uppercase">
                    User Reviews
                  </h3>
                  <p className="text-muted mb-0 small">
                    Showing feedback for{" "}
                    <span className="fw-bold text-navy">{listingTitle}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              {combinedReviews.length > 0 ? (
                combinedReviews.map((rev, index) => (
                  <div
                    key={rev._id}
                    className={`pb-4 mb-4 ${index !== combinedReviews.length - 1 ? "border-bottom" : ""}`}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-light rounded-circle p-2">
                          <User size={18} className="text-secondary" />
                        </div>
                        <div>
                          {/* Yahan ID ki jagah Display Name aa raha hai */}
                          <h6 className="fw-bold text-navy mb-0">
                            {rev.displayName}
                          </h6>
                          <small
                            className="text-muted"
                            style={{ fontSize: "11px" }}>
                            {rev.createdAt
                              ? new Date(rev.createdAt).toLocaleDateString()
                              : "Recent"}
                          </small>
                        </div>
                      </div>

                      {/* Stars Display */}
                      <div className="text-warning d-flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < rev.ratingValue ? "currentColor" : "none"}
                            color="currentColor"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="ps-5">
                      <p
                        className="text-secondary mb-0"
                        style={{ lineHeight: "1.6" }}>
                        "{rev.comment}"
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <MessageSquare size={48} className="text-light mb-3" />
                  <h5 className="text-muted">
                    No reviews found for this listing.
                  </h5>
                  <p className="small text-secondary">
                    Be the first one to share your experience!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingReviews;
