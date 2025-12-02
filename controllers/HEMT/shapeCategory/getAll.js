import { ShapeCategory } from "../../../models/HEMT/shapeCategoryModel.js";
import { SUCCESS } from "../../../utilities/successWords.js";

const getAll = async (req, res) => {
  const shapeCategories = await ShapeCategory.find({ deleted_at: null }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Shape categories retrieved successfully",
    data: shapeCategories,
    count: shapeCategories.length,
  });
};

export default getAll;
