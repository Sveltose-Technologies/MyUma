import { useEffect, useState } from "react";
import { getPlansAPI } from "../features/auth/api";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
   const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const accent = "#de9f57";
  // const plans = [
  //   {
  //     name: "Business Premium",
  //     price: "19.99",

  //     features: [
  //       "One listing per location",
  //       "No Expiration",
  //       "24/7 Support",
  //       "Analytics Dashboard",
  //     ],
  //     accent: "#002147", // Navy
  //   },
  //   {
  //     name: "Marketplace",
  //     price: "0.00",

  //     isFeatured: true,
  //     features: [
  //       "Free listing for 60 days",
  //       "Featured in search",
  //       "24/7 Support",
  //       "Community Access",
  //     ],
  //     accent: "#de9f57", // Tan
  //   },
  //   {
  //     name: "Enterprise",
  //     price: "49.99",

  //     features: [
  //       "Unlimited listings",
  //       "Featured on homepage",
  //       "Priority Support",
  //       "Verified Badge",
  //     ],
  //     accent: "#002147", // Navy
  //   },
  // ];

  const getPlanes = async () => {
    try {
      const plansResponse = await getPlansAPI();

      setPlans(plansResponse?.data[0]?.Plan || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };
  useEffect(() => {
    getPlanes();
  }, []);

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Premium Header */}
      <div className="bg-navy pt-5 pb-5 mb-5 text-center position-relative">
        <div className="container py-2">
          <h6 className="text-tan fw-bold text-uppercase ls-2 mb-3">
            Flexible Plans
          </h6>
          <h1 className="display-4 fw-bold text-white mb-3">
            Choose Your Business Impact
          </h1>
          <p className="text-white-50 mx-auto" style={{ maxWidth: "600px" }}>
            Join the MyUma premium directory and connect with a dedicated
            community. No hidden fees, just growth.
          </p>
        </div>
        {/* Decorative background curve */}
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
              <div
                className={`card h-100 border-0 shadow-lg rounded-5 overflow-hidden ${plan.isFeatured ? "scale-up" : ""}`}>
                {/* Visual Header Strip */}
                <div
                  style={{
                    height: "10px",
                    backgroundColor: plan.accent,
                  }}></div>

                <div className="card-body p-1 p-xl-5">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span
                      className={`badge rounded-pill px-3 py-2 ${plan.isFeatured ? "bg-tan text-navy" : "bg-light text-navy border"}`}>
                      {plan.label}
                    </span>
                  </div>

                  <h3 className="fw-bold text-navy mb-1">{plan.name}</h3>

                  <div className="d-flex align-items-end my-4">
                    <h2 className="display-5 fw-bold text-navy mb-0">
                      ${plan.price}
                    </h2>
                    <span className="text-muted ms-2 pb-2 small">
                      / lifetime
                    </span>
                  </div>

                  <hr className="my-4 opacity-10" />

                  <ul className="list-unstyled mb-5">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="mb-3 d-flex align-items-start small text-muted">
                        <span className="me-3 mt-1">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none">
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <button
                      onClick={() => navigate("/")}
                      className={`uma-btn-navy w-100 ${
                        plan.isFeatured
                          ? "bg-navy text-white"
                          : "bg-navy text-white"
                      }`}>
                      Get Started Now
                    </button>
                    <p className="text-center text-muted small mt-3 mb-0">
                      Cancel or switch anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="text-center mt-5 pt-4">
          <p className="text-muted small">
            Need a custom solution for your agency?
            <a href="#" className="text-tan fw-bold text-decoration-none ms-1">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
