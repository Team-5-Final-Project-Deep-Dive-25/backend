import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
      default: 0,
    },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
