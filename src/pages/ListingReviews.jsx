import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star, MessageSquare, ArrowLeft } from "lucide-react";

const ListingReviews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  // In a real app, you would fetch reviews based on location.state.listingId
  const dummyReviews = [
    { id: 1, user: "John Doe", rating: 5, comment: "Amazing place, loved it!", date: "2 days ago" },
    { id: 2, user: "Jane Smith", rating: 4, comment: "Great service, but a bit crowded.", date: "1 week ago" },
  ];

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn btn-link text-navy fw-bold mb-4 p-0 text-decoration-none">
          <ArrowLeft size={18} className="me-2" /> Back to listings
        </button>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h3 className="fw-800 text-navy mb-4">User Reviews</h3>

              {dummyReviews.map((rev) => (
                <div key={rev.id} className="border-bottom pb-3 mb-3">
                  <div className="d-flex justify-content-between">
                    <h6 className="fw-bold mb-0">{rev.user}</h6>
                    <small className="text-muted">{rev.date}</small>
                  </div>
                  <div className="text-warning my-1">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-secondary small mb-0">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write Review Section */}
            {/* <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
              <MessageSquare size={40} className="text-tan mx-auto mb-3" />
              <h5 className="fw-bold text-navy">Share your experience</h5>
              <p className="text-muted">Have you visited this place? Let others know what you think.</p>
              
              {!isLoggedIn ? (
                <div className="alert alert-warning border-0 rounded-3">
                  <strong>Login Required:</strong> You must be logged in to post a review.
                  <button className="btn btn-sm btn-navy ms-3 px-4 rounded-pill" onClick={() => navigate("/login")}>
                    Login Now
                  </button>
                </div>
              ) : (
                <button className="uma-btn-navy uma-btn px-5 py-2 mx-auto">
                  Write a Review
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingReviews;