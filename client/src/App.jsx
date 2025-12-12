import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import StorePage from "./pages/StorePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import CreateStorePage from "./pages/CreateStorePage";
import OrderPage from "./pages/OrderPage";
import Layout from "./pages/seller/Layout";
import Dashboard from "./pages/seller/Dashboard";
import AddProducts from "./pages/AddProducts";
import ManageProduct from "./pages/seller/ManageProduct";
import Orders from "./pages/seller/Orders";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isSellerDashboard = location.pathname.startsWith("/store");

  return (
    <>
      <Toaster />
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {!isSellerDashboard && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route
          path="/product/:id"
          element={<ProductDetails setShowLogin={setShowLogin} />}
        />
        <Route path="/create-store" element={<CreateStorePage />} />
        <Route path="/shop/:name" element={<StorePage />} />
        <Route path="/store" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProducts />} />
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      {!isSellerDashboard && <Footer />}
    </>
  );
};

export default App;
