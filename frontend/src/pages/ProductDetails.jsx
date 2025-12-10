import React, { useEffect, useState } from "react";
import { dummyAllProducts, dummyStore } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { calculateRatings } from "../utils/calculateRatings.js";
import { BiWorld } from "react-icons/bi";
import { FiCreditCard } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";
import ReviewCard from "../components/ReviewCard.jsx";
import { useContext } from "react";
import ProductContext from "../context/ProductContext.jsx";
import UserContext from "../context/userContext.jsx";
import CartContext from "../context/CartContext.jsx";
import toast from "react-hot-toast";

const ProductDetails = ({ setShowLogin }) => {
  const { authUser } = useContext(UserContext);
  const { fetchProductsDetails } = useContext(ProductContext);
  const { fetchAddCartItem } = useContext(CartContext);
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [state, setState] = useState("Description");

  const isDescription = state === "Description";

  const fetchProductsData = async () => {
    const data = await fetchProductsDetails(productId);
    setProductDetails(data);
  };

  const handleAddToCart = async () => {
    if (!authUser) {
      setShowLogin(true);
      return;
    }
    if (quantity < 1) {
      toast.error(`Please input quantity first`);
      return;
    }
    await fetchAddCartItem(productId, quantity);
    setQuantity(0);
  };

  useEffect(() => {
    fetchProductsData();
  }, [productId]);

  return (
    <div className="min-h-screen max-w-[1300px] mx-auto mb-40">
      <div className="pt-8 text-gray-600 text-sm">
        Home / Products / {productDetails?.category}
      </div>
      <div className="flex flex-col mt-5">
        <div className="flex gap-2">
          <div className="flex flex-col">
            <div className="w-25 h-25 p-3 flex items-center justify-center overflow-hidden bg-gray-100 rounded-md">
              <img
                src={productDetails?.image}
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="w-120 h-120 p-15 flex items-center justify-center overflow-hidden bg-gray-100 rounded-md mr-10">
            <img src={productDetails?.image} alt="" className="w-full h-full" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold">{productDetails?.name}</h1>
            <div className="flex items-center gap-3 my-3">
              <img
                className="w-20"
                src={`/rating-${calculateRatings(productDetails?.reviews)}.png`}
                alt=""
              />
              <span className="text-sm text-gray-600 font-medium">
                {productDetails?.reviews.length} Reviews
              </span>
            </div>
            <h3 className="text-2xl text-gray-800 mt-8 font-semibold">
              ${productDetails?.price.toLocaleString()}
            </h3>
            <p className="mt-8 mb-3 text-md font-semibold">Quantity :</p>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
                className="py-1 px-3 border border-gray-300 rounded-md cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:scale-105 active:scale-100 active:bg-gray-300"
              >
                -
              </button>
              <span className="mx-4 text-md">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="py-1 px-3 border border-gray-300 rounded-md cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:scale-105 active:scale-100 active:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`mt-8 mb-4 px-10 py-3 rounded-md text-white text-sm font-semibold ${
                quantity > 0 ? "bg-gray-800" : "bg-gray-700"
              } cursor-pointer transition-all duration-300 hover:bg-gray-900`}
            >
              Add to Cart
            </button>
            <hr className="text-gray-300" />
            <div className="flex flex-col gap-3 mt-8">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <BiWorld className="w-6 h-6" />
                <span>Free shipping worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <FiCreditCard className="w-6 h-6" />
                <span>100% Secured Payment</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <LuUser className="w-6 h-6" />
                <span>Trusted by top brands</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-20 max-w-180">
          <div className="w-full flex items-center border-b border-gray-300 ">
            <span
              onClick={() => setState("Description")}
              className={`text-sm  font-semibold cursor-pointer py-2 px-3 ${
                state === "Description"
                  ? "border-b text-gray-600 border-gray-600"
                  : "text-gray-400"
              }`}
            >
              Description
            </span>
            <span
              onClick={() => setState("Reviews")}
              className={`text-sm font-semibold cursor-pointer py-2 px-3 ${
                state === "Reviews"
                  ? "border-b text-gray-600 border-gray-600"
                  : "text-gray-400"
              }`}
            >
              Reviews
            </span>
          </div>
          {isDescription && (
            <h3 className="text-gray-600 text-sm">
              {productDetails?.description}
            </h3>
          )}
          {!isDescription && (
            <div className="my-5 flex flex-col gap-10">
              {productDetails?.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
          <div className="mt-10 flex items-center gap-2">
            <div className="h-12 w-13 overflow-hidden flex items-center justify-center rounded-full border border-gray-500">
              <img
                src={productDetails?.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <h3 className="text-gray-600 text-sm font-semibold">
                {productDetails?.store?.name}
              </h3>
              <span
                onClick={() => navigate(`/shop/${productDetails?.store?.name}`)}
                className="text-green-400 text-sm flex items-center gap-3 cursor-pointer"
              >
                view store <FaArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
