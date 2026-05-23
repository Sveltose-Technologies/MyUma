import React, { useEffect, useState } from "react";
import {
  getRatingsAPI, // Using Rating API instead of Review API
  getAllAuthsAPI,
  getAllListingsApi,
  deleteRatingAPI,
} from "../services/authService";
import { toast } from "react-toastify";
import { Trash2, ChevronLeft, ChevronRight, Star } from "lucide-react";

const Reviews = () => {
  const [ratings, setRatings] = useState([]);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ratingRes, userRes, listingRes] = await Promise.all([
        getRatingsAPI(),
        getAllAuthsAPI(),
        getAllListingsApi(),
      ]);

      // According to your JSON, ratings are in ratingRes.data
      setRatings(ratingRes?.data || []);
      setUsers(userRes?.auths || []);
      setListings(listingRes?.listings || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load ratings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper: Find User Name
  const getUserName = (userId) => {
    const id = userId?._id || userId;
    const found = users.find((u) => String(u._id) === String(id));
    return found ? found.fullName : "Unknown User";
  };

  // Helper: Find Listing Title
  const getItemTitle = (itemId) => {
    const id = itemId?._id || itemId;
    const found = listings.find((l) => String(l._id) === String(id));
    return found ? found.title : "Unknown Listing";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rating?")) return;
    try {
      const res = await deleteRatingAPI(id);
      if (res.status) {
        toast.success("Rating deleted");
        setRatings(ratings.filter((r) => r._id !== id));
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Star Rating Component
  const renderStars = (score) => {
    return (
      <div className="d-flex justify-content-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < score ? "#ffc107" : "none"}
            color={i < score ? "#ffc107" : "#dee2e6"}
          />
        ))}
      </div>
    );
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRatings = ratings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ratings.length / itemsPerPage);

  if (loading)
    return <div className="text-center py-5 fw-bold">Loading Ratings...</div>;

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark m-0">USER RATINGS & COMMENTS</h4>
        <div className="badge bg-dark px-3 py-2">Total: {ratings.length}</div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-white border-bottom">
              <tr>
                <th className="px-4 py-3 small fw-bold">S.NO</th>
                <th className="px-4 py-3 small fw-bold">USER NAME</th>
                <th className="px-4 py-3 small fw-bold">LISTING TITLE</th>
                <th className="px-4 py-3 small fw-bold">COMMENT</th>
                <th className="px-4 py-3 small fw-bold text-center">RATING</th>
                <th className="px-4 py-3 small fw-bold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentRatings.length > 0 ? (
                currentRatings.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3 text-muted">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-3 fw-bold text-primary">
                      {getUserName(item.userId)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="small fw-semibold text-dark">
                        {getItemTitle(item.itemId)}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-muted small"
                      style={{ maxWidth: "250px" }}>
                      {item.comment || (
                        <em className="opacity-50">No comment provided</em>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {renderStars(item.rating)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-outline-danger rounded-circle p-2">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No ratings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
          <button
            className="btn btn-white shadow-sm border rounded-circle p-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}>
            <ChevronLeft size={20} />
          </button>
          <span className="fw-bold small">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-white shadow-sm border rounded-circle p-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}>
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
