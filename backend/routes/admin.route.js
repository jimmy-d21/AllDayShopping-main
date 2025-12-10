import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  adminUpprove,
  getAdminDashboard,
  getAllPendingStore,
  getAllStores,
  rejectStore,
  updateActiveStore,
} from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.get("/admin-dashboard", authUser, getAdminDashboard);
adminRoutes.get("/get-all-store", authUser, getAllStores);
adminRoutes.put("/update-active-store/:storeId", authUser, updateActiveStore);
adminRoutes.get("/pending-stores", authUser, getAllPendingStore);
adminRoutes.put("/approve-store/:storeId", authUser, adminUpprove);
adminRoutes.delete("/reject-store/:storeId", authUser, rejectStore);

export default adminRoutes;
