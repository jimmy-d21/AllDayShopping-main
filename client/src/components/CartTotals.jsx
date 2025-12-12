// components/CartTotals.jsx
import React, { useContext, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
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
  const { cartTotals, fetchCartTotals, fetchAllCarts } =
    useContext(CartContext);
  const { authUser } = useContext(UserContext);
  const { fetchAddOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!address?.name) {
      toast.error("Please select or add an address.");
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
    <div className="max-w-80 w-full border border-gray-300 rounded-xl p-6 flex flex-col overflow-hidden">
      <h3 className="text-xl text-gray-800 font-medium">Payment Summary</h3>

      {/* PAYMENT METHOD */}
      <div className="flex flex-col py-5 border-b border-gray-300">
        <p className="text-xs mb-5 text-gray-400">Payment Method</p>

        <div className="text-gray-500 flex items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span
            onClick={() => setPaymentMethod("COD")}
            className="cursor-pointer"
          >
            COD
          </span>
        </div>

        <div className="text-gray-500 flex items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="STRIPE"
            checked={paymentMethod === "STRIPE"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span
            onClick={() => setPaymentMethod("STRIPE")}
            className="cursor-pointer"
          >
            Stripe Payment
          </span>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="flex flex-col gap-2 py-5 border-b border-gray-300">
        <p className="text-gray-400 text-sm">Address</p>

        {address.name ? (
          <div className="w-full flex items-center gap-10 text-xs text-gray-400">
            <div className="flex flex-col gap-1">
              {Object.values(address).map((v, i) => (
                <span key={i}>{v}</span>
              ))}
            </div>
            <FaEdit
              className="w-4 h-4 cursor-pointer"
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
        ) : (
          <select
            className="border border-gray-400 text-xs px-2 py-2 rounded-sm"
            onChange={(e) => setAddress(JSON.parse(e.target.value))}
          >
            <option value="">Select Address</option>
            {authUser.address.map((addr, i) => (
              <option key={i} value={JSON.stringify(addr)}>
                {addr.name}, {addr.email}
              </option>
            ))}
          </select>
        )}

        <div
          onClick={() => setOpen(true)}
          className="flex items-center text-gray-600 gap-2 text-xs cursor-pointer"
        >
          <span>Add Address</span>
          <LuPlus className="w-5 h-5" />
        </div>
      </div>

      {/* TOTALS */}
      <div className="flex flex-col gap-2 py-5 border-b border-gray-300">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Subtotal:</span>
          <span>${cartTotals?.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Shipping:</span>
          <span>${cartTotals?.shippingFee}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between py-5">
        <span className="text-gray-600 text-sm">Total:</span>
        <span className="text-gray-600 text-sm">
          ${cartTotals?.total.toLocaleString()}
        </span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="text-white text-sm py-3 rounded-md bg-gray-700 hover:bg-gray-800"
      >
        Place Order
      </button>
    </div>
  );
};

export default CartTotals;
