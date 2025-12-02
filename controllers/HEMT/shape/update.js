import { Shape } from "../../../models/HEMT/shapeModel.js";
import { ShapeCategory } from "../../../models/HEMT/shapeCategoryModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, shapeCategoryId } = req.body;

  const shape = await Shape.findOne({ _id: id, deleted_at: null });
  if (!shape) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Shape not found",
    });
  }

  // Validate shape category if being updated
  if (shapeCategoryId) {
    const shapeCategory = await ShapeCategory.findOne({
      _id: shapeCategoryId,
      deleted_at: null,
    });
    if (!shapeCategory) {
      return res.status(404).json({
        success: FAIL,
        status: 404,
        message: "Shape category not found",
      });
    }
  }

  // Check for duplicate if name or category is being updated
  if (name || shapeCategoryId) {
    const checkName = name || shape.name;
    const checkCategoryId = shapeCategoryId || shape.shapeCategoryId;
    const existingShape = await Shape.findOne({
      name: checkName,
      shapeCategoryId: checkCategoryId,
      deleted_at: null,
      _id: { $ne: id },
    });
    if (existingShape) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Shape with this name already exists in this category",
      });
    }
  }

  if (name) shape.name = name;
  if (description !== undefined) shape.description = description;
  if (price !== undefined) shape.price = price;
  if (shapeCategoryId) shape.shapeCategoryId = shapeCategoryId;

  await shape.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Shape updated successfully",
    data: shape,
  });
};

export default update;
