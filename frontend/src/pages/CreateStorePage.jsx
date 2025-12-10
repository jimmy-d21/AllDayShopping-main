import React from "react";
import { useRef } from "react";
import { useState } from "react";

const CreateStorePage = () => {
  const [storeLogo, setStoreLogo] = useState(null);
  const storeLogoRef = useRef(null);

  const handleStoreLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setStoreLogo(reader.result);
    };

    reader.onerror = () => {
      console.error("Error reading file");
      alert("Error reading file. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen max-w-[1300px] mx-auto mb-40">
      <div className="flex flex-col gap-5 py-15 max-w-150">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-gray-500">
            Add Your <span className="text-gray-800 font-semibold">Store</span>
          </h1>
          <p className="text-gray-500 text-md font-medium">
            To become a seller on GoCart, submit your store details for review.
            Your store will be activated after admin verification.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 mt-10">
          <div className="flex flex-col">
            <h3 className="text-gray-500 text-md font-medium">Store Logo</h3>
            <label htmlFor="store-image">
              <img
                className={`${
                  storeLogo ? "w-20 h-20 my-2" : "w-40 h-30 -my-2"
                } cursor-pointer`}
                src={`${storeLogo ? storeLogo : "/upload_area.svg"}`}
              />
              <input
                type="file"
                id="store-image"
                hidden
                accept="image/*"
                ref={storeLogoRef}
                onChange={handleStoreLogo}
              />
            </label>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-500 text-md font-medium">Username</h3>
            <input
              type="text"
              placeholder="Enter your store username"
              className="outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md font-medium placeholder:text-md placeholder:font-medium placeholder:text-gray-400"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-500 text-md font-medium">Name</h3>
            <input
              type="text"
              placeholder="Enter your store name"
              className="outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md font-medium placeholder:text-md placeholder:font-medium placeholder:text-gray-400"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-500 text-md font-medium">Description</h3>
            <textarea
              type="text"
              placeholder="Enter your store name"
              className="resize-none h-40 outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md font-medium placeholder:text-md placeholder:font-medium placeholder:text-gray-400"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-500 text-md font-medium">Email</h3>
            <input
              type="email"
              placeholder="Enter your store email"
              className="outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md font-medium placeholder:text-md placeholder:font-medium placeholder:text-gray-400"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-500 text-md font-medium">
              Contact Number
            </h3>
            <input
              type="text"
              placeholder="Enter your store contact number"
              className="outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md font-medium placeholder:text-md placeholder:font-medium placeholder:text-gray-400"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-500 text-md font-medium">Address</h3>
            <textarea
              type="text"
              placeholder="Enter your store address"
              className="resize-none h-40 outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md font-medium placeholder:text-md placeholder:font-medium placeholder:text-gray-400"
            />
          </div>
        </div>
        <button className="text-white py-2.5 px-5 font-semibold bg-gray-800 w-40 rounded-md transition-all duration-300 hover:bg-gray-900 cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateStorePage;
