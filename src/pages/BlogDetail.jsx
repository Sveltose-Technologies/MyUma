import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Post Data
  const post = {
    title: "10 Tips for First-Time Home Buyers in 2025",
    category: "Real Estate",
    date: "Feb 12, 2025",
    author: "Elena Vance",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  };

  return (
    <div className="bg-white min-vh-100 py-5">
      <div className="container px-4">
        
        {/* 1. Header Section - Simple and Centered */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-12 col-lg-8">
            <nav className="mb-3">
              <Link to="/blog" className="text-tan fw-bold text-decoration-none small text-uppercase ls-2">
                <i className="bi bi-arrow-left me-1"></i> Back to Blog
              </Link>
            </nav>
            <h1 className="text-navy fw-800 display-5 mb-3">{post.title}</h1>
            <div className="text-muted small fw-bold text-uppercase ls-1">
              {post.category} <span className="text-tan mx-2">•</span> {post.date}
            </div>
          </div>
        </div>

        {/* 2. Image Section - Reduced size and Centered */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="ratio ratio-16x9 shadow-sm">
              <img 
                src={post.image} 
                className="rounded-4 object-fit-cover w-100 h-100" 
                alt={post.title} 
              />
            </div>
          </div>
        </div>

        {/* 3. Content Section - Clean Typography */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7">
            
            <article className="text-secondary fs-5 lh-lg">
              <p className="fw-bold text-navy mb-4">
                The journey to owning your first home in 2025 requires preparation, patience, and a clear understanding of the evolving real estate market.
              </p>

              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt.
              </p>

              <h4 className="text-navy fw-800 my-4">Understanding Your Budget</h4>
              <p className="mb-4">
                Quisque non tellus orci ac auctor augue mauris augue neque. Cras sed felis eget velit aliquet sagittis id consectetur purus. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt.
              </p>

              {/* Simple Divider */}
              <div className="border-gold w-25 my-5 rounded"></div>

              <h4 className="text-navy fw-800 my-4">Choosing the Right Location</h4>
              <p className="mb-4">
                Donec ac diam rhoncus, pretium neque nec, gravida erat. In hac habitasse platea dictumst. Sed ac lacinia ligula. Nam varius massa nec quam volutpat, ac feugiat tellus interdum.
              </p>
            </article>

            {/* 4. Simple Sidebar Widget at Bottom (Mobile Friendly) */}
            {/* <div className="card border-0 bg-light p-4 rounded-4 mt-5 text-center shadow-sm">
              <h5 className="fw-800 text-navy mb-2">Subscribe to our News</h5>
              <p className="small text-muted mb-3">Get elite market updates delivered weekly.</p>
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                <input type="email" className="form-control border-0 shadow-none px-3 py-2 rounded-3" style={{ maxWidth: '300px' }} placeholder="Your email" />
                <button className="btn btn-tan-solid px-4 rounded-3">Join</button>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;