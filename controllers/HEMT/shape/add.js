import { Shape } from "../../../models/HEMT/shapeModel.js";
import { ShapeCategory } from "../../../models/HEMT/shapeCategoryModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const add = async (req, res) => {
  const { name, description, price, shapeCategoryId } = req.body;

  // Validate shape category exists
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

  const existingShape = await Shape.findOne({
    name,
    shapeCategoryId,
    deleted_at: null,
  });
  if (existingShape) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Shape with this name already exists in this category",
    });
  }

  const shape = new Shape({ name, description, price, shapeCategoryId });
  await shape.save();

  return res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "Shape created successfully",
    data: shape,
  });
};

export default add;
