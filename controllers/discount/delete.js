import { Discount } from "../../models/discount.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const discount = await Discount.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { deleted_at: new Date() },
    { new: true }
  );
  if (!discount) {
    return res
      .status(404)
      .json({ success: FAIL, status: 404, message: "Discount not found" });
  }
  res
    .status(200)
    .json({ success: SUCCESS, status: 200, message: "Discount deleted" });
};
export default deleteOne;
