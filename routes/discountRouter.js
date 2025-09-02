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
import { authorizeRoles } from "../middlewares/authrole.js";
import userRoles from "../utilities/userRoles.js";

const router = express.Router();

router.get("/", protect, asyncWrapper(getAll));
router.get("/:id", protect, asyncWrapper(getOne));
router.post(
  "/",
  protect,
  authorizeRoles(userRoles.ADMIN),
  discountValidation("create"),
  handleDiscountValidation,
  asyncWrapper(add)
);
router.put(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  discountValidation("update"),
  handleDiscountValidation,
  asyncWrapper(updateOne)
);
router.delete(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteOne)
);
export default router;
