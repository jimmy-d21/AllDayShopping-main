import React, { useContext, useState } from "react";
import { formatDateShort } from "../utils/formatDateShort";
import { FaStar, FaMapMarkerAlt, FaCalendar, FaBox } from "react-icons/fa";
import RateProduct from "./RateProduct";
import OrderContext from "../context/OrderContext";

const OrderCard = ({ order }) => {
  const { currency } = useContext(OrderContext);
  const [open, setOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "orderplaced":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {open && <RateProduct order={order} setOpen={setOpen} />}

      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Product Column */}
        <div className="col-span-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
              <img
                src={order?.product?.image}
                alt={order?.product?.name}
                className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {order?.product?.name}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FaBox className="w-3 h-3" />
                  Qty: {order?.quantity}
                </span>
                <span>
                  {currency}
                  {order?.product?.price}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                <FaCalendar className="w-3 h-3" />
                {formatDateShort(order?.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Price Column */}
        <div className="col-span-2 text-center">
          <div className="text-xl font-bold text-blue-700">
            {currency}
            {order?.total?.toFixed(2)}
          </div>
        </div>

        {/* Address Column */}
        <div className="col-span-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaMapMarkerAlt className="w-3 h-3" />
              {order?.address?.name}
            </div>
            <div className="text-sm text-gray-600 space-y-0.5">
              <div className="line-clamp-2">
                {order?.address?.street}, {order?.address?.city}
              </div>
              <div>
                {order?.address?.state}, {order?.address?.country}
              </div>
              <div>{order?.address?.phone}</div>
            </div>
          </div>
        </div>

        {/* Status Column */}
        <div className="col-span-2">
          <div
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
              order?.status
            )}`}
          >
            <span className="w-2 h-2 rounded-full mr-2 bg-current opacity-75"></span>
            {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
          </div>
        </div>

        {/* Rating Column */}
        <div className="col-span-1">
          <div className="flex justify-center">
            {order?.rate < 1 ? (
              <button
                onClick={() => setOpen(true)}
                className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
              >
                Rate
              </button>
            ) : (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rate) => (
                  <FaStar
                    key={rate}
                    className={`w-4 h-4 ${
                      rate <= order?.rate ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Order ID: {order?._id?.slice(-8)}
          </div>
          <div className="text-sm text-gray-500">
            Payment: {order?.paymentMethod || "COD"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
