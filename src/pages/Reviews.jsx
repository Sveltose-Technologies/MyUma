// import React, { useEffect, useState } from "react";
// import {
//   getRatingsAPI, // Using Rating API instead of Review API
//   getAllAuthsAPI,
//   getAllListingsApi,
//   deleteRatingAPI,
// } from "../services/authService";
// import { toast } from "react-toastify";
// import { Trash2, ChevronLeft, ChevronRight, Star } from "lucide-react";

// const Reviews = () => {
//   const [ratings, setRatings] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination State
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [ratingRes, userRes, listingRes] = await Promise.all([
//         getRatingsAPI(),
//         getAllAuthsAPI(),
//         getAllListingsApi(),
//       ]);

//       // According to your JSON, ratings are in ratingRes.data
//       setRatings(ratingRes?.data || []);
//       setUsers(userRes?.auths || []);
//       setListings(listingRes?.listings || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to load ratings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Helper: Find User Name
//   const getUserName = (userId) => {
//     const id = userId?._id || userId;
//     const found = users.find((u) => String(u._id) === String(id));
//     return found ? found.fullName : "Unknown User";
//   };

//   // Helper: Find Listing Title
//   const getItemTitle = (itemId) => {
//     const id = itemId?._id || itemId;
//     const found = listings.find((l) => String(l._id) === String(id));
//     return found ? found.title : "Unknown Listing";
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this rating?")) return;
//     try {
//       const res = await deleteRatingAPI(id);
//       if (res.status) {
//         toast.success("Rating deleted");
//         setRatings(ratings.filter((r) => r._id !== id));
//       }
//     } catch (error) {
//       toast.error("Delete failed");
//     }
//   };

//   // Star Rating Component
//   const renderStars = (score) => {
//     return (
//       <div className="d-flex justify-content-center gap-1">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             size={16}
//             fill={i < score ? "#ffc107" : "none"}
//             color={i < score ? "#ffc107" : "#dee2e6"}
//           />
//         ))}
//       </div>
//     );
//   };

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRatings = ratings.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(ratings.length / itemsPerPage);

//   if (loading)
//     return <div className="text-center py-5 fw-bold">Loading Ratings...</div>;

//   return (
//     <div className="container-fluid py-4 bg-light min-vh-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="fw-bold text-dark m-0">USER RATINGS & COMMENTS</h4>
//         <div className="badge bg-dark px-3 py-2">Total: {ratings.length}</div>
//       </div>

//       <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="bg-white border-bottom">
//               <tr>
//                 <th className="px-4 py-3 small fw-bold">S.NO</th>
//                 <th className="px-4 py-3 small fw-bold">USER NAME</th>
//                 <th className="px-4 py-3 small fw-bold">LISTING TITLE</th>
//                 <th className="px-4 py-3 small fw-bold">COMMENT</th>
//                 <th className="px-4 py-3 small fw-bold text-center">RATING</th>
//                 <th className="px-4 py-3 small fw-bold text-center">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRatings.length > 0 ? (
//                 currentRatings.map((item, index) => (
//                   <tr key={item._id}>
//                     <td className="px-4 py-3 text-muted">
//                       {indexOfFirstItem + index + 1}
//                     </td>
//                     <td className="px-4 py-3 fw-bold text-primary">
//                       {getUserName(item.userId)}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className="small fw-semibold text-dark">
//                         {getItemTitle(item.itemId)}
//                       </span>
//                     </td>
//                     <td
//                       className="px-4 py-3 text-muted small"
//                       style={{ maxWidth: "250px" }}>
//                       {item.comment || (
//                         <em className="opacity-50">No comment provided</em>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       {renderStars(item.rating)}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         className="btn btn-sm btn-outline-danger rounded-circle p-2">
//                         <Trash2 size={14} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-5 text-muted">
//                     No ratings found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
//           <button
//             className="btn btn-white shadow-sm border rounded-circle p-2"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}>
//             <ChevronLeft size={20} />
//           </button>
//           <span className="fw-bold small">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             className="btn btn-white shadow-sm border rounded-circle p-2"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}>
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reviews;
import React, { useState, useEffect } from "react";
import {
  getRatingsAPI,
  deleteRatingAPI,
  getImgURL,
} from "../services/authService";
import {
  Star,
  User,
  Trash2,
  Eye,
  X,
  Calendar,
  MessageCircle,
  Tag,
  MapPin,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await getRatingsAPI();
      if (res.status) {
        setReviews(res.data || []);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await deleteRatingAPI(id);
      if (res.status) {
        toast.success("Review deleted successfully! 🗑️");
        setReviews(reviews.filter((r) => r._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  const handleView = (item) => {
    setSelectedReview(item);
    setShowModal(true);
  };

  // Truncate comment to 3 words
  const truncateComment = (text) => {
    if (!text) return "N/A";
    const words = text.trim().split(/\s+/);
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : text;
  };

  const renderStars = (rating) => {
    return (
      <div className="d-flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? "#ffc107" : "none"}
            stroke={i < rating ? "#ffc107" : "#dee2e6"}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(
    (r) =>
      r.itemId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className="text-center py-5 fw-bold text-navy">
        Loading Feedback...
      </div>
    );

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      {/* HEADER SECTION */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h4 className="fw-800 text-navy m-0 text-uppercase">Reviews</h4>
       
      </div>

      {/* LIST TABLE */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-white border-bottom">
              <tr>
                <th className="px-4 py-3 small fw-bold text-navy">USER</th>
                <th className="py-3 small fw-bold text-navy">LISTING</th>
                <th className="py-3 small fw-bold text-navy">RATING</th>
                <th className="py-3 small fw-bold text-navy">COMMENT</th>
                <th className="px-4 py-3 small fw-bold text-navy text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((item) => (
                  <tr key={item._id} className="text-start">
                    <td className="px-4">
                      <div className="d-flex align-items-center gap-2">
                        {item.userId?.profileImage ? (
                          <img
                            src={getImgURL(item.userId.profileImage)}
                            className="rounded-circle"
                            style={{
                              width: "35px",
                              height: "35px",
                              objectFit: "cover",
                            }}
                            alt="u"
                          />
                        ) : (
                          <div className="bg-light rounded-circle p-2">
                            <User size={18} />
                          </div>
                        )}
                        <span className="fw-bold small">
                          {item.userId?.fullName || "Anonymous"}
                        </span>
                      </div>
                    </td>
                    <td className="small fw-semibold">
                      {item.itemId?.title || "N/A"}
                    </td>
                    <td>{renderStars(item.rating)}</td>
                    <td className="text-muted small">
                      {truncateComment(item.comment)}
                    </td>
                    <td className="px-4 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary border-0 rounded-circle p-2"
                          onClick={() => handleView(item)}>
                          <Eye size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2"
                          onClick={() => handleDelete(item._id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- VIEW POPUP MODAL --- */}
      {showModal && selectedReview && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 10000 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div
                className="modal-header border-0 bg-navy text-white p-4"
                style={{ backgroundColor: "#001f3f" }}>
                <h5 className="m-0 fw-bold">Review Details</h5>
                <X
                  className="cursor-pointer"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body p-4 text-start">
                {/* Reviewer Details */}
                <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded-3">
                  {selectedReview.userId?.profileImage ? (
                    <img
                      src={getImgURL(selectedReview.userId.profileImage)}
                      className="rounded-circle border"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                      alt="u"
                    />
                  ) : (
                    <div className="bg-white rounded-circle p-3">
                      <User size={30} />
                    </div>
                  )}
                  <div>
                    <h6 className="fw-bold m-0 text-navy">
                      {selectedReview.userId?.fullName || "Anonymous User"}
                    </h6>
                    <small className="text-muted">
                      {selectedReview.userId?.email || "No Email Provided"}
                    </small>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <small className="text-muted d-block">
                      <Tag size={14} /> Listing
                    </small>
                    <span className="fw-bold small">
                      {selectedReview.itemId?.title || "N/A"}
                    </span>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">
                      <Calendar size={14} /> Date
                    </small>
                    <span className="fw-bold small">
                      {new Date(selectedReview.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="col-12">
                    <small className="text-muted d-block">
                      <MapPin size={14} /> Business Address
                    </small>
                    <span className="fw-bold small">
                      {selectedReview.itemId?.address || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Rating & Full Comment */}
                <div className="border-top pt-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="fw-bold m-0">Rating & Feedback</h6>
                    {renderStars(selectedReview.rating)}
                  </div>
                  <div className="bg-light p-3 rounded-3 border-start border-4 border-primary shadow-sm">
                    <p className="m-0 text-dark small font-italic">
                      <MessageCircle size={14} className="me-2 text-primary" />"
                      {selectedReview.comment ||
                        "The user gave a rating without a comment."}
                      "
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 p-4 pt-0">
                <button
                  className="btn btn-secondary rounded-pill px-4"
                  onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .fw-800 { font-weight: 800; }
        .text-navy { color: #001f3f; }
        .cursor-pointer { cursor: pointer; }
      `}</style>
    </div>
  );
};

export default ReviewPage;