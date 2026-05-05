import React from "react";
import Banner from "../features/banner/Banner";
import FeaturedListings from "./FeaturedListings";
import MoreFromUs from "./MoreFromUs";
import AboutUs from "./AboutUs";
import TestimonialPage from "./TestimonialPage";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Banner />

      {/* Main Sections */}
      <FeaturedListings />
      <MoreFromUs />
<AboutUs />
<TestimonialPage />
    </div>
  );
};

export default Home;
