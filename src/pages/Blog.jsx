import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBLogsApi, getImgURL } from "../services/authService";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [category, setCategory] = useState("All");
  const [allblogs, setAllBlogs] = useState([]);
  const [expandedBlogIds, setExpandedBlogIds] = useState([]); // State to handle Read More on same page
  const [loading, setLoading] = useState(true);

  // 1. Fetch Blogs from API
  const getBlogs = async () => {
    setLoading(true);
    try {
      const response = await getBLogsApi();
      if (response?.blogs) {
        setAllBlogs(response.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // 2. Helper to extract plain text and limit to 10 words
  const getShortDescription = (htmlString) => {
    if (!htmlString) return "";
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const plainText = doc.body.textContent || "";
    const words = plainText.trim().split(/\s+/);
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return plainText;
  };

  // 3. Toggle Read More function
  const toggleReadMore = (id) => {
    setExpandedBlogIds((prev) =>
      prev.includes(id)
        ? prev.filter((blogId) => blogId !== id)
        : [...prev, id],
    );
  };

  // 4. Dynamic categories from API data
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(allblogs.map((p) => p.blogCategoryId?.title).filter(Boolean)),
    ];
  }, [allblogs]);

  // 5. Slug helper for Detail URL
  const createSlug = (title) =>
    title
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // 6. Filtering Logic
  const filteredPosts = useMemo(() => {
    return allblogs
      .filter((post) => {
        const postCategory = post.blogCategoryId?.title || "Uncategorized";
        const postDateFull = post.createdAt ? post.createdAt.split("T")[0] : "";

        const matchesSearch = post.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesDate = filterDate === "" || postDateFull === filterDate;
        const matchesCategory = category === "All" || postCategory === category;

        return matchesSearch && matchesDate && matchesCategory;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [allblogs, searchQuery, filterDate, category]);

  return (
    <div className="bg-light min-vh-100 pt-5 pb-5">
      {/* Page Header */}
      <div className="text-center mb-5 mt-2 mt-md-4">
        <span className="text-tan fw-bold ls-2 text-uppercase d-block small">
          Journal & News
        </span>
        <h1 className="text-navy fw-800 display-5 display-md-4">
          Our Latest Stories
        </h1>
        <div className="border-gold w-25 mx-auto mt-3 rounded"></div>
      </div>

      <div className="px-4 pt-md-4">
        <div className="row g-4 mt-2">
          {/* Sidebar - Dynamic Filters */}
          <div className="col-12 col-lg-3">
            <div
              className="card border-0 shadow-sm rounded-4 p-4 sticky-lg-top"
              style={{ top: "100px", zIndex: 10 }}>
              <h6 className="text-navy fw-800 mb-4 ls-1 text-uppercase">
                Filter Results
              </h6>

              <div className="mb-4">
                <label className="form-label text-navy fw-bold small">
                  SEARCH BY TITLE
                </label>
                <input
                  type="text"
                  className="form-control shadow-none border-light-subtle"
                  placeholder="Keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-navy fw-bold small">
                  SELECT DATE
                </label>
                <input
                  type="date"
                  className="form-control shadow-none border-light-subtle"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-navy fw-bold small">
                  CATEGORY
                </label>
                <select
                  className="form-select shadow-none border-light-subtle"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn btn-outline-secondary w-100 fw-bold border-light-subtle"
                onClick={() => {
                  setSearchQuery("");
                  setFilterDate("");
                  setCategory("All");
                }}>
                RESET FILTERS
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-9">
        

            <div className="row g-4">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-navy" role="status"></div>
                  <p className="mt-2 text-muted">Loading Stories...</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => {
                  const isExpanded = expandedBlogIds.includes(post._id);
                  const displayDate = new Date(
                    post.createdAt,
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  });

                  return (
                    <div key={post._id} className="col-12 col-md-6 col-xl-4">
                      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                        <div className="position-relative">
                          {/* Title Link with Slug and Hidden ID */}
                          <Link
                            to={`/blog/${createSlug(post.title)}`}
                            state={{ blogId: post._id }}>
                            <img
                              src={getImgURL(post.image)}
                              className="card-img-top object-fit-cover"
                              alt={post.title}
                              style={{ height: "220px" }}
                            />
                          </Link>
                          <div className="position-absolute top-0 end-0 m-3">
                            <span className="badge bg-tan text-navy py-2 px-3 fw-bold shadow-sm small">
                              {post.blogCategoryId?.title || "General"}
                            </span>
                          </div>
                        </div>

                        <div className="card-body p-4 d-flex flex-column">
                          <small className="text-muted fw-bold text-uppercase mb-2">
                            {displayDate}
                          </small>
                          <Link
                            to={`/blog/${createSlug(post.title)}`}
                            state={{ blogId: post._id }}
                            className="text-decoration-none">
                            <h5 className="card-title text-navy fw-800 mb-3 lh-sm">
                              {post.title}
                            </h5>
                          </Link>

                          {/* Description Logic: 10 words or Full Content */}
                          <div className="card-text text-secondary mb-3 small">
                            {isExpanded ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: post.description,
                                }}
                              />
                            ) : (
                              <p className="mb-0">
                                {getShortDescription(post.description)}
                              </p>
                            )}
                          </div>

                          {/* Read More Button - Same Page Expansion */}
                          <div className="mt-auto">
                            <button
                              onClick={() => toggleReadMore(post._id)}
                              className="btn btn-link p-0 text-tan fw-bold text-decoration-none small d-flex align-items-center gap-2">
                              {isExpanded ? "READ LESS" : "READ MORE"}
                              <i
                                className={`bi bi-arrow-${isExpanded ? "up" : "right"}`}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12 text-center py-5">
                  <h4 className="text-muted">
                    No stories found matching your criteria.
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
