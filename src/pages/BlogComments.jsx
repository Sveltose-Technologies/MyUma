import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  X,
  MessageSquare,
  User,
  BookOpen,
  Calendar,
} from "lucide-react";
import {
  getAllCommentsAPI,
  deleteCommentAPI,
  updateCommentAPI,
  getImgURL,
} from "../services/authService";
import { toast } from "react-toastify";

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await getAllCommentsAPI();
      setComments(res?.comments || []);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Helper function to truncate text by word count
  const truncateWords = (text, limit = 4) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/); // Split by any whitespace
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      const res = await deleteCommentAPI(id);
      if (res) {
        toast.success("Comment deleted successfully");
        setComments(comments.filter((c) => c._id !== id));
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedCommentText = formData.get("commentText");

    try {
      setUpdating(true);
      const payload = {
        comment: updatedCommentText,
        blogId: editItem.blogId?._id,
        userId: editItem.userId?._id || null,
      };

      const res = await updateCommentAPI(editItem._id, payload);
      if (res) {
        toast.success("Comment updated successfully!");
        setEditItem(null);
        fetchComments();
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="text-center py-5 fw-bold">Loading...</div>;

  return (
    <div className="container-fluid py-5 px-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark mb-0">BLOG COMMENTS</h3>
        <div className="badge bg-dark px-3 py-2">Total: {comments.length}</div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-white border-bottom">
              <tr>
                <th className="px-4 py-3 small fw-bold">USER INFO</th>
                <th className="px-4 py-3 small fw-bold">BLOG TITLE</th>
                <th className="px-4 py-3 small fw-bold">COMMENT</th>
                <th className="px-4 py-3 small fw-bold">POSTED ON</th>
                <th className="px-4 py-3 small fw-bold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((item) => (
                <tr key={item._id}>
                  <td className="px-4">
                    <div className="d-flex align-items-center gap-3">
                      {item.userId?.profileImage ? (
                        <img
                          src={getImgURL(item.userId.profileImage)}
                          width="45"
                          height="45"
                          className="rounded-circle border object-fit-cover"
                          alt="user"
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white"
                          style={{ width: 45, height: 45 }}>
                          <User size={20} />
                        </div>
                      )}
                      <div>
                        <div className="fw-bold small">
                          {item.userId?.fullName || "Anonymous"}
                        </div>
                        <div
                          className="text-muted small"
                          style={{ fontSize: "11px" }}>
                          {item.userId?.email || "No Email"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4">
                    <div className="small text-primary fw-semibold">
                      <BookOpen size={14} className="me-1" />
                      {item.blogId?.title || "N/A"}
                    </div>
                  </td>
                  <td className="px-4">
                    <div
                      className="small text-muted"
                      style={{ maxWidth: "250px" }}>
                      <MessageSquare size={14} className="me-1 text-info" />
                      {/* Truncated Comment Display */}
                      {truncateWords(item.comment, 4)}
                    </div>
                  </td>
                  <td className="px-4">
                    <div className="small text-muted">
                      <Calendar size={14} className="me-1" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        onClick={() => setEditItem(item)}
                        className="btn btn-sm btn-outline-primary rounded-circle">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-outline-danger rounded-circle">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPDATE MODAL */}
      {editItem && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <form
              onSubmit={handleUpdate}
              className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-bottom p-4 bg-white text-dark">
                <h5 className="m-0 fw-bold">Update Comment</h5>
                <X
                  className="cursor-pointer"
                  onClick={() => setEditItem(null)}
                />
              </div>
              <div className="modal-body p-4">
                <div className="mb-4 d-flex align-items-center gap-3 bg-light p-3 rounded-3">
                  {editItem.userId?.profileImage ? (
                    <img
                      src={getImgURL(editItem.userId.profileImage)}
                      width="50"
                      height="50"
                      className="rounded-circle border"
                      alt=""
                    />
                  ) : (
                    <User className="text-secondary" />
                  )}
                  <div>
                    <h6 className="mb-0 fw-bold">
                      {editItem.userId?.fullName || "Anonymous"}
                    </h6>
                    <small className="text-muted">
                      {editItem.blogId?.title}
                    </small>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Edit Message
                  </label>
                  <textarea
                    name="commentText"
                    defaultValue={editItem.comment}
                    className="form-control rounded-3"
                    rows="5"
                    required></textarea>
                </div>
              </div>
              <div className="modal-footer p-3 border-top bg-light">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 rounded-pill"
                  onClick={() => setEditItem(null)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-dark px-5 rounded-pill shadow"
                  disabled={updating}>
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageComments;
