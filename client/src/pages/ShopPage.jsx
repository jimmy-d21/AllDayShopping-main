import React from "react";
import { dummyAllProducts } from "../assets/assets.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductContext from "../context/ProductContext.jsx";
import { useContext } from "react";
import { useEffect } from "react";

const ShopPage = () => {
  const { allProducts, fetchAllProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="min-h-screen max-w-[1300px] mx-auto flex flex-col pt-10 pb-40">
      <h1 className="text-2xl font-medium text-gray-600">
        All <span className="text-gray-950">Products</span>
      </h1>
      <div className="w-full grid grid-cols-4 gap-10 mt-10">
        {allProducts.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
