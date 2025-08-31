import express from "express";
import addCartItem from "../controllers/carts/add.js";
import deleteCartItem from "../controllers/carts/delete.js";
import getAllCartItems from "../controllers/carts/getAll.js";
import getCartItem from "../controllers/carts/getOne.js";
import updateCartItem from "../controllers/carts/update.js";

const router = express.Router();

router.post("/", addCartItem);
router.get("/", getAllCartItems);
router.get("/:id", getCartItem);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

export default router;
