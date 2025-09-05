import mongoose from "mongoose";

const blackSchema = mongoose.Schema({
  invaild: { type: String, required: true },
});

export const Black = mongoose.model("Black", blackSchema);
