import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const BACKEND_URL = "http://localhost:5000";
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const fetchingLatestProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/latest-products`,
        { withCredentials: true }
      );
      setLatestProducts(data);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const fetchingBestSellingProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/best-selling-products`,
        { withCredentials: true }
      );
      setBestSellingProducts(data);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/all-products`,
        { withCredentials: true }
      );
      setAllProducts(data);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const fetchProductsDetails = async (productId) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/view-product-details/${productId}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const value = {
    latestProducts,
    fetchingLatestProducts,
    bestSellingProducts,
    fetchingBestSellingProducts,
    allProducts,
    fetchAllProducts,
    fetchProductsDetails,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
