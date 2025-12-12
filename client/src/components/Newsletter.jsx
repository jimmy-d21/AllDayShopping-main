import React from "react";

const Newsletter = () => {
  return (
    <div className="w-full flex items-center justify-center my-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-center w-140">
          <h1 className="text-2xl font-semibold">Join Newsletter</h1>
          <p className="text-gray-500 text-sm">
            Subscribe to get exclusive deals, new arrivals, and insider updates
            delivered straight to your inbox every week.
          </p>
        </div>
        <div className="w-full flex items-center justify-between gap-3 bg-gray-100 border border-gray-300 overflow-hidden rounded-full py-1 px-2">
          <input
            type="text"
            placeholder="Enter your email address"
            className="flex-1 pl-5 text-sm outline-none placeholder:text-sm"
          />
          <button className="text-white text-xs bg-green-500 py-3 px-5 font-semibold rounded-full cursor-pointer transition-all duration-300 hover:scale-110">
            Get Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
