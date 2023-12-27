import express from "express";
import {
  allProducts,
  approveProduct,
  clearNotification,
  createBids,
  createProduct,
  deleteBid,
  deleteProduct,
  enterBidReplies,
  getFilterProducts,
  getProductBasedOnId,
  getProductRelatedToUser,
} from "../controllers/productControllers.js";

import { upload } from "../utils/HandleImageUpload.js";
import { tokenMiddleWare } from "../middlewares/authMiddleware.js";
import { checkIsAdmin } from "../middlewares/AdminMiddleware.js";

const router = express.Router();

//create product Api
router.post("/create-product", upload.array("pimages", 3), createProduct);

// get product releted to user Api
router.get("/reletedProducts", tokenMiddleWare, getProductRelatedToUser);

// get product releted to user city Api
router.get("/all-products", tokenMiddleWare, allProducts);

// get Filtred Products Api
router.get("/filter-products", getFilterProducts);

// raise a bid Api
router.post("/bid/", tokenMiddleWare, createBids);

// delete a bid Api
router.post("/deletebid/", tokenMiddleWare, deleteBid);

// clear all notifications Api
router.get("/clear-notifications", tokenMiddleWare, clearNotification);

//add bid replies Api
router.post("/bid-replies", tokenMiddleWare, enterBidReplies);

//delete a single product Api
router.delete(
  "/delete-product/:id",
  tokenMiddleWare,
  checkIsAdmin,
  deleteProduct
);

// approve product Api
router.patch(
  "/approve-product/:id",
  tokenMiddleWare,
  checkIsAdmin,
  approveProduct
);

// get product Based on Id Api
router.get("/single/:id", tokenMiddleWare, getProductBasedOnId);

export default router;
