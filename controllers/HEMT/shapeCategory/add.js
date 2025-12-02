import { ShapeCategory } from "../../../models/HEMT/shapeCategoryModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const add = async (req, res) => {
  const { name, description } = req.body;

  const existingCategory = await ShapeCategory.findOne({
    name,
    deleted_at: null,
  });
  if (existingCategory) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Shape category with this name already exists",
    });
  }

  const shapeCategory = new ShapeCategory({ name, description });
  await shapeCategory.save();

  return res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "Shape category created successfully",
    data: shapeCategory,
  });
};

export default add;
