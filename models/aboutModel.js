import mongoose from "mongoose";

const aboutSchema = mongoose.Schema;
({
  name: { type: String, required: true },
  description: { type: String, required: true },
  track: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dweffiohi/image/upload/v1756798194/kxd3fv4kuoiozsglw1ry.jpg",
  },
});

export const About = mongoose.model("About", aboutSchema);
