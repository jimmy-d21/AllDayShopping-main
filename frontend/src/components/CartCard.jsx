import React from "react";
import { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const CartCard = ({ cart }) => {
  const { fetchRemoveCartItem, fetchUpdateQuantityCartItem } =
    useContext(CartContext);

  const [cartQuantity, setCartQuantity] = useState(cart?.quantity);

  const navigate = useNavigate();

  const handleRemoveCart = async () => {
    await fetchRemoveCartItem(cart?._id);
  };

  useEffect(() => {
    fetchUpdateQuantityCartItem(cart?._id, cartQuantity);
  }, [cartQuantity]);

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex gap-3">
        <div
          onClick={() => navigate(`/product/${cart?.product?._id}`)}
          className="h-20 w-20 flex items-center justify-center bg-gray-100 rounded-md"
        >
          <img
            src={cart?.product?.image}
            alt=""
            className="w-15 h-15 cursor-pointer transition-all duration-300 hover:scale-110"
          />
        </div>
        <div className="flex flex-col py-1 gap-0.5">
          <h3 className="text-md text-gray-600 font-medium">
            {cart?.product?.name}
          </h3>
          <h3 className="text-xs text-gray-600">{cart?.product?.category}</h3>
          <p className="text-md font-medium text-gray-600">
            ${cart?.product?.price.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-23">
        <div className="flex items-center gap-5 border border-gray-300 rounded-sm py-2 px-4">
          <button
            onClick={() => setCartQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            className="cursor-pointer"
          >
            -
          </button>
          <span>{cartQuantity}</span>
          <button
            onClick={() => setCartQuantity((prev) => prev + 1)}
            className="cursor-pointer"
          >
            +
          </button>
        </div>
        <div className="text-md font-medium text-gray-600 mr-8">
          ${cart?.totalPrice.toLocaleString()}
        </div>
        <div
          onClick={handleRemoveCart}
          className="h-10 w-10 mr-3 flex items-center justify-center rounded-full cursor-pointer  transition-all duration-300 hover:bg-red-100"
        >
          <FaRegTrashAlt className="w-4 h-4 text-red-400" />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
