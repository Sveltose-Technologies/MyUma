// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getAllListingsApi, getImgURL } from "../services/authService";

// const BrowseDetails = () => {
//   const navigate = useNavigate();
//   const { slug } = useParams();
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImg, setActiveImg] = useState("");

//   const slugify = (text) =>
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-")
//       .replace(/^-+|-+$/g, "");

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const res = await getAllListingsApi();
//         const found = res?.listings?.find(
//           (item) => slugify(item.title) === slug,
//         );
//         if (found) {
//           setListing(found);
//           setActiveImg(found.images?.[0] || "");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchItem();
//   }, [slug]);

//   if (loading)
//     return (
//       <div className="container py-5 text-center text-navy fw-800 ls-1">
//         LOADING...
//       </div>
//     );
//   if (!listing)
//     return (
//       <div className="container py-5 text-center">
//         <button
//           onClick={() => navigate("/browse")}
//           className="uma-btn-navy uma-btn">
//           BACK TO BROWSE
//         </button>
//       </div>
//     );

//   return (
//     <div className="container py-4 pb-5">
//       {/* Back Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded-4 shadow-sm sticky-top">
//         <button
//           onClick={() => navigate(-1)}
//           className="btn btn-link text-navy text-decoration-none fw-800 p-0 shadow-none">
//           <i className="bi bi-arrow-left-circle fs-4 me-2"></i> BACK
//         </button>
//         <div className="d-flex gap-2">
//           <button className="btn btn-light rounded-pill border">
//             <i className="bi bi-share"></i>
//           </button>
//           <button className="btn btn-light rounded-pill border text-danger">
//             <i className="bi bi-heart"></i>
//           </button>
//         </div>
//       </div>

//       <div className="row g-4">
//         {/* Left Content */}
//         <div className="col-12 col-lg-8">
//           {/* Main Image */}
//           <div className="ratio ratio-21x9 rounded-4 overflow-hidden mb-3 shadow-sm">
//             <img
//               src={getImgURL(activeImg)}
//               className="object-fit-cover"
//               alt="main"
//             />
//           </div>

//           {/* Gallery Thumbnails */}
//           <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
//             {listing.images?.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={getImgURL(img)}
//                 className={`rounded-3 border border-2 cursor-pointer ${activeImg === img ? "border-warning" : "border-transparent"}`}
//                 style={{ width: "80px", height: "60px", objectFit: "cover" }}
//                 onClick={() => setActiveImg(img)}
//                 alt="thumb"
//               />
//             ))}
//           </div>

//           {/* Title & Info */}
//           <div className="card border-0 shadow-sm p-4 mb-4 rounded-4">
//             <span className="badge bg-tan text-navy mb-2 align-self-start px-3 py-2 text-uppercase fw-800">
//               {listing.categoryId?.name}
//             </span>
//             <h1 className="fw-800 text-navy mb-1 ls-1">{listing.title}</h1>
//             <p className="text-muted d-flex align-items-center">
//               <i className="bi bi-geo-alt-fill text-danger me-2"></i>{" "}
//               {listing.address}
//             </p>
//             <div className="d-flex align-items-center pt-3 border-top mt-2">
//               <i className="bi bi-star-fill text-warning me-1"></i>
//               <span className="fw-800 text-navy fs-5">4.8</span>
//               <span className="ms-2 text-muted small">(Business Verified)</span>
//             </div>
//           </div>

//           {/* Services List */}
//           <div className="card border-0 shadow-sm p-4 mb-4 rounded-4">
//             <h5 className="fw-800 text-navy mb-4 ls-1">SERVICES & PRICING</h5>
//             <div className="list-group list-group-flush">
//               {listing.items?.map((item, i) => (
//                 <div
//                   key={i}
//                   className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center py-3">
//                   <div className="d-flex align-items-center">
//                     <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
//                     <span className="fw-bold text-navy">{item.name}</span>
//                   </div>
//                   <span className="fw-800 text-tan fs-5">
//                     ₹{item.price?.toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Social Media */}
//           <div className="card border-0 shadow-sm p-4 rounded-4">
//             <h5 className="fw-800 text-navy mb-3 ls-1">
//               SOCIAL MEDIA & CONTACT
//             </h5>
//             <div className="d-flex flex-wrap gap-2">
//               {listing.facebook && (
//                 <a
//                   href={listing.facebook}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="btn btn-light border p-2 px-3">
//                   <i className="bi bi-facebook text-primary fs-4"></i>
//                 </a>
//               )}
//               {listing.twitter && (
//                 <a
//                   href={listing.twitter}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="btn btn-light border p-2 px-3">
//                   <i className="bi bi-twitter-x text-dark fs-4"></i>
//                 </a>
//               )}
//               {listing.instagram && (
//                 <a
//                   href={listing.instagram}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="btn btn-light border p-2 px-3">
//                   <i className="bi bi-instagram text-danger fs-4"></i>
//                 </a>
//               )}
//               {listing.linkedin && (
//                 <a
//                   href={listing.linkedin}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="btn btn-light border p-2 px-3">
//                   <i className="bi bi-linkedin text-primary fs-4"></i>
//                 </a>
//               )}
//               {listing.youtube && (
//                 <a
//                   href={listing.youtube}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="btn btn-light border p-2 px-3">
//                   <i className="bi bi-youtube text-danger fs-4"></i>
//                 </a>
//               )}
//               {listing.whatsappNo && (
//                 <a
//                   href={`https://wa.me/${listing.whatsappNo}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="btn btn-success fw-bold px-4 d-flex align-items-center">
//                   <i className="bi bi-whatsapp  fs-5"></i>
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-12 col-lg-4">
//           <div
//             className="card border-0 shadow-lg p-4 rounded-4 sticky-lg-top"
//             style={{ top: "100px" }}>
//             <div className="mb-4">
//               <small className="text-muted d-block mb-1 text-uppercase fw-800 ls-1">
//                 Price starts at
//               </small>
//               <h2 className="fw-800 text-navy">
//                 ₹{listing.items?.[0]?.price?.toLocaleString() || 0}
//               </h2>
//             </div>

//             <div className="d-grid gap-2">
//               <button className="uma-btn-navy uma-btn w-100 py-3 shadow-sm border-0 mb-2">
//                 BOOK NOW
//               </button>
//               <a
//                 href={`tel:${listing.phone}`}
//                 className="btn btn-outline-navy fw-bold w-100 py-2 d-flex align-items-center justify-content-center shadow-none border-2">
//                 <i className="bi bi-telephone-fill me-2"></i> {listing.phone}
//               </a>
//             </div>

//             <div className="mt-4 pt-4 border-top">
//               <h6 className="fw-800 text-navy small mb-3 text-uppercase ls-1">
//                 VERIFICATION
//               </h6>
//               <div className="d-flex align-items-center mb-2 text-muted small">
//                 <i className="bi bi-patch-check-fill text-tan me-2"></i>{" "}
//                 Official Profile
//               </div>
//               <div className="d-flex align-items-center text-muted small">
//                 <i className="bi bi-calendar-check-fill text-tan me-2"></i>{" "}
//                 Active Listing
//               </div>
//             </div>

//             <div className="mt-4 p-3 bg-light rounded-3 small border-gold-top border">
//               <i className="bi bi-info-circle-fill text-tan me-2"></i>
//               <span className="text-navy fw-bold">
//                 Verified business listing.
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrowseDetails;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllListingsApi, getImgURL } from "../services/authService";

const BrowseDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState("");

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getAllListingsApi();
        const found = res?.listings?.find(
          (item) => slugify(item.title) === slug,
        );
        if (found) {
          setListing(found);
          setActiveImg(found.images?.[0] || "");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [slug]);

  if (loading)
    return (
      <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div
          className="spinner-border text-navy mb-3"
          style={{ width: "3rem", height: "3rem" }}
          role="status"></div>
        <div className="text-navy fw-800 ls-2 small text-uppercase">
          Authenticating Details...
        </div>
      </div>
    );

  if (!listing)
    return (
      <div className="container py-5 text-center">
        <div className="p-5 bg-light rounded-4 border">
          <h3 className="text-navy fw-800 mb-4">
            WE COULDN'T FIND THAT LISTING
          </h3>
          <button
            onClick={() => navigate("/browse")}
            className="uma-btn-navy uma-btn">
            RETURN TO EXPLORE
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-white min-vh-100">
      {/* 1. TOP NAVIGATION BAR (STICKY) */}
      <nav
        className="bg-white border-bottom sticky-top shadow-sm py-2"
        style={{ zIndex: 1020 }}>
        <div className="container d-flex justify-content-between align-items-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-navy text-decoration-none fw-800 ls-1 p-0 shadow-none">
            <i className="bi bi-arrow-left me-2"></i> BACK TO BROWSE
          </button>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary rounded-pill btn-sm px-3 border-0 transition-hover">
              <i className="bi bi-share text-navy"></i>
            </button>
            <button className="btn btn-outline-secondary rounded-pill btn-sm px-3 border-0 transition-hover">
              <i className="bi bi-heart text-danger"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row g-5">
          {/* LEFT COLUMN: VISUALS & CONTENT */}
          <div className="col-12 col-lg-8">
            {/* Professional Image Gallery */}
            <section className="mb-5">
              <div className="ratio ratio-21x9 rounded-4 overflow-hidden shadow-sm mb-3">
                <img
                  src={getImgURL(activeImg)}
                  className="object-fit-cover"
                  alt="Business Main"
                />
              </div>
              <div className="d-flex gap-2 overflow-auto pb-2 scrollbar-hidden">
                {listing.images?.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`flex-shrink-0 rounded-3 cursor-pointer overflow-hidden border-2 border transition-hover ${activeImg === img ? "border-gold" : "border-transparent"}`}
                    style={{ width: "110px", height: "75px" }}>
                    <img
                      src={getImgURL(img)}
                      className="w-100 h-100 object-fit-cover opacity-hover"
                      alt="Thumbnail"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Business Identity */}
            <section className="mb-5">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge bg-tan text-navy px-3 py-2 rounded-1 fw-800 ls-1 text-uppercase">
                  {listing.categoryId?.name}
                </span>
                <span className="text-muted small fw-bold">|</span>
                <div className="d-flex align-items-center">
                  <i className="bi bi-star-fill text-warning me-1 small"></i>
                  <span className="fw-800 text-navy">4.8</span>
                  <span className="text-muted ms-1 small">(Verified)</span>
                </div>
              </div>
              <h1 className="display-5 fw-800 text-navy mb-3 ls-1">
                {listing.title}
              </h1>
              <p className="fs-5 text-muted d-flex align-items-start border-start border-4 border-gold ps-3 py-1">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                {listing.address}
              </p>
            </section>

            {/* Professional Services Table */}
            <section className="mb-5">
              <h4 className="fw-800 text-navy mb-4 ls-1 border-bottom pb-2">
                PREMIUM SERVICES
              </h4>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th className="py-3 ps-4 border-0 ls-1 fw-bold small">
                          SERVICE DESCRIPTION
                        </th>
                        <th className="py-3 text-end pe-4 border-0 ls-1 fw-bold small">
                          INVESTMENT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listing.items?.map((item, i) => (
                        <tr key={i}>
                          <td className="py-4 ps-4 fw-bold text-navy">
                            <i className="bi bi-check2-circle text-tan me-2"></i>
                            {item.name}
                          </td>
                          <td className="py-4 text-end pe-4 fw-800 text-tan fs-5">
                            ₹{item.price?.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Digital Presence & Social Links */}
            <section className="card border-0 bg-light p-4 rounded-4 shadow-sm">
              <h5 className="fw-800 text-navy mb-4 ls-1">DIGITAL FOOTPRINT</h5>
              <div className="row align-items-center">
                <div className="col-md-7">
                  <div className="d-flex flex-wrap gap-3">
                    {listing.facebook && (
                      <a
                        href={listing.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-white shadow-sm rounded-pill p-2 px-3 border transition-hover">
                        <i className="bi bi-facebook fs-5 text-primary"></i>
                      </a>
                    )}
                    {listing.twitter && (
                      <a
                        href={listing.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-white shadow-sm rounded-pill p-2 px-3 border transition-hover">
                        <i className="bi bi-twitter-x fs-5 text-dark"></i>
                      </a>
                    )}
                    {listing.instagram && (
                      <a
                        href={listing.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-white shadow-sm rounded-pill p-2 px-3 border transition-hover">
                        <i className="bi bi-instagram fs-5 text-danger"></i>
                      </a>
                    )}
                    {listing.linkedin && (
                      <a
                        href={listing.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-white shadow-sm rounded-pill p-2 px-3 border transition-hover">
                        <i className="bi bi-linkedin fs-5 text-primary"></i>
                      </a>
                    )}
                    {listing.youtube && (
                      <a
                        href={listing.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-white shadow-sm rounded-pill p-2 px-3 border transition-hover">
                        <i className="bi bi-youtube fs-5 text-danger"></i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="col-md-5 text-md-end mt-3 mt-md-0">
                  {listing.whatsappNo && (
                    <a
                      href={`https://wa.me/${listing.whatsappNo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="uma-btn-primary uma-btn rounded-pill px-4">
                      <i className="bi bi-whatsapp me-2 fs-5"></i> ENQUIRE NOW
                    </a>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: BOOKING SIDEBAR */}
          <div className="col-12 col-lg-4">
            <aside className="sticky-top" style={{ top: "120px" }}>
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden border-gold-top">
                <div className="p-4 bg-white">
                  <div className="mb-4">
                    <span className="text-muted fw-bold small ls-1 text-uppercase">
                      Starting From
                    </span>
                    <h2 className="display-6 fw-800 text-navy mb-0">
                      ₹{listing.items?.[0]?.price?.toLocaleString() || 0}
                    </h2>
                  </div>

                  <div className="d-grid gap-3 mb-4">
                    <button className="uma-btn-navy uma-btn w-100 py-3 shadow border-0">
                      SCHEDULE VISIT
                    </button>
                    <a
                      href={`tel:${listing.phone}`}
                      className="btn btn-outline-navy fw-800 w-100 py-3 rounded-3 border-2 transition-hover">
                      <i className="bi bi-telephone-fill me-2"></i>{" "}
                      {listing.phone}
                    </a>
                  </div>

                  <div className="pt-4 border-top">
                    <div className="d-flex align-items-start mb-3">
                      <i className="bi bi-shield-check text-tan fs-4 me-3"></i>
                      <div>
                        <p className="fw-800 text-navy mb-0 small">
                          QUALITY GUARANTEED
                        </p>
                        <p className="text-muted extra-small mb-0">
                          Verified business partner
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start">
                      <i className="bi bi-clock-history text-tan fs-4 me-3"></i>
                      <div>
                        <p className="fw-800 text-navy mb-0 small">
                          QUICK RESPONSE
                        </p>
                        <p className="text-muted extra-small mb-0">
                          Typical reply within 2 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer of Sidebar */}
                <div className="bg-light p-3 text-center border-top">
                  <p className="mb-0 small text-navy fw-bold opacity-75">
                    Member since 2024
                  </p>
                </div>
              </div>

              {/* Safety Tip Card */}
              <div className="mt-4 p-4 rounded-4 bg-navy text-white shadow">
                <h6 className="fw-800 ls-1 mb-2">
                  <i className="bi bi-info-circle text-tan me-2"></i>NOTE
                </h6>
                <p className="small mb-0 opacity-75 text-white">
                  Always verify the business license upon arrival. Payments made
                  through our platform are secured.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseDetails;