import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  addOrder,
  getAllUserOrder,
  updateStatusOrder,
} from "../controllers/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.post("/add-order", authUser, addOrder);
orderRoutes.get("/get-all-user-orders", authUser, getAllUserOrder);
orderRoutes.put("/update-status-order/:orderId", authUser, updateStatusOrder);

export default orderRoutes;
