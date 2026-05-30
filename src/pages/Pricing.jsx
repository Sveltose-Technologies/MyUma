
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
      if (res?.success) setPlans(res.data[0]?.Plan || []);

      // 2. User info nikalen
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (savedUser) {
        const userId = savedUser._id || savedUser.id;

        // A. Pehle Real API check karein (Future use ke liye)
        try {
          const subRes = await getMySubscriptionAPI(userId);
          if (subRes?.success && subRes.payments?.length > 0) {
            const latest = subRes.payments.find(
              (p) => p.subscriptionStatus === "active",
            );
            if (latest) {
              setActiveSub(latest);
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.log("API check skipped or failed");
        }

        // B. FALLBACK: User-Specific Local Storage check karein (Fack payment persist karne ke liye)
        const userPlan = localStorage.getItem(`active_plan_${userId}`);
        if (userPlan) {
          setActiveSub(JSON.parse(userPlan));
        } else {
          // C. LAST OPTION: Global temp storage check karein
          const tempSub = localStorage.getItem("temp_active_sub");
          if (tempSub) {
            const parsed = JSON.parse(tempSub);
            // Check karein agar email match karti hai
            if (
              parsed.ownerEmail === savedUser.email ||
              parsed.userId === userId
            ) {
              setActiveSub(parsed);
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  // Day Counting Logic (Wahi purana)
  const getSubscriptionProgress = (startDate, endDate) => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const remainingDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    const usedDays = totalDays - remainingDays;
    const percent = Math.min(100, Math.max(0, (usedDays / totalDays) * 100));

    return {
      used: usedDays < 0 ? 0 : usedDays,
      remaining: remainingDays < 0 ? 0 : remainingDays,
      percent: percent,
    };
  };

  const handlePlanSelection = (plan) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login first");
      return navigate("/login");
    }
    if (user.role === "owner") {
      navigate("/checkout-details", { state: { plan } });
    } else {
      toast.warning("Only Owners can subscribe.");
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

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
                      Ends on:{" "}
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
                  const prog = getSubscriptionProgress(
                    activeSub.subscriptionStartDate,
                    activeSub.subscriptionEndDate,
                  );
                  return (
                    prog && (
                      <>
                        <div
                          className="progress mb-2"
                          style={{ height: "12px", borderRadius: "10px" }}>
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            style={{
                              width: `${prog.percent}%`,
                              backgroundColor: accent,
                            }}></div>
                        </div>
                        <div className="d-flex justify-content-between fw-bold small">
                          <span>{prog.used} Days Completed</span>
                          <span style={{ color: "#002147" }}>
                            {prog.remaining} Days Remaining
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
                      onClick={() => handlePlanSelection(plan)}
                      disabled={isCurrent}
                      className="btn w-100 text-white py-3 rounded-pill fw-bold"
                      style={{
                        backgroundColor: isCurrent ? "#adb5bd" : "#002147",
                        border: "none",
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