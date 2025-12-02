import express from "express";
import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { protect } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/authrole.js";
import userRoles from "../../utilities/userRoles.js";
import add from "../../controllers/HEMT/shapeCategory/add.js";
import getAll from "../../controllers/HEMT/shapeCategory/getAll.js";
import getOne from "../../controllers/HEMT/shapeCategory/getOne.js";
import update from "../../controllers/HEMT/shapeCategory/update.js";
import deleteOne from "../../controllers/HEMT/shapeCategory/delete.js";

const router = express.Router();

// All routes are protected and admin only
router.use(protect, authorizeRoles(userRoles.ADMIN));

// GET all shape categories
router.get("/", asyncWrapper(getAll));

// GET single shape category by ID
router.get("/:id", asyncWrapper(getOne));

// POST create new shape category
router.post("/", protect, authorizeRoles(userRoles.ADMIN), asyncWrapper(add));

// PUT update shape category by ID
router.put(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(update)
);

// DELETE shape category by ID (soft delete)
router.delete(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteOne)
);

export default router;
