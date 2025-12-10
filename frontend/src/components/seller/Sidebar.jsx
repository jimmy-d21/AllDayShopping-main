import React, { useEffect, useState } from "react";
import { dummyStoreUser } from "../../assets/assets";
import { FiHome } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdViewList } from "react-icons/md";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Sidebar = () => {
  const { fetchUserStore } = useContext(StoreContext);
  const [storeData, setStoreData] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation(); // ✅ FIXED

  const fetchStoreUser = async () => {
    const store = await fetchUserStore();
    setStoreData(store);
  };

  useEffect(() => {
    fetchStoreUser();
  }, []);

  return (
    <div className="max-w-[280px] min-h-screen w-full border-r border-gray-300 overflow-hidden flex flex-col">
      <div className="w-full flex flex-col gap-4 items-center justify-center py-8">
        <div className="overflow-hidden rounded-full h-20 w-20">
          <img
            src={storeData?.storeLogo}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-gray-600 font-medium">{storeData?.name}</h3>
      </div>
      <div className="w-full flex flex-col">
        <div
          onClick={() => navigate("/store")}
          className={`w-full flex items-center gap-3 py-3 px-10 cursor-pointer ${
            pathname === "/store"
              ? "border-r-[5px] border-green-500 bg-gray-200"
              : ""
          } hover:bg-gray-100`}
        >
          <FiHome className="w-4.5 h-4.5 text-gray-500 " />
          <span className="text-gray-500 text-md font-medium">Dashboard</span>
        </div>
        <div
          onClick={() => navigate("/store/add-product")}
          className={`w-full flex items-center gap-3 py-3 px-10 cursor-pointer ${
            pathname === "/store/add-product"
              ? "border-r-[5px] border-green-500 bg-gray-200"
              : ""
          } hover:bg-gray-100`}
        >
          <FaRegPlusSquare className="w-4.5 h-4.5 text-gray-500 " />
          <span className="text-gray-500 text-md font-medium">Add Product</span>
        </div>
        <div
          onClick={() => navigate("/store/manage-product")}
          className={`w-full flex items-center gap-3 py-3 px-10 cursor-pointer ${
            pathname === "/store/manage-product"
              ? "border-r-[5px] border-green-500 bg-gray-200"
              : ""
          } hover:bg-gray-100`}
        >
          <FaEdit className="w-4.5 h-4.5 text-gray-500 " />
          <span className="text-gray-500 text-md font-medium">
            Manage Product
          </span>
        </div>
        <div
          onClick={() => navigate("/store/orders")}
          className={`w-full flex items-center gap-3 py-3 px-10 cursor-pointer ${
            pathname === "/store/orders"
              ? "border-r-[5px] border-green-500 bg-gray-200"
              : ""
          } hover:bg-gray-100`}
        >
          <MdViewList className="w-4.5 h-4.5 text-gray-500 " />
          <span className="text-gray-500 text-md font-medium">Orders</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
