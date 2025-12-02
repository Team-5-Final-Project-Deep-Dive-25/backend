import { Veil } from "../../../models/HEMT/veilModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const getOne = async (req, res) => {
  const { id } = req.params;

  const veil = await Veil.findOne({ _id: id, deleted_at: null })
    .populate("userId", "name email")
    .populate("colorId", "name type price")
    .populate("materialId", "name description price")
    .populate({
      path: "shapeId",
      select: "name description price shapeCategoryId",
      populate: {
        path: "shapeCategoryId",
        select: "name description",
      },
    });

  if (!veil) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Veil not found",
    });
  }

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Veil retrieved successfully",
    data: veil,
  });
};

export default getOne;
