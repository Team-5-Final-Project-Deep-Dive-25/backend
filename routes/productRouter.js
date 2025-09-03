import express from "express";
import {
  productValidation,
  handleProductValidation,
  normalizeProductImages,
} from "../controllers/validation/product.js";
import add from "../controllers/products/add.js";
import getAll from "../controllers/products/getAll.js";
import getOne from "../controllers/products/getOne.js";
import updateOne from "../controllers/products/update.js";
import deleteOne from "../controllers/products/delete.js";
import { deleteProductImages } from "../controllers/products/deleteImages.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authrole.js";
import userRoles from "../utilities/userRoles.js";

import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", asyncWrapper(getAll));
router.get("/:id", asyncWrapper(getOne));
router.post(
  "/",
  protect,
  authorizeRoles(userRoles.ADMIN),
  upload.array("images"),
  normalizeProductImages,
  productValidation("create"),
  handleProductValidation,
  asyncWrapper(add)
);
router.put(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  upload.array("images"),
  normalizeProductImages,
  productValidation("update"),
  handleProductValidation,
  asyncWrapper(updateOne)
);
router.delete(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteOne)
);
router.delete(
  "/:id/images",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteProductImages)
);
export default router;
