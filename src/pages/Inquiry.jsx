import React, { useEffect, useState } from "react";
import { getInquiriesApi, deleteInquireApi } from "../services/authService";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const Inquiry= () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await getInquiriesApi();
      setInquiries(res?.data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteInquireApi(id);
      toast.success("Deleted");
      fetchInquiries();
    } catch (error) {
      toast.error("Failed");
    }
  };

  // Logic to show only first 3 words
  const truncateMessage = (text) => {
    if (!text) return "N/A";
    const words = text.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return text;
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container-fluid py-4">
      <h4 className="mb-4 fw-bold">All Customer Inquiries</h4>

      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 text-secondary fw-bold small">S.No</th>
                <th className="py-3 text-secondary fw-bold small">FULL NAME</th>
                <th className="py-3 text-secondary fw-bold small">EMAIL</th>
                <th className="py-3 text-secondary fw-bold small">PHONE</th>
                <th className="py-3 text-secondary fw-bold small">LISTING</th>
                <th className="py-3 text-secondary fw-bold small">OWNER</th>
                <th className="py-3 text-secondary fw-bold small">MESSAGE</th>
                <th className="py-3 text-secondary fw-bold small">DATE</th>
                <th className="px-4 py-3 text-secondary fw-bold small text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 text-muted small">{index + 1}</td>

                    {/* Name Column */}
                    <td className="fw-bold text-dark">{item.fullName}</td>

                    {/* Email Column */}
                    <td className="text-muted">{item.email}</td>

                    {/* Phone Column */}
                    <td>{item.phoneNo}</td>

                    {/* Listing Column */}
                    <td>
                      <span className="badge bg-info-subtle text-info border border-info-subtle">
                        {item.itemId?.title || "N/A"}
                      </span>
                    </td>

                    {/* Owner Column */}
                    <td className="small fw-semibold">
                      {item.ownerId?.fullName || "N/A"}
                    </td>

                    {/* Message Column (3 Words Only) */}
                    <td className="text-muted" title={item.comment}>
                      {truncateMessage(item.comment)}
                    </td>

                    {/* Date Column */}
                    <td className="small text-muted">
                      {item.createdAt ? item.createdAt.split("T")[0] : "N/A"}
                    </td>

                    {/* Action Column */}
                    <td className="px-4 text-center">
                      <button
                        className="btn btn-sm text-danger border-0"
                        onClick={() => handleDelete(item._id)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5 text-muted">
                    No Inquiries Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
