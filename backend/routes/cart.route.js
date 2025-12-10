import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  addCart,
  getAllCartItems,
  getCartTotal,
  removeFromCart,
  updateQuantityCart,
} from "../controllers/cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.post("/add-cart/:productId", authUser, addCart);
cartRoutes.put("/update-cart-quantity/:cartId", authUser, updateQuantityCart);
cartRoutes.delete("/remove-cart/:cartId", authUser, removeFromCart);
cartRoutes.get("/all-cart-item", authUser, getAllCartItems);
cartRoutes.get("/cart-total", authUser, getCartTotal);

export default cartRoutes;
