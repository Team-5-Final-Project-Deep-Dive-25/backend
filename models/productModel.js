import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    categorty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
      default: 0,
    },
    rate: { type: Number, default: 1, max: 5 },
    images: [{ type: String, required: true }],
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
export const Product = mongoose.model("Product", productSchema);
