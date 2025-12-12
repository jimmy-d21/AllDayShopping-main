import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [allStores, setAllStores] = useState([]);
  const [allPendingStores, setAllPendingStores] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged in admin
  useEffect(() => {
    fetchAuthUser();
  }, []);

  const fetchAuthUser = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/user/authUser`, {
        withCredentials: true,
      });
      setAuthUser(data.user);
    } catch {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  // LOGIN API ONLY
  const fetchLoginAccount = async (inputs) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/login`,
        inputs,
        { withCredentials: true }
      );

      if (data.error) {
        toast.error(data.error);
        return null;
      }

      setAuthUser(data.user);
      toast.success("Login successful");

      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      return null;
    }
  };

  // LOGOUT
  const fetchLogoutAccount = async () => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );

      toast.success(data.message);
      setAuthUser(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Logout failed");
    }
  };

  // DASHBOARD DATA
  const fetchDashBoardData = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/admin/admin-dashboard`,
        { withCredentials: true }
      );
      setDashboardData(data);
    } catch (error) {
      toast.error("Failed to load dashboard.");
    }
  };

  const fecthAllStores = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/admin/get-all-store`,
        { withCredentials: true }
      );
      setAllStores(data);
    } catch (error) {}
  };

  const fecthAllPendingStores = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/admin/pending-stores`,
        { withCredentials: true }
      );
      setAllPendingStores(data);
    } catch (error) {}
  };

  const fetchUpdateActiveStore = async (storeId) => {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/admin/update-active-store/${storeId}`,
        {},
        { withCredentials: true }
      );

      const updatedStore = data.store;

      // update UI
      setAllStores((prev) =>
        prev.map((store) => (store._id === storeId ? updatedStore : store))
      );
      if (!data.error) {
        toast.success("Store status updated");
      } else {
        toast.error(data.error);
      }
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update store");
    }
  };

  const fetchApproveStore = async (storeId) => {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/admin/approve-store/${storeId}`,
        {},
        { withCredentials: true }
      );

      // Remove approved store from pending stores
      setAllPendingStores((prev) =>
        prev.filter((store) => store._id !== storeId)
      );

      await fecthAllStores();

      if (!data.error) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to approve store");
    }
  };

  const value = {
    currency,
    dashboardData,
    fetchDashBoardData,
    authUser,
    fetchLoginAccount,
    fetchLogoutAccount,
    loading,
    navigate,
    allStores,
    fecthAllStores,
    allPendingStores,
    fecthAllPendingStores,
    fetchUpdateActiveStore,
    setAllStores,
    fetchApproveStore,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
