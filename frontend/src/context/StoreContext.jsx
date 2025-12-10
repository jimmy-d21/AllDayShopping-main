import { createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const BACKEND_URL = "http://localhost:5000";
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
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
    } catch (error) {}
  };
  const value = { fetchCreateStore, fetchDashboardData, dashboardData };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
