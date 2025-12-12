import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductContext from "../context/ProductContext";

const Hero = () => {
  const { currency } = useContext(ProductContext);
  return (
    <div className="w-full flex gap-8">
      {/* Right */}
      <div className="flex bg-green-200 pt-15 px-15 rounded-3xl">
        <div className="flex flex-col pb-15">
          <div className="flex items-center gap-3 bg-green-300 rounded-full py-1 px-2 max-w-90">
            <span className="bg-green-600 text-white rounded-full py-1 px-3 text-center text-sm">
              News
            </span>
            <p className="text-sm text-green-600 font-medium">
              Free Shipping on Orders Above {currency}50!
            </p>
          </div>
          <h1 class="text-transparent w-120 bg-clip-text bg-gradient-to-r from-green-700 via-green-500 to-green-300 font-medium text-5xl mt-4">
            Gadgets you'll love. Prices you'll trust.
          </h1>
          <div className="flex flex-col mt-8">
            <p className="text-gray-800 font-dedium text-sm">Start from</p>
            <span className="text-gray-800 font-semibold text-3xl">
              {currency}399
            </span>
          </div>
          <button className="bg-gray-800 text-white py-5 px-10 max-w-50 mt-8 rounded-md cursor-pointer transition-all duration-300 hover:scale-105">
            LEARN MORE
          </button>
        </div>
        <img src={assets.hero_model_img} alt="" className="w-100 h-100" />
      </div>

      {/* Left */}
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-10 px-8 py-10 rounded-3xl bg-orange-200 min-w-80">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-medium">
              Best <br /> products
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm">View more</span>{" "}
              <FaArrowRightLong className="w-4 h-4" />
            </div>
          </div>
          <img src={assets.hero_product_img1} alt="" className="w-30 h-30" />
        </div>
        <div className="flex items-center gap-10 px-8 py-10 rounded-3xl bg-blue-200 min-w-80">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-medium">
              20% <br /> dicounts
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm">View more</span>{" "}
              <FaArrowRightLong className="w-4 h-4" />
            </div>
          </div>
          <img src={assets.hero_product_img2} alt="" className="w-40 h-40" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
