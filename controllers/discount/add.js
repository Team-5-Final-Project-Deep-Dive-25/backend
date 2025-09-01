import { SUCCESS } from "../../utilities/successWords.js";
import { Discount } from "../../models/discountModel.js";

const add = async (req, res, next) => {
  const { productId, categoryId, type, value, endDate } = req.body;
  const newDiscount = await new Discount({
    productId,
    categoryId,
    type,
    value,
    endDate,
  });
  return res.status(201).json({
    status: SUCCESS,
    status: 201,
    message: "Discount Created successfully",
    data: await newDiscount.save(),
  });
};
export default add;
