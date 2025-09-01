import express from "express";
import productroute from "./productRouter.js";
import discountroute from "./discountRouter.js";
const router = express.Router();
router.use("/products", productroute);
router.use("/discounts", discountroute);

export default router;
