import { Material } from "../../../models/HEMT/materialModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const deleteOne = async (req, res) => {
  const { id } = req.params;

  const material = await Material.findOne({ _id: id, deleted_at: null });
  if (!material) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Material not found",
    });
  }

  material.deleted_at = new Date();
  await material.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Material deleted successfully",
  });
};

export default deleteOne;
