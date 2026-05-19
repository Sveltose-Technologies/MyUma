// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   MapPin,
// //   ChevronDown,
// //   ArrowLeft,
// //   X,
// //   Briefcase,
// //   Search,
// //   Star,
// // } from "lucide-react";
// // import {
// //   getCategoriesAPI, // Using main category API for badges
// //   getAllListingsApi,
// //   getAllSubCategoriesApi, // Kept for the dropdown logic
// // } from "../services/authService";

// // const HomeSearchBar = () => {
// //   const navigate = useNavigate();
// //   const [categoriesData, setCategoriesData] = useState([]);
// //   const [dropdownData, setDropdownData] = useState([]); // For the nested menu
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [currentView, setCurrentView] = useState("categories");
// //   const [activeCategory, setActiveCategory] = useState(null);

// //   const [searchState, setSearchState] = useState({
// //     keyword: "",
// //     location: "",
// //     category: "All Categories",
// //   });

// //   const slugify = (text) =>
// //     text
// //       ? text
// //           .toLowerCase()
// //           .trim()
// //           .replace(/[^\w\s-]/g, "")
// //           .replace(/[\s_-]+/g, "-")
// //           .replace(/^-+|-+$/g, "")
// //       : "";

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         // 1. Fetch Main Categories for the Badges
// //         const catRes = await getCategoriesAPI();
// //         if (catRes.success) {
// //           // IMPORTANT: Your JSON shows the data is in .categories
// //           setCategoriesData(catRes.categories || []);
// //         }

// //         // 2. Fetch Subcategories for the Dropdown menu
// //         const subRes = await getAllSubCategoriesApi();
// //         if (subRes.success) {
// //           setDropdownData(subRes.data || []);
// //         }
// //       } catch (err) {
// //         console.error("API Error:", err);
// //       }
// //     };
// //     loadData();
// //   }, []);

// //   // --- LOGIC FOR 3 CATEGORY BADGES ---

// //   // 1. Find "Business Directory" (Dynamic check)
// //   const businessDirObj = categoriesData.find(
// //     (cat) => cat.name?.toLowerCase() === "business directory",
// //   );

// //   // 2. Filter ONLY TRUE favoriteCategories (excluding Business Directory)
// //   const featuredBadges = categoriesData
// //     .filter((cat) => {
// //       return (
// //         cat.favoriteCategories === true &&
// //         cat.name?.toLowerCase() !== "business directory"
// //       );
// //     })
// //     .slice(-2); // Get latest 2

// //   const handleSearch = async (overrideCategory) => {
// //     try {
// //       const categoryToSearch = overrideCategory || searchState.category;
// //       const { keyword, location } = searchState;
// //       const res = await getAllListingsApi();
// //       const allListings = res?.listings || [];

// //       const directMatch = allListings.find(
// //         (item) =>
// //           item.title.toLowerCase().trim() === keyword.toLowerCase().trim(),
// //       );

// //       if (directMatch && keyword.trim() !== "") {
// //         navigate(`/browse/${slugify(directMatch.title)}`);
// //       } else {
// //         navigate("/browse", {
// //           state: {
// //             keyword: keyword,
// //             category:
// //               categoryToSearch === "All Categories" ? "All" : categoryToSearch,
// //             location: location,
// //           },
// //         });
// //       }
// //     } catch (error) {
// //       navigate("/browse");
// //     }
// //   };

// //   const selectCategoryOnly = (name) => {
// //     setSearchState({ ...searchState, category: name });
// //     setIsDropdownOpen(false);
// //   };

// //   const openSubView = (e, item) => {
// //     e.stopPropagation();
// //     if (item.subcategories?.length > 0) {
// //       setActiveCategory(item);
// //       setCurrentView("subcategories");
// //     }
// //   };

// //   const styles = {
// //     wrapper: {
// //       width: "100%",
// //       display: "flex",
// //       flexDirection: "column",
// //       alignItems: "center",
// //     },
// //     pillBar: {
// //       background: "#ffffff",
// //       borderRadius: "50px",
// //       height: "60px",
// //       display: "flex",
// //       alignItems: "center",
// //       padding: "1px",
// //       boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
// //       width: "100%",
// //       maxWidth: "1140px",
// //       border: "1px solid #eee",
// //       position: "relative",
// //     },
// //     section: {
// //       flex: 1,
// //       height: "100%",
// //       display: "flex",
// //       alignItems: "center",
// //       padding: "0 20px",
// //       position: "relative",
// //     },
// //     divider: { width: "1px", height: "40px", backgroundColor: "#eee" },
// //     input: {
// //       width: "100%",
// //       border: "none",
// //       outline: "none",
// //       fontSize: "15px",
// //       color: "#333",
// //     },
// //     searchBtn: {
// //       backgroundColor: "#ff1f4b",
// //       color: "white",
// //       border: "none",
// //       height: "50px",
// //       padding: "0 25px",
// //       borderRadius: "100px",
// //       fontWeight: "700",
// //       fontSize: "15px",
// //       cursor: "pointer",
// //       marginLeft: "10px",
// //       display: "flex",
// //       alignItems: "center",
// //       gap: "8px",
// //     },
// //     scrollContainer: {
// //       maxHeight: "300px",
// //       overflowY: "auto",
// //       textAlign: "left",
// //     },
// //   };

// //   return (
// //     <div style={styles.wrapper}>
// //       <style>{`
// //         .menu-item { padding: 12px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f8f8f8; color: #555; transition: 0.2s; }
// //         .menu-item:hover { background: #fff5f6; color: #ff1f4b; }
// //         .dropdown-box { position: absolute; top: 70px; right: 0; width: 320px; background: white; border-radius: 12px; box-shadow: 0 15px 40px rgba(0,0,0,0.2); z-index: 9999; overflow: hidden; border: 1px solid #eee; }
// //         .featured-item { background: rgba(255,255,255,0.1); color: white; padding: 10px 25px; border-radius: 50px; display: flex; align-items: center; gap: 10px; cursor: pointer; border: 1px solid rgba(255,255,255,0.2); transition: 0.3s; white-space: nowrap; }
// //         .featured-item:hover { background: #ff1f4b; transform: translateY(-3px); }
// //       `}</style>

// //       {/* Search Bar */}
// //       <div style={styles.pillBar}>
// //         <div style={styles.section}>
// //           <input
// //             type="text"
// //             placeholder="What are you looking for?"
// //             style={styles.input}
// //             value={searchState.keyword}
// //             onChange={(e) =>
// //               setSearchState({ ...searchState, keyword: e.target.value })
// //             }
// //           />
// //         </div>
// //         <div style={styles.divider}></div>
// //         <div style={styles.section}>
// //           <input
// //             type="text"
// //             placeholder="Location..."
// //             style={styles.input}
// //             value={searchState.location}
// //             onChange={(e) =>
// //               setSearchState({ ...searchState, location: e.target.value })
// //             }
// //           />
// //           <MapPin size={18} color="#ccc" />
// //         </div>
// //         <div style={styles.divider}></div>
// //         <div style={styles.section}>
// //           <div
// //             style={{
// //               ...styles.input,
// //               cursor: "pointer",
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
// //             onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
// //             <span
// //               style={{
// //                 color:
// //                   searchState.category === "All Categories" ? "#999" : "#333",
// //                 overflow: "hidden",
// //                 textOverflow: "ellipsis",
// //                 whiteSpace: "nowrap",
// //                 flex: 1,
// //               }}>
// //               {searchState.category}
// //             </span>
// //             <ChevronDown size={18} color="#ccc" />
// //           </div>
// //           <button style={styles.searchBtn} onClick={() => handleSearch()}>
// //             <Search size={18} /> SEARCH
// //           </button>

// //           {isDropdownOpen && (
// //             <div className="dropdown-box">
// //               {currentView === "categories" ? (
// //                 <div>
// //                   <div
// //                     style={{
// //                       padding: "12px 20px",
// //                       background: "#f9f9f9",
// //                       fontSize: "11px",
// //                       fontWeight: "bold",
// //                       color: "#999",
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                     }}>
// //                     CATEGORIES{" "}
// //                     <X
// //                       size={14}
// //                       style={{ cursor: "pointer" }}
// //                       onClick={() => setIsDropdownOpen(false)}
// //                     />
// //                   </div>
// //                   <div style={styles.scrollContainer}>
// //                     <div
// //                       className="menu-item"
// //                       onClick={() => selectCategoryOnly("All Categories")}>
// //                       All Categories
// //                     </div>
// //                     {dropdownData.map((item) => (
// //                       <div key={item.categoryId?._id} className="menu-item">
// //                         <div
// //                           style={{ flexGrow: 1 }}
// //                           onClick={() =>
// //                             selectCategoryOnly(item.categoryId?.name)
// //                           }>
// //                           {item.categoryId?.name}
// //                         </div>
// //                         {item.subcategories?.length > 0 && (
// //                           <div
// //                             onClick={(e) => openSubView(e, item)}
// //                             style={{ padding: "5px" }}>
// //                             <ChevronDown
// //                               size={14}
// //                               style={{ transform: "rotate(-90deg)" }}
// //                             />
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div>
// //                   <div
// //                     onClick={() => setCurrentView("categories")}
// //                     style={{
// //                       background: "#ff1f4b",
// //                       color: "white",
// //                       padding: "12px 20px",
// //                       fontWeight: "bold",
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                     }}>
// //                     <ArrowLeft size={16} style={{ marginRight: "10px" }} />{" "}
// //                     {activeCategory?.categoryId?.name}
// //                   </div>
// //                   <div style={styles.scrollContainer}>
// //                     {activeCategory?.subcategories.map((sub) => (
// //                       <div
// //                         key={sub._id}
// //                         className="menu-item"
// //                         onClick={() => {
// //                           setSearchState({
// //                             ...searchState,
// //                             category: sub.subcategoryName,
// //                           });
// //                           setIsDropdownOpen(false);
// //                           setCurrentView("categories");
// //                         }}>
// //                         {sub.subcategoryName}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* THREE CATEGORY BADGES SECTION */}
// //       <div
// //         style={{
// //           marginTop: "30px",
// //           display: "flex",
// //           gap: "15px",
// //           flexWrap: "wrap",
// //           justifyContent: "center",
// //         }}>
// //         {/* Badge 1: Business Directory */}
// //         <div
// //           className="featured-item"
// //           onClick={() =>
// //             handleSearch(
// //               businessDirObj ? businessDirObj.name : "Business Directory",
// //             )
// //           }>
// //           <Briefcase size={18} />
// //           {businessDirObj ? businessDirObj.name : "Business Directory"}
// //         </div>

// //         {/* Badges 2 & 3: Only TRUE favoriteCategories */}
// //         {featuredBadges.map((item) => (
// //           <div
// //             key={item._id}
// //             className="featured-item"
// //             onClick={() => handleSearch(item.name)}>
// //             <Star size={18} /> {item.name}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomeSearchBar;

// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   MapPin,
// //   ChevronDown,
// //   ArrowLeft,
// //   X,
// //   Briefcase,
// //   Search,
// //   Star,
// // } from "lucide-react";
// // import {
// //   getCategoriesAPI,
// //   getAllListingsApi,
// //   getAllSubCategoriesApi,
// // } from "../services/authService";

// // const HomeSearchBar = () => {
// //   const navigate = useNavigate();
// //   const [categoriesData, setCategoriesData] = useState([]);
// //   const [allListings, setAllListings] = useState([]); // All listings for suggestions
// //   const [dropdownData, setDropdownData] = useState([]);
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [currentView, setCurrentView] = useState("categories");
// //   const [activeCategory, setActiveCategory] = useState(null);

// //   // Suggestion States
// //   const [keywordSuggestions, setKeywordSuggestions] = useState([]);
// //   const [locationSuggestions, setLocationSuggestions] = useState([]);
// //   const [showKeywordSug, setShowKeywordSug] = useState(false);
// //   const [showLocationSug, setShowLocationSug] = useState(false);

// //   const [searchState, setSearchState] = useState({
// //     keyword: "",
// //     location: "",
// //     category: "All Categories",
// //   });

// //   const slugify = (text) =>
// //     text
// //       ? text
// //           .toLowerCase()
// //           .trim()
// //           .replace(/[^\w\s-]/g, "")
// //           .replace(/[\s_-]+/g, "-")
// //           .replace(/^-+|-+$/g, "")
// //       : "";

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const catRes = await getCategoriesAPI();
// //         if (catRes.success) setCategoriesData(catRes.categories || []);

// //         const subRes = await getAllSubCategoriesApi();
// //         if (subRes.success) setDropdownData(subRes.data || []);

// //         const listRes = await getAllListingsApi();
// //         if (listRes?.listings) setAllListings(listRes.listings);
// //       } catch (err) {
// //         console.error("API Error:", err);
// //       }
// //     };
// //     loadData();
// //   }, []);

// //   // --- SUGGESTION LOGIC ---
// //   const handleKeywordChange = (val) => {
// //     setSearchState({ ...searchState, keyword: val });
// //     if (val.trim().length > 0) {
// //       const matchCats = categoriesData
// //         .filter((c) => c.name.toLowerCase().includes(val.toLowerCase()))
// //         .map((c) => ({ type: "Category", name: c.name }));

// //       const matchListings = allListings
// //         .filter((l) => l.title.toLowerCase().includes(val.toLowerCase()))
// //         .map((l) => ({ type: "Listing", name: l.title }));

// //       setKeywordSuggestions([...matchCats, ...matchListings].slice(0, 8));
// //       setShowKeywordSug(true);
// //     } else {
// //       setShowKeywordSug(false);
// //     }
// //   };

// //   const handleLocationChange = (val) => {
// //     setSearchState({ ...searchState, location: val });
// //     if (val.trim().length > 0) {
// //       // Extract unique locations from listings
// //       const locations = [
// //         ...new Set(allListings.map((l) => l.address || l.location)),
// //       ];
// //       const matches = locations
// //         .filter((loc) => loc?.toLowerCase().includes(val.toLowerCase()))
// //         .slice(0, 5);
// //       setLocationSuggestions(matches);
// //       setShowLocationSug(true);
// //     } else {
// //       setShowLocationSug(false);
// //     }
// //   };

// //   const handleSearch = async (overrideCategory) => {
// //     const categoryToSearch = overrideCategory || searchState.category;
// //     const { keyword, location } = searchState;

// //     // Check if keyword is a direct listing title
// //     const directMatch = allListings.find(
// //       (item) =>
// //         item.title.toLowerCase().trim() === keyword.toLowerCase().trim(),
// //     );

// //     if (directMatch && keyword.trim() !== "") {
// //       navigate(`/browse/${slugify(directMatch.title)}`);
// //     } else {
// //       // Redirect to browse with filters
// //       navigate("/browse", {
// //         state: {
// //           keyword: keyword,
// //           category:
// //             categoryToSearch === "All Categories" ? "All" : categoryToSearch,
// //           location: location,
// //         },
// //       });
// //     }
// //     setShowKeywordSug(false);
// //     setShowLocationSug(false);
// //   };

// //   // --- BADGE LOGIC ---
// //   const businessDirObj = categoriesData.find(
// //     (cat) => cat.name?.toLowerCase() === "business directory",
// //   );

// //   const featuredBadges = categoriesData
// //     .filter(
// //       (cat) =>
// //         cat.favoriteCategories === true &&
// //         cat.name?.toLowerCase() !== "business directory",
// //     )
// //     .slice(-2);

// //   const styles = {
// //     wrapper: {
// //       width: "100%",
// //       display: "flex",
// //       flexDirection: "column",
// //       alignItems: "center",
// //     },
// //     pillBar: {
// //       background: "#ffffff",
// //       borderRadius: "50px",
// //       height: "60px",
// //       display: "flex",
// //       alignItems: "center",
// //       padding: "1px",
// //       boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
// //       width: "100%",
// //       maxWidth: "1140px",
// //       border: "1px solid #eee",
// //       position: "relative",
// //     },
// //     section: {
// //       flex: 1,
// //       height: "100%",
// //       display: "flex",
// //       alignItems: "center",
// //       padding: "0 20px",
// //       position: "relative",
// //     },
// //     divider: { width: "1px", height: "40px", backgroundColor: "#eee" },
// //     input: {
// //       width: "100%",
// //       border: "none",
// //       outline: "none",
// //       fontSize: "15px",
// //       color: "#333",
// //     },
// //     searchBtn: {
// //       backgroundColor: "#ff1f4b",
// //       color: "black",
// //       border: "none",
// //       height: "50px",
// //       padding: "0 25px",
// //       borderRadius: "100px",
// //       fontWeight: "700",
// //       fontSize: "15px",
// //       cursor: "pointer",
// //       marginLeft: "10px",
// //       display: "flex",
// //       alignItems: "center",
// //       gap: "8px",
// //     },
// //     suggestionBox: {
// //       position: "absolute",
// //       top: "65px",
// //       left: "10px",
// //       right: "10px",
// //       background: "white",
// //       borderRadius: "12px",
// //       boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
// //       zIndex: 1000,
// //       overflow: "hidden",
// //       border: "1px solid #eee",
// //     },
// //   };

// //   return (
// //     <div style={styles.wrapper}>
// //       <style>{`
// //         .menu-item { padding: 12px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f8f8f8; color: #555; transition: 0.2s; }
// //         .menu-item:hover { background: #fff5f6; color: #ff1f4b; }

// //   .sug-item {
// //     padding: 12px 20px;
// //     cursor: pointer;
// //     font-size: 15px;
// //     font-weight: 500; /* Thoda bold taaki clear dikhe */
// //     border-bottom: 1px solid #f2f2f2;
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     color: #000000 !important; /* Pure Black Color */
// //     background: #ffffff;
// //     transition: 0.2s;
// //   }

// //   .sug-item:hover {
// //     background: #f8f9fa; /* Hover karne par halka grey background */
// //     color: #ff1f4b !important; /* Hover par red color */
// //   }

// //   .sug-type-tag {
// //     font-size: 10px;
// //     text-transform: uppercase;
// //     color: #888; /* Category/Listing ka color halka rakha hai */
// //     background: #f0f0f0;
// //     padding: 2px 8px;
// //     border-radius: 4px;
// //   }
// // `}</style>

// //       {/* Search Bar */}
// //       <div style={styles.pillBar}>
// //         {/* Keyword Input */}
// //         <div style={styles.section}>
// //           <input
// //             type="text"
// //             placeholder="What are you looking for?"
// //             style={styles.input}
// //             value={searchState.keyword}
// //             onChange={(e) => handleKeywordChange(e.target.value)}
// //             onFocus={() => searchState.keyword && setShowKeywordSug(true)}
// //           />
// //           {showKeywordSug && (
// //             <div style={styles.suggestionBox}>
// //               {keywordSuggestions.map((s, i) => (
// //                 <div
// //                   key={i}
// //                   className="sug-item"
// //                   onClick={() => {
// //                     setSearchState({ ...searchState, keyword: s.name });
// //                     setShowKeywordSug(false);
// //                   }}>
// //                   <span>{s.name}</span>
// //                   <small className="text-muted" style={{ fontSize: "10px" }}>
// //                     {s.type}
// //                   </small>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         <div style={styles.divider}></div>

// //         {/* Location Input */}
// //         <div style={styles.section}>
// //           <input
// //             type="text"
// //             placeholder="Location..."
// //             style={styles.input}
// //             value={searchState.location}
// //             onChange={(e) => handleLocationChange(e.target.value)}
// //             onFocus={() => searchState.location && setShowLocationSug(true)}
// //           />
// //           <MapPin size={18} color="#ccc" />
// //           {showLocationSug && (
// //             <div style={styles.suggestionBox}>
// //               {locationSuggestions.map((loc, i) => (
// //                 <div
// //                   key={i}
// //                   className="sug-item"
// //                   onClick={() => {
// //                     setSearchState({ ...searchState, location: loc });
// //                     setShowLocationSug(false);
// //                   }}>
// //                   <div className="d-flex align-items-center gap-2">
// //                     <MapPin size={14} className="text-muted" />
// //                     <span>{loc}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         <div style={styles.divider}></div>

// //         {/* Category Dropdown */}
// //         <div style={styles.section}>
// //           <div
// //             style={{
// //               ...styles.input,
// //               cursor: "pointer",
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
// //             onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
// //             <span
// //               style={{
// //                 color:
// //                   searchState.category === "All Categories" ? "#999" : "#333",
// //                 overflow: "hidden",
// //                 textOverflow: "ellipsis",
// //                 whiteSpace: "nowrap",
// //                 flex: 1,
// //               }}>
// //               {searchState.category}
// //             </span>
// //             <ChevronDown size={18} color="#ccc" />
// //           </div>
// //           <button style={styles.searchBtn} onClick={() => handleSearch()}>
// //             <Search size={18} /> SEARCH
// //           </button>

// //           {isDropdownOpen && (
// //             <div className="dropdown-box">
// //               {currentView === "categories" ? (
// //                 <div>
// //                   <div
// //                     style={{
// //                       padding: "12px 20px",
// //                       background: "#f9f9f9",
// //                       fontSize: "11px",
// //                       fontWeight: "bold",
// //                       color: "#999",
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                     }}>
// //                     CATEGORIES{" "}
// //                     <X
// //                       size={14}
// //                       style={{ cursor: "pointer" }}
// //                       onClick={() => setIsDropdownOpen(false)}
// //                     />
// //                   </div>
// //                   <div style={{ maxHeight: "300px", overflowY: "auto" }}>
// //                     <div
// //                       className="menu-item"
// //                       onClick={() => {
// //                         setSearchState({
// //                           ...searchState,
// //                           category: "All Categories",
// //                         });
// //                         setIsDropdownOpen(false);
// //                       }}>
// //                       All Categories
// //                     </div>
// //                     {dropdownData.map((item) => (
// //                       <div key={item.categoryId?._id} className="menu-item">
// //                         <div
// //                           style={{ flexGrow: 1 }}
// //                           onClick={() => {
// //                             setSearchState({
// //                               ...searchState,
// //                               category: item.categoryId?.name,
// //                             });
// //                             setIsDropdownOpen(false);
// //                           }}>
// //                           {item.categoryId?.name}
// //                         </div>
// //                         {item.subcategories?.length > 0 && (
// //                           <div
// //                             onClick={(e) => {
// //                               e.stopPropagation();
// //                               setActiveCategory(item);
// //                               setCurrentView("subcategories");
// //                             }}
// //                             style={{ padding: "5px" }}>
// //                             <ChevronDown
// //                               size={14}
// //                               style={{ transform: "rotate(-90deg)" }}
// //                             />
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div>
// //                   <div
// //                     onClick={() => setCurrentView("categories")}
// //                     style={{
// //                       background: "#ff1f4b",
// //                       color: "white",
// //                       padding: "12px 20px",
// //                       fontWeight: "bold",
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                     }}>
// //                     <ArrowLeft size={16} style={{ marginRight: "10px" }} />{" "}
// //                     {activeCategory?.categoryId?.name}
// //                   </div>
// //                   <div style={{ maxHeight: "300px", overflowY: "auto" }}>
// //                     {activeCategory?.subcategories.map((sub) => (
// //                       <div
// //                         key={sub._id}
// //                         className="menu-item"
// //                         onClick={() => {
// //                           setSearchState({
// //                             ...searchState,
// //                             category: sub.subcategoryName,
// //                           });
// //                           setIsDropdownOpen(false);
// //                           setCurrentView("categories");
// //                         }}>
// //                         {sub.subcategoryName}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Badges */}
// //       <div
// //         style={{
// //           marginTop: "30px",
// //           display: "flex",
// //           gap: "15px",
// //           flexWrap: "wrap",
// //           justifyContent: "center",
// //         }}>
// //         <div
// //           className="featured-item"
// //           onClick={() =>
// //             handleSearch(businessDirObj?.name || "Business Directory")
// //           }>
// //           <Briefcase size={18} />
// //           {businessDirObj?.name || "Business Directory"}
// //         </div>
// //         {featuredBadges.map((item) => (
// //           <div
// //             key={item._id}
// //             className="featured-item"
// //             onClick={() => handleSearch(item.name)}>
// //             <Star size={18} /> {item.name}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomeSearchBar;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   MapPin,
//   ChevronDown,
//   ArrowLeft,
//   X,
//   Briefcase,
//   Search,
//   Star,
// } from "lucide-react";
// import {
//   getCategoriesAPI,
//   getAllListingsApi,
//   getAllSubCategoriesApi,
// } from "../services/authService";

// const HomeSearchBar = () => {
//   const navigate = useNavigate();
//   const [categoriesData, setCategoriesData] = useState([]);
//   const [allListings, setAllListings] = useState([]);
//   const [dropdownData, setDropdownData] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [currentView, setCurrentView] = useState("categories");
//   const [activeCategory, setActiveCategory] = useState(null);

//   // Suggestion States
//   const [keywordSuggestions, setKeywordSuggestions] = useState([]);
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [showKeywordSug, setShowKeywordSug] = useState(false);
//   const [showLocationSug, setShowLocationSug] = useState(false);

//   const [searchState, setSearchState] = useState({
//     keyword: "",
//     location: "",
//     category: "All Categories",
//   });

//   const slugify = (text) =>
//     text
//       ? text
//           .toLowerCase()
//           .trim()
//           .replace(/[^\w\s-]/g, "")
//           .replace(/[\s_-]+/g, "-")
//           .replace(/^-+|-+$/g, "")
//       : "";

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const catRes = await getCategoriesAPI();
//         if (catRes.success) setCategoriesData(catRes.categories || []);

//         const subRes = await getAllSubCategoriesApi();
//         if (subRes.success) setDropdownData(subRes.data || []);

//         const listRes = await getAllListingsApi();
//         if (listRes?.listings) {
//           // Only store active listings to ensure suggestions match real cards
//           setAllListings(listRes.listings);
//         }
//       } catch (err) {
//         console.error("API Error:", err);
//       }
//     };
//     loadData();
//   }, []);

//   // --- REFINED SUGGESTION LOGIC ---
//   const handleKeywordChange = (val) => {
//     setSearchState({ ...searchState, keyword: val });
//     if (val.trim().length > 0) {
//       // 1. Filter Categories that exist
//       const matchCats = categoriesData
//         .filter((c) => c.name.toLowerCase().includes(val.toLowerCase()))
//         .map((c) => ({ type: "Category", name: c.name }));

//       // 2. Filter ONLY Listings that actually have data (active cards)
//       const matchListings = allListings
//         .filter((l) => l.title.toLowerCase().includes(val.toLowerCase()))
//         .map((l) => ({ type: "Listing", name: l.title }));

//       const combined = [...matchCats, ...matchListings].slice(0, 8);
//       setKeywordSuggestions(combined);
//       setShowKeywordSug(combined.length > 0);
//     } else {
//       setShowKeywordSug(false);
//     }
//   };

//   const handleLocationChange = (val) => {
//     setSearchState({ ...searchState, location: val });
//     if (val.trim().length > 0) {
//       // Extract unique locations ONLY from existing listing cards
//       const uniqueLocations = [
//         ...new Set(
//           allListings.map((l) => (l.address || l.location || "").trim()),
//         ),
//       ].filter((loc) => loc !== "");

//       const matches = uniqueLocations
//         .filter((loc) => loc.toLowerCase().includes(val.toLowerCase()))
//         .slice(0, 5);

//       setLocationSuggestions(matches);
//       setShowLocationSug(matches.length > 0);
//     } else {
//       setShowLocationSug(false);
//     }
//   };

//   const handleSearch = async (overrideCategory) => {
//     const categoryToSearch = overrideCategory || searchState.category;
//     const { keyword, location } = searchState;

//     setShowKeywordSug(false);
//     setShowLocationSug(false);

//     // If direct title match exists, go to detail page
//     const directMatch = allListings.find(
//       (item) =>
//         item.title.toLowerCase().trim() === keyword.toLowerCase().trim(),
//     );

//     if (directMatch && keyword.trim() !== "") {
//       navigate(`/browse/${slugify(directMatch.title)}`);
//     } else {
//       // Redirect to browse page. If no listings match these filters,
//       // the Browse page logic will display "No Listings Found" automatically.
//       navigate("/browse", {
//         state: {
//           keyword: keyword,
//           category:
//             categoryToSearch === "All Categories" ? "All" : categoryToSearch,
//           location: location,
//         },
//       });
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // --- BADGE LOGIC ---
//   const businessDirObj = categoriesData.find(
//     (cat) => cat.name?.toLowerCase() === "business directory",
//   );

//   const featuredBadges = categoriesData
//     .filter(
//       (cat) =>
//         cat.favoriteCategories === true &&
//         cat.name?.toLowerCase() !== "business directory",
//     )
//     .slice(-2);

//   const styles = {
//     wrapper: {
//       width: "100%",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     pillBar: {
//       background: "#ffffff",
//       borderRadius: "50px",
//       height: "60px",
//       display: "flex",
//       alignItems: "center",
//       padding: "1px",
//       boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
//       width: "100%",
//       maxWidth: "1140px",
//       border: "1px solid #eee",
//       position: "relative",
//     },
//     section: {
//       flex: 1,
//       height: "100%",
//       display: "flex",
//       alignItems: "center",
//       padding: "0 20px",
//       position: "relative",
//     },
//     divider: { width: "1px", height: "40px", backgroundColor: "#eee" },
//     input: {
//       width: "100%",
//       border: "none",
//       outline: "none",
//       fontSize: "15px",
//       color: "#000",
//     },
//     searchBtn: {
//       backgroundColor: "#ff1f4b",
//       color: "#fff",
//       border: "none",
//       height: "50px",
//       padding: "0 25px",
//       borderRadius: "100px",
//       fontWeight: "700",
//       fontSize: "15px",
//       cursor: "pointer",
//       marginLeft: "10px",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//     suggestionBox: {
//       position: "absolute",
//       top: "65px",
//       left: "10px",
//       right: "10px",
//       background: "white",
//       borderRadius: "12px",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//       zIndex: 1000,
//       overflow: "hidden",
//       border: "1px solid #eee",
//     },
//   };

//   return (
//     <div style={styles.wrapper}>
//       <style>{`
//         .sug-item {
//           padding: 12px 20px; cursor: pointer; font-size: 14px; font-weight: 500;
//           border-bottom: 1px solid #f2f2f2; display: flex; align-items: center;
//           justify-content: space-between; color: #000 !important; background: #fff; transition: 0.2s;
//         }
//         .sug-item:hover { background: #f8f9fa; color: #ff1f4b !important; }
//         .sug-type-tag { font-size: 10px; text-transform: uppercase; color: #888; background: #f0f0f0; padding: 2px 8px; border-radius: 4px; }
//         .dropdown-box { position: absolute; top: 70px; right: 0; width: 320px; background: white; border-radius: 12px; box-shadow: 0 15px 40px rgba(0,0,0,0.2); z-index: 9999; overflow: hidden; border: 1px solid #eee; }
//         .menu-item { padding: 12px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f8f8f8; color: #000; transition: 0.2s; }
//         .menu-item:hover { background: #fff5f6; color: #ff1f4b; }
//         .featured-item { background: rgba(255,255,255,0.1); color: white; padding: 10px 25px; border-radius: 50px; display: flex; align-items: center; gap: 10px; cursor: pointer; border: 1px solid rgba(255,255,255,0.2); transition: 0.3s; white-space: nowrap; }
//         .featured-item:hover { background: #ff1f4b; transform: translateY(-3px); }
//       `}</style>

//       <div style={styles.pillBar}>
//         {/* Keyword Search */}
//         <div style={styles.section}>
//           <input
//             type="text"
//             placeholder="What are you looking for?"
//             style={styles.input}
//             value={searchState.keyword}
//             onChange={(e) => handleKeywordChange(e.target.value)}
//             onKeyDown={handleKeyDown}
//             onFocus={() =>
//               searchState.keyword &&
//               setShowKeywordSug(keywordSuggestions.length > 0)
//             }
//           />
//           {showKeywordSug && (
//             <div style={styles.suggestionBox}>
//               {keywordSuggestions.map((s, i) => (
//                 <div
//                   key={i}
//                   className="sug-item"
//                   onClick={() => {
//                     setSearchState({ ...searchState, keyword: s.name });
//                     setShowKeywordSug(false);
//                   }}>
//                   <span style={{ color: "#000" }}>{s.name}</span>
//                   <span className="sug-type-tag">{s.type}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div style={styles.divider}></div>

//         {/* Location Search */}
//         <div style={styles.section}>
//           <input
//             type="text"
//             placeholder="Location..."
//             style={styles.input}
//             value={searchState.location}
//             onChange={(e) => handleLocationChange(e.target.value)}
//             onKeyDown={handleKeyDown}
//             onFocus={() =>
//               searchState.location &&
//               setShowLocationSug(locationSuggestions.length > 0)
//             }
//           />
//           <MapPin size={18} color="#ccc" />
//           {showLocationSug && (
//             <div style={styles.suggestionBox}>
//               {locationSuggestions.map((loc, i) => (
//                 <div
//                   key={i}
//                   className="sug-item"
//                   onClick={() => {
//                     setSearchState({ ...searchState, location: loc });
//                     setShowLocationSug(false);
//                   }}>
//                   <div className="d-flex align-items-center gap-2">
//                     <MapPin size={14} color="#ff1f4b" />
//                     <span style={{ color: "#000" }}>{loc}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div style={styles.divider}></div>

//         {/* Category Selection */}
//         <div style={styles.section}>
//           <div
//             style={{
//               ...styles.input,
//               cursor: "pointer",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//             <span
//               style={{
//                 color:
//                   searchState.category === "All Categories" ? "#999" : "#000",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//                 flex: 1,
//               }}>
//               {searchState.category}
//             </span>
//             <ChevronDown size={18} color="#ccc" />
//           </div>
//           <button style={styles.searchBtn} onClick={() => handleSearch()}>
//             <Search size={18} /> SEARCH
//           </button>

//           {isDropdownOpen && (
//             <div className="dropdown-box">
//               {currentView === "categories" ? (
//                 <div>
//                   <div
//                     style={{
//                       padding: "12px 20px",
//                       background: "#f9f9f9",
//                       fontSize: "11px",
//                       fontWeight: "bold",
//                       color: "#999",
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}>
//                     CATEGORIES{" "}
//                     <X
//                       size={14}
//                       style={{ cursor: "pointer" }}
//                       onClick={() => setIsDropdownOpen(false)}
//                     />
//                   </div>
//                   <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//                     <div
//                       className="menu-item"
//                       onClick={() => {
//                         setSearchState({
//                           ...searchState,
//                           category: "All Categories",
//                         });
//                         setIsDropdownOpen(false);
//                       }}>
//                       All Categories
//                     </div>
//                     {dropdownData.map((item) => (
//                       <div key={item.categoryId?._id} className="menu-item">
//                         <div
//                           style={{ flexGrow: 1 }}
//                           onClick={() => {
//                             setSearchState({
//                               ...searchState,
//                               category: item.categoryId?.name,
//                             });
//                             setIsDropdownOpen(false);
//                           }}>
//                           {item.categoryId?.name}
//                         </div>
//                         {item.subcategories?.length > 0 && (
//                           <div
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setActiveCategory(item);
//                               setCurrentView("subcategories");
//                             }}
//                             style={{ padding: "5px" }}>
//                             <ChevronDown
//                               size={14}
//                               style={{ transform: "rotate(-90deg)" }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   <div
//                     onClick={() => setCurrentView("categories")}
//                     style={{
//                       background: "#ff1f4b",
//                       color: "white",
//                       padding: "12px 20px",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                       display: "flex",
//                       alignItems: "center",
//                     }}>
//                     <ArrowLeft size={16} style={{ marginRight: "10px" }} />{" "}
//                     {activeCategory?.categoryId?.name}
//                   </div>
//                   <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//                     {activeCategory?.subcategories.map((sub) => (
//                       <div
//                         key={sub._id}
//                         className="menu-item"
//                         onClick={() => {
//                           setSearchState({
//                             ...searchState,
//                             category: sub.subcategoryName,
//                           });
//                           setIsDropdownOpen(false);
//                           setCurrentView("categories");
//                         }}>
//                         {sub.subcategoryName}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Featured Badges */}
//       <div
//         style={{
//           marginTop: "30px",
//           display: "flex",
//           gap: "15px",
//           flexWrap: "wrap",
//           justifyContent: "center",
//         }}>
//         <div
//           className="featured-item"
//           onClick={() => handleSearch(businessDirObj?.name)}>
//           <Briefcase size={18} /> {businessDirObj?.name || "Business Directory"}
//         </div>
//         {featuredBadges.map((item) => (
//           <div
//             key={item._id}
//             className="featured-item"
//             onClick={() => handleSearch(item.name)}>
//             <Star size={18} /> {item.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomeSearchBar;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ChevronDown,
  ArrowLeft,
  X,
  Briefcase,
  Search,
  Star,
  Loader2,
} from "lucide-react";
import {
  getCategoriesAPI,
  getAllListingsApi,
  getAllSubCategoriesApi,
} from "../services/authService";

const HomeSearchBar = () => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("categories");
  const [activeCategory, setActiveCategory] = useState(null);

  // Suggestion States
  const [keywordSuggestions, setKeywordSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showKeywordSug, setShowKeywordSug] = useState(false);
  const [showLocationSug, setShowLocationSug] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [searchState, setSearchState] = useState({
    keyword: "",
    location: "",
    category: "All Categories",
  });

  const slugify = (text) =>
    text
      ? text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";

  useEffect(() => {
    const loadData = async () => {
      try {
        const catRes = await getCategoriesAPI();
        if (catRes.success) setCategoriesData(catRes.categories || []);

        const subRes = await getAllSubCategoriesApi();
        if (subRes.success) setDropdownData(subRes.data || []);

        const listRes = await getAllListingsApi();
        if (listRes?.listings) setAllListings(listRes.listings);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    loadData();
  }, []);

  // --- KEYWORD SUGGESTIONS (From Database) ---
  const handleKeywordChange = (val) => {
    setSearchState({ ...searchState, keyword: val });
    if (val.trim().length > 0) {
      const matchCats = categoriesData
        .filter((c) => c.name.toLowerCase().includes(val.toLowerCase()))
        .map((c) => ({ type: "Category", name: c.name }));

      const matchListings = allListings
        .filter((l) => l.title.toLowerCase().includes(val.toLowerCase()))
        .map((l) => ({ type: "Listing", name: l.title }));

      const combined = [...matchCats, ...matchListings].slice(0, 8);
      setKeywordSuggestions(combined);
      setShowKeywordSug(combined.length > 0);
    } else {
      setShowKeywordSug(false);
    }
  };

  // --- FREE LOCATION API LOGIC (Nominatim OpenStreetMap) ---
  const fetchLocations = async (query) => {
    if (query.length < 3) return;
    setLoadingLocation(true);
    try {
      // Free Nominatim API call
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`,
      );
      const data = await response.json();
      const results = data.map((item) => item.display_name);
      setLocationSuggestions(results);
      setShowLocationSug(results.length > 0);
    } catch (error) {
      console.error("Location API Error:", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  // Debounce logic for location API to avoid spamming
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchState.location.trim().length >= 3) {
        fetchLocations(searchState.location);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [searchState.location]);

  const handleSearch = async (overrideCategory) => {
    const categoryToSearch = overrideCategory || searchState.category;
    const { keyword, location } = searchState;

    setShowKeywordSug(false);
    setShowLocationSug(false);

    // Direct Match Check
    const directMatch = allListings.find(
      (item) =>
        item.title.toLowerCase().trim() === keyword.toLowerCase().trim(),
    );

    if (directMatch && keyword.trim() !== "") {
      navigate(`/browse/${slugify(directMatch.title)}`);
    } else {
      navigate("/browse", {
        state: {
          keyword: keyword,
          category:
            categoryToSearch === "All Categories" ? "All" : categoryToSearch,
          location: location,
        },
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // --- BADGE LOGIC ---
  const businessDirObj = categoriesData.find(
    (cat) => cat.name?.toLowerCase() === "business directory",
  );
  const featuredBadges = categoriesData
    .filter(
      (cat) =>
        cat.favoriteCategories === true &&
        cat.name?.toLowerCase() !== "business directory",
    )
    .slice(-2);

  const styles = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    pillBar: {
      background: "#ffffff",
      borderRadius: "50px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      padding: "1px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
      width: "100%",
      maxWidth: "1140px",
      border: "1px solid #eee",
      position: "relative",
    },
    section: {
      flex: 1,
      height: "100%",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      position: "relative",
    },
    divider: { width: "1px", height: "40px", backgroundColor: "#eee" },
    input: {
      width: "100%",
      border: "none",
      outline: "none",
      fontSize: "15px",
      color: "#000",
      fontWeight: "500",
    },
    searchBtn: {
      backgroundColor: "#ff1f4b",
      color: "#fff",
      border: "none",
      height: "50px",
      padding: "0 25px",
      borderRadius: "100px",
      fontWeight: "700",
      fontSize: "15px",
      cursor: "pointer",
      marginLeft: "10px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    suggestionBox: {
      position: "absolute",
      top: "65px",
      left: "10px",
      right: "10px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
      zIndex: 10000,
      overflow: "hidden",
      border: "1px solid #eee",
    },
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        .sug-item { 
          padding: 12px 20px; cursor: pointer; font-size: 14px; font-weight: 500;
          border-bottom: 1px solid #f2f2f2; display: flex; align-items: center; 
          justify-content: space-between; color: #000 !important; background: #fff; transition: 0.2s; 
        }
        .sug-item:hover { background: #f8f9fa; color: #ff1f4b !important; }
        .sug-type-tag { font-size: 10px; text-transform: uppercase; color: #888; background: #f0f0f0; padding: 2px 8px; border-radius: 4px; }
        .dropdown-box { position: absolute; top: 70px; right: 0; width: 320px; background: white; border-radius: 12px; box-shadow: 0 15px 40px rgba(0,0,0,0.2); z-index: 9999; overflow: hidden; border: 1px solid #eee; }
        .menu-item { padding: 12px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f8f8f8; color: #000; transition: 0.2s; }
        .menu-item:hover { background: #fff5f6; color: #ff1f4b; }
        .featured-item { background: rgba(255,255,255,0.1); color: white; padding: 10px 25px; border-radius: 50px; display: flex; align-items: center; gap: 10px; cursor: pointer; border: 1px solid rgba(255,255,255,0.2); transition: 0.3s; white-space: nowrap; }
        .featured-item:hover { background: #ff1f4b; transform: translateY(-3px); }
      `}</style>

      <div style={styles.pillBar}>
        {/* Keyword Input */}
        <div style={styles.section}>
          <input
            type="text"
            placeholder="What are you looking for?"
            style={styles.input}
            value={searchState.keyword}
            onChange={(e) => handleKeywordChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchState.keyword && setShowKeywordSug(true)}
          />
          {showKeywordSug && (
            <div style={styles.suggestionBox}>
              {keywordSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="sug-item"
                  onClick={() => {
                    setSearchState({ ...searchState, keyword: s.name });
                    setShowKeywordSug(false);
                  }}>
                  <span style={{ color: "#000" }}>{s.name}</span>
                  <span className="sug-type-tag">{s.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.divider}></div>

        {/* Real Location Input */}
        <div style={styles.section}>
          <input
            type="text"
            placeholder="Location..."
            style={styles.input}
            value={searchState.location}
            onChange={(e) =>
              setSearchState({ ...searchState, location: e.target.value })
            }
            onKeyDown={handleKeyDown}
            onFocus={() =>
              searchState.location.length >= 3 && setShowLocationSug(true)
            }
          />
          {loadingLocation ? (
            <Loader2 size={18} className="animate-spin text-muted" />
          ) : (
            <MapPin size={18} color="#ccc" />
          )}

          {showLocationSug && (
            <div style={styles.suggestionBox}>
              {locationSuggestions.map((loc, i) => (
                <div
                  key={i}
                  className="sug-item"
                  onClick={() => {
                    setSearchState({ ...searchState, location: loc });
                    setShowLocationSug(false);
                  }}>
                  <div className="d-flex align-items-start gap-2">
                    <MapPin size={14} color="#ff1f4b" className="mt-1" />
                    <span
                      style={{
                        color: "#000",
                        fontSize: "13px",
                        textAlign: "left",
                      }}>
                      {loc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.divider}></div>

        {/* Category Dropdown */}
        <div style={styles.section}>
          <div
            style={{
              ...styles.input,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span
              style={{
                color:
                  searchState.category === "All Categories" ? "#999" : "#000",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}>
              {searchState.category}
            </span>
            <ChevronDown size={18} color="#ccc" />
          </div>
          <button style={styles.searchBtn} onClick={() => handleSearch()}>
            <Search size={18} /> SEARCH
          </button>

          {isDropdownOpen && (
            <div className="dropdown-box">
              {currentView === "categories" ? (
                <div>
                  <div
                    style={{
                      padding: "12px 20px",
                      background: "#f9f9f9",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#999",
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    CATEGORIES{" "}
                    <X
                      size={14}
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsDropdownOpen(false)}
                    />
                  </div>
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <div
                      className="menu-item"
                      onClick={() => {
                        setSearchState({
                          ...searchState,
                          category: "All Categories",
                        });
                        setIsDropdownOpen(false);
                      }}>
                      All Categories
                    </div>
                    {dropdownData.map((item) => (
                      <div key={item.categoryId?._id} className="menu-item">
                        <div
                          style={{ flexGrow: 1 }}
                          onClick={() => {
                            setSearchState({
                              ...searchState,
                              category: item.categoryId?.name,
                            });
                            setIsDropdownOpen(false);
                          }}>
                          {item.categoryId?.name}
                        </div>
                        {item.subcategories?.length > 0 && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCategory(item);
                              setCurrentView("subcategories");
                            }}
                            style={{ padding: "5px" }}>
                            <ChevronDown
                              size={14}
                              style={{ transform: "rotate(-90deg)" }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    onClick={() => setCurrentView("categories")}
                    style={{
                      background: "#ff1f4b",
                      color: "white",
                      padding: "12px 20px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <ArrowLeft size={16} style={{ marginRight: "10px" }} />{" "}
                    {activeCategory?.categoryId?.name}
                  </div>
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {activeCategory?.subcategories.map((sub) => (
                      <div
                        key={sub._id}
                        className="menu-item"
                        onClick={() => {
                          setSearchState({
                            ...searchState,
                            category: sub.subcategoryName,
                          });
                          setIsDropdownOpen(false);
                          setCurrentView("categories");
                        }}>
                        {sub.subcategoryName}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Featured Badges */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
        <div
          className="featured-item"
          onClick={() => handleSearch(businessDirObj?.name)}>
          <Briefcase size={18} /> {businessDirObj?.name || "Business Directory"}
        </div>
        {featuredBadges.map((item) => (
          <div
            key={item._id}
            className="featured-item"
            onClick={() => handleSearch(item.name)}>
            <Star size={18} /> {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSearchBar;