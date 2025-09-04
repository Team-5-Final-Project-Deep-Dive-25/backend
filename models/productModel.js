import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
      unique: true,
    },
    description: { type: String, required: true, minlength: 5, maxlength: 500 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    discountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
      default: null,
    },
    rate: { type: Number, default: 1, max: 5 },
    images: [{ type: String }],
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
export const Product = mongoose.model("Product", productSchema);
