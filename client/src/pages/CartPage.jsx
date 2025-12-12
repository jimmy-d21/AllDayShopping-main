import React, { useEffect, useState } from "react";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/CartCard";
import AddAddress from "../components/AddAddress";
import CartTotals from "../components/CartTotals";
import { useContext } from "react";
import CartContext from "../context/CartContext";

const CartPage = () => {
  const { allCarts, fetchAllCarts, currency } = useContext(CartContext);
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
    <div className="min-h-screen max-w-[1300px] mx-auto px-4">
      {open && (
        <AddAddress
          setOpen={setOpen}
          address={address}
          setAddress={setAddress}
        />
      )}
      <div className="py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-800">My Cart</h1>
          </div>
          <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
            {allCarts?.length || 0} items in your cart{" "}
            <span
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
            >
              Add more <FaArrowRight className="w-4 h-4" />{" "}
            </span>
          </p>
        </div>
      </div>

      {allCarts?.length < 1 && (
        <div className="h-[500px] flex flex-col items-center justify-center">
          <FaShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-400 mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-6">Add some items to get started</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      )}

      {/* Cart Table Layout */}
      {allCarts?.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Table */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Product
                      </th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                        Quantity
                      </th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                        Total Price
                      </th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCarts.map((cart) => (
                      <CartCard key={cart._id} cart={cart} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards (Fallback) */}
              <div className="md:hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Cart Items ({allCarts.length})
                  </h3>
                </div>
                {allCarts.map((cart) => (
                  <div key={cart._id} className="p-4 border-b border-gray-200">
                    {/* You can reuse the old CartCard component for mobile if needed */}
                    <div className="w-full">
                      <div className="flex gap-3 mb-4">
                        <div
                          onClick={() =>
                            navigate(`/product/${cart?.product?._id}`)
                          }
                          className="h-20 w-20 flex items-center justify-center bg-gray-100 rounded-md"
                        >
                          <img
                            src={cart?.product?.image}
                            alt=""
                            className="w-15 h-15 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-md text-gray-800 font-semibold">
                            {cart?.product?.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {currency}
                            {cart?.product?.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5 border border-gray-300 rounded-sm py-2 px-4">
                          <button
                            onClick={() =>
                              fetchUpdateQuantityCartItem(
                                cart._id,
                                cart.quantity > 1 ? cart.quantity - 1 : 1
                              )
                            }
                            className="cursor-pointer"
                          >
                            -
                          </button>
                          <span>{cart.quantity}</span>
                          <button
                            onClick={() =>
                              fetchUpdateQuantityCartItem(
                                cart._id,
                                cart.quantity + 1
                              )
                            }
                            className="cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {currency}
                          {cart.totalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Totals Sidebar */}
          <div className="lg:w-96">
            <CartTotals
              address={address}
              setAddress={setAddress}
              setOpen={setOpen}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
