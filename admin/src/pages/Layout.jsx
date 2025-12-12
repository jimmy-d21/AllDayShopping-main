import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex gap-10">
      <h1>Layout</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
