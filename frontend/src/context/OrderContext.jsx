// context/OrderContext.js
import { createContext, useState } from "react";
import axios from "axios";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const BACKEND_URL = "http://localhost:5000";
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

  return (
    <OrderContext.Provider value={{ allOrders, fetchAllOrders, fetchAddOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
