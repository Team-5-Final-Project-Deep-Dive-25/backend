import express from "express";
import addCartItem from "../controllers/carts/add.js";
import deleteCartItem from "../controllers/carts/delete.js";
import getAllCartItems from "../controllers/carts/getAll.js";
import getCartItem from "../controllers/carts/getOne.js";
import updateCartItem from "../controllers/carts/update.js";
import { addCartValidation } from "../controllers/validation/addCart.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", protect, asyncWrapper(getAllCartItems));
router.post("/", protect, addCartValidation, asyncWrapper(addCartItem));
router.get("/:id", protect, asyncWrapper(getCartItem));
router.put("/:id", protect, asyncWrapper(updateCartItem));
router.delete("/:id", protect, asyncWrapper(deleteCartItem));
export default router;
