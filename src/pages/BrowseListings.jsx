
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Heart, Navigation } from "lucide-react";
import { toast } from "react-toastify";
import {
  getAllListingsApi,
  getImgURL,
  addFavoriteAPI,
  deleteFavoriteAPI,
  getFavoritesByUserAPI,
} from "../services/authService";
import { getUser } from "../utils/storage";

const BrowseListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
  });
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState(filter);

  const currentUser = getUser();
  const isLoggedIn = !!localStorage.getItem("token");

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const fetchData = async () => {
    try {
      const res = await getAllListingsApi();
      setListings(res?.listings || []);

      if (isLoggedIn && currentUser) {
        const userId = currentUser._id || currentUser.id;
        const favRes = await getFavoritesByUserAPI(userId);
        if (favRes.success) {
          setFavorites(favRes.data);
        }
      }
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]); // Jab login state change ho tab refresh kare

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
      toast.error("Favorite action failed");
    }
  };

  const filteredListings = listings.filter((item) => {
    const titleMatch = item.title
      .toLowerCase()
      .includes(appliedSearch.toLowerCase());
    const categoryMatch =
      appliedFilter.category === "All" ||
      item.categoryId?.name === appliedFilter.category;
    const price = item.items?.[0]?.price || 0;
    const minMatch =
      appliedFilter.minPrice === "" || price >= Number(appliedFilter.minPrice);
    const maxMatch =
      appliedFilter.maxPrice === "" || price <= Number(appliedFilter.maxPrice);
    return titleMatch && categoryMatch && minMatch && maxMatch;
  });

  if (loading)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center fw-bold">
        LOADING...
      </div>
    );

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Filter Section */}
        <div className="card border-0 shadow-sm p-4 mb-5 rounded-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label small fw-bold">SEARCH</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-7 text-end">
              <button
                className="btn btn-dark px-5"
                onClick={() => {
                  setAppliedSearch(searchQuery);
                  setAppliedFilter(filter);
                }}>
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {filteredListings.map((item) => {
            const isFavorited = favorites.some((fav) => {
              const favId =
                typeof fav.itemId === "object" ? fav.itemId._id : fav.itemId;
              return favId?.toString() === item._id?.toString();
            });

            return (
              <div key={item._id} className="col-12 col-md-6 col-lg-4">
                <div
                  className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/browse/${slugify(item.title)}`)}>
                  <div className="ratio ratio-4x3 position-relative">
                    <img
                      src={getImgURL(item.images?.[0])}
                      alt={item.title}
                      className="object-fit-cover"
                    />
                    <div className="position-absolute top-0 end-0 p-3">
                      <button
                        className="btn btn-white rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "white",
                          border: "none",
                        }}
                        onClick={(e) => handleBookmark(e, item)}>
                        <Heart
                          size={22}
                          color="#ff4d4d"
                          fill={isFavorited ? "#ff4d4d" : "none"}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="fw-bold text-navy">{item.title}</h5>
                    <p className="text-muted small">
                      <MapPin size={14} /> {item.address}
                    </p>
                    <div className="fw-bold text-primary">
                      ${item.items?.[0]?.price || 0}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowseListings;