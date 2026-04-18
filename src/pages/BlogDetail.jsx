import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogDetailsApi } from "../features/auth/api";
import { baseUrl } from "../services/baseUrl";

const BlogDetail = () => {
  const { id } = useParams();
  const [detailsBlog, setDetailsBlog] = useState({});
  console.log("Details of Blog", detailsBlog);

  const getBlogDetails = async (id) => {
    try {
      const response = await getBlogDetailsApi(id);
      setDetailsBlog(response?.blog);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails(id);
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1. Comment State Logic
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "James Wilson",
      date: "Feb 14, 2025",
      text: "This was incredibly helpful! As a first-time buyer, the budget section really clarified things for me.",
      initials: "JW",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      date: "Feb 15, 2025",
      text: "Do you have any recommendations for specific emerging neighborhoods in 2025?",
      initials: "SJ",
    },
  ]);

  const [newComment, setNewComment] = useState({ name: "", text: "" });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.text) {
      const addition = {
        id: Date.now(),
        name: newComment.name,
        date: "Just now",
        text: newComment.text,
        initials: newComment.name.charAt(0).toUpperCase(),
      };
      setComments([...comments, addition]);
      setNewComment({ name: "", text: "" });
    }
  };

  const post = {
    title: "10 Tips for First-Time Home Buyers in 2025",
    category: "Real Estate",
    date: "Feb 12, 2025",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  };
  // Helper function to extract plain text from HTML
  const stripHtml = (htmlString) => {
    if (!htmlString) return "";
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const displayDate = detailsBlog?.createdAt
    ? new Date(detailsBlog.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "Loading date...";
  return (
    <div className="bg-white min-vh-100 py-5">
      <div className="container px-4">
        {/* Header Section */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-12 col-lg-8">
            <nav className="mb-3">
              <Link
                to="/blog"
                className="text-tan fw-bold text-decoration-none small text-uppercase ls-2"
              >
                <i className="bi bi-arrow-left me-1"></i> Back to Blog
              </Link>
            </nav>
            <h1 className="text-navy fw-800 display-5 mb-3">
              {detailsBlog.title}
            </h1>
            <div className="text-muted small fw-bold text-uppercase ls-1">
              {/* 2. Safely access the nested category title and use the formatted date */}
              {detailsBlog?.blogCategoryId?.title || "Uncategorized"}
              <span className="text-tan mx-2">•</span>
              {displayDate}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="ratio ratio-16x9 shadow-sm">
              <img
                src={`${baseUrl}${detailsBlog?.image}`}
                className="rounded-4 object-fit-cover w-100 h-100"
                alt={post.title}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7">
            <article className="text-secondary fs-5 lh-lg mb-5">
              <p className="fw-bold text-navy mb-4"></p>
              <p className="mb-4"> {stripHtml(detailsBlog.description)}</p>

              <div
                className="border-gold w-25 my-5 rounded"
                style={{ borderTop: "3px solid var(--tan)" }}
              ></div>
            </article>

            {/* --- COMMENT SECTION START --- */}
            <div className="mt-5 pt-5 border-top">
              {/* Comment Form */}
              <div className="card border-0 bg-light p-4 rounded-4 shadow-sm">
                <h5 className="text-navy fw-800 mb-3">Leave a Response</h5>
                <form onSubmit={handleCommentSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <textarea
                        className="form-control border-1 shadow-none px-3 py-3 rounded-3"
                        rows="4"
                        placeholder="Write your comment here..."
                        value={newComment.text}
                        onChange={(e) =>
                          setNewComment({ ...newComment, text: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <button className="uma-btn-navy uma-btn-navy:hover ">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* --- COMMENT SECTION END --- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
