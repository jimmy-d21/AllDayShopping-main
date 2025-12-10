import React, { useEffect, useState } from "react";
import { dummyAllStoreOrders } from "../../assets/assets";
import { formatOrderDate } from "../../utils/formatOrderDate";

const Orders = () => {
  const [storeOrders, setStoreOrders] = useState([]);

  const fetchAllStoreOrders = async () => {
    setStoreOrders(dummyAllStoreOrders);
  };

  useEffect(() => {
    fetchAllStoreOrders();
  }, []);

  return (
    <div className="min-h-screen flex-1 p-15 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      <div className=" max-w-4xl w-full flex flex-col gap-5">
        <h1 className="text-2xl font-medium text-gray-500">
          Store <span className="text-gray-800">Orders</span>
        </h1>
        <div className="w-full overflow-hidden rounded-md border-gray-300">
          <table className="min-w-full border border-gray-300 border-collapse">
            <thead className="text-left text-sm bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 flex flex-col gap-0.5">
                  <span>Sr.</span>
                  <span>No.</span>
                </th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-600 divide-y divide-gray-200">
              {storeOrders.map((order, index) => (
                <tr key={order?._id}>
                  <td className="px-4 py-3 text-green-600">{index + 1}</td>
                  <td className="px-4 py-3">{order?.owner?.username}</td>
                  <td className="px-4 py-3 font-semibold">${order?.total}</td>
                  <td className="px-4 py-3">{order?.paymentMethod}</td>
                  <td className="px-4 py-3">
                    <select className="outline-none">
                      {[
                        "ORDER_PLACED",
                        "PROCESSING",
                        "SHIPPED",
                        "DELIVERED",
                      ].map((option) => (
                        <option key={option} value={option.toLowerCase()}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {formatOrderDate(order?.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
