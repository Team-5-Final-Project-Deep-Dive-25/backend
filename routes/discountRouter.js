import express from "express";
import {
  discountValidation,
  handleDiscountValidation,
} from "../controllers/validation/discount.js";
import add from "../controllers/discount/add.js";
import getAllDiscounts from "../controllers/discount/getAll.js";
import getOne from "../controllers/discount/getOne.js";
import updateOne from "../controllers/discount/update.js";
import deleteOne from "../controllers/discount/delete.js";
import { asyncWarper } from "../middlewares/asyncWrapper.js";
const router = express.Router();

router.get("/", asyncWarper(getAllDiscounts));
router.get("/:id", asyncWarper(getOne));
router.post(
  "/",
  discountValidation("create"),
  handleDiscountValidation,
  asyncWarper(add)
);
router.put(
  "/:id",
  discountValidation("update"),
  handleDiscountValidation,
  asyncWarper(updateOne)
);
router.delete("/:id", asyncWarper(deleteOne));
export default router;
