import express from "express";
import postReceive from "../controllers/webhook/postReceive.js";
import  receive  from "../controllers/webhook/receive.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const router = express.Router();

router.get("/", asyncWrapper(receive));
router.post("/", asyncWrapper(postReceive));

export default router;
