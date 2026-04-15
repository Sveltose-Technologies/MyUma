import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Filter,
  SlidersHorizontal,
  Navigation,
} from "lucide-react";

const BrowseListings = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
  });
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState(filter);

  const handleApplyFilters = () => {
    setAppliedSearch(searchQuery.trim());
    setAppliedFilter(filter);
  };

  // Mock Data (9 Items)
  const listings = [
    {
      id: 1,
      title: "Luxury Sky Villa",
      category: "Real Estate",
      price: 8500,
      rating: 4.8,
      address: "Worli, Mumbai",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400",
    },
    {
      id: 2,
      title: "The Grand Heritage Hotel",
      category: "Hotels",
      price: 4200,
      rating: 4.5,
      address: "Banjara Hills, Hyderabad",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400",
    },
    {
      id: 3,
      title: "Oceanic Resort & Spa",
      category: "Hotels",
      price: 6000,
      rating: 4.9,
      address: "Goa Beach, India",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400",
    },
    {
      id: 4,
      title: "Minimalist Loft",
      category: "Real Estate",
      price: 2500,
      rating: 4.2,
      address: "Indiranagar, Bangalore",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400",
    },
    {
      id: 5,
      title: "Tech Hub Office Space",
      category: "Services",
      price: 1200,
      rating: 4.0,
      address: "Cyber City, Gurgaon",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400",
    },
    {
      id: 6,
      title: "Royal Palace Suites",
      category: "Hotels",
      price: 9000,
      rating: 5.0,
      address: "Pink City, Jaipur",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400",
    },
    {
      id: 7,
      title: "Green Valley Farm",
      category: "Real Estate",
      price: 3500,
      rating: 4.6,
      address: "Coorg, Karnataka",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400",
    },
    {
      id: 8,
      title: "Premium Gym Membership",
      category: "Services",
      price: 500,
      rating: 4.3,
      address: "South Delhi, Delhi",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400",
    },
    {
      id: 9,
      title: "Classic Penthouse",
      category: "Real Estate",
      price: 7800,
      rating: 4.7,
      address: "Salt Lake, Kolkata",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400",
    },
  ];

  const openInGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank",
    );
  };

  
  const filteredListings = listings.filter((item) => {
    const titleMatch = item.title
      .toLowerCase()
      .includes(appliedSearch.toLowerCase());
    const categoryMatch =
      appliedFilter.category === "All" ||
      item.category === appliedFilter.category;
    const minMatch =
      appliedFilter.minPrice === "" ||
      item.price >= Number(appliedFilter.minPrice);
    const maxMatch =
      appliedFilter.maxPrice === "" ||
      item.price <= Number(appliedFilter.maxPrice);

    return titleMatch && categoryMatch && minMatch && maxMatch;
  });

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row g-4">
          {/* Filters Sidebar */}
          <div className="col-12">
            <div
              className="card border-0 shadow-sm p-4 mb-4"
              style={{ borderRadius: "16px" }}
            >
              <div className="row g-3 align-items-end">
                <div className="col-md-5">
                  <label className="form-label small fw-bold text-muted text-uppercase">
                    Search by title
                  </label>
                  <div className="input-group shadow-sm bg-light rounded">
                    <span className="input-group-text bg-white border-0">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 bg-light"
                      placeholder="Search listings"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-bold text-muted text-uppercase">
                    Category
                  </label>
                  <select
                    className="form-select border-0 bg-light"
                    value={filter.category}
                    onChange={(e) =>
                      setFilter({ ...filter, category: e.target.value })
                    }
                  >
                    <option>All</option>
                    <option>Real Estate</option>
                    <option>Hotels</option>
                    <option>Services</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <label className="form-label small fw-bold text-muted text-uppercase">
                    Min $
                  </label>
                  <input
                    type="number"
                    className="form-control border-0 bg-light"
                    placeholder="Min"
                    value={filter.minPrice}
                    onChange={(e) =>
                      setFilter({ ...filter, minPrice: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label small fw-bold text-muted text-uppercase">
                    Max $
                  </label>
                  <input
                    type="number"
                    className="form-control border-0 bg-light"
                    placeholder="Max"
                    value={filter.maxPrice}
                    onChange={(e) =>
                      setFilter({ ...filter, maxPrice: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-12 text-end">
                  <button
                    type="button"
                    className="btn fw-bold text-white shadow-sm"
                    style={{ backgroundColor: "#001f3f" }}
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold text-dark m-0">
                {filteredListings.length} Featured Listings
              </h4>
              <div className="d-flex gap-2">
                <button className="btn btn-white shadow-sm border-0">
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>

            <div className="row g-4">
              {filteredListings.map((item) => (
                <div key={item.id} className="col-md-6 col-xl-4">
                  <div
                    className="card h-100 border-0 shadow-sm overflow-hidden listing-card transition-all"
                    style={{ borderRadius: "16px", cursor: "pointer" }}
                  >
                    {/* Image Header */}
                    <div className="position-relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-100"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <span className="position-absolute top-0 end-0 m-3 badge bg-white text-dark shadow-sm">
                        ${item.price}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small
                          className="text-warning fw-bold text-uppercase"
                          style={{ fontSize: "10px" }}
                        >
                          {item.category}
                        </small>
                        <div className="d-flex align-items-center">
                          <Star
                            size={14}
                            className="text-warning fill-warning me-1"
                          />
                          <span className="small fw-bold">{item.rating}</span>
                        </div>
                      </div>

                      <h6 className="fw-bold text-dark mb-2 text-truncate">
                        {item.title}
                      </h6>

                      <button
                        onClick={() => openInGoogleMaps(item.address)}
                        className="btn btn-link p-0 text-muted text-decoration-none d-flex align-items-center mb-3"
                        style={{ fontSize: "13px" }}
                      >
                        <MapPin size={14} className="me-1 text-danger" />
                        <span className="text-truncate">{item.address}</span>
                      </button>

                      <div className="d-flex gap-2">
                        <button
                          onClick={() => navigate(`/listing/${item.id}`)}
                          className="btn btn-sm flex-fill fw-bold text-white"
                          style={{ backgroundColor: "#001f3f" }}
                        >
                          View Details
                        </button>
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => openInGoogleMaps(item.address)}
                        >
                          <Navigation size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseListings;
