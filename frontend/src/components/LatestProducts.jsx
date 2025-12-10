import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { dummyLatestProducts } from "../assets/assets";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { useEffect } from "react";
import { useState } from "react";

const LatestProducts = () => {
  const { latestProducts, fetchingLatestProducts } = useContext(ProductContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchingLatestProducts();
  }, []);

  return (
    <div className="flex flex-col gap-10 my-10">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-semibold ">Latest Products</h1>
        <div className="flex items-center gap-3 text-sm font-medium">
          <span className="text-gray-600">
            Showing 4 of {latestProducts.length} products{" "}
          </span>
          <span
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 text-green-500 cursor-pointer"
          >
            View more <FaArrowRightLong className="w-4 h-4" />
          </span>
        </div>
      </div>
      <div className="px-20 grid grid-cols-4 gap-10">
        {latestProducts.slice(0, 4).map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
