import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    cartID: {
      type: String, 
      required: [true, "cartID is required"],
      trim: true,
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
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be at least 1"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
