// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getPlansAPI, getMySubscriptionAPI } from "../services/authService";

// const Pricing = () => {
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   const [activeSub, setActiveSub] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const accent = "#de9f57";

//   // src/pages/Pricing.jsx

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // 1. Get All Plans from DB
//         const res = await getPlansAPI();
//         if (res?.success) setPlans(res.data[0]?.Plan || []);

//         const savedUser = JSON.parse(localStorage.getItem("user"));
//         if (savedUser) {
//           const userId = savedUser._id || savedUser.id;

//           // 2. Fetch REAL Payment status from Database (Affected by Webhook)
//           try {
//             const subRes = await getPaymentsByUserIdAPI(userId); // Use the get-by-userId method

//             if (subRes?.success && subRes.payments?.length > 0) {
//               // Find the active record that the webhook updated
//               const activePayment = subRes.payments.find(
//                 (p) =>
//                   p.status === "success" && p.subscriptionStatus === "active",
//               );

//               if (activePayment) {
//                 setActiveSub({
//                   ...activePayment,
//                   // Map backend keys to your UI keys if they differ
//                   planName: activePayment.planId?.name || "Premium Plan",
//                 });
//                 setLoading(false);
//                 return; // Exit if found in DB
//               }
//             }
//           } catch (err) {
//             console.log("Database check failed, checking local fallback");
//           }

//           // 3. Fallback to LocalStorage if DB is not updated yet
//           const localPlan = localStorage.getItem(`active_plan_${userId}`);
//           if (localPlan) {
//             setActiveSub(JSON.parse(localPlan));
//           }
//         }
//       } catch (e) {
//         console.error("Error fetching pricing data:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Day Counting Logic (Wahi purana)
//   const getSubscriptionProgress = (startDate, endDate) => {
//     if (!startDate || !endDate) return null;
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const today = new Date();

//     const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//     const remainingDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
//     const usedDays = totalDays - remainingDays;
//     const percent = Math.min(100, Math.max(0, (usedDays / totalDays) * 100));

//     return {
//       used: usedDays < 0 ? 0 : usedDays,
//       remaining: remainingDays < 0 ? 0 : remainingDays,
//       percent: percent,
//     };
//   };

//   const handlePlanSelection = (plan) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       toast.error("Please login first");
//       return navigate("/login");
//     }
//     if (user.role === "owner") {
//       navigate("/checkout-details", { state: { plan } });
//     } else {
//       toast.warning("Only Owners can subscribe.");
//     }
//   };

//   if (loading) return <div className="text-center py-5">Loading...</div>;

//   return (
//     <div className="bg-light min-vh-100 pb-5 text-start">
//       <div
//         className="bg-navy pt-5 pb-5 mb-5 text-center"
//         style={{ backgroundColor: "#002147" }}>
//         <div className="container py-2">
//           <h6
//             className="text-tan fw-bold text-uppercase ls-2 mb-3"
//             style={{ color: "#de9f57" }}>
//             Flexible Plans
//           </h6>
//           <h1 className="display-4 fw-bold text-white mb-3">
//             Pricing & Subscriptions
//           </h1>
//         </div>
//       </div>

//       <div
//         className="container"
//         style={{ marginTop: "-90px", position: "relative", zIndex: "10" }}>
//         {activeSub && (
//           <div className="row justify-content-center mb-5">
//             <div className="col-lg-8">
//               <div
//                 className="card border-0 shadow-lg rounded-4 p-4 bg-white"
//                 style={{ borderLeft: `6px solid ${accent}` }}>
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <h5 className="fw-bold mb-0">
//                       Active Plan: {activeSub.planName}
//                     </h5>
//                     <p className="text-muted small mb-0">
//                       Ends on:{" "}
//                       {new Date(
//                         activeSub.subscriptionEndDate,
//                       ).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <span className="badge rounded-pill bg-success px-3 py-2">
//                     ACTIVE
//                   </span>
//                 </div>
//                 {(() => {
//                   const prog = getSubscriptionProgress(
//                     activeSub.subscriptionStartDate,
//                     activeSub.subscriptionEndDate,
//                   );
//                   return (
//                     prog && (
//                       <>
//                         <div
//                           className="progress mb-2"
//                           style={{ height: "12px", borderRadius: "10px" }}>
//                           <div
//                             className="progress-bar progress-bar-striped progress-bar-animated"
//                             style={{
//                               width: `${prog.percent}%`,
//                               backgroundColor: accent,
//                             }}></div>
//                         </div>
//                         <div className="d-flex justify-content-between fw-bold small">
//                           <span>{prog.used} Days Completed</span>
//                           <span style={{ color: "#002147" }}>
//                             {prog.remaining} Days Remaining
//                           </span>
//                         </div>
//                       </>
//                     )
//                   );
//                 })()}
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="row g-4 justify-content-center">
//           {plans.map((plan, idx) => {
//             const isCurrent = activeSub && activeSub.planName === plan.name;
//             return (
//               <div key={idx} className="col-12 col-md-6 col-lg-4">
//                 <div className="card h-100 border-0 shadow rounded-5 overflow-hidden">
//                   <div
//                     style={{
//                       height: "10px",
//                       backgroundColor: isCurrent ? accent : "#002147",
//                     }}></div>
//                   <div className="card-body p-4 p-xl-5">
//                     {isCurrent && (
//                       <div className="badge bg-warning text-dark mb-2">
//                         Current Plan
//                       </div>
//                     )}
//                     <h3 className="fw-bold text-navy mb-1">{plan.name}</h3>
//                     <div className="d-flex align-items-end my-4">
//                       <h2 className="display-5 fw-bold text-navy mb-0">
//                         ${plan.price}
//                       </h2>
//                       <span className="text-muted ms-2 pb-2 small">
//                         / {plan.durationCount} {plan.duration}
//                       </span>
//                     </div>
//                     <ul className="list-unstyled mb-5">
//                       {plan.features?.map((f, i) => (
//                         <li
//                           key={i}
//                           className="mb-3 d-flex align-items-start small text-muted">
//                           <i
//                             className="bi bi-check-circle-fill me-2"
//                             style={{ color: accent }}></i>{" "}
//                           {f}
//                         </li>
//                       ))}
//                     </ul>
//                     <button
//                       onClick={() => handlePlanSelection(plan)}
//                       disabled={isCurrent}
//                       className="btn w-100 text-white py-3 rounded-pill fw-bold"
//                       style={{
//                         backgroundColor: isCurrent ? "#adb5bd" : "#002147",
//                         border: "none",
//                       }}>
//                       {isCurrent ? "Plan Active" : "Upgrade Now"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };;

// export default Pricing;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// // API calls
// import { getPlansAPI, getPaymentsByUserIdAPI } from "../services/authService";

// const Pricing = () => {
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   const [bannerText, setBannerText] = useState("Pricing & Subscriptions"); // API se aayega
//   const [activeSub, setActiveSub] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const accent = "#de9f57";

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // 1. ADMIN KE BANAYE HUYE PLANS FETCH KARNA
//         const res = await getPlansAPI();
//         if (res?.success && res.data?.length > 0) {
//           const apiData = res.data[0];
//           setPlans(apiData?.plan || apiData?.Plan || []); // Plans array
//           setBannerText(apiData?.bannerText || "Pricing & Subscriptions"); // Dynamic Banner
//         }

//         const savedUser = JSON.parse(localStorage.getItem("user"));
//         if (savedUser) {
//           const userId = savedUser._id || savedUser.id;
//           const userRole = savedUser.role;

//           // LOGIC: Agar login user OWNER hai, to check karo usne ADMIN ko payment ki hai ya nahi
//           if (userRole === "owner") {
//             try {
//               const subRes = await getPaymentsByUserIdAPI(userId);
//               if (subRes?.success && subRes.payments?.length > 0) {
//                 // Webhook update ke baad "success" status wali payment dhundna
//                 const successfulPayment = subRes.payments.find(
//                   (p) =>
//                     p.status === "success" && p.subscriptionStatus === "active",
//                 );

//                 if (successfulPayment) {
//                   setActiveSub({
//                     ...successfulPayment,
//                     planName:
//                       successfulPayment.planName ||
//                       successfulPayment.planId?.name ||
//                       "Premium Plan",
//                   });
//                 }
//               }
//             } catch (err) {
//               console.log("No previous payments found for this owner.");
//             }
//           }
//         }
//       } catch (e) {
//         console.error("Error fetching dynamic data:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Subscription Progress Calculator
//   const getSubscriptionProgress = (startDate, endDate) => {
//     if (!startDate || !endDate) return null;
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const today = new Date();

//     const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//     const remainingDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
//     const usedDays = totalDays - remainingDays;
//     const percent = Math.min(100, Math.max(0, (usedDays / totalDays) * 100));

//     return {
//       used: usedDays < 0 ? 0 : usedDays,
//       remaining: remainingDays < 0 ? 0 : remainingDays,
//       percent,
//     };
//   };

//   const handlePlanSelection = (plan) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       toast.error("Please login first");
//       return navigate("/login");
//     }

//     // LOGIC: Sirf OWNER ya ADMIN hi payment flow mein ja sakte hain
//     // (Aapki requirement: Owner Admin ko pay karega)
//     if (user.role === "owner" || user.role === "admin") {
//       navigate("/checkout-details", { state: { plan } });
//     } else {
//       toast.warning(
//         "Access Denied: Only business owners can purchase subscriptions.",
//       );
//     }
//   };

//   if (loading)
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div
//           className="spinner-border text-warning"
//           style={{ width: "3rem", height: "3rem" }}></div>
//       </div>
//     );

//   return (
//     <div className="bg-light min-vh-100 pb-5 text-start">
//       {/* DYNAMIC BANNER SECTION */}
//       <div
//         className="bg-navy pt-5 pb-5 mb-5 text-center"
//         style={{ backgroundColor: "#002147" }}>
//         <div className="container py-2">
//           <h6
//             className="text-tan fw-bold text-uppercase ls-2 mb-3"
//             style={{ color: "#de9f57" }}>
//             Premium Services
//           </h6>
//           <h1 className="display-4 fw-bold text-white mb-3">
//             {bannerText} {/* Dynamic Title */}
//           </h1>
//         </div>
//       </div>

//       <div
//         className="container"
//         style={{ marginTop: "-90px", position: "relative", zIndex: "10" }}>
//         {/* ACTIVE SUBSCRIPTION STATUS (For Owner) */}
//         {activeSub && (
//           <div className="row justify-content-center mb-5">
//             <div className="col-lg-8">
//               <div
//                 className="card border-0 shadow-lg rounded-4 p-4 bg-white"
//                 style={{ borderLeft: `6px solid ${accent}` }}>
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <h5 className="fw-bold mb-0">
//                       Your Active Plan: {activeSub.planName}
//                     </h5>
//                     <p className="text-muted small mb-0">
//                       Renewal Date:{" "}
//                       {new Date(
//                         activeSub.subscriptionEndDate || activeSub.expiryDate,
//                       ).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <span className="badge rounded-pill bg-success px-3 py-2">
//                     PAID
//                   </span>
//                 </div>
//                 {(() => {
//                   const prog = getSubscriptionProgress(
//                     activeSub.subscriptionStartDate || activeSub.createdAt,
//                     activeSub.subscriptionEndDate || activeSub.expiryDate,
//                   );
//                   return (
//                     prog && (
//                       <>
//                         <div
//                           className="progress mb-2"
//                           style={{ height: "12px", borderRadius: "10px" }}>
//                           <div
//                             className="progress-bar progress-bar-striped progress-bar-animated"
//                             style={{
//                               width: `${prog.percent}%`,
//                               backgroundColor: accent,
//                             }}></div>
//                         </div>
//                         <div className="d-flex justify-content-between fw-bold small text-navy">
//                           <span>{prog.used} Days Used</span>
//                           <span>{prog.remaining} Days Remaining</span>
//                         </div>
//                       </>
//                     )
//                   );
//                 })()}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* DYNAMIC PLANS GRID */}
//         <div className="row g-4 justify-content-center">
//           {plans.map((plan, idx) => {
//             // Check if this plan is the one the Owner already paid for
//             const isCurrent = activeSub && activeSub.planName === plan.name;

//             return (
//               <div key={idx} className="col-12 col-md-6 col-lg-4">
//                 <div className="card h-100 border-0 shadow rounded-5 overflow-hidden">
//                   <div
//                     style={{
//                       height: "10px",
//                       backgroundColor: isCurrent ? accent : "#002147",
//                     }}></div>
//                   <div className="card-body p-4 p-xl-5">
//                     {isCurrent && (
//                       <div className="badge bg-warning text-dark mb-2">
//                         Current Active
//                       </div>
//                     )}
//                     <h3 className="fw-bold text-navy mb-1">{plan.name}</h3>
//                     <div className="d-flex align-items-end my-4">
//                       <h2 className="display-5 fw-bold text-navy mb-0">
//                         ${plan.price}
//                       </h2>
//                       <span className="text-muted ms-2 pb-2 small">
//                         / {plan.durationCount} {plan.duration}
//                       </span>
//                     </div>
//                     <ul className="list-unstyled mb-5">
//                       {plan.features?.map((f, i) => (
//                         <li
//                           key={i}
//                           className="mb-3 d-flex align-items-start small text-muted">
//                           <i
//                             className="bi bi-check-circle-fill me-2"
//                             style={{ color: accent }}></i>{" "}
//                           {f}
//                         </li>
//                       ))}
//                     </ul>
//                     <button
//                       onClick={() => handlePlanSelection(plan)}
//                       disabled={isCurrent}
//                       className="btn w-100 text-white py-3 rounded-pill fw-bold"
//                       style={{
//                         backgroundColor: isCurrent ? "#adb5bd" : "#002147",
//                         border: "none",
//                       }}>
//                       {isCurrent ? "Current Plan" : "Pay to Admin"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
// src/pages/Pricing.jsx

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// // Check karein ki ye dono API sahi se imported hain
// import { getPlansAPI, getMySubscriptionAPI } from "../services/authService";

// const Pricing = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const [plans, setPlans] = useState([]);
//   const [activeSub, setActiveSub] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const accent = "#de9f57";

//   // 1. Check for Stripe Success Redirect (Toast Message)
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     if (params.get("success") === "true") {
//       toast.success("Payment Received! Your plan is updating...");
//       // URL clean karein taaki refresh par bar-bar toast na aaye
//       window.history.replaceState({}, document.title, window.location.pathname);
//     }
//   }, []);

//   // 2. Fetch Data (Plans + Subscription)
//   useEffect(() => {
//     const fetchData = async () => {
//       // Logic start hone se pehle loading true
//       setLoading(true);
//       console.log("Fetching pricing data...");

//       try {
//         // A. Fetch All Pricing Plans
//         const res = await getPlansAPI();
//         const rawPlans = res?.data?.[0]?.Plan || res?.data || [];
//         setPlans(rawPlans);

//         // B. Fetch User Subscription (If Logged In)
//         if (user) {
//           const uId = user._id || user.id;
//           const subRes = await getMySubscriptionAPI(uId);

//           if (subRes?.success && subRes.payments?.length > 0) {
//             // Latest SUCCESSFUL payment dhoondhein (Webhook updated)
//             const latest = [...subRes.payments]
//               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//               .find((p) => p.status === "success");

//             if (latest) {
//               // Plan details se expiry calculate karein kyunki backend inactive bhej raha hai
//               const planDetails = rawPlans.find(
//                 (p) => p.name === latest.planName,
//               );

//               if (planDetails) {
//                 const startDate = new Date(latest.createdAt);
//                 const endDate = new Date(startDate);

//                 // Expiry calculation
//                 const count = planDetails.durationCount || 1;
//                 const unit = planDetails.duration?.toLowerCase();

//                 if (unit === "day") endDate.setDate(endDate.getDate() + count);
//                 else if (unit === "week")
//                   endDate.setDate(endDate.getDate() + count * 7);
//                 else if (unit === "month")
//                   endDate.setMonth(endDate.getMonth() + count);
//                 else if (unit === "year")
//                   endDate.setFullYear(endDate.getFullYear() + count);

//                 setActiveSub({
//                   ...latest,
//                   subscriptionStartDate: startDate,
//                   subscriptionEndDate: endDate,
//                 });
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Pricing Page Error:", error);
//         // toast.error("Failed to load subscription data");
//       } finally {
//         // Sabse important line: Spinner ko band karne ke liye
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?._id]); // Sirf User ID par depend karein, pure user object par nahi

//   // Helper: Subscription Progress Bar Logic
//   const getProgress = (start, end) => {
//     if (!start || !end) return null;
//     const today = new Date();
//     const total = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//     const remaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
//     const used = total - remaining;
//     const percent = Math.min(100, Math.max(0, (used / total) * 100));
//     return {
//       used: Math.max(0, used),
//       remaining: Math.max(0, remaining),
//       percent,
//     };
//   };

//   const handleSelect = (plan) => {
//     if (!user) return navigate("/login");
//     if (user.role !== "owner" && user.role !== "admin") {
//       return toast.warning("Subscriptions are for Owners/Admins only.");
//     }
//     navigate("/checkout-details", { state: { plan } });
//   };

//   // --- UI RENDERING ---
//   if (loading) {
//     return (
//       <div className="vh-100 d-flex flex-column align-items-center justify-content-center bg-white">
//         <div className="spinner-border text-warning mb-3" role="status"></div>
//         <p className="text-muted fw-bold">Synchronizing your plans...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light min-vh-100 pb-5 text-start">
//       {/* Header Section */}
//       <div
//         className="bg-navy pt-5 pb-5 mb-5 text-center"
//         style={{ backgroundColor: "#002147" }}>
//         <div className="container py-2">
//           <h1 className="display-5 fw-bold text-white mb-2">Pricing & Plans</h1>
//           <p className="text-white-50">
//             Manage your business with our flexible subscriptions
//           </p>
//         </div>
//       </div>

//       <div
//         className="container"
//         style={{ marginTop: "-90px", position: "relative", zIndex: "10" }}>
//         {/* ACTIVE SUBSCRIPTION CARD */}
//         {activeSub && (
//           <div className="row justify-content-center mb-5">
//             <div className="col-lg-8">
//               <div
//                 className="card border-0 shadow-lg rounded-4 p-4 bg-white"
//                 style={{ borderLeft: `6px solid ${accent}` }}>
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <h5 className="fw-bold mb-0">
//                       Active Plan: {activeSub.planName}
//                     </h5>
//                     <p className="text-muted small mb-0">
//                       Renewal Date:{" "}
//                       {new Date(
//                         activeSub.subscriptionEndDate,
//                       ).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <span className="badge rounded-pill bg-success px-3 py-2">
//                     ACTIVE
//                   </span>
//                 </div>
//                 {(() => {
//                   const prog = getProgress(
//                     activeSub.subscriptionStartDate,
//                     activeSub.subscriptionEndDate,
//                   );
//                   return (
//                     prog && (
//                       <>
//                         <div
//                           className="progress mb-2"
//                           style={{ height: "10px", borderRadius: "10px" }}>
//                           <div
//                             className="progress-bar progress-bar-striped progress-bar-animated"
//                             style={{
//                               width: `${prog.percent}%`,
//                               backgroundColor: accent,
//                             }}></div>
//                         </div>
//                         <div className="d-flex justify-content-between small fw-bold">
//                           <span>{prog.used} Days Completed</span>
//                           <span style={{ color: "#002147" }}>
//                             {prog.remaining} Days Left
//                           </span>
//                         </div>
//                       </>
//                     )
//                   );
//                 })()}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* PLANS GRID */}
//         <div className="row g-4 justify-content-center">
//           {plans.map((plan, idx) => {
//             const isCurrent = activeSub && activeSub.planName === plan.name;
//             return (
//               <div key={idx} className="col-12 col-md-6 col-lg-4">
//                 <div className="card h-100 border-0 shadow rounded-5 overflow-hidden">
//                   <div
//                     style={{
//                       height: "10px",
//                       backgroundColor: isCurrent ? accent : "#002147",
//                     }}></div>
//                   <div className="card-body p-4 p-xl-5">
//                     {isCurrent && (
//                       <div className="badge bg-warning text-dark mb-2">
//                         Current Plan
//                       </div>
//                     )}
//                     <h3 className="fw-bold text-navy mb-1">{plan.name}</h3>
//                     <div className="d-flex align-items-end my-4">
//                       <h2 className="display-5 fw-bold text-navy mb-0">
//                         ${plan.price}
//                       </h2>
//                       <span className="text-muted ms-2 pb-2 small">
//                         / {plan.durationCount} {plan.duration}
//                       </span>
//                     </div>
//                     <ul className="list-unstyled mb-5">
//                       {plan.features?.map((f, i) => (
//                         <li
//                           key={i}
//                           className="mb-3 d-flex align-items-start small text-muted">
//                           <i
//                             className="bi bi-check-circle-fill me-2"
//                             style={{ color: accent }}></i>{" "}
//                           {f}
//                         </li>
//                       ))}
//                     </ul>
//                     <button
//                       onClick={() => handleSelect(plan)}
//                       disabled={isCurrent}
//                       className="btn w-100 text-white py-3 rounded-pill fw-bold border-0"
//                       style={{
//                         backgroundColor: isCurrent ? "#adb5bd" : "#002147",
//                       }}>
//                       {isCurrent ? "Plan Active" : "Upgrade Plan"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getPlansAPI, getMySubscriptionAPI } from "../services/authService";
import { CheckCircle, X } from "lucide-react"; // Icons के लिए

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [plans, setPlans] = useState([]);
  const [activeSub, setActiveSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Success Popup State

  const accent = "#de9f57";

  // 1. URL Check for Stripe Redirect & Show Popup
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowSuccessPopup(true); // Popup दिखाओ

      // URL clean करो ताकि refresh करने पर बार-बार popup न आये
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // 2. Fetch Data (Plans + Subscription)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getPlansAPI();
        const rawPlans = res?.data?.[0]?.Plan || res?.data || [];
        setPlans(rawPlans);

        if (user) {
          const uId = user._id || user.id;
          const subRes = await getMySubscriptionAPI(uId);

          if (subRes?.success && subRes.payments?.length > 0) {
            const latest = [...subRes.payments]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .find((p) => p.status === "success");

            if (latest) {
              const planDetails = rawPlans.find(
                (p) => p.name === latest.planName,
              );
              if (planDetails) {
                const startDate = new Date(latest.createdAt);
                const endDate = new Date(startDate);
                const count = planDetails.durationCount || 1;
                const unit = planDetails.duration?.toLowerCase();

                if (unit === "day") endDate.setDate(endDate.getDate() + count);
                else if (unit === "week")
                  endDate.setDate(endDate.getDate() + count * 7);
                else if (unit === "month")
                  endDate.setMonth(endDate.getMonth() + count);
                else if (unit === "year")
                  endDate.setFullYear(endDate.getFullYear() + count);

                setActiveSub({
                  ...latest,
                  subscriptionStartDate: startDate,
                  subscriptionEndDate: endDate,
                });
              }
            }
          }
        }
      } catch (error) {
        console.error("Pricing Page Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?._id]);

  const getProgress = (start, end) => {
    if (!start || !end) return null;
    const today = new Date();
    const total = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const remaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    const used = total - remaining;
    const percent = Math.min(100, Math.max(0, (used / total) * 100));
    return {
      used: Math.max(0, used),
      remaining: Math.max(0, remaining),
      percent,
    };
  };

  const handleSelect = (plan) => {
    if (!user) return navigate("/login");
    if (user.role !== "owner" && user.role !== "admin") {
      return toast.warning("Subscriptions are for Owners/Admins only.");
    }
    navigate("/checkout-details", { state: { plan } });
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center bg-white">
        <div className="spinner-border text-warning mb-3"></div>
        <p className="text-muted fw-bold">Synchronizing your plans...</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pb-5 text-start">
      <div
        className="bg-navy pt-5 pb-5 mb-5 text-center"
        style={{ backgroundColor: "#002147" }}>
        <div className="container py-2">
          <h1 className="display-5 fw-bold text-white mb-2">Pricing & Plans</h1>
          <p className="text-white-50">
            Manage your business with our flexible subscriptions
          </p>
        </div>
      </div>

      <div
        className="container"
        style={{ marginTop: "-90px", position: "relative", zIndex: "10" }}>
        {activeSub && (
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div
                className="card border-0 shadow-lg rounded-4 p-4 bg-white"
                style={{ borderLeft: `6px solid ${accent}` }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="fw-bold mb-0">
                      Active Plan: {activeSub.planName}
                    </h5>
                    <p className="text-muted small mb-0">
                      Renewal Date:{" "}
                      {new Date(
                        activeSub.subscriptionEndDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="badge rounded-pill bg-success px-3 py-2">
                    ACTIVE
                  </span>
                </div>
                {(() => {
                  const prog = getProgress(
                    activeSub.subscriptionStartDate,
                    activeSub.subscriptionEndDate,
                  );
                  return (
                    prog && (
                      <>
                        <div
                          className="progress mb-2"
                          style={{ height: "10px", borderRadius: "10px" }}>
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            style={{
                              width: `${prog.percent}%`,
                              backgroundColor: accent,
                            }}></div>
                        </div>
                        <div className="d-flex justify-content-between small fw-bold">
                          <span>{prog.used} Days Completed</span>
                          <span style={{ color: "#002147" }}>
                            {prog.remaining} Days Left
                          </span>
                        </div>
                      </>
                    )
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {plans.map((plan, idx) => {
            const isCurrent = activeSub && activeSub.planName === plan.name;
            return (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow rounded-5 overflow-hidden">
                  <div
                    style={{
                      height: "10px",
                      backgroundColor: isCurrent ? accent : "#002147",
                    }}></div>
                  <div className="card-body p-4 p-xl-5">
                    {isCurrent && (
                      <div className="badge bg-warning text-dark mb-2">
                        Current Plan
                      </div>
                    )}
                    <h3 className="fw-bold text-navy mb-1">{plan.name}</h3>
                    <div className="d-flex align-items-end my-4">
                      <h2 className="display-5 fw-bold text-navy mb-0">
                        ${plan.price}
                      </h2>
                      <span className="text-muted ms-2 pb-2 small">
                        / {plan.durationCount} {plan.duration}
                      </span>
                    </div>
                    <ul className="list-unstyled mb-5">
                      {plan.features?.map((f, i) => (
                        <li
                          key={i}
                          className="mb-3 d-flex align-items-start small text-muted">
                          <i
                            className="bi bi-check-circle-fill me-2"
                            style={{ color: accent }}></i>{" "}
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleSelect(plan)}
                      disabled={isCurrent}
                      className="btn w-100 text-white py-3 rounded-pill fw-bold border-0"
                      style={{
                        backgroundColor: isCurrent ? "#adb5bd" : "#002147",
                      }}>
                      {isCurrent ? "Plan Active" : "Upgrade Plan"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- SUCCESS POPUP MODAL --- */}
      {showSuccessPopup && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            zIndex: 1050,
          }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-5 shadow-lg overflow-hidden py-4 px-3">
              <div className="text-end">
                <button
                  className="btn border-0 p-0 text-muted"
                  onClick={() => setShowSuccessPopup(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="modal-body text-center p-4">
                <div className="mb-4">
                  <div className="d-inline-flex p-4 rounded-circle bg-success bg-opacity-10 text-success">
                    <CheckCircle size={64} strokeWidth={2.5} />
                  </div>
                </div>
                <h2 className="fw-bold text-navy mb-2">Payment Successful!</h2>
                <p className="text-muted mb-4">
                  Thank you for your purchase. Your subscription plan has been
                  activated successfully. You can now enjoy all the premium
                  features.
                </p>
                <button
                  className="btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-sm"
                  style={{
                    backgroundColor: accent,
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => setShowSuccessPopup(false)}>
                  Great, Let's Start!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;