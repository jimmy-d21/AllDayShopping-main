import React from "react";
import { useEffect } from "react";
import PendStoreCard from "../components/PendStoreCard";
import { useAdminContext } from "../context/AdminContext";

const Approve = () => {
  const { allPendingStores, fecthAllPendingStores } = useAdminContext();

  useEffect(() => {
    fecthAllPendingStores();
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
