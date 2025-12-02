import { Shape } from "../../../models/HEMT/shapeModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const getOne = async (req, res) => {
  const { id } = req.params;

  const shape = await Shape.findOne({ _id: id, deleted_at: null }).populate(
    "shapeCategoryId",
    "name description"
  );

  if (!shape) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Shape not found",
    });
  }

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Shape retrieved successfully",
    data: shape,
  });
};

export default getOne;
