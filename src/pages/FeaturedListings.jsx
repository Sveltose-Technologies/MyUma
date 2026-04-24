import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBLogsApi, getImgURL } from "../features/auth/api";

const FeaturedListings = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Blogs and get the 3 most recent
  const fetchRecentBlogs = async () => {
    try {
      setLoading(true);
      const response = await getBLogsApi();
      if (response?.blogs) {
        // Sort by date (newest first) and take the first 3
        const sorted = response.blogs
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setRecentBlogs(sorted);
      }
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  // 2. Slug Helper
  const createSlug = (title) =>
    title
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // 3. 10 Word Description Helper
  const getShortDescription = (htmlString) => {
    if (!htmlString) return "";
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const plainText = doc.body.textContent || "";
    const words = plainText.trim().split(/\s+/);
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : plainText;
  };

  if (loading) return null; // Or a small spinner

  return (
    <section className="bg-light py-5">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h6
            className="fw-bold text-uppercase mb-2"
            style={{ color: "#c49a6c", letterSpacing: "3px" }}>
            Our Journal
          </h6>
          <h2 className="display-5 fw-bold" style={{ color: "#1a2b49" }}>
            Recent Stories
          </h2>
          <div
            className="mx-auto mt-2"
            style={{
              height: "3px",
              width: "60px",
              backgroundColor: "#c49a6c",
            }}></div>
        </div>

        <div className="row g-4 justify-content-center">
          {recentBlogs.map((post) => {
            const blogSlug = createSlug(post.title);
            const displayDate = new Date(post.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              },
            );

            return (
              <div key={post._id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                  {/* Image Link */}
                  <Link
                    to={`/blog/${blogSlug}`}
                    state={{ blogId: post._id }}
                    className="text-decoration-none">
                    <div className="position-relative">
                      <img
                        src={getImgURL(post.image)}
                        className="card-img-top"
                        style={{ height: "240px", objectFit: "cover" }}
                        alt={post.title}
                      />
                      <span
                        className="badge position-absolute top-0 end-0 m-3 py-2 px-3 fw-bold shadow-sm"
                        style={{
                          backgroundColor: "#c49a6c",
                          color: "#1a2b49",
                        }}>
                        {post.blogCategoryId?.title || "Story"}
                      </span>
                    </div>
                  </Link>

                  <div className="card-body p-4 text-center d-flex flex-column">
                    <small className="text-muted fw-bold text-uppercase mb-2">
                      {displayDate}
                    </small>

                    {/* Title Link */}
                    <Link
                      to={`/blog/${blogSlug}`}
                      state={{ blogId: post._id }}
                      className="text-decoration-none">
                      <h4 className="fw-bold mb-3" style={{ color: "#1a2b49" }}>
                        {post.title}
                      </h4>
                    </Link>

                    <p className="text-secondary small mb-4">
                      {getShortDescription(post.description)}
                    </p>

                    <div className="mt-auto">
                      <Link
                        to={`/blog/${blogSlug}`}
                        state={{ blogId: post._id }}
                        className="btn fw-bold px-4 py-2 rounded-pill shadow-sm text-white"
                        style={{
                          backgroundColor: "#1a2b49",
                          fontSize: "0.85rem",
                        }}>
                        VIEW FULL DETAILS
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
