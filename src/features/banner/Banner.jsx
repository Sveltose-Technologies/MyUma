"use client";
import { useEffect, useState, useRef } from "react";
import { getBannerAPI, getImgURL } from "../auth/api";

export default function Banner() {
  const [bannerSlider, setBannerSlider] = useState([]);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [currentLevel, setCurrentLevel] = useState("main"); // 'main' or 'sub'
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const menuRef = useRef(null);

  // Category Data
  const categories = {
    Bikes: ["All in Bikes", "Bike Rental", "Sell Bike"],
    Cars: ["All in Cars", "Used Cars", "New Cars"],
    "Business Listings": ["Services", "Retail", "Manufacturing"],
  };

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await getBannerAPI();
        if (response?.homeBanner) setBannerSlider(response.homeBanner);
      } catch (error) {
        console.error("Banner API Error:", error);
      }
    };
    getBanner();

    const handleClickOutside = (e) => {
      // If clicking outside the whole menuRef div, close the menu
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowCatMenu(false);
        setCurrentLevel("main");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open/Close toggle for the main button
  const toggleMenu = (e) => {
    e.preventDefault();
    setShowCatMenu(!showCatMenu);
  };

  // Handle clicking "Bikes" or "Cars"
  const handleCategorySelect = (e, cat) => {
    e.preventDefault();
    e.stopPropagation(); // VERY IMPORTANT: Stops the menu from closing
    setSelectedCat(cat);
    setCurrentLevel("sub");
  };

  // Handle clicking "Bike Rental" etc.
  const handleSubCategorySelect = (e, sub) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCat(sub);
    setShowCatMenu(false); // Close menu after selection
    setCurrentLevel("main"); // Reset level for next time
  };

  // Handle Back Button
  const handleBack = (e) => {
    e.preventDefault();
    e.stopPropagation(); // VERY IMPORTANT: Stops the menu from closing
    setCurrentLevel("main");
  };

  return (
    <div id="umaHero" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        {bannerSlider.length > 0 ? (
          bannerSlider.map((slide, index) => (
            <div key={slide.id || index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div
                className="uma-banner d-flex align-items-center justify-content-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${getImgURL(slide.bannerImage)})`,
                  minHeight: "85vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="container text-center text-white">
                  {/* TAG */}
                  {slide.tag && (
                    <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase fw-bold shadow">
                      {slide.tag}
                    </span>
                  )}

                  {/* TITLE */}
                  <h1 className="display-4 fw-bold mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                    {slide.title || "Find Nearby Services"}
                  </h1>

                  {/* CONTENT */}
                  {slide.content && (
                    <p className="lead mb-5 opacity-90 mx-auto" style={{ maxWidth: "800px" }}>
                      {slide.content}
                    </p>
                  )}

                  {/* --- SEARCH BAR --- */}
                  <div
                    className="search-wrapper bg-white rounded-pill shadow-lg mx-auto d-flex align-items-center p-2 mb-4"
                    style={{ maxWidth: "1000px", position: "relative" }}
                  >
                    <input
                      type="text"
                      className="form-control border-0 bg-transparent flex-grow-1 px-4 shadow-none text-dark"
                      placeholder="What are you looking for?"
                    />

                    <div className="vr mx-2 text-muted opacity-25 d-none d-md-block"></div>

                    {/* CUSTOM CATEGORY DROPDOWN */}
                    <div className="position-relative flex-grow-1 text-start" ref={menuRef}>
                      <div
                        className="px-3 py-2 text-dark cursor-pointer d-flex justify-content-between align-items-center"
                        onClick={toggleMenu}
                      >
                        <span className="text-truncate fw-500">{selectedCat}</span>
                        <i className={`bi bi-chevron-${showCatMenu ? "up" : "down"} small ms-2`}></i>
                      </div>

                      {showCatMenu && (
                        <div className="category-dropdown shadow-lg rounded-3 py-2 bg-white text-dark position-absolute mt-3">
                          <div className="d-flex justify-content-between px-3 pb-2 border-bottom mb-2">
                            <span className="fw-bold small text-muted text-uppercase">
                              {currentLevel === "main" ? "Categories" : "Sub Categories"}
                            </span>
                            <span className="small text-danger cursor-pointer fw-bold" onClick={() => setShowCatMenu(false)}>
                              Close
                            </span>
                          </div>

                          <div className="menu-list">
                            {currentLevel === "main" ? (
                              /* MAIN LIST */
                              Object.keys(categories).map((cat) => (
                                <div
                                  key={cat}
                                  className="cat-item d-flex justify-content-between align-items-center px-3 py-2"
                                  onClick={(e) => handleCategorySelect(e, cat)}
                                >
                                  <span>{cat}</span>
                                  <i className="bi bi-chevron-right small text-muted"></i>
                                </div>
                              ))
                            ) : (
                              /* SUB LIST */
                              <>
                                <div
                                  className="px-3 py-2 text-primary fw-bold cursor-pointer bg-light border-bottom mb-1"
                                  onClick={handleBack}
                                >
                                  <i className="bi bi-arrow-left me-2"></i> Back to Main
                                </div>
                                {categories[selectedCat]?.map((sub) => (
                                  <div
                                    key={sub}
                                    className="cat-item px-3 py-2"
                                    onClick={(e) => handleSubCategorySelect(e, sub)}
                                  >
                                    {sub}
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      className="btn btn-danger rounded-pill px-5 py-2 fw-bold ms-md-2"
                      style={{ backgroundColor: "#c98a46", border: "none" }}
                    >
                      Search
                    </button>
                  </div>

                  {/* --- QUICK CATEGORY BUTTONS --- */}
                  <div className="quick-cats mt-4">
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                      <button className="btn btn-light rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm border-0 transition-all hover-scale">
                        <i className="bi bi-house-door text-danger"></i>
                        <span className="fw-bold small">REAL ESTATE</span>
                      </button>
                      <button className="btn btn-light rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm border-0 transition-all hover-scale">
                        <i className="bi bi-car-front-fill text-danger"></i>
                        <span className="fw-bold small">MOTORS</span>
                      </button>
                      <button className="btn btn-light rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm border-0 active-listing transition-all hover-scale">
                        <i className="bi bi-briefcase text-danger"></i>
                        <span className="fw-bold small">BUSINESS DIRECTORY</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="vh-100 bg-dark d-flex align-items-center justify-content-center text-white">Loading...</div>
        )}
      </div>

      <style jsx>{`
        .cursor-pointer { cursor: pointer; }
        .category-dropdown {
          width: 300px;
          left: 0;
          top: 100%;
          z-index: 9999; /* Higher than carousel */
        }
        .menu-list {
          max-height: 350px;
          overflow-y: auto;
        }
        .cat-item:hover {
          background: #fff5f2;
          cursor: pointer;
          color: #c98a46;
        }
        .hover-scale:hover { transform: translateY(-3px); }
        .vr { width: 1px; height: 35px; }
        .fw-500 { font-weight: 500; }

        @media (max-width: 768px) {
          .search-wrapper {
            flex-direction: column;
            border-radius: 25px !important;
            padding: 15px !important;
            margin: 0 10px;
          }
          .vr { display: none; }
          .category-dropdown {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            top: auto;
            border-radius: 20px 20px 0 0 !important;
            z-index: 10000;
          }
        }
      `}</style>
    </div>
  );
}


// "use client";
// import { useEffect, useState, useRef } from "react";
// import { getBannerAPI, getImgURL, getCategoriesAPI, getSubCategoriesAPI } from "../../services/authService";

// export default function Banner() {
//   const [bannerSlider, setBannerSlider] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [allSubcategories, setAllSubcategories] = useState([]); // API ka 'data' array yahan ayega
//   const [activeSubMenu, setActiveSubMenu] = useState([]); 
  
//   const [showCatMenu, setShowCatMenu] = useState(false);
//   const [currentLevel, setCurrentLevel] = useState("main"); 
//   const [selectedCat, setSelectedCat] = useState("All Categories");
  
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const bannerRes = await getBannerAPI();
//         if (bannerRes?.homeBanner) setBannerSlider(bannerRes.homeBanner);

//         // Categories Fetch
//         const catRes = await getCategoriesAPI();
//         if (catRes?.categories) setAllCategories(catRes.categories);

//         // Subcategories Fetch (Aapke log ke mutabik ye 'data' key me hai)
//         const subRes = await getSubCategoriesAPI();
//         if (subRes?.data) setAllSubcategories(subRes.data);

//       } catch (error) {
//         console.error("Error fetching data:", error);
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

//   const handleCategorySelect = (e, cat) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     // Logic: allSubcategories me wo object dhundo jiska categoryId._id match kare
//     const foundCategoryObj = allSubcategories.find(item => {
//         const catId = item.categoryId?._id || item.categoryId;
//         return String(catId) === String(cat._id);
//     });

//     if (foundCategoryObj && foundCategoryObj.subcategories) {
//         setActiveSubMenu(foundCategoryObj.subcategories); // Array of subcategories set karo
//     } else {
//         setActiveSubMenu([]); // Agar koi subcategory na mile
//     }

//     setCurrentLevel("sub");
//   };

//   const handleSubCategorySelect = (e, sub) => {
//     e.preventDefault();
//     e.stopPropagation();
//     // Subcategory ka naam set karein (Aapke API me 'name' ya 'subcategoryName' ho sakta hai)
//     const subName = sub.name || sub.subcategoryName || "Selected";
//     setSelectedCat(subName);
//     setShowCatMenu(false); 
//     setCurrentLevel("main"); 
//   };

//   return (
//     <div id="umaHero" className="carousel slide carousel-fade" data-bs-ride="carousel">
//       <div className="carousel-inner">
//         {bannerSlider.length > 0 ? (
//           bannerSlider.map((slide, index) => (
//             <div key={slide.id || index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
//               <div
//                 className="d-flex align-items-center justify-content-center"
//                 style={{
//                   backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${getImgURL(slide.bannerImage)})`,
//                   minHeight: "80vh",
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               >
//                 <div className="container text-center text-white">
//                   <h1 className="display-5 fw-bold mb-4">{slide.title || "Find Nearby Services"}</h1>

//                   {/* SEARCH BAR CONTAINER */}
//                   <div className="bg-white rounded-pill shadow-lg mx-auto d-flex align-items-center p-2 mb-4 w-100" style={{ maxWidth: "850px" }}>
                    
//                     <input type="text" className="form-control border-0 bg-transparent flex-grow-1 px-4 shadow-none text-dark" placeholder="What are you looking for?" />
                    
//                     <div className="vr mx-2 text-muted opacity-25 d-none d-md-block" style={{ height: "30px" }}></div>

//                     {/* DROPDOWN SECTION */}
//                     <div className="position-relative flex-grow-1 text-start" ref={menuRef}>
//                       <div 
//                         className="px-3 py-2 text-dark d-flex justify-content-between align-items-center" 
//                         style={{ cursor: "pointer", minWidth: "160px" }}
//                         onClick={() => { setShowCatMenu(!showCatMenu); if(!showCatMenu) setCurrentLevel("main"); }}
//                       >
//                         <span className="text-truncate fw-normal">{selectedCat}</span>
//                         <i className={`bi bi-chevron-${showCatMenu ? "up" : "down"} ms-2 small`}></i>
//                       </div>

//                       {showCatMenu && (
//                         <div 
//                           className="position-absolute bg-white shadow-lg rounded-3 py-2 mt-3 w-100" 
//                           style={{ zIndex: 1050, left: 0, top: "100%", border: "1px solid #efefef", minWidth: "250px" }}
//                         >
//                           <div className="d-flex justify-content-between align-items-center px-3 pb-2 border-bottom mb-2">
//                             <span className="fw-bold small text-muted text-uppercase">
//                                 {currentLevel === "main" ? "Categories" : "Sub Categories"}
//                             </span>
//                             <span className="small text-danger fw-bold" style={{ cursor: "pointer" }} onClick={() => setShowCatMenu(false)}>Close</span>
//                           </div>

//                           <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//                             {currentLevel === "main" ? (
//                               allCategories.map((cat) => (
//                                 <div 
//                                   key={cat._id} 
//                                   className="px-3 py-2 d-flex justify-content-between align-items-center list-group-item-action" 
//                                   style={{ cursor: "pointer" }}
//                                   onClick={(e) => handleCategorySelect(e, cat)}
//                                 >
//                                   <span className="text-dark">{cat.name}</span>
//                                   <i className="bi bi-chevron-right text-muted small"></i>
//                                 </div>
//                               ))
//                             ) : (
//                               <>
//                                 <div 
//                                   className="px-3 py-2 text-primary fw-bold bg-light border-bottom mb-1" 
//                                   style={{ cursor: "pointer" }}
//                                   onClick={() => setCurrentLevel("main")}
//                                 >
//                                   <i className="bi bi-arrow-left me-2"></i> Back to Main
//                                 </div>
//                                 {activeSubMenu.length > 0 ? (
//                                   activeSubMenu.map((sub, idx) => (
//                                     <div 
//                                       key={sub._id || idx} 
//                                       className="px-3 py-2 text-dark list-group-item-action" 
//                                       style={{ cursor: "pointer" }}
//                                       onClick={(e) => handleSubCategorySelect(e, sub)}
//                                     >
//                                       {sub.name || sub.subcategoryName}
//                                     </div>
//                                   ))
//                                 ) : (
//                                   <div className="px-3 py-2 text-muted text-center small">No Subcategories found</div>
//                                 )}
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <button className="btn rounded-pill px-4 py-2 fw-bold text-white ms-2 d-none d-md-block" style={{ backgroundColor: "#c98a46" }}>
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="vh-100 bg-dark d-flex align-items-center justify-content-center text-white">Loading...</div>
//         )}
//       </div>
//     </div>
//   );
// }