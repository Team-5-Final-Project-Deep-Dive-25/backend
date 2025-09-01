import express from "express";
import cartRouter from "./cartRouter.js";
import discountroute from "./discountRouter.js";
import productroute from "./productRouter.js";
import categoryroute from "./categoryRouter.js";
import userRouter from "./userRouter.js";
const router = express.Router();

router.use("/carts", cartRouter);
router.use("/products", productroute);
router.use("/discounts", discountroute);
router.use("/categories", categoryroute);
router.use("/users", userRouter);

export default router;
