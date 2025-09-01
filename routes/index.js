import express from "express";
import cartRouter from "./cartRouter.js";  
import orderRouter from "./orderRouter.js";
// import productrouest from "../controllers/productController.js";
const router = express.Router();

router.use("/cart", cartRouter);
router.use("/order", orderRouter);
// app.use("/products", productrouest);

export default router;
