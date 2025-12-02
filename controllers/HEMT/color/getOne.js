import { Color } from "../../../models/HEMT/colorModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const getOne = async (req, res) => {
  const { id } = req.params;

  const color = await Color.findOne({ _id: id, deleted_at: null });
  if (!color) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Color not found",
    });
  }

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Color retrieved successfully",
    data: color,
  });
};

export default getOne;
