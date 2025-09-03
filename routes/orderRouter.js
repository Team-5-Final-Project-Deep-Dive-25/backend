import express from "express";

import add from "../controllers/orders/add.js";
import { protect } from "../middlewares/auth.js";
import deleteOne from "../controllers/orders/delete.js";
import getAll from "../controllers/orders/getAll.js";
import getOne from "../controllers/orders/getOne.js";
import updateOne from "../controllers/orders/update.js";
import {
  orderValidation,
  handleOrderValidation,
} from "../controllers/validation/order.js";
import { authorizeRoles } from "../middlewares/authrole.js";
import userRoles from "../utilities/userRoles.js";
const router = express.Router();
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);
router.post("/", protect, add);
router.put(
  "/:id",
  protect,
  // authorizeRoles(userRoles.ADMIN),
  // orderValidation,
  handleOrderValidation,
  updateOne
);
router.delete("/:id", protect, deleteOne);

export default router;
