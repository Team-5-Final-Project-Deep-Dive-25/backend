import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    buyerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
