import { ShapeCategory } from "../../../models/HEMT/shapeCategoryModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const getOne = async (req, res) => {
  const { id } = req.params;

  const shapeCategory = await ShapeCategory.findOne({
    _id: id,
    deleted_at: null,
  });
  if (!shapeCategory) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Shape category not found",
    });
  }

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Shape category retrieved successfully",
    data: shapeCategory,
  });
};

export default getOne;
