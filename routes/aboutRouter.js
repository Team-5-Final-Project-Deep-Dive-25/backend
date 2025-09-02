import express from "express";
import { normalizeProductImages } from "../controllers/validation/product.js";
import { getAll } from "../controllers/about/getAll.js";
import { add } from "../controllers/about/add.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", asyncWrapper(getAll));
router.post(
  "/",
  upload.single("image"),
  // normalizeProductImages,
  asyncWrapper(add)
);

export default router;
