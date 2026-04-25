import React, { useEffect, useState } from "react";
import { getRatingsAPI } from "../services/authService";

const Reviews = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const response = await getRatingsAPI();
      // Accessing response.data based on your JSON structure
      if (response?.status && response?.data) {
        setRatings(response.data);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  // Helper to render stars based on rating number
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`bi bi-star-fill ${i < rating ? "text-warning" : "text-light"}`}
        style={{
          fontSize: "14px",
          marginRight: "2px",
          color: i < rating ? "#ffc107" : "#e4e4e4",
        }}></i>
    ));
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container-fluid py-4">
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th
                  className="px-4 py-3 text-secondary fw-bold"
                  style={{ width: "80px" }}>
                  S.No
                </th>
                <th className="px-4 py-3 text-secondary fw-bold">User Name</th>
                <th className="px-4 py-3 text-secondary fw-bold">
                  Service Title
                </th>
                <th className="px-4 py-3 text-secondary fw-bold">Review</th>
                <th className="px-4 py-3 text-secondary fw-bold">Rating</th>
                <th className="px-4 py-3 text-secondary fw-bold">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody>
              {ratings.length > 0 ? (
                ratings.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3 text-muted">{index + 1}</td>
                    <td className="px-4 py-3 fw-semibold text-dark">
                      {/* If backend sends name use item.userId.name, else showing ID for now */}
                      {item.userId?.name || "not found"}
                    </td>
                    <td className="px-4 py-3 text-dark">
                      {item.itemId?.title || "not found"}
                    </td>
                    <td
                      className="px-4 py-3 text-muted"
                      style={{ maxWidth: "300px" }}>
                      {item.comment}
                    </td>
                    <td className="px-4 py-3">{renderStars(item.rating)}</td>
                    <td className="px-4 py-3 text-muted">
                      {item.createdAt ? item.createdAt.split("T")[0] : "N/A"}
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
    </div>
  );
};

export default Reviews;
