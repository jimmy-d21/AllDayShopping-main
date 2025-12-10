import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const authUser = {
    _id: "691dfe0889b94592c784d06e",
    username: "jimmyedelacruz1",
    email: "jimmyedelacruz1@gmail.com",
    password: "$2b$10$eatWxzAu45bD9CicfE.Mje2PXgKlZ60pvhIx.gJqwM4iHF/MgBAaS",
    role: "seller",
    profilePic:
      "https://res.cloudinary.com/dljgxwpkk/image/upload/v1763528416/nlsws7ly5vuzigwz4d7y.png",
    address: [
      {
        name: "Jimmy E. dela Cruz",
        email: "jimmyedelacruz1@gmail.com",
        street: "Block 12 Lot 5, Phase 2, Verdant Heights Subdivision",
        city: "Dasmariñas",
        state: "Cavite",
        zip: "4114",
        country: "Philippines",
        phone: "+63 927 888 4567",
        _id: "691dfe70687274f65c0a7709",
      },
    ],
    createdAt: "2025-11-19T17:27:36.579Z",
    updatedAt: "2025-11-19T17:29:20.672Z",
    __v: 1,
  };

  const handleLogout = async () => {
    alert("Logout successfully!");
  };

  return (
    <div className="flex items-center justify-between py-5 px-15 border-b border-gray-300">
      <div
        onClick={() => navigate("/")}
        className="text-green-600 font-semibold text-3xl cursor-pointer"
      >
        All Day <span className="text-gray-700">Shop</span>
      </div>
      <div className="relative flex items-center gap-5">
        <h1 className="text-gray-800 font-medium text-md ">
          {authUser?.username}
        </h1>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="overflow-hidden rounded-full h-10 w-10 cursor-pointer"
        >
          <img
            src={authUser?.profilePic}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {open && (
          <div className="absolute left-5 top-10 min-w-40 flex flex-col gap-2 rounded-md p-4 bg-white shadow-md">
            <div
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-600 text-md font-semibold cursor-pointer py-2 px-4 transition-all duration-300 hover:bg-gray-300 rounded-md"
            >
              <IoLogOutOutline className="w-5 h-5 text-gray-600 font-semibold" />
              <span>Sign out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
