// import React from "react";
// import { Link } from "react-router-dom";

// const Blog = () => {
//   const blogPosts = [
//     {
//       id: 1,
//       category: "Investment",
//       date: "Oct 12, 2024",
//       title: "10 Tips for First-Time Home Buyers in 2025",
//       description:
//         "Navigating the housing market can be tough. Here are the essential tips you need to know before signing.",
//       image:
//         "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
//     },
//     {
//       id: 2,
//       category: "Interior",
//       date: "Nov 05, 2024",
//       title: "Modern Minimalist Designs for Small Spaces",
//       description:
//         "How to make your compact apartment look spacious and luxurious with simple design tweaks.",
//       image:
//         "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
//     },
//     {
//       id: 3,
//       category: "Architecture",
//       date: "Dec 01, 2024",
//       title: "Why Property is Still the Best Long-term Investment",
//       description:
//         "Analyzing the trends of the last decade to understand why real estate remains the king of assets.",
//       image:
//         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
//     },
//     {
//       id: 4,
//       category: "Lifestyle",
//       date: "Jan 10, 2025",
//       title: "Luxury Living: The Rise of Smart Home Technology",
//       description:
//         "From AI security to automated lighting, see how tech is redefining the luxury living experience.",
//       image:
//         "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
//     },
//     {
//       id: 5,
//       category: "Eco-Friendly",
//       date: "Jan 15, 2025",
//       title: "Sustainable Materials for Your Next Renovation",
//       description:
//         "Discover eco-friendly alternatives that are durable, beautiful, and better for the planet.",
//       image:
//         "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
//     },
//     {
//       id: 6,
//       category: "Gardening",
//       date: "Feb 02, 2025",
//       title: "Creating a Backyard Oasis on a Budget",
//       description:
//         "Transform your outdoor space into a sanctuary without breaking the bank using these simple steps.",
//       image:
//         "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
//     },
//   ];

//   // Function to create a URL-friendly name (slug)
//   const createSlug = (title) => {
//     return title
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "") // Remove special characters
//       .replace(/[\s_-]+/g, "-") // Replace spaces with -
//       .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
//   };

//   return (
//     <div className="blog-section py-5 bg-light">
//       <div className="container px-4">
//         {/* Section Header */}
// <div className="text-center mb-5 mt-2 mt-md-4">
//   <span className="text-tan fw-bold ls-2 text-uppercase d-block mb-2 small">
//     Journal & News
//   </span>
//   <h1 className="text-navy fw-800 display-5 display-md-4">
//     Our Latest Stories
//   </h1>
//   <div className="border-gold w-25 mx-auto mt-3 rounded"></div>
// </div>

//         {/* Featured Post Link */}
//         <div className="row mb-5">
//           <div className="col-12">
//             <Link
//               to={`/blog/${createSlug("Global Real Estate Market Forecast 2025")}`}
//               className="text-decoration-none">
//               <div className="card border-0 shadow-lg overflow-hidden rounded-4 transition-hover">
//                 <div className="row g-0">
//                   <div className="col-lg-8">
//                     <img
//                       src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
//                       className="img-fluid h-100 w-100 object-fit-cover"
//                       alt="Featured"
//                       style={{ minHeight: "300px" }}
//                     />
//                   </div>
//                   <div className="col-lg-4 bg-navy d-flex align-items-center">
//                     <div className="p-4 p-md-5">
//                       <span className="badge bg-tan text-navy mb-3 px-3 py-2 fw-bold">
//                         HOT TOPIC
//                       </span>
//                       <h2 className="text-white fw-800 mb-3 h3 h2-md">
//                         Global Real Estate Market Forecast 2025
//                       </h2>
//                       <p className="text-white opacity-75 small mb-0">
//                         An in-depth analysis of emerging markets and urban
//                         development shifts expected in the coming year.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>

//         {/* Blog Grid Links */}
//         <div className="row g-4">
//           {blogPosts.map((post) => (
//             <div key={post.id} className="col-12 col-md-6 col-lg-4">
//               <Link
//                 to={`/blog/${createSlug(post.title)}`}
//                 className="text-decoration-none">
//                 <div className="card h-100 border-0 shadow-sm transition-hover rounded-4 overflow-hidden bg-white">
//                   <div className="position-relative">
//                     <img
//                       src={post.image}
//                       className="card-img-top object-fit-cover"
//                       alt={post.title}
//                       style={{ height: "220px" }}
//                     />
//                     <div className="position-absolute top-0 end-0 m-3">
//                       <span className="badge bg-tan text-navy py-2 px-3 fw-bold shadow-sm">
//                         {post.category}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="card-body p-4 d-flex flex-column">
//                     <div className="d-flex align-items-center mb-2">
//                       <small className="text-muted fw-bold text-uppercase ls-1">
//                         {post.date}
//                       </small>
//                     </div>
//                     <h5 className="card-title text-navy fw-800 mb-3 lh-sm">
//                       {post.title}
//                     </h5>
//                     <p className="card-text text-secondary mb-0 small">
//                       {post.description}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;
import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBLogsApi } from "../features/auth/api";
import { baseUrl } from "../services/baseUrl";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [allblogs, setAllBlogs] = useState([]);

  const blogPosts = [
    {
      id: 1,
      category: "Investment",
      date: "2024-10-12",
      displayDate: "Oct 12, 2024",
      title: "10 Tips for First-Time Home Buyers in 2025",
      description:
        "Navigating the housing market can be tough. Essential tips for buyers.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      category: "Interior",
      date: "2024-11-05",
      displayDate: "Nov 05, 2024",
      title: "Modern Minimalist Designs for Small Spaces",
      description: "Make your compact apartment look spacious and luxurious.",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      category: "Architecture",
      date: "2024-12-01",
      displayDate: "Dec 01, 2024",
      title: "Why Property is Still the Best Long-term Investment",
      description: "Analyzing the trends of the last decade for real estate.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      category: "Lifestyle",
      date: "2025-01-10",
      displayDate: "Jan 10, 2025",
      title: "Luxury Living: The Rise of Smart Home Technology",
      description: "How tech is redefining the luxury living experience.",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const filteredPosts = useMemo(() => {
    let result = allblogs.filter((post) => {
      // 1. Get category name safely from the object
      const postCategory = post.blogCategoryId?.title || "Uncategorized";

      // 2. Format the API date to YYYY-MM-DD for the date picker comparison
      const postDateFull = post.createdAt ? post.createdAt.split("T")[0] : "";

      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesDate = filterDate === "" || postDateFull === filterDate;

      const matchesCategory = category === "All" || postCategory === category;

      return matchesSearch && matchesDate && matchesCategory;
    });

    if (sortBy === "recent")
      return result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

    return result;
  }, [allblogs, searchQuery, filterDate, category, sortBy]);

  const categories = [
    "All",
    ...new Set(allblogs.map((p) => p.blogCategoryId?.title).filter(Boolean)),
  ];
  const createSlug = (title) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const getBlogs = async () => {
    try {
      const response = await getBLogsApi();
      console.log("BlogResponse ", response?.blogs);
      setAllBlogs(response?.blogs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);
  // Helper function to extract plain text from HTML
  const stripHtml = (htmlString) => {
    if (!htmlString) return "";
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  return (
    // Main section with Top Padding to prevent Header Overlap
    <div className="bg-light min-vh-100 pt-5 pb-5">
      <div className="text-center mb-5 mt-2 mt-md-4">
        <span className="text-tan fw-bold ls-2 text-uppercase d-block  small">
          Journal & News
        </span>
        <h1 className="text-navy fw-800 display-5 display-md-4">
          Our Latest Stories
        </h1>
        <div className="border-gold w-25 mx-auto mt-3 rounded"></div>
      </div>
      <div className="px-4 pt-md-4">
        <div className="row g-4 mt-2">
          <div className="col-12 col-lg-3">
            <div
              className="card border-0 shadow-sm rounded-4 p-4 sticky-lg-top"
              style={{ top: "100px", zIndex: 10 }}
            >
              <h6 className="text-navy fw-800 mb-4 ls-1 text-uppercase">
                Filter Results
              </h6>

              <div className="mb-4">
                <label className="form-label text-navy fw-bold small">
                  1. SEARCH BY TITLE
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg fs-6 shadow-none border-light-subtle"
                  placeholder="Keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-navy fw-bold small">
                  2. SELECT DATE
                </label>
                <input
                  type="date"
                  className="form-control form-control-lg fs-6 shadow-none border-light-subtle"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-navy fw-bold small">
                  3. CATEGORY
                </label>
                <select
                  className="form-select form-select-lg fs-6 shadow-none border-light-subtle"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
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
                  setSortBy("recent");
                }}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-9">
            {/* FEATURED POST - Responsive Layout */}
            {!searchQuery && !filterDate && category === "All" && (
              <div className="mb-5">
                <Link
                  to={`/blog/${createSlug("Global Real Estate Market Forecast 2025")}`}
                  className="text-decoration-none"
                >
                  <div className="card border-0 shadow-lg overflow-hidden rounded-4 transition-hover bg-navy">
                    <div className="row g-0">
                      <div className="col-md-7 col-lg-8">
                        <img
                          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                          className="img-fluid h-100 w-100 object-fit-cover"
                          alt="Featured"
                          style={{ minHeight: "350px" }}
                        />
                      </div>
                      <div className="col-md-5 col-lg-4 d-flex align-items-center">
                        <div className="p-4 p-lg-5">
                          <span className="badge bg-tan text-navy mb-3 px-3 py-2 fw-bold">
                            HOT TOPIC
                          </span>
                          <h2 className="text-white fw-800 mb-3 display-6 display-md-5">
                            Global Real Estate Market Forecast 2025
                          </h2>
                          <p className="text-white opacity-75 small">
                            Analysis of emerging markets and shifts in the
                            coming year.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="row g-4">
              {filteredPosts.map((post) => {
                // Format Date for display
                const displayDate = new Date(post.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  },
                );

                return (
                  <div key={post._id} className="col-12 col-md-6 col-xl-4">
                    <Link
                      to={`/blog/${createSlug(post._id)}`}
                      className="text-decoration-none"
                    >
                      <div className="card h-100 border-0 shadow-sm transition-hover rounded-4 overflow-hidden bg-white">
                        <div className="position-relative">
                          <img
                            src={`${baseUrl}${post.image}`}
                            className="card-img-top object-fit-cover"
                            alt={post.title}
                            style={{ height: "220px" }}
                          />
                          <div className="position-absolute top-0 end-0 m-3">
                            <span className="badge bg-tan text-navy py-2 px-3 fw-bold shadow-sm small">
                              {/* Render nested category title */}
                              {post.blogCategoryId?.title}
                            </span>
                          </div>
                        </div>
                        <div className="card-body p-4 d-flex flex-column">
                          <small className="text-muted fw-bold text-uppercase mb-2">
                            {displayDate}
                          </small>
                          <h5 className="card-title text-navy fw-800 mb-3 lh-sm">
                            {post.title}
                          </h5>
                          {/* Replace your current description paragraph with this */}
                          <div
                            className="card-text text-secondary mb-0 small line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: post.description,
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
