import dotenv from "dotenv";
import { storeWebhookData } from "./getAll.js";

dotenv.config();

const token = process.env.WHATSAPP_TOKEN;

const postReceive = async (req, res) => {
  const body = req.body;
  console.log("Received webhook payload:", JSON.stringify(body, null, 2));

  // Store webhook data in database
  return storeWebhookData(req, res);
};

export default postReceive;
