import { Webhook } from "../../models/webhookModel.js";

// Store webhook data in database
const storeWebhookData = async (req, res) => {
  try {
    const body = req.body;

    console.log("=== WEBHOOK RECEIVED ===");
    console.log("Body object exists:", !!body?.object);

    if (!body?.object) {
      console.log("❌ Invalid webhook payload - no object");
      return res.status(400).json({
        success: false,
        message: "Invalid webhook payload",
      });
    }

    const entry = body.entry?.[0];
    console.log("Entry exists:", !!entry);

    const changes = entry?.changes?.[0];
    console.log("Changes exists:", !!changes);

    const value = changes?.value;
    console.log("Value exists:", !!value);

    const message = value?.messages?.[0];
    console.log("Message exists:", !!message);

    if (!message) {
      console.log("❌ No message found in webhook");
      return res.status(400).json({
        success: false,
        message: "No message found in webhook",
      });
    }

    const phoneNumberId = value.metadata?.phone_number_id;
    const from = message.from;
    const msg_body = message.text?.body || "";
    const msg_id = message.id;
    const timestamp = message.timestamp;

    // Get profile name from contacts array
    const contact = value?.contacts?.[0];
    const profile_name = contact?.profile?.name || null;

    // Check for errors in the webhook
    const webhook_errors = value?.errors || [];

    console.log("✅ Extracted webhook data:", {
      wa_id: from,
      receiver_phone_id: phoneNumberId,
      message_id: msg_id,
      body: msg_body,
      timestamp,
      profile_name,
    });

    // Create webhook document
    const webhookData = new Webhook({
      wa_id: from,
      receiver_phone_id: phoneNumberId || "",
      sender_phone_id: from,
      conversation_id: value?.conversation_id || null,
      message_id: msg_id,
      body: msg_body,
      message_type: message.type || "text",
      timestamp: parseInt(timestamp),
      profile_name: profile_name,
      webhook_errors: webhook_errors.length > 0 ? webhook_errors : [],
      raw_data: body,
      status: "received",
    });

    console.log("Saving webhook data to database...");
    const savedData = await webhookData.save();

    console.log("✅ Webhook data stored successfully with ID:", savedData._id);
    return res.status(200).json({
      success: true,
      message: "Webhook data stored successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("❌ Error storing webhook data:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Error storing webhook data",
        error: error.message,
      });
    }
  }
};

// Get all webhook data
const getAllWebhookData = async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      wa_id,
      receiver_phone_id,
      sender_phone_id,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    // Build filter object
    const filter = {
      deleted_at: null,
    };

    if (wa_id) {
      filter.wa_id = wa_id;
    }

    if (receiver_phone_id) {
      filter.receiver_phone_id = receiver_phone_id;
    }

    if (sender_phone_id) {
      filter.sender_phone_id = sender_phone_id;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    // Fetch data
    const webhookData = await Webhook.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await Webhook.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Webhook data retrieved successfully",
      data: webhookData,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching webhook data:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching webhook data",
      error: error.message,
    });
  }
};

// Get webhook data by ID
const getWebhookDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const webhookData = await Webhook.findById(id);

    if (!webhookData || webhookData.deleted_at) {
      return res.status(404).json({
        success: false,
        message: "Webhook data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Webhook data retrieved successfully",
      data: webhookData,
    });
  } catch (error) {
    console.error("Error fetching webhook data:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching webhook data",
      error: error.message,
    });
  }
};

// Get webhook data by phone number (wa_id)
const getWebhookDataByPhoneNumber = async (req, res) => {
  try {
    const { wa_id } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const skip = (page - 1) * limit;

    const webhookData = await Webhook.find({
      wa_id,
      deleted_at: null,
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Webhook.countDocuments({
      wa_id,
      deleted_at: null,
    });

    return res.status(200).json({
      success: true,
      message: "Webhook data retrieved successfully",
      data: webhookData,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching webhook data:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching webhook data",
      error: error.message,
    });
  }
};

// Delete webhook data (soft delete)
const deleteWebhookData = async (req, res) => {
  try {
    const { id } = req.params;

    const webhookData = await Webhook.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true }
    );

    if (!webhookData) {
      return res.status(404).json({
        success: false,
        message: "Webhook data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Webhook data deleted successfully",
      data: webhookData,
    });
  } catch (error) {
    console.error("Error deleting webhook data:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error deleting webhook data",
      error: error.message,
    });
  }
};

export {
  storeWebhookData,
  getAllWebhookData,
  getWebhookDataById,
  getWebhookDataByPhoneNumber,
  deleteWebhookData,
};
