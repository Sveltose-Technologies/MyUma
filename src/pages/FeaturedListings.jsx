// //blog cards
// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { getBLogsApi, getImgURL } from "../features/auth/api";

// // const FeaturedListings = () => {
// //   const [recentBlogs, setRecentBlogs] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // 1. Fetch Blogs and get the 3 most recent
// //   const fetchRecentBlogs = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await getBLogsApi();
// //       if (response?.blogs) {
// //         // Sort by date (newest first) and take the first 3
// //         const sorted = response.blogs
// //           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
// //           .slice(0, 3);
// //         setRecentBlogs(sorted);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching recent blogs:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRecentBlogs();
// //   }, []);

// //   // 2. Slug Helper
// //   const createSlug = (title) =>
// //     title
// //       ?.toLowerCase()
// //       .trim()
// //       .replace(/[^\w\s-]/g, "")
// //       .replace(/[\s_-]+/g, "-")
// //       .replace(/^-+|-+$/g, "");

// //   // 3. 10 Word Description Helper
// //   const getShortDescription = (htmlString) => {
// //     if (!htmlString) return "";
// //     const doc = new DOMParser().parseFromString(htmlString, "text/html");
// //     const plainText = doc.body.textContent || "";
// //     const words = plainText.trim().split(/\s+/);
// //     return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : plainText;
// //   };

// //   if (loading) return null; // Or a small spinner

// //   return (
// //     <section className="bg-light py-5">
// //       <div className="container py-4">
// //         {/* Section Header */}
// //         <div className="text-center mb-5">
// //           <h6
// //             className="fw-bold text-uppercase mb-2"
// //             style={{ color: "#c49a6c", letterSpacing: "3px" }}>
// //             Our Journal
// //           </h6>
// //           <h2 className="display-5 fw-bold" style={{ color: "#1a2b49" }}>
// //             Recent Stories
// //           </h2>
// //           <div
// //             className="mx-auto mt-2"
// //             style={{
// //               height: "3px",
// //               width: "60px",
// //               backgroundColor: "#c49a6c",
// //             }}></div>
// //         </div>

// //         <div className="row g-4 justify-content-center">
// //           {recentBlogs.map((post) => {
// //             const blogSlug = createSlug(post.title);
// //             const displayDate = new Date(post.createdAt).toLocaleDateString(
// //               "en-US",
// //               {
// //                 month: "short",
// //                 day: "2-digit",
// //                 year: "numeric",
// //               },
// //             );

// //             return (
// //               <div key={post._id} className="col-12 col-md-6 col-lg-4">
// //                 <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
// //                   {/* Image Link */}
// //                   <Link
// //                     to={`/blog/${blogSlug}`}
// //                     state={{ blogId: post._id }}
// //                     className="text-decoration-none">
// //                     <div className="position-relative">
// //                       <img
// //                         src={getImgURL(post.image)}
// //                         className="card-img-top"
// //                         style={{ height: "240px", objectFit: "cover" }}
// //                         alt={post.title}
// //                       />
// //                       <span
// //                         className="badge position-absolute top-0 end-0 m-3 py-2 px-3 fw-bold shadow-sm"
// //                         style={{
// //                           backgroundColor: "#c49a6c",
// //                           color: "#1a2b49",
// //                         }}>
// //                         {post.blogCategoryId?.title || "Story"}
// //                       </span>
// //                     </div>
// //                   </Link>

// //                   <div className="card-body p-4 text-center d-flex flex-column">
// //                     <small className="text-muted fw-bold text-uppercase mb-2">
// //                       {displayDate}
// //                     </small>

// //                     {/* Title Link */}
// //                     <Link
// //                       to={`/blog/${blogSlug}`}
// //                       state={{ blogId: post._id }}
// //                       className="text-decoration-none">
// //                       <h4 className="fw-bold mb-3" style={{ color: "#1a2b49" }}>
// //                         {post.title}
// //                       </h4>
// //                     </Link>

// //                     <p className="text-secondary small mb-4">
// //                       {getShortDescription(post.description)}
// //                     </p>

// //                     <div className="mt-auto">
// //                       <Link
// //                         to={`/blog/${blogSlug}`}
// //                         state={{ blogId: post._id }}
// //                         className="btn fw-bold px-4 py-2 rounded-pill shadow-sm text-white"
// //                         style={{
// //                           backgroundColor: "#1a2b49",
// //                           fontSize: "0.85rem",
// //                         }}>
// //                         VIEW FULL DETAILS
// //                       </Link>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FeaturedListings;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Navigation, Heart, Layers } from "lucide-react";
// import { getAllListingsApi, getImgURL } from "../services/authService";

// const FeaturedListings = () => {
//   const navigate = useNavigate();
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const isLoggedIn = !!localStorage.getItem("token");

//   const slugify = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-")
//       .replace(/^-+|-+$/g, "");

//   useEffect(() => {
//     let isMounted = true; // Cleanup flag to prevent state updates on unmounted component
//     const fetchData = async () => {
//       try {
//         const res = await getAllListingsApi();
//         if (isMounted) {
//           setListings(res?.listings?.slice(0, 9) || []);
//         }
//       } catch (err) {
//         console.error("Error fetching listings:", err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };
//     fetchData();
//     return () => {
//       isMounted = false;
//     }; // Cleanup
//   }, []); // [] ensures it only runs once on mount

//   const handleBookmark = (e, item) => {
//     e.stopPropagation();
//     if (!isLoggedIn) {
//       alert("Please login to bookmark this listing.");
//     } else {
//       alert(`${item.title} added to your favorites!`);
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
//           data-bs-ride="carousel"
//           data-bs-interval="3000">
//           <div className="carousel-inner">
//             {slides.map((chunk, index) => (
//               <div
//                 className={`carousel-item ${index === 0 ? "active" : ""}`}
//                 key={index}>
//                 <div className="row g-4 px-2">
//                   {chunk.map((item) => (
//                     <div key={item._id} className="col-12 col-md-4">
//                       <div
//                         className="card h-100 border-0 shadow-sm overflow-hidden listing-card rounded-4 bg-white"
//                         style={{ cursor: "pointer" }}
//                         onClick={() =>
//                           navigate(`/browse/${slugify(item.title)}`)
//                         }>
//                         <div className="ratio ratio-4x3 position-relative">
//                           <img
//                             src={getImgURL(item.images?.[0])}
//                             alt={item.title}
//                             className="object-fit-cover w-100 h-100"
//                             onError={(e) => {
//                               e.target.src =
//                                 "https://placehold.co/400x300?text=No+Image";
//                             }}
//                           />

//                           <div
//                             className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-start p-3"
//                             style={{ zIndex: 10 }}>
//                             <span className="badge bg-white text-navy shadow-sm fw-800 px-3 py-2 rounded-3 border-0">
//                               ₹{item.items?.[0]?.price?.toLocaleString() || 0}
//                             </span>

//                             <button
//                               className="btn btn-white rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center"
//                               style={{
//                                 backgroundColor: "white",
//                                 border: "none",
//                                 width: "36px",
//                                 height: "36px",
//                               }}
//                               onClick={(e) => handleBookmark(e, item)}>
//                               <Heart size={18} color="#ff4d4d" fill="white" />
//                             </button>
//                           </div>
//                         </div>

//                         <div className="card-body p-4 d-flex flex-column">
//                           <div className="d-flex justify-content-between align-items-center mb-2">
//                             {/* ADDED SUBCATEGORY HERE */}
//                             <div className="d-flex flex-column">
//                               <small
//                                 className="text-tan fw-800 text-uppercase ls-1"
//                                 style={{ fontSize: "10px" }}>
//                                 {item.categoryId?.name}
//                               </small>
//                               {item.subCategoryId?.subcategoryName && (
//                                 <small
//                                   className="text-navy fw-bold"
//                                   style={{ fontSize: "11px" }}>
//                                   <Layers size={10} className="me-1" />
//                                   {item.subCategoryId.subcategoryName}
//                                 </small>
//                               )}
//                             </div>

//                             <span
//                               className="small fw-800 text-primary text-decoration-underline"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 navigate(`/reviews/${slugify(item.title)}`, {
//                                   state: { listingId: item._id },
//                                 });
//                               }}>
//                               View Reviews
//                             </span>
//                           </div>

//                           <h5 className="fw-800 text-navy mb-2 text-truncate ls-1">
//                             {item.title}
//                           </h5>

//                           <p className="text-muted small mb-4">
//                             <i className="bi bi-geo-alt-fill text-danger me-1"></i>
//                             {item.address}
//                           </p>

//                           <div className="d-flex justify-content-end mt-auto">
//                             <button
//                               className="bg-white border rounded px-3 py-2"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 window.open(
//                                   `https://www.google.com/maps/search/${encodeURIComponent(item.address)}`,
//                                 );
//                               }}>
//                               <Navigation size={18} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
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
import {
  getAllListingsApi,
  getImgURL,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getFavoritesByUserAPI,
} from "../services/authService";
import { getUser } from "../utils/storage"; // Assuming you have this helper

const FeaturedListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]); // Store user's favorite objects
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllListingsApi();
        setListings(res?.listings?.slice(0, 9) || []);

        // If logged in, fetch user's favorites to highlight the hearts
        if (isLoggedIn && currentUser) {
          const favRes = await getFavoritesByUserAPI(
            currentUser._id || currentUser.id,
          );
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
    fetchData();
  }, [isLoggedIn]);

  const handleBookmark = async (e, item) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("Please login to bookmark this listing.");
      return;
    }

    // Check if already favorited
    const existingFav = favorites.find((fav) => fav.itemId === item._id);

    try {
      if (existingFav) {
        // DELETE from favorites
        await deleteFavoriteAPI(existingFav._id);
        setFavorites(favorites.filter((fav) => fav._id !== existingFav._id));
      } else {
        // ADD to favorites
        const payload = {
          userId: currentUser._id || currentUser.id,
          itemId: item._id,
        };
        const res = await addFavoriteAPI(payload);
        if (res.success) {
          // Assuming the API returns the new favorite object in 'data'
          setFavorites([...favorites, res.data]);
        }
      }
    } catch (error) {
      console.error("Favorite action failed:", error);
    }
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

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
                    // Check if this specific item is in favorites
                    const isFavorited = favorites.some(
                      (fav) => fav.itemId === item._id,
                    );

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
                              onError={(e) => {
                                e.target.src =
                                  "https://placehold.co/400x300?text=No+Image";
                              }}
                            />

                            <div
                              className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-start p-3"
                              style={{ zIndex: 10 }}>
                              <span className="badge bg-white text-navy shadow-sm fw-800 px-3 py-2 rounded-3">
                                ₹{item.items?.[0]?.price?.toLocaleString() || 0}
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
                                  color={isFavorited ? "#ff4d4d" : "#ff4d4d"}
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

                              <span
                                className="small fw-800 text-primary text-decoration-underline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/reviews/${slugify(item.title)}`, {
                                    state: { listingId: item._id },
                                  });
                                }}>
                                View Reviews
                              </span>
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