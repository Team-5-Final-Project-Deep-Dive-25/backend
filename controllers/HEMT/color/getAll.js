import { Color } from "../../../models/HEMT/colorModel.js";
import { SUCCESS } from "../../../utilities/successWords.js";

const getAll = async (req, res) => {
  const colors = await Color.find({ deleted_at: null }).sort({ createdAt: -1 });

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Colors retrieved successfully",
    data: colors,
    count: colors.length,
  });
};

export default getAll;
