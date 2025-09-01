import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "cartId is required"],
      trim: true,
    },
    buyerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    total: {
      type: Number,
      required: [true, "Total is required"],
      min: [0, "Total must be a positive number"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
