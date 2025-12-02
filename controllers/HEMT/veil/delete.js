import { Veil } from "../../../models/HEMT/veilModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const deleteOne = async (req, res) => {
  const { id } = req.params;

  const veil = await Veil.findOne({ _id: id, deleted_at: null });
  if (!veil) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Veil not found",
    });
  }

  veil.deleted_at = new Date();
  await veil.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Veil deleted successfully",
  });
};

export default deleteOne;
