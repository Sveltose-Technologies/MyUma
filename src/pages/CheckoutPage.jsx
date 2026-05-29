// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { checkoutAPI } from "../services/authService";
// import { getUser } from "../utils/storage";

// const CheckoutPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Data from previous page and storage
//   const plan = location.state?.plan;
//   const user = getUser();

//   if (!plan || !user) {
//     return (
//       <div className="vh-100 bg-dark text-white d-flex align-items-center justify-content-center">
//         <div className="text-center">
//           <h3>Session Expired</h3>
//           <button
//             className="btn uma-btn-outline mt-3"
//             onClick={() => navigate("/pricing")}>
//             Back to Pricing
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const planPrice = Number(plan.price);

//   const handlePayNow = async () => {
//     setLoading(true);
//     try {
//       // Calling your actual API
//       const response = await checkoutAPI({
//         planId: plan._id,
//         userId: user._id || user.id,
//         email: user.email,
//       });

//       if (response?.url) {
//         window.location.href = response.url;
//       } else {
//         // If it's a direct success
//         setShowSuccess(true);
//       }
//     } catch (err) {
//       toast.error("Checkout Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 py-5 d-flex align-items-center justify-content-center"
//       style={{ backgroundColor: "#121418" }}>
//       <div
//         className="p-4 rounded-5 shadow-lg"
//         style={{
//           width: "100%",
//           maxWidth: "420px",
//           backgroundColor: "#1c1f26",
//           color: "#ffffff",
//         }}>
//         <div className="d-flex align-items-center mb-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="btn text-white p-0 me-3 shadow-none">
//             <i className="bi bi-chevron-left fs-4"></i>
//           </button>
//           <h4 className="mb-0 fw-bold">Checkout</h4>
//         </div>

//         {/* Plan Card */}
//         <div
//           className="p-4 rounded-4 mb-3 border border-secondary d-flex justify-content-between align-items-center"
//           style={{ backgroundColor: "#252932" }}>
//           <div>
//             <h6 className="mb-0 fw-bold text-white">{plan.name}</h6>
//             <small className="text-muted">Subscription Plan</small>
//           </div>
//           <div className="text-end">
//             <h5 className="mb-0" style={{ color: "var(--tan)" }}>
//               ${planPrice}
//             </h5>
//           </div>
//         </div>

//         {/* Price Breakdown (Tax Removed) */}
//         <div
//           className="p-4 rounded-4 mb-4"
//           style={{ border: "1px solid #333" }}>
//           <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-3">
//             <span className="text-muted">Plan Price</span>
//             <span className="fw-bold">${planPrice}</span>
//           </div>
//           <div className="d-flex justify-content-between align-items-center pt-1">
//             <span className="h6 fw-bold mb-0">Total Amount</span>
//             <span className="h5 fw-bold mb-0" style={{ color: "var(--tan)" }}>
//               ${planPrice}
//             </span>
//           </div>
//         </div>

//         {/* Pay Button - Using Blue color from your image but Uma style */}
//         <button
//           onClick={handlePayNow}
//           disabled={loading}
//           className="btn btn-lg w-100 py-3 rounded-4 fw-bold mb-3 shadow transition-hover"
//           style={{
//             backgroundColor: "#6366f1",
//             color: "white",
//             border: "none",
//           }}>
//           {loading ? (
//             <span className="spinner-border spinner-border-sm me-2"></span>
//           ) : (
//             `🔒 Pay $${planPrice} Now`
//           )}
//         </button>

//         <p className="text-center small text-muted mb-0">
//           Secured • Cancel anytime
//         </p>
//       </div>

//       {/* SUCCESS POPUP */}
//       {showSuccess && (
//         <div
//           className="modal fade show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div
//               className="modal-content border-0 rounded-5 p-5 text-center shadow-lg"
//               style={{ backgroundColor: "#1c1f26", color: "white" }}>
//               <div className="mb-4">
//                 <i
//                   className="bi bi-check-circle-fill text-tan"
//                   style={{ fontSize: "70px" }}></i>
//               </div>
//               <h2 className="fw-bold">Awesome!</h2>
//               <p className="text-muted mb-4">
//                 Welcome <strong>{user.fullName}</strong>. Your payment was
//                 successful and your account is now active.
//               </p>
//               <button
//                 className="btn btn-lg w-100 py-3 rounded-pill fw-bold uma-btn-navy"
//                 onClick={() => navigate("/")}>
//                 Go to Home
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { checkoutAPI } from "../services/authService"; // Commented out for now
import { getUser } from "../utils/storage";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const plan = location.state?.plan;
  const user = getUser();

  if (!plan || !user) {
    return (
      <div className="vh-100 bg-dark text-white d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h3>Session Expired</h3>
          <button
            className="btn uma-btn-outline mt-3"
            onClick={() => navigate("/pricing")}>
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  const planPrice = Number(plan.price);

  const handlePayNow = async () => {
    setLoading(true);

    /* 
      --- REAL STRIPE LOGIC (COMMENTED OUT AS REQUESTED) ---
      try {
        const response = await checkoutAPI({
          planId: plan._id,
          userId: user._id || user.id,
          email: user.email,
        });
        if (response?.url) {
          window.location.href = response.url; // Redirects to Stripe
        }
      } catch (err) {
        toast.error("Checkout Failed");
      } 
    */

    // --- MOCK SUCCESS LOGIC (Temporary) ---
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true); // Directly show the success popup
    }, 2000);
  };

  return (
    <div
      className="min-vh-100 py-5 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#121418" }}>
      <div
        className="p-4 rounded-5 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#1c1f26",
          color: "#ffffff",
        }}>
        <div className="d-flex align-items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="btn text-white p-0 me-3 shadow-none">
            <i className="bi bi-chevron-left fs-4"></i>
          </button>
          <h4 className="mb-0 fw-bold">Checkout</h4>
        </div>

        {/* Plan Info Card */}
        <div
          className="p-4 rounded-4 mb-3 border border-secondary d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "#252932" }}>
          <div>
            <h6 className="mb-0 fw-bold text-white">{plan.name}</h6>
            <small className="text-muted">Premium Access</small>
          </div>
          <div className="text-end">
            <h5 className="mb-0" style={{ color: "var(--tan)" }}>
              ${planPrice}
            </h5>
          </div>
        </div>

        {/* Breakdown (No Tax) */}
        <div
          className="p-4 rounded-4 mb-4"
          style={{ border: "1px solid #333" }}>
          <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-3">
            <span className="text-white">Plan Price</span>
            <span className="fw-bold">${planPrice}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-1">
            <span className="h6 fw-bold mb-0">Total Amount</span>
            <span className="h5 fw-bold mb-0" style={{ color: "var(--tan)" }}>
              ${planPrice}
            </span>
          </div>
        </div>

        {/* Blue/Indigo Button */}
        <button
          onClick={handlePayNow}
          disabled={loading}
          className="btn btn-lg w-100 py-3 rounded-4 fw-bold mb-3 shadow"
          style={{
            backgroundColor: "#6366f1",
            color: "white",
            border: "none",
          }}>
          {loading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Processing...
            </span>
          ) : (
            `🔒 Pay $${planPrice} Now`
          )}
        </button>

        <p className="text-center small text-muted mb-0">
          Secured • Powered by MyUma
        </p>
      </div>

      {/* SUCCESS POPUP MODAL */}
      {showSuccess && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content border-0 rounded-5 p-5 text-center shadow-lg"
              style={{ backgroundColor: "#1c1f26", color: "white" }}>
              <div className="mb-4">
                <i
                  className="bi bi-check-circle-fill text-tan"
                  style={{ fontSize: "70px" }}></i>
              </div>
              <h2 className="fw-bold">Awesome!</h2>
              <p className="text-white mb-4">
                Welcome <strong>{user.fullName}</strong>. Your payment was
                successful and your account is now active.
              </p>
              <button
                className="btn btn-lg w-100 py-3 rounded-pill fw-bold uma-btn-navy"
                onClick={() => navigate("/")}>
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;