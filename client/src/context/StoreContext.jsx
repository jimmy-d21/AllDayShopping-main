import { createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [storeOrders, setStoreOrders] = useState([]);

  const fetchCreateStore = async (storeData) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/stores/create-store`,
        storeData,
        { withCredentials: true }
      );
      if (!data.error) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.success(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/stores/store-dashboard`,
        { withCredentials: true }
      );
      setDashboardData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllStoreProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/stores/get-all-store-products`,
        { withCredentials: true }
      );
      setStoreProducts(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Toggle product active status
  const fetchUpdateActiveProduct = async (productId) => {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/products/update-active-product/${productId}`,
        {},
        { withCredentials: true }
      );

      // Update state correctly
      setStoreProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? data.product : product
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const fetchAllStoreOrders = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/stores/get-all-store-orders`,
        { withCredentials: true }
      );
      setStoreOrders(data.orders);
    } catch (error) {}
  };

  const fetchUserStore = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/stores/seller-user`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    fetchCreateStore,
    fetchDashboardData,
    dashboardData,
    fetchAllStoreProducts,
    storeProducts,
    fetchUpdateActiveProduct,
    storeOrders,
    setStoreOrders,
    fetchAllStoreOrders,
    fetchUserStore,
    currency,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
