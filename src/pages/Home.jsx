import React from "react";
import Banner from "../features/banner/Banner";
import FeaturedListings from "./FeaturedListings";
import MoreFromUs from "./MoreFromUs";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Banner />

      {/* Main Sections */}
      <FeaturedListings />
      <MoreFromUs />

    </div>
  );
};

export default Home;
