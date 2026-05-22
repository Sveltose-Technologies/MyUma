import React, { useEffect, useState } from "react";
import { getAllBookingsAPI, deleteBookingAPI, getImgURL } from "../services/authService";
import { toast } from "react-toastify";
import { Trash2, Eye, MapPin, X } from "lucide-react"; // Icons

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State for "Read More"
  const [selectedInfo, setSelectedInfo] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getAllBookingsAPI();
      if (res.status) {
        setBookings(res.bookings || []);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete Functionality
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const res = await deleteBookingAPI(id);
        if (res.status || res.success) {
          toast.success("Booking deleted successfully");
          // List refresh karein
          setBookings(bookings.filter((item) => item._id !== id));
        }
      } catch (err) {
        toast.error("Failed to delete booking");
      }
    }
  };

  // Helper function to truncate words
  const truncateWords = (str, limit = 3) => {
    if (!str) return "N/A";
    const words = str.split(" ");
    if (words.length <= limit) return str;
    return words.slice(0, limit).join(" ") + "...";
  };

  if (loading)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-navy mb-0">Booking Management</h4>
        <span className="badge bg-danger rounded-pill px-3 py-2">
          {bookings.length} Bookings Found
        </span>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 text-secondary border-0">S.No</th>
                <th className="px-4 py-3 text-secondary border-0">Customer</th>
                <th className="px-4 py-3 text-secondary border-0">Title</th>
                <th className="px-4 py-3 text-secondary border-0">Address</th>
                <th className="px-4 py-3 text-secondary border-0 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((item, index) => (
                  <tr key={item._id} className="border-bottom">
                    <td className="px-4 py-3 text-muted">{index + 1}</td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={getImgURL(item.userId?.profileImage)}
                          className="rounded-circle border"
                          style={{ width: "35px", height: "35px", objectFit: "cover" }}
                          alt=""
                          onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png")}
                        />
                        <div className="fw-bold text-dark small">
                          {item.userId?.fullName || "N/A"}
                        </div>
                      </div>
                    </td>

                    {/* Truncated Title */}
                    <td className="px-4 py-3 fw-bold text-navy small">
                      {truncateWords(item.itemId?.title, 3)}
                    </td>

                    {/* Truncated Address with Read More */}
                    <td className="px-4 py-3">
                      <div className="small text-muted d-flex align-items-center gap-1">
                        <MapPin size={14} className="text-danger" />
                        <span>{truncateWords(item.itemId?.address, 3)}</span>
                        {item.itemId?.address?.split(" ").length > 3 && (
                          <button
                            onClick={() => setSelectedInfo({ title: item.itemId?.title, address: item.itemId?.address })}
                            className="btn btn-link btn-sm p-0 text-primary text-decoration-none fw-bold"
                            style={{ fontSize: "11px" }}
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-outline-danger btn-sm rounded-circle border-0 p-2"
                        title="Delete Booking"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP MODAL for Full Address */}
      {selectedInfo && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}>
          <div className="bg-white rounded-4 shadow-lg p-4 w-100 m-3" style={{ maxWidth: "450px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-navy m-0">Details</h5>
              <button className="btn btn-light rounded-circle p-1" onClick={() => setSelectedInfo(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="mb-3">
              <label className="text-muted small fw-bold">Item Title:</label>
              <p className="fw-bold text-dark">{selectedInfo.title}</p>
            </div>
            <div>
              <label className="text-muted small fw-bold">Full Address:</label>
              <p className="text-secondary small bg-light p-3 rounded-3 border">
                <MapPin size={14} className="text-danger me-1" />
                {selectedInfo.address}
              </p>
            </div>
            <button className="btn btn-navy w-100 mt-3 rounded-pill text-white fw-bold" 
                    style={{backgroundColor: '#001f3f'}}
                    onClick={() => setSelectedInfo(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        .text-navy { color: #001f3f; }
        .btn-navy:hover { opacity: 0.9; }
        .table-hover tbody tr:hover { background-color: #fcfcfc; }
      `}</style>
    </div>
  );
};

export default Bookings;