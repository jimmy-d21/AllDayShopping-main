import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import connectDB from "./db/connectDB.js";

import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import adminRoutes from "./routes/admin.route.js";
import storeRoutes from "./routes/store.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const app = express();

// CORS FIX — allows cookies to be sent
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// API ROUTES
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// START SERVER
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is ready on PORT: ${PORT}`);
});
