import React from "react";

const FeaturedListings = () => {
  const listings = [
    {
      id: 1,
      title: "Skyline Solar Tech",
      loc: "Downtown, New York",
      cat: "Business",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600",
    },
    {
      id: 2,
      title: "The Royal Grill",
      loc: "London Bridge, UK",
      cat: "Dining",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
    },
    {
      id: 3,
      title: "Velocity Motors",
      loc: "Munich, Germany",
      cat: "Automotive",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600",
    },
  ];

  return (
    <section className=" bg-light">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h6
            className="text-gold fw-bold ls-2 text-uppercase mb-2"
            style={{ letterSpacing: "3px" }}>
            Popular Categories
          </h6>
          <h2 className="display-5 fw-bold text-navy">Most Visited Places</h2>
          <div
            className="bg-gold mx-auto"
            style={{ height: "3px", width: "60px" }}></div>
        </div>

        <div className="row g-4">
          {listings.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative"
                style={{ transition: "0.3s" }}>
                <div className="position-relative">
                  <img
                    src={item.img}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                    alt={item.title}
                  />
                  <span className="badge bg-gold text-navy position-absolute top-0 end-0 m-3 py-2 px-3 fw-bold">
                    {item.cat}
                  </span>
                </div>
                <div className="card-body p-4 bg-white">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-patch-check-fill text-success me-2"></i>
                    <span className="small text-muted fw-semibold">
                      Verified Listing
                    </span>
                  </div>
                  <h4 className="fw-bold text-navy">{item.title}</h4>
                  <p className="text-muted small mb-4">
                    <i className="bi bi-geo-alt-fill text-gold me-1"></i>{" "}
                    {item.loc}
                  </p>
                  <button className="btn btn-outline-dark w-100 rounded-3 fw-bold py-2 border-2">
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
