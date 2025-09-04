import express from "express";
import { contactValidation } from "../controllers/validation/contact.js";
import add from "../controllers/contact/add.js";
import getAll from "../controllers/contact/getAll.js";
import { deleteOne } from "../controllers/contact/delete.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authrole.js";
import userRoles from "../utilities/userRoles.js";

const router = express.Router();
router.post("/", contactValidation, asyncWrapper(add));
router.get("/", asyncWrapper(getAll));
router.delete(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteOne)
);
export default router;
