import express from "express";
import {
  handleFlowRequest,
  getFlowStatus,
} from "../controllers/flow/flowEndpoint.js";
import { generateKeys } from "../controllers/flow/generateKeys.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const router = express.Router();

// Main flow endpoint - handles encrypted WhatsApp Flow requests
router.post("/", asyncWrapper(handleFlowRequest));

// Health check endpoint
router.get("/", getFlowStatus);

// Key generation endpoint for setting up encryption
router.post("/generate-keys", asyncWrapper(generateKeys));

export default router;
