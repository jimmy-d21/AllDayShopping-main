import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const addOrder = async (req, res) => {
  try {
    const { paymentMethod, address } = req.body;
    const userId = req.userId;

    const carts = await Cart.find({ owner: userId }).populate("product");

    if (carts.length > 0) {
      for (let i = 0; i < carts.length; i++) {
        const newOrder = new Order({
          owner: userId,
          sendTo: carts[i].storeOwner,
          product: carts[i].product._id,
          quantity: carts[i].quantity,
          total: carts[i].quantity * carts[i].product.price,
          price: carts[i].product.price,
          address,
          paymentMethod,
        });
        await Cart.deleteMany({ owner: userId }); // delete all cart
        let product = await Product.findById(carts[i].product);
        product.totalOrders += carts[i].quantity; // add the quantity to increase the totalOrder
        await product.save(); // save to database
        await newOrder.save(); // save to data base
      }
    } else {
      return res.status(404).json({ error: "You dont have cart items" });
    }

    res.status(200).json({ carts, message: "Order Successfully." });
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
