import React from "react";
import Hero from "../components/Hero";
import LatestProducts from "../components/LatestProducts";
import BestSellingProduct from "../components/BestSellingProduct";
import Specifications from "../components/Specifications";
import Newsletter from "../components/Newsletter";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full max-w-[1300px] m-auto flex flex-col gap-10 py-10">
      <Hero />
      <LatestProducts />
      <BestSellingProduct />
      <Specifications />
      <Newsletter />
    </div>
  );
};

export default HomePage;
