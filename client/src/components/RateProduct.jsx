import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import OrderContext from "../context/OrderContext";

const RateProduct = ({ order, setOpen }) => {
  const { fetchRatingProduct } = useContext(ProductContext);
  const { setAllOrders } = useContext(OrderContext);
  const [ratings, setRatings] = useState(0);
  const [text, setText] = useState("");

  const handleProductRatings = async () => {
    const productId = order?.product?._id;
    const orderId = order?._id;
    const updatedOrder = await fetchRatingProduct(
      productId,
      orderId,
      text,
      ratings
    );
    setAllOrders((prevOrders) =>
      prevOrders.map((order) => (order._id === orderId ? updatedOrder : order))
    );
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 min-h-screen w-full flex items-center justify-center bg-gray-600/20 backdrop-blur-none z-50">
      <div className="flex flex-col min-w-sm pb-8 pt-4 px-7 bg-white rounded-md shadow-md">
        <div className="w-full flex items-center justify-end">
          <IoMdClose
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-gray-500 cursor-pointer"
          />
        </div>
        <h1 className="text-xl text-gray-600 font-medium mb-5">Rate Product</h1>
        <div className="w-full flex items-center justify-center mb-5 gap-1">
          {[1, 2, 3, 4, 5].map((rate) => (
            <FaStar
              onClick={() => setRatings(rate)}
              key={rate}
              className={`w-7 h-7 cursor-pointer ${
                rate <= ratings ? "text-green-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Write your review (optional)"
          className="p-2 outline-none resize-none border border-gray-400 rounded-md w-full text-sm mb-5 text-gray-600 h-30 placeholder:text-sm"
        ></textarea>
        <button
          onClick={handleProductRatings}
          className="py-2 px-3 text-white font-medium text-sm bg-green-600 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-700"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RateProduct;
