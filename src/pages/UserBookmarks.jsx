import React, { useEffect, useState } from "react";
import {
  getAllBookingsAPI,
  deleteBookingAPI,
  getImgURL,
} from "../services/authService";
import { toast } from "react-toastify";
import {
  Trash2,
  MapPin,
  X,
  Calendar,
  Bookmark,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MyBookmarks = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookmark, setSelectedBookmark] = useState(null); // For View Popup

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const userStr = localStorage.getItem("user");
  const currentUser = userStr ? JSON.parse(userStr) : null;
  const currentUserId = currentUser?.id || currentUser?._id;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getAllBookingsAPI();
      if (res.status || res.bookings) {
        const allBookings = res.bookings || [];
        const userBookings = allBookings.filter((item) => {
          const bookingUserId =
            item.userId?._id || item.userId?.id || item.userId;
          return bookingUserId === currentUserId;
        });
        setBookings(userBookings);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) fetchBookings();
    else setLoading(false);
  }, [currentUserId]);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this bookmark?")) return;
    try {
      const res = await deleteBookingAPI(id);
      if (res) {
        toast.success("Removed successfully");
        setBookings((prev) => prev.filter((item) => item._id !== id));
        if (currentItems.length === 1 && currentPage > 1)
          setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading)
    return (
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-2 fw-bold text-navy">Loading Your Bookmarks...</p>
      </div>
    );

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-navy">My Bookmarks</h4>
        <span className="badge bg-danger rounded-pill px-3 py-2">
          {bookings.length} Items
        </span>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-0">S.No</th>
                <th className="px-4 py-3 border-0">Image</th>
                <th className="px-4 py-3 border-0">Title</th>
                <th className="px-4 py-3 border-0">Date</th>
                <th className="px-4 py-3 border-0 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3 text-muted">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={getImgURL(item.itemId?.images?.[0])}
                        className="rounded"
                        style={{
                          width: "45px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </td>
                    <td className="px-4 py-3 fw-bold small">
                      {item.itemId?.title || "N/A"}
                    </td>
                    <td className="px-4 py-3 small text-muted">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          onClick={() => setSelectedBookmark(item)}
                          className="btn btn-sm btn-outline-primary border-0 rounded-circle p-2">
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No bookmarks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {bookings.length > itemsPerPage && (
        <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="btn btn-light btn-sm rounded-circle shadow-sm">
            <ChevronLeft size={20} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`btn btn-sm rounded-circle px-3 ${currentPage === i + 1 ? "btn-danger shadow" : "btn-light"}`}>
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="btn btn-light btn-sm rounded-circle shadow-sm">
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* VIEW MODAL (Popup) */}
      {selectedBookmark && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
          <div
            className="bg-white rounded-4 shadow-lg overflow-hidden w-100 m-3"
            style={{ maxWidth: "500px" }}>
            <div className="position-relative">
              <img
                src={getImgURL(selectedBookmark.itemId?.images?.[0])}
                className="w-100"
                style={{ height: "200px", objectFit: "cover" }}
                alt=""
              />
              <button
                onClick={() => setSelectedBookmark(null)}
                className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-3 shadow">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <h5 className="fw-bold text-navy mb-1">
                {selectedBookmark.itemId?.title}
              </h5>
              <div className="d-flex align-items-center gap-1 text-muted small mb-3">
                <MapPin size={14} className="text-danger" />{" "}
                {selectedBookmark.itemId?.address}
              </div>
              <hr />
              <div className="d-flex justify-content-between small text-secondary mb-2">
                <span>Bookmarked On:</span>
                <span className="fw-bold">
                  {formatDate(selectedBookmark.createdAt)}
                </span>
              </div>
              <button
                onClick={() => setSelectedBookmark(null)}
                className="btn btn-navy w-100 mt-3 rounded-pill text-white fw-bold py-2"
                style={{ backgroundColor: "#001f3f" }}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`.text-navy { color: #001f3f; }`}</style>
    </div>
  );
};

export default MyBookmarks;
