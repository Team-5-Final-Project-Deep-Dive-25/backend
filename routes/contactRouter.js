import express from "express";
import { contactValidation } from "../controllers/validation/contact.js";
import add from "../controllers/contact/add.js";
import getAll from "../controllers/contact/getAll.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const router = express.Router();
router.post("/", contactValidation, asyncWrapper(add));
router.get("/", asyncWrapper(getAll));
export default router;
