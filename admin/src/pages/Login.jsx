import React, { useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import toast from "react-hot-toast";

const Login = () => {
  const { fetchLoginAccount } = useAdminContext();

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    if (!inputs.username || !inputs.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    await fetchLoginAccount(inputs);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="w-full max-w-md rounded-lg flex flex-col gap-4 bg-white py-8 px-8 mx-4 shadow-xl">
        <h1 className="text-green-600 font-semibold text-2xl">
          All Day <span className="text-gray-700">Shop</span>
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600 font-medium">
              Username
            </label>
            <input
              onChange={handleInputs}
              value={inputs.username}
              name="username"
              type="text"
              placeholder="Enter username"
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-sm"
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600 font-medium">
              Password
            </label>
            <input
              onChange={handleInputs}
              value={inputs.password}
              name="password"
              type="password"
              placeholder="Enter password"
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-sm"
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleLogin}
          className="bg-green-500 py-3 text-white font-medium rounded-lg cursor-pointer hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
