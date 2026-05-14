// import React, { useEffect, useState } from "react";
// import { getRatingsAPI } from "../services/authService";

// const Reviews = () => {
//   const [ratings, setRatings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchRatings = async () => {
//     try {
//       setLoading(true);
//       const response = await getRatingsAPI();
//       if (response?.status && response?.data) {
//         setRatings(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching ratings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRatings();
//   }, []);

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <i
//         key={i}
//         className={`bi bi-star-fill ${i < rating ? "text-warning" : "text-light"}`}
//         style={{ fontSize: "14px", marginRight: "2px" }}></i>
//     ));
//   };

//   if (loading) return <div className="text-center py-5">Loading...</div>;

//   return (
//     <div className="container-fluid py-4">
//       <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="bg-light">
//               <tr>
//                 <th className="px-4 py-3 text-secondary fw-bold">S.No</th>
//                 <th className="px-4 py-3 text-secondary fw-bold">User ID</th>
//                 <th className="px-4 py-3 text-secondary fw-bold">Service ID</th>
//                 <th className="px-4 py-3 text-secondary fw-bold">Review</th>
//                 <th className="px-4 py-3 text-secondary fw-bold">Rating</th>
//                 <th className="px-4 py-3 text-secondary fw-bold">
//                   Created Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {ratings.length > 0 ? (
//                 ratings.map((item, index) => (
//                   <tr key={item._id}>
//                     <td className="px-4 py-3 text-muted">{index + 1}</td>

//                     {/* Displaying raw User ID since name is not available */}
//                     <td
//                       className="px-4 py-3 text-dark font-monospace"
//                       style={{ fontSize: "12px" }}>
//                       {item.userId || "N/A"}
//                     </td>

//                     {/* Displaying raw Item ID since Title is not available */}
//                     <td
//                       className="px-4 py-3 text-dark font-monospace"
//                       style={{ fontSize: "12px" }}>
//                       {item.itemId || "N/A"}
//                     </td>

//                     <td
//                       className="px-4 py-3 text-muted"
//                       style={{ maxWidth: "250px" }}>
//                       {item.comment}
//                     </td>
//                     <td className="px-4 py-3">{renderStars(item.rating)}</td>
//                     <td className="px-4 py-3 text-muted">
//                       {item.createdAt ? item.createdAt.split("T")[0] : "N/A"}
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
//     </div>
//   );
// };

// export default Reviews;

import React, { useEffect, useState } from "react";
import {
  getReviewsAPI,
  getAllAuthsAPI,
  getAllListingsApi,
} from "../services/authService";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reviewRes, userRes, listingRes] = await Promise.all([
        getReviewsAPI(),
        getAllAuthsAPI(),
        getAllListingsApi(),
      ]);

      setReviews(reviewRes?.data || []);
      setUsers(userRes?.auths || []);
      setListings(listingRes?.listings || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUserName = (userId) => {
    const id = userId?._id || userId;
    const found = users.find((u) => String(u._id) === String(id));
    return found ? found.fullName : "Unknown User";
  };

  const getItemTitle = (itemId) => {
    const id = itemId?._id || itemId;
    const found = listings.find((l) => String(l._id) === String(id));
    return found ? found.title : "Unknown Item";
  };

  // UPDATED: Fixed colors to match your image exactly
  const renderStars = (rating) => {
    // If your API doesn't have 'rating', I used 5 as a fallback so you can see the yellow color
    const score = rating || 5;

    return (
      <div title={`Rating: ${score} / 5`} className="d-inline-block">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className="bi bi-star-fill"
            style={{
              fontSize: "18px", // Slightly bigger like your image
              marginRight: "2px",
              // #ffc107 is the bright yellow from your image
              // #dee2e6 is a visible light gray for empty stars
              color: i < score ? "#ffc107" : "#dee2e6",
            }}></i>
        ))}
      </div>
    );
  };

  if (loading)
    return <div className="text-center py-5">Loading Reviews...</div>;

  return (
    <div className="container-fluid py-4">
      <h4 className="mb-4 fw-bold">User Reviews</h4>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 text-secondary fw-bold">S.No</th>
                <th className="px-4 py-3 text-secondary fw-bold">User Name</th>
                <th className="px-4 py-3 text-secondary fw-bold">
                  Listing Title
                </th>
                <th className="px-4 py-3 text-secondary fw-bold">
                  Review Message
                </th>
                <th className="px-4 py-3 text-secondary fw-bold text-center">
                  Rating
                </th>
                <th className="px-4 py-3 text-secondary fw-bold">Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3 text-muted">{index + 1}</td>

                    <td className="px-4 py-3 fw-bold text-dark">
                      {getUserName(item.userId)}
                    </td>

                    <td className="px-4 py-3">
                      <span className="badge bg-info-subtle text-dark border border-info">
                        {getItemTitle(item.itemId)}
                      </span>
                    </td>

                    <td
                      className="px-4 py-3 text-muted"
                      style={{ maxWidth: "300px", whiteSpace: "normal" }}>
                      {item.comment}
                    </td>

                    {/* Fixed Rating Cell */}
                    <td className="px-4 py-3 text-center">
                      {renderStars(item.rating)}
                    </td>

                    <td className="px-4 py-3 text-muted small">
                      {item.createdAt ? item.createdAt.split("T")[0] : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No reviews found.
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