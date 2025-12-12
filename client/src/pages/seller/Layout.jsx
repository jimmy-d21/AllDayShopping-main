import React from "react";
import Sidebar from "../../components/seller/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/seller/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
