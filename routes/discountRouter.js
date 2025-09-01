import express from "express";
import {
  discountValidation,
  handleDiscountValidation,
} from "../controllers/validation/discount.js";
import add from "../controllers/discount/add.js";
import getAll from "../controllers/discount/getAll.js";
import getOne from "../controllers/discount/getOne.js";
import updateOne from "../controllers/discount/update.js";
import deleteOne from "../controllers/discount/delete.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", protect, asyncWrapper(getAll));
router.get("/:id", protect, asyncWrapper(getOne));
router.post(
  "/",
  discountValidation("create"),
  handleDiscountValidation,
  asyncWrapper(add)
);
router.put(
  "/:id",
  discountValidation("update"),
  handleDiscountValidation,
  asyncWrapper(updateOne)
);
router.delete("/:id", asyncWrapper(deleteOne));
export default router;
