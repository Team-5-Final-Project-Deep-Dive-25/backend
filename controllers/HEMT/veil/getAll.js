import { Veil } from "../../../models/HEMT/veilModel.js";
import { SUCCESS } from "../../../utilities/successWords.js";

const getAll = async (req, res) => {
  const { status, userId } = req.query;

  const filter = { deleted_at: null };
  if (status) {
    filter.status = status;
  }
  if (userId) {
    filter.userId = userId;
  }

  const veils = await Veil.find(filter)
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
    })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Veils retrieved successfully",
    data: veils,
    count: veils.length,
  });
};

export default getAll;
