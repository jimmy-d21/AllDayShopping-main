import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [allStores, setAllStores] = useState([]);
  const [allPendingStores, setAllPendingStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged in admin
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/admin/adminUser`, {
        withCredentials: true,
      });
      setAuthUser(data.user);
    } catch {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Admin login
  const fetchLoginAccount = async (inputs) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/admin/admin-login`,
        inputs,
        { withCredentials: true }
      );
      if (data.error) return toast.error(data.error);
      setAuthUser(data.user);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  // Admin logout
  const fetchLogoutAccount = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/admin/admin-logout`,
        {},
        { withCredentials: true }
      );
      setAuthUser(null);
      toast.success("Logged out");
    } catch (error) {
      toast.error(error.response?.data?.error || "Logout failed");
    }
  };

  // Dashboard
  const fetchDashBoardData = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/admin/admin-dashboard`,
        { withCredentials: true }
      );
      setDashboardData(data);
    } catch {
      toast.error("Failed to load dashboard");
    }
  };

  // Stores
  const fecthAllStores = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/admin/get-all-store`,
        { withCredentials: true }
      );
      setAllStores(data);
    } catch {}
  };

  const fecthAllPendingStores = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/admin/pending-stores`,
        { withCredentials: true }
      );
      setAllPendingStores(data);
    } catch {}
  };

  const fetchUpdateActiveStore = async (storeId) => {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/admin/update-active-store/${storeId}`,
        {},
        { withCredentials: true }
      );
      setAllStores((prev) =>
        prev.map((store) => (store._id === storeId ? data.store : store))
      );
      toast.success("Store status updated");
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
      setAllPendingStores((prev) =>
        prev.filter((store) => store._id !== storeId)
      );
      await fecthAllStores();
      toast.success("Store approved successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to approve store");
    }
  };

  const value = {
    authUser,
    dashboardData,
    allStores,
    allPendingStores,
    loading,
    currency,
    navigate,
    fetchLoginAccount,
    fetchLogoutAccount,
    fetchDashBoardData,
    fecthAllStores,
    fecthAllPendingStores,
    fetchUpdateActiveStore,
    fetchApproveStore,
    setAllStores,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
export default AdminContextProvider;
