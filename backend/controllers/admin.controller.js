import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Store from "../models/store.model.js";
import User from "../models/user.model.js";

export const adminApprove = async (req, res) => {
  try {
    const { storeId } = req.params;
    const adminId = req.userId;

    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ error: "Store not found" });

    const ownerStoreUser = await User.findById(store.owner);
    if (!ownerStoreUser)
      return res.status(404).json({ error: "Owner user not found" });

    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Unauthorized: only admin can approve stores." });
    }

    // Approve the store
    store.requestStatus = "approve";
    store.isActive = true;
    ownerStoreUser.role = "seller";

    await store.save();
    await ownerStoreUser.save();

    res.status(200).json({
      message: "Store approved successfully",
      store: store, // Updated store
    });
  } catch (error) {
    console.error("Approve Store Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const updateActiveStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const adminId = req.userId;

    const store = await Store.findById(storeId);
    if (!store) return res.status(400).json({ error: "Store not found" });

    const ownerStoreUser = await User.findById(store.owner);
    if (!ownerStoreUser)
      return res.status(400).json({ error: "Owner user not found" });

    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Unauthorized. Admin only access." });
    }

    // Toggle Active / Inactive
    const newIsActive = !store.isActive;

    // Update Owner Role
    await User.findByIdAndUpdate(
      ownerStoreUser._id,
      { role: newIsActive ? "seller" : "customer" },
      { new: true }
    );

    // Update store and GET updated
    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      { isActive: newIsActive },
      { new: true }
    );

    return res.status(200).json({
      message: "Store status updated",
      store: updatedStore,
    });
  } catch (error) {
    console.error("Update Store Error:", error.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const adminId = req.userId;

    const adminUser = await User.findById(adminId);
    if (!adminUser) {
      return res.status(400).json({ error: "Store not found" });
    }

    if (adminUser.role !== "admin") {
      return res.status(400).json({
        error: "UnAuthorized only Admin for this.",
      });
    }

    const totalStores = await Store.find({}); // Collect all the stores
    const totalProducts = await Product.find({}); // Collect all the products
    const totalOrders = await Order.find({});
    const orders = await Order.find({ status: "DELIVERED" });
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    res.status(200).json({
      totalStores: totalStores.length,
      totalProducts: totalProducts.length,
      totalOrders: totalOrders.length,
      totalRevenue,
    });
  } catch (error) {
    console.error("Get Admin Dashboard Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};

export const getAllPendingStore = async (req, res) => {
  try {
    const adminId = req.userId;

    const user = await User.findById(adminId);
    if (!user) return res.status(400).json({ error: "Admin not found" });

    if (user.role !== "admin") {
      return res.status(400).json({
        error: "UnAuthorized to cofirm the request only Admin can cofirm this.",
      });
    }

    const pendingStores = await Store.find({ requestStatus: "pending" });
    res.status(200).json(pendingStores);
  } catch (error) {}
};

export const rejectStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    await Store.findByIdAndDelete(storeId);

    res.status(200).json({ message: "Reject Store Successfully" });
  } catch (error) {
    console.error("Reject Store Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find({ requestStatus: "approve" }).sort({
      createdAt: -1,
    });
    res.status(200).json(stores);
  } catch (error) {
    console.error("Get All Store Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};
