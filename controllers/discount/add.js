import { SUCCESS } from "../../utilities/successWords.js";
import { Discount } from "../../models/discountModel.js";
import { Product } from "../../models/productModel.js";
import { Category } from "../../models/categoryModel.js";

const add = async (req, res, next) => {
  const { productId, categoryId, type, value, startDate, endDate } = req.body;
  const newDiscount = new Discount({
    productId,
    categoryId,
    type,
    value,
    startDate,
    endDate,
  });
  const savedDiscount = await newDiscount.save();

  // Update products with discountId
  if (productId && Array.isArray(productId) && productId.length > 0) {
    await Product.updateMany(
      { _id: { $in: productId } },
      { $set: { discountId: savedDiscount._id } }
    );
  }
  // Update categories with discountId
  if (categoryId && Array.isArray(categoryId) && categoryId.length > 0) {
    await Category.updateMany(
      { _id: { $in: categoryId } },
      { $set: { discountId: savedDiscount._id } }
    );
  }

  return res.status(201).json({
    status: SUCCESS,
    status: 201,
    message: "Discount Created successfully",
    data: savedDiscount,
  });
};
export default add;
