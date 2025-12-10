import React from "react";
import { calculateRatings } from "../utils/calculateRatings";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="w-full flex flex-col gap-3 cursor-pointer"
    >
      <div className="h-70 p-8 w-full flex items-center justify-center bg-gray-100 rounded-md">
        <img
          src={product?.image}
          alt=""
          className="w-full h-full cursor-pointer transition-all duration-300 hover:scale-110"
        />
      </div>
      <div className="w-full flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between text-gray-600 font-medium">
          <h3>{product?.name}</h3> <span>${product?.price}</span>
        </div>
        <img
          className="w-20"
          src={`rating-${calculateRatings(product?.reviews)}.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProductCard;
