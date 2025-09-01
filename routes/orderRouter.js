import express from "express";

import addOrder from "../controllers/orders/add.js";
import { protect } from "../middlewares/auth.js";
import deleteOrder from "../controllers/orders/delete.js";
import getAllOrders from "../controllers/orders/getAll.js";
import getOneOrder from "../controllers/orders/getOne.js";
import updateOrder from "../controllers/orders/update.js";
import validateAddOrder from "../controllers/validation/addOrder.js";

const router = express.Router(); 
// Routes
router.post("/", protect, addOrder);
router.get("/", getAllOrders);
router.get("/:id", getOneOrder);
//router.post("/", validateAddOrder, addOrder);
router.put("/:id", protect, updateOrder);
router.delete("/:id", deleteOrder);

export default router;
