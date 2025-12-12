import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { formatDateShort } from "../utils/formatDateShort";
import { useAdminContext } from "../context/AdminContext";

const PendStoreCard = ({ store }) => {
  const { fetchApproveStore } = useAdminContext();
  return (
    <div className="w-full border-gray-300 border rounded-md p-5 shadow flex flex-col text-left gap-3">
      <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden">
        <img
          src={store?.storeLogo || "/vite.svg"}
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="flex items-center gap-3">
        <h1 className="text-gray-800 text-xl font-semibold">{store?.name}</h1>
        <span className="text-gray-600 font-medium">@{store?.username}</span>
        <span className="py-1 px-4 rounded-full text-yellow-800 bg-yellow-200 text-sm font-semibold">
          {store?.requestStatus}
        </span>
      </div>
      <p className="text-gray-600 text-sm font-medium my-2">
        {store?.description}
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <HiOutlineLocationMarker className="w-5 h-5" />
          <span>{store?.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <IoCallOutline className="w-5 h-5" />
          <span>{store?.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <MdOutlineMail className="w-5 h-5" />
          <span>{store?.email}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 text-sm text-gray-800 font-medium">
        <p>Applied on {formatDateShort(store?.createdAt)} by</p>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
              <img
                src={store?.storeLogo || "/vite.svg"}
                alt=""
                className="w-full h-full"
              />
            </div>
            <h3 className="text-gray-800 font-semibold">{store?.name}</h3>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchApproveStore(store._id)}
              className="py-2 px-5 text-white text-sm bg-green-600 rounded-sm cursor-pointer transition-all duration-300 hover:bg-green-700"
            >
              Approve
            </button>
            <button className="py-2 px-5 text-white text-sm bg-gray-600 rounded-sm cursor-pointer transition-all duration-300 hover:bg-gray-700">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendStoreCard;
