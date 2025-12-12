import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { formatDateShort } from "../utils/formatDateShort";

const StoreCard = ({ store }) => {
  return (
    <div className="w-full border-gray-500 rounded p-5 shadow flex flex-col text-left gap-3">
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
        <span className="py-1 px-4 rounded-full text-green-800 bg-green-200 text-sm font-medium">
          {store?.requestStatus}d
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
          <div className="flex items-center gap-3">
            <span
              className={`font-medium text-md ${
                store?.isActive ? "text-green-600" : "text-gray-600"
              } `}
            >
              {store?.isActive ? "Active" : "InActive"}
            </span>
            <div
              className={`w-12 py-1 px-1 rounded-full flex items-center transition-all duration-300 cursor-pointer ${
                store.isActive
                  ? "bg-green-600 justify-end"
                  : "bg-gray-300 justify-start"
              }`}
            >
              <div className="h-3.5 w-3.5 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
