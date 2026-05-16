// // // // import React, { useState, useEffect } from "react";
// // // // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // // // import { Navigation, MapPin, Layers, Heart } from "lucide-react";
// // // // import L from "leaflet";
// // // // import "leaflet/dist/leaflet.css";

// // // // // Marker Icon Fix
// // // // import markerIcon from "leaflet/dist/images/marker-icon.png";
// // // // import markerShadow from "leaflet/dist/images/marker-shadow.png";
// // // // let DefaultIcon = L.icon({
// // // //   iconUrl: markerIcon,
// // // //   shadowUrl: markerShadow,
// // // //   iconSize: [25, 41],
// // // //   iconAnchor: [12, 41],
// // // // });

// // // // function ChangeView({ center }) {
// // // //   const map = useMap();
// // // //   map.setView(center, 14);
// // // //   return null;
// // // // }

// // // // // Custom SVGs for Social Media (Guarantees no import errors)
// // // // const SocialIcons = {
// // // //   facebook: (
// // // //     <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
// // // //       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
// // // //     </svg>
// // // //   ),
// // // //   twitter: (
// // // //     <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
// // // //       <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
// // // //     </svg>
// // // //   ),
// // // //   instagram: (
// // // //     <svg
// // // //       width="20"
// // // //       height="20"
// // // //       fill="none"
// // // //       stroke="currentColor"
// // // //       strokeWidth="2"
// // // //       strokeLinecap="round"
// // // //       strokeLinejoin="round"
// // // //       viewBox="0 0 24 24">
// // // //       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
// // // //       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
// // // //       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
// // // //     </svg>
// // // //   ),
// // // //   linkedin: (
// // // //     <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
// // // //       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
// // // //     </svg>
// // // //   ),
// // // //   youtube: (
// // // //     <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
// // // //       <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
// // // //     </svg>
// // // //   ),
// // // //   whatsapp: (
// // // //     <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
// // // //       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
// // // //     </svg>
// // // //   ),
// // // // };

// // // // const BusinessDetailsUI = ({
// // // //   listing,
// // // //   nearby,
// // // //   favorites,
// // // //   handleBookmark,
// // // //   navigate,
// // // //   slugify,
// // // //   getImgURL,
// // // // }) => {
// // // //   const [coords, setCoords] = useState([22.7196, 75.8577]);

// // // //   // Dynamic Geocoding for Map
// // // //   useEffect(() => {
// // // //     if (listing?.address) {
// // // //       fetch(
// // // //         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`,
// // // //       )
// // // //         .then((res) => res.json())
// // // //         .then((data) => {
// // // //           if (data && data.length > 0)
// // // //             setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
// // // //         });
// // // //     }
// // // //   }, [listing.address]);

// // // //   return (
// // // //     <div>
// // // //       {/* CATEGORY & SOCIALS SECTION */}
// // // //       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
// // // //         <h5 className="fw-bold mb-3" style={{ color: "#002147" }}>
// // // //           Overview
// // // //         </h5>
// // // //         <div className="d-inline-flex align-items-center gap-2 border rounded-3 px-3 py-2 border-danger-subtle bg-light mb-4">
// // // //           <Layers size={18} className="text-danger" />
// // // //           <span className="fw-bold small">{listing.categoryId?.name}</span>
// // // //         </div>

// // // //         <h6 className="fw-bold small text-muted text-uppercase mb-3">
// // // //           Connect With Us
// // // //         </h6>
// // // //         <div className="d-flex flex-wrap gap-2">
// // // //           {/* Loop through all possible socials dynamically */}
// // // //           {["facebook", "twitter", "instagram", "linkedin", "youtube"].map(
// // // //             (key) =>
// // // //               listing[key] && (
// // // //                 <a
// // // //                   key={key}
// // // //                   href={listing[key]}
// // // //                   target="_blank"
// // // //                   rel="noreferrer"
// // // //                   className="btn border rounded-circle p-2 d-flex align-items-center justify-content-center text-muted"
// // // //                   style={{ width: "40px", height: "40px" }}>
// // // //                   {SocialIcons[key]}
// // // //                 </a>
// // // //               ),
// // // //           )}
// // // //           {/* WhatsApp Specific */}
// // // //           {listing.whatsappNo && (
// // // //             <a
// // // //               href={`https://wa.me/${listing.whatsappNo.replace(/\D/g, "")}`}
// // // //               target="_blank"
// // // //               rel="noreferrer"
// // // //               className="btn border rounded-circle p-2 d-flex align-items-center justify-content-center text-success"
// // // //               style={{ width: "40px", height: "40px" }}>
// // // //               {SocialIcons.whatsapp}
// // // //             </a>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* DYNAMIC MAP SECTION */}
// // // //       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
// // // //         <h5 className="fw-bold mb-3" style={{ color: "#002147" }}>
// // // //           Location
// // // //         </h5>
// // // //         <div
// // // //           className="rounded-3 overflow-hidden border shadow-sm"
// // // //           style={{ height: "350px" }}>
// // // //           <MapContainer
// // // //             center={coords}
// // // //             zoom={13}
// // // //             style={{ height: "100%", width: "100%" }}>
// // // //             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// // // //             <ChangeView center={coords} />
// // // //             <Marker position={coords} icon={DefaultIcon}>
// // // //               <Popup>{listing.title}</Popup>
// // // //             </Marker>
// // // //           </MapContainer>
// // // //         </div>
// // // //       </div>

// // // //       {/* OTHER BUSINESSES NEARBY (MATCHING FEATURED LISTINGS UI) */}
// // // //       <div className="mt-5">
// // // //         <h4
// // // //           className="fw-bold mb-4 border-bottom pb-3"
// // // //           style={{ color: "#002147" }}>
// // // //           Other Businesses Nearby
// // // //         </h4>
// // // //         <div className="row g-4">
// // // //           {nearby.map((item) => {
// // // //             // Dynamic Bookmark Logic
// // // //             const isFavorited = favorites.some(
// // // //               (fav) =>
// // // //                 (typeof fav.itemId === "object"
// // // //                   ? fav.itemId._id
// // // //                   : fav.itemId) === item._id,
// // // //             );

// // // //             return (
// // // //               <div key={item._id} className="col-md-6">
// // // //                 <div
// // // //                   className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
// // // //                   style={{ cursor: "pointer", backgroundColor: "#fff" }}
// // // //                   onClick={() => navigate(`/browse/${slugify(item.title)}`)}>
// // // //                   {/* TOP IMAGE SECTION */}
// // // //                   <div className="position-relative">
// // // //                     <div className="ratio ratio-4x3">
// // // //                       <img
// // // //                         src={getImgURL(item.images?.[0])}
// // // //                         className="object-fit-cover w-100 h-100"
// // // //                         alt={item.title}
// // // //                       />
// // // //                     </div>

// // // //                     {/* 1. DYNAMIC DOLLAR PRICE ($) - Fixed height to be small and neat */}
// // // //                     <div
// // // //                       className="position-absolute bg-white shadow-sm d-flex align-items-center justify-content-center"
// // // //                       style={{
// // // //                         top: "12px",
// // // //                         left: "12px",
// // // //                         minWidth: "45px",
// // // //                         height: "35px",
// // // //                         borderRadius: "8px",
// // // //                         zIndex: 10,
// // // //                         padding: "0 10px",
// // // //                       }}>
// // // //                       <span
// // // //                         className="fw-bold"
// // // //                         style={{ color: "#002147", fontSize: "14px" }}>
// // // //                         ${item.items?.[0]?.price || 0}
// // // //                       </span>
// // // //                     </div>

// // // //                     {/* 2. HEART PILL CONTAINER */}
// // // //                     <button
// // // //                       className="position-absolute btn shadow-sm d-flex align-items-center justify-content-center"
// // // //                       style={{
// // // //                         top: "12px",
// // // //                         right: "12px",
// // // //                         width: "60px",
// // // //                         height: "32px",
// // // //                         borderRadius: "20px",
// // // //                         backgroundColor: "white",
// // // //                         border: "none",
// // // //                         zIndex: 10,
// // // //                       }}
// // // //                       onClick={(e) => handleBookmark(e, item)}>
// // // //                       <Heart
// // // //                         size={18}
// // // //                         fill={isFavorited ? "#ff4d4d" : "none"}
// // // //                         color="#ff4d4d"
// // // //                       />
// // // //                     </button>
// // // //                   </div>

// // // //                   {/* BOTTOM CONTENT SECTION */}
// // // //                   <div className="card-body p-4 d-flex flex-column">
// // // //                     <small
// // // //                       className="text-uppercase fw-bold mb-1"
// // // //                       style={{
// // // //                         color: "#7b92a6",
// // // //                         fontSize: "11px",
// // // //                         letterSpacing: "0.8px",
// // // //                       }}>
// // // //                       {item.categoryId?.name || "CATEGORY"}
// // // //                     </small>

// // // //                     <h5
// // // //                       className="fw-bold mb-2"
// // // //                       style={{ color: "#002147", fontSize: "1.2rem" }}>
// // // //                       {item.title}
// // // //                     </h5>

// // // //                     <div className="text-muted small mb-4 d-flex align-items-center gap-1">
// // // //                       <MapPin size={16} className="text-danger" />
// // // //                       <span style={{ color: "#888" }}>{item.address}</span>
// // // //                     </div>

// // // //                     {/* 3. SQUARE NAVIGATION BUTTON */}
// // // //                     <div className="mt-auto d-flex justify-content-end">
// // // //                       <button
// // // //                         className="btn btn-white border shadow-sm p-0 d-flex align-items-center justify-content-center"
// // // //                         style={{
// // // //                           width: "42px",
// // // //                           height: "42px",
// // // //                           borderRadius: "8px",
// // // //                           backgroundColor: "white",
// // // //                         }}
// // // //                         onClick={(e) => {
// // // //                           e.stopPropagation();
// // // //                           window.open(
// // // //                             `https://www.google.com/maps/search/${encodeURIComponent(item.address)}`,
// // // //                           );
// // // //                         }}>
// // // //                         <Navigation size={20} style={{ color: "#333" }} />
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };
// // // // export default BusinessDetailsUI;

// // // import React, { useState, useEffect } from "react";
// // // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // // import { Navigation, MapPin, Layers } from "lucide-react";
// // // import L from "leaflet";
// // // import "leaflet/dist/leaflet.css";

// // // // Marker Icon Fix
// // // import markerIcon from "leaflet/dist/images/marker-icon.png";
// // // import markerShadow from "leaflet/dist/images/marker-shadow.png";
// // // let DefaultIcon = L.icon({
// // //   iconUrl: markerIcon,
// // //   shadowUrl: markerShadow,
// // //   iconSize: [25, 41],
// // //   iconAnchor: [12, 41],
// // // });

// // // function ChangeView({ center }) {
// // //   const map = useMap();
// // //   map.setView(center, 14);
// // //   return null;
// // // }

// // // const BusinessDetailsUI = ({
// // //   listing,
// // //   nearby,
// // //   navigate,
// // //   slugify,
// // //   getImgURL,
// // // }) => {
// // //   const [coords, setCoords] = useState([22.7196, 75.8577]);

// // //   useEffect(() => {
// // //     if (listing?.address) {
// // //       fetch(
// // //         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`,
// // //       )
// // //         .then((res) => res.json())
// // //         .then((data) => {
// // //           if (data && data.length > 0)
// // //             setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
// // //         });
// // //     }
// // //   }, [listing.address]);

// // //   return (
// // //     <div>
// // //       {/* CATEGORY & OVERVIEW */}
// // //       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">

// // //         <div className="d-inline-flex align-items-center gap-2 border rounded-3 px-3 py-2 border-danger-subtle bg-light mb-4">
// // //           <Layers size={18} className="text-danger" />
// // //           <span className="fw-bold small">{listing.categoryId?.name}</span>
// // //         </div>

// // //       </div>

// // //       {/* LOCATION MAP */}
// // //       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
// // //         <h5 className="fw-bold mb-3" style={{ color: "#002147" }}>
// // //           Location
// // //         </h5>
// // //         <div
// // //           className="rounded-3 overflow-hidden border shadow-sm"
// // //           style={{ height: "350px" }}>
// // //           <MapContainer
// // //             center={coords}
// // //             zoom={13}
// // //             style={{ height: "100%", width: "100%" }}>
// // //             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// // //             <ChangeView center={coords} />
// // //             <Marker position={coords} icon={DefaultIcon}>
// // //               <Popup>{listing.title}</Popup>
// // //             </Marker>
// // //           </MapContainer>
// // //         </div>
// // //       </div>

// // //       {/* NEARBY LISTINGS (MATCHING YOUR SCREENSHOT STYLE) */}
// // //       <div className="mt-5">
// // //         <h4
// // //           className="fw-bold mb-4 border-bottom pb-3"
// // //           style={{ color: "#002147" }}>
// // //           Other Businesses Nearby
// // //         </h4>
// // //         <div className="row g-4">
// // //           {nearby.map((item) => (
// // //             <div
// // //               key={item._id}
// // //               className="col-md-6"
// // //               onClick={() => navigate(`/browse/${slugify(item.title)}`)}
// // //               style={{ cursor: "pointer" }}>
// // //               <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden border bg-white">
// // //                 <div className="position-relative">
// // //                   <div className="ratio ratio-4x3">
// // //                     <img
// // //                       src={getImgURL(item.images?.[0])}
// // //                       className="object-fit-cover w-100 h-100"
// // //                       alt=""
// // //                     />
// // //                   </div>
// // //                   {/* Small Neat Price Strip */}
// // //                   <div
// // //                     className="position-absolute bg-white shadow-sm p-2 rounded-2"
// // //                     style={{ top: "10px", left: "10px" }}>
// // //                     <span
// // //                       className="fw-bold small"
// // //                       style={{ color: "#002147" }}>
// // //                       ${item.items?.[0]?.price || 0}
// // //                     </span>
// // //                   </div>
// // //                 </div>

// // //                 <div className="card-body p-4">
// // //                   <small
// // //                     className="text-uppercase fw-bold mb-1"
// // //                     style={{ color: "#7b92a6", fontSize: "10px" }}>
// // //                     {item.categoryId?.name}
// // //                   </small>
// // //                   <h6 className="fw-bold mb-2" style={{ color: "#002147" }}>
// // //                     {item.title}
// // //                   </h6>
// // //                   <p className="text-muted small mb-4 d-flex align-items-center gap-1">
// // //                     <MapPin size={14} className="text-danger" /> {item.address}
// // //                   </p>
// // //                   <div className="d-flex justify-content-end">
// // //                     <div className="p-2 border rounded-3 bg-light">
// // //                       <Navigation size={18} />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // // export default BusinessDetailsUI;
// // import React, { useState } from "react";
// // import {
// //   Navigation,
// //   MapPin,
// //   Layers,
// //   Star,
// //   MessageSquare,
// //   X,
// // } from "lucide-react";
// // import { addReviewAPI } from "../services/authService";
// // import { getUser } from "../utils/storage";
// // import { toast } from "react-toastify";

// // const BusinessDetailsUI = ({
// //   listing,
// //   nearby,
// //   navigate,
// //   slugify,
// //   getImgURL,
// //   reviewCount,
// //   refreshData,
// // }) => {
// //   const [showModal, setShowModal] = useState(false);
// //   const [reviewText, setReviewText] = useState("");
// //   const [rating, setRating] = useState(5);
// //   const [submitting, setSubmitting] = useState(false);

// //   const currentUser = getUser();

// //   const handleReviewSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!currentUser) return toast.warn("Please login to write a review");
// //     if (!reviewText) return toast.error("Please enter a message");

// //     setSubmitting(true);
// //     try {
// //       const data = {
// //         userId: currentUser._id || currentUser.id,
// //         itemId: listing._id,
// //         rating: rating,
// //         comment: reviewText,
// //       };
// //       const res = await addReviewAPI(data);
// //       if (res.status) {
// //         toast.success("Review added successfully!");
// //         setShowModal(false);
// //         setReviewText("");
// //         refreshData(); // Refresh counts
// //       }
// //     } catch (err) {
// //       toast.error("Failed to add review");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* OVERVIEW & REVIEW ACTION */}
// //       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center">
// //         <div>
// //           <h5 className="fw-bold mb-1" style={{ color: "#002147" }}>
// //             Overview
// //           </h5>
// //           <p className="text-muted small m-0 d-flex align-items-center gap-1">
// //             <MessageSquare size={14} /> {reviewCount} People reviewed this
// //             business
// //           </p>
// //         </div>
// //         <button
// //           onClick={() => setShowModal(true)}
// //           className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
// //           Write Review
// //         </button>
// //       </div>

// //       {/* CATEGORY & PRICE BOX */}
// //       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
// //         <div className="d-flex justify-content-between align-items-center">
// //           <div className="d-inline-flex align-items-center gap-2 border rounded-3 px-3 py-2 border-danger-subtle bg-light">
// //             <Layers size={18} className="text-danger" />
// //             <span className="fw-bold small">{listing.categoryId?.name}</span>
// //           </div>
// //           <div className="text-end">
// //             <small className="text-muted d-block">Starting Price</small>
// //             <h4 className="fw-bold text-navy m-0">
// //               ${listing.items?.[0]?.price || 0}
// //             </h4>
// //           </div>
// //         </div>
// //       </div>

// //       {/* NEARBY LISTINGS */}
// //       <div className="mt-5">
// //         <h4
// //           className="fw-bold mb-4 border-bottom pb-3"
// //           style={{ color: "#002147" }}>
// //           Other Businesses Nearby
// //         </h4>
// //         <div className="row g-4">
// //           {nearby.map((item) => (
// //             <div
// //               key={item._id}
// //               className="col-md-6"
// //               onClick={() => navigate(`/browse/${slugify(item.title)}`)}
// //               style={{ cursor: "pointer" }}>
// //               <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden border bg-white">
// //                 <div className="position-relative">
// //                   <div className="ratio ratio-4x3">
// //                     <img
// //                       src={getImgURL(item.images?.[0])}
// //                       className="object-fit-cover w-100 h-100"
// //                       alt=""
// //                     />
// //                   </div>
// //                   <div
// //                     className="position-absolute bg-white shadow-sm px-2 py-1 rounded-2"
// //                     style={{ top: "10px", left: "10px" }}>
// //                     <span
// //                       className="fw-bold small"
// //                       style={{ color: "#002147" }}>
// //                       ${item.items?.[0]?.price || 0}
// //                     </span>
// //                   </div>
// //                 </div>
// //                 <div className="card-body p-4">
// //                   <small
// //                     className="text-uppercase fw-bold mb-1"
// //                     style={{ color: "#7b92a6", fontSize: "10px" }}>
// //                     {item.categoryId?.name}
// //                   </small>
// //                   <h6 className="fw-bold mb-2" style={{ color: "#002147" }}>
// //                     {item.title}
// //                   </h6>
// //                   <p className="text-muted small mb-0 d-flex align-items-center gap-1">
// //                     <MapPin size={14} className="text-danger" /> {item.address}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* REVIEW POPUP MODAL */}
// //       {showModal && (
// //         <div
// //           className="modal d-block"
// //           style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
// //           <div className="modal-dialog modal-dialog-centered">
// //             <div className="modal-content border-0 rounded-4 shadow-lg">
// //               <div className="modal-header border-0 pb-0">
// //                 <h5 className="modal-title fw-bold">Leave a Review</h5>
// //                 <button
// //                   type="button"
// //                   className="btn-close"
// //                   onClick={() => setShowModal(false)}></button>
// //               </div>
// //               <form onSubmit={handleReviewSubmit}>
// //                 <div className="modal-body pt-3">
// //                   <div className="mb-3">
// //                     <label className="form-label small fw-bold text-muted">
// //                       Rating
// //                     </label>
// //                     <div className="d-flex gap-2">
// //                       {[1, 2, 3, 4, 5].map((num) => (
// //                         <Star
// //                           key={num}
// //                           size={24}
// //                           className="cursor-pointer"
// //                           fill={num <= rating ? "#ffc107" : "none"}
// //                           stroke={num <= rating ? "#ffc107" : "#ccc"}
// //                           onClick={() => setRating(num)}
// //                         />
// //                       ))}
// //                     </div>
// //                   </div>
// //                   <div className="mb-3">
// //                     <label className="form-label small fw-bold text-muted">
// //                       Your Message
// //                     </label>
// //                     <textarea
// //                       className="form-control rounded-3"
// //                       rows="4"
// //                       placeholder="How was your experience?"
// //                       value={reviewText}
// //                       onChange={(e) => setReviewText(e.target.value)}
// //                       required></textarea>
// //                   </div>
// //                 </div>
// //                 <div className="modal-footer border-0">
// //                   <button
// //                     type="button"
// //                     className="btn btn-light rounded-pill px-4"
// //                     onClick={() => setShowModal(false)}>
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     className="btn btn-danger rounded-pill px-4"
// //                     disabled={submitting}>
// //                     {submitting ? "Posting..." : "Post Review"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };
// // export default BusinessDetailsUI;

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import {
//   Navigation,
//   MapPin,
//   Layers,
//   Star,
//   MessageSquare,
//   Heart,
// } from "lucide-react";
// import { addRatingAPI } from "../services/authService"; // Using your Add Rating API
// import { getUser } from "../utils/storage";
// import { toast } from "react-toastify";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Marker Fix
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// let DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// function ChangeView({ center }) {
//   const map = useMap();
//   map.setView(center, 14);
//   return null;
// }

// const BusinessDetailsUI = ({
//   listing,
//   nearby,
//   favorites,
//   handleBookmark,
//   navigate,
//   slugify,
//   getImgURL,
//   ratingCount,
//   refreshData,
// }) => {
//   const [coords, setCoords] = useState([22.7196, 75.8577]);
//   const [showModal, setShowModal] = useState(false);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const currentUser = getUser();

//   // Map Geocoding
//   useEffect(() => {
//     if (listing?.address) {
//       fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`,
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           if (data && data.length > 0)
//             setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
//         });
//     }
//   }, [listing.address]);

//   const handleRatingSubmit = async (e) => {
//     e.preventDefault();
//     if (!currentUser) return toast.error("Please login to submit a rating");

//     setSubmitting(true);
//     try {
//       const data = {
//         userId: currentUser._id || currentUser.id,
//         itemId: listing._id,
//         rating: rating,
//         comment: comment,
//       };
//       const res = await addRatingAPI(data);
//       if (res.status) {
//         toast.success("Thank you for your rating!");
//         setShowModal(false);
//         setComment("");
//         refreshData();
//       }
//     } catch (err) {
//       toast.error("Rating submission failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       {/* REVIEW HEADER */}
//       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center flex-wrap gap-3">
//         <div>
//           <h5 className="fw-bold mb-1" style={{ color: "#002147" }}>
//             Business Reviews
//           </h5>
//           <p className="text-muted small m-0 d-flex align-items-center gap-1">
//             <MessageSquare size={14} /> {ratingCount} People rated this business
//           </p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
//           Rate & Review
//         </button>
//       </div>

//       {/* DYNAMIC CATEGORY & PRICE BOX */}
//       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//         <div className="d-flex justify-content-between align-items-center">
//           <div className="d-inline-flex align-items-center gap-2 border rounded-3 px-3 py-2 border-danger-subtle bg-light">
//             <Layers size={18} className="text-danger" />
//             <span className="fw-bold small">{listing.categoryId?.name}</span>
//           </div>
//           <div className="text-end">
//             <small className="text-muted d-block">Starting Price</small>
//             <h4 className="fw-bold m-0" style={{ color: "#002147" }}>
//               ${listing.items?.[0]?.price || 0}
//             </h4>
//           </div>
//         </div>
//       </div>

//       {/* MAP SECTION */}
//       <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//         <h5 className="fw-bold mb-3" style={{ color: "#002147" }}>
//           Location
//         </h5>
//         <div
//           className="rounded-3 overflow-hidden border shadow-sm"
//           style={{ height: "350px" }}>
//           <MapContainer
//             center={coords}
//             zoom={13}
//             style={{ height: "100%", width: "100%" }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <ChangeView center={coords} />
//             <Marker position={coords} icon={DefaultIcon}>
//               <Popup>{listing.title}</Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       </div>

//       {/* NEARBY LISTINGS UI MATCH */}
//       <div className="mt-5">
//         <h4
//           className="fw-bold mb-4 border-bottom pb-3"
//           style={{ color: "#002147" }}>
//           Other Businesses Nearby
//         </h4>
//         <div className="row g-4">
//           {nearby.map((item) => {
//             const isFavorited = favorites.some(
//               (fav) =>
//                 (typeof fav.itemId === "object"
//                   ? fav.itemId._id
//                   : fav.itemId) === item._id,
//             );
//             return (
//               <div key={item._id} className="col-md-6">
//                 <div
//                   className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden border bg-white"
//                   onClick={() => navigate(`/browse/${slugify(item.title)}`)}
//                   style={{ cursor: "pointer" }}>
//                   <div className="position-relative">
//                     <div className="ratio ratio-4x3">
//                       <img
//                         src={getImgURL(item.images?.[0])}
//                         className="object-fit-cover w-100 h-100"
//                         alt=""
//                       />
//                     </div>
//                     <div
//                       className="position-absolute bg-white shadow-sm d-flex align-items-center justify-content-center"
//                       style={{
//                         top: "12px",
//                         left: "12px",
//                         minWidth: "45px",
//                         height: "35px",
//                         borderRadius: "8px",
//                         zIndex: 10,
//                         padding: "0 8px",
//                       }}>
//                       <span
//                         className="fw-bold"
//                         style={{ color: "#002147", fontSize: "14px" }}>
//                         ${item.items?.[0]?.price || 0}
//                       </span>
//                     </div>
//                     <button
//                       className="position-absolute btn shadow-sm d-flex align-items-center justify-content-center"
//                       style={{
//                         top: "12px",
//                         right: "12px",
//                         width: "60px",
//                         height: "32px",
//                         borderRadius: "20px",
//                         backgroundColor: "white",
//                         zIndex: 10,
//                       }}
//                       onClick={(e) => handleBookmark(e, item)}>
//                       <Heart
//                         size={18}
//                         fill={isFavorited ? "#ff4d4d" : "none"}
//                         color="#ff4d4d"
//                       />
//                     </button>
//                   </div>
//                   <div className="card-body p-4">
//                     <small
//                       className="text-uppercase fw-bold mb-1"
//                       style={{ color: "#7b92a6", fontSize: "11px" }}>
//                       {item.categoryId?.name}
//                     </small>
//                     <h6 className="fw-bold mb-2" style={{ color: "#002147" }}>
//                       {item.title}
//                     </h6>
//                     <p className="text-muted small mb-0 d-flex align-items-center gap-1">
//                       <MapPin size={14} className="text-danger" />{" "}
//                       {item.address}
//                     </p>
//                     <div className="mt-3 d-flex justify-content-end">
//                       <div className="p-2 border rounded-3 bg-light">
//                         <Navigation size={18} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* RATING MODAL POPUP */}
//       {showModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content border-0 rounded-4 shadow-lg p-3">
//               <div className="modal-header border-0 pb-0 d-flex justify-content-between">
//                 <h5 className="modal-title fw-bold">Rate this Business</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}></button>
//               </div>
//               <form onSubmit={handleRatingSubmit}>
//                 <div className="modal-body">
//                   <p className="small text-muted mb-3">
//                     How was your experience with {listing.title}?
//                   </p>
//                   <div className="mb-4 text-center">
//                     <div className="d-flex justify-content-center gap-2">
//                       {[1, 2, 3, 4, 5].map((num) => (
//                         <Star
//                           key={num}
//                           size={32}
//                           className="cursor-pointer"
//                           fill={num <= rating ? "#ffc107" : "none"}
//                           stroke={num <= rating ? "#ffc107" : "#ccc"}
//                           onClick={() => setRating(num)}
//                         />
//                       ))}
//                     </div>
//                     <span className="fw-bold mt-2 d-block text-warning">
//                       {rating} / 5
//                     </span>
//                   </div>
//                   <div className="mb-3">
//                     <textarea
//                       className="form-control rounded-3 border-light-subtle bg-light"
//                       rows="4"
//                       placeholder="Write your feedback..."
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                       required></textarea>
//                   </div>
//                 </div>
//                 <div className="modal-footer border-0 pt-0">
//                   <button
//                     type="button"
//                     className="btn btn-light rounded-pill px-4"
//                     onClick={() => setShowModal(false)}>
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn btn-danger rounded-pill px-4 fw-bold"
//                     disabled={submitting}>
//                     {submitting ? "Submitting..." : "Submit Rating"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default BusinessDetailsUI;

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Navigation, MapPin, Layers, Star, MessageSquare, Heart, Calendar } from "lucide-react";
import { addRatingAPI } from "../services/authService";
import { getUser } from "../utils/storage";
import { toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Marker Fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

const BusinessDetailsUI = ({ listing, nearby, favorites, handleBookmark, navigate, slugify, getImgURL, listingRatings, refreshData }) => {
  const [coords, setCoords] = useState([22.7196, 75.8577]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false); // FOR REVIEW LIST
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentUser = getUser();

  useEffect(() => {
    if (listing?.address) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`)
        .then(res => res.json()).then(data => {
          if (data && data.length > 0) setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        });
    }
  }, [listing.address]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return toast.error("Please login to submit a rating");
    setSubmitting(true);
    try {
      const res = await addRatingAPI({ userId: currentUser._id || currentUser.id, itemId: listing._id, rating, comment });
      if (res.status) {
        toast.success("Rating submitted!");
        setShowAddModal(false);
        setComment("");
        refreshData();
      }
    } catch (err) { toast.error("Failed"); } finally { setSubmitting(false); }
  };

  return (
    <div>
      {/* REVIEW HEADER ACTIONS */}
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div style={{ cursor: 'pointer' }} onClick={() => setShowListModal(true)}>
           <h5 className="fw-bold mb-1" style={{ color: '#002147' }}>Business Reviews</h5>
           <p className="text-muted small m-0 d-flex align-items-center gap-1 text-decoration-underline">
             <MessageSquare size={14} /> View all {listingRatings.length} reviews
           </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
          Write a Review
        </button>
      </div>

      {/* PRICE & CATEGORY */}
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border d-flex justify-content-between align-items-center">
        <div className="d-inline-flex align-items-center gap-2 border rounded-3 px-3 py-2 border-danger-subtle bg-light">
          <Layers size={18} className="text-danger" />
          <span className="fw-bold small">{listing.categoryId?.name}</span>
        </div>
        <div className="text-end">
          <small className="text-muted">Starting Price</small>
          <h4 className="fw-bold m-0" style={{color: '#002147'}}>${listing.items?.[0]?.price || 0}</h4>
        </div>
      </div>

      {/* MAP */}
      <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
        <h5 className="fw-bold mb-3" style={{color: '#002147'}}>Location</h5>
        <div className="rounded-3 overflow-hidden border" style={{ height: "350px" }}>
            <MapContainer center={coords} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ChangeView center={coords} />
                <Marker position={coords} icon={DefaultIcon}><Popup>{listing.title}</Popup></Marker>
            </MapContainer>
        </div>
      </div>

      {/* NEARBY LISTINGS */}
      <div className="row g-4 mt-2">
        <h4 className="fw-bold mb-4 border-bottom pb-3" style={{ color: '#002147' }}> Near by Listings</h4>
        {nearby.map((item) => (
           <div key={item._id} className="col-md-6" onClick={() => navigate(`/browse/${slugify(item.title)}`)} style={{cursor: 'pointer'}}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden border bg-white">
                <div className="position-relative">
                   <div className="ratio ratio-4x3"><img src={getImgURL(item.images?.[0])} className="object-fit-cover w-100 h-100" /></div>
                   <div className="position-absolute bg-white px-2 py-1 rounded-2 shadow-sm" style={{ top: '10px', left: '10px' }}>
                      <span className="fw-bold small" style={{ color: '#002147' }}>${item.items?.[0]?.price || 0}</span>
                   </div>
                </div>
                <div className="card-body p-4">
                   <small className="text-uppercase fw-bold mb-1" style={{ color: '#7b92a6', fontSize: '11px' }}>{item.categoryId?.name}</small>
                   <h6 className="fw-bold mb-1" style={{ color: '#002147' }}>{item.title}</h6>
                   <p className="text-muted small mb-0 d-flex align-items-center gap-1"><MapPin size={14} className="text-danger" /> {item.address}</p>
                </div>
              </div>
           </div>
        ))}
      </div>

      {/* POPUP 1: WRITE A REVIEW */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg p-3">
              <div className="modal-header border-0 pb-0 d-flex justify-content-between align-items-center">
                <h5 className="modal-title fw-bold">Write a Review</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleRatingSubmit}>
                <div className="modal-body text-center">
                  <div className="d-flex justify-content-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star key={num} size={32} className="cursor-pointer" fill={num <= rating ? "#ffc107" : "none"} stroke={num <= rating ? "#ffc107" : "#ccc"} onClick={() => setRating(num)} />
                    ))}
                  </div>
                  <textarea className="form-control rounded-3 bg-light" rows="4" placeholder="Your feedback..." value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-danger rounded-pill px-4 fw-bold" disabled={submitting}>{submitting ? "..." : "Submit"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 2: VIEW ALL REVIEWS LIST */}
      {showListModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-lg p-3">
              <div className="modal-header border-0 pb-0 d-flex justify-content-between align-items-center">
                <h5 className="modal-title fw-bold">Customer Reviews ({listingRatings.length})</h5>
                <button type="button" className="btn-close" onClick={() => setShowListModal(false)}></button>
              </div>
              <div className="modal-body overflow-auto" style={{ maxHeight: '450px' }}>
                {listingRatings.length > 0 ? (
                  listingRatings.map((rev) => (
                    <div key={rev._id} className="p-3 border rounded-3 mb-3 bg-light">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="d-flex gap-1 mb-2">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={14} fill={i < rev.rating ? "#ffc107" : "none"} stroke={i < rev.rating ? "#ffc107" : "#ccc"} />
                           ))}
                        </div>
                        <small className="text-muted d-flex align-items-center gap-1">
                          <Calendar size={12}/> {new Date(rev.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="m-0 fw-bold small text-navy mb-1">Comment:</p>
                      <p className="m-0 small text-muted italic">"{rev.comment || 'No comment provided'}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4 text-muted">No reviews yet for this business.</p>
                )}
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-navy w-100 rounded-pill py-2" onClick={() => setShowListModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BusinessDetailsUI;