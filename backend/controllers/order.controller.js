import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const addOrder = async (req, res) => {
  try {
    const { paymentMethod, address } = req.body;
    const userId = req.userId;

    // Validate address
    if (
      !address?.name ||
      !address?.email ||
      !address?.street ||
      !address?.city ||
      !address?.state ||
      !address?.zip ||
      !address?.country ||
      !address?.phone
    ) {
      return res.status(400).json({ error: "Complete address is required" });
    }

    // Get all user's carts
    const carts = await Cart.find({ owner: userId }).populate("product");

    if (!carts || carts.length === 0) {
      return res
        .status(404)
        .json({ error: "You don't have items in your cart" });
    }

    // Create orders for each cart item
    for (const cart of carts) {
      const newOrder = new Order({
        owner: userId,
        sendTo: cart.storeOwner,
        product: cart.product._id,
        quantity: cart.quantity,
        price: cart.product.price,
        total: cart.quantity * cart.product.price,
        address,
        paymentMethod,
      });

      // Update product total orders
      const product = await Product.findById(cart.product._id);
      product.totalOrders += cart.quantity;
      await product.save();

      await newOrder.save();
    }

    // Clear cart AFTER creating orders
    await Cart.deleteMany({ owner: userId });

    res.status(200).json({
      message: "Order Successfully placed.",
    });
  } catch (error) {
    console.error("Add Order error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};

export const getAllUserOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ owner: userId }).populate("product");

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get All Orders error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};

export const updateStatusOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    await order.save();
    res
      .status(200)
      .json({ order, message: "Order status update successfully" });
  } catch (error) {
    console.error("Update Status Orders error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};
