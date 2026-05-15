// "use client";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getBannerAPI,
//   getImgURL,
//   getCategoriesAPI,
//   getSubCategoriesAPI,
//   getAllListingsApi,
// } from "../../services/authService";

// export default function Banner() {
//   const navigate = useNavigate();
//   const menuRef = useRef(null);

//   // API Data
//   const [bannerSlider, setBannerSlider] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [allSubCategories, setAllSubCategories] = useState([]);
//   const [listings, setListings] = useState([]);

//   // UI States
//   const [showCatMenu, setShowCatMenu] = useState(false);
//   const [currentLevel, setCurrentLevel] = useState("main"); // "main" or "sub"
//   const [filteredSubCats, setFilteredSubCats] = useState([]);
//   const [selectedLabel, setSelectedLabel] = useState("All Categories");
//   const [searchQuery, setSearchQuery] = useState("");

//   const slugify = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-")
//       .replace(/^-+|-+$/g, "");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [bannerRes, catRes, subRes, listRes] = await Promise.all([
//           getBannerAPI(),
//           getCategoriesAPI(),
//           getSubCategoriesAPI(),
//           getAllListingsApi(),
//         ]);

//         if (bannerRes?.homeBanner) setBannerSlider(bannerRes.homeBanner);
//         if (catRes?.success) setCategories(catRes.categories || []);

//         // Data structure fix for Array(11)
//         if (subRes?.success) {
//           console.log("Full Subcategory Data:", subRes.data);
//           setAllSubCategories(subRes.data || []);
//         }

//         if (listRes?.listings) setListings(listRes.listings);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//       }
//     };
//     fetchData();

//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowCatMenu(false);
//         setCurrentLevel("main");
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- LOGIC: CATEGORY CLICK ---
//   const handleCategoryClick = (e, cat) => {
//     e.preventDefault();
//     e.stopPropagation();

//     console.log("Clicked Category ID:", cat._id);

//     // Aapke structure ke hisaab se: item.categoryId._id
//     const match = allSubCategories.find((item) => {
//       return item.categoryId?._id === cat._id;
//     });

//     if (match && match.subcategories && match.subcategories.length > 0) {
//       console.log("Subcategories Found:", match.subcategories);
//       setFilteredSubCats(match.subcategories);
//       setCurrentLevel("sub"); // Show sub-menu
//     } else {
//       console.warn("No Subcategories matched for this ID");
//       setFilteredSubCats([]);
//       setSelectedLabel(cat.name);
//       setShowCatMenu(false);
//     }
//   };

//   const handleSubCategoryClick = (e, sub) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setSelectedLabel(sub.subcategoryName);
//     setShowCatMenu(false);
//     setCurrentLevel("main");
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       const found = listings.find((l) =>
//         l.title.toLowerCase().includes(searchQuery.toLowerCase()),
//       );
//       if (found) return navigate(`/browse/${slugify(found.title)}`);
//     }
//     let url = "/browse?";
//     if (searchQuery) url += `search=${searchQuery}&`;
//     if (selectedLabel !== "All Categories") url += `category=${selectedLabel}`;
//     navigate(url);
//   };

//   return (
//     <div
//       id="umaHero"
//       className="carousel slide carousel-fade"
//       data-bs-ride="carousel">
//       <div className="carousel-inner">
//         {bannerSlider.map((slide, index) => (
//           <div
//             key={index}
//             className={`carousel-item ${index === 0 ? "active" : ""}`}>
//             <div
//               className="uma-banner d-flex align-items-center justify-content-center"
//               style={{
//                 backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${getImgURL(slide.bannerImage)})`,
//                 minHeight: "85vh",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}>
//               <div className="container text-center text-white">
//                 <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
//                 <p
//                   className="lead mb-5 opacity-90 mx-auto"
//                   style={{ maxWidth: "800px" }}>
//                   {slide.content}
//                 </p>

//                 {/* SEARCH BAR */}
//                 <div
//                   className="search-wrapper bg-white rounded-pill shadow-lg mx-auto d-flex align-items-center p-2 mb-4"
//                   style={{ maxWidth: "1000px" }}>
//                   <input
//                     type="text"
//                     className="form-control border-0 bg-transparent flex-grow-1 px-4 shadow-none text-dark"
//                     placeholder="Search for listings..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />

//                   <div
//                     className="vr mx-2 text-muted opacity-25 d-none d-md-block"
//                     style={{
//                       width: "1px",
//                       height: "35px",
//                       background: "#eee",
//                     }}></div>

//                   {/* DROPDOWN MENU */}
//                   <div
//                     className="position-relative flex-grow-1 text-start"
//                     ref={menuRef}>
//                     <div
//                       className="px-3 py-2 text-dark cursor-pointer d-flex justify-content-between align-items-center"
//                       onClick={() => {
//                         setShowCatMenu(!showCatMenu);
//                         setCurrentLevel("main");
//                       }}>
//                       <span
//                         className="text-truncate fw-bold"
//                         style={{ color: "#333" }}>
//                         {selectedLabel}
//                       </span>
//                       <i
//                         className={`bi bi-chevron-${showCatMenu ? "up" : "down"} small ms-2`}></i>
//                     </div>

//                     {showCatMenu && (
//                       <div className="category-dropdown shadow-lg rounded-4 position-absolute mt-3 bg-white overflow-hidden">
//                         <div className="px-4 pt-3 pb-2 border-bottom">
//                           <span
//                             className="fw-bold small text-muted text-uppercase"
//                             style={{ letterSpacing: "1px" }}>
//                             {currentLevel === "main"
//                               ? "Main Categories"
//                               : "Sub Categories"}
//                           </span>
//                         </div>

//                         <div className="menu-list">
//                           {currentLevel === "main" ? (
//                             categories.map((cat) => (
//                               <div
//                                 key={cat._id}
//                                 className="cat-item cursor-pointer"
//                                 onClick={(e) => handleCategoryClick(e, cat)}>
//                                 <span>{cat.name}</span>
//                                 <i className="bi bi-chevron-right small opacity-50"></i>
//                               </div>
//                             ))
//                           ) : (
//                             <>
//                               <div
//                                 className="back-btn cursor-pointer d-flex align-items-center"
//                                 onClick={() => setCurrentLevel("main")}>
//                                 <i className="bi bi-arrow-left-short fs-5 me-2"></i>
//                                 Back to Categories
//                               </div>
//                               {filteredSubCats.map((sub) => (
//                                 <div
//                                   key={sub._id}
//                                   className="cat-item cursor-pointer"
//                                   onClick={(e) =>
//                                     handleSubCategoryClick(e, sub)
//                                   }>
//                                   {sub.subcategoryName}
//                                 </div>
//                               ))}
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     className="btn btn-danger rounded-pill px-5 py-2 fw-bold ms-md-2"
//                     style={{ backgroundColor: "#c98a46", border: "none" }}
//                     onClick={handleSearch}>
//                     Search
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style>
//         {`
//         .cursor-pointer { cursor: pointer; }
//         .category-dropdown {
//           width: 320px; left: 0; top: calc(100% + 10px); z-index: 9999;
//           border: 1px solid rgba(0,0,0,0.1); background: #fff;
//         }
//         .menu-list { max-height: 320px; overflow-y: auto; }

//         /* SCROLLBAR STYLE */
//         .menu-list::-webkit-scrollbar { width: 6px; }
//         .menu-list::-webkit-scrollbar-track { background: #f1f1f1; }
//         .menu-list::-webkit-scrollbar-thumb { background: #c98a46; border-radius: 10px; }

//         .cat-item {
//           padding: 14px 24px; font-size: 14px; color: #333;
//           display: flex; justify-content: space-between; align-items: center;
//           font-weight: 500; transition: all 0.2s; border-bottom: 1px solid rgba(0,0,0,0.03);
//         }
//         .cat-item:hover { background: #fff5f2; color: #c98a46; padding-left: 30px; cursor: pointer; }

//         .back-btn {
//           background: #f8f9fa; color: #0d6efd; padding: 12px 24px;
//           font-size: 14px; font-weight: 600; border-bottom: 1px solid #eee;
//           position: sticky; top: 0; z-index: 10; cursor: pointer;
//         }
//         @media (max-width: 768px) {
//           .category-dropdown { position: fixed; bottom: 0; left: 0; width: 100%; top: auto; border-radius: 24px 24px 0 0 !important; }
//         }
//         `}
//       </style>
//     </div>
//   );
// }

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getBannerAPI,
//   getImgURL,
//   getCategoriesAPI,
//   getSubCategoriesAPI,
// } from "../../services/authService";

// export default function Banner() {
//   const navigate = useNavigate();
//   const menuRef = useRef(null);

//   const [bannerSlider, setBannerSlider] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [allSubCategories, setAllSubCategories] = useState([]);

//   const [showCatMenu, setShowCatMenu] = useState(false);
//   const [currentLevel, setCurrentLevel] = useState("main");
//   const [filteredSubCats, setFilteredSubCats] = useState([]);
//   const [selectedLabel, setSelectedLabel] = useState("All Categories");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [locationQuery, setLocationQuery] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [bannerRes, catRes, subRes] = await Promise.all([
//           getBannerAPI(),
//           getCategoriesAPI(),
//           getSubCategoriesAPI(),
//         ]);
//         if (bannerRes?.homeBanner) setBannerSlider(bannerRes.homeBanner);
//         if (catRes?.success) setCategories(catRes.categories || []);
//         if (subRes?.success)
//           setAllSubCategories(subRes.data || subRes.subcategories || []);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//       }
//     };
//     fetchData();

//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowCatMenu(false);
//         setCurrentLevel("main");
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleCategoryClick = (e, cat) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const subs = allSubCategories.filter(
//       (item) => (item.categoryId?._id || item.categoryId) === cat._id,
//     );
//     if (subs.length > 0) {
//       setFilteredSubCats(subs);
//       setCurrentLevel("sub");
//     } else {
//       setSelectedLabel(cat.name);
//       setShowCatMenu(false);
//     }
//   };

//   const handleSearch = () => {
//     let url = "/browse?";
//     if (searchQuery) url += `search=${searchQuery}&`;
//     if (locationQuery) url += `location=${locationQuery}&`;
//     if (selectedLabel !== "All Categories") url += `category=${selectedLabel}`;
//     navigate(url);
//   };

//   // Helper to pick icons for the featured section
//   const getIcon = (name) => {
//     const n = name.toLowerCase();
//     if (n.includes("bike") || n.includes("motor")) return "bi-bicycle";
//     if (n.includes("car")) return "bi-car-front";
//     if (n.includes("business") || n.includes("shop")) return "bi-shop";
//     return "bi-grid-fill";
//   };

//   return (
//     <div
//       id="umaHero"
//       className="carousel slide carousel-fade"
//       data-bs-ride="carousel">
//       <div className="carousel-inner">
//         {bannerSlider.map((slide, index) => (
//           <div
//             key={index}
//             className={`carousel-item ${index === 0 ? "active" : ""}`}>
//             <div
//               className="d-flex align-items-center justify-content-center"
//               style={{
//                 backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${getImgURL(slide.bannerImage)})`,
//                 minHeight: "85vh",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}>
//               <div className="container text-center text-white">
//                 <h1 className="display-4 fw-bold mb-4 mb-lg-5">
//                   {slide.title}
//                 </h1>

//                 {/* SEARCH BAR CONTAINER */}
//                 <div
//                   className="bg-white rounded-pill-lg rounded-5 shadow-lg mx-auto d-flex flex-column flex-lg-row align-items-center p-2 p-lg-3 mb-5"
//                   style={{ maxWidth: "1000px" }}>
//                   {/* Keyword */}
//                   <div className="w-100 border-bottom border-lg-0 border-end-lg px-3 py-1">
//                     <input
//                       type="text"
//                       className="form-control border-0 bg-transparent shadow-none text-dark"
//                       placeholder="What are you looking for?"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                   </div>

//                   {/* Location */}
//                   <div className="w-100 border-bottom border-lg-0 border-end-lg px-3 py-1 d-flex align-items-center">
//                     <input
//                       type="text"
//                       className="form-control border-0 bg-transparent shadow-none text-dark"
//                       placeholder="Location"
//                       value={locationQuery}
//                       onChange={(e) => setLocationQuery(e.target.value)}
//                     />
//                     <i className="bi bi-geo-alt text-muted ms-2"></i>
//                   </div>

//                   {/* Category Dropdown */}
//                   <div
//                     className="w-100 px-3 py-1 position-relative text-start"
//                     ref={menuRef}>
//                     <div
//                       className="d-flex justify-content-between align-items-center py-2"
//                       style={{ cursor: "pointer" }}
//                       onClick={() => setShowCatMenu(!showCatMenu)}>
//                       <span className="text-muted text-truncate">
//                         {selectedLabel}
//                       </span>
//                       <i className="bi bi-chevron-down small text-muted ms-2"></i>
//                     </div>

//                     {showCatMenu && (
//                       <div
//                         className="position-absolute bg-white shadow-lg rounded-4 overflow-hidden"
//                         style={{
//                           width: "280px",
//                           left: "0",
//                           top: "100%",
//                           zIndex: 1000,
//                           border: "1px solid #eee",
//                         }}>
//                         <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//                           {currentLevel === "main" ? (
//                             categories.map((cat) => (
//                               <div
//                                 key={cat._id}
//                                 className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom text-dark"
//                                 style={{ cursor: "pointer", fontSize: "14px" }}
//                                 onClick={(e) => handleCategoryClick(e, cat)}>
//                                 {cat.name}{" "}
//                                 <i className="bi bi-chevron-right small opacity-50"></i>
//                               </div>
//                             ))
//                           ) : (
//                             <>
//                               <div
//                                 className="bg-light p-3 fw-bold text-danger border-bottom d-flex align-items-center"
//                                 style={{ cursor: "pointer", fontSize: "13px" }}
//                                 onClick={() => setCurrentLevel("main")}>
//                                 <i className="bi bi-arrow-left-circle-fill me-2"></i>{" "}
//                                 Back to Categories
//                               </div>
//                               {filteredSubCats.map((sub) => (
//                                 <div
//                                   key={sub._id}
//                                   className="px-4 py-3 border-bottom text-dark"
//                                   style={{
//                                     cursor: "pointer",
//                                     fontSize: "14px",
//                                   }}
//                                   onClick={() => {
//                                     setSelectedLabel(sub.subcategoryName);
//                                     setShowCatMenu(false);
//                                   }}>
//                                   {sub.subcategoryName}
//                                 </div>
//                               ))}
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Red Search Button */}
//                   <button
//                     className="btn w-100 w-lg-auto rounded-pill px-5 py-2 fw-bold mt-2 mt-lg-0 shadow-sm text-white"
//                     style={{ backgroundColor: "#ff2d55", border: "none" }}
//                     onClick={handleSearch}>
//                     Search
//                   </button>
//                 </div>

//                 {/* OR BROWSE FEATURED SECTION */}
//                 <div className="mt-5">
//                   <p className="mb-4 fs-5 fw-normal opacity-75">
//                     Or browse featured categories:
//                   </p>
//                   <div className="d-flex flex-wrap justify-content-center gap-3">
//                     {categories.slice(0, 3).map((cat) => (
//                       <div
//                         key={cat._id}
//                         onClick={() => {
//                           setSelectedLabel(cat.name);
//                           handleSearch();
//                         }}
//                         className="d-flex align-items-center gap-3 px-4 py-2 rounded-pill shadow-sm"
//                         style={{
//                           backgroundColor: "rgba(0,0,0,0.6)",
//                           backdropFilter: "blur(5px)",
//                           border: "1px solid rgba(255,255,255,0.1)",
//                           cursor: "pointer",
//                         }}>
//                         <i
//                           className={`bi ${getIcon(cat.name)} fs-4 text-white`}></i>
//                         <span className="text-white fw-normal">{cat.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBannerAPI,
  getImgURL,
  getCategoriesAPI,
  getSubCategoriesAPI,
} from "../../services/authService";

export default function Banner() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const locationInputRef = useRef(null); // Ref for Google Autocomplete

  const [bannerSlider, setBannerSlider] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);

  const [showCatMenu, setShowCatMenu] = useState(false);
  const [currentLevel, setCurrentLevel] = useState("main");
  const [activeCategory, setActiveCategory] = useState(null); // Track parent
  const [filteredSubCats, setFilteredSubCats] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerRes, catRes, subRes] = await Promise.all([
          getBannerAPI(),
          getCategoriesAPI(),
          getSubCategoriesAPI(),
        ]);
        if (bannerRes?.homeBanner) setBannerSlider(bannerRes.homeBanner);
        if (catRes?.success) setCategories(catRes.categories || []);
        if (subRes?.success)
          setAllSubCategories(subRes.data || subRes.subcategories || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchData();
    initGoogleAutocomplete();
    fetchCurrentLocation(); // Auto-fetch on load

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowCatMenu(false);
        setCurrentLevel("main");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- GOOGLE PLACES LOGIC ---
  const initGoogleAutocomplete = () => {
    if (!window.google) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      locationInputRef.current,
      {
        types: ["(cities)"],
      },
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setLocationQuery(place.formatted_address);
      }
    });
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`,
          );
          const data = await response.json();
          if (data.results[0]) {
            setLocationQuery(data.results[0].formatted_address);
          }
        } catch (err) {
          console.error("Reverse Geocoding failed", err);
        }
      });
    }
  };

  // --- CATEGORY LOGIC ---
  const handleCategoryClick = (e, cat) => {
    e.preventDefault();
    e.stopPropagation();
    const subs = allSubCategories.filter(
      (item) => (item.categoryId?._id || item.categoryId) === cat._id,
    );
    setActiveCategory(cat);
    setFilteredSubCats(subs);
    setCurrentLevel("sub"); // Always show sub-menu to allow selection
  };

  const selectCategoryAndClose = (label) => {
    setSelectedLabel(label);
    setShowCatMenu(false);
    setCurrentLevel("main");
  };

  const handleSearch = () => {
    let url = "/browse?";
    if (searchQuery) url += `search=${searchQuery}&`;
    if (locationQuery) url += `location=${locationQuery}&`;
    if (selectedLabel !== "All Categories") url += `category=${selectedLabel}`;
    navigate(url);
  };

  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes("bike")) return "bi-bicycle";
    if (n.includes("business")) return "bi-shop";
    return "bi-grid-fill";
  };

  return (
    <div
      id="umaHero"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel">
      <div className="carousel-inner">
        {bannerSlider.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${getImgURL(slide.bannerImage)})`,
                minHeight: "85vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              <div className="container text-center text-white">
                <h1 className="display-4 fw-bold mb-4 mb-lg-5">
                  {slide.title}
                </h1>

                <div
                  className="bg-white rounded-5 shadow-lg mx-auto d-flex flex-column flex-lg-row align-items-center p-2"
                  style={{ maxWidth: "1000px" }}>
                  {/* Keyword */}
                  <div className="w-100 border-end-lg px-3 py-1">
                    <input
                      type="text"
                      className="form-control border-0 bg-transparent shadow-none text-dark"
                      placeholder="What are you looking for?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Location Input with Ref */}
                  <div className="w-100 border-end-lg px-3 py-1 d-flex align-items-center">
                    <input
                      ref={locationInputRef}
                      type="text"
                      className="form-control border-0 bg-transparent shadow-none text-dark"
                      placeholder="Indore, type and hit enter"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                    />
                    <i className="bi bi-geo-alt text-muted ms-2"></i>
                  </div>

                  {/* Category Dropdown */}
                  <div
                    className="w-100 px-3 py-1 position-relative text-start"
                    ref={menuRef}>
                    <div
                      className="d-flex justify-content-between align-items-center py-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowCatMenu(!showCatMenu)}>
                      <span className="text-muted text-truncate fw-bold">
                        {selectedLabel}
                      </span>
                      <i className="bi bi-chevron-down small text-muted"></i>
                    </div>

                    {showCatMenu && (
                      <div
                        className="position-absolute bg-white shadow-lg rounded-4 overflow-hidden"
                        style={{
                          width: "300px",
                          left: "0",
                          top: "110%",
                          zIndex: 1000,
                          border: "1px solid #eee",
                        }}>
                        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                          {currentLevel === "main" ? (
                            categories.map((cat) => (
                              <div
                                key={cat._id}
                                className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom text-dark hover-bg-light"
                                style={{ cursor: "pointer", fontSize: "14px" }}
                                onClick={(e) => handleCategoryClick(e, cat)}>
                                {cat.name}
                                <i className="bi bi-chevron-right small opacity-50"></i>
                              </div>
                            ))
                          ) : (
                            <>
                              <div
                                className="bg-light p-3 fw-bold text-dark border-bottom d-flex align-items-center"
                                style={{ cursor: "pointer", fontSize: "13px" }}
                                onClick={() => setCurrentLevel("main")}>
                                <i className="bi bi-arrow-left me-2"></i> Back
                                to All Categories
                              </div>
                              {/* Option to select the Parent Category itself */}
                              <div
                                className="px-4 py-3 border-bottom text-primary fw-bold"
                                style={{
                                  cursor: "pointer",
                                  fontSize: "14px",
                                  backgroundColor: "#f8f9ff",
                                }}
                                onClick={() =>
                                  selectCategoryAndClose(activeCategory.name)
                                }>
                                Select All in {activeCategory.name}
                              </div>
                              {filteredSubCats.map((sub) => (
                                <div
                                  key={sub._id}
                                  className="px-4 py-3 border-bottom text-dark"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "14px",
                                  }}
                                  onClick={() =>
                                    selectCategoryAndClose(sub.subcategoryName)
                                  }>
                                  {sub.subcategoryName}
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    className="btn rounded-pill px-5 py-3 fw-bold text-white"
                    style={{ backgroundColor: "#ff2d55", border: "none" }}
                    onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}