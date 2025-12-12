// components/CartTotals.jsx
import React, { useContext, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa6";
import CartContext from "../context/CartContext";
import UserContext from "../context/userContext";
import OrderContext from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartTotals = ({
  address,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  setOpen,
}) => {
  const { cartTotals, fetchCartTotals, fetchAllCarts, currency } =
    useContext(CartContext);
  const { authUser } = useContext(UserContext);
  const { fetchAddOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!address?.name) {
      toast.error("Please select an address.");
      return;
    }

    try {
      await fetchAddOrder(paymentMethod, address);
      toast.success("Order placed successfully!");
      await fetchAllCarts();
      navigate("/order");
    } catch {
      toast.error("Failed to place order.");
    }
  };

  useEffect(() => {
    fetchCartTotals();
  }, []);

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h3>

      {/* Totals */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">
            {currency}
            {cartTotals?.subtotal?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-medium">
            {currency}
            {cartTotals?.shippingFee?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between pt-3 border-t">
          <span className="font-semibold text-gray-800">Total:</span>
          <span className="text-lg font-bold text-blue-600">
            {currency}
            {cartTotals?.total?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-700 mb-2">Payment Method</p>
        <div className="flex gap-3">
          <button
            onClick={() => setPaymentMethod("COD")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
              paymentMethod === "COD"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <BsCashCoin className="w-4 h-4" />
            <span className="text-sm">COD</span>
          </button>
          <button
            onClick={() => setPaymentMethod("STRIPE")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
              paymentMethod === "STRIPE"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <FaCreditCard className="w-4 h-4" />
            <span className="text-sm">Stripe</span>
          </button>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Shipping Address</p>
          {address.name && (
            <button
              onClick={() =>
                setAddress({
                  name: "",
                  email: "",
                  street: "",
                  city: "",
                  state: "",
                  zip: "",
                  country: "",
                  phone: "",
                })
              }
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Clear
            </button>
          )}
        </div>

        {address.name ? (
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
            <p className="font-medium text-gray-800">{address.name}</p>
            <p className="text-gray-600 truncate">{address.email}</p>
            <p className="text-gray-600">
              {address.street}, {address.city}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <select
              className="w-full p-2 text-sm border border-gray-300 rounded-lg"
              onChange={(e) => setAddress(JSON.parse(e.target.value))}
            >
              <option value="">Select address</option>
              {authUser?.address?.map((addr, i) => (
                <option key={i} value={JSON.stringify(addr)}>
                  {addr.name}, {addr.city}
                </option>
              ))}
            </select>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <LuPlus className="w-4 h-4" />
              Add new address
            </button>
          </div>
        )}
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={!address?.name}
        className={`w-full py-3 rounded-lg font-medium ${
          address?.name
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        {address?.name ? "Place Order" : "Select Address"}
      </button>
    </div>
  );
};

export default CartTotals;
