// // import React, { useState, useEffect, useCallback } from "react";
// // import { useNavigate, useParams, Link } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import {
// //   MapPin,
// //   Layers,
// //   Clock,
// //   LogIn,
// //   CalendarCheck,
// //   Heart,
// //   MessageCircle,
// //   ClipboardPen,
// //   Loader2,
// //   Globe,
// //   Phone,
// // } from "lucide-react";
// // import { toast } from "react-toastify";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Autoplay, Thumbs, FreeMode } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/free-mode";
// // import "swiper/css/thumbs";
// // import {
// //   FaFacebook,
// //   FaInstagram,
// //   FaWhatsapp,
// //   FaLinkedin,
// //   FaYoutube,
// //   FaTwitter,
// // } from "react-icons/fa6";

// // import {
// //   getAllListingsApi,
// //   getImgURL,
// //   getRatingsAPI,
// //   createBookingAPI,
// //   getFavoritesByUserAPI,
// //   getBookingByUserAPI,
// //   addFavoriteAPI, // Added this import
// //   deleteFavoriteAPI, // Added this import
// // } from "../services/authService";
// // import { getUser } from "../utils/storage";
// // import BusinessDetailsUI from "./BusinessDetailsUI";
// // import InquiryModal from "./InquiryModal";
// // import ChatPopup from "./ChatPopup";

// // const BrowseDetails = () => {
// //   const { slug } = useParams();
// //   const navigate = useNavigate();
// //   const [thumbsSwiper, setThumbsSwiper] = useState(null);
// //   const { isAuthenticated, user: reduxUser } = useSelector(
// //     (state) => state.auth,
// //   );
// //   const currentUser = reduxUser || getUser();
// //   const currentId = currentUser?._id || currentUser?.id;
// //   const isLoggedIn = isAuthenticated || !!localStorage.getItem("token");

// //   const [listing, setListing] = useState(null);
// //   const [nearby, setNearby] = useState([]);
// //   const [listingRatings, setListingRatings] = useState([]);
// //   const [userBookings, setUserBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [bookLoading, setBookLoading] = useState(false);

// //   const [showInquire, setShowInquire] = useState(false);
// //   const [showChat, setShowChat] = useState(false);

// //   const fetchData = useCallback(async () => {
// //     try {
// //       const res = await getAllListingsApi();
// //       const slugify = (t) =>
// //         t
// //           ? t
// //               .toLowerCase()
// //               .trim()
// //               .replace(/[^\w\s-]/g, "")
// //               .replace(/[\s_-]+/g, "-")
// //               .replace(/^-+|-+$/g, "")
// //           : "";
// //       const found = res?.listings?.find((i) => slugify(i.title) === slug);
// //       if (found) {
// //         setListing(found);
// //         setNearby(
// //           res.listings.filter(
// //             (i) =>
// //               i.categoryId?._id === found.categoryId?._id &&
// //               i._id !== found._id,
// //           ),
// //         );
// //         const ratRes = await getRatingsAPI();
// //         if (ratRes.status)
// //           setListingRatings(ratRes.data.filter((r) => r.itemId === found._id));
// //         if (isLoggedIn) {
// //           const bRes = await getBookingByUserAPI(currentId);
// //           if (bRes.status) setUserBookings(bRes.bookings);
// //         }
// //       }
// //     } catch (e) {
// //       console.error(e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [slug, isLoggedIn, currentId]);

// //   useEffect(() => {
// //     fetchData();
// //     window.scrollTo(0, 0);
// //   }, [fetchData]);

// //   const isOwner = isLoggedIn && currentId === listing?.ownerId?._id;
// //   const isBooked = userBookings.some((b) => b.itemId?._id === listing?._id);

// //   const handleBook = async () => {
// //     if (!isLoggedIn) return navigate("/login");
// //     if (isBooked) return toast.info("Already booked");
// //     setBookLoading(true);
// //     try {
// //       const res = await createBookingAPI({
// //         userId: currentId,
// //         itemId: listing._id,
// //       });
// //       if (res.status) {
// //         toast.success("Booked Successfully!");
// //         fetchData();
// //       }
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Error");
// //     } finally {
// //       setBookLoading(false);
// //     }
// //   };

// //   if (loading || !listing)
// //     return (
// //       <div className="vh-100 d-flex align-items-center justify-content-center text-navy fw-bold">
// //         LOADING...
// //       </div>
// //     );

// //   return (
// //     <div className="bg-light min-vh-100 pt-5 pb-5">
// //       {/* HEADER */}
// //       <div className="bg-white border-bottom py-4 shadow-sm mt-4">
// //         <div className="container">
// //           <div className="row align-items-center g-3">
// //             <div className="col-md-8 text-start">
// //               <h1 className="fw-800 h2 mb-2 text-navy">{listing.title}</h1>
// //               <div className="d-flex align-items-start gap-2">
// //                 <MapPin size={18} className="text-danger mt-1" />
// //                 <p className="text-muted m-0 small">{listing.address}</p>
// //               </div>
// //             </div>
// //             <div className="col-md-4 text-md-end">
// //               {!isLoggedIn ? (
// //                 <Link
// //                   to="/login"
// //                   className="btn btn-outline-danger rounded-pill px-4 fw-bold shadow-sm">
// //                   <LogIn size={18} className="me-2" /> Login to Book Now
// //                 </Link>
// //               ) : (
// //                 !isOwner && (
// //                   <button
// //                     onClick={handleBook}
// //                     disabled={bookLoading || isBooked}
// //                     className={`btn rounded-pill px-4 fw-bold shadow-sm ${isBooked ? "btn-secondary" : "btn-danger"}`}>
// //                     {bookLoading ? (
// //                       <Loader2 size={18} className="animate-spin" />
// //                     ) : (
// //                       <CalendarCheck size={18} className="me-2" />
// //                     )}
// //                     {isBooked ? "Already Booked" : "Book Now"}
// //                   </button>
// //                 )
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container mt-4">
// //         <div className="row g-4">
// //           <div className="col-lg-8">
// //             {/* GALLERY BOXES */}
// //             <div className="mb-4">
// //               <div className="rounded-4 overflow-hidden border bg-white shadow-sm mb-2">
// //                 <Swiper
// //                   modules={[Thumbs, Autoplay]}
// //                   autoplay={{ delay: 3500 }}
// //                   thumbs={{ swiper: thumbsSwiper }}
// //                   className="ratio ratio-16x9">
// //                   {listing.images?.map((img, i) => (
// //                     <SwiperSlide key={i}>
// //                       <img
// //                         src={getImgURL(img)}
// //                         className="w-100 h-100 object-fit-cover"
// //                         alt=""
// //                       />
// //                     </SwiperSlide>
// //                   ))}
// //                 </Swiper>
// //               </div>
// //               <Swiper
// //                 onSwiper={setThumbsSwiper}
// //                 spaceBetween={10}
// //                 slidesPerView={5}
// //                 freeMode={true}
// //                 watchSlidesProgress={true}
// //                 modules={[FreeMode, Thumbs]}
// //                 className="thumbs-swiper">
// //                 {listing.images?.map((img, i) => (
// //                   <SwiperSlide key={i} className="cursor-pointer">
// //                     <div
// //                       className="rounded-3 overflow-hidden border bg-white shadow-sm"
// //                       style={{ height: "75px" }}>
// //                       <img
// //                         src={getImgURL(img)}
// //                         className="w-100 h-100 object-fit-cover"
// //                         alt=""
// //                       />
// //                     </div>
// //                   </SwiperSlide>
// //                 ))}
// //               </Swiper>
// //             </div>
// //             <BusinessDetailsUI
// //               listing={listing}
// //               nearby={nearby}
// //               navigate={navigate}
// //               getImgURL={getImgURL}
// //               listingRatings={listingRatings}
// //               refreshData={fetchData}
// //               isOwner={isOwner}
// //               favorites={favorites} // Make sure this is passed
// //               handleBookmark={handleBookmark} // Make sure this is passed
// //             />
// //           </div>

// //           <div className="col-lg-4">
// //             {/* PRICE & SUB-CATEGORY */}
// //             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
// //               <div className="d-flex justify-content-between mb-3 text-start">
// //                 <div>
// //                   <small className="text-muted d-block">Category</small>
// //                   <span className="badge bg-danger-subtle text-danger">
// //                     {listing.categoryId?.name}
// //                   </span>
// //                 </div>
// //                 <div className="text-end">
// //                   <small className="text-muted d-block">Price</small>
// //                   <h4 className="fw-800 text-navy">
// //                     ₹{listing.items?.[0]?.price || 0}
// //                   </h4>
// //                 </div>
// //               </div>
// //               <div className="pt-3 border-top d-flex justify-content-between align-items-center">
// //                 <div className="d-flex align-items-center gap-2">
// //                   <Layers size={18} className="text-primary" />
// //                   <span className="fw-bold text-navy">
// //                     {listing.subCategoryId?.subcategoryName || "General"}
// //                   </span>
// //                 </div>
// //                 <button
// //                   onClick={() =>
// //                     isLoggedIn ? setShowChat(true) : navigate("/login")
// //                   }
// //                   className="btn btn-primary rounded-circle shadow"
// //                   style={{ width: 42, height: 42, backgroundColor: "#001f3f" }}>
// //                   <MessageCircle size={20} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* OPENING HOURS */}
// //             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border text-start">
// //               <h6 className="fw-800 mb-3 text-navy d-flex align-items-center">
// //                 <Clock size={18} className="text-warning me-2" /> BUSINESS HOURS
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
// //                     <span>{day}</span>
// //                     <span className="fw-bold text-dark">
// //                       09:00 AM - 06:00 PM
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* DYNAMIC CONNECT SECTION */}
// //             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border text-start">
// //               <h6 className="fw-800 mb-3 text-navy text-uppercase">
// //                 Connect with Business
// //               </h6>
// //               <div className="d-flex flex-wrap gap-2">
// //                 {listing.facebook && (
// //                   <a
// //                     href={listing.facebook}
// //                     target="_blank"
// //                     className="btn btn-outline-primary rounded-circle p-2">
// //                     <FaFacebook size={18} />
// //                   </a>
// //                 )}
// //                 {listing.instagram && (
// //                   <a
// //                     href={listing.instagram}
// //                     target="_blank"
// //                     className="btn btn-outline-danger rounded-circle p-2">
// //                     <FaInstagram size={18} />
// //                   </a>
// //                 )}
// //                 {listing.whatsappNo && (
// //                   <a
// //                     href={`https://wa.me/${listing.whatsappNo.replace(/\+/g, "")}`}
// //                     target="_blank"
// //                     className="btn btn-outline-success rounded-circle p-2">
// //                     <FaWhatsapp size={18} />
// //                   </a>
// //                 )}
// //                 {listing.twitter && (
// //                   <a
// //                     href={listing.twitter}
// //                     target="_blank"
// //                     className="btn btn-outline-dark rounded-circle p-2">
// //                     <FaTwitter size={18} />
// //                   </a>
// //                 )}
// //                 {listing.linkedin && (
// //                   <a
// //                     href={listing.linkedin}
// //                     target="_blank"
// //                     className="btn btn-outline-primary rounded-circle p-2">
// //                     <FaLinkedin size={18} />
// //                   </a>
// //                 )}
// //                 {listing.youtube && (
// //                   <a
// //                     href={listing.youtube}
// //                     target="_blank"
// //                     className="btn btn-outline-danger rounded-circle p-2">
// //                     <FaYoutube size={18} />
// //                   </a>
// //                 )}
// //               </div>
// //             </div>

// //             {/* OWNER INFO */}
// //             <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white border">
// //               <img
// //                 src={getImgURL(listing.ownerId?.profileImage)}
// //                 className="rounded-circle mx-auto mb-2 border"
// //                 style={{ width: 75, height: 75, objectFit: "cover" }}
// //                 alt=""
// //               />
// //               <h5 className="fw-800 text-navy mb-1">
// //                 {listing.ownerId?.fullName}
// //               </h5>
// //               {!isOwner && (
// //                 <button
// //                   onClick={() =>
// //                     isLoggedIn ? setShowInquire(true) : navigate("/login")
// //                   }
// //                   className="btn w-100 rounded-pill fw-bold text-white py-2 shadow-sm mt-3"
// //                   style={{ backgroundColor: "#001f3f" }}>
// //                   <ClipboardPen size={18} className="me-2" /> INQUIRE NOW
// //                 </button>
// //               )}
// //               <hr />
// //               <a
// //                 href={`tel:${listing.phone}`}
// //                 className="text-danger fw-800 text-decoration-none d-flex align-items-center justify-content-center gap-2 h5">
// //                 <Phone size={18} /> {listing.phone}
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* POPUP COMPONENTS */}
// //       <InquiryModal
// //         show={showInquire}
// //         onClose={() => setShowInquire(false)}
// //         listingId={listing._id}
// //       />
// //       <ChatPopup
// //         show={showChat}
// //         onClose={() => setShowChat(false)}
// //         listing={listing}
// //         isOwner={isOwner}
// //         currentId={currentId}
// //       />

// //       <style>{`.thumbs-swiper .swiper-slide-thumb-active .border { border: 2px solid #ff4d4d !important; } .cursor-pointer { cursor: pointer; } .animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
// //     </div>
// //   );
// // };

// // export default BrowseDetails;
// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   MapPin,
//   Layers,
//   Clock,
//   LogIn,
//   CalendarCheck,
//   Heart,
//   MessageCircle,
//   ClipboardPen,
//   Loader2,
//   Globe,
//   Phone,
// } from "lucide-react";
// import { toast } from "react-toastify";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Thumbs, FreeMode } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/thumbs";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaWhatsapp,
//   FaLinkedin,
//   FaYoutube,
//   FaTwitter,
// } from "react-icons/fa6";

// import {
//   getAllListingsApi,
//   getImgURL,
//   getRatingsAPI,
//   createBookingAPI,
//   getFavoritesByUserAPI,
//   addFavoriteAPI, // Added this import
//   deleteFavoriteAPI, // Added this import
//   getBookingByUserAPI,
// } from "../services/authService";
// import { getUser } from "../utils/storage";
// import BusinessDetailsUI from "./BusinessDetailsUI";
// import InquiryModal from "./InquiryModal";
// import ChatPopup from "./ChatPopup";

// const BrowseDetails = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const { isAuthenticated, user: reduxUser } = useSelector(
//     (state) => state.auth,
//   );
//   const currentUser = reduxUser || getUser();
//   const currentId = currentUser?._id || currentUser?.id;
//   const isLoggedIn = isAuthenticated || !!localStorage.getItem("token");

//   const [listing, setListing] = useState(null);
//   const [nearby, setNearby] = useState([]);
//   const [listingRatings, setListingRatings] = useState([]);
//   const [userBookings, setUserBookings] = useState([]);
//   const [favorites, setFavorites] = useState([]); // 1. Added favorites state
//   const [loading, setLoading] = useState(true);
//   const [bookLoading, setBookLoading] = useState(false);

//   const [showInquire, setShowInquire] = useState(false);
//   const [showChat, setShowChat] = useState(false);

//   // 2. Logic to handle Add/Remove Bookmark
//   const handleBookmark = async (e, item) => {
//     e.stopPropagation();
//     if (!isLoggedIn) {
//       toast.warn("Please login to bookmark.");
//       navigate("/login");
//       return;
//     }

//     const existingFav = favorites.find((fav) => {
//       const favId =
//         typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
//       return favId?.toString() === item._id?.toString();
//     });

//     try {
//       if (existingFav) {
//         await deleteFavoriteAPI(existingFav._id);
//         setFavorites(favorites.filter((fav) => fav._id !== existingFav._id));
//         toast.info("Removed from bookmarks");
//       } else {
//         const payload = {
//           userId: currentId,
//           itemId: item._id,
//         };
//         const res = await addFavoriteAPI(payload);
//         if (res.success) {
//           setFavorites([...favorites, res.data]);
//           toast.success("Added to bookmarks");
//         }
//       }
//     } catch (error) {
//       toast.error("Favorite action failed");
//     }
//   };

//   const fetchData = useCallback(async () => {
//     try {
//       const res = await getAllListingsApi();
//       const slugify = (t) =>
//         t
//           ? t
//               .toLowerCase()
//               .trim()
//               .replace(/[^\w\s-]/g, "")
//               .replace(/[\s_-]+/g, "-")
//               .replace(/^-+|-+$/g, "")
//           : "";
//       const found = res?.listings?.find((i) => slugify(i.title) === slug);
//       if (found) {
//         setListing(found);
//         setNearby(
//           res.listings.filter(
//             (i) =>
//               i.categoryId?._id === found.categoryId?._id &&
//               i._id !== found._id,
//           ),
//         );
//         const ratRes = await getRatingsAPI();
//         if (ratRes.status)
//           setListingRatings(ratRes.data.filter((r) => r.itemId === found._id));

//         if (isLoggedIn && currentId) {
//           // Fetch User Bookings
//           const bRes = await getBookingByUserAPI(currentId);
//           if (bRes.status) setUserBookings(bRes.bookings || []);

//           // 3. Fetch User Favorites
//           const favRes = await getFavoritesByUserAPI(currentId);
//           if (favRes.success) setFavorites(favRes.data || []);
//         }
//       }
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   }, [slug, isLoggedIn, currentId]);

//   useEffect(() => {
//     fetchData();
//     window.scrollTo(0, 0);
//   }, [fetchData]);

//   const isOwner = isLoggedIn && currentId === listing?.ownerId?._id;
//   const isBooked = userBookings.some((b) => b.itemId?._id === listing?._id);

//   const handleBook = async () => {
//     if (!isLoggedIn) return navigate("/login");
//     if (isBooked) return toast.info("Already booked");
//     setBookLoading(true);
//     try {
//       const res = await createBookingAPI({
//         userId: currentId,
//         itemId: listing._id,
//       });
//       if (res.status) {
//         toast.success("Booked Successfully!");
//         fetchData();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error");
//     } finally {
//       setBookLoading(false);
//     }
//   };

//   if (loading || !listing)
//     return (
//       <div className="vh-100 d-flex align-items-center justify-content-center text-navy fw-bold">
//         LOADING...
//       </div>
//     );

//   return (
//     <div className="bg-light min-vh-100 pb-5">
//       {/* HEADER */}
//       <div className="bg-white border-bottom py-4 shadow-sm mt-4">
//         <div className="container">
//           <div className="row align-items-center g-3">
//             <div className="col-md-8 text-start">
//               <h1 className="fw-800 h2 mb-2 text-navy">{listing.title}</h1>
//               <div className="d-flex align-items-start gap-2">
//                 <MapPin size={18} className="text-danger mt-1" />
//                 <p className="text-muted m-0 small">{listing.address}</p>
//               </div>
//             </div>
//             <div className="col-md-4 text-md-end">
//               {!isLoggedIn ? (
//                 <Link
//                   to="/login"
//                   className="btn btn-outline-danger rounded-pill px-4 fw-bold shadow-sm">
//                   <LogIn size={18} className="me-2" /> Login to Book Now
//                 </Link>
//               ) : (
//                 !isOwner && (
//                   <button
//                     onClick={handleBook}
//                     disabled={bookLoading || isBooked}
//                     className={`btn rounded-pill px-4 fw-bold shadow-sm ${isBooked ? "btn-secondary" : "btn-danger"}`}>
//                     {bookLoading ? (
//                       <Loader2 size={18} className="animate-spin" />
//                     ) : (
//                       <CalendarCheck size={18} className="me-2" />
//                     )}
//                     {isBooked ? "Already Booked" : "Book Now"}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mt-4">
//         <div className="row g-4">
//           <div className="col-lg-8">
//             {/* GALLERY BOXES */}
//             <div className="mb-4">
//               <div className="rounded-4 overflow-hidden border bg-white shadow-sm mb-2">
//                 <Swiper
//                   modules={[Thumbs, Autoplay]}
//                   autoplay={{ delay: 3500 }}
//                   thumbs={{ swiper: thumbsSwiper }}
//                   className="ratio ratio-16x9">
//                   {listing.images?.map((img, i) => (
//                     <SwiperSlide key={i}>
//                       <img
//                         src={getImgURL(img)}
//                         className="w-100 h-100 object-fit-cover"
//                         alt=""
//                       />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </div>
//               <Swiper
//                 onSwiper={setThumbsSwiper}
//                 spaceBetween={10}
//                 slidesPerView={5}
//                 freeMode={true}
//                 watchSlidesProgress={true}
//                 modules={[FreeMode, Thumbs]}
//                 className="thumbs-swiper">
//                 {listing.images?.map((img, i) => (
//                   <SwiperSlide key={i} className="cursor-pointer">
//                     <div
//                       className="rounded-3 overflow-hidden border bg-white shadow-sm"
//                       style={{ height: "75px" }}>
//                       <img
//                         src={getImgURL(img)}
//                         className="w-100 h-100 object-fit-cover"
//                         alt=""
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//             {/* 4. Passing favorites and handleBookmark correctly */}
//             <BusinessDetailsUI
//               listing={listing}
//               nearby={nearby}
//               navigate={navigate}
//               getImgURL={getImgURL}
//               listingRatings={listingRatings}
//               refreshData={fetchData}
//               isOwner={isOwner}
//               favorites={favorites}
//               handleBookmark={handleBookmark}
//             />
//           </div>

//           <div className="col-lg-4">
//             {/* PRICE & SUB-CATEGORY */}
//             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
//               <div className="d-flex justify-content-between mb-3 text-start">
//                 <div>
//                   <small className="text-muted d-block">Category</small>
//                   <span className="badge bg-danger-subtle text-danger">
//                     {listing.categoryId?.name}
//                   </span>
//                 </div>
//                 <div className="text-end">
//                   <small className="text-muted d-block">Price</small>
//                   <h4 className="fw-800 text-navy">
//                     ₹{listing.items?.[0]?.price || 0}
//                   </h4>
//                 </div>
//               </div>
//               <div className="pt-3 border-top d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center gap-2">
//                   <Layers size={18} className="text-primary" />
//                   <span className="fw-bold text-navy">
//                     {listing.subCategoryId?.subcategoryName || "General"}
//                   </span>
//                 </div>
//                 {!isOwner && (
//                   <button
//                     onClick={() =>
//                       isLoggedIn ? setShowChat(true) : navigate("/login")
//                     }
//                     className="btn btn-primary rounded-circle shadow"
//                     style={{
//                       width: 42,
//                       height: 42,
//                       backgroundColor: "#001f3f",
//                     }}>
//                     <MessageCircle size={20} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* OPENING HOURS */}
//             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border text-start">
//               <h6 className="fw-800 mb-3 text-navy d-flex align-items-center">
//                 <Clock size={18} className="text-warning me-2" /> BUSINESS HOURS
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
//                       09:00 AM - 06:00 PM
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* DYNAMIC CONNECT SECTION */}
//             <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border text-start">
//               <h6 className="fw-800 mb-3 text-navy text-uppercase">
//                 Connect with Business
//               </h6>
//               <div className="d-flex flex-wrap gap-2">
//                 {listing.facebook && (
//                   <a
//                     href={listing.facebook}
//                     target="_blank"
//                     className="btn btn-outline-primary rounded-circle p-2">
//                     <FaFacebook size={18} />
//                   </a>
//                 )}
//                 {listing.instagram && (
//                   <a
//                     href={listing.instagram}
//                     target="_blank"
//                     className="btn btn-outline-danger rounded-circle p-2">
//                     <FaInstagram size={18} />
//                   </a>
//                 )}
//                 {listing.whatsappNo && (
//                   <a
//                     href={`https://wa.me/${listing.whatsappNo.replace(/\+/g, "")}`}
//                     target="_blank"
//                     className="btn btn-outline-success rounded-circle p-2">
//                     <FaWhatsapp size={18} />
//                   </a>
//                 )}
//                 {listing.twitter && (
//                   <a
//                     href={listing.twitter}
//                     target="_blank"
//                     className="btn btn-outline-dark rounded-circle p-2">
//                     <FaTwitter size={18} />
//                   </a>
//                 )}
//                 {listing.linkedin && (
//                   <a
//                     href={listing.linkedin}
//                     target="_blank"
//                     className="btn btn-outline-primary rounded-circle p-2">
//                     <FaLinkedin size={18} />
//                   </a>
//                 )}
//                 {listing.youtube && (
//                   <a
//                     href={listing.youtube}
//                     target="_blank"
//                     className="btn btn-outline-danger rounded-circle p-2">
//                     <FaYoutube size={18} />
//                   </a>
//                 )}
//               </div>
//             </div>

//             {/* OWNER INFO */}
//             <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white border">
//               <img
//                 src={getImgURL(listing.ownerId?.profileImage)}
//                 className="rounded-circle mx-auto mb-2 border"
//                 style={{ width: 75, height: 75, objectFit: "cover" }}
//                 alt=""
//               />
//               <h5 className="fw-800 text-navy mb-1">
//                 {listing.ownerId?.fullName}
//               </h5>
//               {!isOwner && (
//                 <button
//                   onClick={() =>
//                     isLoggedIn ? setShowInquire(true) : navigate("/login")
//                   }
//                   className="btn w-100 rounded-pill fw-bold text-white py-2 shadow-sm mt-3"
//                   style={{ backgroundColor: "#001f3f" }}>
//                   <ClipboardPen size={18} className="me-2" /> INQUIRE NOW
//                 </button>
//               )}
//               <hr />
//               <a
//                 href={`tel:${listing.phone || listing.phoneNo}`}
//                 className="text-danger fw-800 text-decoration-none d-flex align-items-center justify-content-center gap-2 h5">
//                 <Phone size={18} /> {listing.phone || listing.phoneNo || "N/A"}
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* POPUP COMPONENTS */}
//       <InquiryModal
//         show={showInquire}
//         onClose={() => setShowInquire(false)}
//         listingId={listing._id}
//       />
//       <ChatPopup
//         show={showChat}
//         onClose={() => setShowChat(false)}
//         listing={listing}
//         isOwner={isOwner}
//         currentId={currentId}
//       />

//       <style>{`.thumbs-swiper .swiper-slide-thumb-active .border { border: 2px solid #ff4d4d !important; } .cursor-pointer { cursor: pointer; } .animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// };

// export default BrowseDetails;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin,
  Layers,
  Clock,
  LogIn,
  CalendarCheck,
  Heart,
  MessageCircle,
  ClipboardPen,
  Loader2,
  Phone,
} from "lucide-react";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa6";

import {
  getAllListingsApi,
  getImgURL,
  getRatingsAPI,
  createBookingAPI,
  getFavoritesByUserAPI,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getBookingByUserAPI,
} from "../services/authService";
import { getUser } from "../utils/storage";
import BusinessDetailsUI from "./BusinessDetailsUI";
import InquiryModal from "./InquiryModal";
import ChatPopup from "./ChatPopup";

const BrowseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { isAuthenticated, user: reduxUser } = useSelector(
    (state) => state.auth,
  );
  const currentUser = reduxUser || getUser();
  const currentId = currentUser?._id || currentUser?.id;
  const isLoggedIn = isAuthenticated || !!localStorage.getItem("token");

  const [listing, setListing] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [listingRatings, setListingRatings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookLoading, setBookLoading] = useState(false);

  const [showInquire, setShowInquire] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleBookmark = async (e, item) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.warn("Please login to bookmark.");
      navigate("/login");
      return;
    }

    const existingFav = favorites.find((fav) => {
      const favId =
        typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
      return favId?.toString() === item._id?.toString();
    });

    try {
      if (existingFav) {
        await deleteFavoriteAPI(existingFav._id);
        setFavorites(favorites.filter((fav) => fav._id !== existingFav._id));
        toast.info("Removed from bookmarks");
      } else {
        const payload = { userId: currentId, itemId: item._id };
        const res = await addFavoriteAPI(payload);
        if (res.success) {
          setFavorites([...favorites, res.data]);
          toast.success("Added to bookmarks");
        }
      }
    } catch (error) {
      toast.error("Favorite action failed");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await getAllListingsApi();
      const slugify = (t) =>
        t
          ? t
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "")
          : "";
      const found = res?.listings?.find((i) => slugify(i.title) === slug);

      if (found) {
        setListing(found);
        setNearby(
          res.listings.filter(
            (i) =>
              i.categoryId?._id === found.categoryId?._id &&
              i._id !== found._id,
          ),
        );

        // Fetch and filter ratings for this specific item
        const ratRes = await getRatingsAPI();
        if (ratRes.status) {
          const filtered = ratRes.data.filter((r) => {
            const rItemId = r.itemId?._id || r.itemId;
            return rItemId?.toString() === found._id?.toString();
          });
          setListingRatings(filtered);
        }

        if (isLoggedIn && currentId) {
          const bRes = await getBookingByUserAPI(currentId);
          if (bRes.status) setUserBookings(bRes.bookings || []);

          const favRes = await getFavoritesByUserAPI(currentId);
          if (favRes.success) setFavorites(favRes.data || []);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [slug, isLoggedIn, currentId]);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [fetchData]);

  const isOwner =
    isLoggedIn && currentId?.toString() === listing?.ownerId?._id?.toString();
  const isBooked = userBookings.some((b) => b.itemId?._id === listing?._id);

  const handleBook = async () => {
    if (!isLoggedIn) return navigate("/login");
    if (isBooked) return toast.info("Already booked");
    setBookLoading(true);
    try {
      const res = await createBookingAPI({
        userId: currentId,
        itemId: listing._id,
      });
      if (res.status) {
        toast.success("Booked Successfully!");
        fetchData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setBookLoading(false);
    }
  };

  if (loading || !listing)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center text-navy fw-bold">
        LOADING...
      </div>
    );

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="bg-white border-bottom py-4 shadow-sm mt-4">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-md-8 text-start">
              <h1 className="fw-800 h2 mb-2 text-navy">{listing.title}</h1>
              <div className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-danger mt-1" />
                <p className="text-muted m-0 small">{listing.address}</p>
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="btn btn-outline-danger rounded-pill px-4 fw-bold shadow-sm">
                  <LogIn size={18} className="me-2" /> Login to Book Now
                </Link>
              ) : (
                !isOwner && (
                  <button
                    onClick={handleBook}
                    disabled={bookLoading || isBooked}
                    className={`btn rounded-pill px-4 fw-bold shadow-sm ${isBooked ? "btn-secondary" : "btn-danger"}`}>
                    {bookLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <CalendarCheck size={18} className="me-2" />
                    )}
                    {isBooked ? "Already Booked" : "Book Now"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="mb-4">
              <div className="rounded-4 overflow-hidden border bg-white shadow-sm mb-2">
                <Swiper
                  modules={[Thumbs, Autoplay]}
                  autoplay={{ delay: 3500 }}
                  thumbs={{ swiper: thumbsSwiper }}
                  className="ratio ratio-16x9">
                  {listing.images?.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={getImgURL(img)}
                        className="w-100 h-100 object-fit-cover"
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="thumbs-swiper">
                {listing.images?.map((img, i) => (
                  <SwiperSlide key={i} className="cursor-pointer">
                    <div
                      className="rounded-3 overflow-hidden border bg-white shadow-sm"
                      style={{ height: "75px" }}>
                      <img
                        src={getImgURL(img)}
                        className="w-100 h-100 object-fit-cover"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <BusinessDetailsUI
              listing={listing}
              nearby={nearby}
              navigate={navigate}
              getImgURL={getImgURL}
              listingRatings={listingRatings}
              refreshData={fetchData}
              isOwner={isOwner}
              favorites={favorites}
              handleBookmark={handleBookmark}
            />
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border">
              <div className="d-flex justify-content-between mb-3 text-start">
                <div>
                  <small className="text-muted d-block">Category</small>
                  <span className="badge bg-danger-subtle text-danger">
                    {listing.categoryId?.name}
                  </span>
                </div>
                <div className="text-end">
                  <small className="text-muted d-block">Price</small>
                  <h4 className="fw-800 text-navy">
                    ₹{listing.items?.[0]?.price || 0}
                  </h4>
                </div>
              </div>
              <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <Layers size={18} className="text-primary" />
                  <span className="fw-bold text-navy">
                    {listing.subCategoryId?.subcategoryName || "General"}
                  </span>
                </div>
                {!isOwner && (
                  <button
                    onClick={() =>
                      isLoggedIn ? setShowChat(true) : navigate("/login")
                    }
                    className="btn btn-primary rounded-circle shadow"
                    style={{
                      width: 42,
                      height: 42,
                      backgroundColor: "#001f3f",
                    }}>
                    <MessageCircle size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border text-start">
              <h6 className="fw-800 mb-3 text-navy d-flex align-items-center">
                <Clock size={18} className="text-warning me-2" /> BUSINESS HOURS
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
                    <span>{day}</span>
                    <span className="fw-bold text-dark">
                      09:00 AM - 06:00 PM
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border text-start">
              <h6 className="fw-800 mb-3 text-navy text-uppercase">
                Connect with Business
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {listing.facebook && (
                  <a
                    href={listing.facebook}
                    target="_blank"
                    className="btn btn-outline-primary rounded-circle p-2">
                    <FaFacebook size={18} />
                  </a>
                )}
                {listing.instagram && (
                  <a
                    href={listing.instagram}
                    target="_blank"
                    className="btn btn-outline-danger rounded-circle p-2">
                    <FaInstagram size={18} />
                  </a>
                )}
                {listing.whatsappNo && (
                  <a
                    href={`https://wa.me/${listing.whatsappNo.replace(/\+/g, "")}`}
                    target="_blank"
                    className="btn btn-outline-success rounded-circle p-2">
                    <FaWhatsapp size={18} />
                  </a>
                )}
                {listing.twitter && (
                  <a
                    href={listing.twitter}
                    target="_blank"
                    className="btn btn-outline-dark rounded-circle p-2">
                    <FaTwitter size={18} />
                  </a>
                )}
                {listing.linkedin && (
                  <a
                    href={listing.linkedin}
                    target="_blank"
                    className="btn btn-outline-primary rounded-circle p-2">
                    <FaLinkedin size={18} />
                  </a>
                )}
                {listing.youtube && (
                  <a
                    href={listing.youtube}
                    target="_blank"
                    className="btn btn-outline-danger rounded-circle p-2">
                    <FaYoutube size={18} />
                  </a>
                )}
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white border">
              <img
                src={getImgURL(listing.ownerId?.profileImage)}
                className="rounded-circle mx-auto mb-2 border"
                style={{ width: 75, height: 75, objectFit: "cover" }}
                alt=""
              />
              <h5 className="fw-800 text-navy mb-1">
                {listing.ownerId?.fullName}
              </h5>
              {!isOwner && (
                <button
                  onClick={() =>
                    isLoggedIn ? setShowInquire(true) : navigate("/login")
                  }
                  className="btn w-100 rounded-pill fw-bold text-white py-2 shadow-sm mt-3"
                  style={{ backgroundColor: "#001f3f" }}>
                  <ClipboardPen size={18} className="me-2" /> INQUIRE NOW
                </button>
              )}
              <hr />
              <a
                href={`tel:${listing.phone || listing.phoneNo}`}
                className="text-danger fw-800 text-decoration-none d-flex align-items-center justify-content-center gap-2 h5">
                <Phone size={18} /> {listing.phone || listing.phoneNo || "N/A"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        show={showInquire}
        onClose={() => setShowInquire(false)}
        listingId={listing._id}
      />
      <ChatPopup
        show={showChat}
        onClose={() => setShowChat(false)}
        listing={listing}
        isOwner={isOwner}
        currentId={currentId}
      />

      <style>{`.thumbs-swiper .swiper-slide-thumb-active .border { border: 2px solid #ff4d4d !important; } .cursor-pointer { cursor: pointer; } .animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default BrowseDetails;