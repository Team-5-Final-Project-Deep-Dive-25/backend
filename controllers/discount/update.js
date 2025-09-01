import { Discount } from "../../models/discountModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const updateOne = async (req, res) => {
  const { id } = parseInt(req.params);
  const updateData = req.body;
  const discount = await Discount.findOneAndUpdate(
    { _id: id, deleted_at: null },
    updateData,
    { new: true }
  );
  if (!discount) {
    return res
      .status(404)
      .json({ success: FAIL, status: 404, message: "Discount not found" });
  }
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Discount updated successfully",
    data: discount,
  });
};
export default updateOne;
