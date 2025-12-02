import express from "express";
import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { protect } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/authrole.js";
import userRoles from "../../utilities/userRoles.js";
import add from "../../controllers/HEMT/material/add.js";
import getAll from "../../controllers/HEMT/material/getAll.js";
import getOne from "../../controllers/HEMT/material/getOne.js";
import update from "../../controllers/HEMT/material/update.js";
import deleteOne from "../../controllers/HEMT/material/delete.js";

const router = express.Router();

// GET all materials
router.get("/", protect, asyncWrapper(getAll));

// GET single material by ID
router.get("/:id", protect, asyncWrapper(getOne));

// POST create new material
router.post("/", protect, authorizeRoles(userRoles.ADMIN), asyncWrapper(add));

// PUT update material by ID
router.put(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(update)
);

// DELETE material by ID (soft delete)
router.delete(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteOne)
);

export default router;
