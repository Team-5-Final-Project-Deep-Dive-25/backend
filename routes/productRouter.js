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
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { protect } from "../middlewares/auth.js";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", protect, asyncWrapper(getAll));
router.get("/:id", protect, asyncWrapper(getOne));
router.post(
  "/",
  upload.array("images"),
  normalizeProductImages,
  productValidation("create"),
  handleProductValidation,
  asyncWrapper(add)
);
router.put(
  "/:id",
  upload.array("images"),
  normalizeProductImages,
  productValidation("update"),
  handleProductValidation,
  asyncWrapper(updateOne)
);
router.delete("/:id", asyncWrapper(deleteOne));
export default router;
