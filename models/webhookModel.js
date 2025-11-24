import mongoose from "mongoose";

const webhookSchema = new mongoose.Schema(
  {
    wa_id: {
      type: String,
      required: true,
      trim: true,
    },
    phone_number_id: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
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
      enum: ["text", "image", "document", "audio", "video", "other"],
      default: "text",
    },
    timestamp: {
      type: Number,
      required: true,
    },
    profile_name: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read", "failed"],
      default: "received",
    },
    errors: [
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
