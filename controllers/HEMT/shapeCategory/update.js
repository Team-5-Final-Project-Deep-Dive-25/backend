import { ShapeCategory } from "../../../models/HEMT/shapeCategoryModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

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

  // Check for duplicate if name is being updated
  if (name && name !== shapeCategory.name) {
    const existingCategory = await ShapeCategory.findOne({
      name,
      deleted_at: null,
      _id: { $ne: id },
    });
    if (existingCategory) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Shape category with this name already exists",
      });
    }
  }

  if (name) shapeCategory.name = name;
  if (description !== undefined) shapeCategory.description = description;

  await shapeCategory.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Shape category updated successfully",
    data: shapeCategory,
  });
};

export default update;
