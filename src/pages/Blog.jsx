import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      category: "Investment",
      date: "Oct 12, 2024",
      title: "10 Tips for First-Time Home Buyers in 2025",
      description:
        "Navigating the housing market can be tough. Here are the essential tips you need to know before signing.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      category: "Interior",
      date: "Nov 05, 2024",
      title: "Modern Minimalist Designs for Small Spaces",
      description:
        "How to make your compact apartment look spacious and luxurious with simple design tweaks.",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      category: "Architecture",
      date: "Dec 01, 2024",
      title: "Why Property is Still the Best Long-term Investment",
      description:
        "Analyzing the trends of the last decade to understand why real estate remains the king of assets.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      category: "Lifestyle",
      date: "Jan 10, 2025",
      title: "Luxury Living: The Rise of Smart Home Technology",
      description:
        "From AI security to automated lighting, see how tech is redefining the luxury living experience.",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5,
      category: "Eco-Friendly",
      date: "Jan 15, 2025",
      title: "Sustainable Materials for Your Next Renovation",
      description:
        "Discover eco-friendly alternatives that are durable, beautiful, and better for the planet.",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6,
      category: "Gardening",
      date: "Feb 02, 2025",
      title: "Creating a Backyard Oasis on a Budget",
      description:
        "Transform your outdoor space into a sanctuary without breaking the bank using these simple steps.",
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
    },
  ];

  // Function to create a URL-friendly name (slug)
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/[\s_-]+/g, "-") // Replace spaces with -
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
  };

  return (
    <div className="blog-section py-5 bg-light">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-5 mt-2 mt-md-4">
          <span className="text-tan fw-bold ls-2 text-uppercase d-block mb-2 small">
            Journal & News
          </span>
          <h1 className="text-navy fw-800 display-5 display-md-4">
            Our Latest Stories
          </h1>
          <div className="border-gold w-25 mx-auto mt-3 rounded"></div>
        </div>

        {/* Featured Post Link */}
        <div className="row mb-5">
          <div className="col-12">
            <Link
              to={`/blog/${createSlug("Global Real Estate Market Forecast 2025")}`}
              className="text-decoration-none">
              <div className="card border-0 shadow-lg overflow-hidden rounded-4 transition-hover">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                      className="img-fluid h-100 w-100 object-fit-cover"
                      alt="Featured"
                      style={{ minHeight: "300px" }}
                    />
                  </div>
                  <div className="col-lg-4 bg-navy d-flex align-items-center">
                    <div className="p-4 p-md-5">
                      <span className="badge bg-tan text-navy mb-3 px-3 py-2 fw-bold">
                        HOT TOPIC
                      </span>
                      <h2 className="text-white fw-800 mb-3 h3 h2-md">
                        Global Real Estate Market Forecast 2025
                      </h2>
                      <p className="text-white opacity-75 small mb-0">
                        An in-depth analysis of emerging markets and urban
                        development shifts expected in the coming year.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Blog Grid Links */}
        <div className="row g-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-12 col-md-6 col-lg-4">
              <Link
                to={`/blog/${createSlug(post.title)}`}
                className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm transition-hover rounded-4 overflow-hidden bg-white">
                  <div className="position-relative">
                    <img
                      src={post.image}
                      className="card-img-top object-fit-cover"
                      alt={post.title}
                      style={{ height: "220px" }}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-tan text-navy py-2 px-3 fw-bold shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <small className="text-muted fw-bold text-uppercase ls-1">
                        {post.date}
                      </small>
                    </div>
                    <h5 className="card-title text-navy fw-800 mb-3 lh-sm">
                      {post.title}
                    </h5>
                    <p className="card-text text-secondary mb-0 small">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
