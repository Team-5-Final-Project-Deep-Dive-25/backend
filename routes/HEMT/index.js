import express from "express";
import colorRouter from "./colorRouter.js";
import materialRouter from "./materialRouter.js";
import shapeCategoryRouter from "./shapeCategoryRouter.js";
import shapeRouter from "./shapeRouter.js";
import veilRouter from "./veilRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

// HEMT Admin Dashboard Routes
router.use("/colors", colorRouter);
router.use("/materials", materialRouter);
router.use("/shape-categories", shapeCategoryRouter);
router.use("/shapes", shapeRouter);
router.use("/veils", veilRouter);
router.use("/users", userRouter);

export default router;
