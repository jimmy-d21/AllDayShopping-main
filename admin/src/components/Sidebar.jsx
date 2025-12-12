import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome, GoShieldCheck } from "react-icons/go";
import { LuStore } from "react-icons/lu";

const Sidebar = () => {
  const location = useLocation().pathname;

  const adminMenus = [
    {
      icon: <GoHome className="w-5 h-5" />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      icon: <LuStore className="w-5 h-5" />,
      label: "Stores",
      path: "/admin/stores",
    },
    {
      icon: <GoShieldCheck className="w-5 h-5" />,
      label: "Approve Store",
      path: "/admin/approve-store",
    },
  ];

  return (
    <div className="min-h-screen w-[250px] bg-white border-r border-gray-200 flex flex-col">
      {/* --- Logo Section --- */}
      <div className="flex flex-col items-center gap-3 py-10">
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden shadow">
          <img src="/vite.svg" alt="Logo" className="w-full h-full" />
        </div>
        <span className="text-gray-700 font-semibold text-sm">
          Jimmy Dela Cruz
        </span>
      </div>

      {/* --- Menu Section --- */}
      <div className="flex flex-col mt-4 gap-1">
        {adminMenus.map((menu, index) => {
          const isActive = location === menu.path;
          return (
            <Link
              to={menu.path}
              key={index}
              className={`flex items-center gap-3 px-6 py-3 border-r-4 transition-all
                ${
                  isActive
                    ? "border-green-500 bg-gray-50 text-green-600"
                    : "border-transparent hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <span>{menu.icon}</span>
              <span className="text-sm font-medium">{menu.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
