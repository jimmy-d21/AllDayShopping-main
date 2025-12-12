// context/OrderContext.js
import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/orders/get-all-user-orders`,
        { withCredentials: true }
      );
      setAllOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddOrder = async (paymentMethod, address) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/orders/add-order`,
        { paymentMethod, address },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchUpdateStatusOrder = async (orderId, status) => {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/orders/update-status-order/${orderId}`,
        { status },
        { withCredentials: true }
      );
      toast.success(data.message);
      return data.order;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      throw error;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        allOrders,
        fetchAllOrders,
        fetchAddOrder,
        fetchUpdateStatusOrder,
        setAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
