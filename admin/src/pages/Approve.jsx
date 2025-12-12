import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dummyAllPendingStores } from "../assets/assets";
import PendStoreCard from "../components/PendStoreCard";

const Approve = () => {
  const [allPendingStores, setAllPendingStores] = useState([]);

  const fecthAllStores = async () => {
    try {
      setAllPendingStores(dummyAllPendingStores);
    } catch (error) {}
  };

  useEffect(() => {
    fecthAllStores();
  }, []);

  return (
    <div className="flex-1 flex flex-col py-13 px-10">
      <div className="flex flex-col gap-5 max-w-5xl">
        <h1 className="text-gray-500 text-2xl font-semibold">
          Approve <span className="text-gray-800">Stores</span>
        </h1>
        <div className="w-full flex flex-col gap-5">
          {allPendingStores.map((store) => (
            <PendStoreCard key={store._id} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Approve;
