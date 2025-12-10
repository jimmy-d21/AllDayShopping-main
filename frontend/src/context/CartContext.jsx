import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const BACKEND_URL = "http://localhost:5000";
  const [allCarts, setAllCarts] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    shippingFee: 0,
    total: 0,
    cartQuantity: 0,
  });

  const fetchAllCarts = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/carts/all-cart-item`,
        {
          withCredentials: true,
        }
      );
      setAllCarts(data);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const fetchAddCartItem = async (productId, quantity) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/carts/add-cart/${productId}`,
        { quantity },
        {
          withCredentials: true,
        }
      );
      toast.success(`Add Cart Successfully`);
      await fetchAllCarts();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const fetchRemoveCartItem = async (cartId) => {
    try {
      const { data } = await axios.delete(
        `${BACKEND_URL}/api/carts/remove-cart/${cartId}`,
        { withCredentials: true }
      );
      setAllCarts((prev) => prev.filter((cart) => cart._id !== cartId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const fetchUpdateQuantityCartItem = async (cartId, cartQuantity) => {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/carts/update-cart-quantity/${cartId}`,
        { cartQuantity },
        { withCredentials: true }
      );
      setAllCarts((prevCarts) =>
        prevCarts.map((cart) => (cart._id === cartId ? data : prevCarts))
      );
      await fetchCartTotals();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const fetchCartTotals = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/carts/cart-total`, {
        withCredentials: true,
      });
      setCartTotals(data);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const value = {
    allCarts,
    fetchAllCarts,
    fetchAddCartItem,
    fetchRemoveCartItem,
    fetchUpdateQuantityCartItem,
    cartTotals,
    fetchCartTotals,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
