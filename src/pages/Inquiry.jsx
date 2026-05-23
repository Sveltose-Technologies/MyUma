// import React, { useEffect, useState } from "react";
// import { getInquiriesApi, deleteInquireApi } from "../services/authService";
// import { toast } from "react-toastify";
// import { Trash2 } from "lucide-react";

// const Inquiry= () => {
//   const [inquiries, setInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchInquiries = async () => {
//     try {
//       setLoading(true);
//       const res = await getInquiriesApi();
//       setInquiries(res?.data || []);
//     } catch (error) {
//       console.error("Error fetching inquiries:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await deleteInquireApi(id);
//       toast.success("Deleted");
//       fetchInquiries();
//     } catch (error) {
//       toast.error("Failed");
//     }
//   };

//   // Logic to show only first 3 words
//   const truncateMessage = (text) => {
//     if (!text) return "N/A";
//     const words = text.split(" ");
//     if (words.length > 3) {
//       return words.slice(0, 3).join(" ") + "...";
//     }
//     return text;
//   };

//   if (loading) return <div className="text-center py-5">Loading...</div>;

//   return (
//     <div className="container-fluid py-4">
//       <h4 className="mb-4 fw-bold">All Customer Inquiries</h4>

//       <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="bg-light">
//               <tr>
//                 <th className="px-4 py-3 text-secondary fw-bold small">S.No</th>
//                 <th className="py-3 text-secondary fw-bold small">FULL NAME</th>
//                 <th className="py-3 text-secondary fw-bold small">EMAIL</th>
//                 <th className="py-3 text-secondary fw-bold small">PHONE</th>
//                 <th className="py-3 text-secondary fw-bold small">LISTING</th>
//                 <th className="py-3 text-secondary fw-bold small">OWNER</th>
//                 <th className="py-3 text-secondary fw-bold small">MESSAGE</th>
//                 <th className="py-3 text-secondary fw-bold small">DATE</th>
//                 <th className="px-4 py-3 text-secondary fw-bold small text-center">
//                   ACTION
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {inquiries.length > 0 ? (
//                 inquiries.map((item, index) => (
//                   <tr key={item._id}>
//                     <td className="px-4 text-muted small">{index + 1}</td>

//                     {/* Name Column */}
//                     <td className="fw-bold text-dark">{item.fullName}</td>

//                     {/* Email Column */}
//                     <td className="text-muted">{item.email}</td>

//                     {/* Phone Column */}
//                     <td>{item.phoneNo}</td>

//                     {/* Listing Column */}
//                     <td>
//                       <span className="badge bg-info-subtle text-info border border-info-subtle">
//                         {item.itemId?.title || "N/A"}
//                       </span>
//                     </td>

//                     {/* Owner Column */}
//                     <td className="small fw-semibold">
//                       {item.ownerId?.fullName || "N/A"}
//                     </td>

//                     {/* Message Column (3 Words Only) */}
//                     <td className="text-muted" title={item.comment}>
//                       {truncateMessage(item.comment)}
//                     </td>

//                     {/* Date Column */}
//                     <td className="small text-muted">
//                       {item.createdAt ? item.createdAt.split("T")[0] : "N/A"}
//                     </td>

//                     {/* Action Column */}
//                     <td className="px-4 text-center">
//                       <button
//                         className="btn btn-sm text-danger border-0"
//                         onClick={() => handleDelete(item._id)}>
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className="text-center py-5 text-muted">
//                     No Inquiries Found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inquiry;
import React, { useEffect, useState } from "react";
import { getInquiriesApi, deleteInquireApi } from "../services/authService";
import { toast } from "react-toastify";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await getInquiriesApi();
      setInquiries(res?.data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?"))
      return;
    try {
      const res = await deleteInquireApi(id);
      if (res) {
        toast.success("Inquiry Deleted Successfully! 🗑️");
        fetchInquiries();
        // Adjust page if the last item on a page is deleted
        if (currentInquiries.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      toast.error("Failed to delete inquiry ❌");
    }
  };

  const truncateMessage = (text) => {
    if (!text) return "N/A";
    const words = text.trim().split(/\s+/);
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return text;
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInquiries = inquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(inquiries.length / itemsPerPage);

  if (loading)
    return <div className="text-center py-5 fw-bold">Loading Inquiries...</div>;

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark m-0">Customer Inquiries</h4>
        <div className="badge bg-dark px-3 py-2">Total: {inquiries.length}</div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-white border-bottom">
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
              {currentInquiries.length > 0 ? (
                currentInquiries.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 text-muted small">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="fw-bold text-primary small">
                      {item.fullName}
                    </td>
                    <td className="text-muted small">{item.email}</td>
                    <td className="small">{item.phoneNo}</td>
                    <td>
                      <span className="badge bg-info-subtle text-info border border-info-subtle small px-2 py-1">
                        {item.itemId?.title || "N/A"}
                      </span>
                    </td>
                    <td className="small fw-semibold text-secondary">
                      {/* Displays owner name if populated, else N/A */}
                      {item.ownerId?.fullName || "N/A"}
                    </td>
                    <td className="text-muted small" title={item.comment}>
                      {truncateMessage(item.comment)}
                    </td>
                    <td className="small text-muted">
                      {item.createdAt ? item.createdAt.split("T")[0] : "N/A"}
                    </td>
                    <td className="px-4 text-center">
                      <button
                        className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2"
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
          <button
            className="btn btn-white shadow-sm border rounded-circle p-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}>
            <ChevronLeft size={20} />
          </button>

          <span className="fw-bold small">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-white shadow-sm border rounded-circle p-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}>
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Inquiry;