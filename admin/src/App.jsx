import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import Approve from "./pages/Approve";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="stores" element={<Stores />} />
        <Route path="approve-store" element={<Approve />} />
      </Route>
    </Routes>
  );
};

export default App;
