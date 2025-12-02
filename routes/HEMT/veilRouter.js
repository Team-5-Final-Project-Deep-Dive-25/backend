import express from "express";
import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { protect } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/authrole.js";
import userRoles from "../../utilities/userRoles.js";
import add from "../../controllers/HEMT/veil/add.js";
import getAll from "../../controllers/HEMT/veil/getAll.js";
import getOne from "../../controllers/HEMT/veil/getOne.js";
import update from "../../controllers/HEMT/veil/update.js";
import deleteOne from "../../controllers/HEMT/veil/delete.js";
import updateStatus from "../../controllers/HEMT/veil/updateStatus.js";

const router = express.Router();

// GET all veils (optional query params: ?status=xxx&userId=xxx)
router.get("/", protect, asyncWrapper(getAll));

// GET single veil by ID
router.get("/:id", protect, asyncWrapper(getOne));

// POST create new veil
router.post("/", protect, asyncWrapper(add));

// PUT update veil by ID
router.put("/:id", protect, asyncWrapper(update));

// PATCH update veil status only
router.patch("/:id/status", protect, asyncWrapper(updateStatus));

// DELETE veil by ID (soft delete)
router.delete("/:id", protect, asyncWrapper(deleteOne));

export default router;
