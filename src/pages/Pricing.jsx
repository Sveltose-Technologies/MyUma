import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getPlansAPI, checkoutAPI } from "../services/authService";

const Pricing = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const accent = "#de9f57";
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const getPlanes = async () => {
      try {
        const res = await getPlansAPI();
        setPlans(res?.data[0]?.Plan || []);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    getPlanes();
  }, []);

 const handleGetStarted = async (plan) => {
   // Direct localStorage se uthayein taaki koi confusion na ho
   const savedUser = JSON.parse(localStorage.getItem("user"));
   const savedToken = localStorage.getItem("token");

   console.log("User in Pricing:", savedUser); // Debugging ke liye

   if (!savedUser || !savedToken) {
     toast.error("Please login to proceed.");
     navigate("/login");
     return;
   }

   // Aapke JSON mein "id" hai, toh wahi use karein
   const userId = savedUser.id || savedUser._id;
   const email = savedUser.email;

   try {
     setLoadingPlan(plan.name);
     const response = await checkoutAPI({
       amount: Number(plan.price),
       userId: userId,
       email: email,
     });

     if (response?.url) {
       window.location.href = response.url; // Stripe open hoga
     }
   } catch (err) {
     toast.error("Checkout failed");
   } finally {
     setLoadingPlan(null);
   }
 };
  return (
    <div className="bg-light min-vh-100 pb-5">
      <div
        className="bg-navy pt-5 pb-5 mb-5 text-center position-relative"
        style={{ backgroundColor: "#002147" }}>
        <div className="container py-2">
          <h6
            className="text-tan fw-bold text-uppercase ls-2 mb-3"
            style={{ color: "#de9f57" }}>
            Flexible Plans
          </h6>
          <h1 className="display-4 fw-bold text-white mb-3">
            Choose Your Business Impact
          </h1>
        </div>
        <div
          className="position-absolute bottom-0 start-0 end-0 bg-light"
          style={{
            height: "100px",
            clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
          }}></div>
      </div>

      <div
        className="container"
        style={{ marginTop: "-120px", position: "relative", zIndex: "10" }}>
        <div className="row g-4 justify-content-center">
          {plans.map((plan, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-lg rounded-5 overflow-hidden">
                <div
                  style={{ height: "10px", backgroundColor: "#002147" }}></div>
                <div className="card-body p-4 p-xl-5">
                  <h3 className="fw-bold text-navy mb-1">{plan.name}</h3>
                  <div className="d-flex align-items-end my-4">
                    <h2 className="display-5 fw-bold text-navy mb-0">
                      ${plan.price}
                    </h2>
                    <span className="text-muted ms-2 pb-2 small">
                      / lifetime
                    </span>
                  </div>
                  <ul className="list-unstyled mb-5">
                    {plan.features?.map((feature, i) => (
                      <li
                        key={i}
                        className="mb-3 d-flex align-items-start small text-muted">
                        <span className="me-3 mt-1">
                          <svg width="18" height="18" viewBox="0 0 20 20">
                            <circle
                              cx="10"
                              cy="10"
                              r="10"
                              fill={accent}
                              fillOpacity="0.15"
                            />
                            <path
                              d="M14 7L8.5 12.5L6 10"
                              stroke={accent}
                              strokeWidth="2"
                              fill="none"
                            />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleGetStarted(plan)}
                    className="btn w-100 text-white py-3 rounded-pill fw-bold"
                    style={{ backgroundColor: "#002147" }}
                    disabled={loadingPlan === plan.name}>
                    {loadingPlan === plan.name
                      ? "Connecting..."
                      : "Get Started Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};;

export default Pricing;
