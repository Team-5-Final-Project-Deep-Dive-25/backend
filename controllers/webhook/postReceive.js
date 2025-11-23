import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const token = process.env.WHATSAPP_TOKEN;

const postReceive = async (req, res) => {
  const body = req.body;
  console.log(JSON.stringify(body, null, 2));

  try {
    if (!body?.object) return res.sendStatus(404);

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (!message) return res.sendStatus(404);

    const phoneNumberId = value.metadata?.phone_number_id;
    const from = message.from;

    // Handle only text messages
    const msg_body = message.text?.body || "";

    console.log("phone number", phoneNumberId);
    console.log("from", from);
    console.log("body", msg_body);

    await axios.post(
      `https://graph.facebook.com/v24.0/${phoneNumberId}/messages?access_token=${token}`,
      {
        messaging_product: "whatsapp",
        to: from,
        text: {
          body: `Hi.. I'm Khaled, your message is: ${msg_body}`,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return res.sendStatus(500);
  }
};

export default postReceive;
