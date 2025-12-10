import React from "react";
import { LuPlus } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import { useEffect } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

const CartTotals = ({
  address,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  setOpen,
}) => {
  const { cartTotals, fetchCartTotals } = useContext(CartContext);
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    navigate("/order");
  };

  useEffect(() => {
    fetchCartTotals();
  }, []);

  return (
    <div className="max-w-80 w-full border border-gray-300 rounded-xl p-6 flex flex-col overflow-hidden">
      <h3 className="text-xl text-gray-800 font-medium">Payment Summary</h3>
      <div className="flex flex-col py-5 border-b border-gray-300">
        <p className="text-xs mb-5 text-gray-400">Payment Method</p>
        <div className="text-gray-500 flex items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-3 h-3 text-blue-600 cursor-pointer"
          />
          <span
            onClick={() => setPaymentMethod("COD")}
            className="cursor-pointer text-sm"
          >
            COD
          </span>
        </div>
        <div className="text-gray-500 flex items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "STRIPE"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-3 h-3 text-blue-600 cursor-pointer"
          />
          <span
            onClick={() => setPaymentMethod("STRIPE")}
            className="cursor-pointer text-sm"
          >
            Stripe Payment
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-5 border-b border-gray-300">
        <p className="text-gray-400 text-sm">Address</p>
        {address.name && (
          <div className="w-full flex items-center gap-10 text-xs text-gray-400">
            <div className="flex flex-col gap-1">
              <span>{address.name}</span>
              <span>{address.email}</span>
              <span>{address.street}</span>
              <span>{address.city}</span>
              <span>{address.state}</span>
              <span>{address.zip}</span>
              <span>{address.country}</span>
              <span>{address.phone}</span>
            </div>
            <FaEdit
              className="w-4 h-4 text-gray-400 cursor-pointer"
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
            />
          </div>
        )}
        {!address.name && (
          <select
            className="border border-gray-400 outline-none cursor-pointer py-2 px-2.5 text-xs text-gray-400 rounded-sm overflow-hidden w-70"
            onChange={(e) => setAddress(JSON.parse(e.target.value))}
          >
            <option value="">Select Address</option>
            {authUser.address.map((address, index) => (
              <option
                key={index}
                value={JSON.stringify(address)}
                className="overflow-hidden max-w-10 text-xs"
              >
                {address.name}, {address.email}
              </option>
            ))}
          </select>
        )}

        <div
          onClick={() => setOpen(true)}
          className="flex items-center text-gray-600 gap-2 text-xs cursor-pointer"
        >
          <span>Add Address</span> <LuPlus className="w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-col gap-2 py-5 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm font-medium">Subtotal:</span>
          <span className="text-sm font-semibold text-gray-500">
            ${cartTotals?.subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm font-medium">Shipping:</span>
          <span className="text-sm font-semibold text-gray-500">
            ${cartTotals?.shippingFee}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-5">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm font-medium">Total</span>
          <span className="text-gray-600 text-sm font-medium">
            ${cartTotals?.total.toLocaleString()}
          </span>
        </div>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="text-white text-sm font-medium py-3 rounded-md bg-gray-700 cursor-pointer transition-all duration-300 hover:bg-gray-800"
      >
        Place Order
      </button>
    </div>
  );
};

export default CartTotals;
