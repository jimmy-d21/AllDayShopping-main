import React, { useEffect, useState } from "react";
import { dummyDashboard } from "../../assets/assets";
import { LuShoppingBasket } from "react-icons/lu";
import { AiOutlineDollar } from "react-icons/ai";
import { LuTags } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import ReviewCard from "../../components/seller/ReviewCard";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboard);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="max-h-screen h-full flex-1 p-15 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col w-full max-w-5xl">
        <div className="flex flex-col gap-5 mb-15">
          <h1 className="text-2xl font-medium text-gray-500">
            Seller <span className="text-gray-800">Dashboard</span>
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
                  Total Earnings
                </h3>
                <span className="text-2xl font-medium">
                  ${dashboardData?.totalEarnings}
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
                  Total Ratings
                </h3>
                <span className="text-2xl font-medium">
                  {dashboardData?.totalRatings}
                </span>
              </div>
              <div className="h-12 w-12 p-2.5 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                <FaRegStar className="w-full h-full text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-10">
          <h1 className="text-md font-medium text-gray-500">Total Reviews</h1>
          <div className="w-full flex flex-col gap-5">
            {dashboardData?.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
