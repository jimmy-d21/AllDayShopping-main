import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const BACKEND_URL = "http://localhost:5000";
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch auth user on initial load
  useEffect(() => {
    fetchAuthUser();
  }, []);

  // AuthUser API
  const fetchAuthUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BACKEND_URL}/api/user/authUser`, {
        withCredentials: true,
      });
      setAuthUser(data.user);
    } catch (error) {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Create Account API
  const fetchCreateAccount = async (inputs) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/create-account`,
        inputs,
        { withCredentials: true }
      );

      if (data.error) {
        toast.error(data.error);
        return null;
      }

      toast.success(data.message);
      setAuthUser(data.newUser);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return null;
    }
  };

  // Login Account API
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

      toast.success(data.message);
      setAuthUser(data.user);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return null;
    }
  };

  // Logout Account API
  const fetchLogoutAccount = async () => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const fetchAddAddress = async (address) => {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/user/add-address`,
        address,
        { withCredentials: true }
      );

      toast.success(data.message);
      fetchAuthUser();
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  const value = {
    authUser,
    loading,
    fetchCreateAccount,
    fetchLoginAccount,
    fetchAuthUser,
    fetchLogoutAccount,
    fetchAddAddress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
