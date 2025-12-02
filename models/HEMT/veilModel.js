import mongoose from "mongoose";

const veilDegreeOptions = ["high", "medium", "low"];
const veilStatusOptions = ["draft", "processing", "ordered"];

const veilSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    colorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
    shapeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shape",
      required: true,
    },
    color_degree: {
      type: String,
      enum: veilDegreeOptions,
      required: true,
    },
    shape_density: {
      type: String,
      enum: veilDegreeOptions,
      required: true,
    },
    total_price: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: veilStatusOptions,
      default: "draft",
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Veil = mongoose.model("Veil", veilSchema);
export { veilDegreeOptions, veilStatusOptions };
