import express from "express";
import postReceive from "../controllers/webhook/postReceive.js";
import receive from "../controllers/webhook/receive.js";
import {
  getAllWebhookData,
  getWebhookDataById,
  getWebhookDataByPhoneNumber,
  deleteWebhookData,
} from "../controllers/webhook/getAll.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const router = express.Router();

// Webhook receive endpoints
router.get("/", asyncWrapper(receive));
router.post("/", asyncWrapper(postReceive));

// Webhook data retrieval endpoints
router.get("/data/all", asyncWrapper(getAllWebhookData));
router.get("/data/:id", asyncWrapper(getWebhookDataById));
router.get("/phone/:wa_id", asyncWrapper(getWebhookDataByPhoneNumber));
router.delete("/data/:id", asyncWrapper(deleteWebhookData));

export default router;
