import React, { useState } from "react";
import { formatDateShort } from "../utils/formatDateShort";
import { FaStar } from "react-icons/fa";
import RateProduct from "./RateProduct";

const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-5">
      {open && <RateProduct order={order} setOpen={setOpen} />}
      <div className="w-full flex items-center justify-between">
        {/* Order Product Details */}
        <div className="w-full flex items-center gap-5">
          <div className="h-25 w-25 flex items-center justify-center bg-gray-100 rounded-md">
            <img
              src={order?.product?.image}
              alt=""
              className="w-15 h-15 transition-all duration-300 hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-0">
            <h3 className="text-md font-semibold text-gray-600">
              {order?.product?.name}
            </h3>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <span>${order?.product?.price}</span>
              <span>Qty: {order?.quantity}</span>
            </div>
            <div className="text-sm font-medium text-gray-500">
              {formatDateShort(order?.createdAt)}
            </div>
            {order?.rate < 1 && (
              <p
                onClick={() => setOpen((prev) => !prev)}
                className="text-sm text-green-600 mt-1 cursor-pointer"
              >
                Rate Product
              </p>
            )}
            {order?.rate >= 1 && (
              <div className="flex items-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((rate) => (
                  <FaStar
                    key={rate}
                    className={`w-4 h-4 ${
                      rate <= order?.rate ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Order Details */}
        <div className="w-full  flex items-center gap-10">
          <p>${order?.total}</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 font-medium">
                {order?.address?.name},{" "}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {order?.address?.street}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 font-medium">
                {order?.address?.city},{" "}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {order?.address?.state},
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {order?.address?.zip},
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {order?.address?.country}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {order?.address?.phone}
            </span>
          </div>
        </div>
        {/* Order Status */}
        <div
          className={`flex items-center gap-2 py-2 px-5 rounded-md ${
            order?.status === "orderplaced" ? "bg-gray-300" : "bg-green-300"
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <p className="flex items-center text-sm text-gray-500">
            {order?.status}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full px-20 pt-8">
        <hr className="w-full h-1 text-gray-400" />
      </div>
    </div>
  );
};

export default OrderCard;
