import express from "express";
import {
  handleFlowRequest,
  getFlowStatus,
} from "../controllers/flow/flowEndpoint.js";
import { generateKeys } from "../controllers/flow/generateKeys.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const router = express.Router();

// Simple test endpoint for debugging
router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Flow router is working!",
    timestamp: new Date().toISOString(),
    environment: {
      hasAppSecret: !!process.env.APP_SECRET,
      hasPrivateKey: !!process.env.PRIVATE_KEY,
      hasPassphrase: !!process.env.PASSPHRASE,
    },
  });
});

// Main flow endpoint - handles encrypted WhatsApp Flow requests
router.post("/", asyncWrapper(handleFlowRequest));

// Health check endpoint
router.get("/", getFlowStatus);

// Key generation endpoint for setting up encryption
router.post("/generate-keys", asyncWrapper(generateKeys));

export default router;
