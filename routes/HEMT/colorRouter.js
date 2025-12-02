import express from "express";
import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { protect } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/authrole.js";
import userRoles from "../../utilities/userRoles.js";
import add from "../../controllers/HEMT/color/add.js";
import getAll from "../../controllers/HEMT/color/getAll.js";
import getOne from "../../controllers/HEMT/color/getOne.js";
import update from "../../controllers/HEMT/color/update.js";
import deleteOne from "../../controllers/HEMT/color/delete.js";

const router = express.Router();

// GET all colors
router.get("/", protect, asyncWrapper(getAll));

// GET single color by ID
router.get("/:id", protect, asyncWrapper(getOne));

// POST create new color
router.post("/", protect, authorizeRoles(userRoles.ADMIN), asyncWrapper(add));

// PUT update color by ID
router.put(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(update)
);

// DELETE color by ID (soft delete)
router.delete(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteOne)
);

export default router;
