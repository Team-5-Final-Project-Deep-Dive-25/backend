import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPriceAfterDiscount: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 40,
    },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
