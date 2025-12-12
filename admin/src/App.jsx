import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import Approve from "./pages/Approve";
import { Toaster } from "react-hot-toast";
import { useAdminContext } from "./context/AdminContext";
import Login from "./pages/Login";

const App = () => {
  const { authUser } = useAdminContext();
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/"
          element={authUser ? <Layout /> : <Navigate to={"/login"} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="stores" element={<Stores />} />
          <Route path="approve-store" element={<Approve />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
