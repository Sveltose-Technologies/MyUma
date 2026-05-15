import React, { useEffect, useState } from "react";
import { getBannerAPI, getImgURL } from "../../services/authService";
import HomeSearchBar from "../../pages/HomeSearchBar";


export default function Banner() {
  const [bannerSlider, setBannerSlider] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getBannerAPI();
        if (response?.homeBanner) {
          setBannerSlider(response.homeBanner);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  return (
    <div
      id="umaHero"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="5000">
      <div className="carousel-inner">
        {bannerSlider.length > 0 ? (
          bannerSlider.map((slide, index) => (
            <div
              key={slide._id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${getImgURL(slide.bannerImage)})`,
                  minHeight: "85vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "background-image 0.5s ease-in-out",
                }}>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-10 text-center text-white">
                      {" "}
                      {/* col-lg-10 search bar ke liye behtar width dega */}
                      {/* 1. Tag */}
                      {slide.tag && (
                        <span
                          className="uma-tag-tan d-block mb-3 animate__animated animate__fadeInDown"
                          style={{
                            letterSpacing: "4px",
                            fontSize: "14px",
                            color: "#de9f57",
                          }}>
                          {slide.tag}
                        </span>
                      )}
                      {/* 2. Title */}
                      <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInUp">
                        {slide.title}
                      </h1>
                      {/* 3. Content */}
                      {slide.contant && (
                        <p className="lead mb-5 opacity-90 animate__animated animate__fadeInUp">
                          {slide.contant}
                        </p>
                      )}
                      {/* 🚀 4. SEARCH BAR YAHAN AYEGA */}
                      <div className="animate__animated animate__zoomIn">
                        <HomeSearchBar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <div
              className="bg-dark d-flex align-items-center justify-content-center"
              style={{ minHeight: "85vh" }}>
              <div className="spinner-border text-tan" role="status"></div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {bannerSlider.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#umaHero"
            data-bs-slide="prev">
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#umaHero"
            data-bs-slide="next">
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"></span>
          </button>
        </>
      )}
    </div>
  );
}
