// import React, { useState, useEffect } from "react";
// import { usePlacesWidget } from "react-google-autocomplete";
// import {
//   MapPin,
//   ChevronDown,
//   ArrowLeft,
//   X,
//   Car,
//   Bike,
//   Briefcase,
// } from "lucide-react";
// import { getAllSubCategoriesApi } from "../services/authService";

// const HomeSearchBar = () => {
//   const [categoriesData, setCategoriesData] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [currentView, setCurrentView] = useState("categories");
//   const [activeCategory, setActiveCategory] = useState(null);

//   const [searchState, setSearchState] = useState({
//     keyword: "",
//     location: "",
//     radius: "Radius search",
//     category: "All Categories",
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await getAllSubCategoriesApi();
//         if (res.success) setCategoriesData(res.data);
//       } catch (err) {
//         console.error("API Error:", err);
//       }
//     };
//     loadData();
//   }, []);

//   const { ref: placeRef } = usePlacesWidget({
//     apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
//     onPlaceSelected: (place) =>
//       setSearchState({ ...searchState, location: place.formatted_address }),
//     options: { types: ["(regions)"] },
//   });

//   // ✅ 1. सिर्फ नाम पर क्लिक करने पर कैटेगरी सिलेक्ट होगी
//   const selectCategoryOnly = (name) => {
//     setSearchState({ ...searchState, category: name });
//     setIsDropdownOpen(false);
//   };

//   // ✅ 2. सिर्फ Arrow पर क्लिक करने पर सब-कैटेगरी खुलेगी
//   const openSubView = (e, item) => {
//     e.stopPropagation(); // ताकि नाम वाला क्लिक ट्रिगर न हो
//     if (item.subcategories && item.subcategories.length > 0) {
//       setActiveCategory(item);
//       setCurrentView("subcategories");
//     }
//   };

//   const handleSubSelect = (subName) => {
//     setSearchState({ ...searchState, category: subName });
//     setIsDropdownOpen(false);
//     setCurrentView("categories");
//   };

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
//       color: "#333",
//     },
//     searchBtn: {
//       backgroundColor: "#ff1f4b",
//       color: "white",
//       border: "none",
//       height: "50px",
//       padding: "0 15px",
//       borderRadius: "100px",
//       fontWeight: "700",
//       fontSize: "15px",
//       cursor: "pointer",
//       marginLeft: "10px",
//     },
//     scrollContainer: {
//       maxHeight: "300px",
//       overflowY: "auto",
//       textAlign: "left",
//     },
//   };

//   return (
//     <div style={styles.wrapper}>
//       <style>{`
//         .menu-item { padding: 12px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f8f8f8; color: #555; transition: 0.2s; }
//         .cat-name-box { flex-grow: 1; height: 100%; display: flex; align-items: center; }
//         .cat-name-box:hover { color: #ff1f4b; }
//         .arrow-box { padding: 5px 10px; border-radius: 4px; transition: 0.2s; }
//         .arrow-box:hover { background: #eee; color: #ff1f4b; }
//         .featured-item { background: #1c2a38; color: white; padding: 10px 25px; border-radius: 50px; display: flex; align-items: center; gap: 10px; cursor: pointer; opacity: 0.9; }
//         .dropdown-box { position: absolute; top: 90px; right: 10px; width: 320px; background: white; border-radius: 12px; box-shadow: 0 15px 40px rgba(0,0,0,0.2); z-index: 999; overflow: hidden; border: 1px solid #eee; }
//         .custom-scroll::-webkit-scrollbar { width: 6px; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
//       `}</style>

//       <div style={styles.pillBar}>
//         <div style={styles.section}>
//           <input
//             type="text"
//             placeholder="What are you looking for?"
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.divider}></div>
//         <div style={styles.section}>
//           <input ref={placeRef} placeholder="Location" style={styles.input} />
//           <MapPin size={18} color="#ccc" />
//         </div>
//         <div style={styles.divider}></div>
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
//                   searchState.category === "All Categories" ? "#999" : "#333",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//               }}>
//               {searchState.category}
//             </span>
//             <ChevronDown size={18} color="#ccc" />
//           </div>

//           <button style={styles.searchBtn}>SEARCH</button>

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
//                     ALL CATEGORIES
//                     <X
//                       size={14}
//                       style={{ cursor: "pointer" }}
//                       onClick={() => setIsDropdownOpen(false)}
//                     />
//                   </div>
//                   <div style={styles.scrollContainer} className="custom-scroll">
//                     {categoriesData.map((item) => (
//                       <div key={item.categoryId._id} className="menu-item">
//                         {/* नाम पर क्लिक: सिर्फ सर्च */}
//                         <div
//                           className="cat-name-box"
//                           onClick={() =>
//                             selectCategoryOnly(item.categoryId.name)
//                           }>
//                           {item.categoryId.name}
//                         </div>

//                         {/* Arrow पर क्लिक: सब-कैटेगरी ओपन (अगर मौजूद है) */}
//                         {item.subcategories &&
//                           item.subcategories.length > 0 && (
//                             <div
//                               className="arrow-box"
//                               onClick={(e) => openSubView(e, item)}>
//                               <ChevronDown
//                                 size={14}
//                                 style={{ transform: "rotate(-90deg)" }}
//                               />
//                             </div>
//                           )}
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
//                     {activeCategory?.categoryId.name}
//                   </div>
//                   <div style={styles.scrollContainer} className="custom-scroll">
//                     {activeCategory?.subcategories.map((sub) => (
//                       <div
//                         key={sub._id}
//                         className="menu-item"
//                         onClick={() => handleSubSelect(sub.subcategoryName)}>
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
//       <div style={{ marginTop: "40px", textAlign: "center" }}>
//         <p style={{ color: "white", marginBottom: "15px", fontSize: "16px" }}>
//           Or browse featured categories:
//         </p>
//         <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
//           <div className="featured-item">
//             <Car size={18} /> Cars
//           </div>
//           <div className="featured-item">
//             <Bike size={18} /> Bikes
//           </div>
//           <div className="featured-item">
//             <Briefcase size={18} /> Business Listings
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeSearchBar;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import {
  MapPin,
  ChevronDown,
  ArrowLeft,
  X,
  Car,
  Bike,
  Briefcase,
  Search,
} from "lucide-react";
import {
  getAllSubCategoriesApi,
  getAllListingsApi,
} from "../services/authService";

const HomeSearchBar = () => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("categories");
  const [activeCategory, setActiveCategory] = useState(null);

  const [searchState, setSearchState] = useState({
    keyword: "",
    location: "",
    category: "All Categories",
  });

  // URL Friendly Name banane ke liye helper
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
        const res = await getAllSubCategoriesApi();
        if (res.success) setCategoriesData(res.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    loadData();
  }, []);

  const { ref: placeRef } = usePlacesWidget({
    apiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Apni API Key yahan dalein
    onPlaceSelected: (place) =>
      setSearchState({ ...searchState, location: place.formatted_address }),
    options: { types: ["(regions)"] },
  });

  // ✅ Main Search Functionality
  const handleSearch = async () => {
    try {
      const { keyword, category, location } = searchState;

      // 1. Pehle check karein ki kya keyword kisi Listing Title se match hota hai
      const res = await getAllListingsApi();
      const allListings = res?.listings || [];

      const directMatch = allListings.find(
        (item) =>
          item.title.toLowerCase().trim() === keyword.toLowerCase().trim(),
      );

      if (directMatch) {
        // Agar Exact Title mil gaya toh Details Page
        navigate(`/browse/${slugify(directMatch.title)}`);
      } else {
        // Agar title nahi mila toh Browse page par filters ke saath jayein
        navigate("/browse", {
          state: {
            keyword: keyword,
            category: category,
            location: location,
          },
        });
      }
    } catch (error) {
      console.error("Search Action Error:", error);
      navigate("/browse");
    }
  };

  const selectCategoryOnly = (name) => {
    setSearchState({ ...searchState, category: name });
    setIsDropdownOpen(false);
  };

  const openSubView = (e, item) => {
    e.stopPropagation();
    if (item.subcategories && item.subcategories.length > 0) {
      setActiveCategory(item);
      setCurrentView("subcategories");
    }
  };

  const handleSubSelect = (subName) => {
    setSearchState({ ...searchState, category: subName });
    setIsDropdownOpen(false);
    setCurrentView("categories");
  };

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
      color: "#333",
    },
    searchBtn: {
      backgroundColor: "#ff1f4b",
      color: "white",
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
    scrollContainer: {
      maxHeight: "300px",
      overflowY: "auto",
      textAlign: "left",
    },
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        .menu-item { padding: 12px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f8f8f8; color: #555; transition: 0.2s; }
        .cat-name-box { flex-grow: 1; height: 100%; display: flex; align-items: center; }
        .cat-name-box:hover { color: #ff1f4b; }
        .arrow-box { padding: 5px 10px; border-radius: 4px; transition: 0.2s; }
        .arrow-box:hover { background: #eee; color: #ff1f4b; }
        .featured-item { background: #1c2a38; color: white; padding: 10px 25px; border-radius: 50px; display: flex; align-items: center; gap: 10px; cursor: pointer; opacity: 0.9; transition: 0.3s; }
        .featured-item:hover { background: #ff1f4b; transform: translateY(-3px); }
        .dropdown-box { position: absolute; top: 70px; right: 0; width: 320px; background: white; border-radius: 12px; box-shadow: 0 15px 40px rgba(0,0,0,0.2); z-index: 999; overflow: hidden; border: 1px solid #eee; }
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
      `}</style>

      <div style={styles.pillBar}>
        {/* KEYWORD SEARCH */}
        <div style={styles.section}>
          <input
            type="text"
            placeholder="Search titles, keywords..."
            style={styles.input}
            value={searchState.keyword}
            onChange={(e) =>
              setSearchState({ ...searchState, keyword: e.target.value })
            }
          />
        </div>

        <div style={styles.divider}></div>

        {/* LOCATION SEARCH */}
        <div style={styles.section}>
          <input
            ref={placeRef}
            placeholder="Location"
            style={styles.input}
            defaultValue={searchState.location}
          />
          <MapPin size={18} color="#ccc" />
        </div>

        <div style={styles.divider}></div>

        {/* CATEGORY DROPDOWN */}
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
                  searchState.category === "All Categories" ? "#999" : "#333",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
              {searchState.category}
            </span>
            <ChevronDown size={18} color="#ccc" />
          </div>

          <button style={styles.searchBtn} onClick={handleSearch}>
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
                    ALL CATEGORIES
                    <X
                      size={14}
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsDropdownOpen(false)}
                    />
                  </div>
                  <div style={styles.scrollContainer} className="custom-scroll">
                    {categoriesData.map((item) => (
                      <div key={item.categoryId._id} className="menu-item">
                        <div
                          className="cat-name-box"
                          onClick={() =>
                            selectCategoryOnly(item.categoryId.name)
                          }>
                          {item.categoryId.name}
                        </div>

                        {item.subcategories &&
                          item.subcategories.length > 0 && (
                            <div
                              className="arrow-box"
                              onClick={(e) => openSubView(e, item)}>
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
                    {activeCategory?.categoryId.name}
                  </div>
                  <div style={styles.scrollContainer} className="custom-scroll">
                    {activeCategory?.subcategories.map((sub) => (
                      <div
                        key={sub._id}
                        className="menu-item"
                        onClick={() => handleSubSelect(sub.subcategoryName)}>
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
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <p style={{ color: "white", marginBottom: "15px", fontSize: "16px" }}>
          Or browse featured categories:
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <div
            className="featured-item"
            onClick={() => selectCategoryOnly("Cars")}>
            <Car size={18} /> Cars
          </div>
          <div
            className="featured-item"
            onClick={() => selectCategoryOnly("Bikes")}>
            <Bike size={18} /> Bikes
          </div>
          <div
            className="featured-item"
            onClick={() => selectCategoryOnly("Business")}>
            <Briefcase size={18} /> Business
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;