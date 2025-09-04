import express from "express";
import add from "../controllers/carts/add.js";
import deleteOne from "../controllers/carts/delete.js";
import getAll from "../controllers/carts/getAll.js";
import getOne from "../controllers/carts/getOne.js";
import updateOne from "../controllers/carts/update.js";
import {
  handleAddCartValidation,
  addCartValidation,
} from "../controllers/validation/addCart.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authrole.js";
import userRoles from "../utilities/userRoles.js";

const router = express.Router();

// router.get("/", protect, authorizeRoles(userRoles.USER), asyncWrapper(getAll));
router.post(
  "/",
  protect,
  authorizeRoles(userRoles.USER),

  addCartValidation("create"),
  handleAddCartValidation,
  asyncWrapper(add)
);
router.get("/", protect, authorizeRoles(userRoles.USER), asyncWrapper(getOne));
router.put(
  "/",
  protect,
  authorizeRoles(userRoles.USER),
  addCartValidation("update"),
  handleAddCartValidation,
  asyncWrapper(updateOne)
);
router.delete(
  "/:productID",
  protect,
  authorizeRoles(userRoles.USER),
  asyncWrapper(deleteOne)
);
export default router;
