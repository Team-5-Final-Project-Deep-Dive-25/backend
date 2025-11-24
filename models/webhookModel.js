import mongoose from "mongoose";

const webhookSchema = new mongoose.Schema(
  {
    wa_id: {
      type: String,
      trim: true,
    },
    receiver_phone_id: {
      type: String,
      trim: true,
    },
    sender_phone_id: {
      type: String,
      trim: true,
    },
    conversation_id: {
      type: String,
      trim: true,
    },
    message_id: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
    },
    message_type: {
      type: String,
      default: "text",
    },
    timestamp: {
      type: Number,
    },
    profile_name: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["received", "sent", "delivered", "read", "failed"],
      default: "received",
    },
    webhook_errors: [
      {
        code: {
          type: Number,
        },
        title: {
          type: String,
          trim: true,
        },
        message: {
          type: String,
          trim: true,
        },
        error_type: {
          type: String,
          trim: true,
        },
      },
    ],
    raw_data: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Webhook = mongoose.model("Webhook", webhookSchema);
