import express from "express";
import cartRouter from "./cartRouter.js";  
// import productrouest from "../controllers/productController.js";
const router = express.Router();

router.use("/cart", cartRouter);
// app.use("/products", productrouest);

export default router;
