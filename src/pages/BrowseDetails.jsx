// // import React, { useState, useEffect, useCallback } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { MapPin, Heart, Clock, Star, User, Share2, Layers } from "lucide-react";
// // import { toast } from "react-toastify";

// // // Swiper for Carousel
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Pagination, Autoplay } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/pagination";

// // import {
// //   FaFacebook,
// //   FaInstagram,
// //   FaLinkedin,
// //   FaYoutube,
// //   FaWhatsapp,
// //   FaSquareXTwitter,
// //   FaEnvelope,
// //   FaPinterest,
// // } from "react-icons/fa6";

// // import {
// //   getAllListingsApi,
// //   getImgURL,
// //   getFavoritesByUserAPI,
// //   addFavoriteAPI,
// //   deleteFavoriteAPI,
// //   getRatingsAPI,
// // } from "../services/authService";
// // import { getUser } from "../utils/storage";
// // import BusinessDetailsUI from "./BusinessDetailsUI";

// // const BrowseDetails = () => {
// //   const { slug } = useParams();
// //   const navigate = useNavigate();

// //   const { isAuthenticated, user: reduxUser } = useSelector(
// //     (state) => state.auth,
// //   );
// //   const [listing, setListing] = useState(null);
// //   const [nearby, setNearby] = useState([]);
// //   const [favorites, setFavorites] = useState([]);
// //   const [listingRatings, setListingRatings] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const currentUser = reduxUser || getUser();
// //   const isLoggedIn = isAuthenticated || !!localStorage.getItem("token");

// //   const slugify = (text) =>
// //     text
// //       ? text
// //           .toLowerCase()
// //           .trim()
// //           .replace(/[^\w\s-]/g, "")
// //           .replace(/[\s_-]+/g, "-")
// //           .replace(/^-+|-+$/g, "")
// //       : "";

// //   const fetchData = useCallback(async () => {
// //     try {
// //       const res = await getAllListingsApi();
// //       const all = res?.listings || [];
// //       const found = all.find((i) => slugify(i.title) === slug);

// //       if (found) {
// //         setListing(found);
// //         setNearby(
// //           all.filter(
// //             (i) =>
// //               i.categoryId?._id === found.categoryId?._id &&
// //               i._id !== found._id,
// //           ),
// //         );
// //         const ratRes = await getRatingsAPI();
// //         if (ratRes.status && ratRes.data) {
// //           const filtered = ratRes.data.filter((r) => r.itemId === found._id);
// //           setListingRatings(filtered);
// //         }
// //       }

// //       if (isLoggedIn && currentUser) {
// //         const userId = currentUser._id || currentUser.id;
// //         const favRes = await getFavoritesByUserAPI(userId);
// //         if (favRes.success) setFavorites(favRes.data);
// //       }
// //     } catch (e) {
// //       console.error("Fetch Error:", e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [slug, isLoggedIn, currentUser]);

// //   useEffect(() => {
// //     fetchData();
// //     window.scrollTo(0, 0);
// //   }, [fetchData]);

// //   const handleBookmark = async (e, item) => {
// //     e.stopPropagation();
// //     if (!isLoggedIn) {
// //       toast.info("Please login to bookmark items...");
// //       navigate("/login");
// //       return;
// //     }
// //     const existingFav = favorites.find(
// //       (fav) =>
// //         (typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId) ===
// //         item._id,
// //     );
// //     try {
// //       if (existingFav) {
// //         await deleteFavoriteAPI(existingFav._id);
// //         setFavorites(favorites.filter((f) => f._id !== existingFav._id));
// //         toast.info("Removed from bookmarks");
// //       } else {
// //         const res = await addFavoriteAPI({
// //           userId: currentUser._id || currentUser.id,
// //           itemId: item._id,
// //         });
// //         if (res.success) {
// //           setFavorites([...favorites, res.data]);
// //           toast.success("Added to bookmarks");
// //         }
// //       }
// //     } catch (error) {
// //       toast.error("Bookmark action failed");
// //     }
// //   };

// //   if (loading || !listing)
// //     return (
// //       <div className="vh-100 d-flex align-items-center justify-content-center fw-bold text-navy">
// //         Loading...
// //       </div>
// //     );

// //   const isAlreadyFavorited = favorites.some(
// //     (f) =>
// //       (typeof f.itemId === "object" ? f.itemId._id : f.itemId) === listing._id,
// //   );

// //   return (
// //     <div className="bg-light min-vh-100 mt-5 pt-lg-5 pt-4 pb-5">
// //       {/* HEADER SECTION */}
// //       <div className="bg-white border-bottom py-4 shadow-sm">
// //         <div className="container">
// //           <div className="row align-items-center g-3">
// //             <div className="col-12 col-md-8">
// //               <h1 className="fw-800 h2 mb-2 text-navy">{listing.title}</h1>
// //               <div className="d-flex align-items-start gap-2">
// //                 <MapPin size={18} className="text-danger mt-1 flex-shrink-0" />
// //                 <p
// //                   className="text-muted m-0 lh-sm"
// //                   style={{ fontSize: "14px" }}>
// //                   {listing.address}{" "}
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="col-12 col-md-4 text-md-end">
// //               <button
// //                 onClick={(e) => handleBookmark(e, listing)}
// //                 className="btn bg-white border rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm">
// //                 <Heart
// //                   size={18}
// //                   color="#ff4d4d"
// //                   fill={isAlreadyFavorited ? "#ff4d4d" : "none"}
// //                 />
// //                 <span className="fw-bold small">
// //                   {isLoggedIn
// //                     ? isAlreadyFavorited
// //                       ? "Bookmarked"
// //                       : "Bookmark Listing"
// //                     : "Login To Bookmark"}
// //                 </span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container mt-4">
// //         <div className="row g-4">
// //           <div className="col-lg-8 col-12">
// //             {/* CAROUSEL */}
// //             <div className="rounded-4 overflow-hidden mb-4 shadow-sm border bg-white">
// //               <div
// //                 className="ratio ratio-16x9 ratio-md-4x3"
// //                 style={{ maxHeight: "450px" }}>
// //                 <Swiper
// //                   modules={[Pagination, Autoplay]}
// //                   pagination={{ clickable: true }}
// //                   autoplay={{ delay: 3500 }}
// //                   loop={listing.images?.length > 1}
// //                   className="w-100 h-100">
// //                   {listing.images?.map((img, index) => (
// //                     <SwiperSlide key={index}>
// //                       <img
// //                         src={getImgURL(img)}
// //                         className="w-100 h-100 object-fit-cover"
// //                         alt={listing.title}
// //                       />
// //                     </SwiperSlide>
// //                   ))}
// //                 </Swiper>
// //               </div>
// //             </div>

// //             <BusinessDetailsUI
// //               listing={listing}
// //               nearby={nearby}
// //               navigate={navigate}
// //               slugify={slugify}
// //               getImgURL={getImgURL}
// //               listingRatings={listingRatings}
// //               refreshData={fetchData}
// //             />
// //           </div>

// //           <div className="col-lg-4 col-12">
// //             {/* DYNAMIC CATEGORY & PRICE */}
// //             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
// //               <div className="d-flex justify-content-between align-items-start mb-3">
// //                 <div>
// //                   <small className="text-muted d-block mb-1">Category</small>
// //                   <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-3 fw-800">
// //                     {listing.categoryId?.name}
// //                   </span>
// //                 </div>
// //                 <div className="text-end">
// //                   <small className="text-muted d-block mb-1">Price Range</small>
// //                   <h4 className="fw-800 m-0 text-navy">
// //                     ${listing.items?.[0]?.price || 0}
// //                   </h4>
// //                 </div>
// //               </div>
// //               {listing.subCategoryId && (
// //                 <div className="pt-2 border-top">
// //                   <small className="text-muted d-block mb-1">Subcategory</small>
// //                   <div className="d-flex align-items-center gap-2 text-navy fw-bold small">
// //                     <Layers size={14} /> {listing.subCategoryId.subcategoryName}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //             {/* DYNAMIC OWNER INFO */}
// //             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
// //               <h6 className="fw-800 mb-3 d-flex align-items-center gap-2 text-navy">
// //                 <Clock size={18} className="text-warning" /> OPENING HOURS
// //               </h6>
// //               <div className="small text-muted">
// //                 {[
// //                   "Monday",
// //                   "Tuesday",
// //                   "Wednesday",
// //                   "Thursday",
// //                   "Friday",
// //                   "Saturday",
// //                 ].map((day) => (
// //                   <div
// //                     key={day}
// //                     className="d-flex justify-content-between py-2 border-bottom border-light">
// //                     <span>{day}</span>{" "}
// //                     <span className="fw-bold text-dark">
// //                       08:00 AM - 06:00 PM
// //                     </span>
// //                   </div>
// //                 ))}
// //                 <div className="d-flex justify-content-between py-2 text-danger fw-bold">
// //                   <span>Sunday</span> <span>Closed</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
// //               <div className="d-flex align-items-center gap-3">
// //                 <div
// //                   className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
// //                   style={{ width: "60px", height: "60px" }}>
// //                   <User size={30} className="text-secondary" />
// //                 </div>
// //                 <div>
// //                   <small className="text-muted d-block">Added By</small>
// //                   <h5 className="fw-800 m-0 text-navy">MyUma</h5>

// //                 </div>
// //               </div>
// //               <hr className="my-3 opacity-50" />
// //               <p className="text-center small mb-0">
// //                 Please{" "}
// //                 <span
// //                   className="text-danger fw-bold cursor-pointer"
// //                   onClick={() => navigate("/login")}>
// //                   sign in
// //                 </span>{" "}
// //                 to see contact details.
// //               </p>
// //             </div>
// //             {/* FULLY DYNAMIC SOCIAL PROFILES - ONLY SHOWS IF DATA EXISTS */}
// //             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
// //               <h6
// //                 className="fw-800 mb-3 text-navy ls-1 text-uppercase"
// //                 style={{ fontSize: "12px" }}>
// //                 Connect with Business
// //               </h6>
// //               <div className="d-flex flex-wrap gap-2 justify-content-center">
// //                 {listing.facebook && (
// //                   <a
// //                     href={listing.facebook}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="btn btn-outline-facebook btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
// //                     <FaFacebook /> <span className="fw-bold">Facebook</span>
// //                   </a>
// //                 )}
// //                 {listing.twitter && (
// //                   <a
// //                     href={listing.twitter}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="btn btn-outline-dark btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
// //                     <FaSquareXTwitter />{" "}
// //                     <span className="fw-bold">Twitter</span>
// //                   </a>
// //                 )}
// //                 {listing.linkedin && (
// //                   <a
// //                     href={listing.linkedin}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="btn btn-outline-linkedin btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
// //                     <FaLinkedin /> <span className="fw-bold">LinkedIn</span>
// //                   </a>
// //                 )}
// //                 {listing.instagram && (
// //                   <a
// //                     href={listing.instagram}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="btn btn-outline-instagram btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
// //                     <FaInstagram /> <span className="fw-bold">Instagram</span>
// //                   </a>
// //                 )}
// //                 {listing.youtube && (
// //                   <a
// //                     href={listing.youtube}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="btn btn-outline-danger btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
// //                     <FaYoutube /> <span className="fw-bold">YouTube</span>
// //                   </a>
// //                 )}
// //                 {listing.whatsappNo && (
// //                   <a
// //                     href={`https://wa.me/${listing.whatsappNo.replace(/\D/g, "")}`}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="btn btn-outline-success btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
// //                     <FaWhatsapp /> <span className="fw-bold">WhatsApp</span>
// //                   </a>
// //                 )}
// //               </div>
// //             </div>

// //             {/* OPENING HOURS */}
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
// import {
//   MapPin,
//   Heart,
//   Clock,
//   Star,
//   User,
//   Share2,
//   Layers,
//   Phone,
// } from "lucide-react";
// import { toast } from "react-toastify";

// // Swiper for Carousel
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaYoutube,
//   FaWhatsapp,
//   FaSquareXTwitter,
// } from "react-icons/fa6";

// import {
//   getAllListingsApi,
//   getImgURL,
//   getFavoritesByUserAPI,
//   addFavoriteAPI,
//   deleteFavoriteAPI,
//   getRatingsAPI,
// } from "../services/authService";
// import { getUser } from "../utils/storage";
// import BusinessDetailsUI from "./BusinessDetailsUI";

// const BrowseDetails = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { isAuthenticated, user: reduxUser } = useSelector(
//     (state) => state.auth,
//   );
//   const [listing, setListing] = useState(null);
//   const [nearby, setNearby] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [listingRatings, setListingRatings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const currentUser = reduxUser || getUser();
//   const isLoggedIn = isAuthenticated || !!localStorage.getItem("token");

//   const slugify = (text) =>
//     text
//       ? text
//           .toLowerCase()
//           .trim()
//           .replace(/[^\w\s-]/g, "")
//           .replace(/[\s_-]+/g, "-")
//           .replace(/^-+|-+$/g, "")
//       : "";

//   const fetchData = useCallback(async () => {
//     try {
//       const res = await getAllListingsApi();
//       const all = res?.listings || [];
//       const found = all.find((i) => slugify(i.title) === slug);

//       if (found) {
//         setListing(found);
//         setNearby(
//           all.filter(
//             (i) =>
//               i.categoryId?._id === found.categoryId?._id &&
//               i._id !== found._id,
//           ),
//         );
//         const ratRes = await getRatingsAPI();
//         if (ratRes.status && ratRes.data) {
//           const filtered = ratRes.data.filter((r) => r.itemId === found._id);
//           setListingRatings(filtered);
//         }
//       }

//       if (isLoggedIn && currentUser) {
//         const userId = currentUser._id || currentUser.id;
//         const favRes = await getFavoritesByUserAPI(userId);
//         if (favRes.success) setFavorites(favRes.data);
//       }
//     } catch (e) {
//       console.error("Fetch Error:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, [slug, isLoggedIn, currentUser]);

//   useEffect(() => {
//     fetchData();
//     window.scrollTo(0, 0);
//   }, [fetchData]);

//   const handleBookmark = async (e, item) => {
//     e.stopPropagation();
//     if (!isLoggedIn) {
//       toast.info("Please login to bookmark items...");
//       navigate("/login");
//       return;
//     }
//     const existingFav = favorites.find(
//       (fav) =>
//         (typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId) ===
//         item._id,
//     );
//     try {
//       if (existingFav) {
//         await deleteFavoriteAPI(existingFav._id);
//         setFavorites(favorites.filter((f) => f._id !== existingFav._id));
//         toast.info("Removed from bookmarks");
//       } else {
//         const res = await addFavoriteAPI({
//           userId: currentUser._id || currentUser.id,
//           itemId: item._id,
//         });
//         if (res.success) {
//           setFavorites([...favorites, res.data]);
//           toast.success("Added to bookmarks");
//         }
//       }
//     } catch (error) {
//       toast.error("Bookmark action failed");
//     }
//   };

//   if (loading || !listing)
//     return (
//       <div className="vh-100 d-flex align-items-center justify-content-center fw-bold text-navy">
//         Loading...
//       </div>
//     );

//   const isAlreadyFavorited = favorites.some(
//     (f) =>
//       (typeof f.itemId === "object" ? f.itemId._id : f.itemId) === listing._id,
//   );

//   return (
//     <div className="bg-light min-vh-100 mt-5 pt-lg-5 pt-4 pb-5">
//       {/* HEADER SECTION */}
//       <div className="bg-white border-bottom py-4 shadow-sm">
//         <div className="container">
//           <div className="row align-items-center g-3">
//             <div className="col-12 col-md-8">
//               <h1 className="fw-800 h2 mb-2 text-navy">{listing.title}</h1>
//               <div className="d-flex align-items-start gap-2">
//                 <MapPin size={18} className="text-danger mt-1 flex-shrink-0" />
//                 <p
//                   className="text-muted m-0 lh-sm"
//                   style={{ fontSize: "14px" }}>
//                   {listing.address}
//                 </p>
//               </div>
//             </div>
//             <div className="col-12 col-md-4 text-md-end">
//               <button
//                 onClick={(e) => handleBookmark(e, listing)}
//                 className="btn bg-white border rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm">
//                 <Heart
//                   size={18}
//                   color="#ff4d4d"
//                   fill={isAlreadyFavorited ? "#ff4d4d" : "none"}
//                 />
//                 <span className="fw-bold small">
//                   {isLoggedIn
//                     ? isAlreadyFavorited
//                       ? "Bookmarked"
//                       : "Bookmark Listing"
//                     : "Login To Bookmark"}
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mt-4">
//         <div className="row g-4">
//           <div className="col-lg-8 col-12">
//             {/* CAROUSEL */}
//             <div className="rounded-4 overflow-hidden mb-4 shadow-sm border bg-white">
//               <div
//                 className="ratio ratio-16x9 ratio-md-4x3"
//                 style={{ maxHeight: "450px" }}>
//                 <Swiper
//                   modules={[Pagination, Autoplay]}
//                   pagination={{ clickable: true }}
//                   autoplay={{ delay: 3500 }}
//                   loop={listing.images?.length > 1}
//                   className="w-100 h-100">
//                   {listing.images?.map((img, index) => (
//                     <SwiperSlide key={index}>
//                       <img
//                         src={getImgURL(img)}
//                         className="w-100 h-100 object-fit-cover"
//                         alt={listing.title}
//                       />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </div>
//             </div>

//             {/* MAIN CONTENT (Includes Video & Description logic inside) */}
//             <BusinessDetailsUI
//               listing={listing}
//               nearby={nearby}
//               navigate={navigate}
//               slugify={slugify}
//               getImgURL={getImgURL}
//               listingRatings={listingRatings}
//               refreshData={fetchData}
//             />
//           </div>

//           <div className="col-lg-4 col-12">
//             {/* CATEGORY & PRICE */}
//             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
//               <div className="d-flex justify-content-between align-items-start mb-3">
//                 <div>
//                   <small className="text-muted d-block mb-1">Category</small>
//                   <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-3 fw-800">
//                     {listing.categoryId?.name}
//                   </span>
//                 </div>
//                 <div className="text-end">
//                   <small className="text-muted d-block mb-1">Price Range</small>
//                   <h4 className="fw-800 m-0 text-navy">
//                     ${listing.items?.[0]?.price || 0}
//                   </h4>
//                 </div>
//               </div>
//               {listing.subCategoryId && (
//                 <div className="pt-2 border-top">
//                   <small className="text-muted d-block mb-1">Subcategory</small>
//                   <div className="d-flex align-items-center gap-2 text-navy fw-bold small">
//                     <Layers size={14} /> {listing.subCategoryId.subcategoryName}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* OPENING HOURS */}
//             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
//               <h6 className="fw-800 mb-3 d-flex align-items-center gap-2 text-navy">
//                 <Clock size={18} className="text-warning" /> OPENING HOURS
//               </h6>
//               <div className="small text-muted">
//                 {[
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "Saturday",
//                 ].map((day) => (
//                   <div
//                     key={day}
//                     className="d-flex justify-content-between py-2 border-bottom border-light">
//                     <span>{day}</span>
//                     <span className="fw-bold text-dark">
//                       08:00 AM - 06:00 PM
//                     </span>
//                   </div>
//                 ))}
//                 <div className="d-flex justify-content-between py-2 text-danger fw-bold">
//                   <span>Sunday</span> <span>Closed</span>
//                 </div>
//               </div>
//             </div>

//             {/* CONTACT CARD */}
//             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
//                   style={{ width: "60px", height: "60px" }}>
//                   <User size={30} className="text-secondary" />
//                 </div>
//                 <div>
//                   <small className="text-muted d-block">Added By</small>
//                   <h5 className="fw-800 m-0 text-navy">MyUma</h5>
//                 </div>
//               </div>
//               <hr className="my-3 opacity-50" />

//               {isLoggedIn ? (
//                 <div className="text-center py-2">
//                   <p className="text-muted small mb-1 uppercase fw-bold">
//                     Contact Details
//                   </p>
//                   <a
//                     href={`tel:${listing.phone}`}
//                     className="text-danger fw-800 text-decoration-none h5 d-flex align-items-center justify-content-center gap-2">
//                     <Phone size={18} /> {listing.phone || "No Phone Provided"}
//                   </a>
//                 </div>
//               ) : (
//                 <p className="text-center small mb-0">
//                   Please{" "}
//                   <span
//                     className="text-danger fw-bold cursor-pointer"
//                     onClick={() => navigate("/login")}>
//                     sign in
//                   </span>{" "}
//                   to see contact details.
//                 </p>
//               )}
//             </div>

//             {/* SOCIAL PROFILES */}
//             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
//               <h6
//                 className="fw-800 mb-3 text-navy ls-1 text-uppercase"
//                 style={{ fontSize: "12px" }}>
//                 Connect with Business
//               </h6>
//               <div className="d-flex flex-wrap gap-2 justify-content-center">
//                 {listing.facebook && (
//                   <a
//                     href={listing.facebook}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="btn btn-outline-facebook btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
//                     <FaFacebook /> <span className="fw-bold">Facebook</span>
//                   </a>
//                 )}
//                 {listing.twitter && (
//                   <a
//                     href={listing.twitter}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="btn btn-outline-dark btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
//                     <FaSquareXTwitter />{" "}
//                     <span className="fw-bold">Twitter</span>
//                   </a>
//                 )}
//                 {listing.linkedin && (
//                   <a
//                     href={listing.linkedin}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="btn btn-outline-linkedin btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
//                     <FaLinkedin /> <span className="fw-bold">LinkedIn</span>
//                   </a>
//                 )}
//                 {listing.instagram && (
//                   <a
//                     href={listing.instagram}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="btn btn-outline-instagram btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
//                     <FaInstagram /> <span className="fw-bold">Instagram</span>
//                   </a>
//                 )}
//                 {listing.youtube && (
//                   <a
//                     href={listing.youtube}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="btn btn-outline-danger btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
//                     <FaYoutube /> <span className="fw-bold">YouTube</span>
//                   </a>
//                 )}
//                 {listing.whatsappNo && (
//                   <a
//                     href={`https://wa.me/${listing.whatsappNo.replace(/\D/g, "")}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="btn btn-outline-success btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
//                     <FaWhatsapp /> <span className="fw-bold">WhatsApp</span>
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrowseDetails;
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin,
  Heart,
  Clock,
  User,
  Layers,
  Phone,
  MessageCircle,
  Send,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

// Swiper for Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaSquareXTwitter,
} from "react-icons/fa6";

import {
  getAllListingsApi,
  getImgURL,
  getFavoritesByUserAPI,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getRatingsAPI,
  getChatHistoryAPI,
  sendMessageAPI,
} from "../services/authService";
import { getUser } from "../utils/storage";
import BusinessDetailsUI from "./BusinessDetailsUI";

const BrowseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const { isAuthenticated, user: reduxUser } = useSelector(
    (state) => state.auth,
  );
  const [listing, setListing] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listingRatings, setListingRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chat States
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const currentUser = reduxUser || getUser();
  const isLoggedIn = isAuthenticated || !!localStorage.getItem("token");

  const slugify = (text) =>
    text
      ? text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";

  const fetchData = useCallback(async () => {
    try {
      const res = await getAllListingsApi();
      const all = res?.listings || [];
      const found = all.find((i) => slugify(i.title) === slug);

      if (found) {
        setListing(found);
        setNearby(
          all.filter(
            (i) =>
              i.categoryId?._id === found.categoryId?._id &&
              i._id !== found._id,
          ),
        );
        const ratRes = await getRatingsAPI();
        if (ratRes.status && ratRes.data) {
          const filtered = ratRes.data.filter((r) => r.itemId === found._id);
          setListingRatings(filtered);
        }
      }

      if (isLoggedIn && currentUser) {
        const userId = currentUser._id || currentUser.id;
        const favRes = await getFavoritesByUserAPI(userId);
        if (favRes.success) setFavorites(favRes.data);
      }
    } catch (e) {
      console.error("Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  }, [slug, isLoggedIn, currentUser]);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [fetchData]);

  // --- Chat Logic ---
  const fetchChatHistory = async () => {
    if (!isLoggedIn || !listing?.ownerId?._id) return;
    try {
      const res = await getChatHistoryAPI(
        currentUser._id || currentUser.id,
        listing.ownerId._id,
      );
      if (res.success) setChatMessages(res.data);
    } catch (err) {
      console.error("Chat history error", err);
    }
  };

  useEffect(() => {
    if (showChat) {
      fetchChatHistory();
      const interval = setInterval(fetchChatHistory, 5000); // Poll for new messages
      return () => clearInterval(interval);
    }
  }, [showChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      const payload = {
        senderId: currentUser._id || currentUser.id,
        receiverId: listing.ownerId._id,
        message: newMessage,
      };
      const res = await sendMessageAPI(payload);
      if (res.success) {
        setNewMessage("");
        fetchChatHistory();
      }
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleBookmark = async (e, item) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.info("Please login to bookmark items...");
      navigate("/login");
      return;
    }
    const existingFav = favorites.find(
      (fav) =>
        (typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId) ===
        item._id,
    );
    try {
      if (existingFav) {
        await deleteFavoriteAPI(existingFav._id);
        setFavorites(favorites.filter((f) => f._id !== existingFav._id));
        toast.info("Removed from bookmarks");
      } else {
        const res = await addFavoriteAPI({
          userId: currentUser._id || currentUser.id,
          itemId: item._id,
        });
        if (res.success) {
          setFavorites([...favorites, res.data]);
          toast.success("Added to bookmarks");
        }
      }
    } catch (error) {
      toast.error("Bookmark action failed");
    }
  };

  if (loading || !listing)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center fw-bold text-navy">
        Loading...
      </div>
    );

  const isAlreadyFavorited = favorites.some(
    (f) =>
      (typeof f.itemId === "object" ? f.itemId._id : f.itemId) === listing._id,
  );

  return (
    <div className="bg-light min-vh-100 mt-5 pt-lg-5 pt-4 pb-5">
      {/* HEADER SECTION */}
      <div className="bg-white border-bottom py-4 shadow-sm">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-8">
              <h1 className="fw-800 h2 mb-2 text-navy">{listing.title}</h1>
              <div className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-danger mt-1 flex-shrink-0" />
                <p
                  className="text-muted m-0 lh-sm"
                  style={{ fontSize: "14px" }}>
                  {listing.address}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 text-md-end">
              <button
                onClick={(e) => handleBookmark(e, listing)}
                className="btn bg-white border rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm">
                <Heart
                  size={18}
                  color="#ff4d4d"
                  fill={isAlreadyFavorited ? "#ff4d4d" : "none"}
                />
                <span className="fw-bold small">
                  {isLoggedIn
                    ? isAlreadyFavorited
                      ? "Bookmarked"
                      : "Bookmark Listing"
                    : "Login To Bookmark"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-lg-8 col-12">
            <div className="rounded-4 overflow-hidden mb-4 shadow-sm border bg-white">
              <div
                className="ratio ratio-16x9 ratio-md-4x3"
                style={{ maxHeight: "450px" }}>
                <Swiper
                  modules={[Pagination, Autoplay]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3500 }}
                  loop={listing.images?.length > 1}
                  className="w-100 h-100">
                  {listing.images?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={getImgURL(img)}
                        className="w-100 h-100 object-fit-cover"
                        alt={listing.title}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <BusinessDetailsUI
              listing={listing}
              nearby={nearby}
              navigate={navigate}
              slugify={slugify}
              getImgURL={getImgURL}
              listingRatings={listingRatings}
              refreshData={fetchData}
            />
          </div>

          <div className="col-lg-4 col-12">
            {/* DYNAMIC CATEGORY & PRICE */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <small className="text-muted d-block mb-1">Category</small>
                  <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-3 fw-800">
                    {listing.categoryId?.name}
                  </span>
                </div>
                <div className="text-end">
                  <small className="text-muted d-block mb-1">Price Range</small>
                  <h4 className="fw-800 m-0 text-navy">
                    ${listing.items?.[0]?.price || 0}
                  </h4>
                </div>
              </div>

              {listing.subCategoryId && (
                <div className="pt-2 border-top d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted d-block mb-1">
                      Subcategory
                    </small>
                    <div className="d-flex align-items-center gap-2 text-navy fw-bold small">
                      <Layers size={14} />{" "}
                      {listing.subCategoryId.subcategoryName}
                    </div>
                  </div>

                  {/* CHAT ICON NEXT TO SUBCATEGORY */}
                  {isLoggedIn && currentUser._id !== listing.ownerId?._id && (
                    <button
                      onClick={() => setShowChat(true)}
                      className="btn btn-sm btn-outline-primary rounded-circle p-2 shadow-sm"
                      title="Chat with Owner"> chat
                      <MessageCircle size={20} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* OPENING HOURS */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <h6 className="fw-800 mb-3 d-flex align-items-center gap-2 text-navy">
                <Clock size={18} className="text-warning" /> OPENING HOURS
              </h6>
              <div className="small text-muted">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div
                    key={day}
                    className="d-flex justify-content-between py-2 border-bottom border-light">
                    <span>{day}</span>{" "}
                    <span className="fw-bold text-dark">
                      08:00 AM - 06:00 PM
                    </span>
                  </div>
                ))}
                <div className="d-flex justify-content-between py-2 text-danger fw-bold">
                  <span>Sunday</span> <span>Closed</span>
                </div>
              </div>
            </div>

            {/* OWNER INFO */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border text-center">
              <div className="d-flex align-items-center gap-3 justify-content-center">
                <div
                  className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: "60px", height: "60px" }}>
                  <User size={30} className="text-secondary" />
                </div>
                <div className="text-start">
                  <small className="text-muted d-block">Added By</small>
                  <h5 className="fw-800 m-0 text-navy">
                    {listing.ownerId?.fullName || "MyUma"}
                  </h5>
                </div>
              </div>
              <hr className="my-3 opacity-50" />
              {isLoggedIn ? (
                <div className="py-2">
                  <p className="text-muted small mb-1 uppercase fw-bold">
                    Contact Details
                  </p>
                  <a
                    href={`tel:${listing.phone}`}
                    className="text-danger fw-800 text-decoration-none h5 d-flex align-items-center justify-content-center gap-2">
                    <Phone size={18} /> {listing.phone}
                  </a>
                </div>
              ) : (
                <p className="small mb-0">
                  Please{" "}
                  <span
                    className="text-danger fw-bold cursor-pointer"
                    onClick={() => navigate("/login")}>
                    sign in
                  </span>{" "}
                  to see contact details.
                </p>
              )}
            </div>

            {/* SOCIALS */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border">
              <h6
                className="fw-800 mb-3 text-navy ls-1 text-uppercase text-center"
                style={{ fontSize: "12px" }}>
                Connect with Business
              </h6>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {listing.facebook && (
                  <a
                    href={listing.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-facebook btn-sm rounded-pill px-3">
                    <FaFacebook className="me-1" /> Facebook
                  </a>
                )}
                {listing.instagram && (
                  <a
                    href={listing.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-instagram btn-sm rounded-pill px-3">
                    <FaInstagram className="me-1" /> Instagram
                  </a>
                )}
                {listing.whatsappNo && (
                  <a
                    href={`https://wa.me/${listing.whatsappNo.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-success btn-sm rounded-pill px-3">
                    <FaWhatsapp className="me-1" /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT POPUP MODAL */}
      {showChat && (
        <div
          className="position-fixed bottom-0 end-0 m-4 shadow-lg border-0 rounded-4 overflow-hidden bg-white"
          style={{
            width: "350px",
            zIndex: 10000,
            height: "450px",
            display: "flex",
            flexDirection: "column",
          }}>
          <div
            className="p-3 d-flex justify-content-between align-items-center text-white"
            style={{ backgroundColor: "var(--navy)" }}>
            <div className="d-flex align-items-center gap-2">
              <div
                className="bg-white rounded-circle text-navy d-flex align-items-center justify-content-center"
                style={{ width: "30px", height: "30px" }}>
                <User size={16} />
              </div>
              <span className="fw-bold small">{listing.ownerId?.fullName}</span>
            </div>
            <X
              size={20}
              className="cursor-pointer"
              onClick={() => setShowChat(false)}
            />
          </div>

          <div
            className="flex-grow-1 p-3 overflow-auto bg-light"
            style={{ fontSize: "13px" }}>
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 d-flex ${msg.senderId === (currentUser._id || currentUser.id) ? "justify-content-end" : "justify-content-start"}`}>
                <div
                  className={`p-2 rounded-3 shadow-sm ${msg.senderId === (currentUser._id || currentUser.id) ? "bg-primary text-white" : "bg-white text-dark"}`}
                  style={{ maxWidth: "80%" }}>
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-3 border-top bg-white d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-sm rounded-pill shadow-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={isSending}
              className="btn btn-primary rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm">
              {isSending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BrowseDetails;