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
//         {testimonials.map((item) => (
//           <div
//             key={item._id}
//             className="row g-0 bg-white mb-5 shadow-sm align-items-stretch"
//             style={{ borderRadius: "4px", overflow: "hidden" }}>
//             {/* LEFT SIDE: LARGE RECTANGULAR IMAGE */}
//             <div className="col-md-5 position-relative">
//               <img
//                 src={getImgURL(item.profileImage)}
//                 alt={item.fullName}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   minHeight: "400px",
//                   objectFit: "cover",
//                   display: "block",
//                 }}
//               />

//             </div>

//             {/* RIGHT SIDE: CONTENT */}
//             <div className="col-md-7 d-flex align-items-center">
//               <div className="p-5 w-100">
//                 {/* Header within the card */}
//                 <div className="d-flex justify-content-between align-items-center mb-5">

//                 </div>

//                 {/* Main Message */}
//                 <blockquote className="mb-4">
//                   <h2
//                     className="text-navy"
//                     style={{
//                       fontSize: "2rem",
//                       fontWeight: "400",
//                       lineHeight: "1.4",
//                       fontFamily: "serif",
//                     }}>
//                     “{item.message}”
//                   </h2>
//                 </blockquote>

//                 {/* Footer / Attribution */}
//                 <div className="d-flex align-items-center mt-5">
//                   <div
//                     style={{
//                       width: "40px",
//                       height: "1px",
//                       backgroundColor: "#ccc",
//                       marginRight: "15px",
//                     }}></div>
//                   <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
//                     <span className="text-navy fw-bold">{item.fullName}</span>
//                     {/* <span className="mx-2">//</span>
//                     {item.address} */}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

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

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}>
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
            style={{ letterSpacing: "2px" }}>
            Testimonial
          </h2>
          <div
            className="mx-auto bg-navy"
            style={{ height: "3px", width: "60px", marginTop: "10px" }}></div>
        </div>

        {/* AUTOMATIC CAROUSEL */}
        <div
          id="testimonialCarousel"
          className="carousel slide shadow-sm"
          data-bs-ride="carousel"
          data-bs-interval="2000" 
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
                  {/* LEFT SIDE: IMAGE (Fixed Height & Width) */}
                  <div className="col-md-5">
                    <img
                      src={getImgURL(item.profileImage)}
                      alt={item.fullName}
                      style={{
                        width: "100%", // Width column ke hisaab se
                        height: "450px", // Fixed height sabke liye same
                        objectFit: "cover", // Image crop hogi but stretch nahi hogi
                        display: "block",
                      }}
                    />
                  </div>

                  {/* RIGHT SIDE: CONTENT */}
                  <div className="col-md-7 d-flex align-items-center">
                    <div className="p-5 w-100">
                      {/* Quote Message */}
                      <blockquote className="mb-4">
                        <h2
                          className="text-navy"
                          style={{
                            fontSize: "2rem",
                            fontWeight: "400",
                            lineHeight: "1.4",
                            fontFamily: "serif",
                          }}>
                          “{item.message}”
                        </h2>
                      </blockquote>

                      {/* Footer with Name and Address */}
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
                          <span className="text-navy fw-bold">
                            {item.fullName}
                          </span>
                          {item.address && (
                            <>
                              <span className="mx-2" style={{ color: "#ccc" }}>
                             
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

          {/* Indicators / Dots for Auto Slider */}
          {testimonials.length > 1 && (
            <div
              className="carousel-indicators"
              style={{ marginBottom: "-40px" }}>
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