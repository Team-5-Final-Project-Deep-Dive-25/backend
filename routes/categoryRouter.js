import express from "express";
import {
  categoryValidation,
  handleCategoryValidation,
} from "../controllers/validation/category.js";
import getAll from "../controllers/category/getAll.js";
import getOne from "../controllers/category/getOne.js";
import add from "../controllers/category/add.js";
import updateOne from "../controllers/category/update.js";
import deleteOne from "../controllers/category/delete.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authrole.js";
import userRoles from "../utilities/userRoles.js";

const router = express.Router();

router.get("/", asyncWrapper(getAll));
router.get("/:id", asyncWrapper(getOne));
router.post(
  "/",
  protect,
  authorizeRoles(userRoles.ADMIN),
  categoryValidation("create"),
  handleCategoryValidation,
  asyncWrapper(add)
);
router.put(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  categoryValidation("update"),
  handleCategoryValidation,
  asyncWrapper(updateOne)
);
router.delete(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteOne)
);
export default router;
