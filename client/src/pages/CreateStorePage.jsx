import React, { useContext, useRef, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import UserContext from "../context/userContext";

const CreateStorePage = () => {
  const { fetchCreateStore } = useContext(StoreContext);
  const { fetchAuthUser } = useContext(UserContext);

  const [storeData, setStoreData] = useState({
    username: "",
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    storeLogo: null,
  });

  const storeLogoRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle store logo
  const handleStoreLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setStoreData((prev) => ({
        ...prev,
        storeLogo: reader.result,
      }));
    };
    reader.onerror = () => {
      alert("Error reading file. Please try again.");
      console.error("FileReader error");
    };
    reader.readAsDataURL(file);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Store Data:", storeData);

    await fetchCreateStore(storeData);
    await fetchAuthUser();
  };

  return (
    <div className="min-h-screen max-w-[1300px] mx-auto mb-40 p-5">
      <h1 className="text-3xl text-gray-500 mb-5">
        Add Your <span className="text-gray-800 font-semibold">Store</span>
      </h1>
      <p className="text-gray-500 text-md mb-10">
        To become a seller on GoCart, submit your store details for review. Your
        store will be activated after admin verification.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
        {/* Store Logo */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-500 text-md font-medium">Store Logo</h3>
          <label htmlFor="store-image" className="cursor-pointer">
            <img
              src={storeData.storeLogo || "/upload_area.svg"}
              alt="store logo"
              className={`${
                storeData.storeLogo ? "w-20 h-20 my-2" : "w-40 h-30 -my-2"
              } cursor-pointer object-cover border border-gray-300 rounded-md`}
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

        {/* Username */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-500 text-md font-medium">Username</h3>
          <input
            type="text"
            name="username"
            value={storeData.username}
            onChange={handleChange}
            placeholder="Enter your store username"
            className="outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-500 text-md font-medium">Name</h3>
          <input
            type="text"
            name="name"
            value={storeData.name}
            onChange={handleChange}
            placeholder="Enter your store name"
            className="outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-500 text-md font-medium">Description</h3>
          <textarea
            name="description"
            value={storeData.description}
            onChange={handleChange}
            placeholder="Enter your store description"
            className="resize-none h-32 outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-500 text-md font-medium">Email</h3>
          <input
            type="email"
            name="email"
            value={storeData.email}
            onChange={handleChange}
            placeholder="Enter your store email"
            className="outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-500 text-md font-medium">Contact Number</h3>
          <input
            type="text"
            name="phone"
            value={storeData.phone}
            onChange={handleChange}
            placeholder="Enter your store contact number"
            className="outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-500 text-md font-medium">Address</h3>
          <textarea
            name="address"
            value={storeData.address}
            onChange={handleChange}
            placeholder="Enter your store address"
            className="resize-none h-32 outline-none py-3 px-3 rounded-md border border-gray-300 text-gray-500 text-md"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="text-white py-3 px-5 font-semibold bg-gray-800 rounded-md hover:bg-gray-900 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateStorePage;
