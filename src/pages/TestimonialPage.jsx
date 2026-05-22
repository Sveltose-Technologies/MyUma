import React, { useState, useEffect, useRef } from "react";
import { getTestimonialsAPI, getImgURL } from "../services/authService";

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  // 1. Fetch the data from API
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await getTestimonialsAPI();
        if (res.success) {
          setTestimonials(res.data);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  // 2. Initialize Bootstrap Carousel manually to force automatic sliding
  useEffect(() => {
    // Only run if loading is finished and there are testimonials
    if (!loading && testimonials.length > 0 && carouselRef.current) {
      const bootstrap = window.bootstrap; // Access global bootstrap from your index.js import

      if (bootstrap) {
        const carouselInstance = new bootstrap.Carousel(carouselRef.current, {
          interval: 2000, // 2 seconds
          ride: "carousel",
          pause: "hover", // Pauses when user hovers over it
          wrap: true, // Continuous loop
        });

        // Explicitly tell it to start cycling
        carouselInstance.cycle();

        // Cleanup: remove the instance when component unmounts
        return () => {
          carouselInstance.dispose();
        };
      }
    }
  }, [loading, testimonials]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}>
        <div className="spinner-border text-tan" role="status"></div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f4f4f4", padding: "80px 0" }}>
      <div className="container">
        {/* PAGE HEADING */}
        <div className="text-center mb-5">
          <h2
            className="fw-bold text-navy text-uppercase"
            style={{ letterSpacing: "2px", color: "#001529" }}>
            Testimonial
          </h2>
          <div
            className="mx-auto"
            style={{
              height: "3px",
              width: "60px",
              marginTop: "10px",
              backgroundColor: "#001529",
            }}></div>
        </div>

        {/* CAROUSEL ELEMENT */}
        <div
          id="testimonialCarousel"
          ref={carouselRef}
          className="carousel slide shadow-sm"
          style={{
            borderRadius: "4px",
            overflow: "hidden",
            maxWidth: "1100px",
            margin: "0 auto",
          }}>
          <div className="carousel-inner">
            {testimonials.map((item, index) => (
              <div
                key={item._id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <div className="row g-0 bg-white align-items-stretch">
                  {/* LEFT SIDE: IMAGE */}
                  <div className="col-md-5">
                    <img
                      src={getImgURL(item.profileImage)}
                      alt={item.fullName}
                      style={{
                        width: "100%",
                        height: "450px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  {/* RIGHT SIDE: CONTENT */}
                  <div className="col-md-7 d-flex align-items-center">
                    <div className="p-5 w-100">
                      <blockquote className="mb-4">
                        <h2
                          className="text-navy"
                          style={{
                            fontSize: "2rem",
                            fontWeight: "400",
                            lineHeight: "1.4",
                            fontFamily: "serif",
                            color: "#001529",
                          }}>
                          “{item.message}”
                        </h2>
                      </blockquote>

                      <div className="d-flex align-items-center mt-5">
                        <div
                          style={{
                            width: "40px",
                            height: "1px",
                            backgroundColor: "#ccc",
                            marginRight: "15px",
                          }}></div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "14px" }}>
                          <span
                            className="text-navy fw-bold"
                            style={{ color: "#001529" }}>
                            {item.fullName}
                          </span>
                          {item.address && (
                            <>
                              <span className="mx-2" style={{ color: "#ccc" }}>
                                |
                              </span>
                              <span className="fw-bold">{item.address}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* INDICATORS (Dots) */}
          {testimonials.length > 1 && (
            <div
              className="carousel-indicators"
              style={{ position: "absolute", bottom: "15px" }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide-to={idx}
                  className={idx === 0 ? "active" : ""}
                  style={{
                    backgroundColor: "#001529",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    border: "none",
                    margin: "0 5px",
                  }}></button>
              ))}
            </div>
          )}
        </div>

        {!loading && testimonials.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-navy opacity-50">No stories available.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialPage;
