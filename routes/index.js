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
import webhookRoute from "./webhookRoute.js";
import flowRouter from "./flowRouter.js";
import hemtRouter from "./HEMT/index.js";

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

router.use("/webhook", webhookRoute);
router.use("/flow", flowRouter);

// HEMT Admin Dashboard Routes
router.use("/hemt", hemtRouter);

export default router;
