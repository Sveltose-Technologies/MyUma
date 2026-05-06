import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Calendar,
  MapPin,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import {
  getAllBookingsAPI,
  deleteBookingAPI,
  getAllListingsApi,
} from "../services/authService";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both bookings and listings to map the titles/images
      const [bookRes, listRes] = await Promise.all([
        getAllBookingsAPI(),
        getAllListingsApi(),
      ]);

      const allListings = listRes?.listings || [];
      setListings(allListings);

      // Filter bookings for the logged-in user
      const userBookings =
        bookRes?.data?.filter((b) => b.userId === currentUserId) || [];

      // Merge booking data with listing details
      const mergedData = userBookings.map((book) => {
        const details = allListings.find((l) => l._id === book.itemId);
        return { ...book, details };
      });

      setBookings(mergedData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this visit?")) {
      try {
        await deleteBookingAPI(id);
        setBookings(bookings.filter((b) => b._id !== id));
        alert("Booking cancelled successfully.");
      } catch (error) {
        alert("Failed to cancel booking.");
      }
    }
  };

  if (loading)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-navy fw-800 ls-2">LOADING YOUR BOOKINGS...</div>
      </div>
    );

  return (
    <div className="min-vh-100 bg-light">
      {/* Page Header */}
      <div className="bg-navy py-5 mb-5 shadow">
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-white text-decoration-none p-0 mb-3 d-flex align-items-center">
            <ArrowLeft size={18} className="me-2" /> BACK
          </button>
          <h1 className="uma-title text-white mb-0">My Scheduled Visits</h1>
          <p className="text-tan fw-bold ls-1 mb-0">
            MANAGE YOUR PROPERTY VIEWINGS
          </p>
        </div>
      </div>

      <div className="container pb-5">
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden border-gold-top">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 text-navy fw-800 small ls-1">
                    PROPERTY DETAILS
                  </th>
                  <th className="px-4 py-3 text-navy fw-800 small ls-1">
                    BOOKING ID
                  </th>
                  <th className="px-4 py-3 text-navy fw-800 small ls-1">
                    DATE
                  </th>
                  <th className="px-4 py-3 text-navy fw-800 small ls-1 text-end">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((item) => (
                    <tr key={item._id} className="transition-hover">
                      <td className="px-4 py-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-3 bg-light me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              overflow: "hidden",
                            }}>
                            <img
                              src={
                                item.details?.images?.[0]
                                  ? `https://nrislaw.rxchartsquare.com/${item.details.images[0]}`
                                  : "https://placehold.co/100"
                              }
                              className="w-100 h-100 object-fit-cover"
                              alt="Property"
                            />
                          </div>
                          <div>
                            <h6 className="fw-800 text-navy mb-1">
                              {item.details?.title || "Unknown Property"}
                            </h6>
                            <p className="text-muted small mb-0">
                              <MapPin size={12} className="text-tan me-1" />
                              {item.details?.address || "Address N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <code className="text-navy small bg-light p-1 rounded">
                          #{item._id.slice(-8).toUpperCase()}
                        </code>
                      </td>
                      <td className="px-4 py-4">
                        <div className="d-flex align-items-center text-secondary small">
                          <Calendar size={14} className="me-2" />
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                            onClick={() =>
                              navigate(
                                `/browse/${item.details?.title.toLowerCase().replace(/ /g, "-")}`,
                              )
                            }>
                            <ExternalLink size={14} className="me-1" /> View
                          </button>
                          <button
                            className="btn btn-danger btn-sm rounded-pill px-3"
                            onClick={() => handleCancelBooking(item._id)}>
                            <Trash2 size={14} className="me-1" /> Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <div className="py-5">
                        <Calendar size={48} className="text-light mb-3" />
                        <h5 className="text-navy fw-800">No Bookings Found</h5>
                        <p className="text-muted mb-4">
                          You haven't scheduled any visits yet.
                        </p>
                        <button
                          className="uma-btn-navy uma-btn px-5"
                          onClick={() => navigate("/browse")}>
                          EXPLORE PROPERTIES
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
