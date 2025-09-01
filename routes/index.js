import express from "express";
import cartRouter from "./cartRouter.js";
import discountroute from "./discountRouter.js";
import categoryroute from "./categoryRouter.js";
import userRouter from "./userRouter.js";
const router = express.Router();

router.use("/carts", cartRouter);
// app.use("/products", productrouest);
router.use("/discounts", discountroute);
router.use("/categories", categoryroute);
router.use("/users", userRouter);

export default router;
