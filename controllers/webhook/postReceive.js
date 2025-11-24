import dotenv from "dotenv";
import { storeWebhookData } from "./getAll.js";

dotenv.config();

const token = process.env.WHATSAPP_TOKEN;

const postReceive = async (req, res) => {
  const body = req.body;
  console.log(JSON.stringify(body, null, 2));

  try {
    // Store webhook data in database
    await storeWebhookData(req, res);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return res.sendStatus(500);
  }
};

export default postReceive;
