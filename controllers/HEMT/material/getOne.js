import { Material } from "../../../models/HEMT/materialModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const getOne = async (req, res) => {
  const { id } = req.params;

  const material = await Material.findOne({ _id: id, deleted_at: null });
  if (!material) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Material not found",
    });
  }

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Material retrieved successfully",
    data: material,
  });
};

export default getOne;
