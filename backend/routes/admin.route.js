import express from "express";
import adminUser from "../middlewares/adminUser.js";
import {
  adminApprove,
  getAdminDashboard,
  getAdminUser,
  getAllPendingStore,
  getAllStores,
  loginAdmin,
  logoutAdmin,
  rejectStore,
  updateActiveStore,
} from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

// Admin authentication routes
adminRoutes.post("/admin-login", loginAdmin);
adminRoutes.post("/admin-logout", logoutAdmin);
adminRoutes.get("/adminUser", adminUser, getAdminUser);

// Dashboard & store management
adminRoutes.get("/admin-dashboard", adminUser, getAdminDashboard);
adminRoutes.get("/get-all-store", adminUser, getAllStores);
adminRoutes.put("/update-active-store/:storeId", adminUser, updateActiveStore);
adminRoutes.get("/pending-stores", adminUser, getAllPendingStore);
adminRoutes.put("/approve-store/:storeId", adminUser, adminApprove);
adminRoutes.delete("/reject-store/:storeId", adminUser, rejectStore);

export default adminRoutes;
