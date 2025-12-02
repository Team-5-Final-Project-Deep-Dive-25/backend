import mongoose from "mongoose";

const shapeCategorySchema = new mongoose.Schema(
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
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const ShapeCategory = mongoose.model(
  "ShapeCategory",
  shapeCategorySchema
);
