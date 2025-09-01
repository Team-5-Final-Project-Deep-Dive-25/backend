// validation/updateCart.js
import mongoose from "mongoose";

export function validateUpdateCart({ productID, quantity }) {
  if (productID && !mongoose.Types.ObjectId.isValid(productID)) {
    return { valid: false, message: "Valid productID is required" };
  }
  if (quantity !== undefined) {
    const q = Number(quantity);
    if (!Number.isFinite(q) || q < 1) {
      return { valid: false, message: "Quantity must be a number and at least 1" };
    }
  }
  return { valid: true };
}
