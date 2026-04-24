import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getBlogDetailsApi, getImgURL } from "../features/auth/api";

const BlogDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [detailsBlog, setDetailsBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const blogId = location.state?.blogId;

  const getBlogDetails = async (id) => {
    try {
      setLoading(true);
      const response = await getBlogDetailsApi(id);
      if (response?.blog) {
        setDetailsBlog(response.blog);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) {
      getBlogDetails(blogId);
    }
  }, [blogId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!detailsBlog) return null;

  const displayDate = new Date(detailsBlog.createdAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "2-digit", year: "numeric" },
  );

  return (
    <div className="bg-white min-vh-100 py-5">
      {/* IMPROVED CSS: Text is Left-Aligned, Box is Centered */}
      <style>
        {`
          .blog-detail-content {
            width: 100%;
            text-align: left !important; /* Text starts from left */
          }
          
          .blog-detail-content * {
            text-align: left !important;
            max-width: 100% !important;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
          }

          /* This ensures paragraphs take full width so they don't float right */
          .blog-detail-content p {
            width: 100% !important;
            margin-bottom: 1.5rem;
            display: block;
          }

          .blog-detail-content img {
            max-width: 100%;
            height: auto;
            margin: 10px 0;
          }
        `}
      </style>

      <div className="container px-4">
        {/* Navigation & Title */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-12 col-lg-8">
            <nav className="mb-4">
              <Link
                to="/blog"
                className="text-decoration-none fw-bold small text-uppercase"
                style={{ color: "#c49a6c" }}>
                <i className="bi bi-arrow-left me-1"></i> Back to Journal
              </Link>
            </nav>
            <h1
              className="fw-bolder display-4 mb-3"
              style={{ color: "#1a2b49" }}>
              {detailsBlog.title}
            </h1>
            <div className="text-muted small fw-bold text-uppercase">
              <span style={{ color: "#c49a6c" }}>
                {detailsBlog?.blogCategoryId?.title || "Real Estate"}
              </span>
              <span className="mx-3 opacity-50">|</span>
              <span>{displayDate}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-10">
            <div className="ratio ratio-21x9 shadow-sm rounded-4 overflow-hidden">
              <img
                src={getImgURL(detailsBlog.image)}
                className="img-fluid object-fit-cover"
                alt={detailsBlog.title}
              />
            </div>
          </div>
        </div>

        {/* 2. DESCRIPTION SECTION - LEFT ALIGNED WITHIN CENTERED COLUMN */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <article className="text-secondary fs-5 lh-lg mb-5">
              <div
                className="blog-detail-content"
                dangerouslySetInnerHTML={{ __html: detailsBlog.description }}
              />

              {/* Decorative Line Centered */}
              <div className="d-flex justify-content-center my-5">
                <div
                  style={{
                    width: "80px",
                    height: "4px",
                    backgroundColor: "#c49a6c",
                  }}
                  className="rounded"></div>
              </div>
            </article>

            {/* Response Form */}
            <div className="mt-5 pt-5 border-top d-flex justify-content-center">
              <div
                className="card border-0 bg-light p-4 p-md-5 rounded-4 shadow-sm w-100"
                style={{ maxWidth: "700px" }}>
                <h4 className="fw-bold mb-4 text-center">Leave a Response</h4>
                <textarea
                  className="form-control border-0 mb-3 rounded-4 p-3 shadow-none"
                  rows="5"
                  placeholder="Share your thoughts..."></textarea>
                <button className="btn btn-dark w-100 rounded-pill py-3 fw-bold">
                  POST COMMENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
