import express from "express";
import productroute from "./productRouter.js";
import discountroute from "./discountRouter.js";
import userRouter from "./userRouter.js";
const router = express.Router();
router.use("/products", productroute);
router.use("/discounts", discountroute);
Router.use("/users", userRouter);

export default router;
