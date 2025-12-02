import express from "express";
import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { protect } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/authrole.js";
import userRoles from "../../utilities/userRoles.js";
import add from "../../controllers/HEMT/shape/add.js";
import getAll from "../../controllers/HEMT/shape/getAll.js";
import getOne from "../../controllers/HEMT/shape/getOne.js";
import update from "../../controllers/HEMT/shape/update.js";
import deleteOne from "../../controllers/HEMT/shape/delete.js";

const router = express.Router();

// GET all shapes (optional query param: ?shapeCategoryId=xxx)
router.get("/", protect, asyncWrapper(getAll));

// GET single shape by ID
router.get("/:id", protect, asyncWrapper(getOne));

// POST create new shape
router.post("/", protect, authorizeRoles(userRoles.ADMIN), asyncWrapper(add));

// PUT update shape by ID
router.put(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(update)
);

// DELETE shape by ID (soft delete)
router.delete(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteOne)
);

export default router;
