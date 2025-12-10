import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import getShuffledProducts from "../lib/utils/shuffledProducts.js";
import Store from "../models/store.model.js";
import Order from "../models/order.model.js";

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

export const updateActiveProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const sellerId = req.userId;

    // 1. Check if user exists and is seller
    const user = await User.findById(sellerId).select("role");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "seller") {
      return res.status(403).json({
        error: "Access denied. Only sellers can update product status.",
      });
    }

    // 2. Find product + check ownership in ONE query
    const product = await Product.findOne({
      _id: productId,
      owner: sellerId, // ← This is the correct way!
    });

    if (!product) {
      return res.status(404).json({
        error: "Product not found or you don't have permission to update it.",
      });
    }

    // 3. Toggle availability
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { isAvailable: !product.isAvailable },
      { new: true }
    );

    return res.status(200).json({
      message: "Product status updated successfully",
      product: updatedProduct,
      isAvailable: updatedProduct.isAvailable,
    });
  } catch (error) {
    console.error("Update product status error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};

export const getLatestProducts = async (req, res) => {
  try {
    let latestProducts = await Product.find({ isAvailable: true }).sort({
      createdAt: -1,
    });

    res.status(200).json(latestProducts);
  } catch (error) {
    console.error("Get Latest Products error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};

export const getBestSellingProducts = async (req, res) => {
  try {
    // Get top 10 best-selling products (available only)
    const bestSellingProducts = await Product.find({
      isAvailable: true,
      totalOrders: { $gt: 0 }, // Only products that have been ordered at least once
      isAvailable: true, // Only products that is available
    })
      .sort({ totalOrders: -1, createdAt: -1 }) // Highest orders first, then newest
      .limit(10); // Change limit as needed (e.g., 8, 12)

    return res.status(200).json(bestSellingProducts);
  } catch (error) {
    console.error("Get Best Selling Products error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let allProducts = await Product.find({ isAvailable: true }).sort({
      createdAt: -1,
    });
    allProducts = getShuffledProducts(allProducts);

    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Get All Products error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};

export const viewProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId)
      .populate("owner") // Populates user data
      .populate("store") // Populates store data
      .populate("reviews.user"); // Populates comment data

    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("View Product Details error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};

export const rateProduct = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { productId, orderId } = req.params;
    const userId = req.userId;

    if (!comment || !rating) {
      return res.status(400).json({ error: "Please provide your rates" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    let order = await Order.findById(orderId).populate("owner product");
    if (!order) {
      return res.status(400).json({ error: "Order not found" });
    }

    let product = await Product.findById(productId).populate("reviews.user");
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    if (product.owner.toString() === user._id.toString()) {
      return res.status(400).json({ error: "You can't rate this product" });
    }

    const newReview = {
      user: user._id,
      comment,
      rating,
      product: productId,
    };

    order.rate = rating;
    await order.save();

    product.reviews.push(newReview);
    await product.save();

    res.status(200).json({ message: "Rating Successfully", order });
  } catch (error) {
    console.error("Rate Products error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};
