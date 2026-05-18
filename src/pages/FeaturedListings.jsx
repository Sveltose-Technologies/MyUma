// // // //blog cards
// // // // import React, { useEffect, useState } from "react";
// // // // import { Link } from "react-router-dom";
// // // // import { getBLogsApi, getImgURL } from "../features/auth/api";

// // // // const FeaturedListings = () => {
// // // //   const [recentBlogs, setRecentBlogs] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // 1. Fetch Blogs and get the 3 most recent
// // // //   const fetchRecentBlogs = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const response = await getBLogsApi();
// // // //       if (response?.blogs) {
// // // //         // Sort by date (newest first) and take the first 3
// // // //         const sorted = response.blogs
// // // //           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
// // // //           .slice(0, 3);
// // // //         setRecentBlogs(sorted);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching recent blogs:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchRecentBlogs();
// // // //   }, []);

// // // //   // 2. Slug Helper
// // // //   const createSlug = (title) =>
// // // //     title
// // // //       ?.toLowerCase()
// // // //       .trim()
// // // //       .replace(/[^\w\s-]/g, "")
// // // //       .replace(/[\s_-]+/g, "-")
// // // //       .replace(/^-+|-+$/g, "");

// // // //   // 3. 10 Word Description Helper
// // // //   const getShortDescription = (htmlString) => {
// // // //     if (!htmlString) return "";
// // // //     const doc = new DOMParser().parseFromString(htmlString, "text/html");
// // // //     const plainText = doc.body.textContent || "";
// // // //     const words = plainText.trim().split(/\s+/);
// // // //     return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : plainText;
// // // //   };

// // // //   if (loading) return null; // Or a small spinner

// // // //   return (
// // // //     <section className="bg-light py-5">
// // // //       <div className="container py-4">
// // // //         {/* Section Header */}
// // // //         <div className="text-center mb-5">
// // // //           <h6
// // // //             className="fw-bold text-uppercase mb-2"
// // // //             style={{ color: "#c49a6c", letterSpacing: "3px" }}>
// // // //             Our Journal
// // // //           </h6>
// // // //           <h2 className="display-5 fw-bold" style={{ color: "#1a2b49" }}>
// // // //             Recent Stories
// // // //           </h2>
// // // //           <div
// // // //             className="mx-auto mt-2"
// // // //             style={{
// // // //               height: "3px",
// // // //               width: "60px",
// // // //               backgroundColor: "#c49a6c",
// // // //             }}></div>
// // // //         </div>

// // // //         <div className="row g-4 justify-content-center">
// // // //           {recentBlogs.map((post) => {
// // // //             const blogSlug = createSlug(post.title);
// // // //             const displayDate = new Date(post.createdAt).toLocaleDateString(
// // // //               "en-US",
// // // //               {
// // // //                 month: "short",
// // // //                 day: "2-digit",
// // // //                 year: "numeric",
// // // //               },
// // // //             );

// // // //             return (
// // // //               <div key={post._id} className="col-12 col-md-6 col-lg-4">
// // // //                 <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
// // // //                   {/* Image Link */}
// // // //                   <Link
// // // //                     to={`/blog/${blogSlug}`}
// // // //                     state={{ blogId: post._id }}
// // // //                     className="text-decoration-none">
// // // //                     <div className="position-relative">
// // // //                       <img
// // // //                         src={getImgURL(post.image)}
// // // //                         className="card-img-top"
// // // //                         style={{ height: "240px", objectFit: "cover" }}
// // // //                         alt={post.title}
// // // //                       />
// // // //                       <span
// // // //                         className="badge position-absolute top-0 end-0 m-3 py-2 px-3 fw-bold shadow-sm"
// // // //                         style={{
// // // //                           backgroundColor: "#c49a6c",
// // // //                           color: "#1a2b49",
// // // //                         }}>
// // // //                         {post.blogCategoryId?.title || "Story"}
// // // //                       </span>
// // // //                     </div>
// // // //                   </Link>

// // // //                   <div className="card-body p-4 text-center d-flex flex-column">
// // // //                     <small className="text-muted fw-bold text-uppercase mb-2">
// // // //                       {displayDate}
// // // //                     </small>

// // // //                     {/* Title Link */}
// // // //                     <Link
// // // //                       to={`/blog/${blogSlug}`}
// // // //                       state={{ blogId: post._id }}
// // // //                       className="text-decoration-none">
// // // //                       <h4 className="fw-bold mb-3" style={{ color: "#1a2b49" }}>
// // // //                         {post.title}
// // // //                       </h4>
// // // //                     </Link>

// // // //                     <p className="text-secondary small mb-4">
// // // //                       {getShortDescription(post.description)}
// // // //                     </p>

// // // //                     <div className="mt-auto">
// // // //                       <Link
// // // //                         to={`/blog/${blogSlug}`}
// // // //                         state={{ blogId: post._id }}
// // // //                         className="btn fw-bold px-4 py-2 rounded-pill shadow-sm text-white"
// // // //                         style={{
// // // //                           backgroundColor: "#1a2b49",
// // // //                           fontSize: "0.85rem",
// // // //                         }}>
// // // //                         VIEW FULL DETAILS
// // // //                       </Link>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default FeaturedListings;
// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { Navigation, Heart, Layers } from "lucide-react";
// // // import { getAllListingsApi, getImgURL } from "../services/authService";

// // // const FeaturedListings = () => {
// // //   const navigate = useNavigate();
// // //   const [listings, setListings] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const isLoggedIn = !!localStorage.getItem("token");

// // //   const slugify = (text) =>
// // //     text
// // //       .toLowerCase()
// // //       .trim()
// // //       .replace(/[^\w\s-]/g, "")
// // //       .replace(/[\s_-]+/g, "-")
// // //       .replace(/^-+|-+$/g, "");

// // //   useEffect(() => {
// // //     let isMounted = true; // Cleanup flag to prevent state updates on unmounted component
// // //     const fetchData = async () => {
// // //       try {
// // //         const res = await getAllListingsApi();
// // //         if (isMounted) {
// // //           setListings(res?.listings?.slice(0, 9) || []);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching listings:", err);
// // //       } finally {
// // //         if (isMounted) setLoading(false);
// // //       }
// // //     };
// // //     fetchData();
// // //     return () => {
// // //       isMounted = false;
// // //     }; // Cleanup
// // //   }, []); // [] ensures it only runs once on mount

// // //   const handleBookmark = (e, item) => {
// // //     e.stopPropagation();
// // //     if (!isLoggedIn) {
// // //       alert("Please login to bookmark this listing.");
// // //     } else {
// // //       alert(`${item.title} added to your favorites!`);
// // //     }
// // //   };

// // //   const chunkArray = (array, size) => {
// // //     const result = [];
// // //     for (let i = 0; i < array.length; i += size) {
// // //       result.push(array.slice(i, i + size));
// // //     }
// // //     return result;
// // //   };

// // //   const slides = chunkArray(listings, 3);

// // //   if (loading) return null;

// // //   return (
// // //     <section className="py-5 bg-light">
// // //       <div className="container">
// // //         <div className="text-center mb-5">
// // //           <h6
// // //             className="fw-bold text-uppercase mb-2"
// // //             style={{ color: "#c49a6c", letterSpacing: "3px" }}>
// // //             Handpicked
// // //           </h6>
// // //           <h2 className="display-6 fw-800 text-navy text-uppercase ls-1">
// // //             Featured Listings
// // //           </h2>
// // //           <div
// // //             className="mx-auto bg-navy mt-2"
// // //             style={{ height: "3px", width: "60px" }}></div>
// // //         </div>

// // //         <div
// // //           id="featuredCarousel"
// // //           className="carousel slide"
// // //           data-bs-ride="carousel"
// // //           data-bs-interval="3000">
// // //           <div className="carousel-inner">
// // //             {slides.map((chunk, index) => (
// // //               <div
// // //                 className={`carousel-item ${index === 0 ? "active" : ""}`}
// // //                 key={index}>
// // //                 <div className="row g-4 px-2">
// // //                   {chunk.map((item) => (
// // //                     <div key={item._id} className="col-12 col-md-4">
// // //                       <div
// // //                         className="card h-100 border-0 shadow-sm overflow-hidden listing-card rounded-4 bg-white"
// // //                         style={{ cursor: "pointer" }}
// // //                         onClick={() =>
// // //                           navigate(`/browse/${slugify(item.title)}`)
// // //                         }>
// // //                         <div className="ratio ratio-4x3 position-relative">
// // //                           <img
// // //                             src={getImgURL(item.images?.[0])}
// // //                             alt={item.title}
// // //                             className="object-fit-cover w-100 h-100"
// // //                             onError={(e) => {
// // //                               e.target.src =
// // //                                 "https://placehold.co/400x300?text=No+Image";
// // //                             }}
// // //                           />

// // //                           <div
// // //                             className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-start p-3"
// // //                             style={{ zIndex: 10 }}>
// // //                             <span className="badge bg-white text-navy shadow-sm fw-800 px-3 py-2 rounded-3 border-0">
// // //                               ₹{item.items?.[0]?.price?.toLocaleString() || 0}
// // //                             </span>

// // //                             <button
// // //                               className="btn btn-white rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center"
// // //                               style={{
// // //                                 backgroundColor: "white",
// // //                                 border: "none",
// // //                                 width: "36px",
// // //                                 height: "36px",
// // //                               }}
// // //                               onClick={(e) => handleBookmark(e, item)}>
// // //                               <Heart size={18} color="#ff4d4d" fill="white" />
// // //                             </button>
// // //                           </div>
// // //                         </div>

// // //                         <div className="card-body p-4 d-flex flex-column">
// // //                           <div className="d-flex justify-content-between align-items-center mb-2">
// // //                             {/* ADDED SUBCATEGORY HERE */}
// // //                             <div className="d-flex flex-column">
// // //                               <small
// // //                                 className="text-tan fw-800 text-uppercase ls-1"
// // //                                 style={{ fontSize: "10px" }}>
// // //                                 {item.categoryId?.name}
// // //                               </small>
// // //                               {item.subCategoryId?.subcategoryName && (
// // //                                 <small
// // //                                   className="text-navy fw-bold"
// // //                                   style={{ fontSize: "11px" }}>
// // //                                   <Layers size={10} className="me-1" />
// // //                                   {item.subCategoryId.subcategoryName}
// // //                                 </small>
// // //                               )}
// // //                             </div>

// // //                             <span
// // //                               className="small fw-800 text-primary text-decoration-underline"
// // //                               onClick={(e) => {
// // //                                 e.stopPropagation();
// // //                                 navigate(`/reviews/${slugify(item.title)}`, {
// // //                                   state: { listingId: item._id },
// // //                                 });
// // //                               }}>
// // //                               View Reviews
// // //                             </span>
// // //                           </div>

// // //                           <h5 className="fw-800 text-navy mb-2 text-truncate ls-1">
// // //                             {item.title}
// // //                           </h5>

// // //                           <p className="text-muted small mb-4">
// // //                             <i className="bi bi-geo-alt-fill text-danger me-1"></i>
// // //                             {item.address}
// // //                           </p>

// // //                           <div className="d-flex justify-content-end mt-auto">
// // //                             <button
// // //                               className="bg-white border rounded px-3 py-2"
// // //                               onClick={(e) => {
// // //                                 e.stopPropagation();
// // //                                 window.open(
// // //                                   `https://www.google.com/maps/search/${encodeURIComponent(item.address)}`,
// // //                                 );
// // //                               }}>
// // //                               <Navigation size={18} />
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="carousel-indicators position-relative mt-4">
// // //             {slides.map((_, index) => (
// // //               <button
// // //                 key={index}
// // //                 type="button"
// // //                 data-bs-target="#featuredCarousel"
// // //                 data-bs-slide-to={index}
// // //                 className={`bg-navy ${index === 0 ? "active" : ""}`}
// // //                 style={{
// // //                   width: "10px",
// // //                   height: "10px",
// // //                   borderRadius: "50%",
// // //                   margin: "0 5px",
// // //                 }}></button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default FeaturedListings;

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Navigation, Heart, Layers } from "lucide-react";
// // import { toast } from "react-toastify"; // Added for feedback
// // import {
// //   getAllListingsApi,
// //   getImgURL,
// //   addFavoriteAPI,
// //   deleteFavoriteAPI,
// //   getFavoritesByUserAPI,
// // } from "../services/authService";
// // import { getUser } from "../utils/storage";

// // const FeaturedListings = () => {
// //   const navigate = useNavigate();
// //   const [listings, setListings] = useState([]);
// //   const [favorites, setFavorites] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const currentUser = getUser();
// //   const isLoggedIn = !!localStorage.getItem("token");

// //   const slugify = (text) =>
// //     text
// //       ?.toLowerCase()
// //       .trim()
// //       .replace(/[^\w\s-]/g, "")
// //       .replace(/[\s_-]+/g, "-")
// //       .replace(/^-+|-+$/g, "");

// //   const fetchData = async () => {
// //     try {
// //       const res = await getAllListingsApi();
// //       // Pehle 9 listings carousel ke liye
// //       setListings(res?.listings?.slice(0, 9) || []);

// //       // Agar user logged in hai, toh uske favorites fetch karein
// //       if (isLoggedIn && currentUser) {
// //         const userId = currentUser._id || currentUser.id;
// //         const favRes = await getFavoritesByUserAPI(userId);
// //         if (favRes.success) {
// //           setFavorites(favRes.data);
// //         }
// //       }
// //     } catch (err) {
// //       console.error("Error fetching data:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [isLoggedIn]);

// //   const handleBookmark = async (e, item) => {
// //     e.stopPropagation();
// //     if (!isLoggedIn) {
// //       toast.warn("Please login to bookmark this listing.");
// //       navigate("/login");
// //       return;
// //     }

// //     // ROBUST CHECK: Matches logic in Details and Browse pages
// //     const existingFav = favorites.find((fav) => {
// //       const favId =
// //         typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
// //       return favId?.toString() === item._id?.toString();
// //     });

// //     try {
// //       if (existingFav) {
// //         // REMOVE from favorites
// //         await deleteFavoriteAPI(existingFav._id);
// //         setFavorites(favorites.filter((fav) => fav._id !== existingFav._id));
// //         toast.info("Removed from bookmarks");
// //       } else {
// //         // ADD to favorites
// //         const payload = {
// //           userId: currentUser._id || currentUser.id,
// //           itemId: item._id,
// //         };
// //         const res = await addFavoriteAPI(payload);
// //         if (res.success) {
// //           setFavorites([...favorites, res.data]);
// //           toast.success("Added to bookmarks");
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Favorite action failed:", error);
// //       toast.error("Failed to update bookmark");
// //     }
// //   };

// //   const chunkArray = (array, size) => {
// //     const result = [];
// //     for (let i = 0; i < array.length; i += size) {
// //       result.push(array.slice(i, i + size));
// //     }
// //     return result;
// //   };

// //   const slides = chunkArray(listings, 3);

// //   if (loading) return null;

// //   return (
// //     <section className="py-5 bg-light">
// //       <div className="container">
// //         <div className="text-center mb-5">
// //           <h6
// //             className="fw-bold text-uppercase mb-2"
// //             style={{ color: "#c49a6c", letterSpacing: "3px" }}>
// //             Handpicked
// //           </h6>
// //           <h2 className="display-6 fw-800 text-navy text-uppercase ls-1">
// //             Featured Listings
// //           </h2>
// //           <div
// //             className="mx-auto bg-navy mt-2"
// //             style={{ height: "3px", width: "60px" }}></div>
// //         </div>

// //         <div
// //           id="featuredCarousel"
// //           className="carousel slide"
// //           data-bs-ride="carousel">
// //           <div className="carousel-inner">
// //             {slides.map((chunk, index) => (
// //               <div
// //                 className={`carousel-item ${index === 0 ? "active" : ""}`}
// //                 key={index}>
// //                 <div className="row g-4 px-2">
// //                   {chunk.map((item) => {
// //                     // Check if this specific item is favorited (Sync logic)
// //                     const isFavorited = favorites.some((fav) => {
// //                       const favId =
// //                         typeof fav.itemId === "object"
// //                           ? fav.itemId._id
// //                           : fav.itemId;
// //                       return favId?.toString() === item._id?.toString();
// //                     });

// //                     return (
// //                       <div key={item._id} className="col-12 col-md-4">
// //                         <div
// //                           className="card h-100 border-0 shadow-sm overflow-hidden listing-card rounded-4 bg-white"
// //                           style={{ cursor: "pointer" }}
// //                           onClick={() =>
// //                             navigate(`/browse/${slugify(item.title)}`)
// //                           }>
// //                           <div className="ratio ratio-4x3 position-relative">
// //                             <img
// //                               src={getImgURL(item.images?.[0])}
// //                               alt={item.title}
// //                               className="object-fit-cover w-100 h-100"
// //                             />

// //                             <div
// //                               className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-start p-3"
// //                               style={{ zIndex: 10 }}>
// //                               <span className="badge bg-white text-navy shadow-sm fw-800 px-3 py-2 rounded-3">
// //                                 ${item.items?.[0]?.price?.toLocaleString() || 0}
// //                               </span>

// //                               <button
// //                                 className="btn btn-white rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center"
// //                                 style={{
// //                                   backgroundColor: "white",
// //                                   border: "none",
// //                                   width: "36px",
// //                                   height: "36px",
// //                                 }}
// //                                 onClick={(e) => handleBookmark(e, item)}>
// //                                 <Heart
// //                                   size={18}
// //                                   color="#ff4d4d"
// //                                   fill={isFavorited ? "#ff4d4d" : "none"} // Filled red if favorited
// //                                   style={{ transition: "all 0.3s ease" }}
// //                                 />
// //                               </button>
// //                             </div>
// //                           </div>

// //                           <div className="card-body p-4 d-flex flex-column">
// //                             <div className="d-flex justify-content-between align-items-center mb-2">
// //                               <div className="d-flex flex-column">
// //                                 <small
// //                                   className="text-tan fw-800 text-uppercase ls-1"
// //                                   style={{ fontSize: "10px" }}>
// //                                   {item.categoryId?.name}
// //                                 </small>
// //                                 {item.subCategoryId?.subcategoryName && (
// //                                   <small
// //                                     className="text-navy fw-bold"
// //                                     style={{ fontSize: "11px" }}>
// //                                     <Layers size={10} className="me-1" />
// //                                     {item.subCategoryId.subcategoryName}
// //                                   </small>
// //                                 )}
// //                               </div>
// //                               {/* <span
// //                                 className="small fw-800 text-primary text-decoration-underline"
// //                                 onClick={(e) => {
// //                                   e.stopPropagation();
// //                                   navigate(`/reviews/${slugify(item.title)}`, {
// //                                     state: { listingId: item._id },
// //                                   });
// //                                 }}>
// //                                 View Reviews
// //                               </span> */}
// //                             </div>

// //                             <h5 className="fw-800 text-navy mb-2 text-truncate ls-1">
// //                               {item.title}
// //                             </h5>
// //                             <p className="text-muted small mb-4">
// //                               <i className="bi bi-geo-alt-fill text-danger me-1"></i>
// //                               {item.address}
// //                             </p>

// //                             <div className="d-flex justify-content-end mt-auto">
// //                               <button
// //                                 className="bg-white border rounded px-3 py-2"
// //                                 onClick={(e) => {
// //                                   e.stopPropagation();
// //                                   window.open(
// //                                     `https://www.google.com/maps/search/${encodeURIComponent(item.address)}`,
// //                                   );
// //                                 }}>
// //                                 <Navigation size={18} />
// //                               </button>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="carousel-indicators position-relative mt-4">
// //             {slides.map((_, index) => (
// //               <button
// //                 key={index}
// //                 type="button"
// //                 data-bs-target="#featuredCarousel"
// //                 data-bs-slide-to={index}
// //                 className={`bg-navy ${index === 0 ? "active" : ""}`}
// //                 style={{
// //                   width: "10px",
// //                   height: "10px",
// //                   borderRadius: "50%",
// //                   margin: "0 5px",
// //                 }}></button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FeaturedListings;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Navigation, Heart, Layers } from "lucide-react";
// import { toast } from "react-toastify";
// import {
//   getAllListingsApi,
//   getImgURL,
//   addFavoriteAPI,
//   deleteFavoriteAPI,
//   getFavoritesByUserAPI,
//   getRatingsAPI, // Import Ratings API
// } from "../services/authService";
// import { getUser } from "../utils/storage";

// const FeaturedListings = () => {
//   const navigate = useNavigate();
//   const [listings, setListings] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const currentUser = getUser();
//   const isLoggedIn = !!localStorage.getItem("token");

//   const slugify = (text) =>
//     text
//       ?.toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-")
//       .replace(/^-+|-+$/g, "");

//   const fetchData = async () => {
//     try {
//       // 1. Dono APIs ek saath call karein
//       const [listingsRes, ratingsRes] = await Promise.all([
//         getAllListingsApi(),
//         getRatingsAPI(),
//       ]);

//       const allListings = listingsRes?.listings || [];
//       const allRatings = ratingsRes?.data || [];

//       // 2. Logic: Count ratings for each listing
//       // Hum check karenge ki kis itemId par kitne reviews hain
//       const ratingCounts = allRatings.reduce((acc, curr) => {
//         const id = curr.itemId;
//         acc[id] = (acc[id] || 0) + 1;
//         return acc;
//       }, {});

//       // 3. Logic: Sort listings based on rating count (Highest first)
//       const sortedListings = allListings
//         .sort((a, b) => (ratingCounts[b._id] || 0) - (ratingCounts[a._id] || 0))
//         // Sirf wahi dikhayein jinpar reviews hain aur top 9 items select karein
//         .filter((item) => (ratingCounts[item._id] || 0) > 0)
//         .slice(0, 9);

//       setListings(sortedListings);

//       if (isLoggedIn && currentUser) {
//         const userId = currentUser._id || currentUser.id;
//         const favRes = await getFavoritesByUserAPI(userId);
//         if (favRes.success) {
//           setFavorites(favRes.data);
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [isLoggedIn]);

//   const handleBookmark = async (e, item) => {
//     e.stopPropagation();
//     if (!isLoggedIn) {
//       toast.warn("Please login to bookmark this listing.");
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
//           userId: currentUser._id || currentUser.id,
//           itemId: item._id,
//         };
//         const res = await addFavoriteAPI(payload);
//         if (res.success) {
//           setFavorites([...favorites, res.data]);
//           toast.success("Added to bookmarks");
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to update bookmark");
//     }
//   };

//   const chunkArray = (array, size) => {
//     const result = [];
//     for (let i = 0; i < array.length; i += size) {
//       result.push(array.slice(i, i + size));
//     }
//     return result;
//   };

//   const slides = chunkArray(listings, 3);

//   if (loading) return null;

//   return (
//     <section className="py-5 bg-light">
//       <div className="container">
//         <div className="text-center mb-5">
//           <h6
//             className="fw-bold text-uppercase mb-2"
//             style={{ color: "#c49a6c", letterSpacing: "3px" }}>
//             Handpicked
//           </h6>
//           <h2 className="display-6 fw-800 text-navy text-uppercase ls-1">
//             Featured Listings
//           </h2>
//           <div
//             className="mx-auto bg-navy mt-2"
//             style={{ height: "3px", width: "60px" }}></div>
//         </div>

//         <div
//           id="featuredCarousel"
//           className="carousel slide"
//           data-bs-ride="carousel">
//           <div className="carousel-inner">
//             {slides.map((chunk, index) => (
//               <div
//                 className={`carousel-item ${index === 0 ? "active" : ""}`}
//                 key={index}>
//                 <div className="row g-4 px-2">
//                   {chunk.map((item) => {
//                     const isFavorited = favorites.some((fav) => {
//                       const favId =
//                         typeof fav.itemId === "object"
//                           ? fav.itemId._id
//                           : fav.itemId;
//                       return favId?.toString() === item._id?.toString();
//                     });

//                     return (
//                       <div key={item._id} className="col-12 col-md-4">
//                         <div
//                           className="card h-100 border-0 shadow-sm overflow-hidden listing-card rounded-4 bg-white"
//                           style={{ cursor: "pointer" }}
//                           onClick={() =>
//                             navigate(`/browse/${slugify(item.title)}`)
//                           }>
//                           <div className="ratio ratio-4x3 position-relative">
//                             <img
//                               src={getImgURL(item.images?.[0])}
//                               alt={item.title}
//                               className="object-fit-cover w-100 h-100"
//                             />

//                             <div
//                               className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-start p-3"
//                               style={{ zIndex: 10 }}>
//                               <span className="badge bg-white text-navy shadow-sm fw-800 px-3 py-2 rounded-3">
//                                 ${item.items?.[0]?.price?.toLocaleString() || 0}
//                               </span>

//                               <button
//                                 className="btn btn-white rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center"
//                                 style={{
//                                   backgroundColor: "white",
//                                   border: "none",
//                                   width: "36px",
//                                   height: "36px",
//                                 }}
//                                 onClick={(e) => handleBookmark(e, item)}>
//                                 <Heart
//                                   size={18}
//                                   color="#ff4d4d"
//                                   fill={isFavorited ? "#ff4d4d" : "none"}
//                                 />
//                               </button>
//                             </div>
//                           </div>

//                           <div className="card-body p-4 d-flex flex-column">
//                             <div className="d-flex justify-content-between align-items-center mb-2">
//                               <div className="d-flex flex-column">
//                                 <small
//                                   className="text-tan fw-800 text-uppercase ls-1"
//                                   style={{ fontSize: "10px" }}>
//                                   {item.categoryId?.name}
//                                 </small>
//                                 {item.subCategoryId?.subcategoryName && (
//                                   <small
//                                     className="text-navy fw-bold"
//                                     style={{ fontSize: "11px" }}>
//                                     <Layers size={10} className="me-1" />
//                                     {item.subCategoryId.subcategoryName}
//                                   </small>
//                                 )}
//                               </div>
//                             </div>

//                             <h5 className="fw-800 text-navy mb-2 text-truncate ls-1">
//                               {item.title}
//                             </h5>
//                             <p className="text-muted small mb-4">
//                               <i className="bi bi-geo-alt-fill text-danger me-1"></i>
//                               {item.address}
//                             </p>

//                             <div className="d-flex justify-content-end mt-auto">
//                               <button
//                                 className="bg-white border rounded px-3 py-2"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   window.open(
//                                     `https://www.google.com/maps/search/${encodeURIComponent(item.address)}`,
//                                   );
//                                 }}>
//                                 <Navigation size={18} />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="carousel-indicators position-relative mt-4">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 data-bs-target="#featuredCarousel"
//                 data-bs-slide-to={index}
//                 className={`bg-navy ${index === 0 ? "active" : ""}`}
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   margin: "0 5px",
//                 }}></button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedListings;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Heart, Layers } from "lucide-react";
import { toast } from "react-toastify";
import {
  getAllListingsApi,
  getImgURL,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getFavoritesByUserAPI,
  getRatingsAPI, // Ratings fetch karne ke liye
} from "../services/authService";
import { getUser } from "../utils/storage";

const FeaturedListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = getUser();
  const isLoggedIn = !!localStorage.getItem("token");

  const slugify = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const fetchData = async () => {
    try {
      // 1. Listings aur Ratings dono APIs call karein
      const [listingsRes, ratingsRes] = await Promise.all([
        getAllListingsApi(),
        getRatingsAPI(),
      ]);

      const allListings = listingsRes?.listings || [];
      const allRatings = ratingsRes?.data || [];

      // 2. LOGIC: Har listing ke liye ratings count karein
      const ratingCounts = allRatings.reduce((acc, curr) => {
        const id = curr.itemId;
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      // 3. LOGIC: Listings ko sort karein (Highest Reviews first) aur sirf Top 6 lein
      const top6Listings = allListings
        .sort((a, b) => (ratingCounts[b._id] || 0) - (ratingCounts[a._id] || 0))
        .slice(0, 6); // Sirf top 6 cards dikhane ke liye

      setListings(top6Listings);

      if (isLoggedIn && currentUser) {
        const userId = currentUser._id || currentUser.id;
        const favRes = await getFavoritesByUserAPI(userId);
        if (favRes.success) {
          setFavorites(favRes.data);
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  const handleBookmark = async (e, item) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.warn("Please login to bookmark this listing.");
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
        const payload = {
          userId: currentUser._id || currentUser.id,
          itemId: item._id,
        };
        const res = await addFavoriteAPI(payload);
        if (res.success) {
          setFavorites([...favorites, res.data]);
          toast.success("Added to bookmarks");
        }
      }
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // 6 listings ko 3-3 ke groups mein divide karega (Total 2 slides)
  const slides = chunkArray(listings, 3);

  if (loading) return null;

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h6
            className="fw-bold text-uppercase mb-2"
            style={{ color: "#c49a6c", letterSpacing: "3px" }}>
            Handpicked
          </h6>
          <h2 className="display-6 fw-800 text-navy text-uppercase ls-1">
            Featured Listings
          </h2>
          <div
            className="mx-auto bg-navy mt-2"
            style={{ height: "3px", width: "60px" }}></div>
        </div>

        <div
          id="featuredCarousel"
          className="carousel slide"
          data-bs-ride="carousel">
          <div className="carousel-inner">
            {slides.map((chunk, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}>
                <div className="row g-4 px-2">
                  {chunk.map((item) => {
                    const isFavorited = favorites.some((fav) => {
                      const favId =
                        typeof fav.itemId === "object"
                          ? fav.itemId._id
                          : fav.itemId;
                      return favId?.toString() === item._id?.toString();
                    });

                    return (
                      <div key={item._id} className="col-12 col-md-4">
                        <div
                          className="card h-100 border-0 shadow-sm overflow-hidden listing-card rounded-4 bg-white"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/browse/${slugify(item.title)}`)
                          }>
                          <div className="ratio ratio-4x3 position-relative">
                            <img
                              src={getImgURL(item.images?.[0])}
                              alt={item.title}
                              className="object-fit-cover w-100 h-100"
                            />

                            <div
                              className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-start p-3"
                              style={{ zIndex: 10 }}>
                              <span className="badge bg-white text-navy shadow-sm fw-800 px-3 py-2 rounded-3">
                                ${item.items?.[0]?.price?.toLocaleString() || 0}
                              </span>

                              <button
                                className="btn btn-white rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center"
                                style={{
                                  backgroundColor: "white",
                                  border: "none",
                                  width: "36px",
                                  height: "36px",
                                }}
                                onClick={(e) => handleBookmark(e, item)}>
                                <Heart
                                  size={18}
                                  color="#ff4d4d"
                                  fill={isFavorited ? "#ff4d4d" : "none"}
                                />
                              </button>
                            </div>
                          </div>

                          <div className="card-body p-4 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div className="d-flex flex-column">
                                <small
                                  className="text-tan fw-800 text-uppercase ls-1"
                                  style={{ fontSize: "10px" }}>
                                  {item.categoryId?.name}
                                </small>
                                {item.subCategoryId?.subcategoryName && (
                                  <small
                                    className="text-navy fw-bold"
                                    style={{ fontSize: "11px" }}>
                                    <Layers size={10} className="me-1" />
                                    {item.subCategoryId.subcategoryName}
                                  </small>
                                )}
                              </div>
                            </div>

                            <h5 className="fw-800 text-navy mb-2 text-truncate ls-1">
                              {item.title}
                            </h5>
                            <p className="text-muted small mb-4">
                              <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                              {item.address}
                            </p>

                            <div className="d-flex justify-content-end mt-auto">
                              <button
                                className="bg-white border rounded px-3 py-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(
                                    `https://www.google.com/maps/search/${encodeURIComponent(item.address)}`,
                                  );
                                }}>
                                <Navigation size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators (Ab sirf 2 dots dikhengi kyunki 6 items hain) */}
          <div className="carousel-indicators position-relative mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#featuredCarousel"
                data-bs-slide-to={index}
                className={`bg-navy ${index === 0 ? "active" : ""}`}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  margin: "0 5px",
                }}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;