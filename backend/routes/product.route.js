import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  addProduct,
  getAllProducts,
  getBestSellingProducts,
  getLatestProducts,
  rateProduct,
  updateActiveProduct,
  viewProductDetails,
} from "../controllers/product.controller.js";

const productRoutes = express.Router();

productRoutes.post("/create-product", authUser, addProduct);
productRoutes.put(
  "/update-active-product/:productId",
  authUser,
  updateActiveProduct
);
productRoutes.get("/latest-products", getLatestProducts);
productRoutes.get("/best-selling-products", getBestSellingProducts);
productRoutes.get("/all-products", getAllProducts);
productRoutes.get("/view-product-details/:productId", viewProductDetails);
productRoutes.put("/rates-products/:productId", authUser, rateProduct);

export default productRoutes;
