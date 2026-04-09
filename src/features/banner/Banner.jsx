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
              className="uma-banner"
              style={{
                backgroundImage: `linear-gradient(rgba(0,33,71,0.7), rgba(0,33,71,0.7)), url(${slide.img})`,
              }}>
              <div className="container h-100 d-flex align-items-center">
                <div className="uma-hero-box text-white">
                  <span className="uma-tag-tan">{slide.tag}</span>
                  <h1 className="uma-title">{slide.title}</h1>
                  <p className="uma-desc">{slide.desc}</p>
                  <div className="d-flex gap-3 mt-4">
                    <button className="btn-tan-solid px-5 py-3">
                      Get Started
                    </button>
                    <button className="btn-outline-white px-5 py-3">
                      Learn More
                    </button>
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
