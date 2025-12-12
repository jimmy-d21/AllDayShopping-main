import React from "react";
import { useState } from "react";
import { allDummyStores, dummyStore } from "../assets/assets";
import { useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

const StorePage = () => {
  const { name } = useParams();
  const [storeData, setStoreDate] = useState(null);

  const fetchStore = async () => {
    setStoreDate(dummyStore);
  };

  useEffect(() => {
    fetchStore();
  }, []);

  console.log(storeData);

  return (
    <div className="min-h-screen max-w-[1300px] mx-auto">
      <div className="w-full flex flex-col gap-10 py-10">
        <div className="flex gap-8 p-8 rounded-xl bg-gray-100">
          <div className="w-40 h-40 py-3 px-2 flex items-center justify-center overflow-hidden bg-white rounded-md">
            <img
              src={storeData?.store?.storeLogo}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col items-start">
            <h1 className="text-gray-900 font-semibold text-3xl">
              {storeData?.store?.name}
            </h1>
            <h3 className="my-4 text-sm text-gray-600 font-medium w-200">
              {storeData?.store?.description}
            </h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <IoLocationOutline className="w-5 h-5" />
                <span>{storeData?.store?.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                <MdOutlineEmail className="w-5 h-5 " />
                <span>{storeData?.store?.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 my-5">
          <h1 className="text-2xl font-semibold text-gray-800">
            Shop Products
          </h1>
          <div className="w-full grid grid-cols-4 gap-10">
            {storeData?.products.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
