import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, Navigation } from "lucide-react";
import { getAllListingsApi, getImgURL } from "../services/authService";

const BrowseListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
  });
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState(filter);

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllListingsApi();
        setListings(res?.listings || []);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApplyFilters = () => {
    setAppliedSearch(searchQuery.trim());
    setAppliedFilter(filter);
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center text-navy fw-800 ls-1">
        LOADING LISTINGS...
      </div>
    );

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Filter Section */}
        <div className="card border-0 shadow-sm p-4 mb-5 rounded-4">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-5">
              <label className="form-label small fw-800 text-navy text-uppercase ls-1">
                Search
              </label>
              <div className="input-group bg-light rounded shadow-none border">
                <span className="input-group-text bg-transparent border-0">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control border-0 bg-transparent shadow-none"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label small fw-800 text-navy text-uppercase ls-1">
                Category
              </label>
              <select
                className="form-select border shadow-none"
                value={filter.category}
                onChange={(e) =>
                  setFilter({ ...filter, category: e.target.value })
                }>
                <option>All</option>
                {[...new Set(listings.map((l) => l.categoryId?.name))]
                  .filter(Boolean)
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-3 col-md-2">
              <label className="form-label small fw-800 text-navy text-uppercase ls-1">
                Min ₹
              </label>
              <input
                type="text"
                className="form-control border shadow-none"
                placeholder="Min"
                value={filter.minPrice}
                onChange={(e) =>
                  setFilter({ ...filter, minPrice: e.target.value })
                }
              />
            </div>
            <div className="col-3 col-md-2">
              <label className="form-label small fw-800 text-navy text-uppercase ls-1">
                Max ₹
              </label>
              <input
                type="text"
                className="form-control border shadow-none"
                placeholder="Max"
                value={filter.maxPrice}
                onChange={(e) =>
                  setFilter({ ...filter, maxPrice: e.target.value })
                }
              />
            </div>
            <div className="col-12 text-end pt-2">
              <button
                className="uma-btn-navy uma-btn px-5 w-20 w-md-auto"
                onClick={handleApplyFilters}>
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="row g-4">
          {filteredListings.map((item) => (
            <div key={item._id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm overflow-hidden listing-card rounded-4 bg-white">
                {/* Fixed Image Container */}
                <div className="ratio ratio-4x3 position-relative">
                  <img
                    src={getImgURL(item.images?.[0])}
                    alt={item.title}
                    className="object-fit-cover w-100 h-100"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-white text-navy shadow-sm fw-800 px-3 py-2 rounded-3">
                      ₹{item.items?.[0]?.price?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-tan fw-800 text-uppercase ls-1">
                      {item.categoryId?.name}
                    </small>
                    <span className="small fw-800 text-navy">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      4.8
                    </span>
                  </div>

                  <h5 className="fw-800 text-navy mb-2 text-truncate ls-1">
                    {item.title}
                  </h5>

                  <p className="text-muted small mb-4">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    {item.address}
                  </p>

                  <div className="d-flex gap-2 mt-auto">
                    <button
                      onClick={() => navigate(`/browse/${slugify(item.title)}`)}
                      className="uma-btn-navy uma-btn flex-fill py-2">
                      View Details
                    </button>
                    <button
                      className="bg-white border rounded px-3"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/${encodeURIComponent(item.address)}`,
                        )
                      }>
                      <Navigation size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseListings;
