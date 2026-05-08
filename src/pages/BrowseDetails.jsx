// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Star } from "lucide-react";
// // import { toast } from "react-toastify";
// // import {
// //   getAllListingsApi,
// //   getImgURL,
// //   addRatingAPI,
// //   addReviewAPI,
// //   getRatingsAPI,
// //   getReviewsAPI,
// //   createBookingAPI,
// // } from "../services/authService";

// // const BrowseDetails = () => {
// //   const navigate = useNavigate();
// //   const { slug } = useParams();

// //   // Get Auth data from Redux
// //   const { isAuthenticated, user } = useSelector((state) => state.auth);

// //   const [listing, setListing] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [activeImg, setActiveImg] = useState("");

// //   const [userRating, setUserRating] = useState(0);
// //   const [hover, setHover] = useState(0);
// //   const [comment, setComment] = useState("");
// //   const [allReviews, setAllReviews] = useState([]);
// //   const [showReviews, setShowReviews] = useState(false);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const slugify = (text) =>
// //     text
// //       .toLowerCase()
// //       .trim()
// //       .replace(/[^\w\s-]/g, "")
// //       .replace(/[\s_-]+/g, "-")
// //       .replace(/^-+|-+$/g, "");

// //   const fetchDetails = async () => {
// //     try {
// //       const res = await getAllListingsApi();
// //       const found = res?.listings?.find((item) => slugify(item.title) === slug);
// //       if (found) {
// //         setListing(found);
// //         setActiveImg(found.images?.[0] || "");

// //         const [ratRes, revRes] = await Promise.all([
// //           getRatingsAPI(),
// //           getReviewsAPI(),
// //         ]);
// //         const itemReviews =
// //           revRes?.data?.filter((r) => r.itemId === found._id) || [];
// //         const itemRatings =
// //           ratRes?.data?.filter((r) => r.itemId === found._id) || [];

// //         const merged = itemReviews.map((rev) => {
// //           const matchingRating = itemRatings.find(
// //             (rat) => rat.userId === rev.userId,
// //           );
// //           return {
// //             ...rev,
// //             ratingValue: matchingRating ? matchingRating.rating : 5,
// //           };
// //         });
// //         setAllReviews(merged);
// //       }
// //     } catch (error) {
// //       console.error("Fetch Error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDetails();
// //   }, [slug]);

// //   const handleBooking = async () => {
// //     if (!isAuthenticated) {
// //       toast.warn("Please login to schedule a visit.");
// //       navigate("/login");
// //       return;
// //     }

// //     const userId = user?._id || user?.id || localStorage.getItem("userId");
// //     if (!userId) {
// //       toast.error("User session invalid. Please login again.");
// //       return;
// //     }

// //     try {
// //       setIsSubmitting(true);
// //       const payload = { userId, itemId: listing._id };
// //       const response = await createBookingAPI(payload);
// //       if (response.status || response.success) {
// //         toast.success("Success! Visit scheduled.");
// //         navigate("/my-bookings");
// //       }
// //     } catch (error) {
// //       toast.error("Failed to schedule visit.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handlePostReview = async () => {
// //     if (!isAuthenticated) {
// //       toast.warn("Please login to review.");
// //       navigate("/login");
// //       return;
// //     }

// //     const userId = user?._id || user?.id || localStorage.getItem("userId");
// //     if (!userRating) return toast.error("Please select stars!");
// //     if (!comment) return toast.error("Please write a comment!");

// //     setSubmitting(true);
// //     try {
// //       const payload = { userId, itemId: listing._id };
// //       await addRatingAPI({ ...payload, rating: userRating });
// //       await addReviewAPI({ ...payload, comment: comment });
// //       toast.success("Review posted!");
// //       setComment("");
// //       setUserRating(0);
// //       fetchDetails();
// //     } catch (err) {
// //       toast.error("Review submission failed.");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (loading)
// //     return (
// //       <div className="container min-vh-100 d-flex align-items-center justify-content-center">
// //         Loading...
// //       </div>
// //     );
// //   if (!listing)
// //     return (
// //       <div className="container py-5 text-center">
// //         <h3>Listing Not Found</h3>
// //       </div>
// //     );

// //   return (
// //     <div className="bg-white min-vh-100">
// //       <nav className="bg-white border-bottom sticky-top shadow-sm py-2">
// //         <div className="container d-flex justify-content-between align-items-center">
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="btn btn-link text-navy text-decoration-none fw-800 p-0 shadow-none">
// //             <i className="bi bi-arrow-left me-2"></i> BACK TO BROWSE
// //           </button>
// //         </div>
// //       </nav>

// //       <div className="container py-5">
// //         <div className="row g-5">
// //           <div className="col-12 col-lg-8">
// //             <section className="mb-5">
// //               <div className="ratio ratio-21x9 rounded-4 overflow-hidden mb-3 shadow-sm">
// //                 <img
// //                   src={getImgURL(activeImg)}
// //                   className="object-fit-cover"
// //                   alt="Main"
// //                 />
// //               </div>
// //               <div className="d-flex gap-2 overflow-auto pb-2">
// //                 {listing.images?.map((img, idx) => (
// //                   <div
// //                     key={idx}
// //                     onClick={() => setActiveImg(img)}
// //                     className={`flex-shrink-0 rounded-3 border-2 border ${activeImg === img ? "border-gold" : "border-transparent"}`}
// //                     style={{
// //                       width: "110px",
// //                       height: "75px",
// //                       cursor: "pointer",
// //                     }}>
// //                     <img
// //                       src={getImgURL(img)}
// //                       className="w-100 h-100 object-fit-cover"
// //                       alt="Thumb"
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //             </section>

// //             <section className="mb-5">
// //               <h1 className="display-5 fw-800 text-navy mb-3">
// //                 {listing.title}
// //               </h1>
// //               <p className="fs-5 text-muted border-start border-4 border-gold ps-3">
// //                 <i className="bi bi-geo-alt-fill text-danger me-2"></i>
// //                 {listing.address}
// //               </p>
// //             </section>

// //             <section className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-light">
// //               <h5 className="fw-800 text-navy mb-4">LEAVE A REVIEW</h5>
// //               <div className="d-flex align-items-center gap-2 mb-3">
// //                 {[1, 2, 3, 4, 5].map((star) => (
// //                   <Star
// //                     key={star}
// //                     size={28}
// //                     style={{ cursor: "pointer" }}
// //                     fill={(hover || userRating) >= star ? "#ffc107" : "none"}
// //                     color={(hover || userRating) >= star ? "#ffc107" : "#ccc"}
// //                     onMouseEnter={() => setHover(star)}
// //                     onMouseLeave={() => setHover(0)}
// //                     onClick={() => setUserRating(star)}
// //                   />
// //                 ))}
// //               </div>
// //               <textarea
// //                 className="form-control border-0 shadow-sm rounded-3 mb-3 p-3"
// //                 rows="3"
// //                 placeholder={
// //                   isAuthenticated
// //                     ? "Share your experience..."
// //                     : "Login to write a review"
// //                 }
// //                 value={comment}
// //                 disabled={!isAuthenticated}
// //                 onChange={(e) => setComment(e.target.value)}></textarea>
// //               <button
// //                 className="uma-btn-navy uma-btn px-5 py-2"
// //                 onClick={handlePostReview}
// //                 disabled={submitting}>
// //                 {submitting
// //                   ? "SUBMITTING..."
// //                   : isAuthenticated
// //                     ? "POST REVIEW"
// //                     : "LOGIN TO POST"}
// //               </button>
// //             </section>

// //             <section className="mb-5">
// //               <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
// //                 <h4 className="fw-800 text-navy mb-0">USER REVIEWS</h4>
// //                 <button
// //                   className="btn btn-sm btn-outline-navy fw-bold"
// //                   onClick={() => setShowReviews(!showReviews)}>
// //                   {showReviews ? "HIDE" : `READ (${allReviews.length})`}
// //                 </button>
// //               </div>
// //               {showReviews && (
// //                 <div className="review-container">
// //                   {allReviews.map((rev, i) => (
// //                     <div
// //                       key={i}
// //                       className="card border-0 border-bottom rounded-0 mb-3 pb-3 bg-transparent">
// //                       <h6 className="fw-bold text-navy mb-1">
// //                         {rev.userId?.fullName || "User"}
// //                       </h6>
// //                       <div className="text-warning mb-2">
// //                         {[...Array(rev.ratingValue || 5)].map((_, si) => (
// //                           <i
// //                             key={si}
// //                             className="bi bi-star-fill small me-1"></i>
// //                         ))}
// //                       </div>
// //                       <p className="text-secondary small">{rev.comment}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </section>
// //           </div>

// //           <div className="col-12 col-lg-4">
// //             <aside className="sticky-top" style={{ top: "120px" }}>
// //               <div className="card border-0 shadow-lg rounded-4 overflow-hidden border-gold-top p-4 bg-white">
// //                 <div className="mb-4">
// //                   <span className="text-muted fw-bold small text-uppercase">
// //                     Starting From
// //                   </span>
// //                   <h2 className="display-6 fw-800 text-navy">
// //                     ₹{listing.items?.[0]?.price?.toLocaleString() || 0}
// //                   </h2>
// //                 </div>
// //                 <div className="d-grid gap-3">
// //                   <button
// //                     className="uma-btn-navy uma-btn w-100 py-3 shadow border-0"
// //                     onClick={handleBooking}
// //                     disabled={isSubmitting}>
// //                     {isSubmitting ? "SCHEDULING..." : "SCHEDULE VISIT NOW"}
// //                   </button>
// //                   <a
// //                     href={`tel:${listing.phone}`}
// //                     className="btn btn-outline-navy fw-800 w-100 py-3">
// //                     CALL: {listing.phone}
// //                   </a>
// //                 </div>
// //               </div>
// //             </aside>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BrowseDetails;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Star } from "lucide-react";
// import { toast } from "react-toastify";
// import {
//   getAllListingsApi,
//   getImgURL,
//   addRatingAPI,
//   addReviewAPI,
//   getRatingsAPI,
//   getReviewsAPI,
//   createBookingAPI,
// } from "../services/authService";

// const BrowseDetails = () => {
//   const navigate = useNavigate();
//   const { slug } = useParams();

//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImg, setActiveImg] = useState("");

//   const [userRating, setUserRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [comment, setComment] = useState("");
//   const [allReviews, setAllReviews] = useState([]);
//   const [showReviews, setShowReviews] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const slugify = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-")
//       .replace(/^-+|-+$/g, "");

//   const fetchDetails = async () => {
//     try {
//       const res = await getAllListingsApi();
//       const found = res?.listings?.find((item) => slugify(item.title) === slug);
//       console.log("DEBUG: Listing Data received from API:", found);
//       if (found) {
//         setListing(found);
//         setActiveImg(found.images?.[0] || "");

//         const [ratRes, revRes] = await Promise.all([
//           getRatingsAPI(),
//           getReviewsAPI(),
//         ]);
//         const itemReviews =
//           revRes?.data?.filter((r) => r.itemId === found._id) || [];
//         const itemRatings =
//           ratRes?.data?.filter((r) => r.itemId === found._id) || [];

//         const merged = itemReviews.map((rev) => {
//           const matchingRating = itemRatings.find(
//             (rat) => rat.userId === rev.userId,
//           );
//           return {
//             ...rev,
//             ratingValue: matchingRating ? matchingRating.rating : 5,
//           };
//         });
//         setAllReviews(merged);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDetails();
//   }, [slug]);

//   const handleBooking = async () => {
//     if (!isAuthenticated) {
//       toast.warn("Please login to schedule a visit.");
//       navigate("/login");
//       return;
//     }

//     const userId = user?._id || user?.id || localStorage.getItem("userId");
//     try {
//       setIsSubmitting(true);
//       const payload = { userId, itemId: listing._id };
//       const response = await createBookingAPI(payload);
//       if (response.status || response.success) {
//         toast.success("Success! Visit scheduled.");
//         navigate("/my-bookings");
//       }
//     } catch (error) {
//       toast.error("Failed to schedule visit.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handlePostReview = async () => {
//     if (!isAuthenticated) {
//       toast.warn("Please login to review.");
//       navigate("/login");
//       return;
//     }
//     const userId = user?._id || user?.id || localStorage.getItem("userId");
//     if (!userRating) return toast.error("Please select stars!");
//     if (!comment) return toast.error("Please write a comment!");

//     setSubmitting(true);
//     try {
//       const payload = { userId, itemId: listing._id };
//       await addRatingAPI({ ...payload, rating: userRating });
//       await addReviewAPI({ ...payload, comment: comment });
//       toast.success("Review posted!");
//       setComment("");
//       setUserRating(0);
//       fetchDetails();
//     } catch (err) {
//       toast.error("Review submission failed.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="container min-vh-100 d-flex align-items-center justify-content-center">
//         Loading...
//       </div>
//     );
//   if (!listing)
//     return (
//       <div className="container py-5 text-center">
//         <h3>Listing Not Found</h3>
//       </div>
//     );

//   return (
//     <div className="bg-white min-vh-100">
//       <nav className="bg-white border-bottom sticky-top shadow-sm py-2">
//         <div className="container d-flex justify-content-between align-items-center">
//           <button
//             onClick={() => navigate(-1)}
//             className="btn btn-link text-navy text-decoration-none fw-800 p-0 shadow-none">
//             <i className="bi bi-arrow-left me-2"></i> BACK TO BROWSE
//           </button>
//         </div>
//       </nav>

//       <div className="container py-5">
//         <div className="row g-5">
//           <div className="col-12 col-lg-8">
//             <section className="mb-5">
//               <div className="ratio ratio-21x9 rounded-4 overflow-hidden mb-3 shadow-sm">
//                 <img
//                   src={getImgURL(activeImg)}
//                   className="object-fit-cover"
//                   alt="Main"
//                 />
//               </div>
//               <div className="d-flex gap-2 overflow-auto pb-2">
//                 {listing.images?.map((img, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => setActiveImg(img)}
//                     className={`flex-shrink-0 rounded-3 border-2 border ${activeImg === img ? "border-gold" : "border-transparent"}`}
//                     style={{
//                       width: "110px",
//                       height: "75px",
//                       cursor: "pointer",
//                     }}>
//                     <img
//                       src={getImgURL(img)}
//                       className="w-100 h-100 object-fit-cover"
//                       alt="Thumb"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </section>

//             <section className="mb-5">
//               {/* CATEGORY & SUBCATEGORY DISPLAY */}
//               <div className="mb-2">
//                 <span className="badge bg-gold text-white me-2 py-2 px-3 text-uppercase">
//                   {listing.categoryId?.name || "N/A"}
//                 </span>
//                 {listing.subcategoryId?.subcategoryName && (
//                   <span className="badge bg-navy text-white py-2 px-3 text-uppercase">
//                     <i className="bi bi-layers me-1"></i>{" "}
//                     {listing.subcategoryId.subcategoryName}
//                   </span>
//                 )}
//               </div>

//               <h1 className="display-5 fw-800 text-navy mb-3">
//                 {listing.title}
//               </h1>

//               <div className="d-flex flex-wrap gap-3">
//                 <p className="fs-5 text-muted border-start border-4 border-gold ps-3 mb-0">
//                   <i className="bi bi-geo-alt-fill text-danger me-2"></i>
//                   {listing.address}
//                 </p>
//                 {/* Additional Tag for Subcategory near Address */}
//                 {listing.subcategoryId?.subcategoryName && (
//                   <div className="d-flex align-items-center text-secondary small fw-bold">
//                     <i className="bi bi-tag-fill me-1 text-gold"></i>
//                     {listing.subcategoryId.subcategoryName}
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* Rest of the code (Review section, User Reviews, etc.) remains same */}
//             <section className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-light">
//               <h5 className="fw-800 text-navy mb-4">LEAVE A REVIEW</h5>
//               <div className="d-flex align-items-center gap-2 mb-3">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     size={28}
//                     style={{ cursor: "pointer" }}
//                     fill={(hover || userRating) >= star ? "#ffc107" : "none"}
//                     color={(hover || userRating) >= star ? "#ffc107" : "#ccc"}
//                     onMouseEnter={() => setHover(star)}
//                     onMouseLeave={() => setHover(0)}
//                     onClick={() => setUserRating(star)}
//                   />
//                 ))}
//               </div>
//               <textarea
//                 className="form-control border-0 shadow-sm rounded-3 mb-3 p-3"
//                 rows="3"
//                 placeholder={
//                   isAuthenticated
//                     ? "Share your experience..."
//                     : "Login to write a review"
//                 }
//                 value={comment}
//                 disabled={!isAuthenticated}
//                 onChange={(e) => setComment(e.target.value)}></textarea>
//               <button
//                 className="uma-btn-navy uma-btn px-5 py-2"
//                 onClick={handlePostReview}
//                 disabled={submitting}>
//                 {submitting
//                   ? "SUBMITTING..."
//                   : isAuthenticated
//                     ? "POST REVIEW"
//                     : "LOGIN TO POST"}
//               </button>
//             </section>

//             <section className="mb-5">
//               <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
//                 <h4 className="fw-800 text-navy mb-0">USER REVIEWS</h4>
//                 <button
//                   className="btn btn-sm btn-outline-navy fw-bold"
//                   onClick={() => setShowReviews(!showReviews)}>
//                   {showReviews ? "HIDE" : `READ (${allReviews.length})`}
//                 </button>
//               </div>
//               {showReviews && (
//                 <div className="review-container">
//                   {allReviews.map((rev, i) => (
//                     <div
//                       key={i}
//                       className="card border-0 border-bottom rounded-0 mb-3 pb-3 bg-transparent">
//                       <h6 className="fw-bold text-navy mb-1">
//                         {rev.userId?.fullName || "User"}
//                       </h6>
//                       <div className="text-warning mb-2">
//                         {[...Array(rev.ratingValue || 5)].map((_, si) => (
//                           <i
//                             key={si}
//                             className="bi bi-star-fill small me-1"></i>
//                         ))}
//                       </div>
//                       <p className="text-secondary small">{rev.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </section>
//           </div>

//           <div className="col-12 col-lg-4">
//             <aside className="sticky-top" style={{ top: "120px" }}>
//               <div className="card border-0 shadow-lg rounded-4 overflow-hidden border-gold-top p-4 bg-white">
//                 <div className="mb-4">
//                   <span className="text-muted fw-bold small text-uppercase">
//                     Starting From
//                   </span>
//                   <h2 className="display-6 fw-800 text-navy">
//                     ₹{listing.items?.[0]?.price?.toLocaleString() || 0}
//                   </h2>
//                 </div>
//                 <div className="d-grid gap-3">
//                   <button
//                     className="uma-btn-navy uma-btn w-100 py-3 shadow border-0"
//                     onClick={handleBooking}
//                     disabled={isSubmitting}>
//                     {isSubmitting ? "SCHEDULING..." : "SCHEDULE VISIT NOW"}
//                   </button>
//                   <a
//                     href={`tel:${listing.phone}`}
//                     className="btn btn-outline-navy fw-800 w-100 py-3">
//                     CALL: {listing.phone}
//                   </a>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrowseDetails;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import {
  getAllListingsApi,
  getImgURL,
  addRatingAPI,
  addReviewAPI,
  getRatingsAPI,
  getReviewsAPI,
  createBookingAPI,
} from "../services/authService";

const BrowseDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState("");

  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

        const [ratRes, revRes] = await Promise.all([
          getRatingsAPI(),
          getReviewsAPI(),
        ]);
        const itemReviews =
          revRes?.data?.filter((r) => r.itemId === found._id) || [];
        const itemRatings =
          ratRes?.data?.filter((r) => r.itemId === found._id) || [];

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
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [slug]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.warn("Please login to schedule a visit.");
      navigate("/login");
      return;
    }
    const userId = user?._id || user?.id || localStorage.getItem("userId");
    try {
      setIsSubmitting(true);
      const payload = { userId, itemId: listing._id };
      const response = await createBookingAPI(payload);
      if (response.status || response.success) {
        toast.success("Success! Visit scheduled.");
        navigate("/my-bookings");
      }
    } catch (error) {
      toast.error("Failed to schedule visit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostReview = async () => {
    if (!isAuthenticated) {
      toast.warn("Please login to review.");
      navigate("/login");
      return;
    }
    const userId = user?._id || user?.id || localStorage.getItem("userId");
    if (!userRating) return toast.error("Please select stars!");
    if (!comment) return toast.error("Please write a comment!");

    setSubmitting(true);
    try {
      const payload = { userId, itemId: listing._id };
      await addRatingAPI({ ...payload, rating: userRating });
      await addReviewAPI({ ...payload, comment: comment });
      toast.success("Review posted!");
      setComment("");
      setUserRating(0);
      fetchDetails();
    } catch (err) {
      toast.error("Review submission failed.");
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
      <nav className="bg-white border-bottom sticky-top shadow-sm py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-navy text-decoration-none fw-800 p-0 shadow-none">
            <i className="bi bi-arrow-left me-2"></i> BACK TO BROWSE
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row g-5">
          <div className="col-12 col-lg-8">
            <section className="mb-5">
              <div className="ratio ratio-21x9 rounded-4 overflow-hidden mb-3 shadow-sm">
                <img
                  src={getImgURL(activeImg)}
                  className="object-fit-cover"
                  alt="Main"
                />
              </div>
              <div className="d-flex gap-2 overflow-auto pb-2">
                {listing.images?.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`flex-shrink-0 rounded-3 border-2 border ${activeImg === img ? "border-gold" : "border-transparent"}`}
                    style={{
                      width: "110px",
                      height: "75px",
                      cursor: "pointer",
                    }}>
                    <img
                      src={getImgURL(img)}
                      className="w-100 h-100 object-fit-cover"
                      alt="Thumb"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-5">
              {/* UPDATED: CATEGORY & SUBCATEGORY BADGES */}
              <div className="mb-3 d-flex flex-wrap gap-2">
                <span className="badge bg-gold text-black py-2 px-3 text-uppercase ls-1">
                  {listing.categoryId?.name || "Category"}
                </span>
                {listing.subCategoryId && (
                  <span className="badge bg-gold text-black py-2 px-3 text-uppercase ls-1">
                    {typeof listing.subCategoryId === "object"
                      ? listing.subCategoryId.subcategoryName
                      : "Subcategory"}
                  </span>
                )}
              </div>

              <h1 className="display-5 fw-800 text-navy mb-3">
                {listing.title}
              </h1>

              <div className="d-flex flex-wrap align-items-center gap-3">
                <p className="fs-5 text-muted border-start border-4 border-gold ps-3 mb-0">
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                  {listing.address}
                </p>
                {/* Secondary Subcategory indicator */}
                {listing.subCategoryId?.subcategoryName && (
                  <div className="bg-light px-2 py-1 rounded small fw-bold text-secondary">
                    <i className="bi bi-tag-fill me-1 text-gold"></i>
                    {listing.subCategoryId.subcategoryName}
                  </div>
                )}
              </div>
            </section>

            <section className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-light">
              <h5 className="fw-800 text-navy mb-4">LEAVE A REVIEW</h5>
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
                    onClick={() => setUserRating(star)}
                  />
                ))}
              </div>
              <textarea
                className="form-control border-0 shadow-sm rounded-3 mb-3 p-3"
                rows="3"
                placeholder={
                  isAuthenticated
                    ? "Share your experience..."
                    : "Login to write a review"
                }
                value={comment}
                disabled={!isAuthenticated}
                onChange={(e) => setComment(e.target.value)}></textarea>
              <button
                className="uma-btn-navy uma-btn px-5 py-2"
                onClick={handlePostReview}
                disabled={submitting}>
                {submitting
                  ? "SUBMITTING..."
                  : isAuthenticated
                    ? "POST REVIEW"
                    : "LOGIN TO POST"}
              </button>
            </section>

            <section className="mb-5">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
                <h4 className="fw-800 text-navy mb-0">USER REVIEWS</h4>
                <button
                  className="btn btn-sm btn-outline-navy fw-bold"
                  onClick={() => setShowReviews(!showReviews)}>
                  {showReviews ? "HIDE" : `READ (${allReviews.length})`}
                </button>
              </div>
              {showReviews && (
                <div className="review-container">
                  {allReviews.map((rev, i) => (
                    <div
                      key={i}
                      className="card border-0 border-bottom rounded-0 mb-3 pb-3 bg-transparent">
                      <h6 className="fw-bold text-navy mb-1">
                        {rev.userId?.fullName || "User"}
                      </h6>
                      <div className="text-warning mb-2">
                        {[...Array(rev.ratingValue || 5)].map((_, si) => (
                          <i
                            key={si}
                            className="bi bi-star-fill small me-1"></i>
                        ))}
                      </div>
                      <p className="text-secondary small">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="col-12 col-lg-4">
            <aside className="sticky-top" style={{ top: "120px" }}>
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden border-gold-top p-4 bg-white">
                <div className="mb-4">
                  <span className="text-muted fw-bold small text-uppercase">
                    Starting From
                  </span>
                  <h2 className="display-6 fw-800 text-navy">
                    ₹{listing.items?.[0]?.price?.toLocaleString() || 0}
                  </h2>
                </div>
                <div className="d-grid gap-3">
                  <button
                    className="uma-btn-navy uma-btn w-100 py-3 shadow border-0"
                    onClick={handleBooking}
                    disabled={isSubmitting}>
                    {isSubmitting ? "SCHEDULING..." : "SCHEDULE VISIT NOW"}
                  </button>
                  <a
                    href={`tel:${listing.phone}`}
                    className="btn btn-outline-navy fw-800 w-100 py-3">
                    CALL: {listing.phone}
                  </a>
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