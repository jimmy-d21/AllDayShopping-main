import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  const { allProducts, fetchAllProducts } = useContext(ProductContext);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div className="min-h-screen max-w-[1300px] mx-auto flex flex-col pt-10 pb-40">
      <h1 className="text-2xl font-medium text-gray-600">
        {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
      </h1>

      <div className="w-full grid grid-cols-4 gap-10 mt-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-4">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
