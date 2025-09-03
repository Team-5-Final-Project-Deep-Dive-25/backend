import { Product } from "../../models/productModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

export const getByCategory = async (req, res) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Category ID is required",
    });
  }
  const products = await Product.find({
    categoryId: categoryId,
    deleted_at: null,
  })
    .populate({
      path: "categoryId",
      select: "-__v -updatedAt -createdAt -deleted_at",
      populate: {
        path: "discountId",
        select: "-__v -updatedAt -createdAt -deleted_at -categoryId -productId",
      },
    })
    .populate({
      path: "discountId",
      select: "-productId -categoryId -__v -createdAt -updatedAt -deleted_at",
    });
  if (!products.length) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "No products found for this category",
    });
  }
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Products fetched successfully",
    data: products,
  });
};
