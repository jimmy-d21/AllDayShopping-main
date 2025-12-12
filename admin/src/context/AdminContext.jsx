import { useContext } from "react";
import { createContext } from "react";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const value = {};
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};

export default AdminContextProvider;
