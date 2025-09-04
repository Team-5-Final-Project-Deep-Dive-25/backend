import { Product } from "../../models/productModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

export const deleteProductImages = async (req, res) => {
  try {
    const productId = req.params.id;
    const { images } = req.body; // images: array of image URLs to delete
    if (!Array.isArray(images) ) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "No images provided to delete",
      });
    }
    const product = await Product.findOne({ _id: productId, deleted_at: null });
    if (!product) {
      return res.status(404).json({
        success: FAIL,
        status: 404,
        message: "Product is not found",
      });
    }
    // Filter out images to delete
    product.images = product.images.filter((img) => !images.includes(img));
    await product.save();
    res.status(200).json({
      success: SUCCESS,
      status: 200,
      message: "Images Deleted Successfully",
      data: product.images,
    });
  } catch (error) {
    res.status(500).json({
      success: FAIL,
      status: 500,
      message: error.message,
    });
  }
};
