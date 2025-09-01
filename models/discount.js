import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    categoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    type: { type: String, required: true, enum: ["percentage", "fixed"] },
    value: { type: Number, required: true },
    endDate: { type: Date, required: true },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
export const Discount = mongoose.model("Discount", discountSchema);
