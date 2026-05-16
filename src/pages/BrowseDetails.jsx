// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { useSelector } from "react-redux";
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
// //     try {
// //       setIsSubmitting(true);
// //       const payload = { userId, itemId: listing._id };
// //       const response = await createBookingAPI(payload);
// //       if (response.status || response.success) {
// //         toast.success("Success! Visit scheduled.");
// //         navigate("/bookmarks");
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
// //               {/* UPDATED: CATEGORY & SUBCATEGORY BADGES */}
// //               <div className="mb-3 d-flex flex-wrap gap-2">
// //                 <span className="badge bg-gold text-black py-2 px-3 text-uppercase ls-1">
// //                   {listing.categoryId?.name || "Category"}
// //                 </span>
// //                 {listing.subCategoryId && (
// //                   <span className="badge bg-gold text-black py-2 px-3 text-uppercase ls-1">
// //                     {typeof listing.subCategoryId === "object"
// //                       ? listing.subCategoryId.subcategoryName
// //                       : "Subcategory"}
// //                   </span>
// //                 )}
// //               </div>

// //               <h1 className="display-5 fw-800 text-navy mb-3">
// //                 {listing.title}
// //               </h1>

// //               <div className="d-flex flex-wrap align-items-center gap-3">
// //                 <p className="fs-5 text-muted border-start border-4 border-gold ps-3 mb-0">
// //                   <i className="bi bi-geo-alt-fill text-danger me-2"></i>
// //                   {listing.address}
// //                 </p>
// //                 {/* Secondary Subcategory indicator */}
// //                 {listing.subCategoryId?.subcategoryName && (
// //                   <div className="bg-light px-2 py-1 rounded small fw-bold text-secondary">
// //                     <i className="bi bi-tag-fill me-1 text-gold"></i>
// //                     {listing.subCategoryId.subcategoryName}
// //                   </div>
// //                 )}
// //               </div>
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
// //                     ${listing.items?.[0]?.price?.toLocaleString() || 0}
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
// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Star, X, Heart } from "lucide-react";
// import { toast } from "react-toastify";
// import {
//   getAllListingsApi,
//   getImgURL,
//   addRatingAPI,
//   addReviewAPI,
//   getRatingsAPI,
//   getReviewsAPI,
//   createBookingAPI,
//   addFavoriteAPI,
//   deleteFavoriteAPI,
//   getFavoritesByUserAPI,
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
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [favorites, setFavorites] = useState([]);

//   const slugify = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-")
//       .replace(/^-+|-+$/g, "");

//   const fetchDetails = useCallback(async () => {
//     try {
//       const res = await getAllListingsApi();
//       const found = res?.listings?.find((item) => slugify(item.title) === slug);

//       if (found) {
//         setListing(found);
//         setActiveImg(found.images?.[0] || "");

//         // Fetch Reviews and Ratings in parallel
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

//         // Fetch Favorites if logged in
//         if (isAuthenticated) {
//           const userId =
//             user?._id || user?.id || localStorage.getItem("userId");
//           const favRes = await getFavoritesByUserAPI(userId);
//           if (favRes.success) {
//             setFavorites(favRes.data);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [slug, isAuthenticated, user]);

//   useEffect(() => {
//     fetchDetails();
//   }, [fetchDetails]);

//   const handleBookmark = async () => {
//     if (!isAuthenticated) {
//       toast.warn("Please login to bookmark this listing.");
//       navigate("/login");
//       return;
//     }

//     const userId = user?._id || user?.id || localStorage.getItem("userId");
//     const existingFav = favorites.find((fav) => {
//       const favId =
//         typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
//       return favId === listing._id;
//     });

//     try {
//       if (existingFav) {
//         await deleteFavoriteAPI(existingFav._id);
//         setFavorites(favorites.filter((fav) => fav._id !== existingFav._id));
//         toast.info("Removed from bookmarks");
//       } else {
//         const payload = { userId, itemId: listing._id };
//         const res = await addFavoriteAPI(payload);
//         if (res.success) {
//           setFavorites([...favorites, res.data]);
//           toast.success("Added to bookmarks");
//         }
//       }
//     } catch (error) {
//       toast.error("Favorite update failed");
//     }
//   };

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
//         navigate("/bookmarks");
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
//     if (!userRating) return toast.error("Please select stars!");
//     if (!comment) return toast.error("Please write a comment!");

//     setSubmitting(true);
//     try {
//       const userId = user?._id || user?.id || localStorage.getItem("userId");
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
//       <div className="container py-5 text-center fw-bold">
//         LOADING DETAILS...
//       </div>
//     );
//   if (!listing)
//     return <div className="container py-5 text-center">Listing not found.</div>;

//   const isFavorited = favorites.some((fav) => {
//     const favId = typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
//     return favId === listing?._id;
//   });

//   return (
//     <div className="bg-white min-vh-100">
//       <nav
//         className="bg-white border-bottom sticky-top shadow-sm py-2"
//         style={{ zIndex: 1020 }}>
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
//             {/* Gallery Section */}
//             <section className="mb-5">
//               <div className="ratio ratio-21x9 rounded-4 overflow-hidden mb-3 shadow-sm position-relative bg-light">
//                 <img
//                   src={getImgURL(activeImg)}
//                   className="object-fit-cover w-100 h-100"
//                   alt="Main"
//                 />
//                 <button
//                   className="btn btn-white rounded-circle shadow position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center"
//                   style={{
//                     backgroundColor: "white",
//                     width: "48px",
//                     height: "48px",
//                     border: "none",
//                     zIndex: 10,
//                   }}
//                   onClick={handleBookmark}>
//                   <Heart
//                     size={26}
//                     color="#ff4d4d"
//                     fill={isFavorited ? "#ff4d4d" : "none"}
//                   />
//                 </button>
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

//             {/* Title & Info */}
//             <section className="mb-5">
//               <div className="mb-3 d-flex flex-wrap gap-2">
//                 <span className="badge bg-gold text-black py-2 px-3 text-uppercase ls-1">
//                   {listing.categoryId?.name || "Category"}
//                 </span>
//                 {listing.subCategoryId && (
//                   <span className="badge bg-gold text-black py-2 px-3 text-uppercase ls-1">
//                     {typeof listing.subCategoryId === "object"
//                       ? listing.subCategoryId.subcategoryName
//                       : "Subcategory"}
//                   </span>
//                 )}
//               </div>
//               <h1 className="display-5 fw-800 text-navy mb-3">
//                 {listing.title}
//               </h1>
//               <p className="fs-5 text-muted border-start border-4 border-gold ps-3 mb-0">
//                 <i className="bi bi-geo-alt-fill text-danger me-2"></i>
//                 {listing.address}
//               </p>
//             </section>

//             {/* Review Form */}
//             <section className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-light">
//               <h5 className="fw-800 text-navy mb-4 text-uppercase ls-1">
//                 Leave a Review
//               </h5>
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
//                     ? "Write your experience here..."
//                     : "Please login to review"
//                 }
//                 value={comment}
//                 disabled={!isAuthenticated}
//                 onChange={(e) => setComment(e.target.value)}></textarea>
//               <button
//                 className="uma-btn-navy uma-btn px-5 py-2"
//                 onClick={handlePostReview}
//                 disabled={submitting}>
//                 {submitting ? "POSTING..." : "SUBMIT REVIEW"}
//               </button>
//             </section>

//             {/* Review Summary */}
//             <section className="mb-5">
//               <div className="d-flex align-items-center gap-3 border-bottom pb-3 mb-4">
//                 <h4 className="fw-800 text-navy mb-0">USER REVIEWS</h4>
//                 <button
//                   className="btn btn-navy rounded-pill px-4 py-1 fw-bold shadow-sm"
//                   onClick={() => setIsModalOpen(true)}
//                   style={{ fontSize: "0.85rem" }}>
//                   {allReviews.length} Reviews
//                 </button>
//               </div>
//             </section>
//           </div>

//           {/* Sidebar */}
//           <div className="col-12 col-lg-4">
//             <aside className="sticky-top" style={{ top: "120px" }}>
//               <div className="card border-0 shadow-lg rounded-4 overflow-hidden border-gold-top p-4 bg-white">
//                 <div className="mb-4 text-center">
//                   <span className="text-muted fw-bold small text-uppercase ls-1 d-block mb-1">
//                     Starting Price
//                   </span>
//                   <h2 className="display-6 fw-800 text-navy">
//                     ${listing.items?.[0]?.price?.toLocaleString() || 0}
//                   </h2>
//                 </div>
//                 <div className="d-grid gap-3">
//                   <button
//                     className="uma-btn-navy uma-btn w-100 py-3 shadow border-0"
//                     onClick={handleBooking}
//                     disabled={isSubmitting}>
//                     {isSubmitting ? "SCHEDULING..." : "SCHEDULE VISIT"}
//                   </button>
//                   <a
//                     href={`tel:${listing.phone}`}
//                     className="btn btn-outline-navy fw-800 w-100 py-3">
//                     <i className="bi bi-telephone-fill me-2"></i>{" "}
//                     {listing.phone}
//                   </a>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </div>

//       {/* REVIEWS POPUP MODAL */}
//       {isModalOpen && (
//         <div
//           className="modal show d-block"
//           tabIndex="-1"
//           style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1060 }}>
//           <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
//             <div className="modal-content border-0 rounded-4 shadow-lg">
//               <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex justify-content-between align-items-center">
//                 <h4 className="fw-800 text-navy mb-0">
//                   All Reviews ({allReviews.length})
//                 </h4>
//                 <button
//                   type="button"
//                   className="btn btn-light rounded-circle p-2 shadow-none"
//                   onClick={() => setIsModalOpen(false)}>
//                   <X size={20} />
//                 </button>
//               </div>
//               <div className="modal-body p-4">
//                 {allReviews.length > 0 ? (
//                   allReviews.map((rev, i) => (
//                     <div
//                       key={i}
//                       className="card border-0 border-bottom rounded-0 mb-4 pb-3 bg-transparent">
//                       <div className="d-flex justify-content-between align-items-center mb-1">
//                         <h6 className="fw-bold text-navy mb-0">
//                           {rev.userId?.fullName || "Verified User"}
//                         </h6>
//                         <div className="text-warning small">
//                           {[...Array(5)].map((_, si) => (
//                             <i
//                               key={si}
//                               className={`bi bi-star-fill me-1 ${si < (rev.ratingValue || 5) ? "text-warning" : "text-light-subtle"}`}></i>
//                           ))}
//                         </div>
//                       </div>
//                       <p
//                         className="text-secondary small mb-0 mt-2"
//                         style={{ lineHeight: "1.6" }}>
//                         {rev.comment}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-muted py-5">No reviews yet.</p>
//                 )}
//               </div>
//               <div className="modal-footer border-0 p-3">
//                 <button
//                   className="btn btn-outline-navy fw-bold px-4"
//                   onClick={() => setIsModalOpen(false)}>
//                   CLOSE
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BrowseDetails;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star, X, Heart, MapPin } from "lucide-react"; // <-- MapPin ADDED HERE
import { toast } from "react-toastify";
import {
  getAllListingsApi,
  getImgURL,
  addRatingAPI,
  addReviewAPI,
  getRatingsAPI,
  getReviewsAPI,
  createBookingAPI,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getFavoritesByUserAPI,
} from "../services/authService";

const BrowseDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const slugify = (text) =>
    text
      ? text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";

  const fetchDetails = useCallback(async () => {
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

        setAllReviews(
          itemReviews.map((rev) => ({
            ...rev,
            ratingValue:
              itemRatings.find((rat) => rat.userId === rev.userId)?.rating || 5,
          })),
        );

        const userId = user?._id || user?.id || localStorage.getItem("userId");
        if (isAuthenticated && userId) {
          const favRes = await getFavoritesByUserAPI(userId);
          if (favRes.success) setFavorites(favRes.data);
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [slug, isAuthenticated, user]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.warn("Please login to bookmark.");
      return navigate("/login");
    }

    const userId = user?._id || user?.id || localStorage.getItem("userId");

    // Check if current listing is in favorites
    const existingFav = favorites.find((fav) => {
      const favId =
        typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
      return favId?.toString() === listing?._id?.toString();
    });

    try {
      if (existingFav) {
        await deleteFavoriteAPI(existingFav._id);
        setFavorites(favorites.filter((f) => f._id !== existingFav._id));
        toast.info("Removed from bookmarks");
      } else {
        // Correct Payload for 400 error fix
        const payload = {
          userId: userId,
          itemId: listing._id,
        };
        const res = await addFavoriteAPI(payload);
        if (res.success) {
          setFavorites([...favorites, res.data]);
          toast.success("Added to bookmarks");
        }
      }
    } catch (error) {
      console.error("Favorite Error:", error);
      toast.error("Error updating favorite");
    }
  };

  if (loading)
    return <div className="text-center py-5 fw-bold">LOADING...</div>;
  if (!listing)
    return <div className="text-center py-5">Listing not found.</div>;

  const isFavorited = favorites.some((fav) => {
    const favId = typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
    return favId?.toString() === listing?._id?.toString();
  });

  return (
    <div className="bg-white min-vh-100">
      <nav
        className="bg-white border-bottom sticky-top p-3 shadow-sm"
        style={{ zIndex: 1000 }}>
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-decoration-none p-0 text-dark fw-bold">
            ← BACK TO BROWSE
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="position-relative rounded-4 overflow-hidden shadow-sm mb-4">
              <img
                src={getImgURL(activeImg)}
                className="w-100 object-fit-cover"
                style={{ height: "400px" }}
                alt="Main"
              />
              <button
                className="btn btn-white rounded-circle shadow position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "white",
                  border: "none",
                }}
                onClick={handleBookmark}>
                <Heart
                  size={28}
                  color="#ff4d4d"
                  fill={isFavorited ? "#ff4d4d" : "none"}
                />
              </button>
            </div>

            <div className="d-flex gap-2 mb-5">
              {listing.images?.map((img, i) => (
                <img
                  key={i}
                  src={getImgURL(img)}
                  onClick={() => setActiveImg(img)}
                  className={`rounded-3 border ${activeImg === img ? "border-warning" : ""}`}
                  style={{
                    width: "80px",
                    height: "60px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  alt="thumb"
                />
              ))}
            </div>

            <h1 className="fw-bold text-navy">{listing.title}</h1>
            <p className="text-muted">
              <MapPin size={18} className="text-danger" /> {listing.address}
            </p>
            <hr />
            <h4 className="fw-bold mb-3">REVIEWS</h4>
            <button
              className="btn btn-navy mb-4"
              onClick={() => setIsModalOpen(true)}>
              {allReviews.length} Reviews
            </button>
          </div>

          <div className="col-lg-4">
            <div
              className="card p-4 shadow-lg border-0 rounded-4 sticky-top"
              style={{ top: "100px" }}>
              <div className="text-center mb-4">
                <small className="text-muted d-block">Starting Price</small>
                <h2 className="fw-bold text-navy">
                  ${listing.items?.[0]?.price?.toLocaleString()}
                </h2>
              </div>
              <button className="btn btn-primary w-100 mb-3 fw-bold">
                Login To Bookmark Items
              </button>
              <a
                href={`tel:${listing.phone}`}
                className="btn btn-outline-dark w-100 py-3 fw-bold">
                CALL NOW
              </a>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">All Reviews</h4>
                <X
                  onClick={() => setIsModalOpen(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {allReviews.map((rev, i) => (
                  <div key={i} className="border-bottom mb-3 pb-3">
                    <div className="d-flex justify-content-between">
                      <div className="fw-bold">
                        {rev.userId?.fullName || "User"}
                      </div>
                      <div className="text-warning">
                        {"★".repeat(rev.ratingValue)}
                      </div>
                    </div>
                    <p className="text-muted mb-0">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseDetails;