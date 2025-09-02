import express from "express";
import cartRouter from "./cartRouter.js";
import orderRouter from "./orderRouter.js";
import discountroute from "./discountRouter.js";
import productroute from "./productRouter.js";
import categoryroute from "./categoryRouter.js";
import userRouter from "./userRouter.js";
import aboutRouter from "./aboutRouter.js";
import wishlistRouter from "./wishlistRouter.js";
import contactRouter from "./contactRouter.js";
const router = express.Router();

router.use("/carts", cartRouter);
router.use("/orders", orderRouter);
router.use("/products", productroute);

router.use("/discounts", discountroute);
router.use("/categories", categoryroute);
router.use("/users", userRouter);
router.use("/about", aboutRouter);
router.use("/wishlist", wishlistRouter);
router.use("/contact", contactRouter);

export default router;
