import { Color } from "../../../models/HEMT/colorModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const deleteOne = async (req, res) => {
  const { id } = req.params;

  const color = await Color.findOne({ _id: id, deleted_at: null });
  if (!color) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Color not found",
    });
  }

  color.deleted_at = new Date();
  await color.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Color deleted successfully",
  });
};

export default deleteOne;
