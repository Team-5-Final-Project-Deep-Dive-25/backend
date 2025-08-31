import express from "express";
import productroute from "./productRouter.js";
const router = express.Router();
router.use("/products", productroute);

export default router;
