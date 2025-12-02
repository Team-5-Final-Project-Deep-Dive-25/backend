import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    price: {
      type: Number,
      default: 50,
      min: 0,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Material = mongoose.model("Material", materialSchema);
