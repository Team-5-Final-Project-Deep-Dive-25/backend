import { Material } from "../../../models/HEMT/materialModel.js";
import { SUCCESS } from "../../../utilities/successWords.js";

const getAll = async (req, res) => {
  const materials = await Material.find({ deleted_at: null }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Materials retrieved successfully",
    data: materials,
    count: materials.length,
  });
};

export default getAll;
