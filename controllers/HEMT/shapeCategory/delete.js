import { ShapeCategory } from "../../../models/HEMT/shapeCategoryModel.js";
import { Shape } from "../../../models/HEMT/shapeModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const deleteOne = async (req, res) => {
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

  // Check if there are shapes using this category
  const shapesUsingCategory = await Shape.find({
    shapeCategoryId: id,
    deleted_at: null,
  });
  if (shapesUsingCategory.length > 0) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message:
        "Cannot delete shape category. There are shapes using this category.",
    });
  }

  shapeCategory.deleted_at = new Date();
  await shapeCategory.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Shape category deleted successfully",
  });
};

export default deleteOne;
