import { Shape } from "../../../models/HEMT/shapeModel.js";
import { SUCCESS } from "../../../utilities/successWords.js";

const getAll = async (req, res) => {
  const { shapeCategoryId } = req.query;

  const filter = { deleted_at: null };
  if (shapeCategoryId) {
    filter.shapeCategoryId = shapeCategoryId;
  }

  const shapes = await Shape.find(filter)
    .populate("shapeCategoryId", "name description")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Shapes retrieved successfully",
    data: shapes,
    count: shapes.length,
  });
};

export default getAll;
