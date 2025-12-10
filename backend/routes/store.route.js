import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  createStore,
  getAllStoreOrdes,
  getAllStoreProducts,
  getStoreUser,
  storeDashboard,
  viewStore,
} from "../controllers/store.controller.js";

const storeRoutes = express.Router();

storeRoutes.post("/create-store", authUser, createStore);
storeRoutes.get("/view-store/:name", viewStore);
storeRoutes.get("/store-dashboard", authUser, storeDashboard);
storeRoutes.get("/get-all-store-products", authUser, getAllStoreProducts);
storeRoutes.get("/get-all-store-orders", authUser, getAllStoreOrdes);
storeRoutes.get("/seller-user", authUser, getStoreUser);

export default storeRoutes;
