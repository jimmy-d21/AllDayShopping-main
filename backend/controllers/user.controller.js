import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../lib/generateTokenAndSetCookies.js";

export const createAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please fill out the form" });
    }

    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    const isValidEmail = email.endsWith("@gmail.com");
    if (!isValidEmail) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ error: "Email is already taken." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    await newUser.save();

    generateTokenAndSetCookies(newUser._id, res);

    return res.status(201).json({
      newUser,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.error("CreateAccount Error:", error);
    return res.status(500).json({ error: "Server error. Try again later." });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Please fill out the form" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username and password" });
    }

    const isAdmin = user.role === "admin";

    if (isAdmin) {
      return res.status(400).json({ error: "Invalid username and password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username and password" });
    }

    if (user) {
      generateTokenAndSetCookies(user._id, res);
      res.status(200).json({ user, message: "Login Successfully" });
    } else {
      res
        .status(400)
        .json({ error: "Failed to Login Account! Please login again." });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    console.log("Logout Successfully");
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

export const getAuthUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "Invalid username and password" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get AuthUser Error:", error.message);
  }
};

export const addNewAddress = async (req, res) => {
  const { name, email, street, city, state, zip, country, phone } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (
      !name ||
      !email ||
      !street ||
      !city ||
      !state ||
      !zip ||
      !country ||
      !phone
    ) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    const emailLength = email.length;
    const isValidEmail =
      email.slice(emailLength - 10, emailLength) === "@gmail.com";

    if (!isValidEmail) {
      return res
        .status(400)
        .json({ error: "Invalid email please check your email." });
    }

    // Add address
    user.address.push({
      name: name.trim(),
      email: email.trim(),
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      country: country.trim(),
      phone: phone.trim(),
    });

    await user.save();

    return res.status(200).json({
      message: "Address saved successfully.",
      user,
    });
  } catch (error) {
    console.error("Add new address Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};
