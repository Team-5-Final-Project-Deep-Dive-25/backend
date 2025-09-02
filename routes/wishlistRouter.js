import express from "express";
import { add } from "../controllers/wishlist/add.js";
import { deleteOne } from "../controllers/wishlist/delete.js";
import { getOne } from "../controllers/wishlist/getOne.js";
import { removeItem } from "../controllers/wishlist/removeItem.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authrole.js";
import userRoles from "../utilities/userRoles.js";

const router = express.Router();

// router.get("/", protect, authorizeRoles(userRoles.USER), asyncWrapper(getAll));
router.get("/", protect, authorizeRoles(userRoles.USER), asyncWrapper(getOne));
router.post("/", protect, authorizeRoles(userRoles.USER), asyncWrapper(add));
router.put(
  "/",
  protect,
  authorizeRoles(userRoles.USER),
  asyncWrapper(removeItem)
);
router.delete(
  "/",
  protect,
  authorizeRoles(userRoles.USER),
  asyncWrapper(deleteOne)
);
export default router;
