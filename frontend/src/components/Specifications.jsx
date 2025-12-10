import React from "react";
import { BsSend } from "react-icons/bs";
import { LuClock7 } from "react-icons/lu";
import { FaHeadset } from "react-icons/fa6";
const Specifications = () => {
  return (
    <div className="w-full px-20 flex flex-col mt-10">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-center text-2xl font-semibold">
          Our Specifications
        </h1>
        <p className="text-center text-sm text-gray-600 w-150">
          We offer top-tier service and convenience to ensure your shopping
          experience is smooth, secure and completely hassle-free.
        </p>
      </div>
      <div className="w-full grid grid-cols-3 gap-8 mt-25">
        <div className="relative w-full flex flex-col p-10 rounded-md bg-green-100 border border-green-300 text-center">
          <div className="absolute -top-5 right-40 flex items-center justify-center h-12 w-12 bg-green-400 rounded-md">
            <BsSend className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-gray-800 text-md font-semibold my-3">
            Free Shipping
          </h1>
          <p className="text-sm text-gray-700">
            Enjoy fast, free delivery on every order no conditions, just
            reliable doorstep.
          </p>
        </div>
        <div className="relative w-full flex flex-col p-10 rounded-md bg-orange-100 border border-orange-300 text-center">
          <div className="absolute -top-5 right-40 flex items-center justify-center h-12 w-12 bg-orange-400 rounded-md">
            <LuClock7 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-gray-800 text-md font-semibold my-3">
            7 Days easy Return
          </h1>
          <p className="text-sm text-gray-700">
            Change your mind? No worries. Return any item within 7 days.
          </p>
        </div>
        <div className="relative w-full flex flex-col p-10 rounded-md bg-purple-100 border border-purple-300 text-center">
          <div className="absolute -top-5 right-40 flex items-center justify-center h-12 w-12 bg-purple-400 rounded-md">
            <FaHeadset className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-gray-800 text-md font-semibold my-3">
            24/7 Customer Support
          </h1>
          <p className="text-sm text-gray-700">
            We're here for you. Get expert help with our customer support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
