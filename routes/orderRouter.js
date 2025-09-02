import express from "express";

import add from "../controllers/orders/add.js";
import { protect } from "../middlewares/auth.js";
import deleteOne from "../controllers/orders/delete.js";
import getAll from "../controllers/orders/getAll.js";
import getOne from "../controllers/orders/getOne.js";
import updateOne from "../controllers/orders/update.js";
import validateAddOrder from "../controllers/validation/addOrder.js";

const router = express.Router();
// Routes
router.post("/", protect, add);
router.get("/", getAll);
router.get("/:id", getOne);
//router.post("/", validateAddOrder, addOrder);
router.put("/:id", protect, updateOne);
router.delete("/:id",protect, deleteOne);

export default router;
