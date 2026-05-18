import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ChevronDown,
  ArrowLeft,
  X,
  Briefcase,
  Search,
  Star,
} from "lucide-react";
import {
  getCategoriesAPI, // Using main category API for badges
  getAllListingsApi,
  getAllSubCategoriesApi, // Kept for the dropdown logic
} from "../services/authService";

const HomeSearchBar = () => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]); // For the nested menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("categories");
  const [activeCategory, setActiveCategory] = useState(null);

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
        // 1. Fetch Main Categories for the Badges
        const catRes = await getCategoriesAPI();
        if (catRes.success) {
          // IMPORTANT: Your JSON shows the data is in .categories
          setCategoriesData(catRes.categories || []);
        }

        // 2. Fetch Subcategories for the Dropdown menu
        const subRes = await getAllSubCategoriesApi();
        if (subRes.success) {
          setDropdownData(subRes.data || []);
        }
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    loadData();
  }, []);

  // --- LOGIC FOR 3 CATEGORY BADGES ---

  // 1. Find "Business Directory" (Dynamic check)
  const businessDirObj = categoriesData.find(
    (cat) => cat.name?.toLowerCase() === "business directory",
  );

  // 2. Filter ONLY TRUE favoriteCategories (excluding Business Directory)
  const featuredBadges = categoriesData
    .filter((cat) => {
      return (
        cat.favoriteCategories === true &&
        cat.name?.toLowerCase() !== "business directory"
      );
    })
    .slice(-2); // Get latest 2

  const handleSearch = async (overrideCategory) => {
    try {
      const categoryToSearch = overrideCategory || searchState.category;
      const { keyword, location } = searchState;
      const res = await getAllListingsApi();
      const allListings = res?.listings || [];

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
    } catch (error) {
      navigate("/browse");
    }
  };

  const selectCategoryOnly = (name) => {
    setSearchState({ ...searchState, category: name });
    setIsDropdownOpen(false);
  };

  const openSubView = (e, item) => {
    e.stopPropagation();
    if (item.subcategories?.length > 0) {
      setActiveCategory(item);
      setCurrentView("subcategories");
    }
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
        .menu-item:hover { background: #fff5f6; color: #ff1f4b; }
        .dropdown-box { position: absolute; top: 70px; right: 0; width: 320px; background: white; border-radius: 12px; box-shadow: 0 15px 40px rgba(0,0,0,0.2); z-index: 9999; overflow: hidden; border: 1px solid #eee; }
        .featured-item { background: rgba(255,255,255,0.1); color: white; padding: 10px 25px; border-radius: 50px; display: flex; align-items: center; gap: 10px; cursor: pointer; border: 1px solid rgba(255,255,255,0.2); transition: 0.3s; white-space: nowrap; }
        .featured-item:hover { background: #ff1f4b; transform: translateY(-3px); }
      `}</style>

      {/* Search Bar */}
      <div style={styles.pillBar}>
        <div style={styles.section}>
          <input
            type="text"
            placeholder="What are you looking for?"
            style={styles.input}
            value={searchState.keyword}
            onChange={(e) =>
              setSearchState({ ...searchState, keyword: e.target.value })
            }
          />
        </div>
        <div style={styles.divider}></div>
        <div style={styles.section}>
          <input
            type="text"
            placeholder="Location..."
            style={styles.input}
            value={searchState.location}
            onChange={(e) =>
              setSearchState({ ...searchState, location: e.target.value })
            }
          />
          <MapPin size={18} color="#ccc" />
        </div>
        <div style={styles.divider}></div>
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
                  <div style={styles.scrollContainer}>
                    <div
                      className="menu-item"
                      onClick={() => selectCategoryOnly("All Categories")}>
                      All Categories
                    </div>
                    {dropdownData.map((item) => (
                      <div key={item.categoryId?._id} className="menu-item">
                        <div
                          style={{ flexGrow: 1 }}
                          onClick={() =>
                            selectCategoryOnly(item.categoryId?.name)
                          }>
                          {item.categoryId?.name}
                        </div>
                        {item.subcategories?.length > 0 && (
                          <div
                            onClick={(e) => openSubView(e, item)}
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
                  <div style={styles.scrollContainer}>
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

      {/* THREE CATEGORY BADGES SECTION */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
        {/* Badge 1: Business Directory */}
        <div
          className="featured-item"
          onClick={() =>
            handleSearch(
              businessDirObj ? businessDirObj.name : "Business Directory",
            )
          }>
          <Briefcase size={18} />
          {businessDirObj ? businessDirObj.name : "Business Directory"}
        </div>

        {/* Badges 2 & 3: Only TRUE favoriteCategories */}
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
