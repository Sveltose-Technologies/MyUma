// // import React, { useState, useEffect } from "react";
// // import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
// // import { Star, Calendar, Info, PlayCircle, MapPin } from "lucide-react";
// // import { addRatingAPI } from "../services/authService";
// // import { getUser } from "../utils/storage";
// // import { toast } from "react-toastify";
// // import L from "leaflet";
// // import "leaflet/dist/leaflet.css";

// // function ChangeView({ center }) {
// //   const map = useMap();
// //   map.setView(center, 14);
// //   return null;
// // }

// // const BusinessDetailsUI = ({
// //   listing,
// //   nearby,
// //   navigate,
// //   slugify,
// //   getImgURL,
// //   listingRatings,
// //   refreshData,
// //   isOwner,
// // }) => {
// //   const [coords, setCoords] = useState([22.7196, 75.8577]);
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showListModal, setShowListModal] = useState(false);
// //   const [rating, setRating] = useState(5);
// //   const [comment, setComment] = useState("");
// //   const [submitting, setSubmitting] = useState(false);

// //   const currentUser = getUser();
// //   const isLoggedIn = !!localStorage.getItem("token");
// //   const hasReviewed = listingRatings?.some(
// //     (r) =>
// //       (r.userId?._id || r.userId) === (currentUser?._id || currentUser?.id),
// //   );

// //   const getEmbedUrl = (url) => {
// //     if (!url) return null;
// //     const regExp =
// //       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
// //     const match = url.match(regExp);
// //     return match && match[2].length === 11
// //       ? `https://www.youtube.com/embed/${match[2]}`
// //       : null;
// //   };

// //   useEffect(() => {
// //     if (listing?.address) {
// //       fetch(
// //         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`,
// //       )
// //         .then((r) => r.json())
// //         .then((d) => {
// //           if (d[0]) setCoords([parseFloat(d[0].lat), parseFloat(d[0].lon)]);
// //         });
// //     }
// //   }, [listing?.address]);

// //   const handleRatingSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!isLoggedIn) return navigate("/login");
// //     setSubmitting(true);
// //     try {
// //       const res = await addRatingAPI({
// //         userId: currentUser._id || currentUser.id,
// //         itemId: listing._id,
// //         rating,
// //         comment: comment.trim(),
// //       });
// //       if (res.status) {
// //         toast.success("Review Submitted!");
// //         setShowAddModal(false);
// //         setComment("");
// //         refreshData();
// //       }
// //     } catch (err) {
// //       toast.error("Error submitting review");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
// //         <h5 className="fw-bold mb-3 text-navy d-flex align-items-center gap-2">
// //           <Info size={20} className="text-primary" /> Description
// //         </h5>
// //         <p className="text-muted m-0 lh-lg">{listing.description}</p>
// //       </div>

// //       {getEmbedUrl(listing.video || listing.youtubeVideo) && (
// //         <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
// //           <h5 className="fw-bold mb-3 text-navy d-flex align-items-center gap-2">
// //             <PlayCircle size={20} className="text-danger" /> Video Tour
// //           </h5>
// //           <div className="ratio ratio-16x9 rounded-3 overflow-hidden border">
// //             <iframe
// //               src={getEmbedUrl(listing.video || listing.youtubeVideo)}
// //               title="Video"
// //               allowFullScreen></iframe>
// //           </div>
// //         </div>
// //       )}

// //       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center">
// //         <div className="cursor-pointer" onClick={() => setShowListModal(true)}>
// //           <h5 className="fw-bold mb-1 text-navy">
// //             Reviews ({listingRatings?.length || 0})
// //           </h5>
// //           <small className="text-primary text-decoration-underline">
// //             View User Reviews
// //           </small>
// //         </div>
// //         {!isOwner &&
// //           (hasReviewed ? (
// //             <button className="btn btn-sm btn-outline-secondary rounded-pill disabled px-3">
// //               Already Reviewed
// //             </button>
// //           ) : (
// //             <button
// //               onClick={() =>
// //                 isLoggedIn ? setShowAddModal(true) : navigate("/login")
// //               }
// //               className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
// //               Write Review
// //             </button>
// //           ))}
// //       </div>

// //       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
// //         <h5 className="fw-bold mb-3 text-navy">Location Map</h5>
// //         <div
// //           style={{ height: "350px" }}
// //           className="rounded-3 overflow-hidden border">
// //           <MapContainer center={coords} zoom={13} style={{ height: "100%" }}>
// //             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //             <ChangeView center={coords} />
// //             <Marker
// //               position={coords}
// //               icon={L.icon({
// //                 iconUrl:
// //                   "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
// //                 iconSize: [25, 41],
// //                 iconAnchor: [12, 41],
// //               })}
// //             />
// //           </MapContainer>
// //         </div>
// //       </div>

// //       <div className="row g-3">
// //         <h5 className="fw-bold text-navy mt-2">Related Listings</h5>
// //         {nearby.slice(0, 4).map((item) => (
// //           <div
// //             key={item._id}
// //             className="col-md-6"
// //             onClick={() => navigate(`/browse/${slugify(item.title)}`)}>
// //             <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white cursor-pointer">
// //               <div className="ratio ratio-4x3">
// //                 <img
// //                   src={getImgURL(item.images?.[0])}
// //                   className="object-fit-cover"
// //                   alt=""
// //                 />
// //               </div>
// //               <div className="p-3">
// //                 <h6 className="fw-bold mb-1 text-truncate">{item.title}</h6>
// //                 <small className="text-muted">
// //                   <MapPin size={12} /> {item.address}
// //                 </small>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* REVIEW MODALS REMAIN UNCHANGED BUT WITHOUT LANGUAGE FILTER */}
// //       {showAddModal && (
// //         <div
// //           className="modal show d-block"
// //           style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 12000 }}>
// //           <div className="modal-dialog modal-dialog-centered">
// //             <div className="modal-content rounded-4 border-0">
// //               <div className="modal-header border-0 pb-0">
// //                 <h5>Write Review</h5>
// //                 <button
// //                   className="btn-close"
// //                   onClick={() => setShowAddModal(false)}></button>
// //               </div>
// //               <form
// //                 onSubmit={handleRatingSubmit}
// //                 className="modal-body text-center">
// //                 <div className="d-flex justify-content-center gap-2 mb-3">
// //                   {[1, 2, 3, 4, 5].map((n) => (
// //                     <Star
// //                       key={n}
// //                       className="cursor-pointer"
// //                       size={30}
// //                       fill={n <= rating ? "#ffc107" : "none"}
// //                       stroke={n <= rating ? "#ffc107" : "#ccc"}
// //                       onClick={() => setRating(n)}
// //                     />
// //                   ))}
// //                 </div>
// //                 <textarea
// //                   className="form-control"
// //                   rows="4"
// //                   placeholder="Your review..."
// //                   required
// //                   value={comment}
// //                   onChange={(e) => setComment(e.target.value)}
// //                 />
// //                 <button
// //                   type="submit"
// //                   disabled={submitting}
// //                   className="btn btn-danger w-100 mt-4 rounded-pill fw-bold py-2 shadow">
// //                   SUBMIT
// //                 </button>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {showListModal && (
// //         <div
// //           className="modal show d-block"
// //           style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 12000 }}>
// //           <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
// //             <div className="modal-content rounded-4 border-0 overflow-hidden">
// //               <div className="modal-header bg-light">
// //                 <h5 className="fw-bold m-0">Customer Feedback</h5>
// //                 <button
// //                   className="btn-close"
// //                   onClick={() => setShowListModal(false)}></button>
// //               </div>
// //               <div className="modal-body p-4">
// //                 {listingRatings.map((r) => (
// //                   <div key={r._id} className="border-bottom pb-3 mb-3">
// //                     <div className="d-flex justify-content-between mb-1">
// //                       <div className="text-warning">
// //                         {[...Array(r.rating)].map((_, i) => (
// //                           <Star key={i} size={14} fill="currentColor" />
// //                         ))}
// //                       </div>
// //                       <small className="text-muted">
// //                         <Calendar size={12} />{" "}
// //                         {new Date(r.createdAt).toLocaleDateString()}
// //                       </small>
// //                     </div>
// //                     <p className="m-0 small">{r.comment}</p>
// //                     <small className="fw-bold">
// //                       - {r.userId?.fullName || "User"}
// //                     </small>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BusinessDetailsUI;

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
// import {
//   Star,
//   Calendar,
//   Info,
//   PlayCircle,
//   MapPin,
//   Heart,
//   Navigation,
//   Layers,
//   X,
//   CheckCircle,
// } from "lucide-react";
// import { addRatingAPI } from "../services/authService";
// import { getUser } from "../utils/storage";
// import { toast } from "react-toastify";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet Marker Icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// function ChangeView({ center }) {
//   const map = useMap();
//   map.setView(center, 14);
//   return null;
// }

// const BusinessDetailsUI = ({
//   listing,
//   nearby,
//   navigate,

//   getImgURL,
//   listingRatings,
//   refreshData,
//   isOwner,
//   favorites, // Prop from BrowseDetails
//   handleBookmark, // Prop from BrowseDetails
// }) => {
//   const [coords, setCoords] = useState([22.7196, 75.8577]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showListModal, setShowListModal] = useState(false);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const currentUser = getUser();
//   const isLoggedIn = !!localStorage.getItem("token");
// const slugify = (text) =>
//   text
//     ? text
//         .toLowerCase()
//         .trim()
//         .replace(/[^\w\s-]/g, "")
//         .replace(/[\s_-]+/g, "-")
//         .replace(/^-+|-+$/g, "")
//     : "";
//   // Check if current user already reviewed
//   const hasReviewed = listingRatings?.some(
//     (r) =>
//       (r.userId?._id || r.userId) === (currentUser?._id || currentUser?.id),
//   );
// const getEmbedUrl = (url) => {
//   if (!url) return null;

//   // This regex extracts the 11-character ID from any YouTube link format
//   const regExp =
//     /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);

//   if (match && match[2].length === 11) {
//     const videoId = match[2];
//     // IMPORTANT: Always use https and the /embed/ path
//     // ?rel=0 prevents showing related videos from other channels
//     return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&origin=${window.location.origin}`;
//   }

//   return null;
// };

//   // Map Geocoding
//   useEffect(() => {
//     if (listing?.address) {
//       fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`,
//       )
//         .then((r) => r.json())
//         .then((d) => {
//           if (d[0]) setCoords([parseFloat(d[0].lat), parseFloat(d[0].lon)]);
//         });
//     }
//   }, [listing?.address]);

//   const handleRatingSubmit = async (e) => {
//     e.preventDefault();
//     if (!isLoggedIn) return navigate("/login");
//     setSubmitting(true);
//     try {
//       const res = await addRatingAPI({
//         userId: currentUser._id || currentUser.id,
//         itemId: listing._id,
//         rating,
//         comment: comment.trim(),
//       });
//       if (res.status) {
//         toast.success("Review Submitted!");
//         setShowAddModal(false);
//         setComment("");
//         refreshData();
//       }
//     } catch (err) {
//       toast.error("Error submitting review");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="text-start">
//       {/* 1. DESCRIPTION */}
//       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//         <h5 className="fw-800 mb-3 text-navy d-flex align-items-center gap-2">
//           <Info size={20} className="text-primary" /> ABOUT BUSINESS
//         </h5>
//         <p className="text-muted m-0 lh-lg" style={{ textAlign: "justify" }}>
//           {listing.description || "No description provided."}
//         </p>
//       </div>

//       {/* --- VIDEO TOUR SECTION --- */}
//       {getEmbedUrl(listing.video || listing.youtubeVideo) && (
//         <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border text-start">
//           <h5 className="fw-800 mb-3 text-navy d-flex align-items-center gap-2 text-uppercase">
//             <PlayCircle size={20} className="text-danger" /> Video Tour
//           </h5>
//           <div className="ratio ratio-16x9 rounded-4 overflow-hidden border shadow-sm bg-light">
//             <iframe
//               src={getEmbedUrl(listing.video || listing.youtubeVideo)}
//               title="YouTube Video Player"
//               // These attributes are MANDATORY for production/cPanel builds
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//               style={{ border: 0 }}></iframe>
//           </div>
//         </div>
//       )}

//       {/* 3. REVIEWS HEADER BOX */}
//       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center">
//         <div className="cursor-pointer" onClick={() => setShowListModal(true)}>
//           <h5 className="fw-800 mb-1 text-navy">
//             Reviews ({listingRatings?.length || 0})
//           </h5>
//           <small className="text-primary fw-bold text-decoration-underline">
//             View All Feedback
//           </small>
//         </div>
//         {!isOwner &&
//           (hasReviewed ? (
//             <span className="badge bg-light text-muted border px-3 py-2 rounded-pill">
//               <CheckCircle size={14} className="me-1" /> Already Reviewed
//             </span>
//           ) : (
//             <button
//               onClick={() =>
//                 isLoggedIn ? setShowAddModal(true) : navigate("/login")
//               }
//               className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
//               Write Review
//             </button>
//           ))}
//       </div>

//       {/* 4. LOCATION MAP */}
//       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//         <h5 className="fw-800 mb-3 text-navy d-flex align-items-center gap-2 text-uppercase">
//           <MapPin size={20} className="text-danger" /> Location Map
//         </h5>
//         <div
//           style={{ height: "350px" }}
//           className="rounded-4 overflow-hidden border shadow-sm">
//           <MapContainer
//             center={coords}
//             zoom={13}
//             style={{ height: "100%", width: "100%" }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <ChangeView center={coords} />
//             <Marker position={coords} />
//           </MapContainer>
//         </div>
//       </div>

//       {/* 5. RELATED LISTINGS (BROWSE LISTINGS STYLE) */}
//       <div className="mt-5">
//         <h4 className="fw-800 text-navy mb-4 text-uppercase">
//           Related Listings
//         </h4>
//         <div className="row g-4">
//           {nearby && nearby.length > 0 ? (
//             nearby.slice(0, 4).map((item) => {
//               const isFavorited = favorites?.some((fav) => {
//                 const favId =
//                   typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
//                 return favId?.toString() === item._id?.toString();
//               });

//               return (
//                 <div key={item._id} className="col-12 col-md-6">
//                   {/* Clicking this card navigates to Detail Page */}
//                   <div
//                     className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden listing-card bg-white"
//                     style={{ cursor: "pointer", transition: "0.3s" }}
//                     onClick={() => navigate(`/browse/${slugify(item.title)}`)}>
//                     <div className="ratio ratio-4x3 position-relative">
//                       <img
//                         src={getImgURL(item.images?.[0])}
//                         alt={item.title}
//                         className="object-fit-cover"
//                       />
//                       <div
//                         className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-start p-3"
//                         style={{ zIndex: 10 }}>
//                         <span className="badge bg-white text-navy shadow-sm fw-800 px-3 py-2 rounded-3">
//                           ₹{item.items?.[0]?.price?.toLocaleString() || 0}
//                         </span>
//                         <button
//                           className="btn btn-white rounded-circle shadow-sm d-flex align-items-center justify-content-center"
//                           style={{
//                             width: "38px",
//                             height: "38px",
//                             border: "none",
//                             backgroundColor: "white",
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleBookmark(e, item);
//                           }}>
//                           <Heart
//                             size={20}
//                             color="#ff4d4d"
//                             fill={isFavorited ? "#ff4d4d" : "none"}
//                           />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="card-body p-4 d-flex flex-column">
//                       <div className="d-flex justify-content-between mb-2">
//                         <div className="d-flex flex-column">
//                           <small
//                             className="text-warning fw-800 text-uppercase"
//                             style={{ fontSize: "10px" }}>
//                             {item.categoryId?.name}
//                           </small>
//                           {item.subCategoryId?.subcategoryName && (
//                             <small
//                               className="text-navy fw-bold"
//                               style={{ fontSize: "11px" }}>
//                               <Layers size={10} className="me-1" />{" "}
//                               {item.subCategoryId.subcategoryName}
//                             </small>
//                           )}
//                         </div>
//                       </div>
//                       <h5 className="fw-800 text-navy mb-2 text-truncate">
//                         {item.title}
//                       </h5>
//                       <p className="text-muted small mb-4 text-truncate">
//                         <MapPin size={14} className="text-danger me-1" />{" "}
//                         {item.address}
//                       </p>
//                       <div className="mt-auto d-flex justify-content-end">
//                         <button
//                           className="btn btn-light rounded-3 px-3 py-2 border shadow-sm"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             window.open(
//                               `https://www.google.com/maps/search/${encodeURIComponent(item.address)}`,
//                             );
//                           }}>
//                           <Navigation size={18} className="text-navy" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="col-12">
//               <p className="text-muted">No related listings.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- WRITE REVIEW MODAL --- */}
//       {showAddModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 12000 }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content rounded-4 border-0 shadow-lg">
//               <div
//                 className="modal-header border-0 bg-navy text-white p-4"
//                 style={{ backgroundColor: "#001f3f" }}>
//                 <h5 className="m-0 fw-bold">Write a Review</h5>
//                 <X
//                   className="cursor-pointer"
//                   onClick={() => setShowAddModal(false)}
//                 />
//               </div>
//               <form
//                 onSubmit={handleRatingSubmit}
//                 className="modal-body p-4 text-center">
//                 <p className="text-muted small">
//                   How was your experience with <b>{listing.title}</b>?
//                 </p>
//                 <div className="d-flex justify-content-center gap-2 mb-4">
//                   {[1, 2, 3, 4, 5].map((n) => (
//                     <Star
//                       key={n}
//                       className="cursor-pointer"
//                       size={35}
//                       fill={n <= rating ? "#ffc107" : "none"}
//                       stroke={n <= rating ? "#ffc107" : "#ccc"}
//                       onClick={() => setRating(n)}
//                     />
//                   ))}
//                 </div>
//                 <textarea
//                   className="form-control rounded-4 p-3 border-light shadow-sm"
//                   rows="4"
//                   placeholder="Share your feedback here..."
//                   required
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="btn w-100 mt-4 rounded-pill fw-bold py-2 shadow-sm text-white"
//                   style={{ backgroundColor: "#001f3f" }}>
//                   {submitting ? "SUBMITTING..." : "POST REVIEW"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- ALL REVIEWS MODAL --- */}
//       {showListModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 12000 }}>
//           <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
//             <div className="modal-content rounded-4 border-0">
//               <div className="modal-header bg-light border-bottom p-4">
//                 <h5 className="fw-800 m-0 text-navy">Customer Feedback</h5>
//                 <X
//                   className="cursor-pointer"
//                   onClick={() => setShowListModal(false)}
//                 />
//               </div>
//               <div className="modal-body p-4">
//                 {listingRatings?.length > 0 ? (
//                   listingRatings.map((r) => (
//                     <div
//                       key={r._id}
//                       className="bg-light p-3 rounded-4 mb-3 border">
//                       <div className="d-flex justify-content-between align-items-start mb-2">
//                         <div className="d-flex align-items-center gap-2">
//                           <div className="bg-white rounded-circle p-2 border">
//                             <Star size={16} fill="#ffc107" stroke="#ffc107" />
//                           </div>
//                           <span className="fw-bold">{r.rating}.0</span>
//                         </div>
//                         <small className="text-muted">
//                           <Calendar size={12} className="me-1" />{" "}
//                           {new Date(r.createdAt).toLocaleDateString()}
//                         </small>
//                       </div>
//                       <p className="m-0 small text-dark mb-2">"{r.comment}"</p>
//                       <small className="fw-bold text-navy">
//                         - {r.userId?.fullName || "User"}
//                       </small>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-5 text-muted">
//                     No reviews yet.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         .fw-800 { font-weight: 800; }
//         .text-navy { color: #001f3f; }
//         .cursor-pointer { cursor: pointer; }
//         .listing-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
//       `}</style>
//     </div>
//   );
// };

// export default BusinessDetailsUI;

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import {
  Star,
  Calendar,
  Info,
  PlayCircle,
  MapPin,
  Heart,
  Navigation,
  Layers,
  X,
  CheckCircle,
  User,
} from "lucide-react";
import { addRatingAPI } from "../services/authService";
import { getUser } from "../utils/storage";
import { toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet Marker Icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
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
  getImgURL,
  listingRatings,
  refreshData,
  isOwner,
  favorites,
  handleBookmark,
}) => {
  const [coords, setCoords] = useState([22.7196, 75.8577]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentUser = getUser();
  const isLoggedIn = !!localStorage.getItem("token");

  const slugify = (text) =>
    text
      ? text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";

  const hasReviewed = listingRatings?.some((r) => {
    const reviewUserId = r.userId?._id || r.userId;
    const currentUserId = currentUser?._id || currentUser?.id;
    return reviewUserId?.toString() === currentUserId?.toString();
  });

const getEmbedUrl = (url) => {
  if (!url) return null;

  // Regex to capture ID from standard, shorts, or mobile links
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    // Use clean HTTPS embed link without extra parameters that cause Error 153
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return null;
};
  useEffect(() => {
    if (listing?.address) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`,
      )
        .then((r) => r.json())
        .then((d) => {
          if (d[0]) setCoords([parseFloat(d[0].lat), parseFloat(d[0].lon)]);
        });
    }
  }, [listing?.address]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return navigate("/login");
    setSubmitting(true);
    try {
      const res = await addRatingAPI({
        userId: currentUser._id || currentUser.id,
        itemId: listing._id,
        rating,
        comment: comment.trim(),
      });
      if (res.status) {
        toast.success("Review Submitted!");
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
    <div className="text-start">
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
        <h5 className="fw-800 mb-3 text-navy d-flex align-items-center gap-2">
          <Info size={20} className="text-primary" /> ABOUT BUSINESS
        </h5>
        <p className="text-muted m-0 lh-lg" style={{ textAlign: "justify" }}>
          {listing.description || "No description provided."}
        </p>
      </div>
      {getEmbedUrl(listing.video || listing.youtubeVideo) && (
        <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
          <h5 className="fw-800 mb-3 text-navy d-flex align-items-center gap-2 text-uppercase">
            <PlayCircle size={20} className="text-danger" /> Video Tour
          </h5>
          <div className="ratio ratio-16x9 rounded-4 overflow-hidden border shadow-sm">
            <iframe
              src={getEmbedUrl(listing.video || listing.youtubeVideo)}
              title="Video Player"
              // Add these attributes specifically for cPanel/Production
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ border: 0 }}></iframe>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center">
        <div className="cursor-pointer" onClick={() => setShowListModal(true)}>
          <h5 className="fw-800 mb-1 text-navy">
            Reviews ({listingRatings?.length || 0})
          </h5>
          <small className="text-primary fw-bold text-decoration-underline">
            View All Feedback
          </small>
        </div>
        {!isOwner &&
          isLoggedIn &&
          (hasReviewed ? (
            <div className="d-flex align-items-center gap-2 py-2 px-3 bg-success-subtle border border-success rounded-pill text-success fw-bold shadow-sm">
              <CheckCircle size={18} /> Already Reviewed
            </div>
          ) : (
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
              Write Review
            </button>
          ))}
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
            Write Review
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
        <h5 className="fw-800 mb-3 text-navy d-flex align-items-center gap-2 text-uppercase">
          <MapPin size={20} className="text-danger" /> Location Map
        </h5>
        <div
          style={{ height: "350px" }}
          className="rounded-4 overflow-hidden border shadow-sm">
          <MapContainer
            center={coords}
            zoom={13}
            style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={coords} />
            <Marker position={coords} />
          </MapContainer>
        </div>
      </div>

      {/* 5. RELATED LISTINGS (Strictly Filtered) */}
      <div className="mt-5">
        <h4 className="fw-800 text-navy mb-4 text-uppercase">
          Related Listings
        </h4>
        <div className="row g-4">
          {nearby && nearby.length > 0 ? (
            nearby
              .filter(
                (item) => item._id?.toString() !== listing._id?.toString(),
              ) // Extra safety filter
              .slice(0, 4)
              .map((item) => {
                const isFavorited = favorites?.some((fav) => {
                  const favId =
                    typeof fav.itemId === "object"
                      ? fav.itemId._id
                      : fav.itemId;
                  return favId?.toString() === item._id?.toString();
                });

                return (
                  <div key={item._id} className="col-12 col-md-6">
                    <div
                      className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden listing-card bg-white"
                      style={{ cursor: "pointer", transition: "0.3s" }}
                      onClick={() =>
                        navigate(`/browse/${slugify(item.title)}`)
                      }>
                      <div className="ratio ratio-4x3 position-relative">
                        <img
                          src={getImgURL(item.images?.[0])}
                          alt={item.title}
                          className="object-fit-cover"
                        />
                        <div
                          className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-start p-3"
                          style={{ zIndex: 10 }}>
                          <span className="badge bg-white text-navy shadow-sm fw-800 px-3 py-2 rounded-3">
                            ₹{item.items?.[0]?.price?.toLocaleString() || 0}
                          </span>
                          <button
                            className="btn btn-white rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                            style={{
                              width: "38px",
                              height: "38px",
                              border: "none",
                              backgroundColor: "white",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookmark(e, item);
                            }}>
                            <Heart
                              size={20}
                              color="#ff4d4d"
                              fill={isFavorited ? "#ff4d4d" : "none"}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="card-body p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between mb-2">
                          <div className="d-flex flex-column">
                            <small
                              className="text-warning fw-800 text-uppercase"
                              style={{ fontSize: "10px" }}>
                              {item.categoryId?.name}
                            </small>
                            {item.subCategoryId?.subcategoryName && (
                              <small
                                className="text-navy fw-bold"
                                style={{ fontSize: "11px" }}>
                                <Layers size={10} className="me-1" />{" "}
                                {item.subCategoryId.subcategoryName}
                              </small>
                            )}
                          </div>
                        </div>
                        <h5 className="fw-800 text-navy mb-2 text-truncate">
                          {item.title}
                        </h5>
                        <p className="text-muted small mb-4 text-truncate">
                          <MapPin size={14} className="text-danger me-1" />{" "}
                          {item.address}
                        </p>
                        <div className="mt-auto d-flex justify-content-end">
                          <button
                            className="btn btn-light rounded-3 px-3 py-2 border shadow-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(
                                `https://www.google.com/maps/search/${encodeURIComponent(item.address)}`,
                              );
                            }}>
                            <Navigation size={18} className="text-navy" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="col-12">
              <p className="text-muted">No related listings.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {showAddModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 12000 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div
                className="modal-header border-0 bg-navy text-white p-4"
                style={{ backgroundColor: "#001f3f" }}>
                <h5 className="m-0 fw-bold">Write a Review</h5>
                <X
                  className="cursor-pointer"
                  onClick={() => setShowAddModal(false)}
                />
              </div>
              <form
                onSubmit={handleRatingSubmit}
                className="modal-body p-4 text-center">
                <div className="d-flex justify-content-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className="cursor-pointer"
                      size={35}
                      fill={n <= rating ? "#ffc107" : "none"}
                      stroke={n <= rating ? "#ffc107" : "#ccc"}
                      onClick={() => setRating(n)}
                    />
                  ))}
                </div>
                <textarea
                  className="form-control rounded-4 p-3 border shadow-sm"
                  rows="4"
                  placeholder="Share your experience..."
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn w-100 mt-4 rounded-pill fw-bold py-2 text-white"
                  style={{ backgroundColor: "#001f3f" }}>
                  {submitting ? "SUBMITTING..." : "POST REVIEW"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showListModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 12000 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header bg-light border-bottom p-4">
                <h5 className="fw-800 m-0 text-navy">
                  Customer Feedback ({listingRatings?.length || 0})
                </h5>
                <X
                  className="cursor-pointer"
                  onClick={() => setShowListModal(false)}
                />
              </div>
              <div className="modal-body p-4">
                {listingRatings?.map((r) => (
                  <div
                    key={r._id}
                    className="bg-white p-3 rounded-4 mb-3 border shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        {r.userId?.profileImage ? (
                          <img
                            src={getImgURL(r.userId.profileImage)}
                            alt="user"
                            className="rounded-circle border"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div className="bg-light rounded-circle p-2 border">
                            <User size={20} />
                          </div>
                        )}
                        <div>
                          <h6 className="m-0 fw-bold">
                            {r.userId?.fullName || "User"}
                          </h6>
                          <div className="d-flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                fill={i < r.rating ? "#ffc107" : "none"}
                                stroke={i < r.rating ? "#ffc107" : "#ccc"}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <small className="text-muted">
                        <Calendar size={12} />{" "}
                        {new Date(r.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <p className="m-0 small text-dark p-2 bg-light rounded-3">
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`.fw-800 { font-weight: 800; } .text-navy { color: #001f3f; } .cursor-pointer { cursor: pointer; } .listing-card:hover { transform: translateY(-5px); transition: 0.3s; }`}</style>
    </div>
  );
};

export default BusinessDetailsUI;