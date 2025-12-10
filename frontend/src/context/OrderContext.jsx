import { createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const value = {};

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
