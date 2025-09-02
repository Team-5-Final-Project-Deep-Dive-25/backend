import mongoose from "mongoose";
import validator from "validator";
import userRoles from "../utilities/userRoles.js";
import userGender from "../utilities/userGender.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        validator.isEmail,
        {
          message: "Please provide a valid email address",
        },
      ],
      lowercase: true,
      trim: true,
      maxlength: 50,
      minlength: 10,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: [
        validator.isStrongPassword,
        { message: "Password must be strong" },
      ],
    },
    role: {
      type: String,
      enum: [userRoles.USER, userRoles.ADMIN],
      default: userRoles.USER,
    },
    gender: {
      type: String,
      enum: [userGender.MALE, userGender.FEMALE],
      required: true,
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 40,
    },
    deleted_at: { type: Date, default: null },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dweffiohi/image/upload/v1756798194/kxd3fv4kuoiozsglw1ry.jpg",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
