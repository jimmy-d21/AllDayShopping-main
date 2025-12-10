import React, { useState } from "react";

const AddAddress = ({ setOpen, setAddress }) => {
  const [newAddress, setNewAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleInputAddress = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    setAddress(newAddress);
    setOpen(false);
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="min-h-screen fixed top-0 left-0 w-full flex items-center justify-center z-50 bg-white/30 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 min-w-sm"
      >
        <h1 className="text-3xl font-base text-gray-600">
          Add New <span className="font-semibold text-gray-800">Address</span>
        </h1>
        <div className="w-full flex flex-col gap-4">
          <input
            onChange={handleInputAddress}
            value={newAddress.name}
            name="name"
            type="text"
            placeholder="Enter your name"
            className="outline-none border border-gray-300 py-2.5 px-4 text-gray-600 text-sm font-base rounded-sm"
          />
          <input
            onChange={handleInputAddress}
            value={newAddress.email}
            name="email"
            type="email"
            placeholder="Email address"
            className="outline-none border border-gray-300 py-2.5 px-4 text-gray-600 text-sm font-base rounded-sm"
          />
          <input
            onChange={handleInputAddress}
            value={newAddress.street}
            name="street"
            type="text"
            placeholder="Street"
            className="outline-none border border-gray-300 py-2.5 px-4 text-gray-600 text-sm font-base rounded-sm"
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <input
            onChange={handleInputAddress}
            value={newAddress.city}
            name="city"
            type="text"
            placeholder="City"
            className="outline-none border border-gray-300 py-2.5 px-4 text-gray-600 text-sm font-base rounded-sm"
          />
          <input
            onChange={handleInputAddress}
            value={newAddress.state}
            name="state"
            type="text"
            placeholder="State"
            className="outline-none border border-gray-300 py-2.5 px-4 text-gray-600 text-sm font-base rounded-sm"
          />
          <input
            onChange={handleInputAddress}
            value={newAddress.zip}
            name="zip"
            type="number"
            placeholder="Zip code"
            className="outline-none border border-gray-300 py-2.5 px-4 text-gray-600 text-sm font-base rounded-sm"
          />
          <input
            onChange={handleInputAddress}
            value={newAddress.country}
            name="country"
            type="text"
            placeholder="Country"
            className="outline-none border border-gray-300 py-2.5 px-4 text-gray-600 text-sm font-base rounded-sm"
          />
        </div>
        <input
          onChange={handleInputAddress}
          value={newAddress.phone}
          name="phone"
          type="number"
          placeholder="Phone"
          className="outline-none border border-gray-300 py-2.5 px-4 text-gray-600 text-sm font-base rounded-sm"
        />
        <button
          onClick={handleSaveAddress}
          className="bg-gray-800 text-white text-sm font-semibold py-3 rounded-md cursor-pointer transition-all duration-300 hover:bg-gray-900"
        >
          SAVE ADDRESS
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
