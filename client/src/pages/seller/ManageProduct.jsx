import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const ManageProduct = () => {
  const {
    fetchAllStoreProducts,
    storeProducts,
    fetchUpdateActiveProduct,
    currency,
  } = useContext(StoreContext);

  const handleToggleProduct = async (productId) => {
    await fetchUpdateActiveProduct(productId);
  };

  useEffect(() => {
    fetchAllStoreProducts();
  }, []);

  return (
    <div className="min-h-screen flex-1 p-15 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      <div className="max-w-4xl flex flex-col gap-5">
        <h1 className="text-2xl font-medium text-gray-500">
          Manage <span className="text-gray-800">Products</span>
        </h1>
        <div className="w-full rounded-md overflow-hidden">
          <table className="min-w-full border border-gray-300 border-collapse">
            <thead className="bg-gray-100 text-left text-sm text-gray-600 font-medium border-b border-gray-300">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
              {storeProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className="px-4 py-3 max-w-[300px] truncate">
                    {product.description}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {currency}
                    {product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      onClick={() => handleToggleProduct(product._id)}
                      className={`w-12 py-1 px-1 rounded-full flex items-center transition-all duration-300 cursor-pointer ${
                        product.isAvailable
                          ? "bg-green-600 justify-end"
                          : "bg-gray-300 justify-start"
                      }`}
                    >
                      <div className="h-3.5 w-3.5 bg-white rounded-full"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
