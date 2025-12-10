import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import UserContext from "../context/userContext";

const Login = ({ setShowLogin }) => {
  const { fetchCreateAccount, fetchLoginAccount } = useContext(UserContext);

  const [state, setState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (state === "SignUp") {
        const result = await fetchCreateAccount(inputs);
        if (result) {
          setShowLogin(false);
        }
      } else {
        const result = await fetchLoginAccount(inputs);
        if (result) {
          setShowLogin(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full min-h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="w-full max-w-md rounded-lg flex flex-col gap-4 bg-white py-8 px-8 mx-4 shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-green-600 font-semibold text-2xl">
            All Day <span className="text-gray-700">Shop</span>
          </h1>
          <button
            onClick={() => setShowLogin(false)}
            className="text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            ×
          </button>
        </div>

        <h1 className="text-center text-xl font-semibold text-gray-800">
          {state}
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
              placeholder="Enter your username"
              className="w-full py-2.5 px-4 border border-gray-300 outline-none text-sm text-gray-600 rounded-lg focus:border-green-500 transition-colors"
              onKeyPress={handleKeyPress}
            />
          </div>

          {state === "SignUp" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 font-medium">Email</label>
              <input
                onChange={handleInputs}
                value={inputs.email}
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full py-2.5 px-4 border border-gray-300 outline-none text-sm text-gray-600 rounded-lg focus:border-green-500 transition-colors"
                onKeyPress={handleKeyPress}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600 font-medium">
              Password
            </label>
            <input
              onChange={handleInputs}
              value={inputs.password}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full py-2.5 px-4 border border-gray-300 outline-none text-sm text-gray-600 rounded-lg focus:border-green-500 transition-colors"
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        {state === "Login" ? (
          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("SignUp")}
              className="text-green-600 font-medium cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-green-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-green-500 py-3 text-white text-md font-medium rounded-lg cursor-pointer hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading
            ? "Please wait..."
            : state === "Login"
            ? "Login"
            : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default Login;
