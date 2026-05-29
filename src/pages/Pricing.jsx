// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { getPlansAPI } from "../services/authService";

// // const Pricing = () => {
// //   const navigate = useNavigate();
// //   const [plans, setPlans] = useState([]);
// //   const [loadingPlan, setLoadingPlan] = useState(null);
// //   const accent = "#de9f57";

// //   useEffect(() => {
// //     const getPlanes = async () => {
// //       try {
// //         const res = await getPlansAPI();
// //         if (res?.data && res.data.length > 0) {
// //           const planList = res.data[0].plan || res.data[0].Plan || [];
// //           setPlans(planList);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching plans:", error);
// //         toast.error("Failed to load pricing plans");
// //       }
// //     };
// //     getPlanes();
// //   }, []);

// //   const handleGetStarted = (plan) => {
// //     // LocalStorage se user aur token nikalna
// //     const savedUser = JSON.parse(localStorage.getItem("user"));
// //     const savedToken = localStorage.getItem("token");

// //     if (savedUser && savedToken) {
// //       // 🛑 LOGIC: Sirf 'owner' hi checkout page par ja sakta hai
// //       if (savedUser.role === "owner") {
// //         navigate("/checkout-details", { state: { plan: plan } });
// //       } else {
// //         // Agar user 'guest' ya 'user' hai toh usey allow mat karo
// //         toast.warning(
// //           "Subscription plans are only available for Owners.",
// //         );
// //       }
// //     } else {
// //       // Agar login nahi hai toh login page par bhejo
// //       toast.error("Please login as an Owner to proceed");
// //       navigate("/login");
// //     }
// //   };

// //   return (
// //     <div className="bg-light min-vh-100 pb-5">
// //       {/* Banner Section */}
// //       <div
// //         className="bg-navy pt-5 pb-5 mb-5 text-center position-relative"
// //         style={{ backgroundColor: "#002147" }}>
// //         <div className="container py-2">
// //           <h6
// //             className="text-tan fw-bold text-uppercase ls-2 mb-3"
// //             style={{ color: "#de9f57" }}>
// //             Flexible Plans
// //           </h6>
// //           <h1 className="display-4 fw-bold text-white mb-3">
// //             Choose Your Business Impact
// //           </h1>
// //         </div>
// //         <div
// //           className="position-absolute bottom-0 start-0 end-0 bg-light"
// //           style={{
// //             height: "100px",
// //             clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
// //           }}></div>
// //       </div>

// //       {/* Plans Section */}
// //       <div
// //         className="container"
// //         style={{ marginTop: "-120px", position: "relative", zIndex: "10" }}>
// //         <div className="row g-4 justify-content-center">
// //           {plans.map((plan, idx) => (
// //             <div key={idx} className="col-12 col-md-6 col-lg-4">
// //               <div className="card h-100 border-0 shadow-lg rounded-5 overflow-hidden">
// //                 <div
// //                   style={{ height: "10px", backgroundColor: "#002147" }}></div>
// //                 <div className="card-body p-4 p-xl-5">
// //                   <h3 className="fw-bold text-navy mb-1">{plan.name}</h3>
// //                   <div className="d-flex align-items-end my-4">
// //                     <h2 className="display-5 fw-bold text-navy mb-0">
// //                       ${plan.price}
// //                     </h2>
// //                     <span className="text-muted ms-2 pb-2 small">
// //                       / {plan.duration || "lifetime"}
// //                     </span>
// //                   </div>
// //                   <ul className="list-unstyled mb-5">
// //                     {plan.features?.map((feature, i) => (
// //                       <li
// //                         key={i}
// //                         className="mb-3 d-flex align-items-start small text-muted">
// //                         <span className="me-3 mt-1">
// //                           <svg width="18" height="18" viewBox="0 0 20 20">
// //                             <circle
// //                               cx="10"
// //                               cy="10"
// //                               r="10"
// //                               fill={accent}
// //                               fillOpacity="0.15"
// //                             />
// //                             <path
// //                               d="M14 7L8.5 12.5L6 10"
// //                               stroke={accent}
// //                               strokeWidth="2"
// //                               fill="none"
// //                             />
// //                           </svg>
// //                         </span>
// //                         {feature}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                   <button
// //                     onClick={() => handleGetStarted(plan)}
// //                     className="btn w-100 text-white py-3 rounded-pill fw-bold"
// //                     style={{ backgroundColor: "#002147" }}
// //                     disabled={loadingPlan === plan.name}>
// //                     {loadingPlan === plan.name
// //                       ? "Connecting..."
// //                       : "Get Started Now"}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Pricing;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getPlansAPI } from "../services/authService";
// // ⬇️ THIS WAS MISSING: You must import these helpers from your storage utility
// import { getUser, getToken } from "../utils/storage";

// const Pricing = () => {
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   const [loadingPlan, setLoadingPlan] = useState(null);
//   const accent = "#de9f57";

//   // Fetch plans on component load
//   useEffect(() => {
//     const getPlanes = async () => {
//       try {
//         const res = await getPlansAPI();
//         if (res?.data && res.data.length > 0) {
//           const planList = res.data[0].plan || res.data[0].Plan || [];
//           setPlans(planList);
//         }
//       } catch (error) {
//         console.error("Error fetching plans:", error);
//         toast.error("Failed to load pricing plans");
//       }
//     };
//     getPlanes();
//   }, []);

// const handleGetStarted = (plan) => {
//   // Use localStorage directly to avoid Redux state lag
//   const savedUser = JSON.parse(localStorage.getItem("user"));
//   const savedToken = localStorage.getItem("token");

//   if (savedUser && savedToken) {
//     // Correctly navigate to checkout
//     navigate("/checkout-details", { state: { plan: plan } });
//   } else {
//     toast.error("Please login to proceed");
//     navigate("/login");
//   }
// };

//   return (
//     <div className="bg-light min-vh-100 pb-5">
//       {/* Banner Section */}
//       <div
//         className="bg-navy pt-5 pb-5 mb-5 text-center position-relative"
//         style={{ backgroundColor: "#002147" }}>
//         <div className="container py-2">
//           <h6
//             className="text-tan fw-bold text-uppercase ls-2 mb-3"
//             style={{ color: "#de9f57" }}>
//             Flexible Plans
//           </h6>
//           <h1 className="display-4 fw-bold text-white mb-3">
//             Choose Your Business Impact
//           </h1>
//         </div>
//         <div
//           className="position-absolute bottom-0 start-0 end-0 bg-light"
//           style={{
//             height: "100px",
//             clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
//           }}></div>
//       </div>

//       {/* Plans Section */}
//       <div
//         className="container"
//         style={{ marginTop: "-120px", position: "relative", zIndex: "10" }}>
//         <div className="row g-4 justify-content-center">
//           {plans.map((plan, idx) => (
//             <div key={idx} className="col-12 col-md-6 col-lg-4">
//               <div className="card h-100 border-0 shadow-lg rounded-5 overflow-hidden">
//                 <div
//                   style={{ height: "10px", backgroundColor: "#002147" }}></div>
//                 <div className="card-body p-4 p-xl-5">
//                   <h3 className="fw-bold text-navy mb-1">{plan.name}</h3>
//                   <div className="d-flex align-items-end my-4">
//                     <h2 className="display-5 fw-bold text-navy mb-0">
//                       ${plan.price}
//                     </h2>
//                     <span className="text-muted ms-2 pb-2 small">
//                       / {plan.duration || "lifetime"}
//                     </span>
//                   </div>
//                   <ul className="list-unstyled mb-5">
//                     {plan.features?.map((feature, i) => (
//                       <li
//                         key={i}
//                         className="mb-3 d-flex align-items-start small text-muted">
//                         <span className="me-3 mt-1">
//                           <svg width="18" height="18" viewBox="0 0 20 20">
//                             <circle
//                               cx="10"
//                               cy="10"
//                               r="10"
//                               fill={accent}
//                               fillOpacity="0.15"
//                             />
//                             <path
//                               d="M14 7L8.5 12.5L6 10"
//                               stroke={accent}
//                               strokeWidth="2"
//                               fill="none"
//                             />
//                           </svg>
//                         </span>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                   <button
//                     onClick={() => handleGetStarted(plan)}
//                     className="btn w-100 text-white py-3 rounded-pill fw-bold"
//                     style={{ backgroundColor: "#002147" }}
//                     disabled={loadingPlan === plan.name}>
//                     {loadingPlan === plan.name
//                       ? "Connecting..."
//                       : "Get Started Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getPlansAPI, getMySubscriptionAPI } from "../services/authService";

const Pricing = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [activeSub, setActiveSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const accent = "#de9f57";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Get All Plans
        const res = await getPlansAPI();
        if (res?.data && res.data.length > 0) {
          const planList = res.data[0].plan || res.data[0].Plan || [];
          setPlans(planList);
        }

        // 2. Get User's Active Subscription from Payment History
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser && savedUser._id) {
          const subRes = await getMySubscriptionAPI(savedUser._id);
          if (subRes?.success && subRes.data) {
            setActiveSub(subRes.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Logical Calculation for Days
  const getSubscriptionProgress = (startDate, endDate) => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    // Calculate difference in milliseconds and convert to days
    const diffInMs = today - start;
    const daysUsed = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    const remainingInMs = end - today;
    const daysRemaining = Math.ceil(remainingInMs / (1000 * 60 * 60 * 24));

    const totalInMs = end - start;
    const totalDays = Math.ceil(totalInMs / (1000 * 60 * 60 * 24));

    // Calculate Percentage for progress bar
    const percent = Math.min(100, Math.max(0, (daysUsed / totalDays) * 100));

    return {
      used: daysUsed < 0 ? 0 : daysUsed,
      remaining: daysRemaining < 0 ? 0 : daysRemaining,
      percent: percent,
    };
  };

  const formatDuration = (count, unit) => {
    if (!count || !unit) return "Plan";
    const suffix = count > 1 ? "s" : "";
    return `${count} ${unit.charAt(0).toUpperCase() + unit.slice(1)}${suffix}`;
  };

  const handleGetStarted = (plan) => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      if (savedUser.role === "owner") {
        navigate("/checkout-details", { state: { plan: plan } });
      } else {
        toast.warning("Only Property Owners can subscribe.");
      }
    } else {
      toast.error("Please login to proceed");
      navigate("/login");
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5 text-start">
      <div
        className="bg-navy pt-5 pb-5 mb-5 text-center"
        style={{ backgroundColor: "#002147" }}>
        <div className="container py-2">
          <h6
            className="text-tan fw-bold text-uppercase ls-2 mb-3"
            style={{ color: "#de9f57" }}>
            Flexible Plans
          </h6>
          <h1 className="display-4 fw-bold text-white mb-3">
            Pricing & Subscriptions
          </h1>
        </div>
      </div>

      <div
        className="container"
        style={{ marginTop: "-120px", position: "relative", zIndex: "10" }}>
        {/* PROGRESS SECTION FOR ACTIVE OWNER */}
        {activeSub && (
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div
                className="card border-0 shadow-lg rounded-4 p-4"
                style={{ borderLeft: `6px solid ${accent}` }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="fw-bold mb-0">
                      Active Plan: {activeSub.planName}
                    </h5>
                    <p className="text-muted small mb-0">
                      Purchased on:{" "}
                      {new Date(
                        activeSub.subscriptionStartDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="badge rounded-pill bg-success px-3">
                    ACTIVE
                  </span>
                </div>

                {(() => {
                  const progress = getSubscriptionProgress(
                    activeSub.subscriptionStartDate,
                    activeSub.subscriptionEndDate,
                  );
                  return progress ? (
                    <>
                      <div
                        className="progress mb-2"
                        style={{ height: "12px", borderRadius: "10px" }}>
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{
                            width: `${progress.percent}%`,
                            backgroundColor: accent,
                          }}></div>
                      </div>
                      <div className="d-flex justify-content-between fw-bold small">
                        <span>{progress.used} Days Completed</span>
                        <span style={{ color: "#002147" }}>
                          {progress.remaining} Days Remaining
                        </span>
                      </div>
                    </>
                  ) : (
                    <p className="small text-muted">Calculating days...</p>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {plans.map((plan, idx) => {
            // Check if this card is the user's current plan
            const isCurrent = activeSub && activeSub.planName === plan.name;

            return (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div
                  className={`card h-100 border-0 shadow rounded-5 ${isCurrent ? "ring-active" : ""}`}>
                  <div
                    style={{
                      height: "10px",
                      backgroundColor: isCurrent ? accent : "#002147",
                    }}></div>
                  <div className="card-body p-4 p-xl-5">
                    {isCurrent && (
                      <div className="badge bg-warning text-dark mb-2">
                        Your Current Plan
                      </div>
                    )}
                    <h3 className="fw-bold text-navy mb-1">{plan.name}</h3>
                    <div className="d-flex align-items-end my-4">
                      <h2 className="display-5 fw-bold text-navy mb-0">
                        ${plan.price}
                      </h2>
                      <span className="text-muted ms-2 pb-2 small">
                        / {formatDuration(plan.durationCount, plan.duration)}
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
                      onClick={() => handleGetStarted(plan)}
                      disabled={isCurrent}
                      className="btn w-100 text-white py-3 rounded-pill fw-bold"
                      style={{
                        backgroundColor: isCurrent ? "#adb5bd" : "#002147",
                      }}>
                      {isCurrent ? "Plan Active" : "Upgrade Now"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;