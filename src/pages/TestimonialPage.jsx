
// import React, { useState, useEffect } from "react";
// import { getTestimonialsAPI, getImgURL } from "../services/authService";

// const TestimonialPage = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchList = async () => {
//       try {
//         const res = await getTestimonialsAPI();
//         if (res.success) {
//           setTestimonials(res.data);
//         }
//       } catch (err) {
//         console.error("API Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchList();
//   }, []);

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}>
//         <div className="spinner-border text-tan" role="status"></div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ backgroundColor: "#f4f4f4", padding: "80px 0" }}>
//       <div className="container">
//         {/* PAGE HEADING */}
//         <div className="text-center mb-5">
//           <h2
//             className="fw-bold text-navy text-uppercase"
//             style={{ letterSpacing: "2px" }}>
//             Testimonial
//           </h2>
//           <div
//             className="mx-auto bg-navy"
//             style={{ height: "3px", width: "60px", marginTop: "10px" }}></div>
//         </div>

//         {/* AUTOMATIC CAROUSEL */}
//         <div
//           id="testimonialCarousel"
//           className="carousel slide shadow-sm"
//           data-bs-ride="carousel"
//           data-bs-interval="2000" 
//           style={{
//             borderRadius: "4px",
//             overflow: "hidden",
//             maxWidth: "1100px",
//             margin: "0 auto",
//           }}>
//           <div className="carousel-inner">
//             {testimonials.map((item, index) => (
//               <div
//                 key={item._id}
//                 className={`carousel-item ${index === 0 ? "active" : ""}`}>
//                 <div className="row g-0 bg-white align-items-stretch">
//                   {/* LEFT SIDE: IMAGE (Fixed Height & Width) */}
//                   <div className="col-md-5">
//                     <img
//                       src={getImgURL(item.profileImage)}
//                       alt={item.fullName}
//                       style={{
//                         width: "100%", // Width column ke hisaab se
//                         height: "450px", // Fixed height sabke liye same
//                         objectFit: "cover", // Image crop hogi but stretch nahi hogi
//                         display: "block",
//                       }}
//                     />
//                   </div>

//                   {/* RIGHT SIDE: CONTENT */}
//                   <div className="col-md-7 d-flex align-items-center">
//                     <div className="p-5 w-100">
//                       {/* Quote Message */}
//                       <blockquote className="mb-4">
//                         <h2
//                           className="text-navy"
//                           style={{
//                             fontSize: "2rem",
//                             fontWeight: "400",
//                             lineHeight: "1.4",
//                             fontFamily: "serif",
//                           }}>
//                           “{item.message}”
//                         </h2>
//                       </blockquote>

//                       {/* Footer with Name and Address */}
//                       <div className="d-flex align-items-center mt-5">
//                         <div
//                           style={{
//                             width: "40px",
//                             height: "1px",
//                             backgroundColor: "#ccc",
//                             marginRight: "15px",
//                           }}></div>
//                         <div
//                           className="text-muted"
//                           style={{ fontSize: "14px" }}>
//                           <span className="text-navy fw-bold">
//                             {item.fullName}
//                           </span>
//                           {item.address && (
//                             <>
//                               <span className="mx-2" style={{ color: "#ccc" }}>
                             
//                               </span>
//                               <span className="fw-bold">{item.address}</span>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Indicators / Dots for Auto Slider */}
//           {testimonials.length > 1 && (
//             <div
//               className="carousel-indicators"
//               style={{ marginBottom: "-40px" }}>
//               {testimonials.map((_, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   data-bs-target="#testimonialCarousel"
//                   data-bs-slide-to={idx}
//                   className={idx === 0 ? "active" : ""}
//                   style={{
//                     backgroundColor: "#001529",
//                     width: "10px",
//                     height: "10px",
//                     borderRadius: "50%",
//                   }}></button>
//               ))}
//             </div>
//           )}
//         </div>

//         {!loading && testimonials.length === 0 && (
//           <div className="text-center py-5">
//             <h4 className="text-navy opacity-50">No stories available.</h4>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestimonialPage;

import React, { useState, useEffect } from "react";
import { getTestimonialsAPI, getImgURL } from "../services/authService";

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Fetch Data from API
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await getTestimonialsAPI();
        if (res.success) {
          setTestimonials(res.data || []);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  // 2. Automatic Sliding Logic (Pure React)
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Change slide every 4 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f4f4f4", padding: "80px 0" }}>
      <div className="container">
        
        {/* HEADING SECTION */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark text-uppercase" style={{ letterSpacing: "2px" }}>
            Testimonial
          </h2>
          <div className="mx-auto" style={{ height: "3px", width: "60px", backgroundColor: "#001529", marginTop: "10px" }}></div>
        </div>

        {testimonials.length > 0 ? (
          <div className="slider-container shadow-lg">
            {testimonials.map((item, index) => (
              <div
                key={item._id || index}
                className={`custom-slide ${index === currentIndex ? "active" : ""}`}
              >
                <div className="row g-0 align-items-stretch bg-white h-100">
                  
                  {/* LEFT SIDE: IMAGE */}
                  <div className="col-md-5 position-relative">
                    <img
                      src={getImgURL(item.profileImage)}
                      alt={item.fullName}
                      className="slider-img"
                    />
                  </div>

                  {/* RIGHT SIDE: CONTENT */}
                  <div className="col-md-7 d-flex align-items-center">
                    <div className="p-4 p-lg-5 content-box">
                      <blockquote className="mb-4">
                        <h2 className="quote-text">
                          “{item.message}”
                        </h2>
                      </blockquote>

                      <div className="d-flex align-items-center mt-5">
                        <div className="dash"></div>
                        <div className="author-info">
                          <span className="fw-bold text-dark">{item.fullName}</span>
                          {item.address && (
                            <span className="text-muted ms-2">| {item.address}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}

            {/* DOT INDICATORS */}
            {testimonials.length > 1 && (
              <div className="dot-container">
                {testimonials.map((_, idx) => (
                  <div
                    key={idx}
                    className={`dot ${idx === currentIndex ? "active" : ""}`}
                    onClick={() => setCurrentIndex(idx)}
                  ></div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-5 text-muted">
            <h4>No testimonials found.</h4>
          </div>
        )}
      </div>

      <style>{`
        /* Container Setup */
        .slider-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          height: 450px;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
        }

        /* Slide Logic */
        .custom-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
          z-index: 1;
          pointer-events: none;
        }

        .custom-slide.active {
          opacity: 1;
          z-index: 2;
          pointer-events: auto;
        }

        /* Image Styling */
        .slider-img {
          width: 100%;
          height: 450px;
          object-fit: cover;
          display: block;
        }

        /* Text Styling */
        .quote-text {
          font-size: 1.8rem;
          font-weight: 400;
          line-height: 1.4;
          color: #001529;
          font-family: 'Georgia', serif;
        }

        .dash {
          width: 30px;
          height: 1px;
          background-color: #000;
          margin-right: 15px;
        }

        .author-info {
          font-size: 14px;
          letter-spacing: 0.5px;
        }

        /* Dots Styling */
        .dot-container {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ccc;
          cursor: pointer;
          transition: 0.3s;
        }

        .dot.active {
          background: #001529;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .slider-container { height: auto; min-height: 600px; }
          .slider-img { height: 300px; }
          .quote-text { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  );
};

export default TestimonialPage;