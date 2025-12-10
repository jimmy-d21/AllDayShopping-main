import express from "express";
import {
  addNewAddress,
  createAccount,
  getAuthUser,
  login,
  logout,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";

const userRoutes = express.Router();

userRoutes.post("/create-account", createAccount);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/authUser", authUser, getAuthUser);
userRoutes.put("/add-address", authUser, addNewAddress);

export default userRoutes;
