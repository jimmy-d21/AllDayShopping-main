import React, { useContext, useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import OrderContext from "../context/OrderContext";

const OrderPage = () => {
  const { allOrders, fetchAllOrders } = useContext(OrderContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="min-h-screen max-w-[1300px] mx-auto">
      <div className="flex flex-col w-[80%]">
        <div className="flex flex-col gap-3 my-15">
          <h1 className="text-2xl text-gray-950 font-semibold">My Orders</h1>
          <p className="text-gray-600 text-md  flex items-center gap-2">
            Showing total 2 orders{" "}
            <span
              onClick={() => navigate("/")}
              className="text-green-500 text-sm  flex items-center gap-2 cursor-pointer"
            >
              Go to home <FaLongArrowAltRight className="w-4 h-4" />
            </span>
          </p>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center justify-between text-md text-gray-600 font-semibold">
            <h3>Products</h3>
            <div className="flex items-center gap-5">
              <h3>Total Price</h3>
              <h3>Address</h3>
            </div>
            <h3 className="pr-5">Status</h3>
          </div>
          <div className="w-full flex flex-col gap-5 my-8">
            {allOrders.map((order) => (
              <OrderCard key={order?._id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
