import { Product } from "../../models/productModel.js";
import { SUCCESS } from "../../utilities/successWords.js";
import { uploadImg } from "../../utilities/imageHandler.js";

export const add = async (req, res) => {
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const imgResult = await uploadImg(file);
      images.push(imgResult.ImgUrl);
    }
  } else if (req.file) {
    const imgResult = await uploadImg(req.file);
    images.push(imgResult.ImgUrl);
  }
  if (req.body.images) {
    images = req.body.images;
  }
  const product = new Product({ ...req.body, images });
  await product.save();
  return res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "Product created successfully",
    data: product,
  });
};

export default add;
