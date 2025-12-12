import React, { useContext, useState } from "react";
import { FaRegTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartCard = ({ cart }) => {
  const { fetchRemoveCartItem, fetchUpdateQuantityCartItem, currency } =
    useContext(CartContext);

  const [cartQuantity, setCartQuantity] = useState(cart?.quantity);
  const navigate = useNavigate();

  const handleQuantityChange = async (newQty) => {
    setCartQuantity(newQty);
    await fetchUpdateQuantityCartItem(cart?._id, newQty);
  };

  return (
    <tr className="border-b border-gray-200">
      {/* Product */}
      <td className="py-6 px-4">
        <div className="flex items-center gap-4">
          <div
            onClick={() => navigate(`/product/${cart?.product?._id}`)}
            className="h-20 w-20 flex items-center justify-center bg-gray-100 rounded-md cursor-pointer group relative overflow-hidden"
          >
            <img
              src={cart?.product?.image}
              alt=""
              className="w-15 h-15 group-hover:scale-110 transition duration-300"
            />
          </div>

          <div className="flex flex-col py-1 gap-0.5">
            <h3
              onClick={() => navigate(`/product/${cart?.product?._id}`)}
              className="text-md text-gray-800 font-semibold hover:text-blue-600 cursor-pointer"
            >
              {cart?.product?.name}
            </h3>
            <h3 className="text-xs text-gray-600">{cart?.product?.category}</h3>
            <p className="text-sm font-medium text-gray-600">
              {currency}
              {cart?.product?.price.toLocaleString()}
            </p>
          </div>
        </div>
      </td>

      {/* Quantity */}
      <td className="py-6 px-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg py-2 px-4">
            <button
              onClick={() =>
                handleQuantityChange(cartQuantity > 1 ? cartQuantity - 1 : 1)
              }
              disabled={cartQuantity <= 1}
              className={`text-gray-700 ${
                cartQuantity <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:text-blue-600"
              }`}
            >
              <FaMinus className="w-3 h-3" />
            </button>

            <span className="w-8 text-center font-medium text-gray-900">
              {cartQuantity}
            </span>

            <button
              onClick={() => handleQuantityChange(cartQuantity + 1)}
              className="text-gray-700 cursor-pointer hover:text-blue-600"
            >
              <FaPlus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </td>

      {/* Total Price */}
      <td className="py-6 px-4">
        <div className="text-lg font-semibold text-gray-900 text-center">
          {currency}
          {cart?.totalPrice.toLocaleString()}
        </div>
      </td>

      {/* Remove */}
      <td className="py-6 px-4">
        <div className="flex justify-center">
          <div
            onClick={() => fetchRemoveCartItem(cart?._id)}
            className="h-12 w-12 flex items-center justify-center rounded-full cursor-pointer hover:bg-red-50 transition duration-300"
          >
            <FaRegTrashAlt className="w-5 h-5 text-red-500 hover:text-red-700" />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CartCard;
