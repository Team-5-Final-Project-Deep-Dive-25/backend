import mongoose from "mongoose";
const contactSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
    min: 3,
    max: 20,
  },
  email: { type: String, require: true, min: 10, max: 30 },
  phone: { type: Number, require: true },
  message: { type: String, require: true, min: 5, max: 400 },
});

export const Contact = mongoose.model("Contact", contactSchema);
