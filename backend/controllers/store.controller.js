import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";
import Store from "../models/store.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const createStore = async (req, res) => {
  try {
    const { username, name, description, email, phone, address, storeLogo } =
      req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!username || !name || !description || !email || !phone || !address) {
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

    // https://res.cloudinary.com/dytbrbgc3/image/upload/v1763276405/jp8gr6ghdingthchwzya.png
    let storeLogoUrl = "";
    if (storeLogo) {
      const response = await cloudinary.uploader.upload(storeLogo);
      storeLogoUrl = response.secure_url;
    }

    const newStore = new Store({
      owner: user._id,
      username: username,
      name: name,
      description,
      email,
      phone,
      address,
      storeLogo: storeLogoUrl,
    });

    await newStore.save(); // save to database
    res.status(201).json({ newStore, message: "Request Successfully" });
  } catch (error) {
    console.error("Create Store Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};

export const viewStore = async (req, res) => {
  try {
    const name = req.params.name;

    const store = await Store.findOne({ name });
    if (!store) {
      return res.status(400).json({ error: "Store not found." });
    }

    const products = await Product.find({ owner: store.owner });
    res.status(200).json({ store, products });
  } catch (error) {
    console.error("Create Store Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};

export const storeDashboard = async (req, res) => {
  try {
    const userId = req.userId;
    const productReviews = await Product.find({ owner: userId }).select(
      "reviews"
    );
    let allProductReviews = [];
    productReviews.map((p) => {
      allProductReviews = allProductReviews.concat(p.reviews);
    });
    const totalProducts = (await Product.find({ owner: userId })).length;
    const totalRatings = allProductReviews.length;
    const reviews = allProductReviews;
    const orders = await Order.find({ sendTo: userId });
    const totalOrders = orders.reduce((sum, item) => sum + item.quantity, 0);
    const totalEarnings = orders.reduce((sum, item) => sum + item.total, 0);

    // 3. Populate the 'user' field in each review
    await User.populate(allProductReviews, {
      path: "user",
    });

    // 3. Populate the 'product' field in each review
    await Product.populate(allProductReviews, {
      path: "product",
    });

    // Todo:

    res.status(200).json({
      totalProducts,
      reviews,
      totalRatings,
      totalOrders,
      totalEarnings,
    });
  } catch (error) {
    console.error("Store Dashboard Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};

export const getAllStoreOrdes = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ sendTo: userId })
      .sort({ createdAt: -1 })
      .populate("owner")
      .populate("product");
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get All Store Orders Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};

export const addProduct = async (req, res) => {
  const userId = req.userId;
  const { name, description, price, category, image } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isSeller = user.role === "seller";
    if (!isSeller) {
      return res
        .status(400)
        .json({ error: "Please request for admin to become a seller" });
    }

    if (!name || !image || !description || !price || !category) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    // Find the store owned by this user
    const store = await Store.findOne({ owner: user._id });
    if (!store) {
      return res
        .status(400)
        .json({ error: "Store not found. Please create a store first." });
    }

    let imageUrl = "";
    if (image) {
      const response = await cloudinary.uploader.upload(image);
      imageUrl = response.secure_url;
    }

    const newProduct = new Product({
      owner: user._id, // This should be the store ID, not user ID
      image: imageUrl,
      name,
      description,
      price,
      category,
      store: store._id, // Assign the store ID here
    });

    await newProduct.save();
    res
      .status(201)
      .json({ newProduct, message: "Created Product Successfully" });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};

export const getStoreUser = async (req, res) => {
  try {
    const userId = req.userId;
    const store = await Store.findOne({ owner: userId });

    if (!store) {
      return res.json({ error: "Store not found" });
    }
    res.json(store);
  } catch (error) {
    console.error("Get All Store Orders Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};

export const getAllStoreProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const products = await Product.find({ owner: userId });
    res.json(products);
  } catch (error) {
    console.error("Get All Store Orders Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};
