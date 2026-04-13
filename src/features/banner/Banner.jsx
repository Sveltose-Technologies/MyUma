
"use client";
import React from "react";

export default function Banner() {
  const slides = [
    {
      id: 1,
      tag: "PREMIUM SOLUTIONS",
      title: "Elevate Your Digital Experience",
      desc: "Streamlined tools designed to simplify your workflow and enhance productivity.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070",
    },
    {
      id: 2,
      tag: "GLOBAL CONNECT",
      title: "Seamless Integration for Teams",
      desc: "Connect your global operations with our powerful, secure platform.",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    },
  ];

  return (
    <div
      id="umaHero"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            data-bs-interval="5000">
            <div
              className="uma-banner d-flex align-items-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,33,71,0.75), rgba(0,33,71,0.75)), url(${slide.img})`,
                minHeight: "80vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              <div className="container px-4">
                <div className="row">
                  <div className="col-12 col-lg-8">
                    {/* Text Alignment: Center on mobile, Start on Desktop */}
                    <div className="uma-hero-box text-center text-lg-start text-white">
                      <span className="uma-tag-tan d-block mb-2 ls-2 fw-bold small">
                        {slide.tag}
                      </span>

                      {/* Responsive Title: Smaller on mobile, bigger on desktop */}
                      <h1 className="uma-title display-4 display-md-3 display-lg-2 fw-800 mb-3">
                        {slide.title}
                      </h1>

                      {/* Description: Hidden on very small screens or made smaller */}
                      <p
                        className="uma-desc lead mb-4 mx-auto mx-lg-0"
                        style={{ maxWidth: "600px" }}>
                        {slide.desc}
                      </p>

                      {/* Buttons: Stacked on mobile, side-by-side on SM and up */}
                      {/* <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3 mt-4">
                        <button className="btn-tan-solid px-4 py-3 px-md-5">
                          Get Started
                        </button>
                        <button className="btn-outline-white px-4 py-3 px-md-5">
                          Learn More
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

  
    </div>
  );
}