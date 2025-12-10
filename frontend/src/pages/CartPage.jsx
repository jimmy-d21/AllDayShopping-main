import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/CartCard";
import AddAddress from "../components/AddAddress";
import CartTotals from "../components/CartTotals";
import { useContext } from "react";
import CartContext from "../context/CartContext";

const CartPage = () => {
  const { allCarts, fetchAllCarts } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCarts();
  }, []);

  return (
    <div className="min-h-screen max-w-[1300px] mx-auto">
      {open && (
        <AddAddress
          setOpen={setOpen}
          address={address}
          setAddress={setAddress}
        />
      )}
      <div className="py-8">
        <h1 className="text-2xl font-semibold text-gray-800">My Cart</h1>
        <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
          items iy your cart{" "}
          <span
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-green-500 cursor-pointer"
          >
            Add more <FaArrowRight className="w-4 h-4" />{" "}
          </span>
        </p>
      </div>

      {allCarts?.length < 1 && (
        <h1 className="h-[600px] flex items-center justify-center text-gray-400 font-bold text-4xl">
          Your cart is empty
        </h1>
      )}

      {/* Cart List */}
      {allCarts?.length > 0 && (
        <div className="flex gap-15">
          <div className="flex-1">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-md text-gray-800 font-semibold">Products</h3>
              <div className="flex items-center gap-23">
                <h3 className="text-md text-gray-800 font-semibold">
                  Quantity
                </h3>
                <h3 className="text-md text-gray-800 font-semibold">
                  Total Price
                </h3>
                <h3 className="text-md text-gray-800 font-semibold">Remove</h3>
              </div>
            </div>
            <div className="flex flex-col gap-8 my-3">
              {allCarts.map((cart) => (
                <CartCard key={cart._id} cart={cart} />
              ))}
            </div>
          </div>
          <CartTotals
            address={address}
            setAddress={setAddress}
            setOpen={setOpen}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
