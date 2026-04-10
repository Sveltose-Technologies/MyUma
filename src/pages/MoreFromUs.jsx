import React from "react";

const MoreFromUs = () => {
  const services = [
    {
      icon: "bi-search-heart",
      title: "Smart Discovery",
      desc: "Our AI-powered search helps you find the perfect match based on your preferences and location.",
    },
    {
      icon: "bi-shield-check",
      title: "Verified Trust",
      desc: "Every business is manually verified. Read honest feedback from our trusted global community.",
    },
    {
      icon: "bi-lightning-charge",
      title: "Instant Booking",
      desc: "Skip the wait. Book your table or appointment directly through our seamless platform.",
    },
  ];

  return (
    <section className=" bg-white">
      <div className="container py-5">
        {/* Section Header */}
        <div className="text-center mb-3">
          <h6 className="text-tan fw-bold text-uppercase mb-2">
            Our Ecosystem
          </h6>
          <h2 className="display-5 fw-bold text-navy">
            Experience More With Us
          </h2>
          <div
            className="bg-tan mx-auto mt-3 rounded-pill"
            style={{ height: "4px", width: "70px" }}></div>
        </div>

        <div className="row g-4 mt-2">
          {services.map((service, idx) => (
            <div key={idx} className="col-12 col-md-4">
              {/* Card with White Background and Shadow */}
              <div className="card h-100 border-0 rounded-4 bg-white shadow p-4 border-top border-4 border-gold">
                {/* Icon inside Tan Circle */}
                <div
                  className="bg-tan rounded-circle d-flex align-items-center justify-content-center mb-4 mx-auto mx-md-0"
                  style={{ width: "60px", height: "60px" }}>
                  <i className={`bi ${service.icon} fs-3 text-navy`}></i>
                </div>

                <h4 className="fw-bold text-navy mb-3">{service.title}</h4>
                <p className="text-muted mb-4">{service.desc}</p>

                {/* <div className="mt-auto">
                  <a
                    href="#"
                    className="text-navy fw-bold text-decoration-none">
                    Learn More{" "}
                    <i className="bi bi-arrow-right ms-2 text-tan"></i>
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreFromUs;
