import { createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const BACKEND_URL = "http://localhost:5000";
  const navigate = useNavigate();
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
  const value = { fetchCreateStore };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
