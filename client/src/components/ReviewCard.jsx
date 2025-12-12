import React from "react";
import { formatDateShort } from "../utils/formatDateShort";
const ReviewCard = ({ review }) => {
  return (
    <div className="flex gap-3 items-start">
      <div className="h-13 w-13 flex items-center justify-center rounded-full overflow-hidden">
        <img
          src={review?.user?.profilePic || "/avatar-placeholder.png"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <img
          src={`/rating-${review?.rating * 10}.png`}
          alt=""
          className="h-4 w-25"
        />
        <p className="text-sm mt-1 text-gray-800 w-120 font-medium">
          {review?.comment}
        </p>
        <h3 className="text-sm -mb-2 text-gray-600">
          {review?.user?.username}
        </h3>
        <div className="text-sm text-gray-600 font-medium">
          {formatDateShort(review?.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
