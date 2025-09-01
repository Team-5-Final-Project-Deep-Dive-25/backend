import express from "express";
import cartRouter from "./cartRouter.js";
import cartRouter from "./cartRouter.js";  
import orderRouter from "./orderRouter.js";
// import productrouest from "../controllers/productController.js";
import discountroute from "./discountRouter.js";
import userRouter from "./userRouter.js";
const router = express.Router();

router.use("/cart", cartRouter);
router.use("/order", orderRouter);
// app.use("/products", productrouest);
router.use("/discounts", discountroute);
router.use("/users", userRouter);

export default router;
