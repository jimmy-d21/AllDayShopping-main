import React from "react";
import { useState } from "react";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between py-5 px-10 border-b border-gray-300">
      <div className="text-green-600 font-semibold text-3xl">
        All Day <span className="text-gray-700">Shop</span>
      </div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center gap-3 cursor-pointer"
      >
        <span className="text-gray-600 font-medium">Hi, Jimmy</span>
        <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden">
          <img src="/vite.svg" alt="" className="w-full h-full" />
        </div>
        {open && (
          <div className="absolute top-10 right-0 bg-gray-300 border-gray-300 rounded-md py-2 px-5 shadow cursor-pointer">
            <span>Logout</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
