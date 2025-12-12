import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import { useContext } from "react";
import { useEffect } from "react";

const BestSellingProduct = () => {
  const { bestSellingProducts, fetchingBestSellingProducts } =
    useContext(ProductContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchingBestSellingProducts();
  }, []);
  return (
    <div className="flex flex-col gap-10 my-10">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-semibold ">Best Selling</h1>
        <div className="flex items-center gap-3 text-sm font-medium">
          <span className="text-gray-600">
            Showing{" "}
            {bestSellingProducts.length > 8
              ? `8`
              : `${bestSellingProducts.length}`}{" "}
            of {bestSellingProducts.length} products{" "}
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
        {bestSellingProducts.slice(0, 8).map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellingProduct;
