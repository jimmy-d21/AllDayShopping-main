import React from "react";
import { formatDateShort } from "../../utils/formatDateShort";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between pb-10 border-b border-gray-300">
      <div className="max-w-100 w-full flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <div className="overflow-hidden rounded-full h-10 w-10 cursor-pointer">
            <img
              src={review?.user?.profilePic || "/avatar-placeholder.png"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-gray-800 font-medium text-sm">
              {review?.user?.username}
            </h3>
            <span className="text-gray-500 text-sm">
              {formatDateShort(review?.createdAt)}
            </span>
          </div>
        </div>
        <p className="w-full text-sm text-gray-500">{review?.comment}</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col text-right">
          <p className="text-gray-400 text-md font-medium">
            {review?.product?.category}
          </p>
          <p className="text-gray-600 text-md font-medium">
            {review?.product?.name}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`w-4.5 h-4.5 ${
                  review?.rating >= star ? "text-green-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div
          onClick={() => navigate(`/product/${review?.product?._id}`)}
          className="bg-gray-100 py-3 px-4 text-sm rounded-md text-center cursor-pointer transition-all duration-300 hover:bg-gray-200"
        >
          View Product
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
