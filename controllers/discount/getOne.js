import { Discount } from "../../models/Discount.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

export const getOne = async (req, res) => {
  const { id } = req.params;
  const discount = await Discount.findOne(
    { _id: id, deleted_at: null },
    { __v: 0, updatedAt: 0, deleted_at: 0 }
  )
    .populate("productId")
    .populate("categoryId");
  if (!discount) {
    return res
      .status(404)
      .json({ success: FAIL, status: 404, message: "Discount not found" });
  }
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Discount fetched successfully",
    data: discount,
  });
};
export default getOne;
