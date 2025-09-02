import { configDotenv } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

configDotenv();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImg = async function (file) {
  try {
    if (!file || !file.buffer) {
      throw new Error("File buffer is missing.");
    }

    const compressedImageBuffer = await sharp(file.buffer)
      .resize(800, 600, { fit: "inside" })
      .jpeg({ quality: 75 })
      .toBuffer();

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      stream.end(compressedImageBuffer);
    });

    return {
      ImgUrl: result.secure_url,
      ImgPublicId: result.public_id,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteImg = async function (input) {
  try {
    let publicId = input;
    if (typeof input === "string" && input.startsWith("http")) {
      const matches = input.match(/\/upload\/[^/]+\/(.+)\.[a-zA-Z]+$/);
      if (matches && matches[1]) {
        publicId = matches[1];
      } else {
        // fallback: try to extract after last '/'
        publicId = input.substring(
          input.lastIndexOf("/") + 1,
          input.lastIndexOf(".")
        );
      }
    }
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      throw new Error(
        `Failed to delete image with PublicId: ${publicId}. Details: ${JSON.stringify(
          result
        )}`
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
