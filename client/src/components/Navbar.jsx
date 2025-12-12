import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import UserContext from "../context/userContext";
import CartContext from "../context/CartContext";
import { calculateTotalCartQuantity } from "../utils/calculateTotalCartQuantity.js";

const Navbar = ({ setShowLogin }) => {
  const { authUser, loading, fetchLogoutAccount } = useContext(UserContext);
  const { allCarts, fetchAllCarts } = useContext(CartContext);

  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetchLogoutAccount();
    setOpen(false);
  };

  const isSeller = authUser?.role === "seller";

  useEffect(() => {
    const handleClickOutside = () => setOpen(false);

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchAllCarts();
  }, []);

  // ⭐ PRESS ENTER TO SEARCH
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchInput.trim() !== "") {
        navigate(`/shop?search=${encodeURIComponent(searchInput)}`);
      }
    }
  };

  const renderUserSection = () => {
    if (loading) {
      return (
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
      );
    }

    if (authUser) {
      return (
        <div className="relative z-50">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
            className="overflow-hidden rounded-full h-10 w-10 cursor-pointer border border-gray-300"
          >
            <img
              src={authUser?.profilePic || "/avatar-placeholder.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {open && (
            <div
              className="absolute right-0 top-12 min-w-48 flex flex-col gap-1 rounded-md p-2 bg-white shadow-lg border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {authUser.username}
                </p>
                <p className="text-xs text-gray-500">{authUser.email}</p>
              </div>

              {isSeller && (
                <button
                  onClick={() => {
                    navigate("/store");
                    setOpen(false);
                  }}
                  className="text-left text-gray-700 text-sm px-3 py-2 hover:bg-gray-100 rounded-md"
                >
                  Store Dashboard
                </button>
              )}

              <button
                onClick={() => {
                  navigate("/order");
                  setOpen(false);
                }}
                className="text-left text-gray-700 text-sm px-3 py-2 hover:bg-gray-100 rounded-md"
              >
                My Orders
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 text-sm px-3 py-2 hover:bg-gray-100 rounded-md"
              >
                <IoLogOutOutline className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        onClick={() => setShowLogin(true)}
        className="bg-green-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-600"
      >
        Login
      </button>
    );
  };

  return (
    <div className="w-full border-b border-gray-300 bg-white sticky top-0 z-40">
      <div className="w-full max-w-[1300px] mx-auto py-4 flex items-center justify-between">
        <div
          onClick={() => navigate("/")}
          className="text-green-600 font-semibold text-3xl cursor-pointer"
        >
          All Day <span className="text-gray-700">Shop</span>
        </div>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer text-gray-600 hover:text-green-600"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/shop")}
              className="cursor-pointer text-gray-600 hover:text-green-600"
            >
              Shop
            </li>
          </ul>

          {/* ⭐ SEARCH BAR (PRESS ENTER) */}
          <div className="flex items-center gap-2 bg-gray-100 py-2.5 px-4 rounded-full min-w-80 border border-gray-200">
            <CiSearch className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search products"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
            />
          </div>

          {authUser && (
            <div
              onClick={() => navigate("/cart")}
              className="flex items-center gap-3 cursor-pointer hover:text-green-600"
            >
              <div className="relative">
                {calculateTotalCartQuantity(allCarts) > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-gray-700 text-xs text-white">
                    {calculateTotalCartQuantity(allCarts)}
                  </span>
                )}
                <FiShoppingCart className="h-6 w-6" />
              </div>
              <span className="text-gray-600 font-medium">Cart</span>
            </div>
          )}

          {renderUserSection()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
