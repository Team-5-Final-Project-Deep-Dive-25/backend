import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productID: {
      type: String,   
      required: true,
    },
    buyerID: {
      type: String,   
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
