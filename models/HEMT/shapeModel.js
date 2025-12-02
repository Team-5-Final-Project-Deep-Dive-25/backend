import mongoose from "mongoose";

const shapeSchema = new mongoose.Schema(
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
      default: 20,
      min: 0,
    },
    shapeCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShapeCategory",
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Shape = mongoose.model("Shape", shapeSchema);
