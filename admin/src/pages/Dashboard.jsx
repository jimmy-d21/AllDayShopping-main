import React from "react";
import { useState } from "react";
import { dummyAdminDashboard } from "../assets/assets";
import { useEffect } from "react";
import { LuShoppingBasket } from "react-icons/lu";
import { AiOutlineDollar } from "react-icons/ai";
import { LuTags } from "react-icons/lu";
import { LuStore } from "react-icons/lu";

const Dashboard = () => {
  const currency = "₱";
  const [dashboardData, setDashBoardData] = useState(null);

  const fetchDashBoardData = async () => {
    try {
      setDashBoardData(dummyAdminDashboard);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  return (
    <div className="flex-1 flex flex-col py-13 px-10">
      <div className="flex flex-col gap-5 max-w-5xl">
        <h1 className="text-gray-500 text-2xl font-semibold">
          Admin <span className="text-gray-800">Dashboard</span>
        </h1>
        <div className="w-full flex items-center gap-5 justify-between">
          <div className="w-full py-2 px-7 border border-gray-300 rounded-md flex items-center justify-between h-25">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm text-gray-600 font-medium">
                Total Products
              </h3>
              <span className="text-2xl font-medium">
                {dashboardData?.totalProducts}
              </span>
            </div>
            <div className="h-12 w-12 p-2.5 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              <LuShoppingBasket className="w-full h-full text-gray-400" />
            </div>
          </div>
          <div className="w-full py-2 px-7 border border-gray-300 rounded-md flex items-center justify-between h-25">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm text-gray-600 font-medium">
                Total Revenue
              </h3>
              <span className="text-2xl font-medium">
                <span className="font-semibold">{currency}</span>
                {dashboardData?.totalRevenue.toLocaleString()}
              </span>
            </div>
            <div className="h-12 w-12 p-2.5 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              <AiOutlineDollar className="w-full h-full text-gray-400" />
            </div>
          </div>
          <div className="w-full py-2 px-7 border border-gray-300 rounded-md flex items-center justify-between h-25">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm text-gray-600 font-medium">
                Total Orders
              </h3>
              <span className="text-2xl font-medium">
                {dashboardData?.totalOrders}
              </span>
            </div>
            <div className="h-12 w-12 p-2.5 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              <LuTags className="w-full h-full text-gray-400" />
            </div>
          </div>
          <div className="w-full py-2 px-7 border border-gray-300 rounded-md flex items-center justify-between h-25">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm text-gray-600 font-medium">
                Total Stores
              </h3>
              <span className="text-2xl font-medium">
                {dashboardData?.totalStores}
              </span>
            </div>
            <div className="h-12 w-12 p-2.5 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              <LuStore className="w-full h-full text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
