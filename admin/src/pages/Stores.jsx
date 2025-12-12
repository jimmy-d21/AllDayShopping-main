import React from "react";
import { useState } from "react";
import { dummyAllStores } from "../assets/assets";
import { useEffect } from "react";
import StoreCard from "../components/StoreCard";

const Stores = () => {
  const [allStores, setAllStores] = useState([]);

  const fecthAllStores = async () => {
    try {
      setAllStores(dummyAllStores);
    } catch (error) {}
  };

  useEffect(() => {
    fecthAllStores();
  }, []);

  return (
    <div className="flex-1 flex flex-col py-13 px-10">
      <div className="flex flex-col gap-5 max-w-5xl">
        <h1 className="text-gray-500 text-2xl font-semibold">
          Live <span className="text-gray-800">Stores</span>
        </h1>
        <div className="w-full flex flex-col gap-5">
          {allStores.map((store) => (
            <StoreCard key={store._id} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stores;
