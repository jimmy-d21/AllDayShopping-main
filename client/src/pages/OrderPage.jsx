import React, { useContext, useEffect } from "react";
import { FaShoppingBag, FaArrowRight, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import OrderContext from "../context/OrderContext";

const OrderPage = () => {
  const { allOrders, fetchAllOrders, currency } = useContext(OrderContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllOrders();
  }, []);

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

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen max-w-[1300px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaShoppingBag className="text-blue-600" />
            My Orders
          </h1>
          <p className="text-gray-600 mt-2">
            {allOrders.length} order{allOrders.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
            <div className="col-span-5">PRODUCT DETAILS</div>
            <div className="col-span-2 text-center">TOTAL</div>
            <div className="col-span-3">SHIPPING ADDRESS</div>
            <div className="col-span-2">STATUS</div>
          </div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-200">
          {allOrders.length === 0 ? (
            <div className="py-16 text-center">
              <FaShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-6">Your orders will appear here</p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            allOrders.map((order) => (
              <div
                key={order?._id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Product Details */}
                  <div className="col-span-5">
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
                        <img
                          src={order?.product?.image}
                          alt={order?.product?.name}
                          className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          {order?.product?.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600">
                            Qty: {order?.quantity}
                          </span>
                          <span className="text-sm text-gray-600">
                            {currency}
                            {order?.product?.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 text-center">
                    <div className="text-lg font-bold text-blue-700">
                      {currency}
                      {order?.total?.toFixed(2)}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="col-span-3">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="font-medium">{order?.address?.name}</div>
                      <div className="line-clamp-2">
                        {order?.address?.street}, {order?.address?.city}
                      </div>
                      <div>
                        {order?.address?.state}, {order?.address?.country}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                        order?.status
                      )}`}
                    >
                      <span className="w-2 h-2 rounded-full mr-2 bg-current opacity-75"></span>
                      {getStatusText(order?.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
