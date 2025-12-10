import React, { useState } from "react";

const AddProducts = () => {
  const [image, setImage] = useState(null);

  const handleProductImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setImage(result);
    };

    reader.readAsDataURL(file);
  };

  const handleAddProduct = async () => {
    alert("Add Product");
  };

  return (
    <div className="max-h-screen h-full flex-1 p-15 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-medium text-gray-500 mb-8">
          Add New <span className="text-gray-800">Products</span>
        </h1>

        <div className="flex flex-col gap-5">
          <h1 className="text-md font-medium text-gray-500">Product Images</h1>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor={`product-image`}>
              <img
                className={`${
                  image ? "w-25 h-25 my-2" : "w-40 h-30 -mt-6"
                } cursor-pointer`}
                src={image || "/upload_area.svg"}
              />
              <input
                type="file"
                id={`product-image`}
                hidden
                accept="image/*"
                onChange={handleProductImage}
              />
            </label>
          </div>
        </div>
        <div className="max-w-md flex flex-col gap-5 mb-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-md font-medium text-gray-500">Name</h1>
            <input
              type="text"
              placeholder="Enter product name"
              className="text-md text-gray-500 font-medium py-3 px-4 outline-none rounded-sm border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-md font-medium text-gray-500">Description</h1>
            <textarea
              type="text"
              placeholder="Enter product description"
              className="resize-none min-h-40 text-md text-gray-500 font-medium py-3 px-4 outline-none rounded-sm border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-md font-medium text-gray-500">Price ($)</h1>
            <input
              type="number"
              placeholder="0"
              className="text-md text-gray-500 font-medium py-3 px-4 outline-none rounded-sm border border-gray-300"
            />
          </div>
        </div>
        <button
          onClick={handleAddProduct}
          className="text-white font-medium text-md bg-gray-800 py-3 px-7 rounded-md transition-all duration-300 hover:bg-gray-900 cursor-pointer"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
