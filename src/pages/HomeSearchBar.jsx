import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  // ✅ Search Function: Navigates to Browse with current text state
  const handleSearch = async () => {
    try {
      const { keyword, category, location } = searchState;
      const res = await getAllListingsApi();
      const allListings = res?.listings || [];

      // Exact title match check
      const directMatch = allListings.find(
        (item) =>
          item.title.toLowerCase().trim() === keyword.toLowerCase().trim(),
      );

      if (directMatch && keyword.trim() !== "") {
        navigate(`/browse/${slugify(directMatch.title)}`);
      } else {
        // Send keyword, category name, and location string to BrowseListings
        navigate("/browse", {
          state: {
            keyword: keyword,
            category: category === "All Categories" ? "All" : category,
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
        .featured-item { background: rgba(255,255,255,0.1); color: white; padding: 10px 25px; border-radius: 50px; display: flex; align-items: center; gap: 10px; cursor: pointer; border: 1px solid rgba(255,255,255,0.2); transition: 0.3s; }
        .featured-item:hover { background: #ff1f4b; transform: translateY(-3px); }
      `}</style>

      <div style={styles.pillBar}>
        {/* KEYWORD SEARCH */}
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

        {/* LOCATION SEARCH (Simple Text Input) */}
        <div style={styles.section}>
          <input
            type="text"
            placeholder="Location (City, State...)"
            style={styles.input}
            value={searchState.location}
            onChange={(e) =>
              setSearchState({ ...searchState, location: e.target.value })
            }
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
              justifyBetween: "space-between",
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
                    CATEGORIES
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
                    {categoriesData.map((item) => (
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

      {/* Featured Badges */}
      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <div
          className="featured-item"
          onClick={() => {
            setSearchState({ ...searchState, category: "Cars" });
            handleSearch();
          }}>
          <Car size={18} /> Cars
        </div>
        <div
          className="featured-item"
          onClick={() => {
            setSearchState({ ...searchState, category: "Bikes" });
            handleSearch();
          }}>
          <Bike size={18} /> Bikes
        </div>
        <div
          className="featured-item"
          onClick={() => {
            setSearchState({ ...searchState, category: "Services" });
            handleSearch();
          }}>
          <Briefcase size={18} /> Services
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;
