import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const BACKEND_URL = "http://localhost:5000";
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/orders/get-all-user-orders`,
        {
          withCredentials: true,
        }
      );
      setAllOrders(data.orders);
    } catch (error) {}
  };
  const value = { allOrders, fetchAllOrders };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
